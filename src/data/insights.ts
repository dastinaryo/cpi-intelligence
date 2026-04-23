import type { InsightContent } from "@/types/dashboard";
 
export const insights: InsightContent[] = [
  // ─── MARKET INSIGHTS — LOCAL ─────────────────────────────
  {
    id: "INS-market-local",
    mode: "market",
    scope: "local",
    title: "Market Insights",
    items: [
      {
        text: "Harga jagung lokal naik 2.3% MoM, dipicu penurunan pasokan dari Jawa Timur akibat cuaca kering El Niño.",
        type: "observation",
      },
      {
        text: "Tekanan inflasi bahan pokok di Sumatera Utara mencapai 4.8% YoY — tertinggi dalam 14 bulan. Risiko daya beli konsumen melemah.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Permintaan ayam potong di Jabodetabek tumbuh 8.2% YoY pasca Lebaran — peluang ekspansi kapasitas distribusi ke segmen HORECA.",
        type: "opportunity",
      },
      {
        text: "Pertimbangkan hedging kontrak jagung Q3 2024 untuk mitigasi risiko kenaikan HPP dan dampak El Niño.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },
 
  // ─── MARKET INSIGHTS — GLOBAL ────────────────────────────
  {
    id: "INS-market-global",
    mode: "market",
    scope: "global",
    title: "Market Insights",
    items: [
      {
        text: "Harga jagung CBOT turun 22% YTD akibat panen raya Brasil dan Argentina. Harga lokal belum mengikuti — potensi arbitrase.",
        type: "observation",
      },
      {
        text: "Biaya freight Laut Merah naik 35% akibat konflik Yaman. Rute alternatif via Tanjung Harapan menambah waktu tempuh 12–14 hari.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Filipina buka kuota impor unggas baru — peluang ekspor produk olahan CPI ke pasar ASEAN senilai estimasi USD 45 juta.",
        type: "opportunity",
      },
      {
        text: "Diversifikasi sumber impor jagung: tambah porsi Brasil (saat ini rendah) untuk kurangi ketergantungan pada Ukraina.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },
 
  // ─── SUPPLY INSIGHTS — LOCAL ─────────────────────────────
  {
    id: "INS-supply-local",
    mode: "supply",
    scope: "local",
    title: "Supply Insights",
    items: [
      {
        text: "Jawa Barat dan Jawa Tengah defisit masing-masing 320 dan 180 ton. Mitra di kedua wilayah rata-rata beroperasi di 82–88% kapasitas.",
        type: "observation",
      },
      {
        text: "Sulawesi Selatan surplus 410 ton — terbesar nasional. Namun biaya realokasi ke Jawa membutuhkan analisis cost-benefit.",
        type: "risk",
        severity: "low",
      },
      {
        text: "DKI Jakarta dan Bali mengalami shortage akut dengan demand tumbuh masing-masing 8.2% dan 9.1% YoY. Prioritaskan penambahan kapasitas distribusi.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Realokasi surplus Lampung (610 ton) dan Sulawesi Selatan (410 ton) ke Jawa dan Bali dapat menutupi 68% total defisit nasional.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },
 
  // ─── SUPPLY INSIGHTS — GLOBAL ────────────────────────────
  {
    id: "INS-supply-global",
    mode: "supply",
    scope: "global",
    title: "Supply Insights",
    items: [
      {
        text: "Brasil dan Argentina surplus produksi jagung tertinggi — total ekspor gabungan 98 juta ton, melebihi kapasitas ekspor Amerika Serikat.",
        type: "observation",
      },
      {
        text: "Konflik Ukraina memangkas ekspor jagung 28 juta ton/tahun dari Laut Hitam. Dampak langsung pada ketersediaan dan harga global.",
        type: "risk",
        severity: "high",
      },
      {
        text: "India membatasi ekspor beras — mendorong substitusi konsumsi ke protein hewani di Asia Tenggara. Potensi peningkatan demand 4–6% regional.",
        type: "opportunity",
      },
      {
        text: "Tingkatkan proporsi kontrak jagung dari Brasil (saat ini <10% dari total impor) untuk mengimbangi risiko geopolitik Ukraina.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "medium",
  },
 
  // ─── GENERAL INSIGHTS — LOCAL ────────────────────────────
  {
    id: "INS-general-local",
    mode: "market",
    scope: "local",
    title: "General Insights",
    items: [
      {
        text: "Pertumbuhan ekonomi Indonesia 5.1% Q1 2024 mendukung konsumsi protein hewani. CPI berpotensi menikmati tailwind demand sepanjang 2024.",
        type: "observation",
      },
      {
        text: "Pelemahan Rupiah ke Rp 16.200/USD meningkatkan biaya impor bahan baku pakan ~Rp 200/kg. Margin pakan tertekan jika tidak ada penyesuaian harga.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Saham CPIN diperdagangkan di P/E 14.2x vs rata-rata sektor 12.1x. Valuasi premium mencerminkan kepercayaan pasar pada posisi market leader CPI.",
        type: "observation",
      },
      {
        text: "Pertimbangkan ekspansi ke segmen ready-to-cook/frozen food untuk menangkap tren konsumen urban yang semakin sibuk.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },
 
  // ─── GENERAL INSIGHTS — GLOBAL ───────────────────────────
  {
    id: "INS-general-global",
    mode: "market",
    scope: "global",
    title: "General Insights",
    items: [
      {
        text: "Suku bunga Fed yang tinggi menekan nilai tukar emerging market. Perusahaan dengan eksposur impor bahan baku perlu strategi lindung nilai FX.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Pasar unggas ASEAN tumbuh 6.2% CAGR 2023–2028 berdasarkan proyeksi FAO. Peluang ekspansi regional untuk pemain terdiversifikasi seperti CPI.",
        type: "opportunity",
      },
      {
        text: "Tren global: konsumen beralih ke protein nabati di Eropa dan Amerika Utara, tapi Asia Tenggara masih didominasi pertumbuhan konsumsi protein hewani.",
        type: "observation",
      },
      {
        text: "Prioritaskan sertifikasi halal internasional untuk membuka akses ke pasar Timur Tengah dan OIC — potensi ekspor USD 2–3 miliar jangka panjang.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "medium",
  },
 
  // ─── SUPPLY GENERAL — LOCAL (untuk kartu "General Insights" saat mode supply) ─
  {
    id: "INS-general-supply-local",
    mode: "supply",
    scope: "local",
    title: "General Insights",
    items: [
      {
        text: "Total 35 mitra aktif tersebar di 15 provinsi dengan utilisasi rata-rata 83.6%. Kapasitas nasional masih cukup untuk menampung pertumbuhan 8–10%.",
        type: "observation",
      },
      {
        text: "5 mitra dengan reliability score di bawah 75 perlu program improvement. Risiko supply disruption jika tidak ditangani sebelum Q3.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "48 pelanggan tier platinum/gold mewakili 72% total revenue. Fokus pada retensi dan upselling segmen ini untuk efisiensi biaya akuisisi.",
        type: "observation",
      },
      {
        text: "Implementasi sistem demand forecasting berbasis AI dapat mengurangi buffer stock 15–20% sambil mempertahankan service level 95%+.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },
 
  // ─── SUPPLY GENERAL — GLOBAL ─────────────────────────────
  {
    id: "INS-general-supply-global",
    mode: "supply",
    scope: "global",
    title: "General Insights",
    items: [
      {
        text: "Rantai pasokan global poultry masih terpengaruh inflasi biaya logistik. Rata-rata shipping cost Asia–Eropa naik 35% vs pre-2023.",
        type: "observation",
      },
      {
        text: "Brasil dan Thailand adalah mitra ekspor unggas paling kompetitif di ASEAN. Studi benchmarking efisiensi rantai pasokan kedua negara ini direkomendasikan.",
        type: "opportunity",
      },
      {
        text: "Teknologi precision livestock farming berkembang pesat. Adopsi IoT di kandang mitra dapat meningkatkan FCR (Feed Conversion Ratio) 5–8%.",
        type: "recommendation",
      },
      {
        text: "Volatilitas harga bahan baku pakan global kemungkinan berlanjut hingga 2025 akibat kombinasi cuaca ekstrem dan ketidakpastian geopolitik.",
        type: "risk",
        severity: "medium",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "medium",
  },
];

