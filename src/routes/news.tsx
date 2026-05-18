import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Search } from "lucide-react";
import { Panel, Pill, Hero, Bar } from "@/components/marketiq/primitives";
import { news, watchlist } from "@/lib/mock";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "News — Marketiq" },
      { name: "description", content: "AI-augmented market intelligence: macro, equities, crypto." },
      { property: "og:title", content: "News — Marketiq" },
      { property: "og:description", content: "AI-augmented market news with expected impact." },
    ],
  }),
});

const cats = ["Featured", "Macro", "Equities", "Crypto"];

function NewsPage() {
  const featured = news[0];
  return (
    <div className="space-y-4">
      <Hero
        eyebrow="Market Intelligence"
        title="News & AI Briefings"
        subtitle="Curated wires, ranked by AI for expected impact across asset classes."
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search headlines…" className="h-9 bg-secondary/60 border border-border rounded-sm pl-8 pr-3 text-[12px] focus:outline-none focus:border-primary/60" />
        </div>
      </Hero>

      <div className="flex items-center gap-2 overflow-x-auto">
        {cats.map((c, i) => (
          <button key={c} className={`h-7 px-2.5 rounded-sm border text-[11px] tracking-wide ${i === 0 ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-3">
          <Panel title="Featured" right={<Pill tone="primary"><Sparkles className="size-2.5" />AI Pick</Pill>}>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] tracking-widest uppercase text-primary">{featured.cat} · {featured.time}</div>
              <h2 className="text-lg font-semibold tracking-tight">{featured.head}</h2>
              <p className="text-[12px] text-muted-foreground leading-relaxed">{featured.sum}</p>
              <div className="flex items-center gap-2 mt-1">
                <Pill tone="pos">{featured.imp}</Pill>
                <Pill tone="neutral">Confidence 84%</Pill>
              </div>
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {news.slice(1).map((n, i) => (
              <Panel key={i} title={`${n.cat} · ${n.time}`}>
                <h3 className="text-[13px] font-semibold leading-snug">{n.head}</h3>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{n.sum}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Pill tone={n.imp.startsWith("Bull") ? "pos" : n.imp.startsWith("Bear") ? "neg" : "neutral"}>{n.imp}</Pill>
                  <Pill tone="neutral"><Sparkles className="size-2.5" />AI</Pill>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Panel title="Top Movers">
            <ul className="divide-y divide-border/60 -mx-3">
              {watchlist.map((w) => {
                const pos = w.chg >= 0;
                return (
                  <li key={w.sym} className="flex items-center gap-2 px-3 py-1.5">
                    <span className="font-semibold tabular-nums w-12">{w.sym}</span>
                    <span className="flex-1 text-muted-foreground text-[11px] truncate">{w.name}</span>
                    <span className="tabular-nums text-[11px]">{w.price.toFixed(2)}</span>
                    <span className={`tabular-nums text-[11px] w-12 text-right ${pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}`}>{pos ? "+" : ""}{w.chg.toFixed(2)}%</span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Market Pulse">
            <div className="space-y-2">
              {[
                { l: "Risk Sentiment", v: 68, c: "var(--color-pos)" },
                { l: "Macro Calm",     v: 54, c: "var(--color-warn)" },
                { l: "AI Confidence",  v: 78, c: "var(--color-primary)" },
              ].map((x) => (
                <div key={x.l}>
                  <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">{x.l}</span><span className="tabular-nums">{x.v}</span></div>
                  <Bar value={x.v} color={x.c} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Upcoming Events">
            <ul className="space-y-1.5">
              <li className="flex justify-between text-[11px]"><span>CPI YoY</span><span className="text-muted-foreground tabular-nums">14:30 ET</span></li>
              <li className="flex justify-between text-[11px]"><span>Fed Speech</span><span className="text-muted-foreground tabular-nums">16:00 ET</span></li>
              <li className="flex justify-between text-[11px]"><span>BOJ Core CPI</span><span className="text-muted-foreground tabular-nums">20:30 JST</span></li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
