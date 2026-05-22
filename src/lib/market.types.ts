// Typed DTOs for market data — kept serialization-safe for SSR / RPC.

export type SparkPoint = number;

export interface MarketIndexDTO {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  spark: SparkPoint[];
  updatedAt: string;
}

export interface StockDTO {
  id: string;
  symbol: string;
  companyName: string;
  sector: string | null;
  industry: string | null;
  country: string | null;
  price: number;
  changePercent: number;
  volume: number;
  avgVolume: number | null;
  marketCap: number | null;
  sentiment: number | null;
  updatedAt: string;
}

export interface MarketNewsDTO {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  url: string | null;
  category: string | null;
  sentiment: string;
  impact: string | null;
  publishedAt: string;
}

export interface AiSignalDTO {
  id: string;
  symbol: string;
  signalType: string;
  confidence: number;
  score: number | null;
  triggerNote: string | null;
  createdAt: string;
}

export interface MarketBreadthDTO {
  id: string;
  advancing: number;
  declining: number;
  newHighs: number;
  newLows: number;
  aboveSma50: number;
  belowSma50: number;
  fearGreedIndex: number;
  vix: number | null;
  updatedAt: string;
}

export interface InsiderTradeDTO {
  id: string;
  symbol: string;
  insiderName: string;
  role: string | null;
  transactionType: string;
  shares: number;
  price: number | null;
  value: number | null;
  transactionDate: string;
}

export interface EconomicEventDTO {
  id: string;
  country: string;
  flag: string | null;
  eventName: string;
  impact: number;
  actual: string | null;
  forecast: string | null;
  previous: string | null;
  aiNote: string | null;
  eventTime: string;
}

export interface FuturesMarketDTO {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  spark: SparkPoint[];
  updatedAt: string;
}

export interface ForexPairDTO {
  id: string;
  pair: string;
  price: number;
  changePercent: number;
  spark: SparkPoint[];
  updatedAt: string;
}

export interface CryptoAssetDTO {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number | null;
  marketCap: number | null;
  spark: SparkPoint[];
  updatedAt: string;
}

export interface HomepageSnapshotDTO {
  indices: MarketIndexDTO[];
  topGainers: StockDTO[];
  topLosers: StockDTO[];
  mostActive: StockDTO[];
  news: MarketNewsDTO[];
  signals: AiSignalDTO[];
  breadth: MarketBreadthDTO | null;
  insiders: InsiderTradeDTO[];
  events: EconomicEventDTO[];
  futures: FuturesMarketDTO[];
  forex: ForexPairDTO[];
  crypto: CryptoAssetDTO[];
}