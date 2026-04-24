import { useEffect, useMemo, useRef } from "react";
import maplibregl, { Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { countries, legendConfigs, regions, supplyNodes, supplyRoutes } from "@/data";
import type {
  CommodityScope,
  CountryData,
  DashboardMode,
  NodeStatus,
  NodeType,
  RegionData,
  SupplyNode,
  SupplyTab,
} from "@/types/dashboard";

const COUNTRIES_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
const INDONESIA_KABKOTA_URL =
  "https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_2_kabkota.json";

const NO_DATA_COLOR = "#f1f1f1";

// Monochrome supply fill (much lighter so nodes pop)
const MONO_SUPPLY_STOPS = [
  { minValue: 0, color: "#c8c8c8" },
  { minValue: 40, color: "#d9d9d9" },
  { minValue: 60, color: "#ebebeb" },
  { minValue: 80, color: "#f2f2f2" },
];

// Status colors for nodes & routes
const STATUS_COLORS: Record<NodeStatus, string> = {
  normal: "#22c55e",
  high: "#f59e0b",
  bottleneck: "#ef4444",
};

const ROUTE_COLORS = {
  normal: "#6b7280",
  delayed: "#f59e0b",
  critical: "#ef4444",
} as const;

const NODE_RADIUS: Record<NodeType, number> = {
  feedmill: 9,
  warehouse: 8,
  distribution: 7,
  farm: 6,
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const normalize = (value: string) =>
  value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const regionById = new Map(regions.map((region) => [region.regionId, region]));
const regionByProvinceName = new Map(regions.map((region) => [normalize(region.provinsi), region]));
const countryByCode = new Map(countries.map((country) => [country.countryCode, country]));
const nodeById = new Map(supplyNodes.map((n) => [n.id, n]));

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
    return [0, "#f3f4f6", 100, "#1f2937"];
  }
  const stops: Array<number | string> = [];
  legend.forEach((stop) => {
    stops.push(stop.minValue, stop.color);
  });
  const last = legend[legend.length - 1];
  stops.push(last.maxValue, last.color);
  return stops;
};

const buildMonochromeStops = (): Array<number | string> => {
  const stops: Array<number | string> = [];
  MONO_SUPPLY_STOPS.forEach((s) => {
    stops.push(s.minValue, s.color);
  });
  return stops;
};

const buildNodesGeoJSON = (): GeoJSON.FeatureCollection => ({
  type: "FeatureCollection",
  features: supplyNodes.map((node) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [node.lng, node.lat] },
    properties: {
      id: node.id,
      name: node.name,
      type: node.type,
      status: node.status,
      utilization: node.utilization,
      radius: NODE_RADIUS[node.type],
      statusColor: STATUS_COLORS[node.status],
    },
  })),
});

const buildRoutesGeoJSON = (): GeoJSON.FeatureCollection => ({
  type: "FeatureCollection",
  features: supplyRoutes
    .map((route) => {
      const from = nodeById.get(route.fromNodeId);
      const to = nodeById.get(route.toNodeId);
      if (!from || !to) return null;
      return {
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: [
            [from.lng, from.lat],
            [to.lng, to.lat],
          ],
        },
        properties: {
          id: route.id,
          status: route.status,
          volume: route.volumeTonPerWeek,
          strokeColor: ROUTE_COLORS[route.status],
          strokeWidth: route.status === "normal" ? 1.4 : 2.2,
        },
      };
    })
    .filter((f): f is NonNullable<typeof f> => f !== null),
});

export interface MapSelection {
  scope: CommodityScope;
  mode: DashboardMode;
  id: string;
  name: string;
  metricLabel: string;
  metricValue: number;
  region?: RegionData;
  country?: CountryData;
  node?: SupplyNode;
}

interface MapDashboardProps {
  scope: CommodityScope;
  mode: DashboardMode;
  supplyPerspective: SupplyTab;
  onRegionSelect?: (selection: MapSelection) => void;
  onNodeSelect?: (node: SupplyNode) => void;
}

