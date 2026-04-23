import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => (
  <main className="flex h-screen flex-col bg-background p-4 sm:p-6 gap-4">
    <DashboardHeader />

    <section className="min-h-0 flex-1">
      <MapPanel />
    </section>

    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <InsightCard title="Market Insights" />
      <InsightCard title="Supply Insights" />
      <InsightCard title="General Insights" />
    </section>
  </main>
);

export default Index;
