import { useEffect, useMemo, useRef } from "react";
import maplibregl, { type ExpressionSpecification, Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { countries, createDistrictMarketData, legendConfigs, regions } from "@/data";
import type {
  CommodityScope,
  CountryData,
  DashboardMode,
  DistrictMarketData,
  RegionData,
  SupplyTab,
} from "@/types/dashboard";

const COUNTRIES_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
const INDONESIA_KABKOTA_URL =
  "https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_2_kabkota.json";

const NO_DATA_COLOR = "#e5e7eb";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const normalize = (value: string) =>
  value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const regionById = new Map(regions.map((region) => [region.regionId, region]));
const regionByProvinceName = new Map(regions.map((region) => [normalize(region.provinsi), region]));
const countryByCode = new Map(countries.map((country) => [country.countryCode, country]));

const PROVINCE_ALIASES: Record<string, string> = {
  DKI_JAKARTA_RAYA: "DKI_JAKARTA",
  JAKARTA_RAYA: "DKI_JAKARTA",
  YOGYAKARTA: "DI_YOGYAKARTA",
  D_I_YOGYAKARTA: "DI_YOGYAKARTA",
  BANGKA_BELITUNG: "KEPULAUAN_BANGKA_BELITUNG",
  PAPUA_BARAT_DAYA: "PAPUA_BARAT",
};

const resolveRegionByProvinceName = (provinceName: string): RegionData | undefined => {
  const key = normalize(provinceName);
  const direct = regionByProvinceName.get(key);
  if (direct) return direct;

  const aliasId = PROVINCE_ALIASES[key];
  if (!aliasId) return undefined;

  return regionById.get(aliasId);
};

const getLegend = (mode: DashboardMode, scope: CommodityScope) =>
  legendConfigs.find((item) => item.mode === mode && item.scope === scope);

const getLocalSupplyValue = (region: RegionData, perspective: SupplyTab) => {
  if (perspective === "mitra") {
    return clamp(50 + region.supply.surplusShortage / 22);
  }

  const serviceGap = region.supply.supplyIndex - region.supply.demandIndex;
  return clamp(50 + serviceGap * 2.2);
};

const getGlobalSupplyValue = (country: CountryData, perspective: SupplyTab) => {
  if (perspective === "mitra") {
    return clamp(country.supply.supplyIndex);
  }

  const tradeBase = Math.max(country.supply.exportVolumeTon + country.supply.importVolumeTon, 1);
  const normalizedTradeBalance =
    ((country.supply.exportVolumeTon - country.supply.importVolumeTon) / tradeBase) * 50;
  return clamp(50 + normalizedTradeBalance);
};

const getMetricValue = (
  region: RegionData | undefined,
  country: CountryData | undefined,
  mode: DashboardMode,
  scope: CommodityScope,
  perspective: SupplyTab,
) => {
  if (scope === "local") {
    if (!region) return null;
    return mode === "market" ? region.market.marketIndex : getLocalSupplyValue(region, perspective);
  }

  if (!country) return null;
  return mode === "market" ? country.market.marketIndex : getGlobalSupplyValue(country, perspective);
};

const getMetricLabel = (
  mode: DashboardMode,
  scope: CommodityScope,
  perspective: SupplyTab,
  fallback: string,
) => {
  if (mode !== "supply") return fallback;
  if (scope !== "local") return perspective === "mitra" ? "Supply Partner Index" : "Customer Fulfillment Index";
  return perspective === "mitra" ? "Mitra Supply Score" : "Customer Service Score";
};

const buildColorExpressionStops = (
  legend: { minValue: number; maxValue: number; color: string }[],
): Array<number | string> => {
  if (legend.length === 0) {
    return [0, "#f8fafc", 100, "#1d4ed8"];
  }

  const stops: Array<number | string> = [];
  legend.forEach((stop) => {
    stops.push(stop.minValue, stop.color);
  });

  const last = legend[legend.length - 1];
  stops.push(last.maxValue, last.color);
  return stops;
};

const buildInterpolateColorExpression = (
  legend: { minValue: number; maxValue: number; color: string }[],
) => ["interpolate", ["linear"], ["coalesce", ["get", "value"], 0], ...buildColorExpressionStops(legend)] as ExpressionSpecification;

const buildStepColorExpression = (
  legend: { minValue: number; maxValue: number; color: string }[],
) => {
  if (legend.length === 0) {
    return ["step", ["coalesce", ["get", "value"], 0], "#f8fafc", 50, "#1d4ed8"] as ExpressionSpecification;
  }

  const expression: ExpressionSpecification = [
    "step",
    ["coalesce", ["get", "value"], 0],
    legend[0].color,
  ];

  legend.slice(1).forEach((stop) => {
    expression.push(stop.minValue, stop.color);
  });

  return expression;
};

export interface MapSelection {
  scope: CommodityScope;
  mode: DashboardMode;
  id: string;
  name: string;
  metricLabel: string;
  metricValue: number;
  district?: DistrictMarketData;
  region?: RegionData;
  country?: CountryData;
}

interface MapDashboardProps {
  scope: CommodityScope;
  mode: DashboardMode;
  supplyPerspective: SupplyTab;
  onRegionSelect?: (selection: MapSelection) => void;
}

const MapDashboard = ({ scope, mode, supplyPerspective, onRegionSelect }: MapDashboardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const hoveredIdRef = useRef<string | number | null>(null);

  const legend = useMemo(() => getLegend(mode, scope), [mode, scope]);
  const metricLabel = getMetricLabel(mode, scope, supplyPerspective, legend?.metricLabel ?? "Score");

  useEffect(() => {
    if (!containerRef.current) return;

    const showTooltip = (x: number, y: number, text: string) => {
      const element = tooltipRef.current;
      if (!element) return;
      element.textContent = text;
      element.style.transform = `translate(${x + 12}px, ${y + 12}px)`;
      element.style.opacity = "1";
    };

    const hideTooltip = () => {
      const element = tooltipRef.current;
      if (!element) return;
      element.style.opacity = "0";
    };

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "carto-light": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [{ id: "carto-light", type: "raster", source: "carto-light" }],
      },
      center: scope === "local" ? [118, -2.5] : [118, -2.5],
      zoom: scope === "local" ? 4.2 : 2.2,
      attributionControl: { compact: true },
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }),
      "top-left",
    );

    map.scrollZoom.setWheelZoomRate(1 / 200);
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    const clearHoveredState = (source: string) => {
      if (hoveredIdRef.current === null) return;
      map.setFeatureState({ source, id: hoveredIdRef.current }, { hover: false });
      hoveredIdRef.current = null;
    };

    map.on("load", async () => {
      const useSteppedMarketColors = mode === "market";
      const fillColorExpression = useSteppedMarketColors
        ? buildStepColorExpression(legend?.stops ?? [])
        : buildInterpolateColorExpression(legend?.stops ?? []);

      if (scope === "global") {
        try {
          const response = await fetch(COUNTRIES_URL);
          const geojson = await response.json();

          geojson.features.forEach((feature: GeoJSON.Feature, index: number) => {
            const properties = (feature.properties || {}) as Record<string, unknown>;
            const code = (properties.ISO_A3 as string) || (properties.ADM0_A3 as string) || "";
            const country = countryByCode.get(code);
            const metricValue = getMetricValue(undefined, country, mode, scope, supplyPerspective);

            properties.hasData = metricValue !== null;
            properties.value = metricValue ?? 0;
            properties.code = code;
            feature.properties = properties;
            feature.id = index;
          });

          map.addSource("countries", { type: "geojson", data: geojson });

          map.addLayer({
            id: "countries-fill",
            type: "fill",
            source: "countries",
            paint: {
              "fill-color": [
                "case",
                ["==", ["get", "hasData"], true],
                fillColorExpression,
                NO_DATA_COLOR,
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.82,
                useSteppedMarketColors ? 0.56 : 0.68,
              ],
            },
          });

          map.addLayer({
            id: "countries-outline",
            type: "line",
            source: "countries",
            paint: {
              "line-color": "#ffffff",
              "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 1.4, 0.4],
            },
          });

          map.on("mousemove", "countries-fill", (event) => {
            if (!event.features?.length) return;
            const feature = event.features[0] as MapGeoJSONFeature;
            const properties = (feature.properties || {}) as Record<string, unknown>;

            map.getCanvas().style.cursor = "pointer";
            clearHoveredState("countries");
            hoveredIdRef.current = feature.id ?? null;
            if (hoveredIdRef.current !== null) {
              map.setFeatureState({ source: "countries", id: hoveredIdRef.current }, { hover: true });
            }

            const name = (properties.ADMIN || properties.NAME || properties.name || "Unknown") as string;
            const hasData = Boolean(properties.hasData);
            const valueText = hasData
              ? `${metricLabel}: ${Number(properties.value).toFixed(1)}`
              : "Data tidak tersedia";
            showTooltip(event.point.x, event.point.y, `${name} • ${valueText}`);
          });

          map.on("mouseleave", "countries-fill", () => {
            map.getCanvas().style.cursor = "";
            clearHoveredState("countries");
            hideTooltip();
          });

          map.on("click", "countries-fill", (event) => {
            const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
            if (!feature) return;
            const properties = (feature.properties || {}) as Record<string, unknown>;
            if (!properties.hasData) return;

            const code = (properties.code as string) || (properties.ISO_A3 as string);
            const country = countryByCode.get(code);
            const metricValue = getMetricValue(undefined, country, mode, scope, supplyPerspective);
            if (!country || metricValue === null) return;

            onRegionSelect?.({
              scope,
              mode,
              id: country.countryCode,
              name: country.countryName,
              metricLabel,
              metricValue,
              country,
            });
          });

          const defaultCountry = countryByCode.get("IDN") ?? countries[0];
          const defaultValue = getMetricValue(undefined, defaultCountry, mode, scope, supplyPerspective);
          if (defaultCountry && defaultValue !== null) {
            onRegionSelect?.({
              scope,
              mode,
              id: defaultCountry.countryCode,
              name: defaultCountry.countryName,
              metricLabel,
              metricValue: defaultValue,
              country: defaultCountry,
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to load countries GeoJSON", error);
        }

        return;
      }

      try {
        const response = await fetch(INDONESIA_KABKOTA_URL);
        const geojson = await response.json();

        geojson.features.forEach((feature: GeoJSON.Feature, index: number) => {
          const properties = (feature.properties || {}) as Record<string, unknown>;
          const provinceName = (properties.NAME_1 as string) || "";
          const districtName = (properties.NAME_2 as string) || "";
          const districtType = (properties.TYPE_2 as string) || undefined;
          const region = resolveRegionByProvinceName(provinceName);
          const district =
            mode === "market" && region && districtName
              ? createDistrictMarketData(region, districtName, districtType)
              : undefined;
          const metricValue = district
            ? district.market.marketIndex
            : getMetricValue(region, undefined, mode, scope, supplyPerspective);

          properties.regionId = region?.regionId;
          properties.districtId = district?.districtId;
          properties.districtName = district?.districtName ?? districtName;
          properties.districtType = district?.districtType ?? districtType;
          properties.hasData = metricValue !== null;
          properties.value = metricValue ?? 0;
          feature.properties = properties;
          feature.id = index;
        });

        map.addSource("id-kabkota", { type: "geojson", data: geojson });

        map.addLayer({
          id: "id-kabkota-fill",
          type: "fill",
          source: "id-kabkota",
          paint: {
            "fill-color": [
              "case",
              ["==", ["get", "hasData"], true],
              fillColorExpression,
              NO_DATA_COLOR,
            ],
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              useSteppedMarketColors ? 0.54 : 0.52,
            ],
          },
        });

        map.addLayer({
          id: "id-kabkota-outline",
          type: "line",
          source: "id-kabkota",
          paint: {
            "line-color": "#ffffff",
            "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 1.2, 0.35],
            "line-opacity": 0.85,
          },
        });

        map.on("mousemove", "id-kabkota-fill", (event) => {
          if (!event.features?.length) return;
          const feature = event.features[0] as MapGeoJSONFeature;
          const properties = (feature.properties || {}) as Record<string, unknown>;

          map.getCanvas().style.cursor = "pointer";
          clearHoveredState("id-kabkota");
          hoveredIdRef.current = feature.id ?? null;
          if (hoveredIdRef.current !== null) {
            map.setFeatureState({ source: "id-kabkota", id: hoveredIdRef.current }, { hover: true });
          }

          const type = (properties.TYPE_2 as string) || "";
          const district = (properties.NAME_2 as string) || "";
          const province = (properties.NAME_1 as string) || "";
          const hasData = Boolean(properties.hasData);
          const valueText = hasData
            ? `${metricLabel}: ${Number(properties.value).toFixed(1)}`
            : "Data tidak tersedia";
          const label = `${type ? `${type} ` : ""}${district}, ${province}`;
          showTooltip(event.point.x, event.point.y, `${label} • ${valueText}`);
        });

        map.on("mouseleave", "id-kabkota-fill", () => {
          map.getCanvas().style.cursor = "";
          clearHoveredState("id-kabkota");
          hideTooltip();
        });

        map.on("click", "id-kabkota-fill", (event) => {
          const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
          if (!feature) return;
          const properties = (feature.properties || {}) as Record<string, unknown>;
          const regionId = properties.regionId as string;
          const districtName = (properties.districtName as string) || (properties.NAME_2 as string) || "";
          const districtType = (properties.districtType as string) || (properties.TYPE_2 as string) || undefined;

          const region = regionId ? regionById.get(regionId) : undefined;
          if (!region) return;

          if (mode === "market" && districtName) {
            const district = createDistrictMarketData(region, districtName, districtType);
            onRegionSelect?.({
              scope,
              mode,
              id: district.districtId,
              name: districtType ? `${districtType} ${district.districtName}` : district.districtName,
              metricLabel,
              metricValue: district.market.marketIndex,
              district,
              region,
            });
            return;
          }

          const metricValue = getMetricValue(region, undefined, mode, scope, supplyPerspective);
          if (metricValue === null) return;

          onRegionSelect?.({
            scope,
            mode,
            id: region.regionId,
            name: region.provinsi,
            metricLabel,
            metricValue,
            region,
          });
        });

        if (mode === "market") {
          const defaultFeature = geojson.features.find((feature: GeoJSON.Feature) => {
            const properties = (feature.properties || {}) as Record<string, unknown>;
            return Boolean(properties.hasData && properties.regionId && properties.districtName);
          });

          if (defaultFeature) {
            const properties = (defaultFeature.properties || {}) as Record<string, unknown>;
            const region = regionById.get(properties.regionId as string);
            const districtName = properties.districtName as string;
            const districtType = properties.districtType as string | undefined;

            if (region && districtName) {
              const district = createDistrictMarketData(region, districtName, districtType);
              onRegionSelect?.({
                scope,
                mode,
                id: district.districtId,
                name: districtType ? `${districtType} ${district.districtName}` : district.districtName,
                metricLabel,
                metricValue: district.market.marketIndex,
                district,
                region,
              });
            }
          }
        } else {
          const defaultRegion = regionById.get("DKI_JAKARTA") ?? regions[0];
          const defaultValue = getMetricValue(defaultRegion, undefined, mode, scope, supplyPerspective);
          if (defaultRegion && defaultValue !== null) {
            onRegionSelect?.({
              scope,
              mode,
              id: defaultRegion.regionId,
              name: defaultRegion.provinsi,
              metricLabel,
              metricValue: defaultValue,
              region: defaultRegion,
            });
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load Indonesia kabupaten GeoJSON", error);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [legend?.stops, metricLabel, mode, onRegionSelect, scope, supplyPerspective]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      <div
        ref={tooltipRef}
        className="pointer-events-none absolute left-0 top-0 z-20 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur transition-opacity duration-100"
        style={{ opacity: 0 }}
      />

      <div className="pointer-events-none absolute bottom-4 left-4 z-20">
        <div className="pointer-events-auto flex h-56 w-52 flex-col rounded-xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur">
          <div className="text-xs font-semibold tracking-wide text-foreground">Legend</div>
          <div className="mb-3 text-[11px] text-muted-foreground">{metricLabel}</div>
          <ul className="space-y-2">
            {(legend?.stops ?? []).map((item) => (
              <li key={`${item.minValue}-${item.maxValue}`} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm border border-border"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] text-muted-foreground">{item.label}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-sm border border-border"
                style={{ backgroundColor: NO_DATA_COLOR }}
              />
              <span className="text-[11px] text-muted-foreground">Tidak Ada Data</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
