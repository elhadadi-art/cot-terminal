export const watchlist = [
  { sym: "SPY",  name: "S&P 500 ETF",     price: 532.84, chg:  +0.62, sent: "Bullish",  rs: 78, vol: "Above avg" },
  { sym: "QQQ",  name: "Nasdaq 100 ETF",  price: 458.12, chg:  +1.04, sent: "Bullish",  rs: 84, vol: "Strong"    },
  { sym: "IWM",  name: "Russell 2000 ETF",price: 204.55, chg:  -0.34, sent: "Neutral",  rs: 41, vol: "Average"   },
  { sym: "NVDA", name: "NVIDIA Corp",     price: 928.40, chg:  +2.18, sent: "Bullish",  rs: 92, vol: "Spike"     },
] as const;

export const sessions = [
  { mkt: "NYSE",   open: true,  ctd: "Closes in 03:24:12", tz: "ET",  liq: "High"   },
  { mkt: "NASDAQ", open: true,  ctd: "Closes in 03:24:12", tz: "ET",  liq: "High"   },
  { mkt: "London", open: false, ctd: "Opens in 11:42:09",  tz: "GMT", liq: "—"      },
  { mkt: "Tokyo",  open: false, ctd: "Opens in 19:18:44",  tz: "JST", liq: "—"      },
  { mkt: "Crypto", open: true,  ctd: "24/7",               tz: "UTC", liq: "Medium" },
] as const;

export const feed = [
  { t: "12:08", txt: "Breakout probability increasing on QQQ; gamma supportive above 458." },
  { t: "11:56", txt: "Dealer positioning stabilizing intraday volatility." },
  { t: "11:42", txt: "SPY holding above gamma flip level 530.20." },
  { t: "11:21", txt: "Semis leading tape; NVDA RS at 92." },
  { t: "10:58", txt: "USD weakening vs JPY; risk-on bias firming." },
  { t: "10:30", txt: "VIX printing 13.2, vol regime: Low." },
] as const;

export const heatmapSP = [
  { sym: "AAPL", name: "Apple",      sec: "Tech",      chg: +1.42, sent: 0.82, cap: 12 },
  { sym: "MSFT", name: "Microsoft",  sec: "Tech",      chg: +0.91, sent: 0.74, cap: 11 },
  { sym: "NVDA", name: "NVIDIA",     sec: "Tech",      chg: +2.18, sent: 0.92, cap: 10 },
  { sym: "GOOG", name: "Alphabet",   sec: "Comm",      chg: +0.42, sent: 0.61, cap:  8 },
  { sym: "AMZN", name: "Amazon",     sec: "Cons Disc", chg: -0.21, sent: 0.40, cap:  8 },
  { sym: "META", name: "Meta",       sec: "Comm",      chg: +1.04, sent: 0.77, cap:  7 },
  { sym: "TSLA", name: "Tesla",      sec: "Cons Disc", chg: -1.84, sent: 0.22, cap:  6 },
  { sym: "JPM",  name: "JPMorgan",   sec: "Financials",chg: -0.42, sent: 0.38, cap:  5 },
  { sym: "V",    name: "Visa",       sec: "Financials",chg: +0.18, sent: 0.55, cap:  5 },
  { sym: "UNH",  name: "UnitedHlth", sec: "Health",    chg: -0.71, sent: 0.32, cap:  5 },
  { sym: "XOM",  name: "Exxon",      sec: "Energy",    chg: +0.62, sent: 0.61, cap:  4 },
  { sym: "JNJ",  name: "J&J",        sec: "Health",    chg: -0.12, sent: 0.45, cap:  4 },
  { sym: "PG",   name: "P&G",        sec: "Staples",   chg: +0.08, sent: 0.50, cap:  4 },
  { sym: "HD",   name: "Home Depot", sec: "Cons Disc", chg: -0.92, sent: 0.31, cap:  4 },
  { sym: "MA",   name: "Mastercard", sec: "Financials",chg: +0.34, sent: 0.58, cap:  4 },
  { sym: "AVGO", name: "Broadcom",   sec: "Tech",      chg: +1.71, sent: 0.86, cap:  4 },
  { sym: "LLY",  name: "Eli Lilly",  sec: "Health",    chg: -0.41, sent: 0.41, cap:  4 },
  { sym: "BAC",  name: "Bank of Am", sec: "Financials",chg: -0.84, sent: 0.28, cap:  3 },
  { sym: "CVX",  name: "Chevron",    sec: "Energy",    chg: +0.48, sent: 0.60, cap:  3 },
  { sym: "PFE",  name: "Pfizer",     sec: "Health",    chg: -1.21, sent: 0.24, cap:  3 },
  { sym: "KO",   name: "Coca-Cola",  sec: "Staples",   chg: +0.21, sent: 0.54, cap:  3 },
  { sym: "PEP",  name: "Pepsi",      sec: "Staples",   chg: -0.08, sent: 0.47, cap:  3 },
  { sym: "WMT",  name: "Walmart",    sec: "Staples",   chg: +0.62, sent: 0.66, cap:  3 },
  { sym: "DIS",  name: "Disney",     sec: "Comm",      chg: -0.34, sent: 0.39, cap:  3 },
  { sym: "ADBE", name: "Adobe",      sec: "Tech",      chg: +0.91, sent: 0.71, cap:  3 },
  { sym: "CRM",  name: "Salesforce", sec: "Tech",      chg: +1.18, sent: 0.78, cap:  3 },
  { sym: "ORCL", name: "Oracle",     sec: "Tech",      chg: +0.42, sent: 0.62, cap:  3 },
  { sym: "AMD",  name: "AMD",        sec: "Tech",      chg: +1.62, sent: 0.81, cap:  3 },
] as const;

