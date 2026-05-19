import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";

export const Route = createFileRoute("/cot-report/gold")({
  component: () => <COTMarketPage market="Gold Futures" code="GC" exchange="COMEX" />,
  head: () => ({ meta: [{ title: "COT — Gold | Marketiq" }, { name: "description", content: "Gold futures COT positioning." }] }),
});
