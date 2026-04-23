import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ITEMS = [
  { id: "sales", label: "Sales per Kota / Kab" },
  { id: "supplies", label: "Supplies per Kota / Kab" },
  { id: "mitra", label: "Jumlah Mitra Aktif" },
  { id: "growth", label: "Pertumbuhan YoY" },
];

const MapLegendChecklist = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    sales: true,
    supplies: true,
    mitra: false,
    growth: false,
  });

  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="mb-2 px-1 text-xs font-semibold text-foreground">Layer Peta</div>
      <ul className="space-y-1.5">
        {ITEMS.map((item) => (
          <li key={item.id} className="flex items-center gap-2 px-1">
            <Checkbox
              id={`layer-${item.id}`}
              checked={!!checked[item.id]}
              onCheckedChange={(v) =>
                setChecked((p) => ({ ...p, [item.id]: Boolean(v) }))
              }
            />
            <label
              htmlFor={`layer-${item.id}`}
              className="cursor-pointer select-none text-xs text-foreground"
            >
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapLegendChecklist;