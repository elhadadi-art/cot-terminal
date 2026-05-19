import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";
import { COT_MARKETS } from "@/lib/cot-markets";

export const Route = createFileRoute("/cot-report/$slug")({
  component: COTSlugPage,
  loader: ({ params }) => {
    const m = COT_MARKETS[params.slug];
    if (!m) throw notFound();
    return { market: m };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.market;
    const title = m ? `COT — ${m.market} | Marketiq` : "COT Report | Marketiq";
    const desc  = m ? `${m.market} (${m.code}) futures COT positioning on ${m.exchange}.` : "Institutional COT positioning terminal.";
    return { meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
    ]};
  },
  notFoundComponent: () => (
    <div className="p-6 text-sm">
      <h1 className="text-base font-semibold mb-2">Market not found</h1>
      <p className="text-muted-foreground mb-3">That COT market isn't in the registry.</p>
      <Link to="/cot-report" className="text-primary underline">Back to COT Report</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-[var(--color-neg)]">{error.message}</div>
  ),
});

function COTSlugPage() {
  const { market } = Route.useLoaderData();
  return <COTMarketPage market={market.market} code={market.code} exchange={market.exchange} />;
}