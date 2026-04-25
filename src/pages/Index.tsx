import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";
import { Button } from "@/components/ui/button";
import { insights } from "@/data";
import type { CommodityScope, DashboardMode, StockTicker, SupplyTab } from "@/types/dashboard";

const Index = () => {
  const [commodityScope, setCommodityScope] = useState<CommodityScope>("local");
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>("market");
  const [supplyPerspective, setSupplyPerspective] = useState<SupplyTab>("mitra");
  const [competitorTicker, setCompetitorTicker] = useState<StockTicker>("JPFA");
  const [insightsVisible, setInsightsVisible] = useState(false);
  const shouldUseWideIndicatorOffset = dashboardMode === "supply";
  const insightsLeftOffset = shouldUseWideIndicatorOffset ? "left-[23.25rem]" : "left-[14.75rem]";

  const insightMap = useMemo(() => {
    if (dashboardMode === "market") {
      const local = insights.find((item) => item.id === "INS-market-local");
      const global = insights.find((item) => item.id === "INS-market-global");
      const news = insights.find((item) => item.id === "INS-market-news");

      return { local, global, news };
    }

    const supply = insights.find(
      (item) =>
        item.title === "Supply Insights" &&
        item.scope === commodityScope &&
        item.mode === "supply",
    );
    const demand = insights.find(
      (item) =>
        item.title === "Demand Insights" &&
        item.scope === commodityScope &&
        item.mode === "supply",
    );
    const news = insights.find(
      (item) =>
        item.title === "News Insights" &&
        item.scope === commodityScope &&
        item.mode === dashboardMode,
    );

    return { local: supply, global: demand, news };
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

        <div
          className={[
            "pointer-events-none absolute right-4 z-30 flex justify-center transition-all duration-300 ease-out",
            insightsLeftOffset,
            insightsVisible ? "bottom-[15.5rem]" : "bottom-4",
          ].join(" ")}
        >
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setInsightsVisible((prev) => !prev)}
            className="pointer-events-auto shadow-md"
          >
            {insightsVisible ? (
              <>
                <ChevronDown className="h-4 w-4" />
                Hide Insights
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Insights
              </>
            )}
          </Button>
        </div>

        {/* Floating insight cards beside the legend, matching its height */}
        <div
          className={[
            "pointer-events-none absolute bottom-4 right-4 z-20 grid h-56 grid-cols-1 gap-3 transition-all duration-300 ease-out md:grid-cols-3",
            insightsLeftOffset,
            insightsVisible
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-8 opacity-0",
          ].join(" ")}
          aria-hidden={!insightsVisible}
        >
          <div className={["min-h-0", insightsVisible ? "pointer-events-auto" : "pointer-events-none"].join(" ")}>
            <InsightCard
              title={dashboardMode === "market" ? "Local Market Insights" : "Supply Insights"}
              insight={insightMap.local}
            />
          </div>
          <div className={["min-h-0", insightsVisible ? "pointer-events-auto" : "pointer-events-none"].join(" ")}>
            <InsightCard
              title={dashboardMode === "market" ? "Global Market Insights" : "Demand Insights"}
              insight={insightMap.global}
            />
          </div>
          <div className={["min-h-0", insightsVisible ? "pointer-events-auto" : "pointer-events-none"].join(" ")}>
            <InsightCard
              title="News Insights"
              insight={insightMap.news}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
