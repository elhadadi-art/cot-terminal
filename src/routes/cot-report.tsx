import * as React from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { COT_CATEGORIES, DEFAULT_COT_SLUG } from "@/lib/cot-markets";

export const Route = createFileRoute("/cot-report")({
  component: COTLayout,
});

function COTLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const activeSlug = React.useMemo(() => {
    if (path === "/cot-report" || path === "/cot-report/") return DEFAULT_COT_SLUG;
    const m = path.match(/^\/cot-report\/([^/]+)/);
    return m?.[1] ?? DEFAULT_COT_SLUG;
  }, [path]);

  const activeCategory = React.useMemo(() => {
    return (
      COT_CATEGORIES.find((c) => c.markets.some((m) => m.slug === activeSlug)) ??
      COT_CATEGORIES[0]
    );
  }, [activeSlug]);

  const [openCat, setOpenCat] = React.useState<string>(activeCategory.id);
  React.useEffect(() => setOpenCat(activeCategory.id), [activeCategory.id]);

  const current = COT_CATEGORIES.find((c) => c.id === openCat) ?? activeCategory;

  return (
    <div className="space-y-2">
      {/* Category bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border/60 pb-1">
        {COT_CATEGORIES.map((c) => {
          const isOpen = c.id === openCat;
          const hasActive = c.id === activeCategory.id;
          return (
            <button
              key={c.id}
              onClick={() => setOpenCat(c.id)}
              className={`h-7 px-3 rounded-sm text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors ${
                isOpen
                  ? "bg-primary/15 text-primary"
                  : hasActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
              <span className="ml-1.5 opacity-50 tabular-nums">{c.markets.length}</span>
            </button>
          );
        })}
      </div>

      {/* Market chips for the opened category */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {current.markets.map((m) => {
          const active = m.slug === activeSlug;
          return (
            <Link
              key={m.slug}
              to="/cot-report/$slug"
              params={{ slug: m.slug }}
              className={`h-7 px-2.5 rounded-sm border text-[11px] tracking-wide whitespace-nowrap ${
                active
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.market}
              <span className="opacity-60 ml-1 tabular-nums">{m.code}</span>
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}
