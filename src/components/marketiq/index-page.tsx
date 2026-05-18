import { Sparkles } from "lucide-react";
import { Panel, Pill, Stat, Hero, Bar, Spark } from "@/components/marketiq/primitives";

const sample = [
  { sym: "AAPL", name: "Apple",     chg: +1.42, last: 198.42 },
  { sym: "MSFT", name: "Microsoft", chg: +0.91, last: 432.12 },
  { sym: "NVDA", name: "NVIDIA",    chg: +2.18, last: 928.40 },
  { sym: "AMZN", name: "Amazon",    chg: -0.21, last: 184.50 },
  { sym: "META", name: "Meta",      chg: +1.04, last: 502.10 },
  { sym: "GOOG", name: "Alphabet",  chg: +0.42, last: 172.84 },
];

export function IndexPage({ name, code, last, chg, exchange }: { name: string; code: string; last: number; chg: number; exchange: string }) {
  return (
    <div className="space-y-4">
      <Hero
        eyebrow={`${exchange} · ${code}`}
        title={name}
        subtitle="Constituents, breadth, regime and AI-derived positioning signals."
      >
        <div className="flex items-center gap-4">
          <Stat label="Last" value={last.toLocaleString()} delta={{ value: `${chg >= 0 ? "+" : ""}${chg.toFixed(2)}%`, pos: chg >= 0 }} accent={chg >= 0 ? "pos" : "neg"} />
          <Pill tone={chg >= 0 ? "pos" : "neg"}>{chg >= 0 ? "TREND UP" : "TREND DOWN"}</Pill>
        </div>
      </Hero>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Panel title="Breadth">
          <Stat label="Adv / Decl" value="318 / 165" accent="pos" hint="A/D ratio 1.93" />
          <div className="mt-2"><Bar value={66} color="var(--color-pos)" /></div>
        </Panel>
        <Panel title="New Highs">
          <Stat label="52w" value="42" accent="primary" delta={{ value: "+12", pos: true }} />
          <div className="mt-2"><Bar value={48} color="var(--color-primary)" /></div>
        </Panel>
        <Panel title="Volume Z">
          <Stat label="vs 20D" value="+1.4σ" accent="warn" hint="Above seasonal avg" />
          <div className="mt-2"><Bar value={70} color="var(--color-warn)" /></div>
        </Panel>
        <Panel title="AI Regime">
          <Stat label="State" value="Trend-Extension" accent="pos" hint="Confidence 78%" />
          <div className="mt-2"><Bar value={78} color="var(--color-pos)" /></div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Intraday · 1m" className="lg:col-span-2">
          <Spark data={[10,12,11,14,15,14,16,18,17,19,21,20,22,24,23,26,28,27,29,31,30,32,34,33,35,37,36,38,40]} width={800} height={120} color="var(--color-pos)" />
        </Panel>
        <Panel title="AI Snapshot" right={<Sparkles className="size-3 text-primary" />}>
          <ul className="space-y-1.5 text-[12px]">
            <li className="flex justify-between"><span>Momentum</span><Pill tone="pos">Strong</Pill></li>
            <li className="flex justify-between"><span>Breadth</span><Pill tone="pos">Wide</Pill></li>
            <li className="flex justify-between"><span>Vol regime</span><Pill tone="warn">Low</Pill></li>
            <li className="flex justify-between"><span>Dealer gamma</span><Pill tone="primary">Long</Pill></li>
            <li className="flex justify-between"><span>Crowding</span><Pill tone="neg">High</Pill></li>
          </ul>
          <p className="mt-2 text-[11px] text-muted-foreground leading-snug">Above key institutional levels; reflexive squeeze risk on macro miss.</p>
        </Panel>
      </div>

      <Panel title="Top Constituents" bodyClassName="p-0">
        <table className="w-full text-[12px]">
          <thead className="bg-secondary/40">
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left px-3 py-1.5">Sym</th>
              <th className="text-left px-3 py-1.5">Name</th>
              <th className="text-right px-3 py-1.5">Last</th>
              <th className="text-right px-3 py-1.5">%</th>
              <th className="text-left px-3 py-1.5">Trend</th>
              <th className="text-left px-3 py-1.5">AI</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((s) => {
              const pos = s.chg >= 0;
              const spark = Array.from({ length: 20 }).map((_, i) => i + (pos ? i * 0.6 : 10 - i * 0.4));
              return (
                <tr key={s.sym} className="border-t border-border/60 hover:bg-secondary/40">
                  <td className="px-3 py-1.5 font-semibold tabular-nums">{s.sym}</td>
                  <td className="px-3 py-1.5 text-muted-foreground">{s.name}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{s.last.toFixed(2)}</td>
                  <td className={`px-3 py-1.5 text-right tabular-nums ${pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}`}>{pos ? "+" : ""}{s.chg.toFixed(2)}%</td>
                  <td className="px-3 py-1.5"><Spark data={spark} color={pos ? "var(--color-pos)" : "var(--color-neg)"} width={70} height={20} /></td>
                  <td className="px-3 py-1.5"><Pill tone={pos ? "pos" : "neg"}>{pos ? "Bullish" : "Bearish"}</Pill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
