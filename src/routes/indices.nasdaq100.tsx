import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/marketiq/index-page";

export const Route = createFileRoute("/indices/nasdaq100")({
  component: () => <IndexPage name="Nasdaq 100" code="NDX" last={18412.55} chg={1.04} exchange="NASDAQ" />,
  head: () => ({
    meta: [
      { title: "Nasdaq 100 — Marketiq" },
      { name: "description", content: "Nasdaq 100 index overview, constituents and AI regime." },
      { property: "og:title", content: "Nasdaq 100 — Marketiq" },
      { property: "og:description", content: "Nasdaq 100 AI-augmented index terminal." },
    ],
  }),
});
