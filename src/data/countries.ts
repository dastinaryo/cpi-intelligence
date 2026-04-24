import type { CountryData } from "@/types/dashboard";
 
// ~50 key countries: ASEAN, major commodity exporters/importers, CPI trade partners
export const countries: CountryData[] = [
  // ─── ASEAN ──────────────────────────────────────────────
  {
    countryCode: "IDN",
    countryName: "Indonesia",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 68, inflationRate: 3.1, commodityImportUSD: 2850, marketRisk: "medium", marketIndex: 72, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["El Niño dampak produksi pangan", "kenaikan harga pupuk impor", "depresiasi rupiah"] },
    supply: { supplyIndex: 65, isExporter: false, exportVolumeTon: 180000, importVolumeTon: 2200000, tradeRelation: "partner", keyExportCommodities: ["kelapa sawit", "karet"] },
  },
  {
    countryCode: "THA",
    countryName: "Thailand",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 72, inflationRate: 1.8, commodityImportUSD: 980, marketRisk: "low", marketIndex: 74, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["surplus produksi beras nasional", "ekspansi ekspor jagung ke ASEAN"] },
    supply: { supplyIndex: 78, isExporter: true, exportVolumeTon: 1200000, importVolumeTon: 350000, tradeRelation: "partner", keyExportCommodities: ["beras", "jagung", "ayam beku"] },
  },
  {
    countryCode: "VNM",
    countryName: "Vietnam",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 65, inflationRate: 3.5, commodityImportUSD: 1450, marketRisk: "medium", marketIndex: 67, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["pertumbuhan konsumsi pangan cepat", "ketergantungan impor jagung tinggi"] },
    supply: { supplyIndex: 70, isExporter: true, exportVolumeTon: 640000, importVolumeTon: 820000, tradeRelation: "partner", keyExportCommodities: ["beras", "kopi"] },
  },
  {
    countryCode: "MYS",
    countryName: "Malaysia",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 60, inflationRate: 2.2, commodityImportUSD: 1200, marketRisk: "low", marketIndex: 62, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["stabilitas ringgit mendukung impor pangan", "kebijakan pangan terintegrasi ASEAN"] },
    supply: { supplyIndex: 58, isExporter: false, exportVolumeTon: 95000, importVolumeTon: 1100000, tradeRelation: "partner", keyExportCommodities: ["kelapa sawit"] },
  },
  {
    countryCode: "PHL",
    countryName: "Filipina",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 74, inflationRate: 5.1, commodityImportUSD: 1680, marketRisk: "high", marketIndex: 78, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["inflasi pangan menekan daya beli", "bencana alam ganggu rantai pasok", "defisit beras kronis"] },
    supply: { supplyIndex: 55, isExporter: false, exportVolumeTon: 0, importVolumeTon: 1950000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "SGP",
    countryName: "Singapura",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 55, inflationRate: 3.0, commodityImportUSD: 4200, marketRisk: "low", marketIndex: 58, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["hub perdagangan regional ASEAN", "100% ketergantungan impor pangan"] },
    supply: { supplyIndex: 20, isExporter: false, exportVolumeTon: 0, importVolumeTon: 650000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "MMR",
    countryName: "Myanmar",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 80, inflationRate: 18.0, commodityImportUSD: 320, marketRisk: "high", marketIndex: 82, tradeBalance: "neutral", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["instabilitas politik ganggu rantai pasok", "hiperinflasi erosi daya beli", "sanksi internasional"] },
    supply: { supplyIndex: 60, isExporter: true, exportVolumeTon: 480000, importVolumeTon: 290000, tradeRelation: "none", keyExportCommodities: ["jagung", "kacang"] },
  },
  {
    countryCode: "KHM",
    countryName: "Kamboja",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 71, inflationRate: 2.8, commodityImportUSD: 210, marketRisk: "medium", marketIndex: 65, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["pemulihan pasca konflik", "potensi ekspor beras ke ASEAN"] },
    supply: { supplyIndex: 55, isExporter: true, exportVolumeTon: 290000, importVolumeTon: 180000, tradeRelation: "none", keyExportCommodities: ["beras", "jagung"] },
  },
 
  // ─── ASIA TIMUR ──────────────────────────────────────────
  {
    countryCode: "CHN",
    countryName: "China",
    region: "Asia Timur",
    market: { cornPriceIndex: 76, inflationRate: 0.3, commodityImportUSD: 48000, marketRisk: "medium", marketIndex: 80, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["permintaan domestik terbesar dunia", "kontrol harga pemerintah", "ketegangan geopolitik tekan ekspor"] },
    supply: { supplyIndex: 85, isExporter: false, exportVolumeTon: 500000, importVolumeTon: 22000000, tradeRelation: "competitor", keyExportCommodities: ["bawang putih", "produk olahan"] },
  },
  {
    countryCode: "JPN",
    countryName: "Jepang",
    region: "Asia Timur",
    market: { cornPriceIndex: 58, inflationRate: 2.7, commodityImportUSD: 12400, marketRisk: "low", marketIndex: 60, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["pasar pangan teratur dan bersubsidi", "impor dominan dari AS dan Brasil"] },
    supply: { supplyIndex: 25, isExporter: false, exportVolumeTon: 0, importVolumeTon: 16000000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "KOR",
    countryName: "Korea Selatan",
    region: "Asia Timur",
    market: { cornPriceIndex: 62, inflationRate: 3.1, commodityImportUSD: 8900, marketRisk: "low", marketIndex: 63, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["demand pakan ternak tinggi untuk industri poultry", "diversifikasi impor dari AS, Ukraina, Brasil"] },
    supply: { supplyIndex: 22, isExporter: false, exportVolumeTon: 0, importVolumeTon: 11000000, tradeRelation: "partner", keyExportCommodities: [] },
  },
 
  // ─── ASIA SELATAN ────────────────────────────────────────
  {
    countryCode: "IND",
    countryName: "India",
    region: "Asia Selatan",
    market: { cornPriceIndex: 70, inflationRate: 5.0, commodityImportUSD: 18000, marketRisk: "medium", marketIndex: 73, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["ekspor beras & jagung meningkat", "inflasi pangan dorong keresahan sosial", "musim monsun ganggu produksi"] },
    supply: { supplyIndex: 80, isExporter: true, exportVolumeTon: 4200000, importVolumeTon: 1800000, tradeRelation: "partner", keyExportCommodities: ["beras", "gula", "jagung"] },
  },
 
  // ─── TIMUR TENGAH ────────────────────────────────────────
  {
    countryCode: "SAU",
    countryName: "Arab Saudi",
    region: "Timur Tengah",
    market: { cornPriceIndex: 52, inflationRate: 1.9, commodityImportUSD: 9800, marketRisk: "low", marketIndex: 54, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["subsidi pangan pemerintah besar", "daya beli tinggi didorong pendapatan minyak"] },
    supply: { supplyIndex: 10, isExporter: false, exportVolumeTon: 0, importVolumeTon: 8500000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "ARE",
    countryName: "Uni Emirat Arab",
    region: "Timur Tengah",
    market: { cornPriceIndex: 50, inflationRate: 3.1, commodityImportUSD: 6200, marketRisk: "low", marketIndex: 52, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["hub re-ekspor pangan regional", "permintaan produk premium terus naik"] },
    supply: { supplyIndex: 8, isExporter: false, exportVolumeTon: 0, importVolumeTon: 5200000, tradeRelation: "partner", keyExportCommodities: [] },
  },
 
  // ─── AMERIKA UTARA ───────────────────────────────────────
  {
    countryCode: "USA",
    countryName: "Amerika Serikat",
    region: "Amerika Utara",
    market: { cornPriceIndex: 62, inflationRate: 3.5, commodityImportUSD: 2100, marketRisk: "low", marketIndex: 58, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir jagung terbesar dunia", "teknologi pertanian tinggi menjaga produktivitas"] },
    supply: { supplyIndex: 95, isExporter: true, exportVolumeTon: 62000000, importVolumeTon: 1200000, tradeRelation: "partner", keyExportCommodities: ["jagung", "kedelai", "gandum"] },
  },
  {
    countryCode: "CAN",
    countryName: "Kanada",
    region: "Amerika Utara",
    market: { cornPriceIndex: 58, inflationRate: 3.1, commodityImportUSD: 1400, marketRisk: "low", marketIndex: 55, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir gandum & kanola terkemuka", "diversifikasi produk ekspor agrikultur"] },
    supply: { supplyIndex: 88, isExporter: true, exportVolumeTon: 32000000, importVolumeTon: 800000, tradeRelation: "partner", keyExportCommodities: ["gandum", "kanola", "jagung"] },
  },
  {
    countryCode: "MEX",
    countryName: "Meksiko",
    region: "Amerika Utara",
    market: { cornPriceIndex: 75, inflationRate: 4.6, commodityImportUSD: 8400, marketRisk: "medium", marketIndex: 76, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["ketergantungan impor jagung AS sangat tinggi", "inflasi pangan picu protes sosial"] },
    supply: { supplyIndex: 65, isExporter: false, exportVolumeTon: 1800000, importVolumeTon: 16500000, tradeRelation: "none", keyExportCommodities: ["tomat", "avokad"] },
  },
 
  // ─── AMERIKA LATIN ───────────────────────────────────────
  {
    countryCode: "BRA",
    countryName: "Brasil",
    region: "Amerika Latin",
    market: { cornPriceIndex: 78, inflationRate: 4.5, commodityImportUSD: 3200, marketRisk: "medium", marketIndex: 75, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["produksi jagung & kedelai terbesar ke-2 dunia", "cuaca ekstrem ancam panen", "real melemah tingkatkan harga impor"] },
    supply: { supplyIndex: 96, isExporter: true, exportVolumeTon: 56000000, importVolumeTon: 1100000, tradeRelation: "partner", keyExportCommodities: ["jagung", "kedelai", "gula", "daging sapi"] },
  },
  {
    countryCode: "ARG",
    countryName: "Argentina",
    region: "Amerika Latin",
    market: { cornPriceIndex: 85, inflationRate: 160.0, commodityImportUSD: 1800, marketRisk: "high", marketIndex: 88, tradeBalance: "surplus", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["hiperinflasi 160% hancurkan daya beli", "krisis mata uang peso", "kontrol ekspor pemerintah tidak menentu"] },
    supply: { supplyIndex: 92, isExporter: true, exportVolumeTon: 42000000, importVolumeTon: 500000, tradeRelation: "partner", keyExportCommodities: ["jagung", "kedelai", "gandum"] },
  },
 
  // ─── EROPA ───────────────────────────────────────────────
  {
    countryCode: "UKR",
    countryName: "Ukraina",
    region: "Eropa Timur",
    market: { cornPriceIndex: 90, inflationRate: 12.0, commodityImportUSD: 1200, marketRisk: "high", marketIndex: 92, tradeBalance: "surplus", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["perang Rusia-Ukraina ganggu ekspor gandum & jagung", "infrastruktur pelabuhan rusak", "blokade Laut Hitam intermiten"] },
    supply: { supplyIndex: 72, isExporter: true, exportVolumeTon: 28000000, importVolumeTon: 800000, tradeRelation: "partner", keyExportCommodities: ["jagung", "gandum", "bunga matahari"] },
  },
  {
    countryCode: "RUS",
    countryName: "Rusia",
    region: "Eropa Timur",
    market: { cornPriceIndex: 82, inflationRate: 7.4, commodityImportUSD: 1600, marketRisk: "high", marketIndex: 85, tradeBalance: "surplus", priceVolatility: "high", demandTrend: "stable", riskSignal: "red", externalFactors: ["sanksi barat batasi transaksi ekspor", "eksportir gandum terbesar dunia", "rubel tertekan dampak geopolitik"] },
    supply: { supplyIndex: 88, isExporter: true, exportVolumeTon: 45000000, importVolumeTon: 1400000, tradeRelation: "none", keyExportCommodities: ["gandum", "jagung", "barley"] },
  },
  {
    countryCode: "DEU",
    countryName: "Jerman",
    region: "Eropa Barat",
    market: { cornPriceIndex: 60, inflationRate: 2.2, commodityImportUSD: 14500, marketRisk: "low", marketIndex: 62, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["industri pengolahan pangan terbesar Eropa", "diversifikasi impor dari Amerika & Eropa Timur"] },
    supply: { supplyIndex: 70, isExporter: false, exportVolumeTon: 4200000, importVolumeTon: 8900000, tradeRelation: "none", keyExportCommodities: ["gandum", "barley"] },
  },
  {
    countryCode: "FRA",
    countryName: "Prancis",
    region: "Eropa Barat",
    market: { cornPriceIndex: 62, inflationRate: 2.3, commodityImportUSD: 9800, marketRisk: "low", marketIndex: 64, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir gandum & jagung utama Eropa", "subsidi pertanian EU menjaga harga stabil"] },
    supply: { supplyIndex: 75, isExporter: true, exportVolumeTon: 18000000, importVolumeTon: 5200000, tradeRelation: "partner", keyExportCommodities: ["gandum", "jagung", "barley"] },
  },
  {
    countryCode: "NLD",
    countryName: "Belanda",
    region: "Eropa Barat",
    market: { cornPriceIndex: 55, inflationRate: 2.7, commodityImportUSD: 28000, marketRisk: "low", marketIndex: 57, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["hub perdagangan pangan terbesar Eropa", "industri peternakan intensif butuh pakan impor besar"] },
    supply: { supplyIndex: 60, isExporter: false, exportVolumeTon: 5100000, importVolumeTon: 22000000, tradeRelation: "partner", keyExportCommodities: ["produk susu", "daging babi"] },
  },
 
  // ─── OSEANIA ────────────────────────────────────────────
  {
    countryCode: "AUS",
    countryName: "Australia",
    region: "Oseania",
    market: { cornPriceIndex: 58, inflationRate: 3.4, commodityImportUSD: 2100, marketRisk: "low", marketIndex: 60, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir gandum & daging sapi premium", "kekeringan periodik ancam panen gandum"] },
    supply: { supplyIndex: 85, isExporter: true, exportVolumeTon: 22000000, importVolumeTon: 1400000, tradeRelation: "partner", keyExportCommodities: ["gandum", "barley", "daging sapi"] },
  },
 
  // ─── AFRICA ──────────────────────────────────────────────
  {
    countryCode: "ZAF",
    countryName: "Afrika Selatan",
    region: "Afrika",
    market: { cornPriceIndex: 76, inflationRate: 5.5, commodityImportUSD: 2400, marketRisk: "medium", marketIndex: 74, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir jagung utama Afrika", "rand melemah dorong inflasi impor"] },
    supply: { supplyIndex: 72, isExporter: true, exportVolumeTon: 4800000, importVolumeTon: 1600000, tradeRelation: "none", keyExportCommodities: ["jagung", "gula"] },
  },
  {
    countryCode: "NGA",
    countryName: "Nigeria",
    region: "Afrika",
    market: { cornPriceIndex: 88, inflationRate: 22.0, commodityImportUSD: 4800, marketRisk: "high", marketIndex: 89, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["inflasi pangan 22% tekan konsumsi", "naira terdepresiasi parah", "ketergantungan impor gandum tinggi"] },
    supply: { supplyIndex: 45, isExporter: false, exportVolumeTon: 800000, importVolumeTon: 4200000, tradeRelation: "none", keyExportCommodities: [] },
  },
  {
    countryCode: "EGY",
    countryName: "Mesir",
    region: "Afrika Utara",
    market: { cornPriceIndex: 84, inflationRate: 29.0, commodityImportUSD: 9200, marketRisk: "high", marketIndex: 86, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["importir gandum terbesar dunia", "inflasi 29% erosi daya beli", "devaluasi pound Mesir berulang"] },
    supply: { supplyIndex: 42, isExporter: false, exportVolumeTon: 600000, importVolumeTon: 8800000, tradeRelation: "none", keyExportCommodities: [] },
  },
 
  // ─── ADDITIONAL KEY MARKETS ──────────────────────────────
  {
    countryCode: "PAK",
    countryName: "Pakistan",
    region: "Asia Selatan",
    market: { cornPriceIndex: 82, inflationRate: 25.0, commodityImportUSD: 6400, marketRisk: "high", marketIndex: 84, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["krisis ekonomi & IMF bailout", "inflasi 25% gerus daya beli massal", "banjir hancurkan lahan pertanian"] },
    supply: { supplyIndex: 55, isExporter: false, exportVolumeTon: 1200000, importVolumeTon: 5800000, tradeRelation: "none", keyExportCommodities: ["beras"] },
  },
  {
    countryCode: "BGD",
    countryName: "Bangladesh",
    region: "Asia Selatan",
    market: { cornPriceIndex: 79, inflationRate: 9.5, commodityImportUSD: 5200, marketRisk: "high", marketIndex: 80, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["populasi besar tekan permintaan pangan", "ketergantungan tinggi pada impor gandum & jagung", "inflasi 9.5% ancam ketahanan pangan"] },
    supply: { supplyIndex: 48, isExporter: false, exportVolumeTon: 0, importVolumeTon: 5100000, tradeRelation: "none", keyExportCommodities: [] },
  },
  {
    countryCode: "TUR",
    countryName: "Turki",
    region: "Eropa/Asia",
    market: { cornPriceIndex: 87, inflationRate: 65.0, commodityImportUSD: 7800, marketRisk: "high", marketIndex: 88, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["inflasi 65% hancurkan daya beli", "lira jatuh 80% dalam 5 tahun", "ketergantungan impor gandum sangat tinggi"] },
    supply: { supplyIndex: 65, isExporter: false, exportVolumeTon: 2100000, importVolumeTon: 6400000, tradeRelation: "none", keyExportCommodities: ["hazelnut", "tomat"] },
  },
  {
    countryCode: "POL",
    countryName: "Polandia",
    region: "Eropa Timur",
    market: { cornPriceIndex: 66, inflationRate: 4.1, commodityImportUSD: 4200, marketRisk: "medium", marketIndex: 68, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir jagung & ayam ke Eropa Barat", "pertanian subsidi EU mendukung produksi"] },
    supply: { supplyIndex: 74, isExporter: true, exportVolumeTon: 8200000, importVolumeTon: 3800000, tradeRelation: "none", keyExportCommodities: ["gandum", "jagung", "ayam"] },
  },
  {
    countryCode: "ESP",
    countryName: "Spanyol",
    region: "Eropa Barat",
    market: { cornPriceIndex: 63, inflationRate: 3.2, commodityImportUSD: 11200, marketRisk: "low", marketIndex: 65, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["produsen minyak zaitun & sayuran terkemuka", "pariwisata dorong permintaan pangan olahan"] },
    supply: { supplyIndex: 68, isExporter: false, exportVolumeTon: 6800000, importVolumeTon: 9200000, tradeRelation: "none", keyExportCommodities: ["minyak zaitun", "sayuran"] },
  },
  {
    countryCode: "ITA",
    countryName: "Italia",
    region: "Eropa Barat",
    market: { cornPriceIndex: 64, inflationRate: 1.8, commodityImportUSD: 10800, marketRisk: "low", marketIndex: 66, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["industri pangan olahan premium tinggi", "ekspor pasta & produk susu global"] },
    supply: { supplyIndex: 62, isExporter: false, exportVolumeTon: 4200000, importVolumeTon: 9400000, tradeRelation: "none", keyExportCommodities: ["pasta", "produk susu"] },
  },
  {
    countryCode: "GBR",
    countryName: "Inggris",
    region: "Eropa Barat",
    market: { cornPriceIndex: 61, inflationRate: 3.8, commodityImportUSD: 12600, marketRisk: "low", marketIndex: 63, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["pasca-Brexit rantai pasok pangan terganggu", "inflasi pangan tinggi tekan konsumen"] },
    supply: { supplyIndex: 58, isExporter: false, exportVolumeTon: 3600000, importVolumeTon: 11800000, tradeRelation: "none", keyExportCommodities: ["barley", "gandum"] },
  },
  {
    countryCode: "IRN",
    countryName: "Iran",
    region: "Timur Tengah",
    market: { cornPriceIndex: 92, inflationRate: 42.0, commodityImportUSD: 8100, marketRisk: "high", marketIndex: 93, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["sanksi internasional batasi impor pangan", "inflasi 42% gerus daya beli drastis", "rial jatuh akibat tekanan geopolitik"] },
    supply: { supplyIndex: 50, isExporter: false, exportVolumeTon: 1200000, importVolumeTon: 7600000, tradeRelation: "none", keyExportCommodities: ["pistasio", "saffron"] },
  },
  {
    countryCode: "IRQ",
    countryName: "Irak",
    region: "Timur Tengah",
    market: { cornPriceIndex: 80, inflationRate: 4.5, commodityImportUSD: 4800, marketRisk: "high", marketIndex: 81, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["instabilitas keamanan ganggu distribusi pangan", "ketergantungan penuh impor pangan pokok"] },
    supply: { supplyIndex: 28, isExporter: false, exportVolumeTon: 0, importVolumeTon: 4600000, tradeRelation: "none", keyExportCommodities: [] },
  },
  {
    countryCode: "PER",
    countryName: "Peru",
    region: "Amerika Latin",
    market: { cornPriceIndex: 72, inflationRate: 3.1, commodityImportUSD: 2600, marketRisk: "medium", marketIndex: 70, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir quinoa & asparagus global", "cuaca La Niña ganggu produksi pertanian"] },
    supply: { supplyIndex: 62, isExporter: false, exportVolumeTon: 1400000, importVolumeTon: 3200000, tradeRelation: "none", keyExportCommodities: ["asparagus", "quinoa"] },
  },
  {
    countryCode: "COL",
    countryName: "Kolombia",
    region: "Amerika Latin",
    market: { cornPriceIndex: 74, inflationRate: 9.3, commodityImportUSD: 3800, marketRisk: "medium", marketIndex: 76, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["inflasi 9.3% tekan konsumsi pangan", "eksportir kopi & bunga potong utama"] },
    supply: { supplyIndex: 58, isExporter: false, exportVolumeTon: 1800000, importVolumeTon: 4200000, tradeRelation: "none", keyExportCommodities: ["kopi", "bunga"] },
  },
  {
    countryCode: "CHL",
    countryName: "Chili",
    region: "Amerika Latin",
    market: { cornPriceIndex: 68, inflationRate: 3.5, commodityImportUSD: 3100, marketRisk: "medium", marketIndex: 69, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir salmon & buah segar global", "ketergantungan impor jagung untuk pakan ternak"] },
    supply: { supplyIndex: 64, isExporter: true, exportVolumeTon: 2800000, importVolumeTon: 3400000, tradeRelation: "none", keyExportCommodities: ["salmon", "buah-buahan"] },
  },
  {
    countryCode: "KAZ",
    countryName: "Kazakhstan",
    region: "Asia Tengah",
    market: { cornPriceIndex: 75, inflationRate: 8.1, commodityImportUSD: 1800, marketRisk: "medium", marketIndex: 76, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir gandum & barley utama Asia Tengah", "inflasi pangan gerus daya beli kelas menengah"] },
    supply: { supplyIndex: 80, isExporter: true, exportVolumeTon: 8400000, importVolumeTon: 1200000, tradeRelation: "partner", keyExportCommodities: ["gandum", "barley", "jagung"] },
  },
  {
    countryCode: "UZB",
    countryName: "Uzbekistan",
    region: "Asia Tengah",
    market: { cornPriceIndex: 72, inflationRate: 8.8, commodityImportUSD: 1400, marketRisk: "medium", marketIndex: 73, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["reformasi ekonomi dorong permintaan impor pangan", "eksportir kapas & buah kering regional"] },
    supply: { supplyIndex: 55, isExporter: false, exportVolumeTon: 1400000, importVolumeTon: 2800000, tradeRelation: "none", keyExportCommodities: ["kapas", "buah kering"] },
  },
  {
    countryCode: "ETH",
    countryName: "Ethiopia",
    region: "Afrika",
    market: { cornPriceIndex: 86, inflationRate: 28.0, commodityImportUSD: 2200, marketRisk: "high", marketIndex: 87, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["inflasi 28% ancam ketahanan pangan nasional", "kekeringan kronik ancam panen jagung", "konflik di perbatasan ganggu rantai pasok"] },
    supply: { supplyIndex: 50, isExporter: true, exportVolumeTon: 1600000, importVolumeTon: 2400000, tradeRelation: "none", keyExportCommodities: ["kopi", "sesame"] },
  },
  {
    countryCode: "KEN",
    countryName: "Kenya",
    region: "Afrika",
    market: { cornPriceIndex: 82, inflationRate: 6.8, commodityImportUSD: 1800, marketRisk: "high", marketIndex: 83, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["curah hujan tidak menentu ganggu panen", "pertumbuhan populasi cepat tingkatkan permintaan pangan"] },
    supply: { supplyIndex: 48, isExporter: false, exportVolumeTon: 800000, importVolumeTon: 2100000, tradeRelation: "none", keyExportCommodities: ["teh", "bunga"] },
  },
  {
    countryCode: "TZA",
    countryName: "Tanzania",
    region: "Afrika",
    market: { cornPriceIndex: 78, inflationRate: 4.8, commodityImportUSD: 1100, marketRisk: "medium", marketIndex: 77, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir jagung & kacang mede Afrika Timur", "fluktuasi curah hujan pengaruhi produksi"] },
    supply: { supplyIndex: 58, isExporter: true, exportVolumeTon: 1800000, importVolumeTon: 1600000, tradeRelation: "none", keyExportCommodities: ["jagung", "kacang mede"] },
  },
  {
    countryCode: "GHA",
    countryName: "Ghana",
    region: "Afrika",
    market: { cornPriceIndex: 84, inflationRate: 20.0, commodityImportUSD: 1600, marketRisk: "high", marketIndex: 85, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["inflasi 20% rontokkan daya beli", "eksportir kakao namun defisit pangan pokok", "cedi terdepresiasi 40% dalam setahun"] },
    supply: { supplyIndex: 52, isExporter: false, exportVolumeTon: 900000, importVolumeTon: 1900000, tradeRelation: "none", keyExportCommodities: ["kakao"] },
  },
];