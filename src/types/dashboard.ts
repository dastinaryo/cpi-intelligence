// ─────────────────────────────────────────────
// ENUMS & UNION TYPES
// ─────────────────────────────────────────────
 
export type CommodityScope = "local" | "global";
export type DashboardMode  = "market" | "supply";
export type SupplyTab      = "mitra" | "pelanggan";
 
export type CommodityId = "jagung" | "ayam" | "telur";
export type StockTicker  = "CPIN" | "JPFA" | "MAIN" | "SIPD";
 
export type TrendDirection = "up" | "down" | "stable";
export type RiskLevel      = "low" | "medium" | "high";
export type RiskSignal     = "green" | "yellow" | "red";
export type DemandTrend    = "growing" | "stable" | "declining";
 
// ─────────────────────────────────────────────
// COMMODITY PRICES
// ─────────────────────────────────────────────
 
export interface CommodityPrice {
  id: CommodityId;
  label: string;
  price: number;
  unit: string;
  currency: "IDR" | "USD";
  change: number;
  changeAbs: number;        // derived: price * change / 100
  trend: TrendDirection;    // derived: change > 0.1 → up, < -0.1 → down, else stable
  weeklyHigh: number;
  weeklyLow: number;
  source: string;
  lastUpdated: string;
}
 
export interface CommodityPriceSet {
  scope: CommodityScope;
  asOf: string;
  items: CommodityPrice[];
}
 
// ─────────────────────────────────────────────
// STOCK DATA
// ─────────────────────────────────────────────
 
export interface StockData {
  ticker: StockTicker;
  name: string;
  price: number;
  change: number;
  changeAbs: number;        // derived
  trend: TrendDirection;    // derived
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  marketCapTrillions: number;
  peRatio: number;
  lastUpdated: string;
}
 
// ─────────────────────────────────────────────
// TIME SERIES
// ─────────────────────────────────────────────
 
export interface TimeSeriesPoint {
  date: string;   // "YYYY-MM-DD"
  value: number;
}
 
export interface CommodityHistory {
  commodity: CommodityId;
  scope: CommodityScope;
  currency: "IDR" | "USD";
  unit: string;
  series: TimeSeriesPoint[];  // 12 monthly points
}
 
export interface StockHistory {
  ticker: StockTicker;
  series: TimeSeriesPoint[];  // 12 monthly points
}
 
// ─────────────────────────────────────────────
// DISTRICT DATA — INDONESIA (KABUPATEN/KOTA)
// ─────────────────────────────────────────────

export interface DistrictMarketData {
  districtId: string;
  districtName: string;   // matches GeoJSON NAME_2
  provinceId: string;     // FK → RegionData.regionId
  market: RegionMarketData;
}

// ─────────────────────────────────────────────
// REGION DATA — INDONESIA (33 PROVINSI)
// ─────────────────────────────────────────────
 
export interface RegionMarketData {
  avgCornPrice: number;
  avgChickenPrice: number;
  avgEggPrice: number;
  inflationRate: number;
  marketIndex: number;          // 0–100 derived composite
  priceVolatility: RiskLevel;
  demandTrend: DemandTrend;
  riskSignal: RiskSignal;
  externalFactors: string[];
}
 
export interface RegionSupplyData {
  supplyIndex: number;          // 0–100 derived
  demandIndex: number;
  surplusShortage: number;      // ton, derived: suppliesVol - salesVol
  totalMitraAktif: number;
  totalPelanggan: number;
  salesVolumeTon: number;
  suppliesVolumeTon: number;
  yoyGrowth: number;
  allocationStatus: "surplus" | "balanced" | "shortage";  // derived
}
 
export interface RegionData {
  regionId: string;
  provinsi: string;
  isoCode: string;              // ISO 3166-2:ID e.g. "ID-JB"
  capital: string;
  population: number;           // juta jiwa
  market: RegionMarketData;
  supply: RegionSupplyData;
}
 
// ─────────────────────────────────────────────
// COUNTRY DATA — GLOBAL
// ─────────────────────────────────────────────
 
export interface CountryMarketData {
  cornPriceIndex: number;       // 0–100
  inflationRate: number;
  commodityImportUSD: number;   // juta USD
  marketRisk: RiskLevel;
  marketIndex: number;          // 0–100 derived
  tradeBalance: "surplus" | "deficit" | "neutral";
}
 
export interface CountrySupplyData {
  supplyIndex: number;          // 0–100 derived
  isExporter: boolean;
  exportVolumeTon: number;
  importVolumeTon: number;
  tradeRelation: "partner" | "competitor" | "none";
  keyExportCommodities: string[];
}
 
