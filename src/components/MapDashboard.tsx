import { useEffect, useRef } from "react";
import maplibregl, { Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Light-mode interactive map dashboard built with MapLibre GL JS.
 * - Carto Positron raster basemap (light, with admin boundaries baked in)
 * - World countries GeoJSON loaded from a public CDN
 * - Choropleth fill driven by a deterministic dummy `value` per country
 * - Hover highlight + click logs feature data
 * - Bottom-left legend, top-left zoom controls
 */
const COUNTRIES_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// Indonesia administrative level 2 (kabupaten/kota) — 394 features.
const INDONESIA_KABKOTA_URL =
  "https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_2_kabkota.json";

// Blue gradient (light → dark) used for the choropleth + legend.
const LEGEND_STOPS: { value: number; color: string }[] = [
  { value: 0, color: "#eaf3fb" },
  { value: 20, color: "#c6dcef" },
  { value: 40, color: "#94c0df" },
  { value: 60, color: "#5fa1cb" },
  { value: 80, color: "#2b7bb9" },
  { value: 100, color: "#08519c" },
];

// Deterministic pseudo-value (0–100) for a given country code so the
// choropleth is stable across reloads without needing real data.
const valueFor = (code: string): number => {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0;
  return h % 101;
};

const MapDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const hoveredIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
        layers: [
          {
            id: "carto-light",
            type: "raster",
            source: "carto-light",
          },
        ],
      },
      center: [10, 25],
      zoom: 1.6,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
    map.scrollZoom.setWheelZoomRate(1 / 200); // smoother zoom
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.on("load", async () => {
      try {
        const res = await fetch(COUNTRIES_URL);
        const geo = await res.json();

        // Inject deterministic `value` into each feature for the choropleth
        // and stable feature ids for hover state.
        geo.features.forEach((f: GeoJSON.Feature, i: number) => {
          const props = (f.properties || {}) as Record<string, unknown>;
          const code = (props.ISO_A3 as string) || (props.ADM0_A3 as string) || String(i);
          props.value = valueFor(code);
          f.properties = props;
          f.id = i;
        });

        map.addSource("countries", { type: "geojson", data: geo });

        map.addLayer({
          id: "countries-fill",
          type: "fill",
          source: "countries",
          paint: {
            "fill-color": [
              "interpolate",
              ["linear"],
              ["coalesce", ["get", "value"], 0],
              ...LEGEND_STOPS.flatMap((s) => [s.value, s.color]),
            ],
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.9,
              0.65,
            ],
          },
        });

        map.addLayer({
          id: "countries-outline",
          type: "line",
          source: "countries",
          paint: {
            "line-color": "#ffffff",
            "line-width": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              1.6,
              0.4,
            ],
          },
        });

        map.on("mousemove", "countries-fill", (e) => {
          if (!e.features?.length) return;
          const f = e.features[0] as MapGeoJSONFeature;
          map.getCanvas().style.cursor = "pointer";
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "countries", id: hoveredIdRef.current },
              { hover: false },
            );
          }
          hoveredIdRef.current = f.id ?? null;
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "countries", id: hoveredIdRef.current },
              { hover: true },
            );
          }
        });

        map.on("mouseleave", "countries-fill", () => {
          map.getCanvas().style.cursor = "";
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "countries", id: hoveredIdRef.current },
              { hover: false },
            );
          }
          hoveredIdRef.current = null;
        });

        map.on("click", "countries-fill", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const p = f.properties || {};
          // eslint-disable-next-line no-console
          console.log("Region clicked:", {
            name: p.ADMIN || p.NAME || p.name,
            iso: p.ISO_A3 || p.ADM0_A3,
            value: p.value,
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load countries GeoJSON", err);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-6 left-4 z-10">
        <div className="pointer-events-auto rounded-lg border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
          <div className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
            Index
          </div>
          <div
            className="h-2 w-44 rounded"
            style={{
              background: `linear-gradient(to right, ${LEGEND_STOPS.map((s) => s.color).join(",")})`,
            }}
          />
          <div className="mt-1 flex w-44 justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;