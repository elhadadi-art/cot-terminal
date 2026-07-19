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
  name: "get_top_movers",
  title: "Get top movers",
  description:
    "List the top gainers, losers, or most-active US stocks tracked by Marketiq. Default limit 10.",
  inputSchema: {
    kind: z.enum(["gainers", "losers", "active"]).describe("Which mover list to return."),
    limit: z.number().int().min(1).max(50).optional().describe("Max rows to return (1-50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ kind, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = client(ctx);
    const cap = limit ?? 10;
    let q = sb
      .from("stocks")
      .select("symbol,company_name,sector,price,change_percent,volume,market_cap");
    if (kind === "gainers") q = q.order("change_percent", { ascending: false }).limit(cap);
    else if (kind === "losers") q = q.order("change_percent", { ascending: true }).limit(cap);
    else q = q.order("volume", { ascending: false }).limit(cap);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { rows: data ?? [] },
    };
  },
});