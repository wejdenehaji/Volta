import { ArrowLeft, ChevronRight, CreditCard, Edit3, MapPin, PlugZap, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel, VoltaLogo } from "@/components/volta/ui";

type SummaryRow = {
  key: string;
  value: string;
  editable?: boolean;
  to?: string;
  highlight?: boolean;
};

const rows: SummaryRow[] = [
  { key: "Vehicle", value: "183 AB 00", editable: true, to: "/app/vehicle" },
  { key: "Time slot", value: "14:30 – 15:30", editable: true, to: "/app/select-time" },
  { key: "Connector", value: "Connector 3" },
  { key: "Estimated charge", value: "28–35 kWh" },
  { key: "Rate", value: "0.18 DT / kWh" },
  { key: "Pre-authorization", value: "6.30 DT", highlight: true },
];

export default function ReservationSummaryPage() {
  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_34%),linear-gradient(180deg,rgba(21,21,25,0.24),rgba(11,11,15,0))]" />

          <div className="sticky top-0 z-20 border-b border-transparent bg-background/90 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <Link className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground" to="/app/verify">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-[17px] font-medium text-foreground">Your reservation</h1>
              <div className="font-mono text-[13px] text-[hsl(var(--volta-warning))]">0:59</div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-[10px] border border-primary/60 bg-[hsl(var(--volta-tint))] p-2">
                    <VoltaLogo size={20} withWordmark={false} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-foreground">Lac 1 · Zone A</div>
                    <div className="mt-1 text-[11px] text-[hsl(var(--volta-tertiary))]">Today · 14:30 – 15:30 · 60 min</div>
                  </div>
                </div>
                <Link className="text-xs text-primary underline underline-offset-4" to="/app">
                  Edit
                </Link>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {rows.map((row) => (
                  <div className="flex items-start justify-between gap-4 px-4 py-3" key={row.key}>
                    <div>
                      <div className="text-[11px] text-[hsl(var(--volta-tertiary))]">{row.key}</div>
                      {row.key === "Vehicle" ? (
                        <div className="mt-1 font-mono text-[11px] text-foreground">{row.value}</div>
                      ) : (
                        <div className="mt-1 text-[11px] font-medium text-foreground">{row.value}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {row.highlight ? (
                        <span className="text-[11px] font-medium text-primary">{row.value}</span>
                      ) : null}
                      {row.editable ? (
                        <Link className="text-[11px] text-primary underline underline-offset-4" to={row.to}>
                          Edit
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div className="px-4 py-3">
                  <div className="text-[10px] leading-5 text-[hsl(var(--volta-disabled))]">
                    Billed after session ends based on actual kWh used.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-[hsl(var(--volta-tertiary))]" />
                  <div>
                    <div className="text-[13px] font-medium text-foreground">Visa •••• 4821</div>
                    <div className="mt-1 text-[11px] text-[hsl(var(--volta-tertiary))]">Saved card</div>
                  </div>
                </div>
                <Link className="text-xs text-primary underline underline-offset-4" to="/app/payment">
                  Change
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[hsl(var(--volta-warning))] bg-[hsl(var(--volta-warning-tint))] p-3 text-[12px] text-[hsl(var(--volta-warning))]">
              Slot reserved for 0:59 more
            </div>

            <Link className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(var(--volta-brand-hover))]" to="/app/payment">
              Confirm &amp; pay
            </Link>

            <div className="mt-3 text-center text-[11px] text-[hsl(var(--volta-tertiary))]">
              No account needed · Code sent via SMS
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] text-[hsl(var(--volta-tertiary))]">
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <ShieldCheck className="mx-auto mb-2 h-4 w-4 text-primary" />
                Secure hold
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <Wallet className="mx-auto mb-2 h-4 w-4 text-primary" />
                Pay later
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <PlugZap className="mx-auto mb-2 h-4 w-4 text-primary" />
                No app fee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
