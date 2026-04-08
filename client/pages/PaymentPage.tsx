import { useState } from "react";
import { Apple, ArrowLeft, Check, CreditCard, LoaderCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SectionLabel, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"apple" | "google" | "card" | null>("card");
  const [processing, setProcessing] = useState(false);

  const handleConfirm = () => {
    setProcessing(true);
    window.setTimeout(() => navigate("/app/qr"), 900);
  };

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_34%),linear-gradient(180deg,rgba(21,21,25,0.24),rgba(11,11,15,0))]" />

          <div className="sticky top-0 z-20 border-b border-transparent bg-background/90 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground" type="button">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h1 className="text-[17px] font-medium text-foreground">Payment</h1>
              <div className="font-mono text-[13px] text-[hsl(var(--volta-warning))]">0:59</div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-6">
            <div className="text-center">
              <SectionLabel>Pre-authorization amount</SectionLabel>
              <div className="mt-4 font-mono text-[36px] font-medium text-foreground">6.30 DT</div>
              <p className="mt-2 text-[12px] leading-6 text-[hsl(var(--volta-tertiary))]">
                You will only be charged based on actual kWh used.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                  method === "apple"
                    ? "border-primary bg-[hsl(var(--volta-tint))]"
                    : "border-border bg-card hover:bg-[hsl(var(--volta-surface-hover))]",
                )}
                onClick={() => setMethod("apple")}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-foreground">
                    <Apple className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-foreground">Apple Pay</span>
                    <span className="block text-[11px] text-[hsl(var(--volta-tertiary))]">Only on iOS Safari</span>
                  </span>
                </span>
                {method === "apple" ? <Check className="h-4 w-4 text-primary" /> : null}
              </button>

              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                  method === "google"
                    ? "border-primary bg-[hsl(var(--volta-tint))]"
                    : "border-border bg-card hover:bg-[hsl(var(--volta-surface-hover))]",
                )}
                onClick={() => setMethod("google")}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-[hsl(var(--volta-warning))]">
                    G
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-foreground">Google Pay</span>
                    <span className="block text-[11px] text-[hsl(var(--volta-tertiary))]">Only on Android Chrome</span>
                  </span>
                </span>
                {method === "google" ? <Check className="h-4 w-4 text-primary" /> : null}
              </button>

              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                  method === "card"
                    ? "border-primary bg-[hsl(var(--volta-tint))]"
                    : "border-border bg-card hover:bg-[hsl(var(--volta-surface-hover))]",
                )}
                onClick={() => setMethod("card")}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-[hsl(var(--volta-tertiary))]">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-foreground">Visa •••• 4821</span>
                    <span className="block text-[11px] text-[hsl(var(--volta-tertiary))]">Saved card</span>
                  </span>
                </span>
                {method === "card" ? <Check className="h-4 w-4 text-primary" /> : null}
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-primary transition-colors hover:bg-[hsl(var(--volta-surface-hover))]" type="button">
                <Plus className="h-4 w-4" />
                Add new card
              </button>
            </div>

            <button
              className={cn(
                "mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                method
                  ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]"
                  : "pointer-events-none border border-[hsl(var(--volta-disabled))] bg-card text-[hsl(var(--volta-disabled))]",
              )}
              onClick={handleConfirm}
              type="button"
            >
              {processing ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Processing
                </span>
              ) : (
                "Pay and confirm reservation"
              )}
            </button>

            <p className="mt-3 text-center text-[11px] text-[hsl(var(--volta-tertiary))]">
              Brand mark spins as the loading state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
