import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ArrowUpRight, TrendingUp, Activity, Gauge, Droplets, Zap, BookOpen, ChevronRight } from "lucide-react";
import { Panel, Stat, Pill, Spark, ProgressRing, Bar, Hero } from "@/components/marketiq/primitives";
import { watchlist, sessions, feed } from "@/lib/mock";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Home — Marketiq Terminal" },
      { name: "description", content: "AI morning brief, market pulse, live feed, probability engine, watchlist and session status." },
      { property: "og:title", content: "Home — Marketiq Terminal" },
      { property: "og:description", content: "AI-native institutional market overview." },
    ],
  }),
});

const pulse = [
  { label: "Risk-On / Off",     value: "Risk-On",   delta: "+0.42σ", pos: true,  spark: [3,4,4,5,6,7,7,8,9,9], color: "var(--color-pos)" },
  { label: "Dealer Pressure",   value: "Long Gamma",delta: "+0.18",  pos: true,  spark: [6,5,5,6,7,7,8,8,9,9], color: "var(--color-primary)" },
  { label: "Volatility Regime", value: "Low",       delta: "-0.21",  pos: true,  spark: [8,7,7,6,6,5,5,4,4,3], color: "var(--color-warn)" },
  { label: "Liquidity",         value: "Deep",      delta: "+1.2x",  pos: true,  spark: [4,5,5,6,6,7,8,8,9,9], color: "var(--color-primary)" },
  { label: "AI Confidence",     value: "78%",       delta: "+6pts",  pos: true,  spark: [5,5,6,6,7,7,8,8,8,9], color: "var(--color-pos)" },
];

const probs = [
  { label: "Breakout",       value: 72, color: "var(--color-pos)",     note: "Above 532.50 trigger" },
  { label: "Mean Reversion", value: 38, color: "var(--color-warn)",    note: "Stretched RSI on QQQ" },
  { label: "Vol Spike Risk", value: 24, color: "var(--color-neg)",     note: "VIX term in contango"  },
];

