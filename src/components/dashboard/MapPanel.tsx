import { useMemo, useState } from "react";
import { Bot, Send, Sparkles, Trash2, X } from "lucide-react";
import MapDashboard, { type MapSelection } from "@/components/MapDashboard";
import { cn } from "@/lib/utils";
import { aiQuestions, countries, marketSignals, mitraList, pelangganList, regions } from "@/data";
import type { CommodityScope, DashboardMode, SupplyTab } from "@/types/dashboard";

interface MapPanelProps {
  commodityScope: CommodityScope;
  dashboardMode: DashboardMode;
  supplyPerspective: SupplyTab;
  onSupplyPerspectiveChange: (tab: SupplyTab) => void;
}

const TABS: { label: string; value: SupplyTab }[] = [
  { label: "Mitra", value: "mitra" },
  { label: "Pelanggan", value: "pelanggan" },
];

const formatNumber = (value: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value);
const formatIdr = (value: number) =>
  `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value)}`;

const normalizeText = (value: string) => value.toLowerCase().trim();

const getRecommendedSource = (selection: MapSelection, perspective: SupplyTab) => {
  if (selection.scope === "local") {
    const source = regions
      .filter(
        (region) =>
          region.regionId !== selection.region?.regionId &&
          region.supply.surplusShortage > 0,
      )
      .sort((a, b) => b.supply.surplusShortage - a.supply.surplusShortage)[0];

    if (!source) return null;

    const sourceMitra = mitraList.filter(
      (item) => item.regionId === source.regionId && item.status === "aktif",
    );

    const targetDistances =
      perspective === "mitra"
        ? mitraList.filter((item) => item.regionId === selection.region?.regionId)
        : pelangganList.filter((item) => item.regionId === selection.region?.regionId);

    const avgSourceCost =
      sourceMitra.length === 0
        ? 0
        : sourceMitra.reduce((sum, item) => sum + item.logisticsCostPerKg, 0) / sourceMitra.length;

    const avgTargetDistance =
      targetDistances.length === 0
        ? 45
        : targetDistances.reduce((sum, item) => sum + item.distanceKm, 0) / targetDistances.length;

    const estimatedCost = Math.round(avgSourceCost + avgTargetDistance * 1.4);

    return {
      source: source.provinsi,
      estimatedLogisticsCost: estimatedCost,
    };
  }
  const alternative = countries
    .filter(
      (country) =>
        country.countryCode !== selection.country?.countryCode &&
        country.supply.isExporter,
    )
    .sort(
      (a, b) =>
        (b.supply.exportVolumeTon - b.supply.importVolumeTon) -
        (a.supply.exportVolumeTon - a.supply.importVolumeTon),
    )[0];

  const defaultCost =
    selection.country?.region.includes("Asia") || alternative?.region.includes("Asia")
      ? 2200
      : 3400;

  return {
    source: alternative?.countryName ?? "Brasil",
    estimatedLogisticsCost: defaultCost,
  };
};

