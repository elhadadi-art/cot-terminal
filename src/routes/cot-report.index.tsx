import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";
import { findCotMarket } from "@/lib/cot-markets";

export const Route = createFileRoute("/cot-report/")({
  component: () => {
    const m = findCotMarket("sp500")!;
    return <COTMarketPage market={m.name} code={m.code} exchange={m.exchange} />;
  },
  head: () => ({
    meta: [
      { title: "COT Report — Legacy Futures Positioning | Marketiq" },
      { name: "description", content: "Legacy CFTC COT positioning across currencies, indexes, metals, energies, treasuries, grains, softs, livestock and crypto." },
      { property: "og:title", content: "COT Report — Legacy Futures Positioning" },
      { property: "og:description", content: "Institutional COT positioning terminal." },
    ],
  }),
});