function HomePage() {
  return (
    <div className="space-y-4">
      {/* SECTION 1 — AI MORNING BRIEF */}
      <Hero
        eyebrow="AI Morning Brief · 13 May 2026"
        title={<>Moderately <span className="text-[var(--color-pos)]">Bullish</span> tape into US open</>}
        subtitle={<>Dealers long gamma above SPY 530.20, dampening intraday volatility. Breadth narrowing but momentum intact. Watch CPI revisions and Powell remarks at 10:00 ET.</>}
      >
        <div className="flex items-center gap-4">
          <ProgressRing value={78} label="CONF" />
          <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-sm bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide hover:bg-primary/90 glow-primary">
            <Sparkles className="size-3.5" /> Full AI brief <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </Hero>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Panel title="Bias">
          <div className="flex items-center justify-between">
            <Stat label="Direction" value="Bullish" accent="pos" delta={{ value: "+6 pts", pos: true }} />
            <span className="text-[var(--color-pos)] ring-dot text-[10px] tracking-widest">STRONG</span>
          </div>
          <div className="mt-2"><Bar value={78} color="var(--color-pos)" /></div>
        </Panel>
        <Panel title="Volatility Regime">
          <Stat label="VIX" value="13.21" delta={{ value: "-0.18", pos: true }} hint="Realized 10D · 9.8" />
          <div className="mt-2"><Bar value={28} color="var(--color-warn)" /></div>
        </Panel>
        <Panel title="Risk Sentiment">
          <Stat label="Composite" value="Risk-On" accent="pos" delta={{ value: "+0.42σ", pos: true }} hint="HYG/IEF, AUD/JPY, BTC" />
          <div className="mt-2"><Bar value={68} color="var(--color-pos)" /></div>
        </Panel>
        <Panel title="Key Levels · SPY">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><div className="text-[10px] text-muted-foreground">Pivot</div><div className="text-sm font-semibold tabular-nums">532.50</div></div>
            <div><div className="text-[10px] text-muted-foreground">Support</div><div className="text-sm font-semibold tabular-nums text-[var(--color-neg)]">530.20</div></div>
            <div><div className="text-[10px] text-muted-foreground">Resist</div><div className="text-sm font-semibold tabular-nums text-[var(--color-pos)]">535.80</div></div>
          </div>
        </Panel>
      </div>

      {/* SECTION 2 — MARKET PULSE */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Market Pulse</div>
          <div className="text-[10px] text-muted-foreground">5 signals · updated 12s ago</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {pulse.map((p) => (
            <Panel key={p.label} title={p.label}>
              <div className="flex items-end justify-between gap-2">
                <Stat label="" value={p.value} delta={{ value: p.delta, pos: p.pos }} />
                <Spark data={p.spark} color={p.color} width={80} height={28} />
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* SECTION 3+4 — feed + probability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel
          title="Live Feed · AI Intraday"
          right={<span className="text-[10px] text-[var(--color-pos)] ring-dot">LIVE</span>}
          className="lg:col-span-2"
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-border/60">
            {feed.map((f, i) => (
              <li key={i} className="flex items-start gap-3 px-3 py-2 hover:bg-secondary/40">
                <div className="text-[10px] tabular-nums text-muted-foreground w-12 pt-0.5">{f.t}</div>
                <span className="mt-1.5 size-1.5 rounded-full bg-primary live-dot shadow-[0_0_8px_var(--color-primary)]" />
                <div className="flex-1 text-[12px] text-foreground/90">{f.txt}</div>
                <Activity className="size-3 text-muted-foreground mt-0.5" />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Probability Engine" right={<Sparkles className="size-3 text-primary" />}>
          <div className="space-y-3">
            {probs.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[11px] text-foreground">{p.label}</div>
                  <div className="text-[11px] font-semibold tabular-nums" style={{ color: p.color }}>{p.value}%</div>
                </div>
                <Bar value={p.value} color={p.color} />
                <div className="text-[10px] text-muted-foreground mt-0.5">{p.note}</div>
              </div>
            ))}
            <div className="flex items-center justify-around pt-1 border-t border-border/70">
              <ProgressRing value={72} label="BRK" size={48} color="var(--color-pos)" />
              <ProgressRing value={38} label="REV" size={48} color="var(--color-warn)" />
              <ProgressRing value={24} label="VOL" size={48} color="var(--color-neg)" />
            </div>
          </div>
        </Panel>
      </div>

      {/* SECTION 5+6 — Watchlist + Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Watchlist" right={<button className="text-[10px] text-primary hover:underline">Manage</button>} className="lg:col-span-2" bodyClassName="p-0">
          <table className="w-full text-[12px]">
            <thead className="bg-secondary/40">
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-3 py-1.5">Sym</th>
                <th className="text-left px-3 py-1.5">Name</th>
                <th className="text-right px-3 py-1.5">Price</th>
                <th className="text-right px-3 py-1.5">%</th>
                <th className="text-left px-3 py-1.5">Sentiment</th>
                <th className="text-right px-3 py-1.5">RS</th>
                <th className="text-left px-3 py-1.5">Vol</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((w) => {
                const pos = w.chg >= 0;
                return (
                  <tr key={w.sym} className="border-t border-border/60 hover:bg-secondary/40">
                    <td className="px-3 py-1.5 font-semibold tabular-nums">{w.sym}</td>
                    <td className="px-3 py-1.5 text-muted-foreground">{w.name}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums">{w.price.toFixed(2)}</td>
                    <td className={`px-3 py-1.5 text-right tabular-nums ${pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}`}>{pos ? "+" : ""}{w.chg.toFixed(2)}%</td>
                    <td className="px-3 py-1.5">
                      <Pill tone={w.sent === "Bullish" ? "pos" : w.sent === "Bearish" ? "neg" : "neutral"}>{w.sent}</Pill>
                    </td>
                    <td className="px-3 py-1.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <span className="tabular-nums">{w.rs}</span>
                        <div className="w-10"><Bar value={w.rs} color={w.rs >= 70 ? "var(--color-pos)" : w.rs >= 40 ? "var(--color-warn)" : "var(--color-neg)"} /></div>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-muted-foreground">{w.vol}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <Panel title="Session Status" bodyClassName="p-0">
          <ul className="divide-y divide-border/60">
            {sessions.map((s) => (
              <li key={s.mkt} className="flex items-center gap-3 px-3 py-2">
                <span className={s.open ? "text-[var(--color-pos)]" : "text-muted-foreground"}>
                  <span className={`inline-block size-1.5 rounded-full ${s.open ? "bg-[var(--color-pos)] live-dot" : "bg-muted-foreground"}`} />
                </span>
                <div className="flex-1">
                  <div className="text-[12px] font-medium">{s.mkt}</div>
                  <div className="text-[10px] text-muted-foreground tabular-nums">{s.ctd} · {s.tz}</div>
                </div>
                <Pill tone={s.open ? "pos" : "neutral"}>{s.open ? "OPEN" : "CLOSED"}</Pill>
                <span className="text-[10px] text-muted-foreground w-12 text-right">{s.liq}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* SECTION 7 — Journal preview */}
      <Panel
        title="Journal · Today"
        right={
          <a href="/journal" className="text-[10px] text-primary inline-flex items-center gap-1 hover:underline">
            Open journal <ChevronRight className="size-3" />
          </a>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="size-3" />Today's Plan</div>
            <p className="text-[12px] leading-snug">Trade SPY breakout above 532.50 with stops at 530. Avoid pre-Fed exposure after 13:30.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Gauge className="size-3" />Thesis</div>
            <p className="text-[12px] leading-snug">Dealers long gamma supports range; CPI miss could trigger reflexive squeeze in semis.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="size-3" />Notes</div>
            <p className="text-[12px] leading-snug">IWM lagging signals breadth caution. Keep size at 0.5R until breakout confirmed.</p>
          </div>
          <div className="md:border-l md:border-border/70 md:pl-3">
            <div className="text-[10px] uppercase tracking-wider text-primary mb-1 flex items-center gap-1"><Sparkles className="size-3" />AI Recap · Yesterday</div>
            <p className="text-[12px] leading-snug text-foreground/90">Execution score 82/100. Held NVDA winner to plan; oversized TSLA fade reduced PF to 1.6.</p>
            <div className="mt-1.5 flex items-center gap-2"><Bar value={82} color="var(--color-pos)" /><span className="text-[10px] tabular-nums">82</span></div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
