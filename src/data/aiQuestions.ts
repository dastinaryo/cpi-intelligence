import type { AIQuestion } from "@/types/dashboard";
 
export const aiQuestions: AIQuestion[] = [
  // ─── SUPPLY — LOCAL ─────────────────────────────────────
  {
    id: "QNA-001",
    question: "Provinsi mana yang paling berisiko kekurangan pasokan bulan ini?",
    category: "supply",
    relevantScope: "local",
    answer: "Berdasarkan data supply chain saat ini, DKI Jakarta (-890 ton), Jawa Barat (-320 ton), dan Bali (-350 ton) mengalami defisit terbesar. Kalimantan Timur juga perlu perhatian dengan shortage -280 ton yang tumbuh cepat akibat proyek IKN. Mitra di wilayah defisit rata-rata beroperasi di 80–88% kapasitas, sehingga ruang peningkatan alokasi terbatas dari dalam wilayah. Rekomendasi prioritas: realokasi dari Lampung (surplus +610 ton) dan Sulawesi Selatan (surplus +410 ton).",
    followUps: [
      "Berapa estimasi biaya logistik realokasi dari Lampung ke Jawa Barat?",
      "Mitra mana di Lampung yang memiliki kapasitas idle terbesar?",
      "Apa forecast demand DKI Jakarta untuk bulan depan?",
    ],
    relatedSignalIds: ["SIG-001", "SIG-009"],
  },
  {
    id: "QNA-002",
    question: "Mitra mana yang perlu dievaluasi kinerjanya?",
    category: "supply",
    relevantScope: "local",
    answer: "Ada 2 mitra yang saat ini berstatus 'probation' dan memerlukan perhatian segera: (1) UD Berkah Ternak Subang (MTR-005) di Jawa Barat — reliability score 72, on-time delivery 75%, sedang dalam evaluasi kualitas selama 2 bulan terakhir. (2) CV Berkah Unggas Siantar (MTR-019) di Sumatera Utara — reliability score 68, utilisasi hanya 64%, ada masalah konsistensi berat panen. Keduanya perlu program coaching atau pertimbangan terminasi kontrak jika tidak ada perbaikan dalam 60 hari.",
    followUps: [
      "Apa opsi pengganti mitra di Subang dan Siantar?",
      "Berapa kapasitas total yang akan hilang jika kedua mitra ini diputus?",
      "Program coaching apa yang efektif untuk mitra plasma?",
    ],
    relatedSignalIds: [],
  },
  {
    id: "QNA-003",
    question: "Berapa total kapasitas mitra yang tersedia secara nasional?",
    category: "supply",
    relevantScope: "local",
    answer: "Total kapasitas semua mitra aktif secara nasional adalah sekitar 3.850 ton/bulan, dengan alokasi aktual saat ini 3.218 ton/bulan (utilisasi rata-rata 83.6%). Kapasitas idle tersisa sekitar 632 ton/bulan. Distribusi kapasitas terbesar ada di Jawa Timur (515 ton/bulan dari 3 mitra utama), diikuti Lampung (455 ton/bulan) dan Sulawesi Selatan (400 ton/bulan). Kapasitas terkecil ada di Papua (0 ton — belum ada mitra lokal) dan Kalimantan Utara.",
    followUps: [
      "Provinsi mana yang memerlukan penambahan mitra baru?",
      "Berapa investasi yang dibutuhkan untuk menambah kapasitas 500 ton/bulan?",
      "Mitra mana yang paling efisien secara biaya per kg?",
    ],
    relatedSignalIds: [],
  },
  {
    id: "QNA-004",
    question: "Pelanggan mana yang memiliki potensi upselling tertinggi?",
    category: "supply",
    relevantScope: "local",
    answer: "Pelanggan dengan potensi upselling tertinggi berdasarkan kombinasi tren permintaan dan headroom dari credit limit: (1) Katering Proyek IKN (PLG-033) — forecast naik 20% MoM, masih jauh dari credit limit. (2) Four Seasons Bali (PLG-024) — high season Q3 memungkinkan peningkatan 15–20%. (3) McDonald's Indonesia (PLG-006) — kapasitas bisnis besar, fulfillment rate sudah 96.5%, bisa negosiasi volume commitment. Pelanggan industri PT Sriboga dan PT Indofood juga menunjukkan tren stabil dengan forecast yang tumbuh.",
    followUps: [
      "Apa strategi pricing yang tepat untuk pelanggan platinum?",
      "Bagaimana credit exposure total untuk pelanggan tier platinum saat ini?",
      "Berapa ROI dari penambahan armada distribusi ke Bali untuk peak season?",
    ],
    relatedSignalIds: ["SIG-009", "SIG-010"],
  },
 
  // ─── MARKET — LOCAL ─────────────────────────────────────
  {
    id: "QNA-005",
    question: "Mengapa harga ayam di Bali lebih tinggi dari rata-rata nasional?",
    category: "market",
    relevantScope: "local",
    answer: "Harga ayam di Bali (Rp 34.400/kg) lebih tinggi dari rata-rata nasional (Rp 32.150/kg) karena tiga faktor utama: (1) Biaya logistik penyeberangan Jawa–Bali menambah Rp 180–260/kg. (2) Demand HORECA yang sangat tinggi dari sektor pariwisata — 74 pelanggan aktif dengan demand tumbuh 9.1% YoY. (3) Kapasitas mitra lokal terbatas hanya 2 mitra dengan total kapasitas 95 ton/bulan, jauh di bawah kebutuhan 1.130+ ton/bulan. Solusi: tambah hub distribusi di Bali Utara dan jalin mitra baru di Karangasem.",
    followUps: [
      "Berapa harga pokok distribusi optimal untuk rute Jawa–Bali?",
      "Adakah potensi membangun cold storage di Bali untuk buffer stock?",
      "Kapan peak demand HORECA Bali terjadi dalam setahun?",
    ],
    relatedSignalIds: ["SIG-010"],
  },
  {
    id: "QNA-006",
    question: "Apa dampak El Niño terhadap produksi jagung nasional?",
    category: "market",
    relevantScope: "local",
    answer: "Berdasarkan proyeksi BMKG, El Niño yang memuncak Juli–September 2024 berpotensi menurunkan produksi jagung nasional 12–18%. Provinsi paling terdampak adalah Jawa Timur, Jawa Tengah, Sulawesi Selatan, dan Lampung — yang secara total menyumbang sekitar 65% produksi jagung nasional. Dampak estimasi: kenaikan harga jagung lokal Rp 400–700/kg pada Q3 2024, atau sekitar 7–13% di atas harga saat ini. Rekomendasi: build up stok jagung sebelum Juni 2024 dan review kontrak pakan untuk klausul force majeure.",
    followUps: [
      "Berapa buffer stock jagung yang ideal untuk antisipasi El Niño?",
      "Apakah ada opsi impor jagung darurat jika terjadi gagal panen?",
      "Provinsi mana yang produksinya paling stabil meskipun terjadi El Niño?",
    ],
    relatedSignalIds: ["SIG-001", "SIG-003"],
  },
  {
    id: "QNA-007",
    question: "Bagaimana performa saham CPIN dibanding kompetitor?",
    category: "market",
    relevantScope: "both",
    answer: "CPIN diperdagangkan di P/E 14.2x dengan market cap Rp 80.3 triliun — jauh melampaui kompetitor: JPFA (P/E 10.8x, Rp 18.7T), MAIN (P/E 8.4x, Rp 3.1T), dan SIPD (P/E 6.9x, Rp 0.8T). Dalam 12 bulan terakhir, CPIN turun 6.2% (dari Rp 5.200), JPFA naik 9.5%, MAIN turun 8.7%, SIPD naik 14.8%. JPFA menjadi relative outperformer. Premium valuasi CPIN mencerminkan posisi market leader dan diversifikasi bisnis yang lebih kuat, namun tekanan margin pakan bisa menekan profitabilitas jangka pendek.",
    followUps: [
      "Apa trigger yang bisa mendorong re-rating valusi CPIN ke atas?",
      "Bagaimana komposisi revenue CPIN vs JPFA?",
      "Kapan jadwal rilis laporan keuangan Q1 2024 CPI?",
    ],
    relatedSignalIds: [],
  },
 
  // ─── MARKET — GLOBAL ────────────────────────────────────
  {
    id: "QNA-008",
    question: "Negara mana yang menjadi sumber impor jagung terpenting Indonesia?",
    category: "market",
    relevantScope: "global",
    answer: "Indonesia mengimpor jagung dari beberapa sumber utama: (1) Brasil — eksportir jagung terbesar dunia, surplus 56 juta ton, menjadi mitra strategis jangka panjang. (2) Amerika Serikat — 62 juta ton ekspor/tahun via CBOT, harga transparan dan terprediksi. (3) Ukraina — sebelum konflik mengirim 28 juta ton/tahun, kini terganggu. (4) Argentina — 42 juta ton ekspor tapi sedang menghadapi krisis ekonomi (inflasi 160%). Rekomendasi: diversifikasi dengan meningkatkan porsi Brasil dan pertimbangkan Kazakhstan (8.4 juta ton/tahun) sebagai sumber alternatif.",
    followUps: [
      "Berapa harga jagung FOB Brasil vs FOB CBOT saat ini?",
      "Apa persyaratan fitosanitary impor jagung Brasil ke Indonesia?",
      "Apakah Kazakhstan memiliki standar kualitas yang sesuai untuk pakan ternak?",
    ],
    relatedSignalIds: ["SIG-003", "SIG-007", "SIG-017"],
  },
  {
    id: "QNA-009",
    question: "Bagaimana konflik Ukraina mempengaruhi harga pakan ternak global?",
    category: "market",
    relevantScope: "global",
    answer: "Konflik Ukraina yang berlangsung sejak 2022 telah mengurangi ekspor jagung dan gandum dari kawasan Laut Hitam secara signifikan. Ukraina biasanya mengekspor 28 juta ton jagung/tahun, setara 10% pasokan global. Dampak: (1) Harga jagung CBOT sempat naik 40% di puncak konflik 2022. (2) Meski sudah turun 22% YTD 2024, volatilitas tetap tinggi. (3) Biaya asuransi kargo meningkat untuk rute Laut Hitam. (4) Rusia (45 juta ton gandum/tahun) juga memberlakukan restriksi ekspor. Proyeksi: ketidakpastian harga berlanjut selama konflik belum ada resolusi.",
    followUps: [
      "Apa alternatif rute impor jagung yang lebih aman dari sisi geopolitik?",
      "Apakah ada instrumen hedging harga jagung yang tersedia di Indonesia?",
      "Bagaimana Thailand dan Vietnam mengelola risiko impor bahan baku pakan mereka?",
    ],
    relatedSignalIds: ["SIG-017", "SIG-003", "SIG-007"],
  },
 
  // ─── GENERAL ────────────────────────────────────────────
  {
    id: "QNA-010",
    question: "Apa tren konsumsi ayam di Indonesia dalam 5 tahun ke depan?",
    category: "general",
    relevantScope: "both",
    answer: "Proyeksi konsumsi ayam di Indonesia menunjukkan pertumbuhan positif dengan beberapa driver utama: (1) Pertumbuhan kelas menengah: BPS memproyeksikan kelas menengah Indonesia tumbuh dari 52 juta menjadi 80 juta orang pada 2030. (2) Urbanisasi: perpindahan ke kota meningkatkan konsumsi daging ayam 2–3x vs konsumsi pedesaan. (3) Penetrasi QSR (Quick Service Restaurant): McDonald's, KFC, dan chain lokal terus ekspansi ke kota tier-2 dan tier-3. (4) Harga kompetitif: ayam tetap protein termurah vs daging sapi dan babi. Proyeksi FAO: konsumsi per kapita naik dari 12 kg/tahun (2024) ke 15–17 kg/tahun pada 2030.",
    followUps: [
      "Segmen mana (HORECA, retail, industri) yang akan tumbuh paling cepat?",
      "Apa implikasi pertumbuhan ini terhadap kebutuhan kapasitas produksi CPI?",
      "Bagaimana strategi CPI dalam menjangkau pasar kota tier-2 dan tier-3?",
    ],
    relatedSignalIds: ["SIG-014"],
  },
  {
    id: "QNA-011",
    question: "Apa risiko terbesar CPI dalam 12 bulan ke depan?",
    category: "general",
    relevantScope: "both",
    answer: "Berdasarkan analisis sinyal pasar aktif, 5 risiko terbesar CPI dalam 12 bulan ke depan adalah: (1) El Niño — potensi gagal panen jagung nasional 12–18%, menaikkan biaya pakan. (2) Pelemahan Rupiah — USD/IDR di 16.200 meningkatkan biaya impor bahan baku ~Rp 200/kg. (3) Wabah HPAI H5N1 — alert di Jawa Barat dan Jawa Tengah, potensi culling massal. (4) Shortage supply di wilayah demand tinggi (Jakarta, Bali, Kaltim). (5) Tekanan margin dari mitra berperforma rendah yang dapat mengganggu rantai pasokan. Prioritas mitigasi: hedging komoditas + biosecurity + realokasi stok.",
    followUps: [
      "Berapa potensi dampak finansial dari setiap risiko tersebut?",
      "Apa rencana kontingensi CPI jika terjadi wabah flu burung skala nasional?",
      "Bagaimana posisi likuiditas CPI dalam menghadapi tekanan biaya?",
    ],
    relatedSignalIds: ["SIG-001", "SIG-006", "SIG-012", "SIG-017"],
  },
  {
    id: "QNA-012",
    question: "Bagaimana posisi CPI dibanding kompetitor dalam hal market share?",
    category: "general",
    relevantScope: "local",
    answer: "CPI (CPIN) memimpin pasar unggas terintegrasi Indonesia dengan estimasi market share: (1) Pakan ternak: ~28% market share nasional. (2) Day Old Chick (DOC): ~35% market share. (3) Ayam olahan: ~25% dari total penjualan poultry nasional. JPFA menempati posisi kedua dengan market share sekitar 15–18% di semua segmen. MAIN dan SIPD bersama-sama sekitar 12%. Sisanya adalah pemain regional dan peternak mandiri. Keunggulan kompetitif CPI: integrasi vertikal penuh (dari pakan → DOC → farm → prosesing → distribusi), jaringan kandang plasma terluas, dan brand recognition tinggi di kalangan peternak.",
    followUps: [
      "Di segmen mana JPFA paling agresif dalam mengambil market share?",
      "Apa strategi CPI untuk mempertahankan dominasi di pasar DOC?",
      "Bagaimana tren konsolidasi industri poultry nasional dalam 3 tahun terakhir?",
    ],
    relatedSignalIds: [],
  },
 
  // ─── REGIONAL ───────────────────────────────────────────
  {
    id: "QNA-013",
    question: "Kenapa harga komoditas di Papua jauh lebih tinggi?",
    category: "regional",
    relevantScope: "local",
    answer: "Harga komoditas di Papua (ayam Rp 39.800/kg, telur Rp 34.900/kg) adalah yang tertinggi secara nasional, 18–24% di atas rata-rata. Penyebab utama: (1) Tidak ada produksi lokal — Papua bergantung 100% pada pasokan dari luar. (2) Distribusi via udara untuk banyak daerah — biaya kargo udara 5–8x lebih mahal dari jalur darat. (3) Infrastruktur darat sangat terbatas di luar Jayapura. (4) Inflasi lokal 5.1% — tertinggi nasional. Hanya 4 mitra aktif dengan kapasitas total hampir nol. Rekomendasi jangka pendek: optimalkan rute pengiriman laut via Makassar–Jayapura.",
    followUps: [
      "Berapa biaya operasional vs margin yang tersisa untuk distribusi ke Papua?",
      "Apakah ada program pemerintah yang bisa mendukung pengembangan poultry lokal di Papua?",
      "Bagaimana strategi distribusi optimal untuk wilayah 3T (Tertinggal, Terdepan, Terluar)?",
    ],
    relatedSignalIds: [],
  },
  {
    id: "QNA-014",
    question: "Wilayah mana yang memiliki potensi pertumbuhan tertinggi?",
    category: "regional",
    relevantScope: "local",
    answer: "Tiga wilayah dengan potensi pertumbuhan tertinggi berdasarkan kombinasi tren demand, infrastruktur, dan gap supply: (1) Kalimantan Timur — YoY growth 11.4%, didorong IKN. Namun masih kekurangan mitra dan pelanggan. (2) Bali — YoY growth 9.1% dari pariwisata yang pulih, peak season Q3–Q4 setiap tahun. (3) DKI Jakarta — growth 8.2% dengan base terbesar, demand HORECA dan industri sangat dalam. Di luar Jawa-Bali, Sulawesi Selatan menarik sebagai hub ekspansi ke Kawasan Timur Indonesia karena surplus supply dan infrastruktur logistik yang berkembang.",
    followUps: [
      "Berapa investasi yang dibutuhkan untuk membuka hub distribusi baru di Kalimantan Timur?",
      "Apa regulasi khusus yang perlu diperhatikan untuk ekspansi ke Kalimantan Timur (kawasan IKN)?",
      "Kapan waktu terbaik untuk menambah kapasitas distribusi Bali menjelang peak season?",
    ],
    relatedSignalIds: ["SIG-009", "SIG-010"],
  },
];