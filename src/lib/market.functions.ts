import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type {
  AiSignalDTO,
  CryptoAssetDTO,
  EconomicEventDTO,
  ForexPairDTO,
  FuturesMarketDTO,
  HomepageSnapshotDTO,
  InsiderTradeDTO,
  MarketBreadthDTO,
  MarketIndexDTO,
  MarketNewsDTO,
  SparkPoint,
  StockDTO,
} from "./market.types";

// ---------- helpers ----------
const toSpark = (raw: unknown): SparkPoint[] => {
  if (Array.isArray(raw)) return raw.filter((n): n is number => typeof n === "number");
  return [];
};
const n = (v: unknown, fallback = 0): number =>
  typeof v === "number" ? v : v == null ? fallback : Number(v) || fallback;
const nn = (v: unknown): number | null =>
  v == null ? null : typeof v === "number" ? v : Number(v);

// ---------- mappers ----------
const mapIndex = (r: any): MarketIndexDTO => ({
  id: r.id,
  symbol: r.symbol,
  name: r.name,
  price: n(r.price),
  change: n(r.change),
  changePercent: n(r.change_percent),
  volume: n(r.volume),
  spark: toSpark(r.spark),
  updatedAt: r.updated_at,
});
const mapStock = (r: any): StockDTO => ({
  id: r.id,
  symbol: r.symbol,
  companyName: r.company_name,
  sector: r.sector,
  industry: r.industry,
  country: r.country,
  price: n(r.price),
  changePercent: n(r.change_percent),
  volume: n(r.volume),
  avgVolume: nn(r.avg_volume),
  marketCap: nn(r.market_cap),
  sentiment: nn(r.sentiment),
  updatedAt: r.updated_at,
});
const mapNews = (r: any): MarketNewsDTO => ({
  id: r.id,
  title: r.title,
  summary: r.summary,
  source: r.source,
  url: r.url,
  category: r.category,
  sentiment: r.sentiment ?? "neutral",
  impact: r.impact,
  publishedAt: r.published_at,
});
const mapSignal = (r: any): AiSignalDTO => ({
  id: r.id,
  symbol: r.symbol,
  signalType: r.signal_type,
  confidence: n(r.confidence),
  score: nn(r.score),
  triggerNote: r.trigger_note,
  createdAt: r.created_at,
});
const mapBreadth = (r: any): MarketBreadthDTO => ({
  id: r.id,
  advancing: n(r.advancing),
  declining: n(r.declining),
  newHighs: n(r.new_highs),
  newLows: n(r.new_lows),
  aboveSma50: n(r.above_sma50),
  belowSma50: n(r.below_sma50),
  fearGreedIndex: n(r.fear_greed_index, 50),
  vix: nn(r.vix),
  updatedAt: r.updated_at,
});
const mapInsider = (r: any): InsiderTradeDTO => ({
  id: r.id,
  symbol: r.symbol,
  insiderName: r.insider_name,
  role: r.role,
  transactionType: r.transaction_type,
  shares: Number(r.shares) || 0,
  price: nn(r.price),
  value: nn(r.value),
  transactionDate: r.transaction_date,
});
const mapEvent = (r: any): EconomicEventDTO => ({
  id: r.id,
  country: r.country,
  flag: r.flag,
  eventName: r.event_name,
  impact: n(r.impact, 1),
  actual: r.actual,
  forecast: r.forecast,
  previous: r.previous,
  aiNote: r.ai_note,
  eventTime: r.event_time,
});
const mapFutures = (r: any): FuturesMarketDTO => ({
  id: r.id,
  symbol: r.symbol,
  name: r.name,
  price: n(r.price),
  changePercent: n(r.change_percent),
  spark: toSpark(r.spark),
  updatedAt: r.updated_at,
});
const mapForex = (r: any): ForexPairDTO => ({
  id: r.id,
  pair: r.pair,
  price: n(r.price),
  changePercent: n(r.change_percent),
  spark: toSpark(r.spark),
  updatedAt: r.updated_at,
});
const mapCrypto = (r: any): CryptoAssetDTO => ({
  id: r.id,
  symbol: r.symbol,
  name: r.name,
  price: n(r.price),
  changePercent: n(r.change_percent),
  volume: nn(r.volume),
  marketCap: nn(r.market_cap),
  spark: toSpark(r.spark),
  updatedAt: r.updated_at,
});

const throwIf = <T,>(res: { data: T | null; error: any }, label: string): T => {
  if (res.error) throw new Error(`[${label}] ${res.error.message}`);
  return (res.data ?? []) as T;
};

// ---------- individual server fns ----------
export const getMarketIndices = createServerFn({ method: "GET" }).handler(async () => {
  const res = await supabase.from("market_indices").select("*").order("symbol");
  return throwIf(res, "market_indices").map(mapIndex) as MarketIndexDTO[];
});

export const getTopGainers = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(10) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("stocks")
      .select("*")
      .order("change_percent", { ascending: false })
      .limit(data.limit);
    return throwIf(res, "stocks/gainers").map(mapStock) as StockDTO[];
  });

