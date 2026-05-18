import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";

export const Route = createFileRoute("/cot-report/sp500")({
  component: () => <COTMarketPage market="S&P 500" code="SPX" exchange="CME" />,
  head: () => ({ meta: [{ title: "COT — S&P 500 | Marketiq" }, { name: "description", content: "S&P 500 futures COT positioning." }] }),
});
