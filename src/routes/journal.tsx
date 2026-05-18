import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, BookOpen, Brain } from "lucide-react";
import { Panel, Pill, Hero, Stat, Bar, ProgressRing, Spark } from "@/components/marketiq/primitives";
import { trades } from "@/lib/mock";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Trading Journal — Marketiq" },
      { name: "description", content: "Premium AI trading journal: plan, thesis, trades, AI feedback and performance." },
      { property: "og:title", content: "Trading Journal — Marketiq" },
      { property: "og:description", content: "AI-augmented trade journal." },
    ],
  }),
});

function JournalPage() {
  const totalPnl = trades.reduce((a, b) => a + b.pnl, 0);
  return (
    <div className="space-y-4">
      <Hero
        eyebrow="Trading Journal · 13 May 2026"
        title="Plan. Execute. Review with AI."
        subtitle="Institutional-grade journaling that scores execution, discipline and emotional consistency."
      >
        <div className="flex items-center gap-4">
          <ProgressRing value={82} label="EXEC" color="var(--color-pos)" />
          <Stat label="Today P&L" value={`${totalPnl >= 0 ? "+" : ""}$${totalPnl.toLocaleString()}`} accent={totalPnl >= 0 ? "pos" : "neg"} hint="Net of fees" />
        </div>
      </Hero>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Today's Plan" right={<BookOpen className="size-3 text-muted-foreground" />}>
          <textarea className="w-full h-24 bg-secondary/40 border border-border rounded-sm p-2 text-[12px] focus:outline-none focus:border-primary/60" defaultValue="Trade SPY breakout above 532.50 with stops at 530. Avoid pre-Fed exposure after 13:30. Size 0.5R until confirmation." />
        </Panel>
        <Panel title="Trade Thesis">
          <textarea className="w-full h-24 bg-secondary/40 border border-border rounded-sm p-2 text-[12px] focus:outline-none focus:border-primary/60" defaultValue="Dealer long gamma supports range; CPI miss could trigger reflexive squeeze in semis. NVDA primary expression, AMD secondary." />
        </Panel>
        <Panel title="Pre-market Notes">
          <textarea className="w-full h-24 bg-secondary/40 border border-border rounded-sm p-2 text-[12px] focus:outline-none focus:border-primary/60" defaultValue="IWM lagging signals breadth caution. Avoid energy on inventory print. JPY pairs in focus post-BOJ." />
        </Panel>
      </div>

      <Panel title="Today's Trades" right={<button className="text-[10px] text-primary">+ Add trade</button>} bodyClassName="p-0">
        <table className="w-full text-[12px]">
          <thead className="bg-secondary/40">
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left px-3 py-2">Ticker</th>
              <th className="text-right px-3 py-2">Entry</th>
              <th className="text-right px-3 py-2">Exit</th>
              <th className="text-right px-3 py-2">P&L</th>
              <th className="text-left px-3 py-2">Emotion</th>
              <th className="text-left px-3 py-2">Mistake</th>
              <th className="text-left px-3 py-2">AI Tag</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => {
              const pos = t.pnl >= 0;
              return (
                <tr key={t.sym} className="border-t border-border/60 hover:bg-secondary/40">
                  <td className="px-3 py-1.5 font-semibold tabular-nums">{t.sym}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{t.entry.toFixed(2)}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{t.exit.toFixed(2)}</td>
                  <td className={`px-3 py-1.5 text-right tabular-nums font-semibold ${pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}`}>{pos ? "+" : ""}${t.pnl.toLocaleString()}</td>
                  <td className="px-3 py-1.5"><Pill tone={t.emo === "Disciplined" || t.emo === "Calm" || t.emo === "Confident" ? "pos" : t.emo === "FOMO" ? "neg" : "warn"}>{t.emo}</Pill></td>
                  <td className="px-3 py-1.5 text-muted-foreground">{t.mis}</td>
                  <td className="px-3 py-1.5"><Pill tone="primary"><Sparkles className="size-2.5" />{pos ? "Aligned" : "Review"}</Pill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="AI Review" right={<Brain className="size-3 text-primary" />} className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <ProgressRing value={82} label="EXEC" color="var(--color-pos)" />
              <div className="text-[10px] text-muted-foreground mt-1">Execution</div>
            </div>
            <div className="text-center">
              <ProgressRing value={68} label="RISK" color="var(--color-warn)" />
              <div className="text-[10px] text-muted-foreground mt-1">Risk Mgmt</div>
            </div>
            <div className="text-center">
              <ProgressRing value={74} label="DISC" color="var(--color-primary)" />
              <div className="text-[10px] text-muted-foreground mt-1">Discipline</div>
            </div>
            <div className="text-center">
              <ProgressRing value={61} label="EMO" color="var(--color-neg)" />
              <div className="text-[10px] text-muted-foreground mt-1">Emotional</div>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-[12px] border-t border-border/70 pt-2">
            <li className="flex items-start gap-2"><span className="text-[var(--color-warn)] mt-1.5 size-1.5 rounded-full bg-current" /><span><span className="text-foreground">Exited NVDA too early</span> · trailing stop tighter than thesis warranted (-1.2R captured vs +2.1R target)</span></li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-neg)] mt-1.5 size-1.5 rounded-full bg-current" /><span><span className="text-foreground">Oversized TSLA fade</span> · 1.8R risk on countertrend setup violates rule #3</span></li>
            <li className="flex items-start gap-2"><span className="text-[var(--color-pos)] mt-1.5 size-1.5 rounded-full bg-current" /><span><span className="text-foreground">Risk sizing on AMD</span> · appropriate, aligned with regime confidence</span></li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1.5 size-1.5 rounded-full bg-current" /><span>Improve patience on momentum continuations; backtest shows +18% expectancy when holding through first pullback</span></li>
          </ul>
        </Panel>

        <Panel title="Performance · 30D">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Win Rate"      value="62%"   accent="pos" />
            <Stat label="Avg RR"        value="1.84"  accent="primary" />
            <Stat label="Profit Factor" value="2.1"   accent="pos" />
            <Stat label="Emo. Consistency" value="74" accent="warn" />
          </div>
          <div className="mt-3 border-t border-border/70 pt-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Equity Curve</div>
            <Spark data={[10,12,11,14,18,16,20,24,22,28,32,30,34,40,38,44,48,46,52,56]} color="var(--color-pos)" width={260} height={40} />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <div className="text-center"><div className="text-[10px] text-muted-foreground">Best</div><div className="text-[11px] tabular-nums text-[var(--color-pos)]">+$2,040</div></div>
            <div className="text-center"><div className="text-[10px] text-muted-foreground">Worst</div><div className="text-[11px] tabular-nums text-[var(--color-neg)]">-$620</div></div>
            <div className="text-center"><div className="text-[10px] text-muted-foreground">Avg</div><div className="text-[11px] tabular-nums">+$634</div></div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
