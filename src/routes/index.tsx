import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Sparkles, ArrowUpRight, Flame, TrendingUp, TrendingDown, Activity, Zap, Brain, Eye, AlertTriangle, ChevronRight, Radio, Gauge, Droplets, Bitcoin, DollarSign, BarChart3 } from "lucide-react";
import { Panel, Stat, Pill, Spark, ProgressRing, Bar } from "@/components/marketiq/primitives";
import { heatmapSP } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { marketQueries } from "@/lib/market.queries";
import type {
  AiSignalDTO,
  CryptoAssetDTO,
  EconomicEventDTO,
  ForexPairDTO,
  FuturesMarketDTO,
  HomepageSnapshotDTO,
  InsiderTradeDTO,
  MarketBreadthDTO,
  MarketIndexDTO,
  MarketNewsDTO,
  StockDTO,
} from "@/lib/market.types";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(marketQueries.homepage()),
  errorComponent: HomeErrorComponent,
  notFoundComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">Not found.</div>
  ),
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

/* ================== Mock data ================== */

const indicesData = [
  { sym: "DOW",     name: "Dow Jones 30",  price: 49992.45, chg: 569.07,  pct: 1.15,  vol: "412M",  high: 50012, low: 49423 },
  { sym: "NASDAQ",  name: "Nasdaq 100",    price: 26200.10, chg: 329.29,  pct: 1.27,  vol: "5.2B",  high: 26241, low: 25871 },
  { sym: "S&P 500", name: "S&P 500",       price:  7420.17, chg:  66.56,  pct: 0.91,  vol: "3.8B",  high:  7438, low:  7353 },
];

function mkSeries(seed: number, up = true) {
  const arr: number[] = [];
  let v = 50;
  for (let i = 0; i < 40; i++) {
    const r = Math.sin(seed + i * 0.7) * 4 + (Math.cos(seed * 2 + i) * 3);
    v += r + (up ? 0.4 : -0.3);
    arr.push(v);
  }
  return arr;
}

const breadth = [
  { label: "Advancing",   value: 3847, pct: 68.8, tone: "pos" as const },
  { label: "Declining",   value: 1550, pct: 27.7, tone: "neg" as const },
  { label: "New Highs",   value:  140, pct: 41.7, tone: "pos" as const },
  { label: "New Lows",    value:  196, pct: 58.3, tone: "neg" as const },
  { label: "Above SMA50", value: 2849, pct: 51.1, tone: "pos" as const },
  { label: "Below SMA50", value: 2722, pct: 48.9, tone: "warn" as const },
];

const gainers = [
  { sym: "HCWB", price:  2.36, pct: 122.63, vol: "149.08M", sig: "Top Gainer" },
  { sym: "MWC",  price:  8.76, pct:  85.60, vol:  "36.85M", sig: "Top Gainer" },
  { sym: "GCL",  price:  0.77, pct:  77.69, vol: "101.84M", sig: "Top Gainer" },
  { sym: "SLXN", price:  0.47, pct:  75.13, vol: "306.86M", sig: "Top Gainer" },
  { sym: "MTVA", price:  2.82, pct:  50.02, vol:  "51.28M", sig: "Top Gainer" },
  { sym: "MLGO", price:  5.71, pct:  49.03, vol:   "2.36M", sig: "Top Gainer" },
];

const losers = [
  { sym: "LICN", price:  1.06, pct: -62.54, vol:   "2.54M", sig: "Top Loser" },
  { sym: "JYD",  price:  1.01, pct: -46.28, vol:  "12.78M", sig: "Top Loser" },
  { sym: "RUBI", price:  0.81, pct: -40.87, vol:   "5.60M", sig: "Top Loser" },
  { sym: "JEM",  price:  1.35, pct: -31.82, vol: "389.38K", sig: "Top Loser" },
  { sym: "YMT",  price:  1.38, pct: -31.34, vol: "289.72K", sig: "Top Loser" },
  { sym: "WGRX", price:  0.12, pct: -25.83, vol: "113.19M", sig: "Top Loser" },
];

const active = [
  { sym: "NVDA", price: 225.03, pct:  +2.00, vol:  "84.09M", sig: "Most Active" },
  { sym: "TSLA", price: 174.42, pct:  +1.84, vol:  "92.18M", sig: "Most Active" },
  { sym: "AAPL", price: 218.71, pct:  +0.74, vol:  "61.40M", sig: "Most Active" },
  { sym: "AMD",  price: 167.82, pct:  +1.62, vol:  "58.21M", sig: "Most Active" },
  { sym: "F",    price:  10.84, pct:  -0.42, vol:  "44.10M", sig: "Most Active" },
  { sym: "BAC",  price:  42.18, pct:  -0.84, vol:  "39.27M", sig: "Most Active" },
];

