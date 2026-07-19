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
  name: "get_ai_signals",
  title: "Get AI trading signals",
  description:
    "Return Marketiq's most recent AI-generated buy/sell/watch signals with confidence and trigger notes.",
  inputSchema: {
    signalType: z
      .enum(["buy", "sell", "watch"])
      .optional()
      .describe("Optionally filter by signal type."),
    minConfidence: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .describe("Minimum confidence 0-1. Default 0."),
    limit: z.number().int().min(1).max(50).optional().describe("Max signals. Default 15."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ signalType, minConfidence, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = client(ctx);
    let q = sb
      .from("ai_signals")
      .select("symbol,signal_type,confidence,score,trigger_note,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 15);
    if (signalType) q = q.eq("signal_type", signalType);
    if (minConfidence != null) q = q.gte("confidence", minConfidence);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { signals: data ?? [] },
    };
  },
});