const MapPanel = ({
  commodityScope,
  dashboardMode,
  supplyPerspective,
  onSupplyPerspectiveChange,
}: MapPanelProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState<MapSelection | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Hi! Saya AI Assistant. Gunakan suggested question untuk insight cepat berdasarkan filter dashboard saat ini.",
    },
  ]);

  const initialMessages = [
    {
      role: "ai" as const,
      text: "Hi! Saya AI Assistant. Gunakan suggested question untuk insight cepat berdasarkan filter dashboard saat ini.",
    },
  ];

  const contextSeed = useMemo(() => {
    const lines = [
      `Scope: ${commodityScope === "local" ? "Local" : "Global"}`,
      `Mode: ${dashboardMode === "market" ? "Market Intelligence" : "Supply Chain Intelligence"}`,
    ];

    if (dashboardMode === "supply") {
      lines.push(`Perspective: ${supplyPerspective === "mitra" ? "Mitra" : "Pelanggan"}`);
    }

    if (selection) {
      lines.push(`Selected Region: ${selection.name}`);
      lines.push(`${selection.metricLabel}: ${selection.metricValue.toFixed(1)}`);
    }

    return lines;
  }, [commodityScope, dashboardMode, selection, supplyPerspective]);

  const clearChat = () => setMessages(initialMessages);

  const sendMessage = (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text) return;

    const exactMatch = aiQuestions.find(
      (item) => normalizeText(item.question) === normalizeText(text),
    );

    const aiAnswer = exactMatch
      ? `${exactMatch.answer}${
          exactMatch.followUps.length > 0
            ? `\n\nFollow-up rekomendasi: ${exactMatch.followUps[0]}`
            : ""
        }`
      : `Pertanyaan diterima. Berdasarkan konteks aktif (${contextSeed.join(" | ")}), wilayah ${selection?.name ?? "terpilih"} menunjukkan ${selection?.metricLabel ?? "indikator utama"} sebesar ${selection ? selection.metricValue.toFixed(1) : "-"}. Saya bisa lanjutkan ke analisis lebih rinci per wilayah atau per komoditas.`;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: aiAnswer },
    ]);
    setInput("");
  };

  const relatedSignals = useMemo(() => {
    if (!selection) return [];

    return marketSignals
      .filter((signal) => signal.scope === "both" || signal.scope === selection.scope)
      .filter((signal) => {
        if (selection.scope === "local") {
          return (
            signal.affectedRegions.includes(selection.id) ||
            signal.affectedRegions.length === 0
          );
        }

        return (
          signal.affectedRegions.includes(selection.id) ||
          signal.affectedRegions.length === 0
        );
      })
      .slice(0, 2);
  }, [selection]);

  const recommendedSource = useMemo(
    () => (selection ? getRecommendedSource(selection, supplyPerspective) : null),
    [selection, supplyPerspective],
  );

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <MapDashboard
        scope={commodityScope}
        mode={dashboardMode}
        supplyPerspective={supplyPerspective}
        onRegionSelect={setSelection}
      />

      {dashboardMode === "supply" && (
        <div className="pointer-events-none absolute left-16 top-4 z-10 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSupplyPerspectiveChange(tab.value)}
              className={cn(
                "pointer-events-auto rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors",
                supplyPerspective === tab.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/95 text-foreground hover:bg-accent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {selection && (
        <div className="pointer-events-none absolute left-4 top-20 bottom-[19rem] z-20 w-[260px] max-w-[calc(100%-2rem)]">
          <div className="pointer-events-auto flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur">
            <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selection.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selection.metricLabel}: {selection.metricValue.toFixed(1)}
                </p>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                {dashboardMode === "market" ? "Market" : `Supply • ${supplyPerspective === "mitra" ? "Mitra" : "Pelanggan"}`}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {dashboardMode === "market" ? (
              <div className="space-y-1.5 text-xs text-foreground/90">
                {selection.region ? (
                  <>
                    <p>Harga Jagung: {formatIdr(selection.region.market.avgCornPrice)} /kg</p>
                    <p>Harga Ayam: {formatIdr(selection.region.market.avgChickenPrice)} /kg</p>
                    <p>Harga Telur: {formatIdr(selection.region.market.avgEggPrice)} /kg</p>
                    <p>Inflasi: {selection.region.market.inflationRate.toFixed(1)}%</p>
                    <p>Risk Signal: {selection.region.market.riskSignal.toUpperCase()}</p>
                    <p>Trend: {selection.region.market.demandTrend}</p>
                  </>
                ) : selection.country ? (
                  <>
                    <p>Corn Price Index: {selection.country.market.cornPriceIndex}</p>
                    <p>Inflasi: {selection.country.market.inflationRate.toFixed(1)}%</p>
                    <p>Market Risk: {selection.country.market.marketRisk}</p>
                    <p>Trade Balance: {selection.country.market.tradeBalance}</p>
                    <p>Commodity Import: USD {formatNumber(selection.country.market.commodityImportUSD)} juta</p>
                    <p>Trend: Market index {selection.country.market.marketIndex}</p>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="space-y-1.5 text-xs text-foreground/90">
                {selection.region ? (
                  <>
                    <p>Supply: {formatNumber(selection.region.supply.suppliesVolumeTon)} ton</p>
                    <p>Demand: {formatNumber(selection.region.supply.salesVolumeTon)} ton</p>
                    <p>
                      {selection.region.supply.surplusShortage >= 0 ? "Surplus" : "Shortage"}: {selection.region.supply.surplusShortage >= 0 ? "+" : ""}
                      {formatNumber(selection.region.supply.surplusShortage)} ton
                    </p>
                    <p>
                      Recommended Source: {recommendedSource?.source ?? "Belum tersedia"}
                    </p>
                    <p>
                      Est. Logistics Cost: {recommendedSource ? formatIdr(recommendedSource.estimatedLogisticsCost) : "-"} /kg
                    </p>
                  </>
                ) : selection.country ? (
                  <>
                    <p>Supply Index: {selection.country.supply.supplyIndex}</p>
                    <p>
                      Demand Proxy: {selection.country.market.cornPriceIndex}
                    </p>
                    <p>
                      {selection.country.supply.exportVolumeTon >= selection.country.supply.importVolumeTon ? "Surplus" : "Shortage"}: {selection.country.supply.exportVolumeTon >= selection.country.supply.importVolumeTon ? "+" : ""}
                      {formatNumber(selection.country.supply.exportVolumeTon - selection.country.supply.importVolumeTon)} ton
                    </p>
                    <p>
                      Recommended Source: {recommendedSource?.source ?? "Belum tersedia"}
                    </p>
                    <p>
                      Est. Logistics Cost: {recommendedSource ? formatIdr(recommendedSource.estimatedLogisticsCost) : "-"} /kg
                    </p>
                  </>
                ) : null}
              </div>
            )}

            {relatedSignals.length > 0 && (
              <div className="border-t border-border pt-2">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Risk Signals
                </p>
                <ul className="space-y-1">
                  {relatedSignals.map((signal) => (
                    <li key={signal.id} className="text-[11px] text-foreground/85">
                      {signal.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute right-4 top-4 z-30">
        <button
          type="button"
          onClick={() => setChatOpen((value) => !value)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur hover:bg-accent"
        >
          <Bot className="h-3.5 w-3.5 text-primary" />
          AI Assistant
        </button>
      </div>

      {chatOpen && (
        <div className="pointer-events-auto absolute bottom-4 right-4 top-16 z-30 flex w-[340px] max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-foreground">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Clear chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-xs leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-border p-2"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tanyakan sesuatu…"
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MapPanel;
