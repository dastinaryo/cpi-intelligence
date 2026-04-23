import { Sparkles } from "lucide-react";
import type { InsightContent } from "@/types/dashboard";

interface InsightCardProps {
  title: string;
  insight?: InsightContent;
  lines?: number;
}

const toneClass: Record<string, string> = {
  observation: "bg-blue-500/80",
  risk: "bg-red-500/80",
  opportunity: "bg-emerald-500/80",
  recommendation: "bg-amber-500/80",
};

const InsightCard = ({ title, insight, lines = 4 }: InsightCardProps) => {
  const items = insight?.items ?? [];

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
          <Sparkles className="h-3 w-3" />
          AI Generated
        </span>
      </div>

      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.slice(0, 4).map((item, index) => (
            <li key={`${insight?.id ?? title}-${index}`} className="flex items-start gap-2">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneClass[item.type] ?? "bg-muted-foreground"}`}
              />
              <span className="line-clamp-3 text-xs leading-relaxed text-foreground/90">{item.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 flex flex-1 flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-muted"
              style={{ width: `${85 - i * 12}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightCard;
