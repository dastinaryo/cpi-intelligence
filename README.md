# CPI Intelligence Dashboard (FE Mockup)

Dashboard mockup untuk simulasi **market intelligence** dan **supply chain intelligence** dengan synthetic dataset terstruktur di `src/data`.

## Tujuan Implementasi
- Menampilkan data dummy realistis pada semua komponen utama dashboard.
- Menjaga UI mockup tetap konsisten (perubahan visual minimal).
- Fokus pada wiring data, state management, dan filter mode.

## Fitur yang Sudah Diimplementasikan
- Top controls:
  - `Commodity Price`: `local` / `global`
  - `Dashboard Mode`: `market` / `supply`
- Highlight cards dinamis sesuai `scope` + `mode`.
- Competitor dropdown (`JPFA`, `MAIN`, `SIPD`) dengan nilai dan % perubahan dari dataset `stocks`.
- Map dinamis:
  - `local`: Indonesia (kab/kota overlay, nilai di-drive oleh data provinsi)
  - `global`: negara (country-level)
  - `market mode`: metrik market intelligence
  - `supply mode`: metrik supply intelligence
  - `supply perspective`: `mitra` / `pelanggan`
- Region detail/info panel:
  - `market`: harga komoditas, inflasi, risk signal, trend
  - `supply`: supply, demand, surplus/shortage, recommended source, estimasi logistics cost
- Legend dinamis sesuai konfigurasi `mode` + `scope`.
- Insight sections:
  - `Market Insights`
  - `Supply Insights`
  - `General Insights`
- AI assistant starter panel:
  - Suggested questions dari `aiQuestions`
  - Context seed sesuai filter aktif + region terpilih

## Arsitektur Data
Semua data synthetic berada di:
- `src/data/commodities.ts`
- `src/data/stocks.ts`
- `src/data/regions.ts`
- `src/data/countries.ts`
- `src/data/mitra.ts`
- `src/data/pelanggan.ts`
- `src/data/marketSignals.ts`
- `src/data/insights.ts`
- `src/data/aiQuestions.ts`
- `src/data/mapLegend.ts`

Entry point data terpusat di `src/data/index.ts`.

## State & Filter Flow
State utama berada di `src/pages/Index.tsx`:
- `commodityScope`: `local | global`
- `dashboardMode`: `market | supply`
- `supplyPerspective`: `mitra | pelanggan`
- `competitorTicker`: `JPFA | MAIN | SIPD`

State ini dipropagasi ke:
- `DashboardHeader` untuk controls, cards, competitor
- `MapPanel` dan `MapDashboard` untuk map + detail panel
- `InsightCard` untuk isi insight per mode/scope

## Komponen Utama
- `src/components/dashboard/DashboardHeader.tsx`
- `src/components/MapDashboard.tsx`
- `src/components/dashboard/MapPanel.tsx`
- `src/components/dashboard/InsightCard.tsx`
- `src/pages/Index.tsx`

## Menjalankan Project
Prerequisite:
- Node.js 18+
- npm

Install dependency:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build production:
```bash
npm run build
```

Run tests:
```bash
npm run test -- --run
```

## Claude Code (claude.ai/code)

Project ini sudah dikonfigurasi untuk digunakan di [claude.ai/code](https://claude.ai/code).

Saat sesi web dimulai, hook `.claude/hooks/session-start.sh` otomatis menjalankan `npm install` sehingga dependency langsung tersedia tanpa setup manual.

**Setup:**
1. Buka [claude.ai/code](https://claude.ai/code)
2. Connect GitHub dan pilih repo ini
3. Dependency akan terinstall otomatis saat sesi dimulai

**Push perubahan ke GitHub** — cukup minta Claude:
> "Commit dan push perubahan ini ke branch X"

## Changelog
- **2026-04-24**: Update `package-lock.json` — sinkronisasi dependency setelah `npm install` via session-start hook.

## Catatan Placeholder
- Perhitungan `recommended source` dan `estimated logistics cost` masih berbasis heuristic dataset (belum optimasi rute/logistik riil).
- AI assistant masih mock/starter behavior (menggunakan dataset QnA + context seed), belum terhubung ke model backend produksi.
- Peta masih menggunakan sumber GeoJSON remote; jika endpoint eksternal tidak tersedia, layer data peta bisa gagal dimuat.

## Prinsip Implementasi
- Perubahan seminimal mungkin pada visual.
- Tidak ada refactor besar yang tidak perlu.
- Tidak mengganti library inti.
- Wiring data diprioritaskan agar setiap toggle/mode benar-benar mengubah output.

---
_Last updated: 2026-04-24 04:51 UTC_
