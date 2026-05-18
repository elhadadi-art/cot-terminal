import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sparkles, Search } from "lucide-react";
import { Panel, Pill, Hero, Bar } from "@/components/marketiq/primitives";
import { heatmapSP } from "@/lib/mock";

export const Route = createFileRoute("/heat-maps")({
  component: HeatMapPage,
  head: () => ({
    meta: [
      { title: "Heat Maps — Marketiq" },
      { name: "description", content: "Institutional heatmaps across S&P 500, Nasdaq 100, ETFs, crypto and forex." },
      { property: "og:title", content: "Heat Maps — Marketiq" },
      { property: "og:description", content: "AI-augmented institutional heatmaps." },
    ],
  }),
});

const tabs = ["S&P 500", "Dow 30", "Nasdaq 100", "Russell 2000", "ETF", "Crypto", "Forex"];

function tileColor(chg: number) {
  const c = Math.max(-3, Math.min(3, chg)) / 3;
  if (c >= 0) {
    return `color-mix(in oklab, var(--color-pos) ${30 + c * 60}%, oklch(0.18 0.022 255))`;
  }
  return `color-mix(in oklab, var(--color-neg) ${30 + Math.abs(c) * 60}%, oklch(0.18 0.022 255))`;
}

function HeatMapPage() {
  const [hover, setHover] = React.useState<typeof heatmapSP[number] | null>(null);
  return (
    <div className="space-y-4">
      <Hero
        eyebrow="Market Heatmaps"
        title="Sector & ticker performance"
        subtitle="Color intensity encodes magnitude; tile area scales with weight. Hover for AI interpretation."
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Filter tickers…" className="h-9 bg-secondary/60 border border-border rounded-sm pl-8 pr-3 text-[12px] focus:outline-none focus:border-primary/60" />
        </div>
      </Hero>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((t, i) => (
            <button key={t} className={`h-7 px-2.5 rounded-sm border text-[11px] tracking-wide whitespace-nowrap ${i === 0 ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {["All Sectors","Tech","Financials","Energy","Health"].map((s, i) => (
            <button key={s} className={`h-7 px-2.5 rounded-sm border text-[10px] ${i === 0 ? "border-primary/60 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          <Pill tone="primary"><Sparkles className="size-2.5" />AI Filter</Pill>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
        <Panel title="S&P 500 · 1D" right={<span className="text-[10px] text-muted-foreground">28 of 503 shown</span>} bodyClassName="p-2">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 auto-rows-[88px] gap-1">
            {heatmapSP.map((t) => {
              const pos = t.chg >= 0;
              const span = t.cap >= 10 ? "col-span-2 row-span-2" : t.cap >= 7 ? "col-span-2" : "";
              return (
                <button
                  key={t.sym}
                  onMouseEnter={() => setHover(t)}
                  onMouseLeave={() => setHover(null)}
                  className={`${span} relative p-2 text-left rounded-sm border border-border/30 overflow-hidden group transition-transform hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_24px_-6px_var(--color-primary)]`}
                  style={{ background: tileColor(t.chg) }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[13px] font-bold tracking-tight">{t.sym}</div>
                      <div className="text-[9px] opacity-70">{t.sec}</div>
                    </div>
                    <div className={`text-[11px] font-semibold tabular-nums ${pos ? "text-white" : "text-white/95"}`}>{pos ? "+" : ""}{t.chg.toFixed(2)}%</div>
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] opacity-80">
                    <span>{t.name}</span>
                    <span>S {Math.round(t.sent * 100)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="AI Hover · Live" right={<Sparkles className="size-3 text-primary" />}>
            {hover ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{hover.sym}</div>
                    <div className="text-[10px] text-muted-foreground">{hover.name} · {hover.sec}</div>
                  </div>
                  <Pill tone={hover.chg >= 0 ? "pos" : "neg"}>{hover.chg >= 0 ? "+" : ""}{hover.chg.toFixed(2)}%</Pill>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div><div className="flex justify-between text-[11px]"><span>Bullish probability</span><span className="tabular-nums">{Math.round(hover.sent * 100)}%</span></div><Bar value={hover.sent * 100} color="var(--color-pos)" /></div>
                  <div><div className="flex justify-between text-[11px]"><span>Momentum</span><span className="tabular-nums">{Math.round(Math.abs(hover.chg) * 30 + 40)}</span></div><Bar value={Math.abs(hover.chg) * 30 + 40} color="var(--color-primary)" /></div>
                  <div><div className="flex justify-between text-[11px]"><span>Regime fit</span><span className="tabular-nums">68</span></div><Bar value={68} color="var(--color-warn)" /></div>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1 leading-snug">
                  {hover.chg >= 1 ? "Strong momentum with breadth confirmation. Above key institutional levels." : hover.chg >= 0 ? "Constructive but extended; await pullback for entry." : "Distribution detected; supply zone overhead."}
                </p>
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground">Hover a tile to see AI interpretation.</div>
            )}
          </Panel>

          <Panel title="AI Sector Read">
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-center justify-between"><span>Technology leading</span><Pill tone="pos">+1.4%</Pill></li>
              <li className="flex items-center justify-between"><span>Semis strong</span><Pill tone="pos">+1.7%</Pill></li>
              <li className="flex items-center justify-between"><span>Risk-On environment</span><Pill tone="primary">CONFIRMED</Pill></li>
              <li className="flex items-center justify-between"><span>Financials lagging</span><Pill tone="neg">-0.6%</Pill></li>
              <li className="flex items-center justify-between"><span>Defensives flat</span><Pill tone="neutral">0.0%</Pill></li>
            </ul>
          </Panel>

          <Panel title="Legend">
            <div className="flex items-center gap-1 h-3 rounded-sm overflow-hidden">
              {Array.from({ length: 21 }).map((_, i) => {
                const v = (i - 10) / 10 * 3;
                return <div key={i} className="flex-1 h-full" style={{ background: tileColor(v) }} />;
              })}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground tabular-nums mt-1"><span>-3%</span><span>0</span><span>+3%</span></div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
