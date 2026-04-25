import type { InsightContent } from "@/types/dashboard";
 
export const insights: InsightContent[] = [
  // ─── MARKET INSIGHTS — LOCAL ─────────────────────────────
  {
    id: "INS-market-local",
    mode: "market",
    scope: "local",
    title: "Local Insights",
    items: [
      {
        text: "Kenaikan harga jagung di sentra Jatim dan Jateng belum sepenuhnya diteruskan ke harga ayam retail; spread feed-to-livebird melebar dan menekan margin farm plasma di wilayah urban.",
        type: "observation",
      },
      {
        text: "Wilayah dengan inflasi pangan >4% YoY menunjukkan perlambatan volume premium product; risiko trading-down meningkat dalam 4–8 minggu ke depan jika harga tidak direkalibrasi.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Permintaan HORECA di klaster Jabodetabek–Bandung pulih lebih cepat dari channel tradisional; momentum ini mendukung mix-shift ke produk bernilai tambah dengan gross margin lebih baik.",
        type: "opportunity",
      },
      {
        text: "Prioritaskan repricing bertahap per klaster kota, bukan nasional sekaligus: fokus dulu area dengan elastisitas rendah untuk memulihkan margin tanpa memicu penurunan volume tajam.",
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
    title: "Global Insights",
    items: [
      {
        text: "Harga jagung global melemah, tetapi transmisi ke pasar domestik tersendat oleh kurs dan biaya logistik; peluang arbitrase hanya efektif jika eksekusi procurement dipercepat sebelum window basis menutup.",
        type: "observation",
      },
      {
        text: "Volatilitas rute pelayaran dan lead time impor meningkatkan risiko mismatch stok pakan; satu siklus keterlambatan kapal dapat menggerus service level dan memaksa pembelian spot berbiaya tinggi.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Pembukaan akses impor unggas di beberapa pasar ASEAN memberi ruang ekspansi untuk produk olahan; pemain dengan kepastian suplai dan sertifikasi lebih cepat menangkap pangsa awal.",
        type: "opportunity",
      },
      {
        text: "Naikkan porsi kontrak multi-origin dan kunci volume pada horizon 2–3 bulan untuk menurunkan eksposur terhadap shock geopolitik serta fluktuasi basis di origin tunggal.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },

  // ─── MARKET NEWS INSIGHTS ────────────────────────────
  {
    id: "INS-market-news",
    mode: "market",
    scope: "local",
    title: "News Insights",
    items: [
      {
        text: "Sinyal cuaca ekstrem pada wilayah penghasil jagung memperbesar peluang gangguan pasokan musiman; antisipasi sekarang lebih murah daripada koreksi saat harga sudah bergerak.",
        type: "observation",
      },
      {
        text: "Narasi pelemahan daya beli di headline ekonomi berpotensi menekan sentimen belanja protein hewani menengah; risiko penurunan basket size muncul lebih dulu di kanal tradisional.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Pemulihan mobilitas dan konsumsi luar rumah memberi sinyal penguatan demand pada channel food service; ini momentum untuk mendorong SKU dengan rotasi cepat.",
        type: "opportunity",
      },
      {
        text: "Jadikan radar berita harian sebagai trigger operasional: jika 2–3 sinyal negatif muncul beruntun, aktifkan skenario proteksi margin (procurement, pricing, dan alokasi channel) dalam minggu yang sama.",
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

  // ─── DEMAND INSIGHTS — LOCAL ─────────────────────────────
  {
    id: "INS-demand-local",
    mode: "supply",
    scope: "local",
    title: "Demand Insights",
    items: [
      {
        text: "Pertumbuhan demand tidak merata: kota besar tumbuh lebih cepat dari area satelit, sehingga pola replenishment mingguan perlu dibedakan per klaster untuk mencegah stock mismatch.",
        type: "observation",
      },
      {
        text: "Risiko lost sales tertinggi muncul pada wilayah dengan fulfillment <95% selama dua minggu berturut; pola ini biasanya diikuti churn pelanggan prioritas dalam 1–2 siklus order.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Segmen HORECA dan modern trade menunjukkan potensi repeat order lebih stabil dibanding kanal tradisional, membuka ruang kontrak volume dengan visibilitas demand lebih baik.",
        type: "opportunity",
      },
      {
        text: "Terapkan demand shaping per kanal: alihkan alokasi lebih awal ke area dengan sinyal pull-through kuat, lalu lindungi SLA pelanggan tier atas saat terjadi lonjakan mendadak.",
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

  // ─── DEMAND INSIGHTS — GLOBAL ────────────────────────────
  {
    id: "INS-demand-global",
    mode: "supply",
    scope: "global",
    title: "Demand Insights",
    items: [
      {
        text: "Permintaan protein hewani Asia Tenggara tetap resilien meski volatilitas harga bahan baku tinggi; ini menciptakan kebutuhan suplai yang konsisten untuk importir regional.",
        type: "observation",
      },
      {
        text: "Pelemahan mata uang di emerging markets dapat menekan daya serap impor dalam jangka pendek, meningkatkan risiko penundaan order dan koreksi forecast demand.",
        type: "risk",
        severity: "medium",
      },
      {
        text: "Pasar yang sedang membuka akses impor unggas memberi peluang capture demand awal jika kesiapan volume dan kepastian pengiriman bisa dijaga.",
        type: "opportunity",
      },
      {
        text: "Bangun playbook demand sensing lintas negara: gabungkan sinyal harga, kurs, dan kebijakan impor untuk mempercepat keputusan alokasi volume ekspor/impor.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "medium",
  },

  // ─── SUPPLY-DEMAND NEWS INSIGHTS — LOCAL ─────────────────
  {
    id: "INS-supply-news-local",
    mode: "supply",
    scope: "local",
    title: "News Insights",
    items: [
      {
        text: "Hot news cuaca dan gangguan panen di wilayah sentra langsung berdampak ke ketersediaan bahan baku; lead indicator ini perlu diperlakukan sebagai early-warning supply.",
        type: "observation",
      },
      {
        text: "Pemberitaan tekanan harga pangan dan inflasi berpotensi mengubah pola belanja konsumen secara cepat, meningkatkan risiko forecast demand terlalu optimistis.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Berita pemulihan konsumsi luar rumah serta event musiman dapat menjadi katalis lonjakan demand jangka pendek pada SKU fast-moving.",
        type: "opportunity",
      },
      {
        text: "Gunakan news trigger harian untuk active rebalancing: saat muncul sinyal negatif beruntun, percepat pengamanan pasokan; saat sinyal demand menguat, percepat distribusi ke kanal prioritas.",
        type: "recommendation",
      },
    ],
    generatedAt: "2024-04-23T08:00:00",
    confidence: "high",
  },

  // ─── SUPPLY-DEMAND NEWS INSIGHTS — GLOBAL ────────────────
  {
    id: "INS-supply-news-global",
    mode: "supply",
    scope: "global",
    title: "News Insights",
    items: [
      {
        text: "Headline geopolitik, cuaca ekstrem, dan disrupsi pelayaran tetap menjadi pemicu utama volatilitas pasokan global dalam horizon kuartalan.",
        type: "observation",
      },
      {
        text: "Kebijakan proteksionisme pangan lintas negara dapat mengubah arus perdagangan secara mendadak, memicu risiko kekosongan pasokan pada origin yang terlalu terkonsentrasi.",
        type: "risk",
        severity: "high",
      },
      {
        text: "Berita pembukaan kuota impor atau relaksasi regulasi di pasar tujuan membuka peluang monetisasi cepat jika kesiapan volume dan sertifikasi sudah siap.",
        type: "opportunity",
      },
      {
        text: "Tetapkan dashboard hot-news global berbasis prioritas dampak untuk memicu keputusan cepat pada kontrak, jadwal pengiriman, dan alokasi volume lintas negara.",
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
