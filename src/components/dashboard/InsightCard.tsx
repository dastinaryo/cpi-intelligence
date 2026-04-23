import { Sparkles } from "lucide-react";

interface InsightCardProps {
  title: string;
  lines?: number;
}

const InsightCard = ({ title, lines = 4 }: InsightCardProps) => (
  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
    <div className="mb-1 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
        <Sparkles className="h-3 w-3" />
        AI Generated
      </span>
    </div>
    <div className="mt-3 flex flex-1 flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded-full bg-muted"
          style={{ width: `${85 - i * 12}%` }}
        />
      ))}
    </div>
  </div>
);

export default InsightCard;