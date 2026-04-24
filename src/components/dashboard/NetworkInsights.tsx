import { AlertTriangle, Sparkles, Truck, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NetworkInsightGroup } from "@/types/dashboard";

interface NetworkInsightsProps {
  groups: NetworkInsightGroup[];
}

const categoryMeta = {
  supply: { icon: Wheat, label: "Supply insights" },
  logistics: { icon: Truck, label: "Logistics insights" },
  risk: { icon: AlertTriangle, label: "Risk alerts" },
} as const;

const typeDot = {
  observation: "bg-foreground/60",
  risk: "bg-status-critical",
  opportunity: "bg-status-normal",
  recommendation: "bg-status-high",
};

const NetworkInsights = ({ groups }: NetworkInsightsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {groups.map((group) => {
        const Meta = categoryMeta[group.category];
        const Icon = Meta.icon;

        return (
          <div
            key={group.category}
            className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
                <span className="text-xs font-semibold text-foreground">{group.title}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                AI
              </span>
            </div>

            <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
              {group.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      typeDot[item.type],
                    )}
                  />
                  <span className="text-xs leading-relaxed text-foreground/85">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default NetworkInsights;
