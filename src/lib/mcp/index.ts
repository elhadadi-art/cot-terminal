import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMarketSnapshot from "./tools/get-market-snapshot";
import getTopMovers from "./tools/get-top-movers";
import getMarketNews from "./tools/get-market-news";
import getAiSignals from "./tools/get-ai-signals";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "marketiq-mcp",
  title: "Marketiq Terminal",
  version: "0.1.0",
  instructions:
    "Institutional market-data tools for Marketiq: indices snapshot, top movers, market news, and AI trading signals. All tools act as the signed-in Marketiq user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMarketSnapshot, getTopMovers, getMarketNews, getAiSignals],
});