export interface CountryData {
  countryCode: string;          // ISO 3166-1 alpha-3, matches GeoJSON ISO_A3
  countryName: string;
  region: string;
  market: CountryMarketData;
  supply: CountrySupplyData;
}
 
// ─────────────────────────────────────────────
// MITRA (SUPPLY CHAIN PARTNERS)
// ─────────────────────────────────────────────
 
export type MitraType =
  | "plasma_broiler"
  | "plasma_layer"
  | "koperasi"
  | "distributor_pakan"
  | "farm_mandiri";
 
export type ContractType = "plasma" | "inti_plasma" | "mandiri";
export type MitraStatus  = "aktif" | "probation" | "inactive";
 
export interface Mitra {
  id: string;
  name: string;
  type: MitraType;
  regionId: string;             // FK → RegionData.regionId
  provinsi: string;
  kabupaten: string;
  contractType: ContractType;
  status: MitraStatus;
  capacityTonPerMonth: number;
  currentAllocationTon: number;
  utilizationRate: number;      // derived: allocation/capacity*100
  distanceKm: number;
  leadTimeDays: number;
  logisticsCostPerKg: number;
  reliabilityScore: number;     // 0–100
  onTimeDeliveryRate: number;
  qualityScore: number;
  lastDeliveryDate: string;
  contactPerson?: string;
  notes?: string;
}
 
// ─────────────────────────────────────────────
// PELANGGAN (CUSTOMERS)
// ─────────────────────────────────────────────
 
export type PelangganType =
  | "modern_trade"
  | "horeca"
  | "industri"
  | "traditional"
  | "retail";
 
export type CustomerTier = "platinum" | "gold" | "silver" | "bronze";
 
export interface Pelanggan {
  id: string;
  name: string;
  type: PelangganType;
  tier: CustomerTier;
  regionId: string;             // FK → RegionData.regionId
  provinsi: string;
  kabupaten: string;
  monthlyDemandTon: number;
  actualOrderLastMonth: number;
  forecastNextMonth: number;
  demandTrend: DemandTrend;
  fulfillmentRate: number;      // derived: actual/demand*100
  creditLimitIDR: number;
  paymentTermDays: number;
  outstandingIDR: number;
  distanceKm: number;
  leadTimeDays: number;
  logisticsCostPerKg: number;
  notes?: string;
}
 
// ─────────────────────────────────────────────
// MARKET SIGNALS / RISK INTELLIGENCE
// ─────────────────────────────────────────────
 
export type SignalCategory =
  | "price"
  | "supply_disruption"
  | "demand_shift"
  | "macro"
  | "weather"
  | "regulatory"
  | "geopolitical";
 
export type SignalSeverity = "info" | "warning" | "critical";
export type SignalImpact   = "positive" | "negative" | "neutral";
 
export interface MarketSignal {
  id: string;
  category: SignalCategory;
  severity: SignalSeverity;
  impact: SignalImpact;
  title: string;
  description: string;
  affectedCommodities: CommodityId[];
  affectedRegions: string[];
  scope: CommodityScope | "both";
  date: string;
  source: string;
  expiresAt?: string;
}
 
// ─────────────────────────────────────────────
// AI INSIGHTS
// ─────────────────────────────────────────────
 
export interface InsightItem {
  text: string;
  type: "observation" | "risk" | "opportunity" | "recommendation";
  severity?: RiskLevel;
}
 
export interface InsightContent {
  id: string;
  mode: DashboardMode;
  scope: CommodityScope;
  title: string;
  items: InsightItem[];
  generatedAt: string;
  confidence: "high" | "medium" | "low";
}
 
// ─────────────────────────────────────────────
// AI ASSISTANT QnA
// ─────────────────────────────────────────────
 
export interface AIQuestion {
  id: string;
  question: string;
  category: DashboardMode | "general" | "regional";
  relevantScope: CommodityScope | "both";
  answer: string;
  followUps: string[];
  relatedSignalIds?: string[];
}
 
// ─────────────────────────────────────────────
// MAP LEGEND CONFIG
// ─────────────────────────────────────────────
 
export interface LegendStop {
  minValue: number;
  maxValue: number;
  color: string;
  label: string;
}
 
export interface LegendConfig {
  mode: DashboardMode;
  scope: CommodityScope;
  metricLabel: string;
  unit: string;
  description: string;
  stops: LegendStop[];
}
 
// ─────────────────────────────────────────────
// MAP LAYER CONFIG (MapLegendChecklist)
// ─────────────────────────────────────────────
 
export interface MapLayerItem {
  id: string;
  label: string;
  defaultVisible: boolean;
  relevantModes: DashboardMode[];
  relevantScopes: CommodityScope[];
}