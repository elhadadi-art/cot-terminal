import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

function client(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "get_market_snapshot",
  title: "Get market snapshot",
  description:
    "Return the current Marketiq market snapshot: major indices, breadth, and Fear & Greed reading.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = client(ctx);
    const [indices, breadth] = await Promise.all([
      sb.from("market_indices").select("symbol,name,price,change,change_percent,volume,updated_at"),
      sb
        .from("market_breadth")
        .select("advancing,declining,new_highs,new_lows,fear_greed_index,vix,updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    if (indices.error)
      return { content: [{ type: "text", text: indices.error.message }], isError: true };
    const payload = { indices: indices.data ?? [], breadth: breadth.data ?? null };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});