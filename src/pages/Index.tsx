import { useCallback, useMemo, useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, SidebarTrigger } from "@/components/layout/AppSidebar";
import KpiRow from "@/components/dashboard/KpiRow";
import MapDashboard, { type MapSelection } from "@/components/MapDashboard";
import NetworkInsights from "@/components/dashboard/NetworkInsights";
import RegionDetailPanel from "@/components/dashboard/RegionDetailPanel";
import { insights, regions, supplyNodes, supplyRoutes } from "@/data";
import { cn } from "@/lib/utils";
import type {
  CommodityScope,
  DashboardMode,
  KpiMetric,
  NetworkInsightGroup,
  SupplyNode,
  SupplyTab,
} from "@/types/dashboard";

const scopeOptions: { label: string; value: CommodityScope }[] = [
  { label: "Local", value: "local" },
  { label: "Global", value: "global" },
];

const modeOptions: { label: string; value: DashboardMode }[] = [
  { label: "Market", value: "market" },
  { label: "Supply", value: "supply" },
];

function ModeChip<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  const activeLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground hover:border-foreground/30"
        >
          <span className="text-muted-foreground">{label}:</span>
          <span className="font-semibold">{activeLabel}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[8rem]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            className={cn(
              "text-xs",
              option.value === value && "bg-accent font-semibold",
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const buildSupplyKpis = (): KpiMetric[] => {
  const feedmills = supplyNodes.filter((n) => n.type === "feedmill");
  const farms = supplyNodes.filter((n) => n.type === "farm");

  const feedmillUtil =
    feedmills.reduce((sum, n) => sum + n.utilization, 0) / Math.max(feedmills.length, 1);
  const farmUtil =
    farms.reduce((sum, n) => sum + n.utilization, 0) / Math.max(farms.length, 1);
  const totalStock = supplyNodes.reduce((sum, n) => sum + n.stockLevelTon, 0);
  const activeRoutes = supplyRoutes.length;
  const criticalRoutes = supplyRoutes.filter((r) => r.status === "critical").length;
  const delayedRoutes = supplyRoutes.filter((r) => r.status === "delayed").length;
  const bottlenecks = supplyNodes.filter((n) => n.status === "bottleneck").length;
  const highs = supplyNodes.filter((n) => n.status === "high").length;

  const feedmillTone: KpiMetric["tone"] =
    feedmillUtil >= 92 ? "critical" : feedmillUtil >= 78 ? "warning" : "neutral";
  const farmTone: KpiMetric["tone"] =
    farmUtil >= 92 ? "critical" : farmUtil >= 78 ? "warning" : "neutral";

  return [
    {
      id: "feedmill-util",
      label: "Feedmill Utilization",
      value: feedmillUtil.toFixed(1),
      unit: "%",
      delta: 2.4,
      deltaLabel: "vs last week",
      tone: feedmillTone,
    },
    {
      id: "farm-capacity",
      label: "Farm Capacity Usage",
      value: farmUtil.toFixed(1),
      unit: "%",
      delta: -1.2,
      deltaLabel: "vs last week",
      tone: farmTone,
    },
    {
      id: "stock-level",
      label: "Stock Level",
      value: new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(totalStock),
      unit: "ton",
      delta: 0.8,
      deltaLabel: "vs last week",
      tone: "neutral",
    },
    {
      id: "active-routes",
      label: "Active Distribution Routes",
      value: String(activeRoutes),
      helper: `${delayedRoutes} delayed · ${criticalRoutes} critical`,
      tone: criticalRoutes > 0 ? "critical" : delayedRoutes > 0 ? "warning" : "neutral",
    },
    {
      id: "bottleneck-alerts",
      label: "Bottleneck Alerts",
      value: String(bottlenecks + highs),
      helper: `${bottlenecks} bottleneck · ${highs} high`,
      tone: bottlenecks > 0 ? "critical" : highs > 0 ? "warning" : "neutral",
    },
  ];
};

const buildMarketKpis = (scope: CommodityScope): KpiMetric[] => {
  const avgCornPrice =
    regions.reduce((sum, r) => sum + r.market.avgCornPrice, 0) / regions.length;
  const avgChicken =
    regions.reduce((sum, r) => sum + r.market.avgChickenPrice, 0) / regions.length;
  const avgInflation =
    regions.reduce((sum, r) => sum + r.market.inflationRate, 0) / regions.length;
  const marketIndex =
    regions.reduce((sum, r) => sum + r.market.marketIndex, 0) / regions.length;
  const redRegions = regions.filter((r) => r.market.riskSignal === "red").length;
  const yellowRegions = regions.filter((r) => r.market.riskSignal === "yellow").length;

  const inflationTone: KpiMetric["tone"] =
    avgInflation >= 4 ? "critical" : avgInflation >= 3 ? "warning" : "neutral";

  return [
    {
      id: "feedmill-util",
      label: "Corn Price (avg)",
      value: `Rp ${new Intl.NumberFormat("id-ID").format(Math.round(avgCornPrice))}`,
      unit: "/kg",
      delta: 1.8,
      deltaLabel: "MoM",
      tone: "neutral",
    },
    {
      id: "farm-capacity",
      label: "Chicken Price (avg)",
      value: `Rp ${new Intl.NumberFormat("id-ID").format(Math.round(avgChicken))}`,
      unit: "/kg",
      delta: 0.6,
      deltaLabel: "MoM",
      tone: "neutral",
    },
    {
      id: "stock-level",
      label: "Market Index",
      value: marketIndex.toFixed(1),
      delta: -0.3,
      deltaLabel: "vs prev",
      tone: "neutral",
    },
    {
      id: "active-routes",
      label: "Inflation (avg)",
      value: avgInflation.toFixed(2),
      unit: "%",
      deltaLabel: scope === "local" ? "33 provinsi" : "global",
      tone: inflationTone,
    },
    {
      id: "bottleneck-alerts",
      label: "Risk Signals",
      value: String(redRegions + yellowRegions),
      helper: `${redRegions} red · ${yellowRegions} yellow`,
      tone: redRegions > 0 ? "critical" : yellowRegions > 0 ? "warning" : "neutral",
    },
  ];
};

const buildNetworkInsights = (): NetworkInsightGroup[] => {
  const bottlenecks = supplyNodes.filter((n) => n.status === "bottleneck");
  const highs = supplyNodes.filter((n) => n.status === "high");
  const criticalRoutes = supplyRoutes.filter((r) => r.status === "critical");
  const delayedRoutes = supplyRoutes.filter((r) => r.status === "delayed");
  const lowStock = supplyNodes.filter((n) => n.stockCoverDays < 3);

  const nodeById = new Map(supplyNodes.map((n) => [n.id, n]));

  return [
    {
      category: "supply",
      title: "Supply insights",
      items: [
        {
          type: "risk",
          text: `${bottlenecks.length} feedmill/farm jalan di atas 92% kapasitas — risiko stockout dalam 5–7 hari.`,
        },
        ...bottlenecks.slice(0, 2).map((n) => ({
          type: "observation" as const,
          text: `${n.name} (${n.city}) utilisasi ${n.utilization}% · stock cover ${n.stockCoverDays.toFixed(1)} hari.`,
          nodeId: n.id,
        })),
        {
          type: "opportunity",
          text: `${highs.length} node di zona high-utilization siap menyerap realokasi dari mitra surplus.`,
        },
        {
          type: "recommendation",
          text: "Geser 8–12% alokasi pakan dari Gresik ke Cakung untuk meratakan beban produksi.",
        },
      ],
    },
    {
      category: "logistics",
      title: "Logistics insights",
      items: [
        {
          type: "observation",
          text: `${supplyRoutes.length} rute distribusi aktif, rata-rata biaya logistik Rp ${(
            supplyRoutes.reduce((s, r) => s + r.costPerKg, 0) / supplyRoutes.length
          ).toFixed(2)}/kg.`,
        },
        ...delayedRoutes.slice(0, 2).map((r) => {
          const from = nodeById.get(r.fromNodeId);
          const to = nodeById.get(r.toNodeId);
          return {
            type: "risk" as const,
            text: `Rute ${from?.city} → ${to?.city} (${r.modality}) delayed — lead time naik ${r.leadTimeDays} hari.`,
          };
        }),
        {
          type: "recommendation",
          text: "Konsolidasi 2 rute truk paralel Jawa Barat → Jakarta bisa hemat 14% ongkos angkut.",
        },
        {
          type: "opportunity",
          text: "Multi-modal truck→ship untuk rute Lampung efektif menurunkan lead time 0.8 hari.",
        },
      ],
    },
    {
      category: "risk",
      title: "Risk alerts",
      items: [
        ...(criticalRoutes.length > 0
          ? criticalRoutes.slice(0, 2).map((r) => {
              const from = nodeById.get(r.fromNodeId);
              const to = nodeById.get(r.toNodeId);
              return {
                type: "risk" as const,
                text: `CRITICAL: rute ${from?.city} → ${to?.city} — volume ${r.volumeTonPerWeek} ton/wk terganggu.`,
              };
            })
          : []),
        ...lowStock.slice(0, 2).map((n) => ({
          type: "risk" as const,
          text: `${n.name}: stock cover ${n.stockCoverDays.toFixed(1)} hari (ambang aman 3+).`,
          nodeId: n.id,
        })),
        {
          type: "observation",
          text: "2 provinsi dengan risk signal merah: Sumatera Utara, Jawa Timur.",
        },
        {
          type: "recommendation",
          text: "Aktifkan kontrak darurat pakan untuk wilayah Sumatera Utara sebelum minggu ke-3.",
        },
      ],
    },
  ];
};

const Index = () => {
  const [commodityScope, setCommodityScope] = useState<CommodityScope>("local");
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>("supply");
  const [supplyPerspective] = useState<SupplyTab>("mitra");
  const [selection, setSelection] = useState<MapSelection | null>(null);
  const [selectedNode, setSelectedNode] = useState<SupplyNode | null>(null);

  const kpis = useMemo(
    () => (dashboardMode === "supply" ? buildSupplyKpis() : buildMarketKpis(commodityScope)),
    [dashboardMode, commodityScope],
  );

  const networkInsights = useMemo(() => buildNetworkInsights(), []);

  const marketInsights = useMemo(() => {
    const market = insights.find(
      (item) =>
        item.title === "Market Insights" &&
        item.scope === commodityScope &&
        item.mode === "market",
    );
    const general = insights.find(
      (item) =>
        item.title === "General Insights" &&
        item.scope === commodityScope &&
        item.mode === "market",
    );
    const supply = insights.find(
      (item) =>
        item.title === "Supply Insights" &&
        item.scope === commodityScope &&
        item.mode === "supply",
    );
    const map = (i: typeof market): NetworkInsightGroup["items"] =>
      (i?.items ?? []).map((x) => ({ type: x.type, text: x.text }));

    const groups: NetworkInsightGroup[] = [
      { category: "supply", title: "Supply insights", items: map(supply) },
      { category: "logistics", title: "Market insights", items: map(market) },
      { category: "risk", title: "General insights", items: map(general) },
    ];
    return groups;
  }, [commodityScope]);

  const handleRegionSelect = useCallback((next: MapSelection) => {
    setSelection(next);
    setSelectedNode(null);
  }, []);

  const handleNodeSelect = useCallback((node: SupplyNode) => {
    setSelectedNode(node);
  }, []);

  const showDetailPanel = dashboardMode === "supply" && commodityScope === "local" && selection?.region;
  const bottomInsights = dashboardMode === "supply" ? networkInsights : marketInsights;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col bg-background">
          {/* Top bar */}
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-card px-3 sm:px-4">
            <SidebarTrigger className="-ml-1 h-7 w-7" />
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <ModeChip
                label="Mode"
                value={dashboardMode}
                options={modeOptions}
                onChange={setDashboardMode}
              />
              <ModeChip
                label="Scope"
                value={commodityScope}
                options={scopeOptions}
                onChange={setCommodityScope}
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search nodes, routes, regions…"
                  className="h-8 w-64 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-3.5 w-3.5" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-status-critical" />
              </button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">
            {/* KPI row */}
            <KpiRow metrics={kpis} />

            {/* Map + left detail panel */}
            <section className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[280px_1fr]">
              {showDetailPanel && selection?.region ? (
                <div className="min-h-0 lg:row-span-1">
                  <RegionDetailPanel
                    region={selection.region}
                    nodes={supplyNodes}
                    onClose={() => setSelection(null)}
                  />
                </div>
              ) : (
                <aside className="hidden min-h-0 flex-col gap-3 lg:flex">
                  <div className="flex flex-1 flex-col rounded-lg border border-dashed border-border bg-card/50 p-4">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Region detail
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Klik salah satu provinsi di peta untuk melihat kapasitas, stok, mitra aktif,
                      incoming supply, dan risk signals.
                    </p>
                    {selectedNode && (
                      <div className="mt-4 space-y-1.5 rounded-md border border-border bg-card p-3">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Selected node
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {selectedNode.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {selectedNode.type} · {selectedNode.city}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span
                            className={cn(
                              "inline-block h-2 w-2 rounded-full",
                              selectedNode.status === "normal" && "bg-status-normal",
                              selectedNode.status === "high" && "bg-status-high",
                              selectedNode.status === "bottleneck" && "bg-status-critical",
                            )}
                          />
                          <span className="text-[11px] tabular-nums text-foreground/80">
                            {selectedNode.utilization}% utilization
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
              )}

              <div className="min-h-[360px]">
                <MapDashboard
                  scope={commodityScope}
                  mode={dashboardMode}
                  supplyPerspective={supplyPerspective}
                  onRegionSelect={handleRegionSelect}
                  onNodeSelect={handleNodeSelect}
                />
              </div>
            </section>

            {/* Bottom insights */}
            <section className="shrink-0">
              <NetworkInsights groups={bottomInsights} />
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
