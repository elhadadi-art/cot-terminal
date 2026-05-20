import { UsersRound } from "lucide-react";
import { Panel, Bar, Pill } from "@/components/marketiq/primitives";
import { retailPositioning, generateRetailNarrative, type RetailPositioning } from "@/lib/cot-sentiment";

export function RetailPositioningCard({ data = retailPositioning }: { data?: RetailPositioning }) {
  const tone = data.trend === "bullish" ? "pos" : data.trend === "bearish" ? "neg" : "neutral";
  const color =
    data.trend === "bullish"
      ? "var(--color-pos)"
      : data.trend === "bearish"
      ? "var(--color-neg)"
      : "var(--color-muted-foreground)";
  const narrative = generateRetailNarrative(data.value);

  return (
    <Panel
      title="Retail Positioning"
      right={
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <UsersRound className="size-3" />
          <Pill tone={tone}>{data.label}</Pill>
        </span>
      }
    >
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">COT</div>
          <div className="text-xl font-semibold tabular-nums" style={{ color }}>
            {data.value}%
          </div>
        </div>
        <div className="text-[11px] text-right text-muted-foreground max-w-[55%] leading-snug">
          {data.interpretation}
        </div>
      </div>
      <div className="mt-2"><Bar value={data.value} color={color} /></div>
      <p className="mt-1.5 text-[10px] text-foreground/70 leading-snug">{narrative}</p>
    </Panel>
  );
}