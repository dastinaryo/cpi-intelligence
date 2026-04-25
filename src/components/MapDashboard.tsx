import { useEffect, useMemo, useRef } from "react";
import maplibregl, { type ExpressionSpecification, Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { countries, createDistrictMarketData, createDistrictSupplyData, legendConfigs, regions } from "@/data";
import type {
  CommodityScope,
  CountryData,
  DashboardMode,
  DistrictMarketData,
  DistrictSupplyData,
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
const countryByName = new Map(countries.map((country) => [normalize(country.countryName), country]));

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

const COUNTRY_NAME_ALIASES: Record<string, string> = {
  UNITED_STATES: "USA",
  UNITED_STATES_OF_AMERICA: "USA",
  SOUTH_KOREA: "KOR",
  REPUBLIC_OF_KOREA: "KOR",
  RUSSIA: "RUS",
  RUSSIAN_FEDERATION: "RUS",
  VIET_NAM: "VNM",
  COTE_D_IVOIRE: "CIV",
  IVORY_COAST: "CIV",
  CZECH_REPUBLIC: "CZE",
  SYRIA: "SYR",
  BOLIVIA_PLURINATIONAL_STATE_OF: "BOL",
  VENEZUELA_BOLIVARIAN_REPUBLIC_OF: "VEN",
  LAO_PEOPLE_S_DEMOCRATIC_REPUBLIC: "LAO",
  UNITED_REPUBLIC_OF_TANZANIA: "TZA",
};

const resolveCountryFromFeature = (properties: Record<string, unknown>): CountryData | undefined => {
  const candidateCodes = [
    properties.code,
    properties.ISO_A3,
    properties.ISO_A3_EH,
    properties.WB_A3,
    properties.ADM0_A3,
    properties.BRK_A3,
    properties.GU_A3,
    properties.SOV_A3,
  ]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .map((value) => value.toUpperCase());

  for (const code of candidateCodes) {
    const country = countryByCode.get(code);
    if (country) return country;
  }

  const rawName =
    (properties.ADMIN as string) ||
    (properties.NAME as string) ||
    (properties.name as string) ||
    "";
  if (!rawName) return undefined;

  const nameKey = normalize(rawName);
  const aliasCode = COUNTRY_NAME_ALIASES[nameKey];
  if (aliasCode) {
    return countryByCode.get(aliasCode);
  }

  return countryByName.get(nameKey);
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

const getDistrictSupplyValue = (district: DistrictSupplyData, perspective: SupplyTab) => {
  if (perspective === "mitra") {
    return clamp(50 + district.supply.surplusShortage / 22);
  }

  const serviceGap = district.supply.supplyIndex - district.supply.demandIndex;
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

type SupplyActorType = "supplier" | "feedmill" | "farm";
type ConnectionHealth = "normal" | "risk";

interface SupplyActorNode {
  id: string;
  type: SupplyActorType;
  stageOrder: number;
  healthStatus?: ConnectionHealth;
  healthColor?: string;
  regionId?: string;
  districtId?: string;
  countryCode?: string;
  districtName: string;
  provinceName: string;
  districtType?: string;
  coordinate: [number, number];
}

interface ActorLocationInput {
  name: string;
  preferredType?: string;
}

interface GlobalActorLocationInput {
  countryCode: string;
}

interface ActorLocationCandidate {
  regionId?: string;
  districtId?: string;
  countryCode?: string;
  districtName: string;
  provinceName: string;
  districtType?: string;
  coordinate: [number, number];
}

interface SupplyActorConnection {
  id: string;
  fromId: string;
  toId: string;
  fromType: SupplyActorType;
  toType: SupplyActorType;
  distanceKm: number;
  tonPerMonth: number;
  costPerKg: number;
  totalCostMillionIdr: number;
  healthStatus: ConnectionHealth;
  healthColor: string;
  recommendedToId?: string;
  issue: string;
  recommendation: string;
}

const ACTOR_STYLE: Record<SupplyActorType, { label: string; color: string; stage: number; icon: string }> = {
  supplier: { label: "Supplier", color: "#1d4ed8", stage: 1, icon: "🚚" },
  feedmill: { label: "Feedmill", color: "#7c3aed", stage: 2, icon: "🏭" },
  farm: { label: "Farm", color: "#059669", stage: 3, icon: "🐔" },
};

const ACTOR_COORDINATE_OFFSET: Record<SupplyActorType, [number, number]> = {
  supplier: [-0.2, 0.14],
  feedmill: [0, -0.2],
  farm: [0.2, 0.14],
};

const applyActorCoordinateOffset = (
  coordinate: [number, number],
  actorType: SupplyActorType,
): [number, number] => {
  const [lonOffset, latOffset] = ACTOR_COORDINATE_OFFSET[actorType];
  return [coordinate[0] + lonOffset, coordinate[1] + latOffset];
};

const SUPPLIER_LOCATIONS: ActorLocationInput[] = [
  { name: "Kabupaten Sidoarjo", preferredType: "Kabupaten" },
  { name: "Kabupaten Kediri", preferredType: "Kabupaten" },
  { name: "Kabupaten Mojokerto", preferredType: "Kabupaten" },
  { name: "Kabupaten Bandung", preferredType: "Kabupaten" },
  { name: "Kabupaten Bandung Barat", preferredType: "Kabupaten" },
  { name: "Kabupaten Bogor", preferredType: "Kabupaten" },
  { name: "Jakarta Utara" },
];

const FEEDMILL_LOCATIONS: ActorLocationInput[] = [
  { name: "Medan" },
  { name: "Padang" },
  { name: "Lampung" },
  { name: "Balaraja" },
  { name: "Cirebon" },
  { name: "Semarang" },
  { name: "Surabaya" },
  { name: "Makassar" },
];

const FARM_LOCATIONS: ActorLocationInput[] = [
  { name: "Jayapura" },
  { name: "Bandung" },
  { name: "Purwakarta" },
  { name: "Bandung Barat" },
  { name: "Sukabumi" },
  { name: "Lebak" },
  { name: "Mojokerto" },
  { name: "Sidoarjo" },
  { name: "Jembrana" },
  { name: "Tabanan" },
  { name: "Deli Serdang" },
];

const SUPPLIER_GLOBAL_LOCATIONS: GlobalActorLocationInput[] = [
  { countryCode: "BRA" },
  { countryCode: "ARG" },
  { countryCode: "USA" },
  { countryCode: "UKR" },
  { countryCode: "IND" },
  { countryCode: "THA" },
  { countryCode: "VNM" },
];

const FEEDMILL_GLOBAL_LOCATIONS: GlobalActorLocationInput[] = [
  { countryCode: "IDN" },
  { countryCode: "PHL" },
  { countryCode: "JPN" },
  { countryCode: "SAU" },
  { countryCode: "EGY" },
  { countryCode: "MEX" },
  { countryCode: "TUR" },
  { countryCode: "KOR" },
];

const FARM_GLOBAL_LOCATIONS: GlobalActorLocationInput[] = [
  { countryCode: "CHN" },
  { countryCode: "IDN" },
  { countryCode: "JPN" },
  { countryCode: "PHL" },
  { countryCode: "VNM" },
  { countryCode: "MYS" },
  { countryCode: "NGA" },
  { countryCode: "ZAF" },
];

const cleanLocationToken = (value: string) =>
  normalize(value)
    .replace(/^(KABUPATEN|KOTA|KOTA_ADM|KOTA_ADMINISTRASI)_+/, "")
    .replace(/_+REGENCY$|_+CITY$/, "");

const toFeatureCoordinate = (geometry: GeoJSON.Geometry | null | undefined): [number, number] | null => {
  if (!geometry) return null;

  const positions: [number, number][] = [];
  const walk = (value: unknown) => {
    if (!Array.isArray(value)) return;
    if (value.length >= 2 && typeof value[0] === "number" && typeof value[1] === "number") {
      positions.push([value[0], value[1]]);
      return;
    }
    value.forEach((child) => walk(child));
  };

  walk((geometry as GeoJSON.Geometry).coordinates);
  if (positions.length === 0) return null;

  let minX = positions[0][0];
  let maxX = positions[0][0];
  let minY = positions[0][1];
  let maxY = positions[0][1];

  positions.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });

  return [(minX + maxX) / 2, (minY + maxY) / 2];
};

const distanceKm = (a: [number, number], b: [number, number]) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const [lon1, lat1] = a;
  const [lon2, lat2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const pLat1 = toRad(lat1);
  const pLat2 = toRad(lat2);
  const hav =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(pLat1) * Math.cos(pLat2) * Math.sin(dLon / 2) ** 2;

  return 6371 * (2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav)));
};

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const CONNECTION_HEALTH_STYLE: Record<
  ConnectionHealth,
  { label: string; color: string }