export const calendar = [
  { time: "08:30", country: "US", flag: "🇺🇸", event: "Core CPI (MoM)",       impact: 3, forecast: "0.3%", previous: "0.4%", actual: "0.3%",  ai: "Neutral USD"     },
  { time: "08:30", country: "US", flag: "🇺🇸", event: "CPI (YoY)",            impact: 3, forecast: "3.4%", previous: "3.5%", actual: "3.4%",  ai: "Bull equities"   },
  { time: "10:00", country: "US", flag: "🇺🇸", event: "Fed Chair Speech",     impact: 3, forecast: "—",    previous: "—",    actual: "—",     ai: "Nasdaq vol +"    },
  { time: "10:30", country: "US", flag: "🇺🇸", event: "Crude Oil Inventories",impact: 2, forecast: "-1.2M",previous: "+2.4M",actual: "-0.8M", ai: "WTI bid"         },
  { time: "13:00", country: "DE", flag: "🇩🇪", event: "10Y Bund Auction",     impact: 1, forecast: "—",    previous: "2.41%",actual: "2.38%", ai: "EUR neutral"     },
  { time: "14:00", country: "US", flag: "🇺🇸", event: "FOMC Minutes",         impact: 3, forecast: "—",    previous: "—",    actual: "—",     ai: "USD vol +"       },
  { time: "20:30", country: "JP", flag: "🇯🇵", event: "BOJ Core CPI",         impact: 2, forecast: "2.1%", previous: "2.2%", actual: "—",     ai: "JPY watch"       },
] as const;

export const news = [
  { cat: "Macro",    head: "Fed minutes signal patience as core CPI softens to 3.4%",        sum: "Most participants saw rates appropriate; balance sheet runoff to slow in coming months.", imp: "Bullish duration", time: "12m ago" },
  { cat: "Equities", head: "Semis lead S&P higher as Nvidia clears 925 resistance",          sum: "Breadth narrowing but momentum intact; dealers hedged through 540 strike.",                imp: "Bullish QQQ",     time: "28m ago" },
  { cat: "Crypto",   head: "BTC reclaims 70k as spot ETF inflows hit weekly high",           sum: "IBIT leads with $312M; funding rates normalize after weekend reset.",                       imp: "Bullish BTC",     time: "44m ago" },
  { cat: "Macro",    head: "ECB's Lagarde reiterates data-dependence ahead of June",         sum: "Markets pricing 90% cut probability; EURUSD pinned to 1.0850.",                             imp: "Neutral EUR",     time: "1h ago"  },
  { cat: "Equities", head: "Energy lags as crude inventories rise unexpectedly",             sum: "XLE -0.8%; refiners hit hardest on weak crack spreads.",                                    imp: "Bearish XLE",     time: "1h ago"  },
  { cat: "Crypto",   head: "Solana validators approve fee market overhaul (SIMD-0123)",      sum: "Targets MEV reduction; mainnet activation expected Q3.",                                    imp: "Bullish SOL",     time: "2h ago"  },
] as const;

export const trades = [
  { sym: "NVDA", entry: 918.20, exit: 928.40, pnl: +2040, emo: "Confident",  mis: "—"                  },
  { sym: "SPY",  entry: 532.50, exit: 531.84, pnl:  -132, emo: "Hesitant",   mis: "Late entry"         },
  { sym: "QQQ",  entry: 454.10, exit: 458.12, pnl:  +804, emo: "Calm",       mis: "Exited early"       },
  { sym: "TSLA", entry: 178.20, exit: 175.10, pnl:  -620, emo: "FOMO",       mis: "Oversized position" },
  { sym: "AMD",  entry: 162.40, exit: 167.80, pnl: +1080, emo: "Disciplined",mis: "—"                  },
] as const;

export const cotRows = [
  { cat: "Asset Managers",    long: 218430, short:  74210, spread:  5120, chg:  +4820, oi: 38.4, traders: 142 },
  { cat: "Leveraged Funds",   long:  92110, short: 168740, spread: 12480, chg:  -7340, oi: 26.1, traders: 198 },
  { cat: "Dealers",           long:  41280, short:  98620, spread:  2810, chg:   +910, oi: 14.8, traders:  31 },
  { cat: "Other Reportables", long:  38470, short:  29110, spread:  4620, chg:  -1240, oi:  9.2, traders:  74 },
  { cat: "Non-Reportable",    long:  21340, short:  40780, spread:     0, chg:  +2110, oi: 11.5, traders:   0 },
  { cat: "Total Reportable",  long: 390290, short: 370680, spread: 25030, chg:  -2850, oi: 88.5, traders: 445 },
] as const;
