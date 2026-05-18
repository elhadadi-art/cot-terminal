import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";

export const Route = createFileRoute("/cot-report/")({
  component: () => <COTMarketPage market="Nasdaq 100" code="NDX" exchange="CME" />,
  head: () => ({
    meta: [
      { title: "COT Report — Nasdaq 100 | Marketiq" },
      { name: "description", content: "Institutional Nasdaq 100 futures positioning, AI commentary and historical extremes." },
      { property: "og:title", content: "COT Report — Nasdaq 100" },
      { property: "og:description", content: "Institutional COT positioning terminal." },
    ],
  }),
});
