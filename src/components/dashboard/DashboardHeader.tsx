import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CommodityCard from "./CommodityCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const COMMODITIES = [
  { label: "Harga Jagung", price: "Rp 5.420", change: 0.2 },
  { label: "Harga Ayam", price: "Rp 32.150", change: -0.3 },
  { label: "Harga Telur", price: "Rp 28.900", change: 1.0 },
  { label: "CPIN", price: "Rp 4.880", change: -0.5 },
  { label: "JPFA", price: "Rp 1.620", change: 1.2 },
];

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
      </div>
    </header>
  );
};

export default DashboardHeader;