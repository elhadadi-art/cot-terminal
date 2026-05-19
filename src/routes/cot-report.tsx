import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cotCategories } from "@/lib/cot-markets";

export const Route = createFileRoute("/cot-report")({
  component: COTLayout,
});

function COTLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3">
      <aside className="space-y-2 lg:sticky lg:top-2 lg:self-start lg:max-h-[calc(100vh-1rem)] lg:overflow-auto">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">COT Legacy</div>
        {cotCategories.map((cat) => (
          <div key={cat.id} className="border border-border/60 rounded-sm">
            <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/40 border-b border-border/60">
              {cat.label}
            </div>
            <ul className="py-0.5">
              {cat.markets.map((m) => {
                const to = `/cot-report/${m.slug}`;
                const active = path === to;
                return (
                  <li key={m.slug}>
                    <Link
                      to="/cot-report/$slug"
                      params={{ slug: m.slug }}
                      className={`flex items-center justify-between gap-2 px-2 py-1 text-[11px] whitespace-nowrap ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                    >
                      <span className="truncate">{m.name}</span>
                      <span className="opacity-60 tabular-nums shrink-0">{m.code}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
