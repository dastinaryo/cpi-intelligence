import { useEffect, useRef } from "react";
import maplibregl, { Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Light-mode interactive map dashboard for Indonesia (kabupaten/kota level).
 * - Carto Positron raster basemap
 * - Indonesia kabupaten/kota GeoJSON from public CDN
 * - Choropleth fill driven by a deterministic dummy `value` per region
 * - Hover highlight + click logs feature data
 */
const REGIONS_URL =
  "https://cdn.jsdelivr.net/gh/superpikar/indonesia-geojson@master/indonesia-district-simple.json";

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
      center: [118, -2.5],
      zoom: 4,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
    map.scrollZoom.setWheelZoomRate(1 / 200); // smoother zoom
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.on("load", async () => {
      try {
        const res = await fetch(REGIONS_URL);
        const geo = await res.json();

        // Inject deterministic `value` into each feature for the choropleth
        // and stable feature ids for hover state.
        geo.features.forEach((f: GeoJSON.Feature, i: number) => {
          const props = (f.properties || {}) as Record<string, unknown>;
          const code =
            (props.KAB_KOT as string) ||
            (props.NAME_2 as string) ||
            (props.kabkota as string) ||
            (props.name as string) ||
            String(i);
          props.value = valueFor(code);
          f.properties = props;
          f.id = i;
        });

        map.addSource("regions", { type: "geojson", data: geo });

        map.addLayer({
          id: "regions-fill",
          type: "fill",
          source: "regions",
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
              0.7,
            ],
          },
        });

        map.addLayer({
          id: "regions-outline",
          type: "line",
          source: "regions",
          paint: {
            "line-color": "#ffffff",
            "line-width": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              1.4,
              0.3,
            ],
          },
        });

        map.on("mousemove", "regions-fill", (e) => {
          if (!e.features?.length) return;
          const f = e.features[0] as MapGeoJSONFeature;
          map.getCanvas().style.cursor = "pointer";
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "regions", id: hoveredIdRef.current },
              { hover: false },
            );
          }
          hoveredIdRef.current = f.id ?? null;
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "regions", id: hoveredIdRef.current },
              { hover: true },
            );
          }
        });

        map.on("mouseleave", "regions-fill", () => {
          map.getCanvas().style.cursor = "";
          if (hoveredIdRef.current !== null) {
            map.setFeatureState(
              { source: "regions", id: hoveredIdRef.current },
              { hover: false },
            );
          }
          hoveredIdRef.current = null;
        });

        map.on("click", "regions-fill", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const p = (f.properties || {}) as Record<string, unknown>;
          // eslint-disable-next-line no-console
          console.log("Kabupaten/Kota clicked:", {
            kabupaten:
              p.KAB_KOT || p.NAME_2 || p.kabkota || p.name,
            provinsi: p.PROVINSI || p.NAME_1 || p.provinsi,
            value: p.value,
            properties: p,
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load Indonesia regions GeoJSON", err);
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