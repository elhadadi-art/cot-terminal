import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/login", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="min-h-screen flex items-center justify-center p-6 text-sm">
      Could not load this authorization request: {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData() as any;
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "an app";
  const scopes: string[] = details?.scopes ?? details?.requested_scopes ?? [];

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-border/70 rounded-sm p-5 glass-strong">
        <h1 className="text-lg font-semibold tracking-tight">
          Connect {clientName} to Marketiq
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          This lets {clientName} use Marketiq's tools as you. It does not bypass Marketiq's
          permissions or backend policies.
        </p>

        {scopes.length > 0 && (
          <ul className="mt-4 text-xs text-muted-foreground space-y-1">
            {scopes.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        )}

        {error && (
          <p role="alert" className="mt-3 text-xs text-[var(--color-neg)]">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-2">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 h-9 rounded-sm bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 h-9 rounded-sm border border-border/70 bg-secondary/60 text-sm hover:bg-secondary"
          >
            Cancel connection
          </button>
        </div>
      </div>
    </main>
  );
}