import * as React from "react";
import { Sparkles } from "lucide-react";
import { Panel, Pill, Stat, Hero, Bar, ProgressRing } from "@/components/marketiq/primitives";
import { cotRows } from "@/lib/mock";

const fmt = (n: number) => n.toLocaleString("en-US");
const sign = (n: number) => (n > 0 ? "+" : "");

function NetChart({ color = "var(--color-primary)" }: { color?: string }) {
  const pts = [12, 18, 14, 22, 30, 28, 35, 42, 38, 46, 52, 48, 55, 60, 58, 64, 70, 66, 72, 78, 74, 80, 76, 82];
  const w = 600, h = 140, pad = 24;
  const max = 100;
  const step = (w - pad * 2) / (pts.length - 1);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${pad + i * step},${h - pad - (p / max) * (h - pad * 2)}`).join(" ");
  const area = `${d} L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]">
      <defs>
        <linearGradient id="cot-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 28} y2={pad + i * 28} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#cot-fill)" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

function HistTrendChart() {
  const w = 600, h = 140, pad = 24;
  const bars = [40, 44, 42, 48, 52, 50, 56, 54, 60, 58, 64, 62, 68, 66, 72, 70, 76, 74, 80, 78, 84, 82, 88, 90];
  const bw = (w - pad * 2) / bars.length - 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 28} y2={pad + i * 28} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      {bars.map((b, i) => {
        const x = pad + i * (bw + 2);
        const bh = (b / 100) * (h - pad * 2);
        const color = b > 70 ? "var(--color-pos)" : b > 50 ? "var(--color-primary)" : "var(--color-warn)";
        return <rect key={i} x={x} y={h - pad - bh} width={bw} height={bh} fill={color} opacity="0.85" />;
      })}
    </svg>
  );
}

