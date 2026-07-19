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
  name: "get_market_news",
  title: "Get market news",
  description: "Return the most recent market news headlines with source, sentiment, and impact.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max headlines (1-50). Default 15."),
    category: z.string().optional().describe("Optional category filter (e.g. 'macro')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ limit, category }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = client(ctx);
    let q = sb
      .from("market_news")
      .select("title,summary,source,url,category,sentiment,impact,published_at")
      .order("published_at", { ascending: false })
      .limit(limit ?? 15);
    if (category) q = q.eq("category", category);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { news: data ?? [] },
    };
  },
});