import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Clock } from "lucide-react";
import { Panel, Pill, Hero, Stat } from "@/components/marketiq/primitives";

export const Route = createFileRoute("/trading-hours")({
  component: TradingHoursPage,
  head: () => ({
    meta: [
      { title: "Trading Hours — Marketiq" },
      { name: "description", content: "Global market sessions, overlaps and liquidity intelligence." },
      { property: "og:title", content: "Trading Hours — Marketiq" },
      { property: "og:description", content: "Session intelligence and overlap visualization." },
    ],
  }),
});

const markets = [
  { mkt: "NYSE",   tz: "ET",  open: true,  hh: 9.5,  cl: 16,   liq: "High",   bar: "bg-[var(--color-pos)]" },
  { mkt: "NASDAQ", tz: "ET",  open: true,  hh: 9.5,  cl: 16,   liq: "High",   bar: "bg-[var(--color-pos)]" },
  { mkt: "CME",    tz: "CT",  open: true,  hh: 17,   cl: 16,   liq: "Deep",   bar: "bg-primary" },
  { mkt: "CBOT",   tz: "CT",  open: true,  hh: 19,   cl: 13.5, liq: "Deep",   bar: "bg-primary" },
  { mkt: "London", tz: "GMT", open: false, hh: 8,    cl: 16.5, liq: "—",      bar: "bg-[var(--color-warn)]" },
  { mkt: "Tokyo",  tz: "JST", open: false, hh: 9,    cl: 15,   liq: "—",      bar: "bg-accent" },
  { mkt: "Crypto", tz: "UTC", open: true,  hh: 0,    cl: 24,   liq: "Medium", bar: "bg-[var(--color-pos)]/60" },
];

function TimelineRow({ name, start, end, color }: { name: string; start: number; end: number; color: string }) {
  const left = (start / 24) * 100;
  const width = ((end - start + 24) % 24) / 24 * 100;
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <div className="w-16 text-muted-foreground tabular-nums">{name}</div>
      <div className="relative flex-1 h-4 bg-muted/40 rounded-sm overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 border-l border-border/40" style={{ left: `${(i / 24) * 100}%` }} />
        ))}
        <div
          className={`absolute top-0 bottom-0 ${color} shadow-[0_0_8px_currentColor]`}
          style={{ left: `${left}%`, width: `${width}%`, opacity: 0.85 }}
        />
      </div>
      <div className="w-12 text-right tabular-nums text-muted-foreground">{start.toString().padStart(2,"0")}-{(end % 24).toString().padStart(2,"0")}</div>
    </div>
  );
}

function TradingHoursPage() {
  return (
    <div className="space-y-4">
      <Hero
        eyebrow="Session Intelligence · UTC 14:32"
        title="NYSE Trading Hours"
        subtitle="Live global market sessions, overlaps and liquidity windows."
      >
        <div className="flex items-center gap-3">
          <Stat label="Status" value="OPEN" accent="pos" />
          <Stat label="Countdown" value="03:24:12" hint="Until close" />
          <Stat label="Liquidity" value="Deep" accent="primary" />
        </div>
      </Hero>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {markets.map((m) => (
          <Panel key={m.mkt} title={m.mkt}>
            <div className="flex items-center justify-between mb-2">
              <Pill tone={m.open ? "pos" : "neutral"}>{m.open ? "OPEN" : "CLOSED"}</Pill>
              <span className="text-[10px] text-muted-foreground">{m.tz}</span>
            </div>
            <div className="text-[10px] tabular-nums text-muted-foreground">{m.hh.toString().padStart(2,"0")}:00 → {(m.cl % 24).toString().padStart(2,"0")}:30</div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px]">
              <Clock className="size-3 text-muted-foreground" />
              <span>{m.open ? "Closes in 03:24" : "Opens in 11:42"}</span>
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">Liquidity · <span className="text-foreground">{m.liq}</span></div>
          </Panel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
        <Panel title="24h Session Overlap · UTC" right={<span className="text-[10px] text-primary">London + NY overlap active</span>}>
          <div className="space-y-1.5">
            <TimelineRow name="Tokyo"  start={0}  end={9}  color="bg-accent text-accent" />
            <TimelineRow name="London" start={8}  end={16} color="bg-[var(--color-warn)] text-[var(--color-warn)]" />
            <TimelineRow name="NY"     start={13} end={20} color="bg-[var(--color-pos)] text-[var(--color-pos)]" />
            <TimelineRow name="CME"    start={22} end={21} color="bg-primary text-primary" />
            <TimelineRow name="Crypto" start={0}  end={23} color="bg-[var(--color-pos)]/60 text-[var(--color-pos)]" />
          </div>
          <div className="mt-3 flex justify-between text-[9px] text-muted-foreground tabular-nums px-[72px]">
            {[0,4,8,12,16,20,24].map((h) => <span key={h}>{h.toString().padStart(2,"0")}</span>)}
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="AI Insight" right={<Sparkles className="size-3 text-primary" />}>
            <p className="text-[12px] leading-snug">High liquidity session active. London/NY overlap (13:00–16:00 UTC) historically prints 38% of daily SPY volume.</p>
            <ul className="mt-2 space-y-1 text-[11px]">
              <li className="flex justify-between"><span>Avg spread</span><span className="text-[var(--color-pos)] tabular-nums">0.01</span></li>
              <li className="flex justify-between"><span>Volume Z</span><span className="text-primary tabular-nums">+1.4</span></li>
              <li className="flex justify-between"><span>Slippage est.</span><span className="text-[var(--color-pos)] tabular-nums">Low</span></li>
            </ul>
          </Panel>

          <Panel title="Holiday Calendar">
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex justify-between"><span>Memorial Day · NYSE</span><span className="text-muted-foreground tabular-nums">26 May</span></li>
              <li className="flex justify-between"><span>Spring Bank · LSE</span><span className="text-muted-foreground tabular-nums">27 May</span></li>
              <li className="flex justify-between"><span>Juneteenth · NYSE</span><span className="text-muted-foreground tabular-nums">19 Jun</span></li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
