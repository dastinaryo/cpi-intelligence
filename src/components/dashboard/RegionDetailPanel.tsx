import { AlertTriangle, Box, Truck, Users, Warehouse, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegionData, SupplyNode } from "@/types/dashboard";

interface RegionDetailPanelProps {
  region: RegionData;
  nodes: SupplyNode[];
  onClose?: () => void;
}

const formatTon = (value: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value);

const StatRow = ({
  icon: Icon,
  label,
  value,
  unit,
  bar,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  unit?: string;
  bar?: { value: number; max: number; tone: "normal" | "high" | "critical" };
}) => {
  const toneBar = {
    normal: "bg-status-normal",
    high: "bg-status-high",
    critical: "bg-status-critical",
  };

  return (
    <div className="flex flex-col gap-1.5 border-b border-border py-2.5 last:border-b-0">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
          <Icon className="h-3 w-3" strokeWidth={2} />
          {label}
        </span>
        <span className="tabular-nums text-sm font-semibold text-foreground">
          {value}
          {unit && <span className="ml-0.5 text-[11px] font-normal text-muted-foreground">{unit}</span>}
        </span>
      </div>
      {bar && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full", toneBar[bar.tone])}
            style={{ width: `${Math.min(100, (bar.value / bar.max) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

const RegionDetailPanel = ({ region, nodes, onClose }: RegionDetailPanelProps) => {
  const regionNodes = nodes.filter((n) => n.regionId === region.regionId);

  const capacity = regionNodes.reduce((sum, n) => sum + n.capacityTonPerMonth, 0);
  const throughput = regionNodes.reduce((sum, n) => sum + n.currentThroughputTon, 0);
  const stock = regionNodes.reduce((sum, n) => sum + n.stockLevelTon, 0);
  const activeFarms = regionNodes.reduce((sum, n) => sum + (n.activeFarms ?? 0), 0) || region.supply.totalMitraAktif;
  const incoming = regionNodes.reduce((sum, n) => sum + (n.incomingSupplyTon ?? 0), 0);
  const utilization = capacity > 0 ? Math.round((throughput / capacity) * 100) : 0;

  const riskSignals: { level: "critical" | "high" | "normal"; text: string }[] = [];
  if (region.supply.allocationStatus === "shortage") {
    riskSignals.push({
      level: "critical",
      text: `Defisit pasokan ${Math.abs(region.supply.surplusShortage)} ton/bulan`,
    });
  }
  if (region.market.riskSignal === "red") {
    riskSignals.push({ level: "critical", text: `Inflasi ${region.market.inflationRate.toFixed(1)}% YoY` });
  } else if (region.market.riskSignal === "yellow") {
    riskSignals.push({ level: "high", text: `Volatilitas harga ${region.market.priceVolatility}` });
  }
  regionNodes
    .flatMap((n) => n.riskSignals.map((s) => ({ level: "high" as const, text: `${n.name}: ${s}` })))
    .slice(0, 3)
    .forEach((s) => riskSignals.push(s));
  if (riskSignals.length === 0) {
    riskSignals.push({ level: "normal", text: "Tidak ada sinyal risiko aktif" });
  }

  const capacityTone = utilization >= 92 ? "critical" : utilization >= 78 ? "high" : "normal";
  const stockTone = stock < capacity * 0.05 ? "critical" : stock < capacity * 0.12 ? "high" : "normal";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Region detail
          </div>
          <div className="mt-0.5 truncate text-base font-semibold text-foreground">
            {region.provinsi}
          </div>
          <div className="truncate text-[11px] text-muted-foreground">
            {region.capital} · {region.population.toFixed(1)}M pop · {regionNodes.length} nodes
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex-1 overflow-y-auto px-4">
        <StatRow
          icon={Warehouse}
          label="Capacity"
          value={`${formatTon(throughput)}/${formatTon(capacity)}`}
          unit="ton/mo"
          bar={{ value: utilization, max: 100, tone: capacityTone }}
        />
        <StatRow
          icon={Box}
          label="Stock"
          value={formatTon(stock)}
          unit="ton"
          bar={{ value: stock, max: Math.max(capacity * 0.2, 1), tone: stockTone }}
        />
        <StatRow
          icon={Users}
          label="Active farms"
          value={formatTon(activeFarms)}
          unit="mitra"
        />
        <StatRow
          icon={Truck}
          label="Incoming supply"
          value={formatTon(incoming)}
          unit="ton/wk"
        />

        {/* Risk signals */}
        <div className="py-3">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="h-3 w-3" strokeWidth={2} />
            Risk signals
          </div>
          <ul className="space-y-1.5">
            {riskSignals.map((signal, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-foreground/90">
                <span
                  className={cn(
                    "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                    signal.level === "critical" && "bg-status-critical",
                    signal.level === "high" && "bg-status-high",
                    signal.level === "normal" && "bg-status-normal",
                  )}
                />
                <span>{signal.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegionDetailPanel;
