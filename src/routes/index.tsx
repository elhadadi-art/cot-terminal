import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Sparkles, ArrowUpRight, Flame, TrendingUp, TrendingDown, Activity, Zap, Brain, Eye,
  AlertTriangle, ChevronRight, Radio, Gauge, Droplets, Bitcoin, DollarSign, BarChart3,
} from "lucide-react";
import { Panel, Pill, Spark, ProgressRing, Bar } from "@/components/marketiq/primitives";
import { heatmapSP } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { marketQueries } from "@/lib/market.queries";
import type {
  AiSignalDTO, CryptoAssetDTO, EconomicEventDTO, ForexPairDTO, FuturesMarketDTO,
  HomepageSnapshotDTO, InsiderTradeDTO, MarketBreadthDTO, MarketIndexDTO, MarketNewsDTO,
  StockDTO,
} from "@/lib/market.types";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(marketQueries.homepage()),
  errorComponent: HomeErrorComponent,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Not found.</div>,
  head: () => ({
    meta: [
      { title: "Marketiq Terminal — Institutional AI Trading Dashboard" },
      { name: "description", content: "Finviz-style institutional terminal: market overview, heatmap, signals, calendar, insider flow, AI intelligence." },
      { property: "og:title", content: "Marketiq Terminal" },
      { property: "og:description", content: "AI-native institutional market dashboard." },
    ],
  }),
});

function HomeErrorComponent({ error }: { error: Error }) {
  return (
    <div className="p-8">
      <h2 className="text-base font-semibold mb-2">Failed to load market snapshot</h2>
      <p className="text-xs text-muted-foreground">{error.message}</p>
    </div>
  );
}

/* ================== Helpers ================== */

function mkSeries(seed: number, up = true) {
  const arr: number[] = [];
  let v = 50;
  for (let i = 0; i < 40; i++) {
    const r = Math.sin(seed + i * 0.7) * 4 + Math.cos(seed * 2 + i) * 3;
    v += r + (up ? 0.4 : -0.3);
    arr.push(v);
  }
  return arr;
}

function fmtVol(v: number | null | undefined): string {
  const n = Number(v ?? 0);
  if (!isFinite(n) || n === 0) return "—";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toFixed(0);
}

function fmtMoney(v: number | null | undefined): string {
  const n = Number(v ?? 0);
  if (!isFinite(n) || n === 0) return "—";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  } catch { return iso; }
}

function fmtTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

type MoverRow = { sym: string; price: number; pct: number; vol: string; sig: string };
function stockToMover(s: StockDTO, sig: string): MoverRow {
  return { sym: s.symbol, price: s.price, pct: s.changePercent, vol: fmtVol(s.volume), sig };
}

const techSignals = [
  { type: "Breakout",   sym: "AVGO", note: "Above 1,792 · vol 2.4x avg", tone: "pos" as const },
  { type: "Breakout",   sym: "NVDA", note: "Cup & handle target 940",    tone: "pos" as const },
  { type: "Oversold",   sym: "PFE",  note: "RSI(14) 24 · bounce zone",   tone: "warn" as const },
  { type: "Overbought", sym: "MLGO", note: "RSI(14) 86 · exhaustion",    tone: "neg" as const },
  { type: "Momentum",   sym: "META", note: "ADX 38 · trend strong",      tone: "pos" as const },
  { type: "Vol Spike",  sym: "HCWB", note: "+122% on 149M shares",       tone: "warn" as const },
  { type: "Oversold",   sym: "BAC",  note: "RSI 28 · daily reversal",    tone: "warn" as const },
];

const patternSignals = [
  { pattern: "Bull Flag",          sym: "CRM",  note: "Pole 8.4% · pivot 304",        tone: "pos" as const },
  { pattern: "Inverse H&S",        sym: "AMD",  note: "Neckline 168 · target 184",    tone: "pos" as const },
  { pattern: "Ascending Triangle", sym: "ORCL", note: "Apex 195 · 4 touches",         tone: "pos" as const },
  { pattern: "Rising Wedge",       sym: "TSLA", note: "Distribution risk",            tone: "neg" as const },
  { pattern: "Head & Shoulders",   sym: "PYPL", note: "Right shoulder forming",       tone: "neg" as const },
  { pattern: "Falling Wedge",      sym: "DIS",  note: "Compression · breakout watch", tone: "warn" as const },
  { pattern: "Cup & Handle",       sym: "NVDA", note: "Handle 8 sessions",            tone: "pos" as const },
];

