import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapLegendChecklist from "@/components/dashboard/MapLegendChecklist";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => (
  <main className="min-h-screen bg-background p-4 sm:p-6">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
      <DashboardHeader />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="order-2 lg:order-1">
          <MapLegendChecklist />
        </aside>
        <div className="order-1 lg:order-2">
          <MapPanel />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard title="Market Insights" />
        <InsightCard title="Supply Insights" />
        <InsightCard title="General Insights" />
      </section>
    </div>
  </main>
);

export default Index;
