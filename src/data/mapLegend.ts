
import type { LegendConfig, MapLayerItem } from "@/types/dashboard";
 
// Blue gradient (fallback / global supply)
const BLUE_STOPS = [
  { minValue: 0,   maxValue: 20,  color: "#eaf3fb", label: "Sangat Rendah" },
  { minValue: 20,  maxValue: 40,  color: "#c6dcef", label: "Rendah" },
  { minValue: 40,  maxValue: 60,  color: "#94c0df", label: "Sedang" },
  { minValue: 60,  maxValue: 80,  color: "#5fa1cb", label: "Tinggi" },
  { minValue: 80,  maxValue: 100, color: "#08519c", label: "Sangat Tinggi" },
];

// Market mode — diverging palette (cool → warm) to highlight market heat
const MARKET_STOPS = [
  { minValue: 0,   maxValue: 20,  color: "#2c7bb6", label: "Pasar Lemah" },
  { minValue: 20,  maxValue: 40,  color: "#abd9e9", label: "Pasar Lesu" },
  { minValue: 40,  maxValue: 60,  color: "#ffffbf", label: "Pasar Stabil" },
  { minValue: 60,  maxValue: 80,  color: "#fdae61", label: "Pasar Aktif" },
  { minValue: 80,  maxValue: 100, color: "#d7191c", label: "Pasar Panas" },
];
 
// Red-to-green for surplus/shortage (supply mode)
const SUPPLY_STOPS = [
  { minValue: 0,   maxValue: 20,  color: "#d73027", label: "Defisit Berat" },
  { minValue: 20,  maxValue: 40,  color: "#fc8d59", label: "Defisit Ringan" },
  { minValue: 40,  maxValue: 60,  color: "#fee090", label: "Seimbang" },
  { minValue: 60,  maxValue: 80,  color: "#91cf60", label: "Surplus Ringan" },
  { minValue: 80,  maxValue: 100, color: "#1a9850", label: "Surplus Besar" },
];
 
export const legendConfigs: LegendConfig[] = [
  {
    mode: "market",
    scope: "local",
    metricLabel: "Indeks Pasar Lokal",
    unit: "0–100",
    description: "Komposit dari harga komoditas lokal, inflasi, volatilitas harga, dan tren permintaan per provinsi.",
    stops: MARKET_STOPS,
  },
  {
    mode: "market",
    scope: "global",
    metricLabel: "Indeks Pasar Global",
    unit: "0–100",
    description: "Komposit dari indeks harga jagung, tingkat inflasi, risiko pasar, dan neraca perdagangan per negara.",
    stops: MARKET_STOPS,
  },
  {
    mode: "supply",
    scope: "local",
    metricLabel: "Status Alokasi Supply",
    unit: "0–100",
    description: "Nilai tinggi = surplus pasokan, nilai rendah = kekurangan pasokan. Dihitung dari rasio volume supply vs demand per provinsi.",
    stops: SUPPLY_STOPS,
  },
  {
    mode: "supply",
    scope: "global",
    metricLabel: "Indeks Supply Global",
    unit: "0–100",
    description: "Mencerminkan kemampuan ekspor bersih per negara. Nilai tinggi = eksportir besar, nilai rendah = importir besar.",
    stops: BLUE_STOPS,
  },
];
 
export const mapLayerItems: MapLayerItem[] = [
  {
    id: "sales",
    label: "Sales per Kota / Kab",
    defaultVisible: true,
    relevantModes: ["market", "supply"],
    relevantScopes: ["local"],
  },
  {
    id: "supplies",
    label: "Supplies per Kota / Kab",
    defaultVisible: true,
    relevantModes: ["supply"],
    relevantScopes: ["local"],
  },
  {
    id: "mitra",
    label: "Jumlah Mitra Aktif",
    defaultVisible: false,
    relevantModes: ["supply"],
    relevantScopes: ["local"],
  },
  {
    id: "growth",
    label: "Pertumbuhan YoY",
    defaultVisible: false,
    relevantModes: ["market", "supply"],
    relevantScopes: ["local", "global"],
  },
  {
    id: "risk",
    label: "Sinyal Risiko Pasar",
    defaultVisible: false,
    relevantModes: ["market"],
    relevantScopes: ["local", "global"],
  },
];

