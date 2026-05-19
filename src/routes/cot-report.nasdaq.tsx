import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";

export const Route = createFileRoute("/cot-report/nasdaq")({
  component: () => <COTMarketPage market="Nasdaq 100" code="NDX" exchange="CME" />,
  head: () => ({ meta: [{ title: "COT — Nasdaq 100 | Marketiq" }, { name: "description", content: "Nasdaq 100 futures COT positioning." }] }),
});
