import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => (
  <main className="flex h-screen flex-col bg-background p-4 sm:p-6 gap-4">
    <DashboardHeader />

    <section className="relative min-h-0 flex-1">
      <MapPanel />

      {/* Floating insight cards over the map (offset left to clear the legend) */}
      <div className="pointer-events-none absolute bottom-4 left-52 right-4 z-20 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="pointer-events-auto">
          <InsightCard title="Market Insights" />
        </div>
        <div className="pointer-events-auto">
          <InsightCard title="Supply Insights" />
        </div>
        <div className="pointer-events-auto">
          <InsightCard title="General Insights" />
        </div>
      </div>
    </section>
  </main>
);

export default Index;
