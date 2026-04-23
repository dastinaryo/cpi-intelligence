import { useState } from "react";
import {
  ChevronDown,
  TrendingDown,
  TrendingUp,
  Wheat,
  Drumstick,
  Egg,
  LineChart,
  Building2,
} from "lucide-react";
import CommodityCard from "./CommodityCard";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const COMMODITIES = [
  { label: "Harga Jagung", price: "Rp 5.420", change: 0.2, icon: <Wheat className="h-5 w-5" /> },
  { label: "Harga Ayam", price: "Rp 32.150", change: -0.3, icon: <Drumstick className="h-5 w-5" /> },
  { label: "Harga Telur", price: "Rp 28.900", change: 1.0, icon: <Egg className="h-5 w-5" /> },
  { label: "CPIN", price: "Rp 4.880", change: -0.5, icon: <LineChart className="h-5 w-5" /> },
];

const COMPETITORS = [
  { label: "JPFA", price: "Rp 1.620", change: 1.2 },
  { label: "MAIN", price: "Rp 685", change: -0.8 },
  { label: "SIPD", price: "Rp 124", change: 0.5 },
] as const;

const CompetitorStockCard = () => {
  const [selected, setSelected] = useState<string>(COMPETITORS[0].label);
  const current = COMPETITORS.find((c) => c.label === selected) ?? COMPETITORS[0];
  const positive = current.change >= 0;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Building2 className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold tabular-nums text-foreground">{current.price}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {current.label}
              <ChevronDown className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[8rem]">
            {COMPETITORS.map((opt) => (
              <DropdownMenuItem
                key={opt.label}
                onSelect={() => setSelected(opt.label)}
                className="text-xs"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={cn(
          "flex items-center gap-0.5 text-xs font-medium tabular-nums",
          positive ? "text-trend-up" : "text-trend-down",
        )}
      >
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {positive ? "+" : ""}
        {current.change.toFixed(1)}%
      </div>
    </div>
  );
};

interface SelectChipProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}
const SelectChip = ({ label, value, options, onChange }: SelectChipProps) => (
  <div className="flex items-center gap-2">
    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-accent"
        >
          {value}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[8rem]">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onSelect={() => onChange(opt)}
            className="text-xs"
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const DashboardHeader = () => {
  const [commodityScope, setCommodityScope] = useState("Local");
  const [dashboardMode, setDashboardMode] = useState("Market");

  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SelectChip
          label="Comodity Price"
          value={commodityScope}
          options={["Local", "Global"]}
          onChange={setCommodityScope}
        />
        <SelectChip
          label="Dashboard Mode"
          value={dashboardMode}
          options={["Market", "Supply"]}
          onChange={setDashboardMode}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {COMMODITIES.map((c) => (
          <CommodityCard key={c.label} {...c} />
        ))}
        <CompetitorStockCard />
      </div>
    </header>
  );
};

export default DashboardHeader;