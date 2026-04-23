import type {
    CommodityScope,
    DashboardMode,
    InsightContent,
    LegendConfig,
    Mitra,
    Pelanggan,
    RegionData,
    CountryData,
  } from "@/types/dashboard";
  import { insights } from "@/data/insights";
  import { legendConfigs } from "@/data/mapLegend";
  import { regions } from "@/data/regions";
  import { countries } from "@/data/countries";
  import { mitraList } from "@/data/mitra";
  import { pelangganList } from "@/data/pelanggan";
   
  // ─────────────────────────────────────────────
  // INSIGHT LOOKUPS
  // ─────────────────────────────────────────────
   
  export function getInsightsByMode(
    mode: DashboardMode,
    scope: CommodityScope,
  ): InsightContent[] {
    return insights.filter((i) => i.mode === mode && i.scope === scope);
  }
   
  export function getInsightCard(
    title: "Market Insights" | "Supply Insights" | "General Insights",
    mode: DashboardMode,
    scope: CommodityScope,
  ): InsightContent | undefined {
    const cardMode: DashboardMode =
      title === "Supply Insights" ? "supply" : "market";
    return insights.find((i) => i.title === title && i.mode === cardMode && i.scope === scope);
  }
   
  // ─────────────────────────────────────────────
  // LEGEND LOOKUP
  // ─────────────────────────────────────────────
   
  export function getLegend(
    mode: DashboardMode,
    scope: CommodityScope,
  ): LegendConfig | undefined {
    return legendConfigs.find((l) => l.mode === mode && l.scope === scope);
  }
   
  // ─────────────────────────────────────────────
  // CHOROPLETH VALUE
  // ─────────────────────────────────────────────
   
  export function getChoroplethValue(
    id: string,
    mode: DashboardMode,
    scope: CommodityScope,
  ): number {
    if (scope === "local") {
      const region = regions.find((r) => r.regionId === id || r.isoCode === id);
      if (!region) return 0;
      return mode === "market" ? region.market.marketIndex : region.supply.supplyIndex;
    } else {
      const country = countries.find((c) => c.countryCode === id);
      if (!country) return 0;
      return mode === "market" ? country.market.marketIndex : country.supply.supplyIndex;
    }
  }
   
  // ─────────────────────────────────────────────
  // REGION / COUNTRY LOOKUPS
  // ─────────────────────────────────────────────
   
  export function getRegionById(regionId: string): RegionData | undefined {
    return regions.find((r) => r.regionId === regionId);
  }
   
  export function getCountryByCode(countryCode: string): CountryData | undefined {
    return countries.find((c) => c.countryCode === countryCode);
  }
   
  // ─────────────────────────────────────────────
  // MITRA / PELANGGAN LOOKUPS
  // ─────────────────────────────────────────────
   
  export function getMitraByRegion(regionId: string): Mitra[] {
    return mitraList.filter((m) => m.regionId === regionId && m.status === "aktif");
  }
   
  export function getPelangganByRegion(regionId: string): Pelanggan[] {
    return pelangganList.filter((p) => p.regionId === regionId);
  }
   
  export function getMitraSummaryByRegion(regionId: string) {
    const list = getMitraByRegion(regionId);
    if (list.length === 0) return null;
    const totalCapacity = list.reduce((s, m) => s + m.capacityTonPerMonth, 0);
    const totalAllocation = list.reduce((s, m) => s + m.currentAllocationTon, 0);
    const avgReliability = list.reduce((s, m) => s + m.reliabilityScore, 0) / list.length;
    return {
      count: list.length,
      totalCapacity,
      totalAllocation,
      utilizationRate: totalCapacity > 0 ? (totalAllocation / totalCapacity) * 100 : 0,
      avgReliabilityScore: Math.round(avgReliability),
    };
  }
   
  export function getPelangganSummaryByRegion(regionId: string) {
    const list = getPelangganByRegion(regionId);
    if (list.length === 0) return null;
    const totalDemand = list.reduce((s, p) => s + p.monthlyDemandTon, 0);
    const totalActual = list.reduce((s, p) => s + p.actualOrderLastMonth, 0);
    const byTier = list.reduce(
      (acc, p) => { acc[p.tier] = (acc[p.tier] || 0) + 1; return acc; },
      {} as Record<string, number>,
    );
    return {
      count: list.length,
      totalDemand,
      totalActual,
      fulfillmentRate: totalDemand > 0 ? (totalActual / totalDemand) * 100 : 0,
      byTier,
    };
  }
   
  // ─────────────────────────────────────────────
  // NATIONAL SUPPLY SUMMARY
  // ─────────────────────────────────────────────
   
  export function getNationalSupplySummary() {
    const totalSurplusShortage = regions.reduce(
      (s, r) => s + r.supply.surplusShortage, 0,
    );
    const surplusRegions = regions.filter((r) => r.supply.surplusShortage > 0);
    const shortageRegions = regions.filter((r) => r.supply.surplusShortage < 0);
    const totalMitra = regions.reduce((s, r) => s + r.supply.totalMitraAktif, 0);
    const totalPelanggan = regions.reduce((s, r) => s + r.supply.totalPelanggan, 0);
   
    return {
      totalSurplusShortage,
      netStatus: totalSurplusShortage > 0 ? "surplus" : totalSurplusShortage < 0 ? "shortage" : "balanced",
      surplusRegionCount: surplusRegions.length,
      shortageRegionCount: shortageRegions.length,
      totalMitraAktif: totalMitra,
      totalPelanggan,
    };
  }
  
  