function SmartMoneyChart() {
  const w = 600, h = 140, pad = 24;
  const longs  = [50, 52, 55, 54, 58, 60, 62, 65, 64, 68, 70, 72, 74, 73, 76, 78, 80, 82, 81, 84];
  const shorts = [50, 48, 46, 47, 44, 42, 40, 38, 39, 36, 34, 32, 30, 31, 28, 26, 24, 22, 23, 20];
  const step = (w - pad * 2) / (longs.length - 1);
  const dL = longs.map((p, i) => `${i === 0 ? "M" : "L"}${pad + i * step},${h - pad - (p / 100) * (h - pad * 2)}`).join(" ");
  const dS = shorts.map((p, i) => `${i === 0 ? "M" : "L"}${pad + i * step},${h - pad - (p / 100) * (h - pad * 2)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 28} y2={pad + i * 28} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      <path d={dL} fill="none" stroke="var(--color-pos)" strokeWidth="1.4" style={{ filter: "drop-shadow(0 0 6px var(--color-pos))" }} />
      <path d={dS} fill="none" stroke="var(--color-neg)" strokeWidth="1.4" style={{ filter: "drop-shadow(0 0 6px var(--color-neg))" }} />
    </svg>
  );
}

function RatioChart() {
  const w = 600, h = 140, pad = 24;
  const ratios = [1.0, 1.1, 1.2, 1.15, 1.3, 1.4, 1.5, 1.45, 1.6, 1.7, 1.65, 1.8, 1.9, 1.85, 2.0, 2.1, 2.05, 2.2, 2.3, 2.4];
  const step = (w - pad * 2) / (ratios.length - 1);
  const bw = step - 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 28} y2={pad + i * 28} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      {ratios.map((r, i) => {
        const x = pad + i * step;
        const bh = (r / 3) * (h - pad * 2);
        return <rect key={i} x={x} y={h - pad - bh} width={bw} height={bh} fill="var(--color-primary)" opacity="0.7" />;
      })}
    </svg>
  );
}

export function COTMarketPage({ market, code, exchange }: { market: string; code: string; exchange: string }) {
  return (
    <div className="space-y-4">
      <Hero
        eyebrow={`${exchange} · ${code} Futures · Updated 12 May 2026`}
        title={`${market} COT Report`}
        subtitle="Institutional futures positioning and smart money analysis. Disaggregated commitments by reportable category."
      >
        <div className="flex items-center gap-4">
          <ProgressRing value={78} label="AI" color="var(--color-pos)" />
          <Stat label="Net Bias" value="Bullish" accent="pos" delta={{ value: "+6 pts", pos: true }} />
        </div>
      </Hero>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Panel title="Commercial">
          <Stat label="Net Short" value="-57,340" accent="neg" delta={{ value: "+910", pos: true }} hint="Dealers + Producers" />
          <div className="mt-2"><Bar value={28} color="var(--color-neg)" /></div>
        </Panel>
        <Panel title="Non-Commercial">
          <Stat label="Net Long" value="+76,630" accent="pos" delta={{ value: "+4,820", pos: true }} hint="Asset Mgrs + LevFunds" />
          <div className="mt-2"><Bar value={72} color="var(--color-pos)" /></div>
        </Panel>
        <Panel title="Open Interest">
          <Stat label="Contracts" value="445,210" accent="primary" delta={{ value: "+8.2%", pos: true }} hint="4W expanding" />
          <div className="mt-2"><Bar value={68} color="var(--color-primary)" /></div>
        </Panel>
        <Panel title="Weekly Change">
          <Stat label="Net Δ" value="+29,490" accent="pos" delta={{ value: "vs +18,210", pos: true }} hint="92nd pct over 52w" />
          <div className="mt-2"><Bar value={92} color="var(--color-warn)" /></div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Panel title="Net Positioning · 24W" right={<Pill tone="pos">+19,610</Pill>}>
              <NetChart color="var(--color-primary)" />
            </Panel>
            <Panel title="Historical Trend · 24W" right={<Pill tone="warn">92nd pct</Pill>}>
              <HistTrendChart />
            </Panel>
            <Panel title="Smart Money Long vs Short" right={<span className="text-[10px]"><span className="text-[var(--color-pos)]">● Long</span> <span className="text-[var(--color-neg)] ml-2">● Short</span></span>}>
              <SmartMoneyChart />
            </Panel>
            <Panel title="Long / Short Ratio" right={<Pill tone="primary">2.40x</Pill>}>
              <RatioChart />
            </Panel>
          </div>

          <Panel title="Disaggregated Positioning · CFTC TFF" bodyClassName="p-0">
            <table className="w-full text-[12px]">
              <thead className="bg-secondary/40">
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left px-3 py-1.5">Category</th>
                  <th className="text-right px-3 py-1.5">Long</th>
                  <th className="text-right px-3 py-1.5">Short</th>
                  <th className="text-right px-3 py-1.5">Spread</th>
                  <th className="text-right px-3 py-1.5">Weekly Δ</th>
                  <th className="text-right px-3 py-1.5">OI %</th>
                  <th className="text-right px-3 py-1.5">Traders</th>
                </tr>
              </thead>
              <tbody>
                {cotRows.map((r, i) => {
                  const isTotal = r.cat === "Total Reportable";
                  return (
                    <tr key={r.cat} className={`border-t border-border/60 hover:bg-secondary/40 ${isTotal ? "bg-secondary/40 font-semibold" : ""}`}>
                      <td className="px-3 py-1.5"><span className="text-muted-foreground mr-2 tabular-nums">{String(i+1).padStart(2,"0")}</span>{r.cat}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-[var(--color-pos)]">{fmt(r.long)}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-[var(--color-neg)]">{fmt(r.short)}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">{r.spread ? fmt(r.spread) : "—"}</td>
                      <td className={`px-3 py-1.5 text-right tabular-nums ${r.chg >= 0 ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}`}>{sign(r.chg)}{fmt(r.chg)}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums">{r.oi.toFixed(1)}%</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">{r.traders || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="space-y-3">
          <Panel title="AI Interpretation" right={<Sparkles className="size-3 text-primary" />}>
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-start gap-2"><span className="text-[var(--color-pos)] mt-1.5 size-1.5 rounded-full bg-current shrink-0" /><span>Large specs increasing longs · +4,820 net</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1.5 size-1.5 rounded-full bg-current shrink-0" /><span>Bullish pressure building · 6th consecutive week</span></li>
              <li className="flex items-start gap-2"><span className="text-[var(--color-warn)] mt-1.5 size-1.5 rounded-full bg-current shrink-0" /><span>Commercial hedging decreasing · supply absorption</span></li>
              <li className="flex items-start gap-2"><span className="text-[var(--color-neg)] mt-1.5 size-1.5 rounded-full bg-current shrink-0" /><span>Crowding risk elevated · 92nd percentile</span></li>
            </ul>
          </Panel>

          <Panel title="Historical Extremes">
            <div className="grid grid-cols-2 gap-2">
              <Stat label="52w Long %"  value="74%" hint="92nd pct" />
              <Stat label="52w Short %" value="31%" hint="18th pct" />
              <Stat label="Net Position" value="+19,610" hint="+2σ" accent="pos" />
              <Stat label="OI Δ 4w"     value="+8.2%" hint="expanding" accent="primary" />
            </div>
          </Panel>

          <Panel title="Market Sentiment">
            <div className="space-y-2 text-[12px]">
              <div><div className="flex justify-between text-[11px]"><span>Crowd Long</span><span className="tabular-nums">68%</span></div><Bar value={68} color="var(--color-pos)" /></div>
              <div><div className="flex justify-between text-[11px]"><span>Smart Money</span><span className="tabular-nums">+82</span></div><Bar value={82} color="var(--color-primary)" /></div>
              <div><div className="flex justify-between text-[11px]"><span>Contrarian Signal</span><span className="tabular-nums">High</span></div><Bar value={88} color="var(--color-warn)" /></div>
            </div>
          </Panel>

          <Panel title="Non-Reportable · Bias / Vol / Regime / Risk / Sentiment" right={<Pill tone="warn">Retail</Pill>}>
            <div className="grid grid-cols-2 gap-2">
              <Stat label="Bias"       value="Short"    accent="neg"     hint="-19,440 net" />
              <Stat label="Volatility" value="Elevated" accent="warn"    hint="σ 1.8x 12w" />
              <Stat label="Regime"     value="Risk-On"  accent="primary" hint="trend phase" />
              <Stat label="Risk"       value="High"     accent="warn"    hint="crowding 88" />
              <Stat label="Sentiment"  value="Fading"   accent="neg"     hint="vs smart $" />
              <Stat label="Δ Weekly"   value="+2,110"   accent="pos"     hint="covering" />
            </div>
            <div className="mt-3 space-y-1.5 text-[11px]">
              <div><div className="flex justify-between"><span className="text-muted-foreground">Bias Strength</span><span className="tabular-nums">-62</span></div><Bar value={62} color="var(--color-neg)" /></div>
              <div><div className="flex justify-between"><span className="text-muted-foreground">Vol Regime</span><span className="tabular-nums">74</span></div><Bar value={74} color="var(--color-warn)" /></div>
              <div><div className="flex justify-between"><span className="text-muted-foreground">Risk Score</span><span className="tabular-nums">88</span></div><Bar value={88} color="var(--color-warn)" /></div>
              <div><div className="flex justify-between"><span className="text-muted-foreground">Sentiment Tilt</span><span className="tabular-nums">-44</span></div><Bar value={44} color="var(--color-neg)" /></div>
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="FAQ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px]">
          <div>
            <h4 className="font-semibold mb-1">What is the COT report?</h4>
            <p className="text-muted-foreground leading-snug">The CFTC's weekly Commitments of Traders report breaks down open interest by trader category, releasing every Friday at 15:30 ET.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">How does Marketiq use it?</h4>
            <p className="text-muted-foreground leading-snug">Our AI scores positioning extremes vs 52w history, detects regime shifts and flags contrarian signals when crowding exceeds the 90th percentile.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Which categories matter most?</h4>
            <p className="text-muted-foreground leading-snug">Asset Managers and Leveraged Funds proxy directional smart money; Dealers + Producers act as inventory hedgers, often fading extremes.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