/* ================== Page ================== */

function HomePage() {
  const { data } = useSuspenseQuery(marketQueries.homepage());
  const snap: HomepageSnapshotDTO = data;

  const gainers = snap.topGainers.map((s) => stockToMover(s, "Top Gainer"));
  const losers = snap.topLosers.map((s) => stockToMover(s, "Top Loser"));
  const active = snap.mostActive.map((s) => stockToMover(s, "Most Active"));

  const aiBuy = snap.signals.filter((s) => /buy|long|bull/i.test(s.signalType)).slice(0, 6);
  const aiSell = snap.signals.filter((s) => /sell|short|bear/i.test(s.signalType)).slice(0, 6);

  const insiderBuys = snap.insiders.filter((t) => /buy/i.test(t.transactionType)).slice(0, 6);
  const insiderSells = snap.insiders.filter((t) => /sell/i.test(t.transactionType)).slice(0, 6);

  const unusual = snap.mostActive.slice(0, 4).map((s) => stockToMover(s, "Unusual Vol"));

  const tickerHeadlines = snap.news.slice(0, 10).map((n) => n.title);

  return (
    <div className="space-y-3">
      <PromoBar />
      <NewsTicker headlines={tickerHeadlines} />
      <IndexCards indices={snap.indices} />
      <BreadthRow breadth={snap.breadth} />

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-3 space-y-3">
          <MoverTable title="Top Gainers" icon={TrendingUp} tone="pos" rows={gainers} />
          <MoverTable title="Top Losers"  icon={TrendingDown} tone="neg" rows={losers} />
          <MoverTable title="Most Active" icon={Activity} tone="primary" rows={active} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Heatmap />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <NewsPanel news={snap.news.slice(0, 8)} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <AISignalTable title="AI Buy Signals" icon={Brain} tone="pos" rows={aiBuy} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <AISignalTable title="AI Sell Signals" icon={Brain} tone="neg" rows={aiSell} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <SignalsList title="Technical Signals" icon={Zap}
            rows={techSignals.map((s) => ({ left: s.type, sym: s.sym, note: s.note, tone: s.tone }))} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <SignalsList title="Pattern Detection" icon={Eye}
            rows={patternSignals.map((s) => ({ left: s.pattern, sym: s.sym, note: s.note, tone: s.tone }))} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-4">
          <MoverTable title="Unusual Volume" icon={AlertTriangle} tone="warn" rows={unusual} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <EconCalendar events={snap.events} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <InsiderTable title="Latest Insider Buying" tone="pos" rows={insiderBuys} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <InsiderTable title="Latest Insider Selling" tone="neg" rows={insiderSells} />
        </div>
      </div>

      <GlobalMarkets futures={snap.futures} forex={snap.forex} crypto={snap.crypto} />
      <AIAnalysis breadth={snap.breadth} />
      <Footer />
    </div>
  );
}

/* ================== Components ================== */

function PromoBar() {
  return (
    <div className="flex items-center gap-2 h-8 px-3 rounded-sm border border-accent/30 bg-gradient-to-r from-accent/15 via-primary/10 to-transparent">
      <Sparkles className="size-3 text-accent" />
      <span className="text-[11px] font-medium tracking-wide">
        <span className="text-accent">New AI Feature</span>
        <span className="text-muted-foreground"> · Institutional Flow Detection now live across 4,200 tickers</span>
      </span>
      <button className="ml-auto inline-flex items-center gap-1 h-6 px-2 rounded-sm bg-accent/20 text-accent text-[10px] font-semibold tracking-wider hover:bg-accent/30 transition-colors">
        LEARN MORE <ArrowUpRight className="size-3" />
      </button>
    </div>
  );
}

