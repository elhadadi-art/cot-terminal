export type COTMarket = {
  slug: string;
  market: string;
  code: string;
  exchange: string;
};

export type COTCategory = {
  id: string;
  label: string;
  markets: COTMarket[];
};

export const COT_CATEGORIES: COTCategory[] = [
  {
    id: "indexes",
    label: "Indexes",
    markets: [
      { slug: "nasdaq",   market: "Nasdaq 100",        code: "NDX",  exchange: "CME" },
      { slug: "sp500",    market: "S&P 500",           code: "SPX",  exchange: "CME" },
      { slug: "dow",      market: "Dow Jones",         code: "YM",   exchange: "CBOT" },
      { slug: "russell",  market: "Russell 2000",      code: "RTY",  exchange: "CME" },
      { slug: "vix",      market: "VIX Futures",       code: "VX",   exchange: "CFE" },
      { slug: "nikkei",   market: "Nikkei 225",        code: "NKD",  exchange: "CME" },
    ],
  },
  {
    id: "currencies",
    label: "Currencies",
    markets: [
      { slug: "usd-index", market: "US Dollar Index", code: "DXY", exchange: "ICE" },
      { slug: "euro",      market: "Euro FX",         code: "6E",  exchange: "CME" },
      { slug: "gbp",       market: "British Pound",   code: "6B",  exchange: "CME" },
      { slug: "jpy",       market: "Japanese Yen",    code: "6J",  exchange: "CME" },
      { slug: "chf",       market: "Swiss Franc",     code: "6S",  exchange: "CME" },
      { slug: "cad",       market: "Canadian Dollar", code: "6C",  exchange: "CME" },
      { slug: "aud",       market: "Australian Dollar", code: "6A", exchange: "CME" },
      { slug: "nzd",       market: "New Zealand Dollar", code: "6N", exchange: "CME" },
      { slug: "mxn",       market: "Mexican Peso",    code: "6M",  exchange: "CME" },
      { slug: "brl",       market: "Brazilian Real",  code: "6L",  exchange: "CME" },
      { slug: "rub",       market: "Russian Ruble",   code: "6R",  exchange: "CME" },
    ],
  },
  {
    id: "crypto",
    label: "Cryptocurrencies",
    markets: [
      { slug: "btc",       market: "Bitcoin",         code: "BTC", exchange: "CME" },
      { slug: "micro-btc", market: "Micro Bitcoin",   code: "MBT", exchange: "CME" },
      { slug: "eth",       market: "Ether",           code: "ETH", exchange: "CME" },
      { slug: "micro-eth", market: "Micro Ether",     code: "MET", exchange: "CME" },
    ],
  },
  {
    id: "metals",
    label: "Metals",
    markets: [
      { slug: "gold",      market: "Gold",            code: "GC",  exchange: "COMEX" },
      { slug: "silver",    market: "Silver",          code: "SI",  exchange: "COMEX" },
      { slug: "copper",    market: "Copper",          code: "HG",  exchange: "COMEX" },
      { slug: "platinum",  market: "Platinum",        code: "PL",  exchange: "NYMEX" },
      { slug: "palladium", market: "Palladium",       code: "PA",  exchange: "NYMEX" },
    ],
  },
  {
    id: "energies",
    label: "Energies",
    markets: [
      { slug: "wti",       market: "WTI Crude Oil",   code: "CL",  exchange: "NYMEX" },
      { slug: "brent",     market: "Brent Crude",     code: "BZ",  exchange: "ICE" },
      { slug: "natgas",    market: "Natural Gas",     code: "NG",  exchange: "NYMEX" },
      { slug: "heating-oil", market: "Heating Oil",   code: "HO",  exchange: "NYMEX" },
      { slug: "rbob",      market: "RBOB Gasoline",   code: "RB",  exchange: "NYMEX" },
    ],
  },
  {
    id: "rates",
    label: "Treasuries & Rates",
    markets: [
      { slug: "ust-2y",    market: "2-Year T-Note",   code: "ZT",  exchange: "CBOT" },
      { slug: "ust-5y",    market: "5-Year T-Note",   code: "ZF",  exchange: "CBOT" },
      { slug: "ust-10y",   market: "10-Year T-Note",  code: "ZN",  exchange: "CBOT" },
      { slug: "ust-30y",   market: "30-Year T-Bond",  code: "ZB",  exchange: "CBOT" },
      { slug: "ultra-bond",market: "Ultra T-Bond",    code: "UB",  exchange: "CBOT" },
      { slug: "fed-funds", market: "Fed Funds",       code: "ZQ",  exchange: "CBOT" },
      { slug: "sofr",      market: "3M SOFR",         code: "SR3", exchange: "CME" },
    ],
  },
  {
    id: "grains",
    label: "Grains",
    markets: [
      { slug: "corn",      market: "Corn",            code: "ZC",  exchange: "CBOT" },
      { slug: "wheat-chi", market: "Wheat (Chicago)", code: "ZW",  exchange: "CBOT" },
      { slug: "wheat-kc",  market: "Wheat (KC HRW)",  code: "KE",  exchange: "CBOT" },
      { slug: "soybeans",  market: "Soybeans",        code: "ZS",  exchange: "CBOT" },
      { slug: "soy-oil",   market: "Soybean Oil",     code: "ZL",  exchange: "CBOT" },
      { slug: "soy-meal",  market: "Soybean Meal",    code: "ZM",  exchange: "CBOT" },
      { slug: "oats",      market: "Oats",            code: "ZO",  exchange: "CBOT" },
      { slug: "rough-rice",market: "Rough Rice",      code: "ZR",  exchange: "CBOT" },
    ],
  },
  {
    id: "softs",
    label: "Softs",
    markets: [
      { slug: "cocoa",     market: "Cocoa",           code: "CC",  exchange: "ICE" },
      { slug: "coffee",    market: "Coffee",          code: "KC",  exchange: "ICE" },
      { slug: "sugar",     market: "Sugar #11",       code: "SB",  exchange: "ICE" },
      { slug: "cotton",    market: "Cotton #2",       code: "CT",  exchange: "ICE" },
      { slug: "oj",        market: "Orange Juice",    code: "OJ",  exchange: "ICE" },
      { slug: "lumber",    market: "Lumber",          code: "LBR", exchange: "CME" },
    ],
  },
  {
    id: "livestock",
    label: "Livestock & Dairy",
    markets: [
      { slug: "live-cattle",   market: "Live Cattle",   code: "LE",  exchange: "CME" },
      { slug: "feeder-cattle", market: "Feeder Cattle", code: "GF",  exchange: "CME" },
      { slug: "lean-hogs",     market: "Lean Hogs",     code: "HE",  exchange: "CME" },
      { slug: "milk",          market: "Class III Milk",code: "DC",  exchange: "CME" },
      { slug: "cheese",        market: "Cheese",        code: "CSC", exchange: "CME" },
      { slug: "butter",        market: "Butter",        code: "CB",  exchange: "CME" },
    ],
  },
];

export const COT_MARKETS: Record<string, COTMarket> = Object.fromEntries(
  COT_CATEGORIES.flatMap((c) => c.markets.map((m) => [m.slug, m] as const))
);

export const DEFAULT_COT_SLUG = "nasdaq";