import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: COTReportPage,
  head: () => ({
    meta: [
      { title: "COT Report — EUR/USD | Positioning Terminal" },
      {
        name: "description",
        content:
          "Institutional COT positioning terminal: long/short breakdown, weekly change, open interest and historical extremes.",
      },
    ],
  }),
});

/* ---------- mock data ---------- */
type Row = {
  cat: string;
  long: number;
  short: number;
  spread?: number;
  chg: number;
  oi: number;
  traders: number;
};

const rows: Row[] = [
  { cat: "Asset Managers",   long: 218430, short:  74210, spread:  5120, chg:  +4820, oi: 38.4, traders: 142 },
  { cat: "Leveraged Funds",  long:  92110, short: 168740, spread: 12480, chg:  -7340, oi: 26.1, traders: 198 },
  { cat: "Dealers",          long:  41280, short:  98620, spread:  2810, chg:   +910, oi: 14.8, traders:  31 },
  { cat: "Other Reportables",long:  38470, short:  29110, spread:  4620, chg:  -1240, oi:  9.2, traders:  74 },
  { cat: "Non-Reportable",   long:  21340, short:  40780, spread:     0, chg:  +2110, oi: 11.5, traders:   0 },
  { cat: "Total Reportable", long: 390290, short: 370680, spread: 25030, chg:  -2850, oi: 88.5, traders: 445 },
];

const summary = {
  market: "EUR/USD Futures",
  exchange: "CME — Chicago Mercantile Exchange",
  date: "Tue, 12 May 2026",
  bias: "Bullish",
  confidence: 78,
};

const extremes = [
  { label: "52w Long %",   value: "74%", note: "92nd pct" },
  { label: "52w Short %",  value: "31%", note: "18th pct" },
  { label: "Net Position", value: "+19,610", note: "+2σ" },
  { label: "OI Δ 4w",      value: "+8.2%", note: "expanding" },
];

/* ---------- helpers ---------- */
const fmt = (n: number) => n.toLocaleString("en-US");
const sign = (n: number) => (n > 0 ? "+" : n < 0 ? "" : "");

/* ---------- charts (inline SVG, terminal style) ---------- */
function NetPositionChart() {
  const pts = [12, 18, 14, 22, 30, 28, 35, 42, 38, 46, 52, 48, 55, 60, 58, 64, 70, 66, 72, 78, 74, 80, 76, 82];
  const w = 600, h = 120, pad = 24;
  const max = 100;
  const step = (w - pad * 2) / (pts.length - 1);
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${pad + i * step},${h - pad - (p / max) * (h - pad * 2)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px]">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 24} y2={pad + i * 24} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="1.2" />
      <text x={pad} y={14} fontSize="9" fill="var(--color-muted-foreground)" fontFamily="ui-monospace,monospace">
        NET POSITION · 24W
      </text>
      <text x={w - pad} y={14} fontSize="9" fill="var(--color-pos)" textAnchor="end" fontFamily="ui-monospace,monospace">
        +19,610
      </text>
    </svg>
  );
}

function OIChart() {
  const bars = [40, 44, 42, 48, 52, 50, 56, 54, 60, 58, 64, 62, 68, 66, 72, 70, 76, 74, 80, 78, 84, 82, 88, 90];
  const w = 600, h = 120, pad = 24;
  const bw = (w - pad * 2) / bars.length - 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px]">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} x2={w - pad} y1={pad + i * 24} y2={pad + i * 24} stroke="var(--color-grid)" strokeWidth="1" />
      ))}
      {bars.map((b, i) => {
        const x = pad + i * (bw + 2);
        const bh = (b / 100) * (h - pad * 2);
        return <rect key={i} x={x} y={h - pad - bh} width={bw} height={bh} fill="var(--color-muted-foreground)" opacity="0.7" />;
      })}
      <text x={pad} y={14} fontSize="9" fill="var(--color-muted-foreground)" fontFamily="ui-monospace,monospace">
        OPEN INTEREST · 24W
      </text>
      <text x={w - pad} y={14} fontSize="9" fill="var(--color-primary)" textAnchor="end" fontFamily="ui-monospace,monospace">
        +8.2%
      </text>
    </svg>
  );
}

