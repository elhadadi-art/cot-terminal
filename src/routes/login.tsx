import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "",
  }),
  component: Login,
});

function safeNext(next: string): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const target = safeNext(next);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = target;
    });
  }, [target]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const emailRedirectTo = `${window.location.origin}${target}`;
    const res =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo } });
    if (res.error) {
      setError(res.error.message);
      setBusy(false);
      return;
    }
    if (mode === "signup" && !res.data.session) {
      setBusy(false);
      setError("Check your email to confirm, then return to this link.");
      return;
    }
    window.location.href = target;
  }

  async function google() {
    setError(null);
    const redirectTo = `${window.location.origin}${target}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-border/70 rounded-sm p-5 glass-strong">
        <h1 className="text-lg font-semibold tracking-tight">
          {mode === "signin" ? "Sign in to Marketiq" : "Create your Marketiq account"}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {target !== "/" ? "You'll return to the previous page after signing in." : "Access the institutional terminal."}
        </p>

        <form onSubmit={submit} className="mt-4 space-y-2">
          <input
            type="email"
            required
            placeholder="you@fund.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 bg-secondary/60 border border-border/70 rounded-sm px-3 text-sm focus:outline-none focus:border-primary/60"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 bg-secondary/60 border border-border/70 rounded-sm px-3 text-sm focus:outline-none focus:border-primary/60"
          />
          <button
            disabled={busy}
            className="w-full h-9 rounded-sm bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
          >
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          onClick={google}
          type="button"
          className="mt-2 w-full h-9 rounded-sm border border-border/70 bg-secondary/60 text-sm hover:bg-secondary"
        >
          Continue with Google
        </button>

        {error && <p className="mt-3 text-xs text-[var(--color-neg)]">{error}</p>}

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}