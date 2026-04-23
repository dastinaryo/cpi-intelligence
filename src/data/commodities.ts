import type { CommodityPrice, CommodityPriceSet } from "@/types/dashboard";
 
const localItems: CommodityPrice[] = [
  {
    id: "jagung",
    label: "Harga Jagung",
    price: 5420,
    unit: "kg",
    currency: "IDR",
    change: 0.2,
    changeAbs: 10.84,
    trend: "up",
    weeklyHigh: 5550,
    weeklyLow: 5380,
    source: "Kemendag RI",
    lastUpdated: "2024-04-23",
  },
  {
    id: "ayam",
    label: "Harga Ayam",
    price: 32150,
    unit: "kg",
    currency: "IDR",
    change: -0.3,
    changeAbs: -96.45,
    trend: "down",
    weeklyHigh: 33200,
    weeklyLow: 31800,
    source: "Kemendag RI",
    lastUpdated: "2024-04-23",
  },
  {
    id: "telur",
    label: "Harga Telur",
    price: 28900,
    unit: "kg",
    currency: "IDR",
    change: 1.0,
    changeAbs: 289,
    trend: "up",
    weeklyHigh: 29400,
    weeklyLow: 28500,
    source: "Kemendag RI",
    lastUpdated: "2024-04-23",
  },
];
 
const globalItems: CommodityPrice[] = [
  {
    id: "jagung",
    label: "Corn (Maize)",
    price: 4.52,
    unit: "bushel",
    currency: "USD",
    change: -0.9,
    changeAbs: -0.041,
    trend: "down",
    weeklyHigh: 4.71,
    weeklyLow: 4.48,
    source: "CBOT Chicago",
    lastUpdated: "2024-04-23",
  },
  {
    id: "ayam",
    label: "Broiler (Whole)",
    price: 1.18,
    unit: "lb",
    currency: "USD",
    change: 0.5,
    changeAbs: 0.006,
    trend: "up",
    weeklyHigh: 1.22,
    weeklyLow: 1.15,
    source: "CME Group",
    lastUpdated: "2024-04-23",
  },
  {
    id: "telur",
    label: "Eggs (Grade A)",
    price: 2.34,
    unit: "dozen",
    currency: "USD",
    change: -1.3,
    changeAbs: -0.031,
    trend: "down",
    weeklyHigh: 2.48,
    weeklyLow: 2.31,
    source: "CME Group",
    lastUpdated: "2024-04-23",
  },
];
 
export const commodityPriceLocal: CommodityPriceSet = {
  scope: "local",
  asOf: "2024-04-23",
  items: localItems,
};
 
export const commodityPriceGlobal: CommodityPriceSet = {
  scope: "global",
  asOf: "2024-04-23",
  items: globalItems,
};