function NewsTicker({ headlines }: { headlines: string[] }) {
  const items = headlines.length > 0 ? headlines : ["Markets open · awaiting data feed…"];
  return (
    <div className="relative overflow-hidden rounded-sm border border-border/70 glass h-9 flex items-center">
      <div className="shrink-0 flex items-center gap-1.5 px-3 h-full border-r border-border/70 bg-[var(--color-pos)]/10">
        <Radio className="size-3 text-[var(--color-pos)] live-dot" />
        <span className="text-[10px] font-semibold tracking-widest text-[var(--color-pos)]">LIVE</span>
      </div>
      <div className="flex-1 overflow-hidden group">
        <div className="flex items-center gap-8 whitespace-nowrap animate-[ticker_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="text-[11px] text-foreground/90 inline-flex items-center gap-2">
              <span className={cn("size-1.5 rounded-full", i % 3 === 1 ? "bg-[var(--color-neg)]" : "bg-[var(--color-pos)]")} />
              {t}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function MiniChart({ data, color, height = 64 }: { data: number[]; color: string; height?: number }) {
  const series = data.length > 1 ? data : mkSeries(1, true);
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const w = 320;
  const step = w / (series.length - 1);
  const pts = series.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`);
  const d = `M${pts.join(" L")}`;
  const safe = color.replace(/[^a-z]/gi, "");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="block w-full" style={{ height }}>
      <defs>
        <linearGradient id={`g-${safe}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <pattern id={`grid-${safe}`} width="32" height="16" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 16" fill="none" stroke="var(--color-grid)" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
      <rect width={w} height={height} fill={`url(#grid-${safe})`} />
      <path d={`${d} L${w},${height} L0,${height} Z`} fill={`url(#g-${safe})`} />
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

function IndexCards({ indices }: { indices: MarketIndexDTO[] }) {
  if (indices.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {indices.map((idx, i) => {
        const pos = idx.changePercent >= 0;
        const color = pos ? "var(--color-pos)" : "var(--color-neg)";
        const series = idx.spark.length > 1 ? idx.spark : mkSeries(i * 3.7, pos);
        return (
          <Panel key={idx.id} bodyClassName="p-0">
            <div className="px-3 pt-2.5 pb-1.5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{idx.symbol}</span>
                  <span className="text-[9px] text-muted-foreground/70">{fmtDate(idx.updatedAt)}</span>
                </div>
                <div className="text-[22px] font-semibold tabular-nums leading-none mt-1">
                  {idx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="text-right">
                <div className={cn("text-[12px] font-semibold tabular-nums", pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]")}>
                  {pos ? "+" : ""}{idx.change.toFixed(2)}
                </div>
                <div className={cn("text-[11px] tabular-nums", pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]")}>
                  ({pos ? "+" : ""}{idx.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
            <MiniChart data={series} color={color} height={72} />
            <div className="px-3 py-1.5 border-t border-border/70 flex items-center justify-between text-[10px] tabular-nums text-muted-foreground">
              <span>VOL <span className="text-foreground">{fmtVol(idx.volume)}</span></span>
              <span>{idx.name}</span>
              <Pill tone="pos">OPEN</Pill>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

function BreadthRow({ breadth }: { breadth: MarketBreadthDTO | null }) {
  if (!breadth) {
    return <div className="text-[10px] text-muted-foreground px-1">Breadth data unavailable.</div>;
  }
  const total = breadth.advancing + breadth.declining || 1;
  const totalHL = breadth.newHighs + breadth.newLows || 1;
  const totalSMA = breadth.aboveSma50 + breadth.belowSma50 || 1;
  const rows = [
    { label: "Advancing",   value: breadth.advancing,   pct: +(breadth.advancing / total * 100).toFixed(1),   tone: "pos" as const },
    { label: "Declining",   value: breadth.declining,   pct: +(breadth.declining / total * 100).toFixed(1),   tone: "neg" as const },
    { label: "New Highs",   value: breadth.newHighs,    pct: +(breadth.newHighs / totalHL * 100).toFixed(1),  tone: "pos" as const },
    { label: "New Lows",    value: breadth.newLows,     pct: +(breadth.newLows / totalHL * 100).toFixed(1),   tone: "neg" as const },
    { label: "Above SMA50", value: breadth.aboveSma50,  pct: +(breadth.aboveSma50 / totalSMA * 100).toFixed(1), tone: "pos" as const },
    { label: "Below SMA50", value: breadth.belowSma50,  pct: +(breadth.belowSma50 / totalSMA * 100).toFixed(1), tone: "warn" as const },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
      {rows.map((b) => {
        const color = b.tone === "pos" ? "var(--color-pos)" : b.tone === "neg" ? "var(--color-neg)" : "var(--color-warn)";
        return (
          <div key={b.label} className="glass rounded-sm px-2.5 py-2 border border-border/70">
            <div className="flex items-center justify-between text-[9px] tracking-widest uppercase text-muted-foreground">
              <span>{b.label}</span>
              <span style={{ color }}>{b.pct}%</span>
            </div>
            <div className="text-[15px] font-semibold tabular-nums mt-0.5" style={{ color }}>{b.value.toLocaleString()}</div>
            <div className="mt-1"><Bar value={b.pct} color={color} /></div>
          </div>
        );
      })}
      <FearGreed value={breadth.fearGreedIndex} vix={breadth.vix} />
    </div>
  );
}

function FearGreed({ value, vix }: { value: number; vix: number | null }) {
  const label = value >= 75 ? "Extreme Greed" : value >= 55 ? "Greed" : value >= 45 ? "Neutral" : value >= 25 ? "Fear" : "Extreme Fear";
  return (
    <div className="glass rounded-sm px-2.5 py-2 border border-accent/40 flex items-center gap-2">
      <ProgressRing value={value} size={42} stroke={4} color="var(--color-accent)" label="F&G" />
      <div className="leading-tight">
        <div className="text-[9px] tracking-widest uppercase text-muted-foreground">Fear / Greed</div>
        <div className="text-[12px] font-semibold text-accent">{label}</div>
        <div className="text-[9px] text-muted-foreground tabular-nums">VIX {vix?.toFixed(2) ?? "—"}</div>
      </div>
    </div>
  );
}

function MoverTable({ title, icon: Icon, tone, rows }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "pos" | "neg" | "primary" | "warn";
  rows: MoverRow[];
}) {
  const toneVar =
    tone === "pos" ? "var(--color-pos)" :
    tone === "neg" ? "var(--color-neg)" :
    tone === "warn" ? "var(--color-warn)" :
    "var(--color-primary)";
  return (
    <Panel
      title={<span className="inline-flex items-center gap-1.5" style={{ color: toneVar }}><Icon className="size-3" /> <span className="text-muted-foreground">{title}</span></span>}
      right={<button className="text-[9px] tracking-widest text-muted-foreground hover:text-foreground">VIEW ALL</button>}
      bodyClassName="p-0"
    >
      <table className="w-full text-[11px]">
        <thead className="bg-secondary/40">
          <tr className="text-[9px] uppercase tracking-wider text-muted-foreground">
            <th className="text-left px-2 py-1">Sym</th>
            <th className="text-right px-2 py-1">Last</th>
            <th className="text-right px-2 py-1">%</th>
            <th className="text-right px-2 py-1">Vol</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={4} className="px-2 py-3 text-center text-[10px] text-muted-foreground">No data</td></tr>
          )}
          {rows.map((r) => {
            const pos = r.pct >= 0;
            return (
              <tr key={r.sym} className="border-t border-border/60 hover:bg-secondary/50 transition-colors">
                <td className="px-2 py-1 font-semibold tabular-nums">{r.sym}</td>
                <td className="px-2 py-1 text-right tabular-nums">{r.price.toFixed(2)}</td>
                <td className={cn("px-2 py-1 text-right tabular-nums font-medium", pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]")}>
                  {pos ? "+" : ""}{r.pct.toFixed(2)}%
                </td>
                <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">{r.vol}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}

/* ----- Heatmap (kept as static mock — sector data not in DB yet) ----- */

function Heatmap() {
  const sectors = React.useMemo(() => {
    const map = new Map<string, typeof heatmapSP[number][]>();
    heatmapSP.forEach((t) => {
      if (!map.has(t.sec)) map.set(t.sec, []);
      map.get(t.sec)!.push(t);
    });
    return Array.from(map.entries())
      .map(([sec, items]) => ({ sec, items: [...items].sort((a, b) => b.cap - a.cap), total: items.reduce((s, i) => s + i.cap, 0) }))
      .sort((a, b) => b.total - a.total);
  }, []);

  return (
    <Panel
      title={<span className="inline-flex items-center gap-1.5"><LayoutGridIcon /> S&P 500 Heatmap · % Change</span>}
      right={
        <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[var(--color-neg)]" /> -2%+</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-muted" /> 0</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[var(--color-pos)]" /> +2%+</span>
        </div>
      }
      bodyClassName="p-2"
    >
      <div className="grid grid-cols-12 gap-1.5" style={{ gridAutoRows: "minmax(40px, auto)" }}>
        {sectors.map((s) => {
          const colSpan = Math.max(3, Math.min(12, Math.round((s.total / 110) * 12)));
          return (
            <div key={s.sec} className="rounded-sm border border-border/60 p-1 bg-background/40" style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}>
              <div className="text-[9px] tracking-widest uppercase text-muted-foreground mb-1 px-0.5">{s.sec}</div>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(6, s.items.length)}, minmax(0,1fr))` }}>
                {s.items.map((t) => {
                  const intensity = Math.min(1, Math.abs(t.chg) / 2.5);
                  const bg = t.chg >= 0
                    ? `color-mix(in oklab, var(--color-pos) ${20 + intensity * 60}%, var(--color-card))`
                    : `color-mix(in oklab, var(--color-neg) ${20 + intensity * 60}%, var(--color-card))`;
                  const size = Math.max(28, Math.min(72, t.cap * 6));
                  return (
                    <div
                      key={t.sym}
                      className="rounded-[2px] px-1 py-1 flex flex-col justify-between cursor-pointer hover:ring-1 hover:ring-primary/60 hover:z-10 transition-all"
                      style={{ background: bg, minHeight: size }}
                      title={`${t.name} · ${t.chg > 0 ? "+" : ""}${t.chg}%`}
                    >
                      <div className="text-[10px] font-bold leading-none text-white/95">{t.sym}</div>
                      <div className="text-[9px] tabular-nums leading-none text-white/85">{t.chg > 0 ? "+" : ""}{t.chg.toFixed(2)}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function LayoutGridIcon() {
  return <span className="inline-block size-2.5 rounded-[1px] bg-primary shadow-[0_0_6px_var(--color-primary)]" />;
}

/* ----- News panel ----- */

function NewsPanel({ news }: { news: MarketNewsDTO[] }) {
  return (
    <Panel
      title="Major Market News"
      right={<span className="text-[9px] text-[var(--color-pos)] ring-dot">LIVE</span>}
      bodyClassName="p-0"
      className="h-full"
    >
      <ul className="divide-y divide-border/60">
        {news.length === 0 && (
          <li className="px-3 py-4 text-center text-[10px] text-muted-foreground">No headlines</li>
        )}
        {news.map((n) => {
          const tone: "pos" | "neg" | "neutral" =
            n.sentiment === "bullish" ? "pos" : n.sentiment === "bearish" ? "neg" : "neutral";
          return (
            <li key={n.id} className="px-3 py-2 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between mb-0.5">
                <Pill tone={tone}>{n.category ?? n.source}</Pill>
                <span className="text-[9px] text-muted-foreground tabular-nums">{fmtTime(n.publishedAt)}</span>
              </div>
              <div className="text-[11px] leading-snug font-medium text-foreground/95">{n.title}</div>
              {n.summary && (
                <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{n.summary}</div>
              )}
              {n.impact && (
                <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: tone === "pos" ? "var(--color-pos)" : tone === "neg" ? "var(--color-neg)" : "var(--color-muted-foreground)" }}>
                  {n.impact}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ----- AI signals ----- */

function AISignalTable({ title, icon: Icon, tone, rows }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "pos" | "neg";
  rows: AiSignalDTO[];
}) {
  const toneVar = tone === "pos" ? "var(--color-pos)" : "var(--color-neg)";
  return (
    <Panel
      title={<span className="inline-flex items-center gap-1.5"><Icon className="size-3 text-accent" /> {title}</span>}
      right={<Pill tone="primary"><Sparkles className="size-2.5" /> AI</Pill>}
      bodyClassName="p-0"
    >
      <table className="w-full text-[11px]">
        <thead className="bg-secondary/40">
          <tr className="text-[9px] uppercase tracking-wider text-muted-foreground">
            <th className="text-left px-2 py-1">Sym</th>
            <th className="text-left px-2 py-1 w-1/2">Trigger</th>
            <th className="text-left px-2 py-1">Conf</th>
            <th className="text-right px-2 py-1">Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={4} className="px-2 py-3 text-center text-[10px] text-muted-foreground">No signals</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1.5 font-semibold tabular-nums" style={{ color: toneVar }}>{r.symbol}</td>
              <td className="px-2 py-1.5 text-foreground/90">{r.triggerNote ?? r.signalType}</td>
              <td className="px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-[10px] w-7">{Math.round(r.confidence)}%</span>
                  <div className="w-12"><Bar value={r.confidence} color="var(--color-accent)" /></div>
                </div>
              </td>
              <td className="px-2 py-1.5 text-right tabular-nums font-medium">{r.score?.toFixed(2) ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ----- Signal lists ----- */

function SignalsList({ title, icon: Icon, rows }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: { left: string; sym: string; note: string; tone: "pos" | "neg" | "warn" }[];
}) {
  return (
    <Panel
      title={<span className="inline-flex items-center gap-1.5"><Icon className="size-3 text-primary" /> {title}</span>}
      bodyClassName="p-0"
    >
      <ul className="divide-y divide-border/60">
        {rows.map((r, i) => {
          const c = r.tone === "pos" ? "var(--color-pos)" : r.tone === "neg" ? "var(--color-neg)" : "var(--color-warn)";
          return (
            <li key={i} className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary/40">
              <span className="text-[10px] tracking-widest uppercase font-semibold w-32 truncate" style={{ color: c }}>{r.left}</span>
              <span className="text-[11px] font-semibold tabular-nums w-14">{r.sym}</span>
              <span className="text-[10px] text-muted-foreground flex-1 truncate">{r.note}</span>
              <ChevronRight className="size-3 text-muted-foreground/60" />
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ----- Calendar ----- */

function EconCalendar({ events }: { events: EconomicEventDTO[] }) {
  return (
    <Panel
      title="Economic Calendar · Upcoming"
      right={<Link to="/calendar" className="text-[9px] tracking-widest text-primary hover:underline">FULL WEEK →</Link>}
      bodyClassName="p-0"
    >
      <table className="w-full text-[11px]">
        <thead className="bg-secondary/40">
          <tr className="text-[9px] uppercase tracking-wider text-muted-foreground">
            <th className="text-left px-2 py-1">Time</th>
            <th className="text-left px-2 py-1">Ctry</th>
            <th className="text-left px-2 py-1">Imp</th>
            <th className="text-left px-2 py-1">Event</th>
            <th className="text-right px-2 py-1">Actual</th>
            <th className="text-right px-2 py-1">Forecast</th>
            <th className="text-right px-2 py-1">Previous</th>
            <th className="text-left px-2 py-1">AI</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr><td colSpan={8} className="px-2 py-3 text-center text-[10px] text-muted-foreground">No events</td></tr>
          )}
          {events.map((e) => (
            <tr key={e.id} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1 tabular-nums text-muted-foreground">{fmtTime(e.eventTime)}</td>
              <td className="px-2 py-1">
                {e.flag && <span className="mr-1">{e.flag}</span>}
                <span className="text-[10px] text-muted-foreground">{e.country}</span>
              </td>
              <td className="px-2 py-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={cn("h-3 w-1 rounded-[1px]",
                      n <= e.impact
                        ? (e.impact === 3 ? "bg-[var(--color-neg)]" : e.impact === 2 ? "bg-[var(--color-warn)]" : "bg-muted-foreground/60")
                        : "bg-muted")} />
                  ))}
                </div>
              </td>
              <td className="px-2 py-1 text-foreground/90">{e.eventName}</td>
              <td className="px-2 py-1 text-right tabular-nums font-semibold">{e.actual ?? "—"}</td>
              <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">{e.forecast ?? "—"}</td>
              <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">{e.previous ?? "—"}</td>
              <td className="px-2 py-1 text-[10px] text-accent">{e.aiNote ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ----- Insider ----- */

function InsiderTable({ title, rows, tone }: {
  title: string;
  tone: "pos" | "neg";
  rows: InsiderTradeDTO[];
}) {
  const toneVar = tone === "pos" ? "var(--color-pos)" : "var(--color-neg)";
  return (
    <Panel
      title={<span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full" style={{ background: toneVar, boxShadow: `0 0 6px ${toneVar}` }} /> {title}</span>}
      bodyClassName="p-0"
    >
      <table className="w-full text-[11px]">
        <thead className="bg-secondary/40">
          <tr className="text-[9px] uppercase tracking-wider text-muted-foreground">
            <th className="text-left px-2 py-1">Sym</th>
            <th className="text-left px-2 py-1">Insider</th>
            <th className="text-left px-2 py-1">Role</th>
            <th className="text-left px-2 py-1">Date</th>
            <th className="text-right px-2 py-1">Cost</th>
            <th className="text-right px-2 py-1">Shares</th>
            <th className="text-right px-2 py-1">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={7} className="px-2 py-3 text-center text-[10px] text-muted-foreground">No trades</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1.5 font-semibold tabular-nums" style={{ color: toneVar }}>{r.symbol}</td>
              <td className="px-2 py-1.5 truncate max-w-[140px]">{r.insiderName}</td>
              <td className="px-2 py-1.5 text-muted-foreground">{r.role ?? "—"}</td>
              <td className="px-2 py-1.5 text-muted-foreground tabular-nums">{fmtDate(r.transactionDate)}</td>
              <td className="px-2 py-1.5 text-right tabular-nums">{r.price?.toFixed(2) ?? "—"}</td>
              <td className="px-2 py-1.5 text-right tabular-nums text-muted-foreground">{r.shares.toLocaleString()}</td>
              <td className="px-2 py-1.5 text-right tabular-nums font-semibold">{fmtMoney(r.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ----- Globals ----- */

type GlobalRow = { name: string; sym: string; v: number; c: number; pos: boolean; spark: number[]; icon: React.ComponentType<{ className?: string }> };

function iconForFutures(sym: string) {
  if (/CL|WTI|BRENT/i.test(sym)) return Droplets;
  if (/NG|GAS/i.test(sym)) return Flame;
  return BarChart3;
}
function iconForCrypto(sym: string) {
  return Bitcoin;
}

function GlobalMarkets({ futures, forex, crypto }: {
  futures: FuturesMarketDTO[]; forex: ForexPairDTO[]; crypto: CryptoAssetDTO[];
}) {
  const rows: GlobalRow[] = [
    ...futures.map((f, i): GlobalRow => ({
      name: f.name, sym: f.symbol, v: f.price, c: f.changePercent,
      pos: f.changePercent >= 0, spark: f.spark.length > 1 ? f.spark : mkSeries(i * 1.1, f.changePercent >= 0),
      icon: iconForFutures(f.symbol),
    })),
    ...forex.map((p, i): GlobalRow => ({
      name: p.pair, sym: p.pair, v: p.price, c: p.changePercent,
      pos: p.changePercent >= 0, spark: p.spark.length > 1 ? p.spark : mkSeries(i * 1.3 + 7, p.changePercent >= 0),
      icon: DollarSign,
    })),
    ...crypto.map((c, i): GlobalRow => ({
      name: c.name, sym: c.symbol, v: c.price, c: c.changePercent,
      pos: c.changePercent >= 0, spark: c.spark.length > 1 ? c.spark : mkSeries(i * 1.7 + 13, c.changePercent >= 0),
      icon: iconForCrypto(c.symbol),
    })),
  ];

  return (
    <Panel
      title="Global Markets · Commodities · FX · Crypto"
      right={<span className="text-[9px] text-muted-foreground tabular-nums">delayed 15s</span>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {rows.length === 0 && (
          <div className="col-span-full text-center text-[10px] text-muted-foreground py-2">No global market data</div>
        )}
        {rows.map((g) => {
          const color = g.pos ? "var(--color-pos)" : "var(--color-neg)";
          const Icon = g.icon;
          return (
            <div key={`${g.sym}-${g.name}`} className="rounded-sm border border-border/70 bg-background/30 px-2 py-1.5 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-semibold tracking-wide truncate">{g.name}</span>
                </div>
                <span className="text-[9px] tabular-nums text-muted-foreground">{g.sym}</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <div>
                  <div className="text-[13px] font-semibold tabular-nums leading-none">
                    {g.v.toLocaleString(undefined, { minimumFractionDigits: g.v < 10 ? 4 : 2, maximumFractionDigits: g.v < 10 ? 4 : 2 })}
                  </div>
                  <div className="text-[10px] tabular-nums mt-0.5" style={{ color }}>
                    {g.pos ? "+" : ""}{g.c.toFixed(2)}%
                  </div>
                </div>
                <Spark data={g.spark} color={color} width={70} height={24} />
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ----- AI Analysis ----- */

function AIAnalysis({ breadth }: { breadth: MarketBreadthDTO | null }) {
  const fg = breadth?.fearGreedIndex ?? 50;
  const regime = fg >= 60 ? "Risk-On" : fg >= 40 ? "Neutral" : "Risk-Off";
  const regimeTone: "pos" | "warn" | "neg" = fg >= 60 ? "pos" : fg >= 40 ? "warn" : "neg";
  return (
    <div className="relative rounded-sm border border-accent/30 overflow-hidden glass">
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 15% 20%, oklch(0.72 0.17 300 / 0.25), transparent 50%), radial-gradient(circle at 90% 80%, oklch(0.72 0.17 240 / 0.22), transparent 55%)" }}
      />
      <div className="relative p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="size-4 text-accent" />
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-accent">Marketiq AI Intelligence</div>
              <div className="text-[14px] font-semibold">Institutional Flow & Regime Detection</div>
            </div>
          </div>
          <Pill tone="primary"><Sparkles className="size-2.5" /> NEURAL v4</Pill>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <AIBlock label="AI Sentiment" value={`${fg} / 100`} tone={regimeTone} hint="Fear & Greed" rings={<ProgressRing value={fg} size={44} stroke={4} color="var(--color-accent)" label="" />} />
          <AIBlock label="Market Regime" value={regime} tone={regimeTone} hint={`VIX ${breadth?.vix?.toFixed(2) ?? "—"}`} rings={<Gauge className={cn("size-9", regimeTone === "pos" ? "text-[var(--color-pos)]" : regimeTone === "warn" ? "text-[var(--color-warn)]" : "text-[var(--color-neg)]")} />} />
          <AIBlock label="Smart Money" value="Accumulating" tone="pos" hint="Block prints +$2.4B 5d" rings={<TrendingUp className="size-9 text-[var(--color-pos)]" />} />
          <AIBlock label="Sector Rotation" value="Tech ▶ Semis" tone="primary" hint="From Staples, Utilities" rings={<Activity className="size-9 text-primary" />} />
          <AIBlock label="Institutional Act." value="Elevated" tone="warn" hint="Dark pool 41% vs 28% avg" rings={<Eye className="size-9 text-[var(--color-warn)]" />} />
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-sm border border-border/60 bg-background/40 p-2.5">
            <div className="text-[9px] tracking-widest uppercase text-accent mb-1">Top Conviction</div>
            <div>NVDA · AVGO breakout confluence with positive gamma above 925/1790.</div>
          </div>
          <div className="rounded-sm border border-border/60 bg-background/40 p-2.5">
            <div className="text-[9px] tracking-widest uppercase text-accent mb-1">Risk Watch</div>
            <div>FOMC minutes 14:00 ET · Term structure compression in VIX futures.</div>
          </div>
          <div className="rounded-sm border border-border/60 bg-background/40 p-2.5">
            <div className="text-[9px] tracking-widest uppercase text-accent mb-1">Hedge Idea</div>
            <div>QQQ 458/452 1×2 put spread · 0.18 delta · cost 0.42.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIBlock({ label, value, hint, tone, rings }: { label: string; value: string; hint: string; tone: "pos" | "neg" | "warn" | "primary"; rings: React.ReactNode }) {
  const c = tone === "pos" ? "text-[var(--color-pos)]" : tone === "neg" ? "text-[var(--color-neg)]" : tone === "warn" ? "text-[var(--color-warn)]" : "text-primary";
  return (
    <div className="rounded-sm border border-border/60 bg-background/40 p-2.5 flex items-center gap-3">
      <div className="shrink-0">{rings}</div>
      <div className="min-w-0">
        <div className="text-[9px] tracking-widest uppercase text-muted-foreground">{label}</div>
        <div className={cn("text-[13px] font-semibold truncate", c)}>{value}</div>
        <div className="text-[10px] text-muted-foreground truncate">{hint}</div>
      </div>
    </div>
  );
}

/* ----- Footer ----- */

function Footer() {
  const links = ["About", "Careers", "API", "Documentation", "Contact", "Terms", "Privacy"];
  return (
    <footer className="mt-4 border-t border-border/70 pt-3 pb-1 flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <Sparkles className="size-3 text-primary" />
        <span>© 2026 Marketiq Terminal · Institutional AI · Data delayed 15s for NYSE / NASDAQ / AMEX</span>
      </div>
      <nav className="flex flex-wrap items-center gap-3 text-[10px]">
        {links.map((l) => (
          <a key={l} href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
        ))}
      </nav>
    </footer>
  );
}