import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InsightCard from "@/components/dashboard/InsightCard";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => (
  <main className="min-h-screen bg-background p-4 sm:p-6">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
      <DashboardHeader />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard title="Market Insights" />
        <InsightCard title="Supply Insights" />
        <InsightCard title="General Insights" />
      </section>

      <section>
        <MapPanel />
      </section>
    </div>
  </main>
);

export default Index;
