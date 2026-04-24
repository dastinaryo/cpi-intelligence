import type { CountryData } from "@/types/dashboard";
 
// ~50 key countries: ASEAN, major commodity exporters/importers, CPI trade partners
const baseCountries: CountryData[] = [
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

  // ─── ASEAN TAMBAHAN ──────────────────────────────────────
  {
    countryCode: "LAO",
    countryName: "Laos",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 69, inflationRate: 24.0, commodityImportUSD: 280, marketRisk: "high", marketIndex: 70, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["inflasi 24% gerus daya beli masyarakat", "kip melemah tajam terhadap dolar", "ketergantungan tinggi pada impor pangan Thailand"] },
    supply: { supplyIndex: 48, isExporter: false, exportVolumeTon: 320000, importVolumeTon: 580000, tradeRelation: "none", keyExportCommodities: ["jagung", "kopi"] },
  },
  {
    countryCode: "BRN",
    countryName: "Brunei",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 48, inflationRate: 0.4, commodityImportUSD: 420, marketRisk: "low", marketIndex: 50, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["pendapatan minyak subsidi harga pangan", "100% ketergantungan impor pangan pokok"] },
    supply: { supplyIndex: 12, isExporter: false, exportVolumeTon: 0, importVolumeTon: 420000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "TLS",
    countryName: "Timor-Leste",
    region: "Asia Tenggara",
    market: { cornPriceIndex: 77, inflationRate: 8.2, commodityImportUSD: 95, marketRisk: "high", marketIndex: 75, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["ketahanan pangan sangat rentan", "infrastruktur distribusi terbatas", "ketergantungan penuh pada impor beras & jagung"] },
    supply: { supplyIndex: 30, isExporter: false, exportVolumeTon: 18000, importVolumeTon: 210000, tradeRelation: "none", keyExportCommodities: ["kopi"] },
  },

  // ─── ASIA TAMBAHAN ───────────────────────────────────────
  {
    countryCode: "TWN",
    countryName: "Taiwan",
    region: "Asia Timur",
    market: { cornPriceIndex: 60, inflationRate: 2.5, commodityImportUSD: 6800, marketRisk: "low", marketIndex: 62, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["industri pakan ternak modern butuh impor besar", "ketegangan Selat Taiwan ancam rantai pasok"] },
    supply: { supplyIndex: 30, isExporter: false, exportVolumeTon: 0, importVolumeTon: 7200000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "LKA",
    countryName: "Sri Lanka",
    region: "Asia Selatan",
    market: { cornPriceIndex: 83, inflationRate: 16.0, commodityImportUSD: 1400, marketRisk: "high", marketIndex: 84, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["pasca krisis ekonomi 2022", "cadangan devisa kritis limitasi impor pangan", "pertanian mulai pulih namun lambat"] },
    supply: { supplyIndex: 40, isExporter: false, exportVolumeTon: 320000, importVolumeTon: 1600000, tradeRelation: "none", keyExportCommodities: ["teh", "rempah"] },
  },
  {
    countryCode: "NPL",
    countryName: "Nepal",
    region: "Asia Selatan",
    market: { cornPriceIndex: 74, inflationRate: 7.1, commodityImportUSD: 620, marketRisk: "medium", marketIndex: 72, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["ketergantungan impor pangan dari India sangat tinggi", "bencana alam (gempa, banjir) ancam ketahanan pangan"] },
    supply: { supplyIndex: 42, isExporter: false, exportVolumeTon: 85000, importVolumeTon: 980000, tradeRelation: "none", keyExportCommodities: ["teh", "rempah lokal"] },
  },
  {
    countryCode: "MNG",
    countryName: "Mongolia",
    region: "Asia Timur",
    market: { cornPriceIndex: 72, inflationRate: 10.5, commodityImportUSD: 380, marketRisk: "medium", marketIndex: 70, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["cuaca ekstrem dzud (badai salju) ancam peternakan", "ketergantungan daging & susu dari ternak lokal", "impor biji-bijian dari Rusia & China dominan"] },
    supply: { supplyIndex: 45, isExporter: false, exportVolumeTon: 55000, importVolumeTon: 620000, tradeRelation: "none", keyExportCommodities: ["daging", "kasmir"] },
  },

  // ─── TIMUR TENGAH TAMBAHAN ───────────────────────────────
  {
    countryCode: "QAT",
    countryName: "Qatar",
    region: "Timur Tengah",
    market: { cornPriceIndex: 46, inflationRate: 1.2, commodityImportUSD: 2800, marketRisk: "low", marketIndex: 48, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "growing", riskSignal: "green", externalFactors: ["pendapatan gas alam subsidiasi impor pangan", "100% impor bahan pangan pokok", "investasi ketahanan pangan pasca blokade 2017"] },
    supply: { supplyIndex: 10, isExporter: false, exportVolumeTon: 0, importVolumeTon: 2800000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "KWT",
    countryName: "Kuwait",
    region: "Timur Tengah",
    market: { cornPriceIndex: 48, inflationRate: 3.2, commodityImportUSD: 3100, marketRisk: "low", marketIndex: 50, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["subsidi pangan pemerintah sangat besar", "impor 90% kebutuhan pangan dari luar negeri"] },
    supply: { supplyIndex: 8, isExporter: false, exportVolumeTon: 0, importVolumeTon: 3100000, tradeRelation: "partner", keyExportCommodities: [] },
  },
  {
    countryCode: "JOR",
    countryName: "Yordania",
    region: "Timur Tengah",
    market: { cornPriceIndex: 74, inflationRate: 3.8, commodityImportUSD: 2200, marketRisk: "medium", marketIndex: 72, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["krisis air ancam produksi pertanian lokal", "tekanan dari influx pengungsi Suriah & Palestina", "importir gandum terbesar per kapita di kawasan"] },
    supply: { supplyIndex: 22, isExporter: false, exportVolumeTon: 180000, importVolumeTon: 2400000, tradeRelation: "none", keyExportCommodities: ["fosfat", "sayuran"] },
  },
  {
    countryCode: "OMN",
    countryName: "Oman",
    region: "Timur Tengah",
    market: { cornPriceIndex: 52, inflationRate: 1.5, commodityImportUSD: 2400, marketRisk: "low", marketIndex: 54, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["diversifikasi ekonomi kurangi ketergantungan minyak", "impor 80% pangan dari India dan Pakistan"] },
    supply: { supplyIndex: 15, isExporter: false, exportVolumeTon: 0, importVolumeTon: 2500000, tradeRelation: "partner", keyExportCommodities: [] },
  },

  // ─── EROPA TAMBAHAN ──────────────────────────────────────
  {
    countryCode: "ROU",
    countryName: "Rumania",
    region: "Eropa Timur",
    market: { cornPriceIndex: 65, inflationRate: 5.8, commodityImportUSD: 3200, marketRisk: "medium", marketIndex: 66, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["lumbung jagung Eropa ke-3 terbesar", "inflasi pangan tertinggi di EU", "ekspor jagung ke Timur Tengah meningkat"] },
    supply: { supplyIndex: 72, isExporter: true, exportVolumeTon: 9200000, importVolumeTon: 2800000, tradeRelation: "partner", keyExportCommodities: ["jagung", "gandum", "bunga matahari"] },
  },
  {
    countryCode: "HUN",
    countryName: "Hungaria",
    region: "Eropa Timur",
    market: { cornPriceIndex: 64, inflationRate: 4.2, commodityImportUSD: 2600, marketRisk: "medium", marketIndex: 65, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["produsen jagung & gandum penting di Eropa Tengah", "kebijakan agrikultur mandiri dari EU sebagian"] },
    supply: { supplyIndex: 70, isExporter: true, exportVolumeTon: 7400000, importVolumeTon: 2200000, tradeRelation: "none", keyExportCommodities: ["jagung", "gandum", "biji bunga matahari"] },
  },
  {
    countryCode: "SWE",
    countryName: "Swedia",
    region: "Eropa Barat",
    market: { cornPriceIndex: 54, inflationRate: 2.1, commodityImportUSD: 5800, marketRisk: "low", marketIndex: 56, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["industri pangan berkelanjutan & organik kuat", "impor jagung pakan ternak dari Eropa Timur"] },
    supply: { supplyIndex: 55, isExporter: false, exportVolumeTon: 2100000, importVolumeTon: 4800000, tradeRelation: "none", keyExportCommodities: ["barley", "oat"] },
  },
  {
    countryCode: "NOR",
    countryName: "Norwegia",
    region: "Eropa Barat",
    market: { cornPriceIndex: 52, inflationRate: 3.3, commodityImportUSD: 3900, marketRisk: "low", marketIndex: 54, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir salmon terbesar dunia", "impor biji-bijian pakan ternak sangat tinggi"] },
    supply: { supplyIndex: 45, isExporter: false, exportVolumeTon: 1200000, importVolumeTon: 4200000, tradeRelation: "none", keyExportCommodities: ["salmon", "ikan laut"] },
  },
  {
    countryCode: "PRT",
    countryName: "Portugal",
    region: "Eropa Barat",
    market: { cornPriceIndex: 62, inflationRate: 2.6, commodityImportUSD: 4200, marketRisk: "low", marketIndex: 64, tradeBalance: "deficit", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["kekeringan berulang tekan produksi pertanian", "eksportir minyak zaitun & anggur premium"] },
    supply: { supplyIndex: 58, isExporter: false, exportVolumeTon: 2800000, importVolumeTon: 4600000, tradeRelation: "none", keyExportCommodities: ["minyak zaitun", "anggur", "ikan"] },
  },
  {
    countryCode: "GRC",
    countryName: "Yunani",
    region: "Eropa Barat",
    market: { cornPriceIndex: 65, inflationRate: 2.9, commodityImportUSD: 5100, marketRisk: "medium", marketIndex: 64, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["produsen minyak zaitun & perikanan penting", "impor jagung pakan ternak dari Bulgaria & Rumania"] },
    supply: { supplyIndex: 60, isExporter: false, exportVolumeTon: 3200000, importVolumeTon: 5600000, tradeRelation: "none", keyExportCommodities: ["minyak zaitun", "buah-buahan", "ikan"] },
  },
  {
    countryCode: "BLR",
    countryName: "Belarus",
    region: "Eropa Timur",
    market: { cornPriceIndex: 70, inflationRate: 6.5, commodityImportUSD: 1800, marketRisk: "high", marketIndex: 71, tradeBalance: "surplus", priceVolatility: "high", demandTrend: "stable", riskSignal: "red", externalFactors: ["sanksi barat batasi akses pasar ekspor", "ketergantungan ekonomi pada Rusia sangat tinggi", "produksi kentang & produk susu besar"] },
    supply: { supplyIndex: 68, isExporter: true, exportVolumeTon: 5200000, importVolumeTon: 2400000, tradeRelation: "none", keyExportCommodities: ["kentang", "produk susu", "gula bit"] },
  },

  // ─── AMERIKA LATIN TAMBAHAN ──────────────────────────────
  {
    countryCode: "VEN",
    countryName: "Venezuela",
    region: "Amerika Latin",
    market: { cornPriceIndex: 95, inflationRate: 190.0, commodityImportUSD: 1200, marketRisk: "high", marketIndex: 96, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["hiperinflasi 190% hancurkan sistem distribusi pangan", "krisis ekonomi akibat sanksi & mismanajemen", "migrasi besar-besaran kurangi tenaga kerja pertanian"] },
    supply: { supplyIndex: 20, isExporter: false, exportVolumeTon: 80000, importVolumeTon: 2400000, tradeRelation: "none", keyExportCommodities: [] },
  },
  {
    countryCode: "BOL",
    countryName: "Bolivia",
    region: "Amerika Latin",
    market: { cornPriceIndex: 71, inflationRate: 4.8, commodityImportUSD: 820, marketRisk: "medium", marketIndex: 70, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["produsen quinoa & kedelai berkembang", "keterbatasan infrastruktur hambat ekspor"] },
    supply: { supplyIndex: 58, isExporter: true, exportVolumeTon: 2200000, importVolumeTon: 1800000, tradeRelation: "none", keyExportCommodities: ["kedelai", "quinoa", "jagung"] },
  },
  {
    countryCode: "ECU",
    countryName: "Ekuador",
    region: "Amerika Latin",
    market: { cornPriceIndex: 70, inflationRate: 3.6, commodityImportUSD: 1600, marketRisk: "medium", marketIndex: 69, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir pisang & udang terbesar dunia", "dolarisasi ekonomi stabilkan harga pangan"] },
    supply: { supplyIndex: 62, isExporter: true, exportVolumeTon: 3400000, importVolumeTon: 2800000, tradeRelation: "none", keyExportCommodities: ["pisang", "udang", "kakao"] },
  },
  {
    countryCode: "PRY",
    countryName: "Paraguay",
    region: "Amerika Latin",
    market: { cornPriceIndex: 73, inflationRate: 4.5, commodityImportUSD: 480, marketRisk: "medium", marketIndex: 71, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir kedelai & jagung besar per kapita", "cuaca kering ancam hasil panen sering"] },
    supply: { supplyIndex: 78, isExporter: true, exportVolumeTon: 8600000, importVolumeTon: 1200000, tradeRelation: "partner", keyExportCommodities: ["kedelai", "jagung", "daging sapi"] },
  },
  {
    countryCode: "URY",
    countryName: "Uruguay",
    region: "Amerika Latin",
    market: { cornPriceIndex: 66, inflationRate: 5.5, commodityImportUSD: 620, marketRisk: "medium", marketIndex: 65, tradeBalance: "surplus", priceVolatility: "medium", demandTrend: "stable", riskSignal: "yellow", externalFactors: ["eksportir daging sapi & kedelai premium", "inflasi 5.5% terkendali dibanding tetangga"] },
    supply: { supplyIndex: 82, isExporter: true, exportVolumeTon: 4800000, importVolumeTon: 900000, tradeRelation: "none", keyExportCommodities: ["daging sapi", "kedelai", "beras"] },
  },

  // ─── AFRIKA TAMBAHAN ─────────────────────────────────────
  {
    countryCode: "MAR",
    countryName: "Maroko",
    region: "Afrika Utara",
    market: { cornPriceIndex: 73, inflationRate: 6.2, commodityImportUSD: 3800, marketRisk: "medium", marketIndex: 72, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["kekeringan berulang tekan produksi gandum lokal", "ekspor fosfat mendanai impor pangan", "reformasi pertanian dorong produktivitas"] },
    supply: { supplyIndex: 48, isExporter: false, exportVolumeTon: 1200000, importVolumeTon: 4200000, tradeRelation: "none", keyExportCommodities: ["fosfat", "sitrus", "tomat"] },
  },
  {
    countryCode: "DZA",
    countryName: "Aljazair",
    region: "Afrika Utara",
    market: { cornPriceIndex: 75, inflationRate: 9.5, commodityImportUSD: 5200, marketRisk: "medium", marketIndex: 76, tradeBalance: "deficit", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["subsidi pangan pemerintah sangat besar dari pendapatan migas", "importir gandum terbesar Afrika", "keterbatasan lahan subur hambat swasembada"] },
    supply: { supplyIndex: 35, isExporter: false, exportVolumeTon: 420000, importVolumeTon: 6200000, tradeRelation: "none", keyExportCommodities: ["kurma"] },
  },
  {
    countryCode: "MOZ",
    countryName: "Mozambik",
    region: "Afrika",
    market: { cornPriceIndex: 80, inflationRate: 7.2, commodityImportUSD: 780, marketRisk: "high", marketIndex: 78, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["bencana siklon berulang hancurkan infrastruktur pangan", "salah satu negara termiskin dunia", "ketahanan pangan sangat rentan"] },
    supply: { supplyIndex: 38, isExporter: false, exportVolumeTon: 480000, importVolumeTon: 1200000, tradeRelation: "none", keyExportCommodities: ["tembakau", "kacang mede", "gula"] },
  },
  {
    countryCode: "ZWE",
    countryName: "Zimbabwe",
    region: "Afrika",
    market: { cornPriceIndex: 89, inflationRate: 55.0, commodityImportUSD: 960, marketRisk: "high", marketIndex: 90, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "declining", riskSignal: "red", externalFactors: ["inflasi 55% kembali mengancam pasca krisis mata uang", "reforma agraria ganggu produktivitas pertanian", "kekeringan El Niño berulang hancurkan panen jagung"] },
    supply: { supplyIndex: 32, isExporter: false, exportVolumeTon: 320000, importVolumeTon: 1400000, tradeRelation: "none", keyExportCommodities: ["tembakau", "emas"] },
  },
  {
    countryCode: "CIV",
    countryName: "Pantai Gading",
    region: "Afrika",
    market: { cornPriceIndex: 76, inflationRate: 5.4, commodityImportUSD: 1200, marketRisk: "medium", marketIndex: 74, tradeBalance: "neutral", priceVolatility: "medium", demandTrend: "growing", riskSignal: "yellow", externalFactors: ["eksportir kakao terbesar dunia (40% supply global)", "defisit pangan pokok meski surplus komoditas ekspor"] },
    supply: { supplyIndex: 55, isExporter: true, exportVolumeTon: 2400000, importVolumeTon: 1800000, tradeRelation: "none", keyExportCommodities: ["kakao", "kopi", "karet"] },
  },
  {
    countryCode: "CMR",
    countryName: "Kamerun",
    region: "Afrika",
    market: { cornPriceIndex: 78, inflationRate: 7.3, commodityImportUSD: 960, marketRisk: "high", marketIndex: 77, tradeBalance: "deficit", priceVolatility: "high", demandTrend: "growing", riskSignal: "red", externalFactors: ["konflik di wilayah Barat Laut hambat produksi pertanian", "ketidakstabilan keamanan ganggu rantai distribusi"] },
    supply: { supplyIndex: 44, isExporter: false, exportVolumeTon: 680000, importVolumeTon: 1400000, tradeRelation: "none", keyExportCommodities: ["kakao", "kopi", "pisang"] },
  },

  // ─── OSEANIA TAMBAHAN ────────────────────────────────────
  {
    countryCode: "NZL",
    countryName: "Selandia Baru",
    region: "Oseania",
    market: { cornPriceIndex: 56, inflationRate: 3.3, commodityImportUSD: 1200, marketRisk: "low", marketIndex: 58, tradeBalance: "surplus", priceVolatility: "low", demandTrend: "stable", riskSignal: "green", externalFactors: ["eksportir produk susu & daging domba premium", "iklim pertanian kondusif sepanjang tahun"] },
    supply: { supplyIndex: 82, isExporter: true, exportVolumeTon: 8200000, importVolumeTon: 1400000, tradeRelation: "partner", keyExportCommodities: ["produk susu", "daging domba", "daging sapi"] },
  },
];

type CountrySeed = {
  countryCode: string;
  countryName: string;
  region: string;
};

const EXTRA_COUNTRY_SEEDS: CountrySeed[] = [
  { countryCode: "AFG", countryName: "Afghanistan", region: "Asia Selatan" },
  { countryCode: "ALB", countryName: "Albania", region: "Eropa Selatan" },
  { countryCode: "AND", countryName: "Andorra", region: "Eropa Barat" },
  { countryCode: "AGO", countryName: "Angola", region: "Afrika" },
  { countryCode: "ATG", countryName: "Antigua dan Barbuda", region: "Karibia" },
  { countryCode: "ARM", countryName: "Armenia", region: "Asia Barat" },
  { countryCode: "AUT", countryName: "Austria", region: "Eropa Barat" },
  { countryCode: "AZE", countryName: "Azerbaijan", region: "Asia Barat" },
  { countryCode: "BHS", countryName: "Bahama", region: "Karibia" },
  { countryCode: "BHR", countryName: "Bahrain", region: "Timur Tengah" },
  { countryCode: "BRB", countryName: "Barbados", region: "Karibia" },
  { countryCode: "BEL", countryName: "Belgia", region: "Eropa Barat" },
  { countryCode: "BLZ", countryName: "Belize", region: "Amerika Tengah" },
  { countryCode: "BEN", countryName: "Benin", region: "Afrika" },
  { countryCode: "BTN", countryName: "Bhutan", region: "Asia Selatan" },
  { countryCode: "BIH", countryName: "Bosnia dan Herzegovina", region: "Eropa Selatan" },
  { countryCode: "BWA", countryName: "Botswana", region: "Afrika" },
  { countryCode: "BGR", countryName: "Bulgaria", region: "Eropa Timur" },
  { countryCode: "BFA", countryName: "Burkina Faso", region: "Afrika" },
  { countryCode: "BDI", countryName: "Burundi", region: "Afrika" },
  { countryCode: "CPV", countryName: "Tanjung Verde", region: "Afrika" },
  { countryCode: "CAF", countryName: "Republik Afrika Tengah", region: "Afrika" },
  { countryCode: "TCD", countryName: "Chad", region: "Afrika" },
  { countryCode: "COM", countryName: "Komoro", region: "Afrika" },
  { countryCode: "COG", countryName: "Republik Kongo", region: "Afrika" },
  { countryCode: "CRI", countryName: "Kosta Rika", region: "Amerika Tengah" },
  { countryCode: "HRV", countryName: "Kroasia", region: "Eropa Selatan" },
  { countryCode: "CUB", countryName: "Kuba", region: "Karibia" },
  { countryCode: "CYP", countryName: "Siprus", region: "Eropa Selatan" },
  { countryCode: "CZE", countryName: "Ceko", region: "Eropa Tengah" },
  { countryCode: "DNK", countryName: "Denmark", region: "Eropa Utara" },
  { countryCode: "DJI", countryName: "Djibouti", region: "Afrika" },
  { countryCode: "DMA", countryName: "Dominika", region: "Karibia" },
  { countryCode: "DOM", countryName: "Republik Dominika", region: "Karibia" },
  { countryCode: "SLV", countryName: "El Salvador", region: "Amerika Tengah" },
  { countryCode: "GNQ", countryName: "Guinea Ekuatorial", region: "Afrika" },
  { countryCode: "ERI", countryName: "Eritrea", region: "Afrika" },
  { countryCode: "EST", countryName: "Estonia", region: "Eropa Utara" },
  { countryCode: "SWZ", countryName: "Eswatini", region: "Afrika" },
  { countryCode: "FIN", countryName: "Finlandia", region: "Eropa Utara" },
  { countryCode: "GAB", countryName: "Gabon", region: "Afrika" },
  { countryCode: "GMB", countryName: "Gambia", region: "Afrika" },
  { countryCode: "GEO", countryName: "Georgia", region: "Eropa Timur" },
  { countryCode: "GIN", countryName: "Guinea", region: "Afrika" },
  { countryCode: "GNB", countryName: "Guinea-Bissau", region: "Afrika" },
  { countryCode: "GUY", countryName: "Guyana", region: "Amerika Selatan" },
  { countryCode: "HTI", countryName: "Haiti", region: "Karibia" },
  { countryCode: "ISL", countryName: "Islandia", region: "Eropa Utara" },
  { countryCode: "IRL", countryName: "Irlandia", region: "Eropa Barat" },
  { countryCode: "ISR", countryName: "Israel", region: "Timur Tengah" },
  { countryCode: "JAM", countryName: "Jamaika", region: "Karibia" },
  { countryCode: "KIR", countryName: "Kiribati", region: "Oseania" },
  { countryCode: "KGZ", countryName: "Kirgizstan", region: "Asia Tengah" },
  { countryCode: "LVA", countryName: "Latvia", region: "Eropa Utara" },
  { countryCode: "LBN", countryName: "Lebanon", region: "Timur Tengah" },
  { countryCode: "LSO", countryName: "Lesotho", region: "Afrika" },
  { countryCode: "LBR", countryName: "Liberia", region: "Afrika" },
  { countryCode: "LBY", countryName: "Libya", region: "Afrika Utara" },
  { countryCode: "LIE", countryName: "Liechtenstein", region: "Eropa Barat" },
  { countryCode: "LTU", countryName: "Lituania", region: "Eropa Utara" },
  { countryCode: "LUX", countryName: "Luksemburg", region: "Eropa Barat" },
  { countryCode: "MDG", countryName: "Madagaskar", region: "Afrika" },
  { countryCode: "MWI", countryName: "Malawi", region: "Afrika" },
  { countryCode: "MDV", countryName: "Maladewa", region: "Asia Selatan" },
  { countryCode: "MLI", countryName: "Mali", region: "Afrika" },
  { countryCode: "MLT", countryName: "Malta", region: "Eropa Selatan" },
  { countryCode: "MRT", countryName: "Mauritania", region: "Afrika" },
  { countryCode: "MUS", countryName: "Mauritius", region: "Afrika" },
  { countryCode: "FSM", countryName: "Mikronesia", region: "Oseania" },
  { countryCode: "MDA", countryName: "Moldova", region: "Eropa Timur" },
  { countryCode: "MCO", countryName: "Monako", region: "Eropa Barat" },
  { countryCode: "MNE", countryName: "Montenegro", region: "Eropa Selatan" },
  { countryCode: "NAM", countryName: "Namibia", region: "Afrika" },
  { countryCode: "NRU", countryName: "Nauru", region: "Oseania" },
  { countryCode: "MKD", countryName: "Makedonia Utara", region: "Eropa Selatan" },
  { countryCode: "PNG", countryName: "Papua Nugini", region: "Oseania" },
  { countryCode: "PRK", countryName: "Korea Utara", region: "Asia Timur" },
  { countryCode: "PAN", countryName: "Panama", region: "Amerika Tengah" },
  { countryCode: "SYC", countryName: "Seychelles", region: "Afrika" },
  { countryCode: "SLE", countryName: "Sierra Leone", region: "Afrika" },
  { countryCode: "SVK", countryName: "Slovakia", region: "Eropa Tengah" },
  { countryCode: "SVN", countryName: "Slovenia", region: "Eropa Selatan" },
  { countryCode: "SOM", countryName: "Somalia", region: "Afrika" },
  { countryCode: "SSD", countryName: "Sudan Selatan", region: "Afrika" },
  { countryCode: "SDN", countryName: "Sudan", region: "Afrika" },
  { countryCode: "SUR", countryName: "Suriname", region: "Amerika Selatan" },
  { countryCode: "CHE", countryName: "Swiss", region: "Eropa Barat" },
  { countryCode: "SYR", countryName: "Suriah", region: "Timur Tengah" },
  { countryCode: "TJK", countryName: "Tajikistan", region: "Asia Tengah" },
  { countryCode: "TGO", countryName: "Togo", region: "Afrika" },
  { countryCode: "TON", countryName: "Tonga", region: "Oseania" },
  { countryCode: "TTO", countryName: "Trinidad dan Tobago", region: "Karibia" },
  { countryCode: "TUN", countryName: "Tunisia", region: "Afrika Utara" },
  { countryCode: "TKM", countryName: "Turkmenistan", region: "Asia Tengah" },
  { countryCode: "TUV", countryName: "Tuvalu", region: "Oseania" },
  { countryCode: "UGA", countryName: "Uganda", region: "Afrika" },
  { countryCode: "VUT", countryName: "Vanuatu", region: "Oseania" },
  { countryCode: "YEM", countryName: "Yaman", region: "Timur Tengah" },
  { countryCode: "ZMB", countryName: "Zambia", region: "Afrika" },
  { countryCode: "RWA", countryName: "Rwanda", region: "Afrika" },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const hashCode = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const indexBands: Array<[number, number]> = [
  [8, 15],
  [16, 30],
  [31, 45],
  [46, 60],
  [61, 75],
  [76, 94],
];

const commodityPool = [
  "jagung",
  "gandum",
  "beras",
  "kedelai",
  "barley",
  "gula",
  "daging sapi",
  "ayam beku",
  "kopi",
  "kakao",
];

const deriveRiskLevel = (indexValue: number, inflationRate: number): "low" | "medium" | "high" => {
  if (indexValue >= 78 || inflationRate >= 8) return "high";
  if (indexValue >= 50 || inflationRate >= 4) return "medium";
  return "low";
};

const deriveRiskSignal = (indexValue: number, inflationRate: number): "green" | "yellow" | "red" => {
  if (indexValue >= 75 || inflationRate >= 8) return "red";
  if (indexValue >= 45 || inflationRate >= 4) return "yellow";
  return "green";
};

const deriveDemandTrend = (indexValue: number): "growing" | "stable" | "declining" => {
  if (indexValue >= 68) return "growing";
  if (indexValue <= 35) return "declining";
  return "stable";
};

const rebalanceCountry = (country: CountryData): CountryData => {
  const seed = hashCode(country.countryCode);
  const [minBand, maxBand] = indexBands[seed % indexBands.length];
  const targetIndex = minBand + ((seed >> 4) % (maxBand - minBand + 1));
  const marketIndex = Math.round(targetIndex * 0.65 + country.market.marketIndex * 0.35);
  const inflationRate = Number((1.2 + ((seed >> 2) % 130) / 10).toFixed(1));
  const priceVolatility = deriveRiskLevel(marketIndex, inflationRate);
  const riskSignal = deriveRiskSignal(marketIndex, inflationRate);
  const demandTrend = deriveDemandTrend(marketIndex);
  const supplyIndex = clamp(
    Math.round((country.supply.supplyIndex * 0.45) + ((seed >> 3) % 86) * 0.55),
    8,
    96,
  );

  return {
    ...country,
    market: {
      ...country.market,
      marketIndex,
      cornPriceIndex: clamp(Math.round(marketIndex + (((seed >> 5) % 17) - 8)), 8, 98),
      inflationRate,
      marketRisk: deriveRiskLevel(marketIndex, inflationRate),
      priceVolatility,
      demandTrend,
      riskSignal,
    },
    supply: {
      ...country.supply,
      supplyIndex,
    },
  };
};

const generatedCountries: CountryData[] = EXTRA_COUNTRY_SEEDS.map((seed, index) => {
  const hash = hashCode(`${seed.countryCode}:${seed.countryName}`);
  const [minBand, maxBand] = indexBands[(hash + index) % indexBands.length];
  const marketIndex = minBand + ((hash >> 3) % (maxBand - minBand + 1));
  const inflationRate = Number((1.4 + ((hash >> 5) % 120) / 10).toFixed(1));
  const marketRisk = deriveRiskLevel(marketIndex, inflationRate);
  const riskSignal = deriveRiskSignal(marketIndex, inflationRate);
  const demandTrend = deriveDemandTrend(marketIndex);
  const supplyIndex = clamp(12 + ((hash >> 7) % 84), 10, 96);
  const exportVolumeTon = (hash % 2 === 0 ? 1 : 0) * (180000 + ((hash >> 9) % 9200000));
  const importVolumeTon = 120000 + ((hash >> 11) % 9800000);
  const isExporter = exportVolumeTon > importVolumeTon * 0.75;
  const tradeBalance = exportVolumeTon > importVolumeTon * 1.08 ? "surplus" : exportVolumeTon < importVolumeTon * 0.92 ? "deficit" : "neutral";
  const tradeRelation = (["partner", "competitor", "none"] as const)[hash % 3];
  const commodityA = commodityPool[hash % commodityPool.length];
  const commodityB = commodityPool[(hash >> 4) % commodityPool.length];

  return {
    countryCode: seed.countryCode,
    countryName: seed.countryName,
    region: seed.region,
    market: {
      cornPriceIndex: clamp(Math.round(marketIndex + (((hash >> 13) % 17) - 8)), 6, 98),
      inflationRate,
      commodityImportUSD: 180 + ((hash >> 15) % 36000),
      marketRisk,
      marketIndex,
      tradeBalance,
      priceVolatility: marketRisk,
      demandTrend,
      riskSignal,
      externalFactors: [
        `Perubahan biaya logistik regional (${seed.region})`,
        `Dinamika permintaan domestik ${seed.countryName}`,
      ],
    },
    supply: {
      supplyIndex,
      isExporter,
      exportVolumeTon,
      importVolumeTon,
      tradeRelation,
      keyExportCommodities: commodityA === commodityB ? [commodityA] : [commodityA, commodityB],
    },
  };
});

export const countries: CountryData[] = [...baseCountries.map(rebalanceCountry), ...generatedCountries];
