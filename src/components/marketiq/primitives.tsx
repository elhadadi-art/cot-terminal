import * as React from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  right,
  className,
  bodyClassName,
  children,
}: {
  title?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "glass elev rounded-sm overflow-hidden",
        className,
      )}
    >
      {title && (
        <header className="flex items-center justify-between px-3 h-8 border-b border-border/70 bg-secondary/40">
          <div className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-medium">
            {title}
          </div>
          {right}
        </header>
      )}
      <div className={cn("p-3", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  delta?: { value: string; pos?: boolean };
  hint?: string;
  accent?: "pos" | "neg" | "warn" | "primary";
}) {
  const accentClass =
    accent === "pos"
      ? "text-[var(--color-pos)]"
      : accent === "neg"
      ? "text-[var(--color-neg)]"
      : accent === "warn"
      ? "text-[var(--color-warn)]"
      : "text-primary";
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-[10px] tracking-widest uppercase text-muted-foreground">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <div className={cn("text-base font-semibold tabular-nums", accent && accentClass)}>
          {value}
        </div>
        {delta && (
          <span
            className={cn(
              "text-[11px] tabular-nums",
              delta.pos ? "text-[var(--color-pos)]" : "text-[var(--color-neg)]",
            )}
          >
            {delta.value}
          </span>
        )}
      </div>
      {hint && <div className="text-[10px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: "pos" | "neg" | "neutral" | "warn" | "primary";
  children: React.ReactNode;
  className?: string;
}) {
  const map: Record<string, string> = {
    pos: "bg-[var(--color-pos)]/12 text-[var(--color-pos)] border-[var(--color-pos)]/30",
    neg: "bg-[var(--color-neg)]/12 text-[var(--color-neg)] border-[var(--color-neg)]/30",
    warn: "bg-[var(--color-warn)]/12 text-[var(--color-warn)] border-[var(--color-warn)]/30",
    primary: "bg-primary/15 text-primary border-primary/30",
    neutral: "bg-muted/60 text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 h-5 rounded-sm border text-[10px] font-medium tracking-wide tabular-nums",
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Spark({
  data,
  color = "var(--color-primary)",
  height = 28,
  width = 90,
  fill = true,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  fill?: boolean;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`);
  const d = `M${pts.join(" L")}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block" width={width} height={height}>
      {fill && (
        <path
          d={`${d} L${width},${height} L0,${height} Z`}
          fill={color}
          opacity="0.12"
        />
      )}
      <path d={d} stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  color = "var(--color-primary)",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-border)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-sm font-semibold tabular-nums">{value}%</div>
        {label && <div className="text-[9px] text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}

export function Bar({ value, max = 100, color = "var(--color-primary)" }: { value: number; max?: number; color?: string }) {
  return (
    <div className="w-full h-1.5 bg-muted overflow-hidden rounded-[1px]">
      <div
        className="h-full"
        style={{
          width: `${Math.min(100, (value / max) * 100)}%`,
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-3">
      <div>
        {eyebrow && (
          <div className="text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative hero-bg rounded-sm border border-border/80 overflow-hidden p-5 elev",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 80% 10%, oklch(0.72 0.17 240 / 0.25), transparent 50%)" }}
      />
      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          {eyebrow && (
            <div className="text-[10px] tracking-[0.22em] uppercase text-primary mb-1">{eyebrow}</div>
          )}
          <h1 className="text-2xl md:text-[26px] font-semibold tracking-tight">{title}</h1>
          {subtitle && <div className="text-xs text-muted-foreground mt-1 max-w-xl">{subtitle}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
