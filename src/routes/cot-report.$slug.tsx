import { createFileRoute, notFound } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";
import { findCotMarket } from "@/lib/cot-markets";

export const Route = createFileRoute("/cot-report/$slug")({
  component: COTSlugPage,
  head: ({ params }) => {
    const m = findCotMarket(params.slug);
    const title = m ? `COT — ${m.name} | Marketiq` : "COT Report | Marketiq";
    const desc = m
      ? `${m.name} (${m.code}) futures COT positioning on ${m.exchange}.`
      : "Institutional COT positioning terminal.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
});

function COTSlugPage() {
  const { slug } = Route.useParams();
  const m = findCotMarket(slug);
  if (!m) throw notFound();
  return <COTMarketPage market={m.name} code={m.code} exchange={m.exchange} />;
}