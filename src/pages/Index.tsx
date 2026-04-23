import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => (
  <main className="min-h-screen bg-background p-4 sm:p-6">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
      <DashboardHeader />

      <section className="relative">
        <MapPanel />
        <div className="pointer-events-none absolute left-4 top-4 z-20 hidden w-[280px] flex-col gap-3 lg:flex">
          <div className="pointer-events-auto"><InsightCard title="Market Insights" /></div>
          <div className="pointer-events-auto"><InsightCard title="Supply Insights" /></div>
          <div className="pointer-events-auto"><InsightCard title="General Insights" /></div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:hidden">
        <InsightCard title="Market Insights" />
        <InsightCard title="Supply Insights" />
        <InsightCard title="General Insights" />
      </section>
    </div>
  </main>
);

export default Index;
