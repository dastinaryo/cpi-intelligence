import type { Pelanggan } from "@/types/dashboard";
 
export const pelangganList: Pelanggan[] = [
  // ─── DKI JAKARTA ──────────────────────────────────────
  {
    id: "PLG-001", name: "Hypermart Central Park Jakarta", type: "modern_trade", tier: "platinum",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Barat",
    monthlyDemandTon: 48, actualOrderLastMonth: 46.5, forecastNextMonth: 50.2,
    demandTrend: "growing", fulfillmentRate: 96.9,
    creditLimitIDR: 1500000000, paymentTermDays: 30, outstandingIDR: 620000000,
    distanceKm: 5, leadTimeDays: 1, logisticsCostPerKg: 120,
  },
  {
    id: "PLG-002", name: "Grand Indonesia Food Hall", type: "modern_trade", tier: "platinum",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Pusat",
    monthlyDemandTon: 35, actualOrderLastMonth: 33.8, forecastNextMonth: 36.5,
    demandTrend: "stable", fulfillmentRate: 96.6,
    creditLimitIDR: 1200000000, paymentTermDays: 30, outstandingIDR: 480000000,
    distanceKm: 3, leadTimeDays: 1, logisticsCostPerKg: 110,
  },
  {
    id: "PLG-003", name: "Hotel Mulia Senayan - Catering", type: "horeca", tier: "platinum",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Selatan",
    monthlyDemandTon: 28, actualOrderLastMonth: 27.2, forecastNextMonth: 30.0,
    demandTrend: "growing", fulfillmentRate: 97.1,
    creditLimitIDR: 800000000, paymentTermDays: 45, outstandingIDR: 310000000,
    distanceKm: 6, leadTimeDays: 1, logisticsCostPerKg: 130,
  },
  {
    id: "PLG-004", name: "PT Sriboga Raturaya (industri)", type: "industri", tier: "platinum",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Utara",
    monthlyDemandTon: 120, actualOrderLastMonth: 118, forecastNextMonth: 125,
    demandTrend: "growing", fulfillmentRate: 98.3,
    creditLimitIDR: 5000000000, paymentTermDays: 60, outstandingIDR: 2100000000,
    distanceKm: 8, leadTimeDays: 1, logisticsCostPerKg: 95,
  },
  {
    id: "PLG-005", name: "Transmart Cempaka Putih", type: "modern_trade", tier: "gold",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Pusat",
    monthlyDemandTon: 22, actualOrderLastMonth: 21.0, forecastNextMonth: 23.0,
    demandTrend: "stable", fulfillmentRate: 95.5,
    creditLimitIDR: 700000000, paymentTermDays: 30, outstandingIDR: 240000000,
    distanceKm: 4, leadTimeDays: 1, logisticsCostPerKg: 115,
  },
  {
    id: "PLG-006", name: "McDonald's Indonesia (supply nasional)", type: "horeca", tier: "platinum",
    regionId: "DKI_JAKARTA", provinsi: "DKI Jakarta", kabupaten: "Jakarta Selatan",
    monthlyDemandTon: 85, actualOrderLastMonth: 82, forecastNextMonth: 88,
    demandTrend: "growing", fulfillmentRate: 96.5,
    creditLimitIDR: 3500000000, paymentTermDays: 45, outstandingIDR: 1400000000,
    distanceKm: 7, leadTimeDays: 1, logisticsCostPerKg: 100,
  },
 
  // ─── JAWA BARAT ───────────────────────────────────────
  {
    id: "PLG-007", name: "Transmart Carrefour Bandung", type: "modern_trade", tier: "gold",
    regionId: "JAWA_BARAT", provinsi: "Jawa Barat", kabupaten: "Kota Bandung",
    monthlyDemandTon: 28, actualOrderLastMonth: 26.5, forecastNextMonth: 29.2,
    demandTrend: "growing", fulfillmentRate: 94.6,
    creditLimitIDR: 500000000, paymentTermDays: 30, outstandingIDR: 187500000,
    distanceKm: 8, leadTimeDays: 1, logisticsCostPerKg: 180,
  },
  {
    id: "PLG-008", name: "PT Indofood CBP (Divisi Poultry)", type: "industri", tier: "platinum",
    regionId: "JAWA_BARAT", provinsi: "Jawa Barat", kabupaten: "Bekasi",
    monthlyDemandTon: 95, actualOrderLastMonth: 92, forecastNextMonth: 98,
    demandTrend: "stable", fulfillmentRate: 96.8,
    creditLimitIDR: 4000000000, paymentTermDays: 60, outstandingIDR: 1650000000,
    distanceKm: 14, leadTimeDays: 1, logisticsCostPerKg: 145,
  },
  {
    id: "PLG-009", name: "Yogya Supermarket Depok", type: "modern_trade", tier: "gold",
    regionId: "JAWA_BARAT", provinsi: "Jawa Barat", kabupaten: "Depok",
    monthlyDemandTon: 18, actualOrderLastMonth: 17.2, forecastNextMonth: 18.8,
    demandTrend: "growing", fulfillmentRate: 95.6,
    creditLimitIDR: 400000000, paymentTermDays: 30, outstandingIDR: 128000000,
    distanceKm: 20, leadTimeDays: 1, logisticsCostPerKg: 160,
  },
  {
    id: "PLG-010", name: "Katering Aerofood ACS - Bandara Husein", type: "horeca", tier: "gold",
    regionId: "JAWA_BARAT", provinsi: "Jawa Barat", kabupaten: "Kota Bandung",
    monthlyDemandTon: 14, actualOrderLastMonth: 13.5, forecastNextMonth: 15.0,
    demandTrend: "growing", fulfillmentRate: 96.4,
    creditLimitIDR: 350000000, paymentTermDays: 45, outstandingIDR: 115000000,
    distanceKm: 10, leadTimeDays: 1, logisticsCostPerKg: 170,
  },
  {
    id: "PLG-011", name: "Pasar Induk Caringin Bandung", type: "traditional", tier: "silver",
    regionId: "JAWA_BARAT", provinsi: "Jawa Barat", kabupaten: "Kota Bandung",
    monthlyDemandTon: 42, actualOrderLastMonth: 40.0, forecastNextMonth: 43.5,
    demandTrend: "stable", fulfillmentRate: 95.2,
    creditLimitIDR: 300000000, paymentTermDays: 14, outstandingIDR: 95000000,
    distanceKm: 5, leadTimeDays: 1, logisticsCostPerKg: 155,
  },
 
  // ─── JAWA TENGAH ──────────────────────────────────────
  {
    id: "PLG-012", name: "Lotte Mart Semarang", type: "modern_trade", tier: "gold",
    regionId: "JAWA_TENGAH", provinsi: "Jawa Tengah", kabupaten: "Semarang",
    monthlyDemandTon: 24, actualOrderLastMonth: 23.0, forecastNextMonth: 25.0,
    demandTrend: "stable", fulfillmentRate: 95.8,
    creditLimitIDR: 450000000, paymentTermDays: 30, outstandingIDR: 158000000,
    distanceKm: 6, leadTimeDays: 1, logisticsCostPerKg: 165,
  },
  {
    id: "PLG-013", name: "PT Java Snacks Industries", type: "industri", tier: "gold",
    regionId: "JAWA_TENGAH", provinsi: "Jawa Tengah", kabupaten: "Semarang",
    monthlyDemandTon: 55, actualOrderLastMonth: 53, forecastNextMonth: 57,
    demandTrend: "growing", fulfillmentRate: 96.4,
    creditLimitIDR: 2000000000, paymentTermDays: 45, outstandingIDR: 780000000,
    distanceKm: 12, leadTimeDays: 1, logisticsCostPerKg: 155,
  },
  {
    id: "PLG-014", name: "Hotel Borobudur - Katering Group", type: "horeca", tier: "gold",
    regionId: "JAWA_TENGAH", provinsi: "Jawa Tengah", kabupaten: "Magelang",
    monthlyDemandTon: 8, actualOrderLastMonth: 7.6, forecastNextMonth: 8.5,
    demandTrend: "growing", fulfillmentRate: 95.0,
    creditLimitIDR: 200000000, paymentTermDays: 30, outstandingIDR: 65000000,
    distanceKm: 42, leadTimeDays: 2, logisticsCostPerKg: 220,
  },
  {
    id: "PLG-015", name: "Pasar Johar Semarang", type: "traditional", tier: "silver",
    regionId: "JAWA_TENGAH", provinsi: "Jawa Tengah", kabupaten: "Semarang",
    monthlyDemandTon: 35, actualOrderLastMonth: 33.5, forecastNextMonth: 36,
    demandTrend: "stable", fulfillmentRate: 95.7,
    creditLimitIDR: 200000000, paymentTermDays: 14, outstandingIDR: 68000000,
    distanceKm: 4, leadTimeDays: 1, logisticsCostPerKg: 155,
  },
 
  // ─── JAWA TIMUR ───────────────────────────────────────
  {
    id: "PLG-016", name: "Giant Superstore Surabaya", type: "modern_trade", tier: "gold",
    regionId: "JAWA_TIMUR", provinsi: "Jawa Timur", kabupaten: "Surabaya",
    monthlyDemandTon: 30, actualOrderLastMonth: 29.0, forecastNextMonth: 31.5,
    demandTrend: "growing", fulfillmentRate: 96.7,
    creditLimitIDR: 600000000, paymentTermDays: 30, outstandingIDR: 210000000,
    distanceKm: 5, leadTimeDays: 1, logisticsCostPerKg: 145,
  },
  {
    id: "PLG-017", name: "PT Sekar Bumi (Produsen Siomay/Bakso)", type: "industri", tier: "platinum",
    regionId: "JAWA_TIMUR", provinsi: "Jawa Timur", kabupaten: "Surabaya",
    monthlyDemandTon: 78, actualOrderLastMonth: 75, forecastNextMonth: 80,
    demandTrend: "growing", fulfillmentRate: 96.2,
    creditLimitIDR: 3200000000, paymentTermDays: 45, outstandingIDR: 1280000000,
    distanceKm: 8, leadTimeDays: 1, logisticsCostPerKg: 130,
  },
  {
    id: "PLG-018", name: "Katering Kenangan Malang", type: "horeca", tier: "silver",
    regionId: "JAWA_TIMUR", provinsi: "Jawa Timur", kabupaten: "Malang",
    monthlyDemandTon: 12, actualOrderLastMonth: 11.5, forecastNextMonth: 13.0,
    demandTrend: "growing", fulfillmentRate: 95.8,
    creditLimitIDR: 250000000, paymentTermDays: 30, outstandingIDR: 82000000,
    distanceKm: 22, leadTimeDays: 1, logisticsCostPerKg: 175,
  },
  {
    id: "PLG-019", name: "Pasar Turi Surabaya", type: "traditional", tier: "silver",
    regionId: "JAWA_TIMUR", provinsi: "Jawa Timur", kabupaten: "Surabaya",
    monthlyDemandTon: 45, actualOrderLastMonth: 43.5, forecastNextMonth: 46,
    demandTrend: "stable", fulfillmentRate: 96.7,
    creditLimitIDR: 280000000, paymentTermDays: 14, outstandingIDR: 92000000,
    distanceKm: 3, leadTimeDays: 1, logisticsCostPerKg: 135,
  },
  {
    id: "PLG-020", name: "Matahari Department Store - Divisi Segar", type: "modern_trade", tier: "gold",
    regionId: "JAWA_TIMUR", provinsi: "Jawa Timur", kabupaten: "Surabaya",
    monthlyDemandTon: 20, actualOrderLastMonth: 19.2, forecastNextMonth: 21.0,
    demandTrend: "stable", fulfillmentRate: 96.0,
    creditLimitIDR: 400000000, paymentTermDays: 30, outstandingIDR: 140000000,
    distanceKm: 6, leadTimeDays: 1, logisticsCostPerKg: 145,
  },
 
  // ─── SUMATERA UTARA ───────────────────────────────────
  {
    id: "PLG-021", name: "Sun Plaza Medan - Tenant F&B", type: "modern_trade", tier: "gold",
    regionId: "SUMATERA_UTARA", provinsi: "Sumatera Utara", kabupaten: "Medan",
    monthlyDemandTon: 26, actualOrderLastMonth: 24.8, forecastNextMonth: 27.5,
    demandTrend: "growing", fulfillmentRate: 95.4,
    creditLimitIDR: 500000000, paymentTermDays: 30, outstandingIDR: 175000000,
    distanceKm: 10, leadTimeDays: 2, logisticsCostPerKg: 220,
  },
  {
    id: "PLG-022", name: "Katering Garuda Indonesia - Medan", type: "horeca", tier: "platinum",
    regionId: "SUMATERA_UTARA", provinsi: "Sumatera Utara", kabupaten: "Deli Serdang",
    monthlyDemandTon: 32, actualOrderLastMonth: 30.5, forecastNextMonth: 33.0,
    demandTrend: "stable", fulfillmentRate: 95.3,
    creditLimitIDR: 800000000, paymentTermDays: 45, outstandingIDR: 320000000,
    distanceKm: 20, leadTimeDays: 2, logisticsCostPerKg: 240,
  },
  {
    id: "PLG-023", name: "Pasar Sei Sikambing Medan", type: "traditional", tier: "silver",
    regionId: "SUMATERA_UTARA", provinsi: "Sumatera Utara", kabupaten: "Medan",
    monthlyDemandTon: 38, actualOrderLastMonth: 36.2, forecastNextMonth: 39,
    demandTrend: "stable", fulfillmentRate: 95.3,
    creditLimitIDR: 250000000, paymentTermDays: 14, outstandingIDR: 82000000,
    distanceKm: 8, leadTimeDays: 2, logisticsCostPerKg: 210,
  },
 
  // ─── BALI ─────────────────────────────────────────────
  {
    id: "PLG-024", name: "Four Seasons Bali - F&B Supply", type: "horeca", tier: "platinum",
    regionId: "BALI", provinsi: "Bali", kabupaten: "Gianyar",
    monthlyDemandTon: 18, actualOrderLastMonth: 17.5, forecastNextMonth: 20.0,
    demandTrend: "growing", fulfillmentRate: 97.2,
    creditLimitIDR: 600000000, paymentTermDays: 30, outstandingIDR: 220000000,
    distanceKm: 18, leadTimeDays: 1, logisticsCostPerKg: 195,
  },
  {
    id: "PLG-025", name: "Bali Collection - Food Tenants", type: "horeca", tier: "gold",
    regionId: "BALI", provinsi: "Bali", kabupaten: "Badung",
    monthlyDemandTon: 22, actualOrderLastMonth: 21.0, forecastNextMonth: 24.5,
    demandTrend: "growing", fulfillmentRate: 95.5,
    creditLimitIDR: 500000000, paymentTermDays: 30, outstandingIDR: 180000000,
    distanceKm: 10, leadTimeDays: 1, logisticsCostPerKg: 185,
  },
  {
    id: "PLG-026", name: "Hardy's Supermarket Denpasar", type: "modern_trade", tier: "gold",
    regionId: "BALI", provinsi: "Bali", kabupaten: "Denpasar",
    monthlyDemandTon: 16, actualOrderLastMonth: 15.5, forecastNextMonth: 17.5,
    demandTrend: "growing", fulfillmentRate: 96.9,
    creditLimitIDR: 350000000, paymentTermDays: 30, outstandingIDR: 118000000,
    distanceKm: 6, leadTimeDays: 1, logisticsCostPerKg: 175,
  },
 
  // ─── SULAWESI SELATAN ─────────────────────────────────
  {
    id: "PLG-027", name: "Ramayana Makassar - Fresh Department", type: "modern_trade", tier: "silver",
    regionId: "SULAWESI_SELATAN", provinsi: "Sulawesi Selatan", kabupaten: "Makassar",
    monthlyDemandTon: 20, actualOrderLastMonth: 19.2, forecastNextMonth: 21.0,
    demandTrend: "growing", fulfillmentRate: 96.0,
    creditLimitIDR: 300000000, paymentTermDays: 30, outstandingIDR: 102000000,
    distanceKm: 5, leadTimeDays: 1, logisticsCostPerKg: 150,
  },
  {
    id: "PLG-028", name: "PT Eastern Pearlindo (distributor regional)", type: "industri", tier: "gold",
    regionId: "SULAWESI_SELATAN", provinsi: "Sulawesi Selatan", kabupaten: "Makassar",
    monthlyDemandTon: 60, actualOrderLastMonth: 58, forecastNextMonth: 63,
    demandTrend: "growing", fulfillmentRate: 96.7,
    creditLimitIDR: 2500000000, paymentTermDays: 45, outstandingIDR: 980000000,
    distanceKm: 8, leadTimeDays: 1, logisticsCostPerKg: 140,
  },
  {
    id: "PLG-029", name: "Pasar Terong Makassar", type: "traditional", tier: "silver",
    regionId: "SULAWESI_SELATAN", provinsi: "Sulawesi Selatan", kabupaten: "Makassar",
    monthlyDemandTon: 32, actualOrderLastMonth: 31.0, forecastNextMonth: 33.5,
    demandTrend: "stable", fulfillmentRate: 96.9,
    creditLimitIDR: 180000000, paymentTermDays: 14, outstandingIDR: 58000000,
    distanceKm: 4, leadTimeDays: 1, logisticsCostPerKg: 145,
  },
 
  // ─── BANTEN ───────────────────────────────────────────
  {
    id: "PLG-030", name: "Aeon Mall BSD City - Tenant Kuliner", type: "modern_trade", tier: "gold",
    regionId: "BANTEN", provinsi: "Banten", kabupaten: "Tangerang Selatan",
    monthlyDemandTon: 25, actualOrderLastMonth: 24.0, forecastNextMonth: 26.5,
    demandTrend: "growing", fulfillmentRate: 96.0,
    creditLimitIDR: 500000000, paymentTermDays: 30, outstandingIDR: 168000000,
    distanceKm: 22, leadTimeDays: 1, logisticsCostPerKg: 175,
  },
  {
    id: "PLG-031", name: "PT Karunia Alam Segar (nugget/olahan)", type: "industri", tier: "platinum",
    regionId: "BANTEN", provinsi: "Banten", kabupaten: "Serang",
    monthlyDemandTon: 68, actualOrderLastMonth: 65, forecastNextMonth: 72,
    demandTrend: "growing", fulfillmentRate: 95.6,
    creditLimitIDR: 2800000000, paymentTermDays: 60, outstandingIDR: 1120000000,
    distanceKm: 15, leadTimeDays: 1, logisticsCostPerKg: 165,
  },
 
  // ─── KALIMANTAN TIMUR ────────────────────────────────
  {
    id: "PLG-032", name: "Hipermart Samarinda Square", type: "modern_trade", tier: "silver",
    regionId: "KALIMANTAN_TIMUR", provinsi: "Kalimantan Timur", kabupaten: "Samarinda",
    monthlyDemandTon: 15, actualOrderLastMonth: 14.2, forecastNextMonth: 17.0,
    demandTrend: "growing", fulfillmentRate: 94.7,
    creditLimitIDR: 300000000, paymentTermDays: 30, outstandingIDR: 105000000,
    distanceKm: 8, leadTimeDays: 2, logisticsCostPerKg: 280,
  },
  {
    id: "PLG-033", name: "Katering Proyek IKN Nusantara", type: "horeca", tier: "gold",
    regionId: "KALIMANTAN_TIMUR", provinsi: "Kalimantan Timur", kabupaten: "Penajam Paser Utara",
    monthlyDemandTon: 40, actualOrderLastMonth: 38, forecastNextMonth: 48,
    demandTrend: "growing", fulfillmentRate: 95.0,
    creditLimitIDR: 1200000000, paymentTermDays: 45, outstandingIDR: 520000000,
    distanceKm: 35, leadTimeDays: 2, logisticsCostPerKg: 310,
    notes: "Permintaan terus meningkat seiring progres pembangunan IKN",
  },
 
  // ─── RIAU ────────────────────────────────────────────
  {
    id: "PLG-034", name: "Living World Pekanbaru - Food Court", type: "modern_trade", tier: "silver",
    regionId: "RIAU", provinsi: "Riau", kabupaten: "Pekanbaru",
    monthlyDemandTon: 16, actualOrderLastMonth: 15.5, forecastNextMonth: 17.0,
    demandTrend: "growing", fulfillmentRate: 96.9,
    creditLimitIDR: 300000000, paymentTermDays: 30, outstandingIDR: 98000000,
    distanceKm: 6, leadTimeDays: 2, logisticsCostPerKg: 240,
  },
  {
    id: "PLG-035", name: "PT Sinar Meadow International (margarine/fat)", type: "industri", tier: "gold",
    regionId: "RIAU", provinsi: "Riau", kabupaten: "Dumai",
    monthlyDemandTon: 45, actualOrderLastMonth: 43.5, forecastNextMonth: 47,
    demandTrend: "stable", fulfillmentRate: 96.7,
    creditLimitIDR: 1800000000, paymentTermDays: 45, outstandingIDR: 720000000,
    distanceKm: 88, leadTimeDays: 3, logisticsCostPerKg: 290,
  },
 
  // ─── LAMPUNG ────────────────────────────────────────
  {
    id: "PLG-036", name: "Chandra Superstore Bandar Lampung", type: "modern_trade", tier: "silver",
    regionId: "LAMPUNG", provinsi: "Lampung", kabupaten: "Bandar Lampung",
    monthlyDemandTon: 22, actualOrderLastMonth: 21.2, forecastNextMonth: 23.0,
    demandTrend: "growing", fulfillmentRate: 96.4,
    creditLimitIDR: 400000000, paymentTermDays: 30, outstandingIDR: 138000000,
    distanceKm: 14, leadTimeDays: 1, logisticsCostPerKg: 175,
  },
  {
    id: "PLG-037", name: "PT Indolakto (pabrik susu/olahan)", type: "industri", tier: "gold",
    regionId: "LAMPUNG", provinsi: "Lampung", kabupaten: "Lampung Selatan",
    monthlyDemandTon: 38, actualOrderLastMonth: 37, forecastNextMonth: 40,
    demandTrend: "stable", fulfillmentRate: 97.4,
    creditLimitIDR: 1500000000, paymentTermDays: 45, outstandingIDR: 590000000,
    distanceKm: 28, leadTimeDays: 1, logisticsCostPerKg: 165,
  },
 
  // ─── DI YOGYAKARTA ───────────────────────────────────
  {
    id: "PLG-038", name: "Malioboro Mall - Tenant Restoran", type: "horeca", tier: "silver",
    regionId: "DI_YOGYAKARTA", provinsi: "DI Yogyakarta", kabupaten: "Kota Yogyakarta",
    monthlyDemandTon: 10, actualOrderLastMonth: 9.6, forecastNextMonth: 10.8,
    demandTrend: "growing", fulfillmentRate: 96.0,
    creditLimitIDR: 200000000, paymentTermDays: 30, outstandingIDR: 65000000,
    distanceKm: 4, leadTimeDays: 1, logisticsCostPerKg: 165,
  },
  {
    id: "PLG-039", name: "Mirota Kampus Supermarket", type: "modern_trade", tier: "silver",
    regionId: "DI_YOGYAKARTA", provinsi: "DI Yogyakarta", kabupaten: "Kota Yogyakarta",
    monthlyDemandTon: 12, actualOrderLastMonth: 11.5, forecastNextMonth: 12.8,
    demandTrend: "stable", fulfillmentRate: 95.8,
    creditLimitIDR: 220000000, paymentTermDays: 30, outstandingIDR: 72000000,
    distanceKm: 3, leadTimeDays: 1, logisticsCostPerKg: 160,
  },
 
  // ─── SUMATERA SELATAN ────────────────────────────────
  {
    id: "PLG-040", name: "Palembang Square - Tenant F&B", type: "horeca", tier: "silver",
    regionId: "SUMATERA_SELATAN", provinsi: "Sumatera Selatan", kabupaten: "Palembang",
    monthlyDemandTon: 18, actualOrderLastMonth: 17.2, forecastNextMonth: 19.0,
    demandTrend: "growing", fulfillmentRate: 95.6,
    creditLimitIDR: 350000000, paymentTermDays: 30, outstandingIDR: 118000000,
    distanceKm: 7, leadTimeDays: 2, logisticsCostPerKg: 210,
  },
  {
    id: "PLG-041", name: "PT Keong Nusantara Abadi (olahan ikan)", type: "industri", tier: "silver",
    regionId: "SUMATERA_SELATAN", provinsi: "Sumatera Selatan", kabupaten: "Palembang",
    monthlyDemandTon: 28, actualOrderLastMonth: 27.0, forecastNextMonth: 29.5,
    demandTrend: "stable", fulfillmentRate: 96.4,
    creditLimitIDR: 900000000, paymentTermDays: 45, outstandingIDR: 340000000,
    distanceKm: 10, leadTimeDays: 2, logisticsCostPerKg: 205,
  },
 
  // ─── KALIMANTAN SELATAN ──────────────────────────────
  {
    id: "PLG-042", name: "Q Mall Banjarbaru - Food Hall", type: "modern_trade", tier: "silver",
    regionId: "KALIMANTAN_SELATAN", provinsi: "Kalimantan Selatan", kabupaten: "Banjarbaru",
    monthlyDemandTon: 14, actualOrderLastMonth: 13.6, forecastNextMonth: 15.5,
    demandTrend: "growing", fulfillmentRate: 97.1,
    creditLimitIDR: 280000000, paymentTermDays: 30, outstandingIDR: 92000000,
    distanceKm: 8, leadTimeDays: 2, logisticsCostPerKg: 265,
  },
 
  // ─── SULAWESI UTARA ──────────────────────────────────
  {
    id: "PLG-043", name: "Manado Town Square - Restoran", type: "horeca", tier: "silver",
    regionId: "SULAWESI_UTARA", provinsi: "Sulawesi Utara", kabupaten: "Manado",
    monthlyDemandTon: 10, actualOrderLastMonth: 9.5, forecastNextMonth: 11.0,
    demandTrend: "growing", fulfillmentRate: 95.0,
    creditLimitIDR: 200000000, paymentTermDays: 30, outstandingIDR: 65000000,
    distanceKm: 6, leadTimeDays: 3, logisticsCostPerKg: 310,
  },
 
  // ─── ACEH ───────────────────────────────────────────
  {
    id: "PLG-044", name: "Suzuya Mall Banda Aceh", type: "modern_trade", tier: "bronze",
    regionId: "ACEH", provinsi: "Aceh", kabupaten: "Banda Aceh",
    monthlyDemandTon: 12, actualOrderLastMonth: 11.2, forecastNextMonth: 12.5,
    demandTrend: "stable", fulfillmentRate: 93.3,
    creditLimitIDR: 180000000, paymentTermDays: 30, outstandingIDR: 60000000,
    distanceKm: 8, leadTimeDays: 4, logisticsCostPerKg: 340,
  },
 
  // ─── KALIMANTAN BARAT ────────────────────────────────
  {
    id: "PLG-045", name: "Mega Mall Pontianak - Food Tenant", type: "modern_trade", tier: "silver",
    regionId: "KALIMANTAN_BARAT", provinsi: "Kalimantan Barat", kabupaten: "Pontianak",
    monthlyDemandTon: 14, actualOrderLastMonth: 13.4, forecastNextMonth: 15.0,
    demandTrend: "growing", fulfillmentRate: 95.7,
    creditLimitIDR: 260000000, paymentTermDays: 30, outstandingIDR: 88000000,
    distanceKm: 5, leadTimeDays: 3, logisticsCostPerKg: 295,
  },
 
  // ─── NTB ────────────────────────────────────────────
  {
    id: "PLG-046", name: "Lombok Epicentrum Mall - F&B", type: "horeca", tier: "bronze",
    regionId: "NUSA_TENGGARA_BARAT", provinsi: "Nusa Tenggara Barat", kabupaten: "Mataram",
    monthlyDemandTon: 9, actualOrderLastMonth: 8.5, forecastNextMonth: 9.8,
    demandTrend: "growing", fulfillmentRate: 94.4,
    creditLimitIDR: 150000000, paymentTermDays: 30, outstandingIDR: 48000000,
    distanceKm: 6, leadTimeDays: 3, logisticsCostPerKg: 305,
  },
 
  // ─── PAPUA ──────────────────────────────────────────
  {
    id: "PLG-047", name: "Saga Mall Jayapura - Supermarket", type: "modern_trade", tier: "bronze",
    regionId: "PAPUA", provinsi: "Papua", kabupaten: "Jayapura",
    monthlyDemandTon: 8, actualOrderLastMonth: 7.6, forecastNextMonth: 8.5,
    demandTrend: "stable", fulfillmentRate: 95.0,
    creditLimitIDR: 120000000, paymentTermDays: 30, outstandingIDR: 38000000,
    distanceKm: 10, leadTimeDays: 5, logisticsCostPerKg: 680,
    notes: "Pengiriman via udara, biaya logistik sangat tinggi",
  },
 
  // ─── MALUKU ─────────────────────────────────────────
  {
    id: "PLG-048", name: "Ambon City Center - Food Area", type: "modern_trade", tier: "bronze",
    regionId: "MALUKU", provinsi: "Maluku", kabupaten: "Ambon",
    monthlyDemandTon: 7, actualOrderLastMonth: 6.8, forecastNextMonth: 7.5,
    demandTrend: "stable", fulfillmentRate: 97.1,
    creditLimitIDR: 100000000, paymentTermDays: 30, outstandingIDR: 32000000,
    distanceKm: 8, leadTimeDays: 6, logisticsCostPerKg: 590,
    notes: "Bergantung jadwal kapal Pelni, lead time tidak menentu",
  },
];

