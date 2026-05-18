import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/components/marketiq/index-page";

export const Route = createFileRoute("/indices/dow30")({
  component: () => <IndexPage name="Dow Jones 30" code="DJI" last={39842.10} chg={0.38} exchange="NYSE" />,
  head: () => ({
    meta: [
      { title: "Dow Jones 30 — Marketiq" },
      { name: "description", content: "Dow Jones 30 index overview, constituents and AI regime." },
      { property: "og:title", content: "Dow Jones 30 — Marketiq" },
      { property: "og:description", content: "Dow Jones 30 AI-augmented index terminal." },
    ],
  }),
});
