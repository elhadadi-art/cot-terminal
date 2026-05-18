import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Filter } from "lucide-react";
import { Panel, Pill, Hero, Bar } from "@/components/marketiq/primitives";
import { calendar } from "@/lib/mock";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  head: () => ({
    meta: [
      { title: "Economic Calendar — Marketiq" },
      { name: "description", content: "Institutional economic calendar with AI impact assessment." },
      { property: "og:title", content: "Economic Calendar — Marketiq" },
      { property: "og:description", content: "Macro events with AI volatility forecasting." },
    ],
  }),
});

const filters = ["All", "CPI", "NFP", "Fed", "USD", "EUR"];
const countries = ["US", "EU", "UK", "JP", "DE", "CN"];

function ImpactDots({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`size-1.5 rounded-full ${i <= n ? (n === 3 ? "bg-[var(--color-neg)] shadow-[0_0_6px_var(--color-neg)]" : n === 2 ? "bg-[var(--color-warn)]" : "bg-[var(--color-pos)]") : "bg-muted"}`} />
      ))}
    </span>
  );
}

function CalendarPage() {
  return (
    <div className="space-y-4">
      <Hero
        eyebrow="Economic Calendar · 13 May 2026"
        title="Macro events & AI impact"
        subtitle="Dense institutional calendar augmented with AI volatility scoring per market."
      >
        <div className="flex items-center gap-1.5">
          <button className="h-9 px-3 rounded-sm border border-primary text-primary text-[11px]">Today</button>
          <button className="h-9 px-3 rounded-sm border border-border text-muted-foreground text-[11px]">Week</button>
        </div>
      </Hero>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
        <Panel
          title="Schedule"
          right={
            <div className="flex items-center gap-1">
              {filters.map((f, i) => (
                <button key={f} className={`h-6 px-2 rounded-sm border text-[10px] ${i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>{f}</button>
              ))}
              <span className="mx-1 h-4 w-px bg-border" />
              <select className="h-6 bg-secondary border border-border text-[10px] px-1 rounded-sm">
                {countries.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          }
          bodyClassName="p-0"
        >
          <table className="w-full text-[12px]">
            <thead className="bg-secondary/40 sticky top-0">
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-3 py-2">Time</th>
                <th className="text-left px-3 py-2">Country</th>
                <th className="text-left px-3 py-2">Event</th>
                <th className="text-center px-3 py-2">Impact</th>
                <th className="text-right px-3 py-2">Forecast</th>
                <th className="text-right px-3 py-2">Previous</th>
                <th className="text-right px-3 py-2">Actual</th>
                <th className="text-left px-3 py-2">AI Impact</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((c, i) => (
                <tr key={i} className="border-t border-border/60 hover:bg-secondary/40">
                  <td className="px-3 py-1.5 text-muted-foreground tabular-nums">{c.time}</td>
                  <td className="px-3 py-1.5">{c.flag} <span className="text-muted-foreground">{c.country}</span></td>
                  <td className="px-3 py-1.5 font-medium">{c.event}</td>
                  <td className="px-3 py-1.5 text-center"><ImpactDots n={c.impact} /></td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">{c.forecast}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">{c.previous}</td>
                  <td className={`px-3 py-1.5 text-right tabular-nums font-semibold ${c.actual === "—" ? "text-muted-foreground" : "text-foreground"}`}>{c.actual}</td>
                  <td className="px-3 py-1.5"><Pill tone="primary"><Sparkles className="size-2.5" />{c.ai}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <div className="space-y-3">
          <Panel title="AI Volatility Outlook" right={<Sparkles className="size-3 text-primary" />}>
            <ul className="space-y-2 text-[12px]">
              <li>
                <div className="flex items-center justify-between"><span>Fed speech expected</span><Pill tone="warn">HIGH</Pill></div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Potential Nasdaq volatility window 10:00–11:30 ET.</p>
              </li>
              <li>
                <div className="flex items-center justify-between"><span>USD vol elevated</span><Pill tone="neg">EXTREME</Pill></div>
                <p className="text-[10px] text-muted-foreground mt-0.5">DXY straddle pricing 0.8% intraday move.</p>
              </li>
              <li>
                <div className="flex items-center justify-between"><span>EUR neutral</span><Pill tone="neutral">LOW</Pill></div>
              </li>
            </ul>
          </Panel>

          <Panel title="Session Vol Timeline">
            <div className="space-y-2">
              {["Asia","London","NY","After"].map((s, i) => {
                const v = [22, 58, 86, 34][i];
                return (
                  <div key={s}>
                    <div className="flex justify-between text-[11px]"><span>{s}</span><span className="tabular-nums">{v}</span></div>
                    <Bar value={v} color={v > 70 ? "var(--color-neg)" : v > 40 ? "var(--color-warn)" : "var(--color-pos)"} />
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Filters">
            <div className="flex flex-wrap gap-1">
              {["CPI","NFP","Fed","ECB","BOE","BOJ","Crude","CFTC"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
