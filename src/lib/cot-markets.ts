export type CotMarket = {
  slug: string;
  name: string;
  code: string;
  exchange: string;
};

export type CotCategory = {
  id: string;
  label: string;
  markets: CotMarket[];
};

export const cotCategories: CotCategory[] = [
  {
    id: "indexes",
    label: "Indexes",
    markets: [
      { slug: "sp500",     name: "S&P 500",          code: "ES",  exchange: "CME"  },
      { slug: "nasdaq",    name: "Nasdaq 100",       code: "NQ",  exchange: "CME"  },
      { slug: "dow",       name: "Dow Jones",        code: "YM",  exchange: "CBOT" },
      { slug: "russell",   name: "Russell 2000",     code: "RTY", exchange: "CME"  },
      { slug: "vix",       name: "VIX Futures",      code: "VX",  exchange: "CFE"  },
      { slug: "nikkei",    name: "Nikkei 225",       code: "NKD", exchange: "CME"  },
    ],
  },
  {
    id: "currencies",
    label: "Currencies",
    markets: [
      { slug: "usd-index", name: "US Dollar Index",  code: "DX",  exchange: "ICE"  },
      { slug: "euro",      name: "Euro FX",          code: "6E",  exchange: "CME"  },
      { slug: "gbp",       name: "British Pound",    code: "6B",  exchange: "CME"  },
      { slug: "jpy",       name: "Japanese Yen",     code: "6J",  exchange: "CME"  },
      { slug: "chf",       name: "Swiss Franc",      code: "6S",  exchange: "CME"  },
      { slug: "cad",       name: "Canadian Dollar",  code: "6C",  exchange: "CME"  },
      { slug: "aud",       name: "Australian Dollar",code: "6A",  exchange: "CME"  },
      { slug: "nzd",       name: "NZ Dollar",        code: "6N",  exchange: "CME"  },
      { slug: "mxn",       name: "Mexican Peso",     code: "6M",  exchange: "CME"  },
      { slug: "brl",       name: "Brazilian Real",   code: "6L",  exchange: "CME"  },
      { slug: "rub",       name: "Russian Ruble",    code: "6R",  exchange: "CME"  },
      { slug: "zar",       name: "South African Rand",code: "6Z", exchange: "CME"  },
    ],
  },
  {
    id: "metals",
    label: "Metals",
    markets: [
      { slug: "gold",      name: "Gold",             code: "GC",  exchange: "COMEX" },
      { slug: "silver",    name: "Silver",           code: "SI",  exchange: "COMEX" },
      { slug: "copper",    name: "Copper",           code: "HG",  exchange: "COMEX" },
      { slug: "platinum",  name: "Platinum",         code: "PL",  exchange: "NYMEX" },
      { slug: "palladium", name: "Palladium",        code: "PA",  exchange: "NYMEX" },
    ],
  },
  {
    id: "energies",
    label: "Energies",
    markets: [
      { slug: "wti",       name: "WTI Crude Oil",    code: "CL",  exchange: "NYMEX" },
      { slug: "brent",     name: "Brent Crude",      code: "BZ",  exchange: "ICE"   },
      { slug: "natgas",    name: "Natural Gas",      code: "NG",  exchange: "NYMEX" },
      { slug: "heating-oil",name:"Heating Oil",      code: "HO",  exchange: "NYMEX" },
      { slug: "rbob",      name: "RBOB Gasoline",    code: "RB",  exchange: "NYMEX" },
    ],
  },
  {
    id: "treasuries",
    label: "Treasuries & Rates",
    markets: [
      { slug: "2y",        name: "2Y T-Note",        code: "ZT",  exchange: "CBOT"  },
      { slug: "5y",        name: "5Y T-Note",        code: "ZF",  exchange: "CBOT"  },
      { slug: "10y",       name: "10Y T-Note",       code: "ZN",  exchange: "CBOT"  },
      { slug: "ultra-10y", name: "Ultra 10Y",        code: "TN",  exchange: "CBOT"  },
      { slug: "30y",       name: "30Y T-Bond",       code: "ZB",  exchange: "CBOT"  },
      { slug: "ultra-bond",name: "Ultra T-Bond",     code: "UB",  exchange: "CBOT"  },
      { slug: "fed-funds", name: "Fed Funds",        code: "ZQ",  exchange: "CBOT"  },
      { slug: "sofr",      name: "3M SOFR",          code: "SR3", exchange: "CME"   },
      { slug: "eurodollar",name: "Eurodollar",       code: "GE",  exchange: "CME"   },
    ],
  },
  {
    id: "grains",
    label: "Grains",
    markets: [
      { slug: "corn",         name: "Corn",          code: "ZC",  exchange: "CBOT" },
      { slug: "soybeans",     name: "Soybeans",      code: "ZS",  exchange: "CBOT" },
      { slug: "soybean-oil",  name: "Soybean Oil",   code: "ZL",  exchange: "CBOT" },
      { slug: "soybean-meal", name: "Soybean Meal",  code: "ZM",  exchange: "CBOT" },
      { slug: "wheat-chicago",name: "Wheat (Chicago)",code: "ZW", exchange: "CBOT" },
      { slug: "wheat-kc",     name: "Wheat (KC)",    code: "KE",  exchange: "CBOT" },
      { slug: "oats",         name: "Oats",          code: "ZO",  exchange: "CBOT" },
      { slug: "rough-rice",   name: "Rough Rice",    code: "ZR",  exchange: "CBOT" },
    ],
  },
  {
    id: "softs",
    label: "Softs",
    markets: [
      { slug: "cocoa",        name: "Cocoa",         code: "CC",  exchange: "ICE"  },
      { slug: "coffee",       name: "Coffee",        code: "KC",  exchange: "ICE"  },
      { slug: "cotton",       name: "Cotton",        code: "CT",  exchange: "ICE"  },
      { slug: "sugar",        name: "Sugar No.11",   code: "SB",  exchange: "ICE"  },
      { slug: "orange-juice", name: "Orange Juice",  code: "OJ",  exchange: "ICE"  },
      { slug: "lumber",       name: "Lumber",        code: "LBR", exchange: "CME"  },
    ],
  },
  {
    id: "livestock",
    label: "Livestock & Dairy",
    markets: [
      { slug: "live-cattle",  name: "Live Cattle",   code: "LE",  exchange: "CME"  },
      { slug: "feeder-cattle",name: "Feeder Cattle", code: "GF",  exchange: "CME"  },
      { slug: "lean-hogs",    name: "Lean Hogs",     code: "HE",  exchange: "CME"  },
      { slug: "class-iii-milk",name:"Class III Milk",code: "DC",  exchange: "CME"  },
      { slug: "butter",       name: "Butter",        code: "CB",  exchange: "CME"  },
      { slug: "cheese",       name: "Cheese",        code: "CSC", exchange: "CME"  },
    ],
  },
  {
    id: "crypto",
    label: "Cryptocurrencies",
    markets: [
      { slug: "bitcoin",      name: "Bitcoin",       code: "BTC", exchange: "CME"  },
      { slug: "micro-bitcoin",name: "Micro Bitcoin", code: "MBT", exchange: "CME"  },
      { slug: "ether",        name: "Ether",         code: "ETH", exchange: "CME"  },
      { slug: "micro-ether",  name: "Micro Ether",   code: "MET", exchange: "CME"  },
    ],
  },
];

export const cotMarkets: CotMarket[] = cotCategories.flatMap((c) => c.markets);

export function findCotMarket(slug: string): CotMarket | undefined {
  return cotMarkets.find((m) => m.slug === slug);
}

export function findCotCategoryOfSlug(slug: string): CotCategory | undefined {
  return cotCategories.find((c) => c.markets.some((m) => m.slug === slug));
}