/* ---------- page ---------- */
function COTReportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono text-[12px] leading-tight">
      {/* TOP HEADER */}
      <header className="border-b border-border bg-card">
        <div className="px-4 py-2 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest text-muted-foreground">COT/</span>
            <h1 className="text-[13px] font-semibold text-foreground">{summary.market}</h1>
          </div>
          <Field label="EXCHANGE" value={summary.exchange} />
          <Field label="REPORT" value={summary.date} />
          <Field label="BIAS">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pos)]" />
              <span className="text-[var(--color-pos)] font-semibold">{summary.bias}</span>
            </span>
          </Field>
          <Field label="AI CONF">
            <span className="flex items-center gap-2">
              <span className="text-foreground font-semibold">{summary.confidence}%</span>
              <span className="inline-block w-16 h-1 bg-muted overflow-hidden">
                <span
                  className="block h-full bg-primary"
                  style={{ width: `${summary.confidence}%` }}
                />
              </span>
            </span>
          </Field>
          <div className="ml-auto flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pos)] animate-pulse" />
              LIVE
            </span>
            <span>UTC 14:32:08</span>
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="px-4 py-3 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-3">
        {/* MAIN TABLE */}
        <section className="border border-border bg-card">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-secondary">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-widest text-muted-foreground">POSITIONING · DISAGGREGATED</span>
              <span className="text-[10px] text-muted-foreground">CONTRACTS</span>
            </div>
            <div className="flex items-center gap-1">
              {["1W", "4W", "13W", "52W"].map((t, i) => (
                <button
                  key={t}
                  className={`px-2 py-0.5 text-[10px] border ${
                    i === 0
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12px]">
              <thead className="sticky top-0 bg-secondary z-10">
                <tr className="text-muted-foreground">
                  {["Category", "Long", "Short", "Spread", "Weekly Δ", "OI %", "Traders"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-3 py-1.5 border-b border-border text-[10px] tracking-wider font-medium ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const isTotal = r.cat === "Total Reportable";
                  return (
                    <tr
                      key={r.cat}
                      className={`border-b border-border/60 hover:bg-secondary/60 ${
                        isTotal ? "bg-secondary/40 font-semibold" : ""
                      }`}
                    >
                      <td className="px-3 py-1.5 text-left text-foreground">
                        <span className="text-muted-foreground mr-2">{String(i + 1).padStart(2, "0")}</span>
                        {r.cat}
                      </td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-[var(--color-pos)]">{fmt(r.long)}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-[var(--color-neg)]">{fmt(r.short)}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                        {r.spread ? fmt(r.spread) : "—"}
                      </td>
                      <td
                        className={`px-3 py-1.5 text-right tabular-nums ${
                          r.chg >= 0 ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"
                        }`}
                      >
                        {sign(r.chg)}
                        {fmt(r.chg)}
                      </td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-foreground">
                        <span className="inline-flex items-center gap-1.5 justify-end">
                          {r.oi.toFixed(1)}%
                          <span className="inline-block w-10 h-1 bg-muted overflow-hidden">
                            <span className="block h-full bg-primary/70" style={{ width: `${r.oi}%` }} />
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                        {r.traders || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-3 py-1.5 border-t border-border bg-secondary/60 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Source: CFTC · TFF Disaggregated · 12 May 2026</span>
            <span className="flex items-center gap-3">
              <span>Σ Long <span className="text-[var(--color-pos)]">811,630</span></span>
              <span>Σ Short <span className="text-[var(--color-neg)]">782,140</span></span>
              <span>Net <span className="text-[var(--color-pos)]">+29,490</span></span>
            </span>
          </div>
        </section>

        {/* SIDE PANEL */}
        <aside className="flex flex-col gap-3">
          <Panel title="AI Summary">
            <p className="text-[11px] text-foreground/90 leading-snug">
              Asset managers extended net longs to a 92nd-percentile reading while
              leveraged funds trimmed shorts. Positioning skew remains
              <span className="text-[var(--color-pos)]"> bullish</span>, with crowding
              risk elevated above 2σ.
            </p>
          </Panel>

          <Panel title="Current Bias">
            <Row label="Direction"  value={<span className="text-[var(--color-pos)]">Long</span>} />
            <Row label="Strength"   value="78 / 100" />
            <Row label="Horizon"    value="2–6 weeks" />
            <Row label="Δ vs prior" value={<span className="text-[var(--color-pos)]">+6 pts</span>} />
          </Panel>

          <Panel title="Positioning Regime">
            <Row label="Regime"      value="Trend-Extension" />
            <Row label="Volatility"  value="Low" />
            <Row label="OI Trend"    value={<span className="text-[var(--color-pos)]">Expanding</span>} />
            <Row label="Persistence" value="6 weeks" />
          </Panel>

          <Panel title="Crowd Positioning">
            <div className="flex h-2 w-full overflow-hidden">
              <span className="bg-[var(--color-pos)]" style={{ width: "68%" }} />
              <span className="bg-[var(--color-neg)]" style={{ width: "32%" }} />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>Long 68%</span>
              <span>Short 32%</span>
            </div>
            <Row label="Crowding score" value="High (92nd)" />
          </Panel>

          <Panel title="Historical Extremes">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {extremes.map((e) => (
                <div key={e.label} className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">{e.label}</span>
                  <span className="text-foreground tabular-nums">{e.value}</span>
                  <span className="text-[10px] text-muted-foreground">{e.note}</span>
                </div>
              ))}
            </div>
          </Panel>
        </aside>

        {/* BOTTOM CHARTS */}
        <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <ChartPanel title="Net Position">
            <NetPositionChart />
          </ChartPanel>
          <ChartPanel title="Open Interest">
            <OIChart />
          </ChartPanel>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-1.5 text-[10px] text-muted-foreground flex justify-between">
        <span>COT Terminal v1.0</span>
        <span>Data CFTC · Refreshed weekly Fri 15:30 ET</span>
      </footer>
    </div>
  );
}

/* ---------- small primitives ---------- */
function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] tracking-widest text-muted-foreground">{label}</span>
      <span className="text-[12px] text-foreground">{children ?? value}</span>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card">
      <div className="px-2.5 py-1 border-b border-border bg-secondary text-[10px] tracking-widest text-muted-foreground">
        {title.toUpperCase()}
      </div>
      <div className="p-2.5 space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-baseline text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground tabular-nums">{value}</span>
    </div>
  );
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card">
      <div className="px-2.5 py-1 border-b border-border bg-secondary text-[10px] tracking-widest text-muted-foreground">
        {title.toUpperCase()}
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