export const getTopLosers = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(10) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("stocks")
      .select("*")
      .order("change_percent", { ascending: true })
      .limit(data.limit);
    return throwIf(res, "stocks/losers").map(mapStock) as StockDTO[];
  });

export const getMostActive = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(10) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("stocks")
      .select("*")
      .order("volume", { ascending: false })
      .limit(data.limit);
    return throwIf(res, "stocks/active").map(mapStock) as StockDTO[];
  });

export const getMarketNews = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(100).default(20) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("market_news")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(data.limit);
    return throwIf(res, "market_news").map(mapNews) as MarketNewsDTO[];
  });

export const getAiSignals = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(10) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("ai_signals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(data.limit);
    return throwIf(res, "ai_signals").map(mapSignal) as AiSignalDTO[];
  });

export const getMarketBreadth = createServerFn({ method: "GET" }).handler(async () => {
  const res = await supabase
    .from("market_breadth")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (res.error) throw new Error(`[market_breadth] ${res.error.message}`);
  return res.data ? mapBreadth(res.data) : null;
});

export const getInsiderTrades = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(15) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("insider_trades")
      .select("*")
      .order("transaction_date", { ascending: false })
      .limit(data.limit);
    return throwIf(res, "insider_trades").map(mapInsider) as InsiderTradeDTO[];
  });

export const getEconomicEvents = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(15) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("economic_events")
      .select("*")
      .order("event_time", { ascending: true })
      .limit(data.limit);
    return throwIf(res, "economic_events").map(mapEvent) as EconomicEventDTO[];
  });

export const getFuturesMarkets = createServerFn({ method: "GET" }).handler(async () => {
  const res = await supabase.from("futures_markets").select("*").order("symbol");
  return throwIf(res, "futures_markets").map(mapFutures) as FuturesMarketDTO[];
});

export const getForexPairs = createServerFn({ method: "GET" }).handler(async () => {
  const res = await supabase.from("forex_pairs").select("*").order("pair");
  return throwIf(res, "forex_pairs").map(mapForex) as ForexPairDTO[];
});

export const getCryptoAssets = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(50).default(10) }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const res = await supabase
      .from("crypto_assets")
      .select("*")
      .order("market_cap", { ascending: false, nullsFirst: false })
      .limit(data.limit);
    return throwIf(res, "crypto_assets").map(mapCrypto) as CryptoAssetDTO[];
  });

// ---------- aggregate snapshot for the homepage ----------
export const getHomepageSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomepageSnapshotDTO> => {
    const [
      indices,
      gainers,
      losers,
      active,
      news,
      signals,
      breadth,
      insiders,
      events,
      futures,
      forex,
      crypto,
    ] = await Promise.all([
      supabase.from("market_indices").select("*").order("symbol"),
      supabase.from("stocks").select("*").order("change_percent", { ascending: false }).limit(8),
      supabase.from("stocks").select("*").order("change_percent", { ascending: true }).limit(8),
      supabase.from("stocks").select("*").order("volume", { ascending: false }).limit(8),
      supabase.from("market_news").select("*").order("published_at", { ascending: false }).limit(20),
      supabase.from("ai_signals").select("*").order("created_at", { ascending: false }).limit(8),
      supabase
        .from("market_breadth")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("insider_trades").select("*").order("transaction_date", { ascending: false }).limit(10),
      supabase.from("economic_events").select("*").order("event_time", { ascending: true }).limit(10),
      supabase.from("futures_markets").select("*").order("symbol"),
      supabase.from("forex_pairs").select("*").order("pair"),
      supabase
        .from("crypto_assets")
        .select("*")
        .order("market_cap", { ascending: false, nullsFirst: false })
        .limit(8),
    ]);

    const checks: Array<[string, { error: any }]> = [
      ["market_indices", indices],
      ["stocks/gainers", gainers],
      ["stocks/losers", losers],
      ["stocks/active", active],
      ["market_news", news],
      ["ai_signals", signals],
      ["market_breadth", breadth],
      ["insider_trades", insiders],
      ["economic_events", events],
      ["futures_markets", futures],
      ["forex_pairs", forex],
      ["crypto_assets", crypto],
    ];
    for (const [label, res] of checks) {
      if (res.error) throw new Error(`[${label}] ${res.error.message}`);
    }

    return {
      indices: (indices.data ?? []).map(mapIndex),
      topGainers: (gainers.data ?? []).map(mapStock),
      topLosers: (losers.data ?? []).map(mapStock),
      mostActive: (active.data ?? []).map(mapStock),
      news: (news.data ?? []).map(mapNews),
      signals: (signals.data ?? []).map(mapSignal),
      breadth: breadth.data ? mapBreadth(breadth.data) : null,
      insiders: (insiders.data ?? []).map(mapInsider),
      events: (events.data ?? []).map(mapEvent),
      futures: (futures.data ?? []).map(mapFutures),
      forex: (forex.data ?? []).map(mapForex),
      crypto: (crypto.data ?? []).map(mapCrypto),
    };
  },
);