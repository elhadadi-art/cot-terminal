import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/cot-report")({
  component: COTLayout,
});

const tabs = [
  { to: "/cot-report",         label: "Nasdaq",  code: "NDX" },
  { to: "/cot-report/sp500",   label: "S&P 500", code: "SPX" },
  { to: "/cot-report/nasdaq",  label: "Nasdaq",  code: "NDX" },
  { to: "/cot-report/gold",    label: "Gold",    code: "XAU" },
  { to: "/cot-report/euro",    label: "Euro",    code: "EUR" },
];

function COTLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  // If only /cot-report exact path, render index content via child; otherwise render outlet.
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 overflow-x-auto">
        {tabs.slice(1).map((t) => {
          const active = path === t.to || (t.to === "/cot-report/nasdaq" && path === "/cot-report");
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`h-7 px-2.5 rounded-sm border text-[11px] tracking-wide whitespace-nowrap ${active ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {t.label} <span className="opacity-60 ml-1 tabular-nums">{t.code}</span>
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
