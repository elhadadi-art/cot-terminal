import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import * as React from "react";
import {
  Home as HomeIcon,
  Newspaper,
  CalendarDays,
  LayoutGrid,
  BarChart3,
  Clock,
  BookOpen,
  TrendingUp,
  Bell,
  Search,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import appCss from "../styles.css?url";
import { cn } from "@/lib/utils";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-sm border border-border px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marketiq — Institutional AI Trading Terminal" },
      { name: "description", content: "Marketiq is an AI-native institutional trading operating system: market pulse, COT, heatmaps, calendar, journal." },
      { name: "author", content: "Marketiq" },
      { property: "og:title", content: "Marketiq — Institutional AI Trading Terminal" },
      { property: "og:description", content: "AI-native institutional trading OS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // Pre-hydration theme set to avoid FOUC
  const themeScript = `(()=>{try{var t=localStorage.getItem('mq-theme')||'dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

/* ---------------- Sidebar ---------------- */

const nav = [
  { to: "/",              label: "Home",          icon: HomeIcon, code: "HOME" },
  { to: "/news",          label: "News",          icon: Newspaper, code: "NEWS" },
  { to: "/calendar",      label: "Calendar",      icon: CalendarDays, code: "ECON" },
  { to: "/heat-maps",     label: "Heat Maps",     icon: LayoutGrid, code: "HEAT" },
  { to: "/cot-report",    label: "COT Report",    icon: BarChart3, code: "COT" },
  { to: "/trading-hours", label: "Trading Hours", icon: Clock, code: "HRS" },
  { to: "/journal",       label: "Journal",       icon: BookOpen, code: "JNL" },
] as const;

const indices = [
  { to: "/indices/sp500",    label: "S&P 500",     code: "SPX" },
  { to: "/indices/dow30",    label: "Dow Jones 30",code: "DJI" },
  { to: "/indices/nasdaq100",label: "Nasdaq 100",  code: "NDX" },
  { to: "/indices/russell",  label: "Russell 2000",code: "RUT" },
] as const;

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [indicesOpen, setIndicesOpen] = React.useState(pathname.startsWith("/indices"));
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 z-50 lg:z-30 h-screen w-[208px] shrink-0 border-r border-border/70 glass-strong flex flex-col transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 h-12 px-3 border-b border-border/70">
          <div className="size-7 rounded-sm bg-gradient-to-br from-primary to-accent flex items-center justify-center elev">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Marketiq</span>
            <span className="text-[9px] text-muted-foreground tracking-[0.18em] uppercase">Terminal v1.0</span>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-2 px-2">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70 px-2 mb-1">Workspace</div>
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-2.5 h-8 px-2 rounded-sm text-[12px] font-medium transition-colors mb-0.5",
                  active
                    ? "bg-primary/12 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
                )}
                <Icon className={cn("size-3.5", active ? "text-primary" : "")} />
                <span className="flex-1">{item.label}</span>
                <span className="text-[9px] tabular-nums text-muted-foreground/60">{item.code}</span>
              </Link>
            );
          })}

          <div className="mt-3">
            <button
              onClick={() => setIndicesOpen((v) => !v)}
              className="w-full flex items-center gap-2.5 h-8 px-2 rounded-sm text-[12px] font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            >
              <TrendingUp className="size-3.5" />
              <span className="flex-1 text-left">Indices</span>
              <ChevronRight className={cn("size-3 transition-transform", indicesOpen && "rotate-90")} />
            </button>
            {indicesOpen && (
              <div className="ml-5 mt-0.5 border-l border-border/70 pl-2">
                {indices.map((i) => {
                  const active = pathname === i.to;
                  return (
                    <Link
                      key={i.to}
                      to={i.to}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between h-7 px-2 rounded-sm text-[11px] transition-colors",
                        active
                          ? "text-foreground bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                      )}
                    >
                      <span>{i.label}</span>
                      <span className="text-[9px] tabular-nums text-muted-foreground/60">{i.code}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="p-2 border-t border-border/70">
          <div className="glass rounded-sm p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] text-primary">
              <Sparkles className="size-3" />
              <span className="font-medium tracking-wide">AI COPILOT</span>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground leading-snug">
              Risk-on bias firming. Watch SPY gamma flip at 530.20.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Header ---------------- */

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-12 glass-strong border-b border-border/70 flex items-center px-3 gap-3">
      <button onClick={onMenu} className="lg:hidden text-muted-foreground hover:text-foreground">
        <Menu className="size-4" />
      </button>

      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <input
          placeholder="Search tickers, events, AI insights…  ⌘K"
          className="w-full h-8 bg-secondary/60 border border-border/70 rounded-sm pl-8 pr-3 text-[12px] placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60 focus:bg-secondary/80 focus:shadow-[0_0_0_3px_oklch(0.72_0.17_240/0.12)]"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 text-[9px] text-primary tracking-widest">
          <Sparkles className="size-3" /> AI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-3 text-[11px] tabular-nums">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="text-[var(--color-pos)] live-dot">●</span>
          <span className="text-foreground font-medium">NYSE OPEN</span>
          <span>03:24:12</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 border-l border-border pl-3">
          <Ticker sym="SPY"  v="532.84" c="+0.62" pos />
          <Ticker sym="QQQ"  v="458.12" c="+1.04" pos />
          <Ticker sym="VIX"  v="13.21"  c="-0.18" pos={false} />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <ThemeToggle />
        <button className="relative h-8 w-8 rounded-sm border border-border/70 bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center justify-center">
          <Bell className="size-3.5" />
          <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[var(--color-warn)] live-dot" />
        </button>
        <div className="flex items-center gap-2 pl-1.5 ml-0.5 border-l border-border h-8">
          <div className="size-7 rounded-sm bg-gradient-to-br from-accent to-primary text-[10px] font-semibold flex items-center justify-center text-primary-foreground">
            AK
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-[11px] font-medium">A. Kerwin</span>
            <span className="text-[9px] text-muted-foreground">PRO · L4</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Ticker({ sym, v, c, pos }: { sym: string; v: string; c: string; pos: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground font-medium">{sym}</span>
      <span className="text-foreground">{v}</span>
      <span className={pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}>{c >= "0" && c[0] !== "-" ? "+" : ""}{c}</span>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  React.useEffect(() => {
    const stored = (localStorage.getItem("mq-theme") as "dark" | "light" | null) || "dark";
    setTheme(stored);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(next);
    try { localStorage.setItem("mq-theme", next); } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-8 w-8 rounded-sm border border-border/70 bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center justify-center"
    >
      {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  );
}

function _TickerOld({ sym, v, c, pos }: { sym: string; v: string; c: string; pos: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground font-medium">{sym}</span>
      <span className="text-foreground">{v}</span>
      <span className={pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]"}>{c >= "0" && c[0] !== "-" ? "+" : ""}{c}</span>
    </div>
  );
}

function AppShell() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="min-h-screen flex w-full text-[13px]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-3 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
