import type {
  DemandTrend,
  DistrictMarketData,
  DistrictSupplyData,
  RegionData,
  RegionMarketData,
  RiskLevel,
  RiskSignal,
} from "@/types/dashboard";

const DISTRICT_FACTORS = [
  "Aktivitas pasar tradisional meningkat",
  "Biaya distribusi intra-kabupaten naik",
  "Permintaan HORECA tumbuh stabil",
  "Pasokan jagung lokal lebih longgar",
  "Kompetisi harga retail makin ketat",
  "Arus barang antar-kota melambat",
  "Penyerapan industri pengolahan membaik",
  "Tekanan ongkir last-mile mulai turun",
];

const normalize = (value: string) =>
  value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const adjustRiskLevel = (base: RiskLevel, shift: number): RiskLevel => {
  const order: RiskLevel[] = ["low", "medium", "high"];
  const currentIndex = order.indexOf(base);
  const nextIndex = clamp(currentIndex + shift, 0, order.length - 1);
  return order[nextIndex];
};

const deriveDemandTrend = (base: DemandTrend, variance: number): DemandTrend => {
  if (variance >= 3) return "growing";
  if (variance <= -3) return "declining";
  return base;
};

const deriveRiskSignal = (marketIndex: number, inflationRate: number): RiskSignal => {
  if (marketIndex >= 70 || inflationRate >= 4.7) return "red";
  if (marketIndex >= 58 || inflationRate >= 3.4) return "yellow";
  return "green";
};

const roundToNearestTen = (value: number) => Math.round(value / 10) * 10;

export const buildDistrictId = (provinceId: string, districtName: string) =>
  `${provinceId}__${normalize(districtName)}`;

export const createDistrictMarketData = (
  region: RegionData,
  districtName: string,
  districtType?: string,
): DistrictMarketData => {
  const seed = hashString(`${region.regionId}:${normalize(districtName)}`);
  const variance = (seed % 11) - 5;
  const priceVariance = ((seed >> 3) % 9) - 4;
  const inflationVariance = (((seed >> 5) % 7) - 3) * 0.12;
  const factorIndex = seed % DISTRICT_FACTORS.length;

  const market: RegionMarketData = {
    avgCornPrice: roundToNearestTen(region.market.avgCornPrice + variance * 35 + priceVariance * 10),
    avgChickenPrice: roundToNearestTen(region.market.avgChickenPrice + variance * 110 + priceVariance * 25),
    avgEggPrice: roundToNearestTen(region.market.avgEggPrice + variance * 90 + priceVariance * 20),
    inflationRate: Number(clamp(region.market.inflationRate + inflationVariance, 1.8, 6.8).toFixed(1)),
    marketIndex: Math.round(clamp(region.market.marketIndex + variance * 2.4, 30, 95)),
    priceVolatility: adjustRiskLevel(region.market.priceVolatility, variance >= 3 ? 1 : variance <= -3 ? -1 : 0),
    demandTrend: deriveDemandTrend(region.market.demandTrend, variance),
    riskSignal: deriveRiskSignal(
      clamp(region.market.marketIndex + variance * 2.4, 30, 95),
      clamp(region.market.inflationRate + inflationVariance, 1.8, 6.8),
    ),
    externalFactors: [
      region.market.externalFactors[0] ?? "Kondisi pasar lokal stabil",
      DISTRICT_FACTORS[factorIndex],
    ],
  };

  return {
    districtId: buildDistrictId(region.regionId, districtName),
    districtName,
    districtType,
    provinceId: region.regionId,
    provinceName: region.provinsi,
    market,
  };
};

export const createDistrictSupplyData = (
  region: RegionData,
  districtName: string,
  districtType?: string,
): DistrictSupplyData => {
  const seed = hashString(`${region.regionId}:SUPPLY:${normalize(districtName)}`);
  const variance = (seed % 13) - 6;
  const demandVariance = ((seed >> 4) % 11) - 5;
  const supplyDelta = Math.round(variance * 18 + demandVariance * 9);
  const demandDelta = Math.round(demandVariance * 14 + variance * 5);

  const suppliesVolumeTon = Math.max(40, region.supply.suppliesVolumeTon + supplyDelta);
  const salesVolumeTon = Math.max(35, region.supply.salesVolumeTon + demandDelta);
  const surplusShortage = suppliesVolumeTon - salesVolumeTon;
  const supplyIndex = Math.round(clamp(region.supply.supplyIndex + variance * 1.6, 18, 98));
  const demandIndex = Math.round(clamp(region.supply.demandIndex + demandVariance * 1.4, 15, 98));
  const yoyGrowth = Number(clamp(region.supply.yoyGrowth + variance * 0.18, -8, 18).toFixed(1));

  return {
    districtId: buildDistrictId(region.regionId, districtName),
    districtName,
    districtType,
    provinceId: region.regionId,
    provinceName: region.provinsi,
    supply: {
      supplyIndex,
      demandIndex,
      surplusShortage,
      totalMitraAktif: Math.max(0, Math.round(region.supply.totalMitraAktif + variance / 2)),
      totalPelanggan: Math.max(1, Math.round(region.supply.totalPelanggan + demandVariance / 2)),
      salesVolumeTon,
      suppliesVolumeTon,
      yoyGrowth,
      allocationStatus: surplusShortage > 40 ? "surplus" : surplusShortage < -40 ? "shortage" : "balanced",
    },
  };
};
