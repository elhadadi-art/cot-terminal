import { createFileRoute } from "@tanstack/react-router";
import { COTMarketPage } from "@/components/marketiq/cot-page";

export const Route = createFileRoute("/cot-report/euro")({
  component: () => <COTMarketPage market="Euro FX" code="6E" exchange="CME" />,
  head: () => ({ meta: [{ title: "COT — Euro FX | Marketiq" }, { name: "description", content: "Euro FX futures COT positioning." }] }),
});