const aiBuy = [
  { sym: "NVDA", conf: 92, trigger: "Vol spike + dealer gamma",          tgt: 940 },
  { sym: "AVGO", conf: 86, trigger: "Bull flag breakout · RSI 64",        tgt: 1820 },
  { sym: "META", conf: 81, trigger: "Liquidity sweep + reclaim",          tgt: 612 },
  { sym: "CRM",  conf: 78, trigger: "Earnings drift · gamma support",     tgt: 308 },
  { sym: "ORCL", conf: 74, trigger: "Channel breakout · OBV divergence",  tgt: 198 },
];

const aiSell = [
  { sym: "TSLA", conf: 78, trigger: "Distribution · failed retest",       tgt: 168 },
  { sym: "PFE",  conf: 71, trigger: "Lower-high · MACD bear cross",       tgt: 24.4 },
  { sym: "BAC",  conf: 68, trigger: "Below VWAP · weak sector RS",        tgt: 40.8 },
  { sym: "INTC", conf: 64, trigger: "Bear flag · vol drying up",          tgt: 28.2 },
  { sym: "PYPL", conf: 60, trigger: "Range fail · momentum loss",         tgt: 64.5 },
];

const unusual = [
  { sym: "JUNS", price:  0.35, pct:  +9.30, vol: "199.53M", sig: "Unusual Vol" },
  { sym: "RKDA", price:  1.08, pct: +17.53, vol:  "56.04M", sig: "Unusual Vol" },
  { sym: "CHRW", price:182.54, pct:  +5.50, vol:   "1.95M", sig: "Upgrade"     },
  { sym: "PETZ", price:  1.03, pct: +27.17, vol:  "21.55M", sig: "Unusual Vol" },
];

const tickerNews = [
  "US stocks extend rebound as oil falls on Iran deal hopes",
  "Nvidia leads AI rally ahead of Q1 earnings · +2.00%",
  "Fed minutes signal patience as core CPI softens to 3.4%",
  "BTC reclaims $77.4k as spot ETF inflows hit weekly high",
  "10Y Treasury yields slip 8bps to 4.58% on dovish tone",
  "Energy lags as crude inventories rise unexpectedly · -1.05%",
  "Semis breadth strongest in 6 sessions · SMH +1.84%",
];

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
  { pattern: "Bull Flag",         sym: "CRM",  note: "Pole 8.4% · pivot 304",    tone: "pos" as const },
  { pattern: "Inverse H&S",       sym: "AMD",  note: "Neckline 168 · target 184",tone: "pos" as const },
  { pattern: "Ascending Triangle",sym: "ORCL", note: "Apex 195 · 4 touches",     tone: "pos" as const },
  { pattern: "Rising Wedge",      sym: "TSLA", note: "Distribution risk",         tone: "neg" as const },
  { pattern: "Head & Shoulders",  sym: "PYPL", note: "Right shoulder forming",    tone: "neg" as const },
  { pattern: "Falling Wedge",     sym: "DIS",  note: "Compression · breakout watch", tone: "warn" as const },
  { pattern: "Cup & Handle",      sym: "NVDA", note: "Handle 8 sessions",          tone: "pos" as const },
];

const insiderBuys = [
  { sym: "AXIA", who: "Batista de Lima Filh",  role: "Director",        date: "May 18", tx: "Buy",  cost: 11.27, shares:  49_600, value:    559_144 },
  { sym: "NUE",  who: "Spicer Randy J",        role: "Executive VP",    date: "May 18", tx: "Buy",  cost:225.00, shares:   2_500, value:    562_500 },
  { sym: "BLBD", who: "Thau Daniel Mark",      role: "Director",        date: "May 19", tx: "Buy",  cost: 65.09, shares:     300, value:     19_527 },
  { sym: "MERC", who: "Kellogg Peter R",       role: "10% Owner",       date: "May 15", tx: "Buy",  cost:  0.95, shares: 215_000, value:    203_584 },
];

