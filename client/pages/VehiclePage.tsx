import { useState } from "react";
import { ArrowLeft, Camera, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

const regionTabs = ["TUN", "RS", "PE", "DIP"];

export default function VehiclePage() {
  const [region, setRegion] = useState(0);
  const [plate, setPlate] = useState("183 AB 00");
  const [chassis, setChassis] = useState("");

  const vehicleConfirmed = plate.trim().length > 0;

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_34%),linear-gradient(180deg,rgba(21,21,25,0.24),rgba(11,11,15,0))]" />

          <div className="sticky top-0 z-20 border-b border-transparent bg-background/90 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <Link className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground" to="/app/select-time">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-[17px] font-medium text-foreground">Identify your vehicle</h1>
              <div className="font-mono text-[13px] text-[hsl(var(--volta-warning))]">4:00</div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {regionTabs.map((tab, index) => (
                <button
                  className={cn(
                    "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                    region === index
                      ? "border-primary bg-[hsl(var(--volta-tint))] text-primary"
                      : "border-border bg-card text-[hsl(var(--volta-tertiary))] hover:bg-[hsl(var(--volta-surface-hover))]",
                  )}
                  key={tab}
                  onClick={() => setRegion(index)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <SectionLabel>Plate number</SectionLabel>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-[hsl(var(--volta-border-strong))] bg-card px-4 py-4 pr-12 font-mono text-[16px] tracking-[0.08em] text-foreground outline-none placeholder:text-[hsl(var(--volta-disabled))] focus:border-primary"
                  onChange={(event) => setPlate(event.target.value)}
                  placeholder="183 AB 00"
                  value={plate}
                />
                <button
                  className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background text-[hsl(var(--volta-tertiary))] transition-colors hover:bg-[hsl(var(--volta-surface-hover))] hover:text-foreground"
                  type="button"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-[hsl(var(--volta-tertiary))]">
              <span className="h-px flex-1 bg-border" />
              <span>or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-4 space-y-2">
              <SectionLabel>Chassis number</SectionLabel>
              <input
                className="w-full rounded-lg border border-[hsl(var(--volta-border-strong))] bg-card px-4 py-4 font-mono text-[16px] tracking-[0.08em] text-foreground outline-none placeholder:text-[hsl(var(--volta-disabled))] focus:border-primary"
                onChange={(event) => setChassis(event.target.value)}
                placeholder="VF1RFD..."
                value={chassis}
              />
            </div>

            <div className="mt-5 rounded-xl border border-primary/50 bg-[hsl(var(--volta-tint))] p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-primary bg-primary/10 p-2 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-primary">Vehicle confirmed</div>
                  <div className="mt-1 font-mono text-[12px] text-[hsl(var(--volta-muted))]">
                    {plate || "183 AB 00"}
                  </div>
                </div>
              </div>
            </div>

            <Link className="mt-4 block text-center text-[13px] text-[hsl(var(--volta-tertiary))] underline underline-offset-4" to="/app/foreign-vehicle">
              Using a foreign vehicle? Tap here →
            </Link>

            <Link
              className={cn(
                "mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                vehicleConfirmed
                  ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]"
                  : "pointer-events-none border border-[hsl(var(--volta-disabled))] bg-card text-[hsl(var(--volta-disabled))]",
              )}
              to="/app/verify"
            >
              Continue
            </Link>

            <div className="mt-4 rounded-xl border border-border bg-card p-4 text-[11px] leading-6 text-muted-foreground">
              If your plate is not in the registry, we’ll show a validation flow instead of blocking the booking.
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <VoltaLogo size={18} withWordmark={false} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-foreground">Plate matched</div>
                <div className="mt-1 truncate font-mono text-[12px] text-[hsl(var(--volta-tertiary))]">
                  {plate || "183 AB 00"} · region {regionTabs[region]}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[hsl(var(--volta-tertiary))]" />
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-border bg-card/50 p-4 text-center text-xs text-muted-foreground">
              OCR overlay appears when the camera icon is tapped.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
