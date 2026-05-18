import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/marketiq/index-page";

export const Route = createFileRoute("/indices/sp500")({
  component: () => <IndexPage name="S&P 500" code="SPX" last={5320.84} chg={0.62} exchange="CBOE" />,
  head: () => ({
    meta: [
      { title: "S&P 500 — Marketiq" },
      { name: "description", content: "S&P 500 index overview, constituents and AI regime." },
      { property: "og:title", content: "S&P 500 — Marketiq" },
      { property: "og:description", content: "S&P 500 AI-augmented index terminal." },
    ],
  }),
});
