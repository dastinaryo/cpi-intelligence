import { useMemo, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";
import { insights } from "@/data";
import type { CommodityScope, DashboardMode, StockTicker, SupplyTab } from "@/types/dashboard";

const Index = () => {
  const [commodityScope, setCommodityScope] = useState<CommodityScope>("local");
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>("market");
  const [supplyPerspective, setSupplyPerspective] = useState<SupplyTab>("mitra");
  const [competitorTicker, setCompetitorTicker] = useState<StockTicker>("JPFA");

  const insightMap = useMemo(() => {
    const market = insights.find(
      (item) =>
        item.title === "Market Insights" &&
        item.scope === commodityScope &&
        item.mode === "market",
    );
    const supply = insights.find(
      (item) =>
        item.title === "Supply Insights" &&
        item.scope === commodityScope &&
        item.mode === "supply",
    );
    const general = insights.find(
      (item) =>
        item.title === "General Insights" &&
        item.scope === commodityScope &&
        item.mode === dashboardMode,
    );
    return { market, supply, general };
  }, [commodityScope, dashboardMode]);

  return (
    <main className="flex h-screen flex-col gap-4 bg-background p-4 sm:p-6">
      <DashboardHeader
        commodityScope={commodityScope}
        dashboardMode={dashboardMode}
        supplyPerspective={supplyPerspective}
        competitorTicker={competitorTicker}
        onCommodityScopeChange={setCommodityScope}
        onDashboardModeChange={setDashboardMode}
        onCompetitorChange={setCompetitorTicker}
      />

      <section className="relative min-h-0 flex-1">
        <MapPanel
          commodityScope={commodityScope}
          dashboardMode={dashboardMode}
          supplyPerspective={supplyPerspective}
          onSupplyPerspectiveChange={setSupplyPerspective}
        />

        {/* Floating insight bar — bottom, horizontally scrollable, height matches legend */}
        <div className="pointer-events-none absolute bottom-4 left-[22rem] right-4 z-20 h-[60px]">
          <div className="pointer-events-auto h-full overflow-x-auto">
            <div className="flex h-full gap-3">
              <div className="h-full w-[26rem] shrink-0">
                <InsightCard title="Market Insights" insight={insightMap.market} compact />
              </div>
              <div className="h-full w-[26rem] shrink-0">
                <InsightCard title="Supply Insights" insight={insightMap.supply} compact />
              </div>
              <div className="h-full w-[26rem] shrink-0">
                <InsightCard title="General Insights" insight={insightMap.general} compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