const insiderSells = [
  { sym: "ARTV", who: "RA Capital Mgmt",       role: "10% Owner",       date: "May 11", tx: "Sell", cost: 12.30, shares: 6_098_000, value: 74_999_992 },
  { sym: "BRCB", who: "Cynosure Group LLC",    role: "10% Owner",       date: "May 15", tx: "Sell", cost:  9.10, shares: 8_020_000, value: 72_988_509 },
  { sym: "VIK",  who: "CPP Investment Board",  role: "10% Owner",       date: "May 19", tx: "Sell", cost: 38.20, shares:20_040_000, value:765_934_000 },
  { sym: "DOCN", who: "Access Industries Hldg",role: "10% Owner",       date: "May 13", tx: "Sell", cost: 32.10, shares: 1_543_000, value: 49_590_000 },
];

const globals = [
  { name: "Crude Oil",  sym: "CL",   v:  97.68, c: -6.21, pos: false, icon: Droplets },
  { name: "Natural Gas",sym: "NG",   v:   3.01, c: -3.18, pos: false, icon: Flame    },
  { name: "Gold",       sym: "XAU",  v:4537.30, c: +0.58, pos: true,  icon: DollarSign },
  { name: "Silver",     sym: "XAG",  v:  38.42, c: +1.12, pos: true,  icon: DollarSign },
  { name: "USD Index",  sym: "DXY",  v: 104.18, c: -0.21, pos: false, icon: DollarSign },
  { name: "10Y Yield",  sym: "TNX",  v:   4.58, c: -1.80, pos: false, icon: BarChart3 },
  { name: "Bitcoin",    sym: "BTC",  v:77471.10,c: +1.08, pos: true,  icon: Bitcoin   },
  { name: "Ethereum",   sym: "ETH",  v: 3812.40,c: +1.42, pos: true,  icon: Bitcoin   },
  { name: "EUR/USD",    sym: "EUR",  v:  1.1621,c: +0.14, pos: true,  icon: DollarSign },
  { name: "USD/JPY",    sym: "JPY",  v: 158.92, c: -0.10, pos: false, icon: DollarSign },
];

/* ================== Page ================== */