const MapDashboard = ({
  scope,
  mode,
  supplyPerspective,
  onRegionSelect,
  onNodeSelect,
}: MapDashboardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const hoveredIdRef = useRef<string | number | null>(null);

  const legend = useMemo(() => getLegend(mode, scope), [mode, scope]);
  const metricLabel = getMetricLabel(mode, scope, supplyPerspective, legend?.metricLabel ?? "Score");
  const showNetwork = mode === "supply" && scope === "local";

  useEffect(() => {
    if (!containerRef.current) return;

    const showTooltip = (x: number, y: number, text: string) => {
      const element = tooltipRef.current;
      if (!element) return;
      element.innerHTML = text;
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
              "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [{ id: "carto-light", type: "raster", source: "carto-light" }],
      },
      center: [118, -2.5],
      zoom: scope === "local" ? 4.2 : 2.2,
      attributionControl: { compact: true },
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }),
      "top-right",
    );

    map.scrollZoom.setWheelZoomRate(1 / 200);
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    const clearHoveredState = (source: string) => {
      if (hoveredIdRef.current === null) return;
      map.setFeatureState({ source, id: hoveredIdRef.current }, { hover: false });
      hoveredIdRef.current = null;
    };

    const addNetworkLayers = () => {
      if (!showNetwork) return;

      // Routes (lines) - below nodes
      map.addSource("routes", { type: "geojson", data: buildRoutesGeoJSON() });
      map.addLayer({
        id: "routes-casing",
        type: "line",
        source: "routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#ffffff",
          "line-width": ["+", ["get", "strokeWidth"], 1.5],
          "line-opacity": 0.7,
        },
      });
      map.addLayer({
        id: "routes-line",
        type: "line",
        source: "routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ["get", "strokeColor"],
          "line-width": ["get", "strokeWidth"],
          "line-opacity": 0.9,
          "line-dasharray": [
            "case",
            ["==", ["get", "status"], "delayed"],
            ["literal", [2, 2]],
            ["literal", [1, 0]],
          ],
        },
      });

      // Nodes (circles)
      map.addSource("nodes", { type: "geojson", data: buildNodesGeoJSON() });
      map.addLayer({
        id: "nodes-halo",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": ["+", ["get", "radius"], 4],
          "circle-color": ["get", "statusColor"],
          "circle-opacity": 0.18,
        },
      });
      map.addLayer({
        id: "nodes-circle",
        type: "circle",
        source: "nodes",
        paint: {
          "circle-radius": ["get", "radius"],
          "circle-color": ["get", "statusColor"],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-opacity": 0.95,
        },
      });

      map.on("mousemove", "nodes-circle", (event) => {
        if (!event.features?.length) return;
        const props = event.features[0].properties as Record<string, unknown>;
        map.getCanvas().style.cursor = "pointer";
        const name = String(props.name || "");
        const type = String(props.type || "");
        const util = Number(props.utilization || 0);
        const status = String(props.status || "");
        showTooltip(
          event.point.x,
          event.point.y,
          `<div class="font-semibold">${name}</div><div class="opacity-70 text-[10px] uppercase">${type} · ${status}</div><div class="tabular-nums">Util: ${util.toFixed(0)}%</div>`,
        );
      });

      map.on("mouseleave", "nodes-circle", () => {
        map.getCanvas().style.cursor = "";
        hideTooltip();
      });

      map.on("click", "nodes-circle", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        const id = String((feature.properties as Record<string, unknown>).id || "");
        const node = nodeById.get(id);
        if (node) onNodeSelect?.(node);
      });
    };

    map.on("load", async () => {
      const defaultColorStops = buildColorExpressionStops(legend?.stops ?? []);
      const colorStops = showNetwork ? buildMonochromeStops() : defaultColorStops;

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
                ["interpolate", ["linear"], ["coalesce", ["get", "value"], 0], ...colorStops],
                NO_DATA_COLOR,
              ],
              "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.9, 0.68],
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
          const region = resolveRegionByProvinceName(provinceName);
          const metricValue = getMetricValue(region, undefined, mode, scope, supplyPerspective);

          properties.regionId = region?.regionId;
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
              ["interpolate", ["linear"], ["coalesce", ["get", "value"], 0], ...colorStops],
              NO_DATA_COLOR,
            ],
            "fill-opacity": showNetwork
              ? ["case", ["boolean", ["feature-state", "hover"], false], 0.65, 0.4]
              : ["case", ["boolean", ["feature-state", "hover"], false], 0.78, 0.52],
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

          const region = regionId ? regionById.get(regionId) : undefined;
          const metricValue = getMetricValue(region, undefined, mode, scope, supplyPerspective);
          if (!region || metricValue === null) return;

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

        // Add network overlay AFTER region layers so it renders on top
        addNetworkLayers();

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
      } catch (error) {
        console.error("Failed to load Indonesia kabupaten GeoJSON", error);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [legend?.stops, metricLabel, mode, onNodeSelect, onRegionSelect, scope, showNetwork, supplyPerspective]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-card">
      <div ref={containerRef} className="absolute inset-0" />

      <div
        ref={tooltipRef}
        className="pointer-events-none absolute left-0 top-0 z-20 rounded-md border border-border bg-card/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur transition-opacity duration-100"
        style={{ opacity: 0 }}
      />

      {/* Legend - bottom right, monochrome style */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20">
        <div className="pointer-events-auto flex flex-col gap-2 rounded-md border border-border bg-card/95 px-3 py-2.5 shadow-sm backdrop-blur">
          {showNetwork ? (
            <>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                Network nodes
              </div>
              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-2 text-[11px] text-foreground/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-normal ring-2 ring-white" />
                  Normal
                </li>
                <li className="flex items-center gap-2 text-[11px] text-foreground/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-high ring-2 ring-white" />
                  High utilization
                </li>
                <li className="flex items-center gap-2 text-[11px] text-foreground/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-critical ring-2 ring-white" />
                  Bottleneck
                </li>
              </ul>
              <div className="mt-1 border-t border-border pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                Node types
              </div>
              <ul className="flex flex-col gap-0.5 text-[10px] text-muted-foreground">
                <li>● Feedmill  ● Warehouse</li>
                <li>● Dist. point  ● Farm cluster</li>
              </ul>
            </>
          ) : (
            <>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                {metricLabel}
              </div>
              <ul className="flex flex-col gap-1">
                {(legend?.stops ?? []).map((item) => (
                  <li
                    key={`${item.minValue}-${item.maxValue}`}
                    className="flex items-center gap-2 text-[11px] text-foreground/80"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-sm border border-border"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
