import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Download, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

import { StatusBadge, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

const matrixSize = 15;

export default function QrConfirmationPage() {
  const [secondsLeft, setSecondsLeft] = useState(278);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLabel = useMemo(() => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_34%),linear-gradient(180deg,rgba(21,21,25,0.24),rgba(11,11,15,0))]" />

          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-center gap-3">
              <VoltaLogo size={28} />
              <StatusBadge status="available">Active session</StatusBadge>
            </div>

            <div className="mt-5 text-center">
              <div className="text-[9px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--volta-tertiary))]">
                LAC 1 · ZONE A · CONNECTOR 3
              </div>
              <div className="mt-2 text-[12px] font-medium text-foreground">Show this code at the station</div>
            </div>

            <div className="mx-auto mt-4 max-w-[270px] rounded-2xl bg-[hsl(var(--volta-qr))] p-5">
              <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1">
                {Array.from({ length: matrixSize * matrixSize }, (_, index) => {
                  const row = Math.floor(index / matrixSize);
                  const column = index % matrixSize;
                  const isCornerBlock =
                    (row < 4 && column < 4) ||
                    (row < 4 && column > 10) ||
                    (row > 10 && column < 4);
                  const isPattern = (row + column) % 2 === 0 || (row > 5 && row < 9 && column > 5 && column < 9);

                  return (
                    <div
                      className={cn(
                        "aspect-square rounded-[2px]",
                        isCornerBlock || isPattern ? "bg-background" : "bg-transparent",
                      )}
                      key={index}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center">
                <VoltaLogo size={16} withWordmark={false} />
              </div>
            </div>

            <div className="mt-4 text-center font-mono text-[15px] tracking-[0.15em] text-foreground">
              V3 · LAC1 · 2026 · 7F4A
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              {[
                ["Station", "Lac 1 · Zone A"],
                ["Slot", "14:30 – 15:30"],
                ["Vehicle", "183 AB 00"],
              ].map(([label, value]) => (
                <div className="flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0" key={label}>
                  <span className="text-[10px] text-[hsl(var(--volta-tertiary))]">{label}</span>
                  <span className="font-mono text-[10px] text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-[10px] text-[hsl(var(--volta-tertiary))]">Slot begins in</div>
              <div className="mt-1 font-mono text-[22px] font-medium text-primary">{timeLabel}</div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="volta-ghost-btn flex-1 px-3 py-3 text-[12px]" type="button">
                Add to Apple Wallet
              </button>
              <button className="volta-ghost-btn flex-1 px-3 py-3 text-[12px]" type="button">
                Add to Google Wallet
              </button>
            </div>

            <Link className="mt-4 block text-center text-[12px] text-[hsl(var(--volta-tertiary))] underline underline-offset-4" to="/app/session">
              Create account to save history →
            </Link>

            <Link className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(var(--volta-brand-hover))]" to="/app/session">
              Start charging <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-muted-foreground" type="button">
              <Download className="h-4 w-4" />
              Download receipt
            </button>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-muted-foreground" type="button">
              <WalletCards className="h-4 w-4" />
              Share code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