function HomePage() {
  return (
    <div className="space-y-3">
      <PromoBar />
      <NewsTicker />
      <IndexCards />
      <BreadthRow />

      {/* Main dashboard grid */}
      <div className="grid grid-cols-12 gap-3">
        {/* LEFT — movers */}
        <div className="col-span-12 lg:col-span-3 space-y-3">
          <MoverTable title="Top Gainers" icon={TrendingUp} tone="pos" rows={gainers} />
          <MoverTable title="Top Losers"  icon={TrendingDown} tone="neg" rows={losers} />
          <MoverTable title="Most Active" icon={Activity} tone="primary" rows={active} />
        </div>

        {/* CENTER — heatmap */}
        <div className="col-span-12 lg:col-span-6">
          <Heatmap />
        </div>

        {/* RIGHT — news */}
        <div className="col-span-12 lg:col-span-3">
          <NewsPanel />
        </div>
      </div>

      {/* AI signal tables */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <AISignalTable title="AI Buy Signals" icon={Brain} tone="pos" rows={aiBuy} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <AISignalTable title="AI Sell Signals" icon={Brain} tone="neg" rows={aiSell} />
        </div>
      </div>

      {/* Technical + Pattern */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <SignalsList title="Technical Signals" rows={techSignals.map(s => ({ left: s.type, sym: s.sym, note: s.note, tone: s.tone }))} icon={Zap} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <SignalsList title="Pattern Detection" rows={patternSignals.map(s => ({ left: s.pattern, sym: s.sym, note: s.note, tone: s.tone }))} icon={Eye} />
        </div>
      </div>

      {/* Unusual Volume + Calendar */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-4">
          <MoverTable title="Unusual Volume" icon={AlertTriangle} tone="warn" rows={unusual} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <EconCalendar />
        </div>
      </div>

      {/* Insider */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-6">
          <InsiderTable title="Latest Insider Buying" rows={insiderBuys} tone="pos" />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <InsiderTable title="Latest Insider Selling" rows={insiderSells} tone="neg" />
        </div>
      </div>

      {/* Globals */}
      <GlobalMarkets />

      {/* AI panel */}
      <AIAnalysis />

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

function NewsTicker() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-border/70 glass h-9 flex items-center">
      <div className="shrink-0 flex items-center gap-1.5 px-3 h-full border-r border-border/70 bg-[var(--color-pos)]/10">
        <Radio className="size-3 text-[var(--color-pos)] live-dot" />
        <span className="text-[10px] font-semibold tracking-widest text-[var(--color-pos)]">LIVE</span>
      </div>
      <div className="flex-1 overflow-hidden group">
        <div className="flex items-center gap-8 whitespace-nowrap animate-[ticker_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...tickerNews, ...tickerNews].map((t, i) => (
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
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 320;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`);
  const d = `M${pts.join(" L")}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="block w-full" style={{ height }}>
      <defs>
        <linearGradient id={`g-${color.replace(/[^a-z]/gi,"")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <pattern id="grid" width="32" height="16" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 16" fill="none" stroke="var(--color-grid)" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
      <rect width={w} height={height} fill="url(#grid)" />
      <path d={`${d} L${w},${height} L0,${height} Z`} fill={`url(#g-${color.replace(/[^a-z]/gi,"")})`} />
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

function IndexCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {indicesData.map((idx, i) => {
        const pos = idx.pct >= 0;
        const color = pos ? "var(--color-pos)" : "var(--color-neg)";
        return (
          <Panel key={idx.sym} bodyClassName="p-0">
            <div className="px-3 pt-2.5 pb-1.5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{idx.sym}</span>
                  <span className="text-[9px] text-muted-foreground/70">MAY 20</span>
                </div>
                <div className="text-[22px] font-semibold tabular-nums leading-none mt-1">{idx.price.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
              </div>
              <div className="text-right">
                <div className={cn("text-[12px] font-semibold tabular-nums", pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]")}>
                  {pos ? "+" : ""}{idx.chg.toFixed(2)}
                </div>
                <div className={cn("text-[11px] tabular-nums", pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]")}>
                  ({pos ? "+" : ""}{idx.pct.toFixed(2)}%)
                </div>
              </div>
            </div>
            <MiniChart data={mkSeries(i * 3.7, pos)} color={color} height={72} />
            <div className="px-3 py-1.5 border-t border-border/70 flex items-center justify-between text-[10px] tabular-nums text-muted-foreground">
              <span>VOL <span className="text-foreground">{idx.vol}</span></span>
              <span>H <span className="text-[var(--color-pos)]">{idx.high.toLocaleString()}</span></span>
              <span>L <span className="text-[var(--color-neg)]">{idx.low.toLocaleString()}</span></span>
              <Pill tone="pos">OPEN</Pill>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

function BreadthRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
      {breadth.map((b) => {
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
      <FearGreed />
    </div>
  );
}

function FearGreed() {
  const v = 68;
  return (
    <div className="glass rounded-sm px-2.5 py-2 border border-accent/40 flex items-center gap-2">
      <ProgressRing value={v} size={42} stroke={4} color="var(--color-accent)" label="F&G" />
      <div className="leading-tight">
        <div className="text-[9px] tracking-widest uppercase text-muted-foreground">Fear / Greed</div>
        <div className="text-[12px] font-semibold text-accent">Greed</div>
        <div className="text-[9px] text-muted-foreground tabular-nums">prev 61 · 7d 54</div>
      </div>
    </div>
  );
}

function MoverTable({ title, icon: Icon, tone, rows }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "pos" | "neg" | "primary" | "warn";
  rows: { sym: string; price: number; pct: number; vol: string; sig: string }[];
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

/* ----- Heatmap ----- */

function Heatmap() {
  const sectors = React.useMemo(() => {
    const map = new Map<string, typeof heatmapSP[number][]>();
    heatmapSP.forEach((t) => {
      if (!map.has(t.sec)) map.set(t.sec, []);
      map.get(t.sec)!.push(t);
    });
    return Array.from(map.entries())
      .map(([sec, items]) => ({ sec, items: [...items].sort((a,b) => b.cap - a.cap), total: items.reduce((s,i) => s + i.cap, 0) }))
      .sort((a,b) => b.total - a.total);
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
          // sector width proportional to total cap
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

function NewsPanel() {
  return (
    <Panel
      title="Major Market News"
      right={<span className="text-[9px] text-[var(--color-pos)] ring-dot">LIVE</span>}
      bodyClassName="p-0"
      className="h-full"
    >
      <ul className="divide-y divide-border/60">
        {news.map((n, i) => {
          const tone = n.imp.startsWith("Bull") ? "pos" : n.imp.startsWith("Bear") ? "neg" : "neutral";
          return (
            <li key={i} className="px-3 py-2 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between mb-0.5">
                <Pill tone={tone as "pos" | "neg" | "neutral"}>{n.cat}</Pill>
                <span className="text-[9px] text-muted-foreground tabular-nums">{n.time}</span>
              </div>
              <div className="text-[11px] leading-snug font-medium text-foreground/95">{n.head}</div>
              <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{n.sum}</div>
              <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: tone === "pos" ? "var(--color-pos)" : tone === "neg" ? "var(--color-neg)" : "var(--color-muted-foreground)" }}>
                {n.imp}
              </div>
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
  rows: { sym: string; conf: number; trigger: string; tgt: number }[];
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
            <th className="text-right px-2 py-1">Target</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sym} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1.5 font-semibold tabular-nums" style={{ color: toneVar }}>{r.sym}</td>
              <td className="px-2 py-1.5 text-foreground/90">{r.trigger}</td>
              <td className="px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-[10px] w-7">{r.conf}%</span>
                  <div className="w-12"><Bar value={r.conf} color="var(--color-accent)" /></div>
                </div>
              </td>
              <td className="px-2 py-1.5 text-right tabular-nums font-medium">${r.tgt.toFixed(2)}</td>
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

function EconCalendar() {
  return (
    <Panel
      title="Economic Calendar · Today"
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
          {calendar.map((e, i) => (
            <tr key={i} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1 tabular-nums text-muted-foreground">{e.time}</td>
              <td className="px-2 py-1"><span className="mr-1">{e.flag}</span><span className="text-[10px] text-muted-foreground">{e.country}</span></td>
              <td className="px-2 py-1">
                <div className="flex gap-0.5">
                  {[1,2,3].map((n) => (
                    <span key={n} className={cn("h-3 w-1 rounded-[1px]", n <= e.impact ? (e.impact === 3 ? "bg-[var(--color-neg)]" : e.impact === 2 ? "bg-[var(--color-warn)]" : "bg-muted-foreground/60") : "bg-muted")} />
                  ))}
                </div>
              </td>
              <td className="px-2 py-1 text-foreground/90">{e.event}</td>
              <td className="px-2 py-1 text-right tabular-nums font-semibold">{e.actual}</td>
              <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">{e.forecast}</td>
              <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">{e.previous}</td>
              <td className="px-2 py-1 text-[10px] text-accent">{e.ai}</td>
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
  rows: { sym: string; who: string; role: string; date: string; tx: string; cost: number; shares: number; value: number }[];
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
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border/60 hover:bg-secondary/50">
              <td className="px-2 py-1.5 font-semibold tabular-nums" style={{ color: toneVar }}>{r.sym}</td>
              <td className="px-2 py-1.5 truncate max-w-[140px]">{r.who}</td>
              <td className="px-2 py-1.5 text-muted-foreground">{r.role}</td>
              <td className="px-2 py-1.5 text-muted-foreground tabular-nums">{r.date}</td>
              <td className="px-2 py-1.5 text-right tabular-nums">{r.cost.toFixed(2)}</td>
              <td className="px-2 py-1.5 text-right tabular-nums text-muted-foreground">{r.shares.toLocaleString()}</td>
              <td className="px-2 py-1.5 text-right tabular-nums font-semibold">${(r.value/1000).toFixed(0)}K</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ----- Globals ----- */

function GlobalMarkets() {
  return (
    <Panel
      title="Global Markets · Commodities · FX · Crypto"
      right={<span className="text-[9px] text-muted-foreground tabular-nums">delayed 15s</span>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {globals.map((g, i) => {
          const color = g.pos ? "var(--color-pos)" : "var(--color-neg)";
          const Icon = g.icon;
          return (
            <div key={g.sym} className="rounded-sm border border-border/70 bg-background/30 px-2 py-1.5 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-semibold tracking-wide">{g.name}</span>
                </div>
                <span className="text-[9px] tabular-nums text-muted-foreground">{g.sym}</span>
              </div>
              <div className="flex items-end justify-between mt-1">
                <div>
                  <div className="text-[13px] font-semibold tabular-nums leading-none">
                    {g.v.toLocaleString(undefined,{ minimumFractionDigits: g.v < 10 ? 4 : 2, maximumFractionDigits: g.v < 10 ? 4 : 2 })}
                  </div>
                  <div className="text-[10px] tabular-nums mt-0.5" style={{ color }}>
                    {g.pos ? "+" : ""}{g.c.toFixed(2)}%
                  </div>
                </div>
                <Spark data={mkSeries(i * 1.3, g.pos)} color={color} width={70} height={24} />
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ----- AI Analysis ----- */

function AIAnalysis() {
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
          <AIBlock label="AI Sentiment" value="78 / 100" tone="pos" hint="Bullish · 6d trend" rings={<ProgressRing value={78} size={44} stroke={4} color="var(--color-accent)" label="" />} />
          <AIBlock label="Market Regime" value="Risk-On" tone="pos" hint="Low vol, expanding breadth" rings={<Gauge className="size-9 text-[var(--color-pos)]" />} />
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