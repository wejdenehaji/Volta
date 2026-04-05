import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import { VoltaLogo } from "./ui";

export function PublicHeader({
  solid = false,
}: {
  solid?: boolean;
}) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-card/90 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link className="no-tap-highlight" to="/" aria-label="Volta Charge home">
          <VoltaLogo size={32} />
        </Link>

        <nav className="flex items-center gap-3">
          <Link className="volta-ghost-btn px-4 py-2" to="/app">
            Find a station
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link className="inline-flex" to="/" aria-label="Volta Charge home">
          <VoltaLogo size={24} />
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-wrap items-center gap-5 text-xs text-[hsl(var(--volta-tertiary))]">
            <Link className="transition-colors hover:text-foreground" to="/terms">
              Terms
            </Link>
            <Link className="transition-colors hover:text-foreground" to="/privacy">
              Privacy
            </Link>
            <Link className="transition-colors hover:text-foreground" to="/support">
              Support
            </Link>
          </div>

          <button className="volta-ghost-btn min-w-[72px] px-4 py-2 text-xs">
            EN / FR / AR
          </button>
        </div>
      </div>
    </footer>
  );
}
