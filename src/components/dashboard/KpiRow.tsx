import { AlertTriangle, Factory, Network, Package, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "@/types/dashboard";

interface KpiRowProps {
  metrics: KpiMetric[];
}

const iconMap: Record<string, React.ElementType> = {
  "feedmill-util": Factory,
  "farm-capacity": Wheat,
  "stock-level": Package,
  "active-routes": Network,
  "bottleneck-alerts": AlertTriangle,
};

const toneStyles = {
  neutral: "border-border",
  warning: "border-status-high/50",
  critical: "border-status-critical/60",
};

const toneAccent = {
  neutral: "bg-muted",
  warning: "bg-status-high",
  critical: "bg-status-critical",
};

const formatDelta = (delta: number) => {
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}%`;
};

const KpiCard = ({ metric }: { metric: KpiMetric }) => {
  const Icon = iconMap[metric.id] ?? Package;

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col gap-2 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-foreground/20",
        toneStyles[metric.tone],
      )}
    >
      <span
        className={cn("absolute left-0 top-0 h-full w-[3px] rounded-l-lg", toneAccent[metric.tone])}
        aria-hidden
      />
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {metric.label}
        </span>
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tabular-nums text-foreground">
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-xs font-medium text-muted-foreground">{metric.unit}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 text-[11px]">
        {metric.delta !== undefined ? (
          <span
            className={cn(
              "tabular-nums font-medium",
              metric.delta > 0 ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {formatDelta(metric.delta)}
          </span>
        ) : (
          <span className="text-muted-foreground">{metric.helper ?? ""}</span>
        )}
        {metric.deltaLabel && (
          <span className="truncate text-muted-foreground">{metric.deltaLabel}</span>
        )}
      </div>
    </div>
  );
};

const KpiRow = ({ metrics }: KpiRowProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {metrics.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default KpiRow;
