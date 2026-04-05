import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type VoltaLogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  markClassName?: string;
};

export function VoltaLogo({
  size = 32,
  withWordmark = true,
  className,
  markClassName,
}: VoltaLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        className={markClassName}
        height={size}
        viewBox="0 0 100 100"
        width={size}
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="38"
          stroke="hsl(var(--volta-border))"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          pathLength="100"
          r="38"
          stroke="hsl(var(--volta-brand))"
          strokeDasharray="60 40"
          strokeLinecap="round"
          strokeWidth="8"
          transform="rotate(-90 50 50)"
        />
        <circle cx="50" cy="50" fill="hsl(var(--volta-brand))" r="10" />
      </svg>

      {withWordmark ? (
        <div className="leading-none">
          <div
            className="font-serif text-[clamp(1rem,1vw,1.125rem)] tracking-[0.3em] text-foreground"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            VOLTA
          </div>
          <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.5em] text-[hsl(var(--volta-tertiary))]">
            Charge
          </div>
        </div>
      ) : null}
    </div>
  );
}

const badgeStyles = {
  available:
    "border-[hsl(var(--volta-brand))] bg-[hsl(var(--volta-tint))] text-primary",
  busy: "border-[hsl(var(--volta-warning))] bg-[hsl(var(--volta-warning-tint))] text-[hsl(var(--volta-warning))]",
  offline:
    "border-[hsl(var(--volta-error))] bg-[hsl(var(--volta-error-tint))] text-[hsl(var(--volta-error))]",
  maintenance:
    "border-[hsl(var(--volta-border-strong))] bg-[hsl(var(--volta-surface-hover))] text-[hsl(var(--volta-tertiary))]",
} as const;

type StatusBadgeProps = {
  status: keyof typeof badgeStyles;
  children?: ReactNode;
  className?: string;
};

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium",
        badgeStyles[status],
        className,
      )}
    >
      {children ?? status}
    </span>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("volta-section-label", className)}>{children}</div>;
}

export function AppStoreBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex min-w-[146px] items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-center text-xs text-muted-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[390px] overflow-hidden rounded-[26px] border border-border bg-background shadow-volta",
        className,
      )}
    >
      <div className="aspect-[390/844] w-full bg-background">{children}</div>
    </div>
  );
}

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",
        className,
      )}
    />
  );
}
