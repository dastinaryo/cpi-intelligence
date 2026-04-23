import { useState } from "react";
import { Search } from "lucide-react";
import MapDashboard from "@/components/MapDashboard";
import { cn } from "@/lib/utils";

const TABS = ["Mitra", "Pelanggan"] as const;
type Tab = (typeof TABS)[number];

const MapPanel = () => {
  const [tab, setTab] = useState<Tab>("Mitra");

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <MapDashboard />

      {/* Top-left tabs */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "pointer-events-auto rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors",
              tab === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/95 text-foreground hover:bg-accent",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top-right AI Assistant */}
      <div className="pointer-events-none absolute right-4 top-4 z-10">
        <button
          type="button"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur hover:bg-accent"
        >
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          AI Assistant
        </button>
      </div>
    </div>
  );
};

export default MapPanel;