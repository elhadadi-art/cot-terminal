import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/marketiq/index-page";

export const Route = createFileRoute("/indices/russell")({
  component: () => <IndexPage name="Russell 2000" code="RUT" last={2045.50} chg={-0.34} exchange="NYSE" />,
  head: () => ({
    meta: [
      { title: "Russell 2000 — Marketiq" },
      { name: "description", content: "Russell 2000 index overview, constituents and AI regime." },
      { property: "og:title", content: "Russell 2000 — Marketiq" },
      { property: "og:description", content: "Russell 2000 AI-augmented index terminal." },
    ],
  }),
});
