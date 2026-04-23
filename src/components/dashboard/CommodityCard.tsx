import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommodityCardProps {
  label: string;
  price: string;
  change: number; // percentage, e.g. 0.2 or -0.5
  icon?: React.ReactNode;
}

const CommodityCard = ({ label, price, change, icon }: CommodityCardProps) => {
  const positive = change >= 0;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        {icon ?? <span className="text-xs font-semibold">{label.slice(0, 2)}</span>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold tabular-nums text-foreground">{price}</div>
        <div className="truncate text-xs text-muted-foreground">{label}</div>
      </div>
      <div
        className={cn(
          "flex items-center gap-0.5 text-xs font-medium tabular-nums",
          positive ? "text-trend-up" : "text-trend-down",
        )}
      >
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {positive ? "+" : ""}
        {change.toFixed(1)}%
      </div>
    </div>
  );
};

export default CommodityCard;