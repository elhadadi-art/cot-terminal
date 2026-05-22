import { queryOptions } from "@tanstack/react-query";
import {
  getAiSignals,
  getCryptoAssets,
  getEconomicEvents,
  getForexPairs,
  getFuturesMarkets,
  getHomepageSnapshot,
  getInsiderTrades,
  getMarketBreadth,
  getMarketIndices,
  getMarketNews,
  getMostActive,
  getTopGainers,
  getTopLosers,
} from "./market.functions";

// Centralized query keys + options. Tweak staleTime per domain.
const STALE_FAST = 15_000;
const STALE_SLOW = 60_000;

export const marketQueries = {
  homepage: () =>
    queryOptions({
      queryKey: ["market", "homepage"],
      queryFn: () => getHomepageSnapshot(),
      staleTime: STALE_FAST,
    }),
  indices: () =>
    queryOptions({
      queryKey: ["market", "indices"],
      queryFn: () => getMarketIndices(),
      staleTime: STALE_FAST,
    }),
  gainers: (limit = 10) =>
    queryOptions({
      queryKey: ["market", "stocks", "gainers", limit],
      queryFn: () => getTopGainers({ data: { limit } }),
      staleTime: STALE_FAST,
    }),
  losers: (limit = 10) =>
    queryOptions({
      queryKey: ["market", "stocks", "losers", limit],
      queryFn: () => getTopLosers({ data: { limit } }),
      staleTime: STALE_FAST,
    }),
  mostActive: (limit = 10) =>
    queryOptions({
      queryKey: ["market", "stocks", "active", limit],
      queryFn: () => getMostActive({ data: { limit } }),
      staleTime: STALE_FAST,
    }),
  news: (limit = 20) =>
    queryOptions({
      queryKey: ["market", "news", limit],
      queryFn: () => getMarketNews({ data: { limit } }),
      staleTime: STALE_SLOW,
    }),
  signals: (limit = 10) =>
    queryOptions({
      queryKey: ["market", "signals", limit],
      queryFn: () => getAiSignals({ data: { limit } }),
      staleTime: STALE_FAST,
    }),
  breadth: () =>
    queryOptions({
      queryKey: ["market", "breadth"],
      queryFn: () => getMarketBreadth(),
      staleTime: STALE_FAST,
    }),
  insiders: (limit = 15) =>
    queryOptions({
      queryKey: ["market", "insiders", limit],
      queryFn: () => getInsiderTrades({ data: { limit } }),
      staleTime: STALE_SLOW,
    }),
  events: (limit = 15) =>
    queryOptions({
      queryKey: ["market", "events", limit],
      queryFn: () => getEconomicEvents({ data: { limit } }),
      staleTime: STALE_SLOW,
    }),
  futures: () =>
    queryOptions({
      queryKey: ["market", "futures"],
      queryFn: () => getFuturesMarkets(),
      staleTime: STALE_FAST,
    }),
  forex: () =>
    queryOptions({
      queryKey: ["market", "forex"],
      queryFn: () => getForexPairs(),
      staleTime: STALE_FAST,
    }),
  crypto: (limit = 10) =>
    queryOptions({
      queryKey: ["market", "crypto", limit],
      queryFn: () => getCryptoAssets({ data: { limit } }),
      staleTime: STALE_FAST,
    }),
};