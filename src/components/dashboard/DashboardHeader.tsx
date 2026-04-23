import {
  Building2,
  ChevronDown,
  Drumstick,
  Egg,
  Factory,
  LineChart,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
  Wheat,
} from "lucide-react";
import CommodityCard from "./CommodityCard";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  commodityPriceGlobal,
  commodityPriceLocal,
  countries,
  mitraList,
  pelangganList,
  regions,
  stocks,
} from "@/data";
import type {
  CommodityScope,
  DashboardMode,
  StockTicker,
  SupplyTab,
} from "@/types/dashboard";

interface DashboardHeaderProps {
  commodityScope: CommodityScope;
  dashboardMode: DashboardMode;
  supplyPerspective: SupplyTab;
  competitorTicker: StockTicker;
  onCommodityScopeChange: (value: CommodityScope) => void;
  onDashboardModeChange: (value: DashboardMode) => void;
  onCompetitorChange: (value: StockTicker) => void;
}

const formatPrice = (value: number, currency: "IDR" | "USD") => {
  if (currency === "IDR") {
    return `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value)}`;
  }

  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)}`;
};

const formatCompact = (value: number) => new Intl.NumberFormat("id-ID").format(value);

const COMPETITORS: StockTicker[] = ["JPFA", "MAIN", "SIPD"];

const competitorOptions = COMPETITORS.map((ticker) => {
  const stock = stocks.find((item) => item.ticker === ticker);
  return {
    ticker,
    price: stock?.price ?? 0,
    change: stock?.change ?? 0,
  };
});

const scopeOptions: { label: string; value: CommodityScope }[] = [
  { label: "Local", value: "local" },
  { label: "Global", value: "global" },
];

const modeOptions: { label: string; value: DashboardMode }[] = [
  { label: "Market", value: "market" },
  { label: "Supply", value: "supply" },
];

interface SelectChipProps<T extends string> {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

const SelectChip = <T extends string,>({ label, value, options, onChange }: SelectChipProps<T>) => {
  const currentLabel = options.find((opt) => opt.value === value)?.label ?? value;

  return (
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
            {currentLabel}
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[8rem]">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onSelect={() => onChange(opt.value)}
              className="text-xs"
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CompetitorStockCard = ({
  selected,
  onChange,
}: {
  selected: StockTicker;
  onChange: (ticker: StockTicker) => void;
}) => {
  const current = competitorOptions.find((item) => item.ticker === selected) ?? competitorOptions[0];
  const positive = current.change >= 0;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Building2 className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold tabular-nums text-foreground">
          {formatPrice(current.price, "IDR")}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {current.ticker}
              <ChevronDown className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[8rem]">
            {COMPETITORS.map((ticker) => (
              <DropdownMenuItem
                key={ticker}
                onSelect={() => onChange(ticker)}
                className="text-xs"
              >
                {ticker}
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

type HeaderCardConfig = {
  label: string;
  price: string;
  change: number;
  icon: React.ReactNode;
};

const getMarketCards = (scope: CommodityScope): HeaderCardConfig[] => {
  const priceSet = scope === "local" ? commodityPriceLocal : commodityPriceGlobal;
  const iconMap: Record<string, React.ReactNode> = {
    jagung: <Wheat className="h-5 w-5" />,
    ayam: <Drumstick className="h-5 w-5" />,
    telur: <Egg className="h-5 w-5" />,
  };

  const commodityCards = priceSet.items.map((item) => ({
    label: item.label,
    price: formatPrice(item.price, item.currency),
    change: item.change,
    icon: iconMap[item.id],
  }));

  const cpin = stocks.find((item) => item.ticker === "CPIN");
  if (!cpin) {
    return commodityCards;
  }

  return [
    ...commodityCards,
    {
      label: "CPIN",
      price: formatPrice(cpin.price, "IDR"),
      change: cpin.change,
      icon: <LineChart className="h-5 w-5" />,
    },
  ];
};

const getSupplyCards = (scope: CommodityScope, perspective: SupplyTab): HeaderCardConfig[] => {
  if (scope === "local") {
    const totalSupply = regions.reduce((sum, region) => sum + region.supply.suppliesVolumeTon, 0);
    const totalDemand = regions.reduce((sum, region) => sum + region.supply.salesVolumeTon, 0);
    const net = totalSupply - totalDemand;
    const averageYoy = regions.reduce((sum, region) => sum + region.supply.yoyGrowth, 0) / regions.length;

    const activeCount =
      perspective === "mitra"
        ? regions.reduce((sum, region) => sum + region.supply.totalMitraAktif, 0)
        : regions.reduce((sum, region) => sum + region.supply.totalPelanggan, 0);

    const utilizationMitra =
      mitraList.length === 0
        ? 0
        : mitraList.reduce((sum, mitra) => sum + mitra.utilizationRate, 0) / mitraList.length;

    const fulfillmentPelanggan =
      pelangganList.length === 0
        ? 0
        : pelangganList.reduce((sum, pelanggan) => sum + pelanggan.fulfillmentRate, 0) / pelangganList.length;

    const netRatio = totalDemand === 0 ? 0 : (net / totalDemand) * 100;
    const demandPressure = totalDemand === 0 ? 0 : ((totalDemand - totalSupply) / totalDemand) * 100;

    return [
      {
        label: "Supply Nasional",
        price: `${formatCompact(totalSupply)} ton`,
        change: Number(averageYoy.toFixed(1)),
        icon: <Package className="h-5 w-5" />,
      },
      {
        label: "Demand Nasional",
        price: `${formatCompact(totalDemand)} ton`,
        change: Number((-demandPressure).toFixed(1)),
        icon: <ShoppingCart className="h-5 w-5" />,
      },
      {
        label: "Net Surplus/Defisit",
        price: `${net >= 0 ? "+" : ""}${formatCompact(net)} ton`,
        change: Number(netRatio.toFixed(1)),
        icon: <Factory className="h-5 w-5" />,
      },
      {
        label: perspective === "mitra" ? "Mitra Aktif" : "Pelanggan Aktif",
        price: formatCompact(activeCount),
        change: Number(
          (perspective === "mitra" ? utilizationMitra - 80 : fulfillmentPelanggan - 94).toFixed(1),
        ),
        icon: <Users className="h-5 w-5" />,
      },
    ];
  }

  const totalCountries = countries.length;
  const exporterCount = countries.filter((country) => country.supply.isExporter).length;
  const importerCount = totalCountries - exporterCount;

  const totalExport = countries.reduce((sum, country) => sum + country.supply.exportVolumeTon, 0);
  const totalImport = countries.reduce((sum, country) => sum + country.supply.importVolumeTon, 0);
  const netTrade = totalExport - totalImport;
  const avgSupplyIndex = countries.reduce((sum, country) => sum + country.supply.supplyIndex, 0) / totalCountries;
  const partnerCount = countries.filter((country) => country.supply.tradeRelation === "partner").length;

  return [
    {
      label: "Avg Supply Index",
      price: `${avgSupplyIndex.toFixed(1)}`,
      change: Number((avgSupplyIndex - 60).toFixed(1)),
      icon: <Package className="h-5 w-5" />,
    },
    {
      label: "Exporter Countries",
      price: formatCompact(exporterCount),
      change: Number((((exporterCount - importerCount) / totalCountries) * 100).toFixed(1)),
      icon: <Factory className="h-5 w-5" />,
    },
    {
      label: "Net Trade Volume",
      price: `${netTrade >= 0 ? "+" : ""}${formatCompact(netTrade)} ton`,
      change: Number(((netTrade / Math.max(totalImport, 1)) * 100).toFixed(1)),
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      label: perspective === "mitra" ? "Strategic Partners" : "Demand Markets",
      price: formatCompact(perspective === "mitra" ? partnerCount : importerCount),
      change: Number((((partnerCount - importerCount) / totalCountries) * 100).toFixed(1)),
      icon: <Users className="h-5 w-5" />,
    },
  ];
};

const DashboardHeader = ({
  commodityScope,
  dashboardMode,
  supplyPerspective,
  competitorTicker,
  onCommodityScopeChange,
  onDashboardModeChange,
  onCompetitorChange,
}: DashboardHeaderProps) => {
  const cards =
    dashboardMode === "market"
      ? getMarketCards(commodityScope)
      : getSupplyCards(commodityScope, supplyPerspective);

  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SelectChip
          label="Commodity Price"
          value={commodityScope}
          options={scopeOptions}
          onChange={onCommodityScopeChange}
        />
        <SelectChip
          label="Dashboard Mode"
          value={dashboardMode}
          options={modeOptions}
          onChange={onDashboardModeChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <CommodityCard
            key={card.label}
            label={card.label}
            price={card.price}
            change={card.change}
            icon={card.icon}
          />
        ))}
        <CompetitorStockCard selected={competitorTicker} onChange={onCompetitorChange} />
      </div>
    </header>
  );
};

export default DashboardHeader;
