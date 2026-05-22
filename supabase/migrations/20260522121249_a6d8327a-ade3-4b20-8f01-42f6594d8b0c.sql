
-- =========================================================
-- MARKETIQ — market data schema
-- =========================================================

-- 1. Market indices
CREATE TABLE public.market_indices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price NUMERIC(18,4) NOT NULL,
  change NUMERIC(18,4) NOT NULL DEFAULT 0,
  change_percent NUMERIC(10,4) NOT NULL DEFAULT 0,
  volume BIGINT NOT NULL DEFAULT 0,
  spark JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_market_indices_symbol ON public.market_indices(symbol);

-- 2. Stocks
CREATE TABLE public.stocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  sector TEXT,
  industry TEXT,
  country TEXT DEFAULT 'US',
  market_cap NUMERIC(20,2),
  price NUMERIC(18,4) NOT NULL,
  change_percent NUMERIC(10,4) NOT NULL DEFAULT 0,
  volume BIGINT NOT NULL DEFAULT 0,
  avg_volume BIGINT,
  sentiment NUMERIC(4,3),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_stocks_symbol ON public.stocks(symbol);
CREATE INDEX idx_stocks_sector ON public.stocks(sector);
CREATE INDEX idx_stocks_change_pct ON public.stocks(change_percent DESC);
CREATE INDEX idx_stocks_volume ON public.stocks(volume DESC);

-- 3. News
CREATE TABLE public.market_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  source TEXT NOT NULL,
  url TEXT,
  category TEXT,
  sentiment TEXT CHECK (sentiment IN ('bullish','bearish','neutral')) DEFAULT 'neutral',
  impact TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_news_published ON public.market_news(published_at DESC);

-- 4. AI signals
CREATE TABLE public.ai_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('buy','sell','hold','breakout','oversold','overbought','momentum','volume_spike')),
  confidence NUMERIC(4,3) NOT NULL,
  score NUMERIC(10,4),
  trigger_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_signals_symbol ON public.ai_signals(symbol);
CREATE INDEX idx_signals_type ON public.ai_signals(signal_type);
CREATE INDEX idx_signals_created ON public.ai_signals(created_at DESC);

-- 5. Market breadth
CREATE TABLE public.market_breadth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advancing INT NOT NULL DEFAULT 0,
  declining INT NOT NULL DEFAULT 0,
  new_highs INT NOT NULL DEFAULT 0,
  new_lows INT NOT NULL DEFAULT 0,
  above_sma50 INT NOT NULL DEFAULT 0,
  below_sma50 INT NOT NULL DEFAULT 0,
  fear_greed_index INT NOT NULL DEFAULT 50,
  vix NUMERIC(10,4),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Insider trades
CREATE TABLE public.insider_trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  insider_name TEXT NOT NULL,
  role TEXT,
  transaction_type TEXT CHECK (transaction_type IN ('buy','sell')) NOT NULL,
  shares BIGINT NOT NULL,
  price NUMERIC(18,4),
  value NUMERIC(20,2),
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_insider_symbol ON public.insider_trades(symbol);
CREATE INDEX idx_insider_date ON public.insider_trades(transaction_date DESC);

-- 7. Economic events
CREATE TABLE public.economic_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  flag TEXT,
  impact INT CHECK (impact BETWEEN 1 AND 3) DEFAULT 1,
  event_name TEXT NOT NULL,
  actual TEXT,
  forecast TEXT,
  previous TEXT,
  ai_note TEXT,
  event_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_events_time ON public.economic_events(event_time);

-- 8. Futures
CREATE TABLE public.futures_markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price NUMERIC(18,4) NOT NULL,
  change_percent NUMERIC(10,4) NOT NULL DEFAULT 0,
  spark JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Forex
CREATE TABLE public.forex_pairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pair TEXT NOT NULL UNIQUE,
  price NUMERIC(18,6) NOT NULL,
  change_percent NUMERIC(10,4) NOT NULL DEFAULT 0,
  spark JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Crypto
CREATE TABLE public.crypto_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price NUMERIC(20,4) NOT NULL,
  market_cap NUMERIC(24,2),
  volume NUMERIC(24,2),
  change_percent NUMERIC(10,4) NOT NULL DEFAULT 0,
  spark JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- RLS — public read, no client writes
-- =========================================================
ALTER TABLE public.market_indices  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_news     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_signals      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_breadth  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insider_trades  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.economic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.futures_markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forex_pairs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crypto_assets   ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'market_indices','stocks','market_news','ai_signals','market_breadth',
    'insider_trades','economic_events','futures_markets','forex_pairs','crypto_assets'
  ])
  LOOP
    EXECUTE format('CREATE POLICY "public_read_%I" ON public.%I FOR SELECT TO anon, authenticated USING (true);', t, t);
  END LOOP;
END$$;