> = {
  normal: { label: "Normal", color: "#111827" },
  risk: { label: "Risiko Tinggi", color: "#dc2626" },
};

const CONNECTION_HEALTH_PRIORITY: Record<ConnectionHealth, number> = {
  normal: 0,
  risk: 1,
};

const NODE_INDICATOR_COLOR: Record<ConnectionHealth, string> = {
  normal: "#ffffff",
  risk: "#dc2626",
};

const formatAltNodeNames = (names: string[]) => {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} dan ${names[1]}`;
  return `${names[0]}, ${names[1]}, dll`;
};

const getConnectionEfficiencyScore = (connection: SupplyActorConnection) =>
  connection.costPerKg + connection.distanceKm * 1.2;

const evaluateConnectionPortfolio = (
  rawConnections: SupplyActorConnection[],
  actorById: Map<string, SupplyActorNode>,
) =>
  rawConnections.map((connection) => {
    const sameStageOptions = rawConnections.filter(
      (candidate) =>
        candidate.fromId === connection.fromId &&
        candidate.toType === connection.toType &&
        candidate.id !== connection.id,
    );

    if (sameStageOptions.length === 0) {
      return {
        ...connection,
        healthStatus: "normal" as ConnectionHealth,
        healthColor: CONNECTION_HEALTH_STYLE.normal.color,
        issue: "Rute ini belum punya alternatif langsung pada tahap distribusi yang sama.",
        recommendation: "Pertahankan rute saat ini dan bangun opsi node cadangan untuk mitigasi gangguan.",
      };
    }

    const currentScore = getConnectionEfficiencyScore(connection);
    const sortedAlternatives = [...sameStageOptions].sort(
      (a, b) => getConnectionEfficiencyScore(a) - getConnectionEfficiencyScore(b),
    );
    const optionScores = [currentScore, ...sameStageOptions.map(getConnectionEfficiencyScore)].sort((a, b) => a - b);
    const bestAlternative = sortedAlternatives[0];
    const bestAlternativeScore = getConnectionEfficiencyScore(bestAlternative);
    const worstScore = optionScores[optionScores.length - 1];

    const strongerAlternatives = sortedAlternatives.filter((candidate) => {
      const scoreGapRatio = (currentScore - getConnectionEfficiencyScore(candidate)) / Math.max(currentScore, 1);
      const costGap = connection.costPerKg - candidate.costPerKg;
      const distanceGap = connection.distanceKm - candidate.distanceKm;
      return scoreGapRatio >= 0.12 && (costGap >= 140 || distanceGap >= 180);
    });

    const strongestGapRatio = (currentScore - bestAlternativeScore) / Math.max(currentScore, 1);
    const isWorstOption = currentScore >= worstScore - 0.0001;
    const healthStatus: ConnectionHealth =
      (strongerAlternatives.length >= 1 && strongestGapRatio >= 0.1) ||
      (isWorstOption && strongestGapRatio >= 0.16)
        ? "risk"
        : "normal";

    const topAlternativeNames = strongerAlternatives
      .slice(0, 2)
      .map((candidate) => actorById.get(candidate.toId)?.districtName)
      .filter((name): name is string => Boolean(name));

    const bestAltNode = actorById.get(bestAlternative.toId);
    const bestAltName = bestAltNode?.districtName ?? "node alternatif";
    const altLabel = formatAltNodeNames(topAlternativeNames);

    const issue =
      healthStatus === "risk"
        ? `Ada alternatif lebih efisien (${altLabel || bestAltName}); rute saat ini menambah biaya/lead time secara signifikan.`
        : "Rute ini masih kompetitif dibanding opsi alternatif yang tersedia dari node asal yang sama.";

    const recommendation =
      healthStatus === "risk"
        ? `Alihkan volume bertahap ke ${altLabel || bestAltName} dan pertahankan rute ini hanya sebagai backup.`
        : "Pertahankan rute saat ini. Lakukan review alternatif mingguan untuk menjaga efisiensi.";

    return {
      ...connection,
      healthStatus,
      healthColor: CONNECTION_HEALTH_STYLE[healthStatus].color,
      recommendedToId: healthStatus === "risk" ? bestAlternative.toId : undefined,
      issue,
      recommendation,
    };
  });

const getNearestNodes = (
  source: SupplyActorNode,
  targets: SupplyActorNode[],
  count: number,
) =>
  [...targets]
    .sort((a, b) => distanceKm(source.coordinate, a.coordinate) - distanceKm(source.coordinate, b.coordinate))
    .slice(0, count);

const buildSupplyActorNetwork = (
  geojson: GeoJSON.FeatureCollection,
): { nodes: SupplyActorNode[]; connections: SupplyActorConnection[] } => {
  const locationIndex = new Map<string, ActorLocationCandidate[]>();
  const pushLocationIndex = (key: string, candidate: ActorLocationCandidate) => {
    const list = locationIndex.get(key) ?? [];
    list.push(candidate);
    locationIndex.set(key, list);
  };

  geojson.features.forEach((feature) => {
    const properties = (feature.properties || {}) as Record<string, unknown>;
    const regionId = (properties.regionId as string) || undefined;
    const districtId = (properties.districtId as string) || undefined;
    const districtName = (properties.NAME_2 as string) || "";
    const provinceName = (properties.NAME_1 as string) || "";
    const districtType = (properties.TYPE_2 as string) || undefined;
    const coordinate = toFeatureCoordinate(feature.geometry);
    if (!districtName || !coordinate) return;

    const candidate: ActorLocationCandidate = {
      regionId,
      districtId,
      districtName,
      provinceName,
      districtType,
      coordinate,
    };

    pushLocationIndex(cleanLocationToken(districtName), candidate);
    pushLocationIndex(cleanLocationToken(`${districtType ?? ""} ${districtName}`), candidate);
  });

  const resolveActorLocation = (input: ActorLocationInput): ActorLocationCandidate | null => {
    const candidates = locationIndex.get(cleanLocationToken(input.name)) ?? [];
    if (candidates.length === 0) return null;
    if (!input.preferredType) return candidates[0];

    const preferred = candidates.find((item) =>
      cleanLocationToken(item.districtType ?? "").includes(cleanLocationToken(input.preferredType ?? "")),
    );

    return preferred ?? candidates[0];
  };

  const mapActorNodes = (type: SupplyActorType, inputs: ActorLocationInput[]) =>
    inputs
      .map((input, index) => {
        const location = resolveActorLocation(input);
        if (!location) return null;

        return {
          id: `${type}-${index + 1}`,
          type,
          stageOrder: ACTOR_STYLE[type].stage,
          regionId: location.regionId,
          districtId: location.districtId,
          countryCode: location.countryCode,
          districtName: location.districtName,
          provinceName: location.provinceName,
          districtType: location.districtType,
          coordinate: applyActorCoordinateOffset(location.coordinate, type),
        } as SupplyActorNode;
      })
      .filter((node): node is SupplyActorNode => Boolean(node));

  const suppliers = mapActorNodes("supplier", SUPPLIER_LOCATIONS);
  const feedmills = mapActorNodes("feedmill", FEEDMILL_LOCATIONS);
  const farms = mapActorNodes("farm", FARM_LOCATIONS);

  const connections: SupplyActorConnection[] = [];
  const connectionSet = new Set<string>();
  const addConnection = (fromNode: SupplyActorNode, toNode: SupplyActorNode) => {
    const key = `${fromNode.id}->${toNode.id}`;
    if (connectionSet.has(key)) return;
    connectionSet.add(key);
    const routeDistance = distanceKm(fromNode.coordinate, toNode.coordinate);
    const routeSeed = hashString(key);
    const isSupplierToFeedmill = fromNode.type === "supplier" && toNode.type === "feedmill";
    const tonPerMonth = isSupplierToFeedmill
      ? 140 + (routeSeed % 120)
      : 60 + (routeSeed % 90);
    const baseCostPerKg = isSupplierToFeedmill ? 220 : 350;
    const distanceFactor = isSupplierToFeedmill ? 3.2 : 4.5;
    const costPerKg = Math.round(baseCostPerKg + routeDistance * distanceFactor);
    const totalCostMillionIdr = Number(((tonPerMonth * 1000 * costPerKg) / 1_000_000).toFixed(1));

    connections.push({
      id: key,
      fromId: fromNode.id,
      toId: toNode.id,
      fromType: fromNode.type,
      toType: toNode.type,
      distanceKm: Number(routeDistance.toFixed(1)),
      tonPerMonth,
      costPerKg,
      totalCostMillionIdr,
      healthStatus: "normal",
      healthColor: CONNECTION_HEALTH_STYLE.normal.color,
      issue: "",
      recommendation: "",
    });
  };

  suppliers.forEach((supplier) => {
    getNearestNodes(supplier, feedmills, 2).forEach((feedmill) => addConnection(supplier, feedmill));
  });

  feedmills.forEach((feedmill) => {
    getNearestNodes(feedmill, farms, 3).forEach((farm) => addConnection(feedmill, farm));
  });

  const nodes = [...suppliers, ...feedmills, ...farms];
  const actorById = new Map(nodes.map((node) => [node.id, node]));
  const evaluatedConnections = evaluateConnectionPortfolio(connections, actorById);
  const nodeHealth = new Map<string, ConnectionHealth>(
    nodes.map((node) => [node.id, "normal" as ConnectionHealth]),
  );

  evaluatedConnections.forEach((connection) => {
    const fromHealth = nodeHealth.get(connection.fromId) ?? "normal";
    const toHealth = nodeHealth.get(connection.toId) ?? "normal";
    if (CONNECTION_HEALTH_PRIORITY[connection.healthStatus] > CONNECTION_HEALTH_PRIORITY[fromHealth]) {
      nodeHealth.set(connection.fromId, connection.healthStatus);
    }
    if (CONNECTION_HEALTH_PRIORITY[connection.healthStatus] > CONNECTION_HEALTH_PRIORITY[toHealth]) {
      nodeHealth.set(connection.toId, connection.healthStatus);
    }
  });

  const nodesWithHealth = nodes.map((node) => {
    const healthStatus = nodeHealth.get(node.id) ?? "normal";
    return {
      ...node,
      healthStatus,
      healthColor: NODE_INDICATOR_COLOR[healthStatus],
    };
  });

  return { nodes: nodesWithHealth, connections: evaluatedConnections };
};

const buildGlobalSupplyActorNetwork = (
  geojson: GeoJSON.FeatureCollection,
): { nodes: SupplyActorNode[]; connections: SupplyActorConnection[] } => {
  const countryIndex = new Map<string, ActorLocationCandidate>();

  geojson.features.forEach((feature) => {
    const properties = (feature.properties || {}) as Record<string, unknown>;
    const country = resolveCountryFromFeature(properties);
    const coordinate = toFeatureCoordinate(feature.geometry);
    if (!country || !coordinate) return;

    countryIndex.set(country.countryCode, {
      countryCode: country.countryCode,
      districtName: country.countryName,
      provinceName: country.region,
      coordinate,
    });
  });

  const mapActorNodes = (type: SupplyActorType, inputs: GlobalActorLocationInput[]) =>
    inputs
      .map((input, index) => {
        const location = countryIndex.get(input.countryCode);
        if (!location) return null;

        return {
          id: `${type}-${index + 1}`,
          type,
          stageOrder: ACTOR_STYLE[type].stage,
          countryCode: location.countryCode,
          districtName: location.districtName,
          provinceName: location.provinceName,
          coordinate: applyActorCoordinateOffset(location.coordinate, type),
        } as SupplyActorNode;
      })
      .filter((node): node is SupplyActorNode => Boolean(node));

  const suppliers = mapActorNodes("supplier", SUPPLIER_GLOBAL_LOCATIONS);
  const feedmills = mapActorNodes("feedmill", FEEDMILL_GLOBAL_LOCATIONS);
  const farms = mapActorNodes("farm", FARM_GLOBAL_LOCATIONS);

  const connections: SupplyActorConnection[] = [];
  const connectionSet = new Set<string>();
  const addConnection = (fromNode: SupplyActorNode, toNode: SupplyActorNode) => {
    const key = `${fromNode.id}->${toNode.id}`;
    if (connectionSet.has(key)) return;
    connectionSet.add(key);
    const routeDistance = distanceKm(fromNode.coordinate, toNode.coordinate);
    const routeSeed = hashString(key);
    const isSupplierToFeedmill = fromNode.type === "supplier" && toNode.type === "feedmill";
    const tonPerMonth = isSupplierToFeedmill
      ? 180 + (routeSeed % 140)
      : 90 + (routeSeed % 120);
    const baseCostPerKg = isSupplierToFeedmill ? 420 : 560;
    const distanceFactor = isSupplierToFeedmill ? 0.8 : 1.0;
    const costPerKg = Math.round(baseCostPerKg + routeDistance * distanceFactor);
    const totalCostMillionIdr = Number(((tonPerMonth * 1000 * costPerKg) / 1_000_000).toFixed(1));
    connections.push({
      id: key,
      fromId: fromNode.id,
      toId: toNode.id,
      fromType: fromNode.type,
      toType: toNode.type,
      distanceKm: Number(routeDistance.toFixed(1)),
      tonPerMonth,
      costPerKg,
      totalCostMillionIdr,
      healthStatus: "normal",
      healthColor: CONNECTION_HEALTH_STYLE.normal.color,
      issue: "",
      recommendation: "",
    });
  };

  suppliers.forEach((supplier) => {
    getNearestNodes(supplier, feedmills, 2).forEach((feedmill) => addConnection(supplier, feedmill));
  });

  feedmills.forEach((feedmill) => {
    getNearestNodes(feedmill, farms, 3).forEach((farm) => addConnection(feedmill, farm));
  });

  const nodes = [...suppliers, ...feedmills, ...farms];
  const actorById = new Map(nodes.map((node) => [node.id, node]));
  const evaluatedConnections = evaluateConnectionPortfolio(connections, actorById);
  const nodeHealth = new Map<string, ConnectionHealth>(
    nodes.map((node) => [node.id, "normal" as ConnectionHealth]),
  );

  evaluatedConnections.forEach((connection) => {
    const fromHealth = nodeHealth.get(connection.fromId) ?? "normal";
    const toHealth = nodeHealth.get(connection.toId) ?? "normal";
    if (CONNECTION_HEALTH_PRIORITY[connection.healthStatus] > CONNECTION_HEALTH_PRIORITY[fromHealth]) {
      nodeHealth.set(connection.fromId, connection.healthStatus);
    }
    if (CONNECTION_HEALTH_PRIORITY[connection.healthStatus] > CONNECTION_HEALTH_PRIORITY[toHealth]) {
      nodeHealth.set(connection.toId, connection.healthStatus);
    }
  });

  const nodesWithHealth = nodes.map((node) => {
    const healthStatus = nodeHealth.get(node.id) ?? "normal";
    return {
      ...node,
      healthStatus,
      healthColor: NODE_INDICATOR_COLOR[healthStatus],
    };
  });

  return { nodes: nodesWithHealth, connections: evaluatedConnections };
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
  actor?: {
    id: string;
    type: SupplyActorType;
    districtName: string;
    provinceName: string;
    inboundSummary: { totalTonPerMonth: number; totalCostMillionIdr: number };
    outboundSummary: { totalTonPerMonth: number; totalCostMillionIdr: number };
    inbound: Array<{
      id: string;
      type: SupplyActorType;
      districtName: string;
      provinceName: string;
      tonPerMonth: number;
      costPerKg: number;
      totalCostMillionIdr: number;
      distanceKm: number;
      healthStatus: ConnectionHealth;
      healthColor: string;
      issue: string;
      recommendation: string;
    }>;
    outbound: Array<{
      id: string;
      type: SupplyActorType;
      districtName: string;
      provinceName: string;
      tonPerMonth: number;
      costPerKg: number;
      totalCostMillionIdr: number;
      distanceKm: number;
      healthStatus: ConnectionHealth;
      healthColor: string;
      issue: string;
      recommendation: string;
    }>;
  };
  district?: DistrictMarketData;
  districtSupply?: DistrictSupplyData;
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
  const showConnectionRisk = mode === "supply" && supplyPerspective === "mitra";

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
            const country = resolveCountryFromFeature(properties);
            const metricValue = getMetricValue(undefined, country, mode, scope, supplyPerspective);

            properties.hasData = metricValue !== null;
            properties.value = metricValue ?? 0;
            properties.code =
              country?.countryCode ||
              (properties.ISO_A3 as string) ||
              (properties.ADM0_A3 as string) ||
              "";
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

          let setActiveActor = (_actorId: string | null) => {};
          if (mode === "supply" && supplyPerspective === "mitra") {
            const actorNetwork = buildGlobalSupplyActorNetwork(geojson as GeoJSON.FeatureCollection);
            const actorById = new Map(actorNetwork.nodes.map((node) => [node.id, node]));

            const actorNodesGeoJson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
              type: "FeatureCollection",
              features: actorNetwork.nodes.map((node) => ({
                type: "Feature",
                id: node.id,
                geometry: { type: "Point", coordinates: node.coordinate },
                properties: {
                  actorId: node.id,
                  actorType: node.type,
                  actorTypeLabel: ACTOR_STYLE[node.type].label,
                  actorIcon: ACTOR_STYLE[node.type].icon,
                  actorColor: ACTOR_STYLE[node.type].color,
                  districtName: node.districtName,
                  provinceName: node.provinceName,
                  countryCode: node.countryCode,
                  stageOrder: node.stageOrder,
                  nodeHealthStatus: node.healthStatus ?? "normal",
                  nodeHealthColor: node.healthColor ?? NODE_INDICATOR_COLOR.normal,
                },
              })),
            };

            const actorConnectionsGeoJson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
              type: "FeatureCollection",
              features: actorNetwork.connections
                .map((connection) => {
                  const fromNode = actorById.get(connection.fromId);
                  const toNode = actorById.get(connection.toId);
                  if (!fromNode || !toNode) return null;

                  return {
                    type: "Feature" as const,
                    id: connection.id,
                    geometry: {
                      type: "LineString" as const,
                      coordinates: [fromNode.coordinate, toNode.coordinate],
                    },
                    properties: {
                      connectionId: connection.id,
                      fromId: connection.fromId,
                      toId: connection.toId,
                      recommendedToId: connection.recommendedToId ?? "",
                      fromType: connection.fromType,
                      toType: connection.toType,
                      tonPerMonth: connection.tonPerMonth,
                      costPerKg: connection.costPerKg,
                      totalCostMillionIdr: connection.totalCostMillionIdr,
                      distanceKm: connection.distanceKm,
                      healthStatus: connection.healthStatus,
                      healthColor: connection.healthColor,
                    },
                  };
                })
                .filter(
                  (
                    feature,
                  ): feature is GeoJSON.Feature<GeoJSON.LineString, Record<string, string>> => Boolean(feature),
                ),
            };

            const recommendationSet = new Set<string>();
            const actorRecommendationsGeoJson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
              type: "FeatureCollection",
              features: actorNetwork.connections
                .map((connection) => {
                  if (connection.healthStatus !== "risk" || !connection.recommendedToId) return null;
                  const recommendationKey = `${connection.fromId}->${connection.recommendedToId}`;
                  if (recommendationSet.has(recommendationKey)) return null;
                  recommendationSet.add(recommendationKey);
                  const fromNode = actorById.get(connection.fromId);
                  const recommendedNode = actorById.get(connection.recommendedToId);
                  if (!fromNode || !recommendedNode) return null;

                  return {
                    type: "Feature" as const,
                    id: `rec-${connection.id}`,
                    geometry: {
                      type: "LineString" as const,
                      coordinates: [fromNode.coordinate, recommendedNode.coordinate],
                    },
                    properties: {
                      fromId: connection.fromId,
                      toId: connection.recommendedToId,
                      riskyToId: connection.toId,
                    },
                  };
                })
                .filter(
                  (
                    feature,
                  ): feature is GeoJSON.Feature<GeoJSON.LineString, Record<string, string>> => Boolean(feature),
                ),
            };

            map.addSource("actor-nodes", { type: "geojson", data: actorNodesGeoJson });
            map.addSource("actor-connections", { type: "geojson", data: actorConnectionsGeoJson });
            map.addSource("actor-recommendations", { type: "geojson", data: actorRecommendationsGeoJson });

            map.addLayer({
              id: "actor-connections-active",
              type: "line",
              source: "actor-connections",
              paint: {
                "line-color": ["case", ["==", ["get", "healthStatus"], "risk"], "#dc2626", "#111827"],
                "line-opacity": 0.8,
                "line-width": ["case", ["==", ["get", "healthStatus"], "risk"], 3.2, 2.5],
              },
              filter: ["==", ["get", "fromId"], "__none__"],
            });

            map.addLayer({
              id: "actor-recommendations-base",
              type: "line",
              source: "actor-recommendations",
              paint: {
                "line-color": "#16a34a",
                "line-width": 1.4,
                "line-opacity": 0.95,
              },
              filter: ["==", ["get", "fromId"], "__none__"],
            });

            map.addLayer({
              id: "actor-recommendations-active",
              type: "line",
              source: "actor-recommendations",
              paint: {
                "line-color": "#16a34a",
                "line-width": 2.2,
                "line-opacity": 0.95,
                "line-dasharray": [2, 2],
              },
              filter: ["==", ["get", "fromId"], "__none__"],
            });

            map.addLayer({
              id: "actor-pins",
              type: "circle",
              source: "actor-nodes",
              paint: {
                "circle-color": ["get", "actorColor"],
                "circle-radius": 16,
                "circle-stroke-width": 4,
                "circle-stroke-color": ["coalesce", ["get", "nodeHealthColor"], NODE_INDICATOR_COLOR.normal],
                "circle-pitch-alignment": "viewport",
                "circle-pitch-scale": "viewport",
              },
            });

            map.addLayer({
              id: "actor-pins-hitbox",
              type: "circle",
              source: "actor-nodes",
              paint: {
                "circle-color": "#000000",
                "circle-radius": 14,
                "circle-opacity": 0,
                "circle-stroke-width": 0,
                "circle-pitch-alignment": "viewport",
                "circle-pitch-scale": "viewport",
              },
            });

            map.addLayer({
              id: "actor-pins-selected",
              type: "circle",
              source: "actor-nodes",
              paint: {
                "circle-color": "#0f172a",
                "circle-radius": 13,
                "circle-opacity": 0.2,
                "circle-stroke-width": 2.5,
                "circle-stroke-color": "#0f172a",
                "circle-pitch-alignment": "viewport",
                "circle-pitch-scale": "viewport",
              },
              filter: ["==", ["get", "actorId"], "__none__"],
            });

            map.addLayer({
              id: "actor-pin-labels",
              type: "symbol",
              source: "actor-nodes",
              layout: {
                "text-field": ["get", "actorIcon"],
                "text-size": 14,
                "text-allow-overlap": true,
              },
              paint: {
                "text-color": "#ffffff",
                "text-halo-color": "rgba(0,0,0,0.2)",
                "text-halo-width": 0.5,
              },
            });

            setActiveActor = (actorId: string | null) => {
              const activeFilter = actorId
                ? [
                    "any",
                    ["==", ["get", "fromId"], actorId],
                    ["==", ["get", "toId"], actorId],
                  ]
                : ["==", ["get", "fromId"], "__none__"];
              const activeActorType = actorId ? actorById.get(actorId)?.type : undefined;
              const recommendationFilter =
                actorId && activeActorType === "feedmill"
                  ? ["==", ["get", "fromId"], actorId]
                  : ["==", ["get", "fromId"], "__none__"];

              map.setFilter("actor-connections-active", activeFilter as ExpressionSpecification);
              map.setFilter("actor-recommendations-base", recommendationFilter as ExpressionSpecification);
              map.setFilter("actor-recommendations-active", recommendationFilter as ExpressionSpecification);
              map.setFilter(
                "actor-pins-selected",
                actorId ? ["==", ["get", "actorId"], actorId] : ["==", ["get", "actorId"], "__none__"],
              );
            };

            map.on("mousemove", "actor-pins-hitbox", (event) => {
              if (!event.features?.length) return;
              const feature = event.features[0] as MapGeoJSONFeature;
              const properties = (feature.properties || {}) as Record<string, unknown>;
              map.getCanvas().style.cursor = "pointer";

              const actorLabel = (properties.actorTypeLabel as string) || "Actor";
              const countryName = (properties.districtName as string) || "-";
              const worldRegion = (properties.provinceName as string) || "-";
              showTooltip(event.point.x, event.point.y, `${actorLabel} • ${countryName}, ${worldRegion}`);
            });

            map.on("mouseleave", "actor-pins-hitbox", () => {
              map.getCanvas().style.cursor = "";
              hideTooltip();
            });

            map.on("click", "actor-pins-hitbox", (event) => {
              const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
              if (!feature) return;
              const properties = (feature.properties || {}) as Record<string, unknown>;
              const actorId = (properties.actorId as string) || "";
              const actor = actorById.get(actorId);
              if (!actor) return;

              setActiveActor(actor.id);

              const inbound = actorNetwork.connections
                .filter((connection) => connection.toId === actor.id)
                .map((connection) => {
                  const node = actorById.get(connection.fromId);
                  if (!node) return null;
                  return {
                    id: node.id,
                    type: node.type,
                    districtName: node.districtName,
                    provinceName: node.provinceName,
                    tonPerMonth: connection.tonPerMonth,
                    costPerKg: connection.costPerKg,
                    totalCostMillionIdr: connection.totalCostMillionIdr,
                    distanceKm: connection.distanceKm,
                    healthStatus: connection.healthStatus,
                    healthColor: connection.healthColor,
                    issue: connection.issue,
                    recommendation: connection.recommendation,
                  };
                })
                .filter(
                  (
                    node,
                  ): node is {
                    id: string;
                    type: SupplyActorType;
                    districtName: string;
                    provinceName: string;
                    tonPerMonth: number;
                    costPerKg: number;
                    totalCostMillionIdr: number;
                    distanceKm: number;
                    healthStatus: ConnectionHealth;
                    healthColor: string;
                    issue: string;
                    recommendation: string;
                  } => Boolean(node),
                );

              const outbound = actorNetwork.connections
                .filter((connection) => connection.fromId === actor.id)
                .map((connection) => {
                  const node = actorById.get(connection.toId);
                  if (!node) return null;
                  return {
                    id: node.id,
                    type: node.type,
                    districtName: node.districtName,
                    provinceName: node.provinceName,
                    tonPerMonth: connection.tonPerMonth,
                    costPerKg: connection.costPerKg,
                    totalCostMillionIdr: connection.totalCostMillionIdr,
                    distanceKm: connection.distanceKm,
                    healthStatus: connection.healthStatus,
                    healthColor: connection.healthColor,
                    issue: connection.issue,
                    recommendation: connection.recommendation,
                  };
                })
                .filter(
                  (
                    node,
                  ): node is {
                    id: string;
                    type: SupplyActorType;
                    districtName: string;
                    provinceName: string;
                    tonPerMonth: number;
                    costPerKg: number;
                    totalCostMillionIdr: number;
                    distanceKm: number;
                    healthStatus: ConnectionHealth;
                    healthColor: string;
                    issue: string;
                    recommendation: string;
                  } => Boolean(node),
                );

              const inboundSummary = inbound.reduce(
                (acc, item) => ({
                  totalTonPerMonth: acc.totalTonPerMonth + item.tonPerMonth,
                  totalCostMillionIdr: Number((acc.totalCostMillionIdr + item.totalCostMillionIdr).toFixed(1)),
                }),
                { totalTonPerMonth: 0, totalCostMillionIdr: 0 },
              );
              const outboundSummary = outbound.reduce(
                (acc, item) => ({
                  totalTonPerMonth: acc.totalTonPerMonth + item.tonPerMonth,
                  totalCostMillionIdr: Number((acc.totalCostMillionIdr + item.totalCostMillionIdr).toFixed(1)),
                }),
                { totalTonPerMonth: 0, totalCostMillionIdr: 0 },
              );

              const country = actor.countryCode ? countryByCode.get(actor.countryCode) : undefined;
              const actorMetricValue = country
                ? getGlobalSupplyValue(country, supplyPerspective)
                : actor.stageOrder;

              onRegionSelect?.({
                scope,
                mode,
                id: country?.countryCode ?? actor.id,
                name: `${ACTOR_STYLE[actor.type].label} • ${actor.districtName}`,
                metricLabel,
                metricValue: actorMetricValue,
                actor: {
                  id: actor.id,
                  type: actor.type,
                  districtName: actor.districtName,
                  provinceName: actor.provinceName,
                  inboundSummary,
                  outboundSummary,
                  inbound,
                  outbound,
                },
                country,
              });
            });
          }

          map.on("mousemove", "countries-fill", (event) => {
            if (mode === "supply" && supplyPerspective === "mitra") {
              const actorHits = map.queryRenderedFeatures(event.point, { layers: ["actor-pins-hitbox"] });
              if (actorHits.length > 0) {
                return;
              }
            }

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
            if (mode === "supply" && supplyPerspective === "mitra") {
              const actorHits = map.queryRenderedFeatures(event.point, { layers: ["actor-pins-hitbox"] });
              if (actorHits.length > 0) {
                return;
              }
            }

            const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
            if (!feature) return;
            const properties = (feature.properties || {}) as Record<string, unknown>;
            if (!properties.hasData) return;

            const country = resolveCountryFromFeature(properties);
            const metricValue = getMetricValue(undefined, country, mode, scope, supplyPerspective);
            if (!country || metricValue === null) return;

            setActiveActor(null);

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
          const districtName = (properties.NAME_2 as string) || "";
          const districtType = (properties.TYPE_2 as string) || undefined;
          const region = resolveRegionByProvinceName(provinceName);
          const district =
            mode === "market" && region && districtName
              ? createDistrictMarketData(region, districtName, districtType)
              : undefined;
          const districtSupply =
            mode === "supply" && region && districtName
              ? createDistrictSupplyData(region, districtName, districtType)
              : undefined;
          const metricValue = district
            ? district.market.marketIndex
            : districtSupply
              ? getDistrictSupplyValue(districtSupply, supplyPerspective)
            : getMetricValue(region, undefined, mode, scope, supplyPerspective);

          properties.regionId = region?.regionId;
          properties.districtId = district?.districtId ?? districtSupply?.districtId;
          properties.districtName = district?.districtName ?? districtSupply?.districtName ?? districtName;
          properties.districtType = district?.districtType ?? districtSupply?.districtType ?? districtType;
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

        let setActiveActor = (_actorId: string | null) => {};
        if (mode === "supply" && supplyPerspective === "mitra") {
          const actorNetwork = buildSupplyActorNetwork(geojson as GeoJSON.FeatureCollection);
          const actorById = new Map(actorNetwork.nodes.map((node) => [node.id, node]));

          const actorNodesGeoJson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
            type: "FeatureCollection",
            features: actorNetwork.nodes.map((node) => ({
              type: "Feature",
              id: node.id,
              geometry: { type: "Point", coordinates: node.coordinate },
              properties: {
                actorId: node.id,
                actorType: node.type,
                actorTypeLabel: ACTOR_STYLE[node.type].label,
                actorIcon: ACTOR_STYLE[node.type].icon,
                actorColor: ACTOR_STYLE[node.type].color,
                districtName: node.districtName,
                provinceName: node.provinceName,
                stageOrder: node.stageOrder,
                nodeHealthStatus: node.healthStatus ?? "normal",
                nodeHealthColor: node.healthColor ?? NODE_INDICATOR_COLOR.normal,
              },
            })),
          };

          const actorConnectionsGeoJson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
            type: "FeatureCollection",
            features: actorNetwork.connections
              .map((connection) => {
                const fromNode = actorById.get(connection.fromId);
                const toNode = actorById.get(connection.toId);
                if (!fromNode || !toNode) return null;

                return {
                  type: "Feature" as const,
                  id: connection.id,
                  geometry: {
                    type: "LineString" as const,
                    coordinates: [fromNode.coordinate, toNode.coordinate],
                  },
                  properties: {
                    connectionId: connection.id,
                    fromId: connection.fromId,
                    toId: connection.toId,
                    recommendedToId: connection.recommendedToId ?? "",
                    fromType: connection.fromType,
                    toType: connection.toType,
                    tonPerMonth: connection.tonPerMonth,
                    costPerKg: connection.costPerKg,
                    totalCostMillionIdr: connection.totalCostMillionIdr,
                    distanceKm: connection.distanceKm,
                    healthStatus: connection.healthStatus,
                    healthColor: connection.healthColor,
                  },
                };
              })
              .filter(
                (
                  feature,
                ): feature is GeoJSON.Feature<GeoJSON.LineString, Record<string, string>> => Boolean(feature),
                ),
            };

          const recommendationSet = new Set<string>();
          const actorRecommendationsGeoJson: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
            type: "FeatureCollection",
            features: actorNetwork.connections
              .map((connection) => {
                if (connection.healthStatus !== "risk" || !connection.recommendedToId) return null;
                const recommendationKey = `${connection.fromId}->${connection.recommendedToId}`;
                if (recommendationSet.has(recommendationKey)) return null;
                recommendationSet.add(recommendationKey);
                const fromNode = actorById.get(connection.fromId);
                const recommendedNode = actorById.get(connection.recommendedToId);
                if (!fromNode || !recommendedNode) return null;

                return {
                  type: "Feature" as const,
                  id: `rec-${connection.id}`,
                  geometry: {
                    type: "LineString" as const,
                    coordinates: [fromNode.coordinate, recommendedNode.coordinate],
                  },
                  properties: {
                    fromId: connection.fromId,
                    toId: connection.recommendedToId,
                    riskyToId: connection.toId,
                  },
                };
              })
              .filter(
                (
                  feature,
                ): feature is GeoJSON.Feature<GeoJSON.LineString, Record<string, string>> => Boolean(feature),
              ),
          };

          map.addSource("actor-nodes", { type: "geojson", data: actorNodesGeoJson });
          map.addSource("actor-connections", { type: "geojson", data: actorConnectionsGeoJson });
          map.addSource("actor-recommendations", { type: "geojson", data: actorRecommendationsGeoJson });

          map.addLayer({
            id: "actor-connections-active",
            type: "line",
            source: "actor-connections",
            paint: {
              "line-color": ["case", ["==", ["get", "healthStatus"], "risk"], "#dc2626", "#111827"],
              "line-opacity": 0.8,
              "line-width": ["case", ["==", ["get", "healthStatus"], "risk"], 3.2, 2.5],
            },
            filter: ["==", ["get", "fromId"], "__none__"],
          });

          map.addLayer({
            id: "actor-recommendations-base",
            type: "line",
            source: "actor-recommendations",
            paint: {
              "line-color": "#16a34a",
              "line-width": 1.4,
              "line-opacity": 0.95,
            },
            filter: ["==", ["get", "fromId"], "__none__"],
          });

          map.addLayer({
            id: "actor-recommendations-active",
            type: "line",
            source: "actor-recommendations",
            paint: {
              "line-color": "#16a34a",
              "line-width": 2.2,
              "line-opacity": 0.95,
              "line-dasharray": [2, 2],
            },
            filter: ["==", ["get", "fromId"], "__none__"],
          });

          map.addLayer({
            id: "actor-pins",
            type: "circle",
            source: "actor-nodes",
            paint: {
              "circle-color": ["get", "actorColor"],
              "circle-radius": 16,
              "circle-stroke-width": 4,
              "circle-stroke-color": ["coalesce", ["get", "nodeHealthColor"], NODE_INDICATOR_COLOR.normal],
              "circle-pitch-alignment": "viewport",
              "circle-pitch-scale": "viewport",
            },
          });

          // Invisible hit area so pin is easier to click on high-zoom/low-zoom views.
          map.addLayer({
            id: "actor-pins-hitbox",
            type: "circle",
            source: "actor-nodes",
            paint: {
              "circle-color": "#000000",
              "circle-radius": 14,
              "circle-opacity": 0,
              "circle-stroke-width": 0,
              "circle-pitch-alignment": "viewport",
              "circle-pitch-scale": "viewport",
            },
          });

          map.addLayer({
            id: "actor-pins-selected",
            type: "circle",
            source: "actor-nodes",
            paint: {
              "circle-color": "#0f172a",
              "circle-radius": 13,
              "circle-opacity": 0.2,
              "circle-stroke-width": 2.5,
              "circle-stroke-color": "#0f172a",
              "circle-pitch-alignment": "viewport",
              "circle-pitch-scale": "viewport",
            },
            filter: ["==", ["get", "actorId"], "__none__"],
          });

          map.addLayer({
            id: "actor-pin-labels",
            type: "symbol",
            source: "actor-nodes",
            layout: {
              "text-field": ["get", "actorIcon"],
              "text-size": 14,
              "text-allow-overlap": true,
            },
            paint: {
              "text-color": "#ffffff",
              "text-halo-color": "rgba(0,0,0,0.2)",
              "text-halo-width": 0.5,
            },
          });

          setActiveActor = (actorId: string | null) => {
            const activeFilter = actorId
              ? [
                  "any",
                  ["==", ["get", "fromId"], actorId],
                  ["==", ["get", "toId"], actorId],
                ]
              : ["==", ["get", "fromId"], "__none__"];
            const activeActorType = actorId ? actorById.get(actorId)?.type : undefined;
            const recommendationFilter =
              actorId && activeActorType === "feedmill"
                ? ["==", ["get", "fromId"], actorId]
                : ["==", ["get", "fromId"], "__none__"];

            map.setFilter("actor-connections-active", activeFilter as ExpressionSpecification);
            map.setFilter("actor-recommendations-base", recommendationFilter as ExpressionSpecification);
            map.setFilter("actor-recommendations-active", recommendationFilter as ExpressionSpecification);
            map.setFilter(
              "actor-pins-selected",
              actorId ? ["==", ["get", "actorId"], actorId] : ["==", ["get", "actorId"], "__none__"],
            );
          };

          map.on("mousemove", "actor-pins-hitbox", (event) => {
            if (!event.features?.length) return;
            const feature = event.features[0] as MapGeoJSONFeature;
            const properties = (feature.properties || {}) as Record<string, unknown>;
            map.getCanvas().style.cursor = "pointer";

            const actorLabel = (properties.actorTypeLabel as string) || "Actor";
            const district = (properties.districtName as string) || "-";
            const province = (properties.provinceName as string) || "-";
            showTooltip(event.point.x, event.point.y, `${actorLabel} • ${district}, ${province}`);
          });

          map.on("mouseleave", "actor-pins-hitbox", () => {
            map.getCanvas().style.cursor = "";
            hideTooltip();
          });

          map.on("click", "actor-pins-hitbox", (event) => {
            const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
            if (!feature) return;
            const properties = (feature.properties || {}) as Record<string, unknown>;
            const actorId = (properties.actorId as string) || "";
            const actor = actorById.get(actorId);
            if (!actor) return;

            setActiveActor(actor.id);

            const inbound = actorNetwork.connections
              .filter((connection) => connection.toId === actor.id)
              .map((connection) => {
                const node = actorById.get(connection.fromId);
                if (!node) return null;
                return {
                  id: node.id,
                  type: node.type,
                  districtName: node.districtName,
                  provinceName: node.provinceName,
                  tonPerMonth: connection.tonPerMonth,
                  costPerKg: connection.costPerKg,
                  totalCostMillionIdr: connection.totalCostMillionIdr,
                  distanceKm: connection.distanceKm,
                  healthStatus: connection.healthStatus,
                  healthColor: connection.healthColor,
                  issue: connection.issue,
                  recommendation: connection.recommendation,
                };
              })
              .filter(
                (
                  node,
                ): node is {
                  id: string;
                  type: SupplyActorType;
                  districtName: string;
                  provinceName: string;
                  tonPerMonth: number;
                  costPerKg: number;
                  totalCostMillionIdr: number;
                  distanceKm: number;
                  healthStatus: ConnectionHealth;
                  healthColor: string;
                  issue: string;
                  recommendation: string;
                } => Boolean(node),
              );

            const outbound = actorNetwork.connections
              .filter((connection) => connection.fromId === actor.id)
              .map((connection) => {
                const node = actorById.get(connection.toId);
                if (!node) return null;
                return {
                  id: node.id,
                  type: node.type,
                  districtName: node.districtName,
                  provinceName: node.provinceName,
                  tonPerMonth: connection.tonPerMonth,
                  costPerKg: connection.costPerKg,
                  totalCostMillionIdr: connection.totalCostMillionIdr,
                  distanceKm: connection.distanceKm,
                  healthStatus: connection.healthStatus,
                  healthColor: connection.healthColor,
                  issue: connection.issue,
                  recommendation: connection.recommendation,
                };
              })
              .filter(
                (
                  node,
                ): node is {
                  id: string;
                  type: SupplyActorType;
                  districtName: string;
                  provinceName: string;
                  tonPerMonth: number;
                  costPerKg: number;
                  totalCostMillionIdr: number;
                  distanceKm: number;
                  healthStatus: ConnectionHealth;
                  healthColor: string;
                  issue: string;
                  recommendation: string;
                } => Boolean(node),
              );

            const inboundSummary = inbound.reduce(
              (acc, item) => ({
                totalTonPerMonth: acc.totalTonPerMonth + item.tonPerMonth,
                totalCostMillionIdr: Number((acc.totalCostMillionIdr + item.totalCostMillionIdr).toFixed(1)),
              }),
              { totalTonPerMonth: 0, totalCostMillionIdr: 0 },
            );
            const outboundSummary = outbound.reduce(
              (acc, item) => ({
                totalTonPerMonth: acc.totalTonPerMonth + item.tonPerMonth,
                totalCostMillionIdr: Number((acc.totalCostMillionIdr + item.totalCostMillionIdr).toFixed(1)),
              }),
              { totalTonPerMonth: 0, totalCostMillionIdr: 0 },
            );

            const region = actor.regionId
              ? regionById.get(actor.regionId)
              : resolveRegionByProvinceName(actor.provinceName);
            const districtSupply = region
              ? createDistrictSupplyData(region, actor.districtName, actor.districtType)
              : undefined;

            onRegionSelect?.({
              scope,
              mode,
              id: districtSupply?.districtId ?? region?.regionId ?? actor.id,
              name: `${ACTOR_STYLE[actor.type].label} • ${actor.districtName}`,
              metricLabel,
              metricValue: districtSupply
                ? getDistrictSupplyValue(districtSupply, supplyPerspective)
                : actor.stageOrder,
              actor: {
                id: actor.id,
                type: actor.type,
                districtName: actor.districtName,
                provinceName: actor.provinceName,
                inboundSummary,
                outboundSummary,
                inbound,
                outbound,
              },
              districtSupply,
              region,
            });
          });
        }

        map.on("mousemove", "id-kabkota-fill", (event) => {
          if (mode === "supply" && supplyPerspective === "mitra") {
            const actorHits = map.queryRenderedFeatures(event.point, { layers: ["actor-pins-hitbox"] });
            if (actorHits.length > 0) {
              return;
            }
          }

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
          if (mode === "supply" && supplyPerspective === "mitra") {
            const actorHits = map.queryRenderedFeatures(event.point, { layers: ["actor-pins-hitbox"] });
            if (actorHits.length > 0) {
              return;
            }
          }

          const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
          if (!feature) return;
          const properties = (feature.properties || {}) as Record<string, unknown>;
          const regionId = properties.regionId as string;
          const districtName = (properties.districtName as string) || (properties.NAME_2 as string) || "";
          const districtType = (properties.districtType as string) || (properties.TYPE_2 as string) || undefined;

          const region = regionId ? regionById.get(regionId) : undefined;
          if (!region) return;

          setActiveActor(null);

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

          if (mode === "supply" && districtName) {
            const districtSupply = createDistrictSupplyData(region, districtName, districtType);
            onRegionSelect?.({
              scope,
              mode,
              id: districtSupply.districtId,
              name: districtType ? `${districtType} ${districtSupply.districtName}` : districtSupply.districtName,
              metricLabel,
              metricValue: getDistrictSupplyValue(districtSupply, supplyPerspective),
              districtSupply,
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

      } catch (error) {
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
        <div
          className={[
            "pointer-events-auto flex h-56 flex-col overflow-hidden rounded-xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur",
            showConnectionRisk ? "w-[21.5rem]" : "w-52",
          ].join(" ")}
        >
          <div className="text-xs font-semibold tracking-wide text-foreground">Indikator</div>
          <div className="mb-1 text-[11px] text-muted-foreground">{metricLabel}</div>

          <div className={showConnectionRisk ? "grid flex-1 grid-cols-2 gap-3" : "grid flex-1 grid-cols-1"}>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Value Range
              </p>
              <ul className="space-y-1.5">
                {(legend?.stops ?? []).map((item) => (
                  <li key={`${item.minValue}-${item.maxValue}`} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm border border-border"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {showConnectionRisk && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Connection Risk
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="h-[2px] w-5 rounded-full bg-[#111827]" />
                    <span className="text-[10px] text-muted-foreground">Normal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-[2px] w-5 rounded-full bg-[#dc2626]" />
                    <span className="text-[10px] text-muted-foreground">Risiko Tinggi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-[2px] w-5 border-b-2 border-dashed border-[#16a34a]" />
                    <span className="text-[10px] text-muted-foreground">Rute Rekomendasi</span>
                  </li>
                </ul>
                <p className="mb-1 mt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Node Pin
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full border border-border bg-white" />
                    Normal
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full border border-red-600 bg-red-600" />
                    Risk
                  </span>
                </div>
              </div>
            )}
          </div>

          {showConnectionRisk && (
            <div className="mt-2 border-t border-border pt-1.5">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Pin merah: node punya minimal satu koneksi berisiko tinggi. Pin putih: tidak ada koneksi berisiko tinggi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
