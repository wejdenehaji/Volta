import { useMemo, useState } from "react";
import { ChevronLeft, Check, Clock3, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

const dateOptions = ["Today", "Thu 8", "Fri 9", "Sat 10"];
const durationOptions = ["30min", "1h", "1.5h", "2h"];

const slots = [
  { time: "13:30", state: "past" },
  { time: "14:00", state: "past" },
  { time: "14:30", state: "available" },
  { time: "15:00", state: "selected" },
  { time: "15:30", state: "available" },
  { time: "16:00", state: "available" },
  { time: "16:30", state: "available" },
] as const;

export default function TimeSlotPage() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("15:00");

  const timerText = useMemo(() => {
    return selectedSlot ? "4:00" : "";
  }, [selectedSlot]);

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_35%),linear-gradient(180deg,rgba(21,21,25,0.26),rgba(11,11,15,0))]" />

          <div className="sticky top-0 z-20 border-b border-transparent bg-background/90 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <Link className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground" to="/app">
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-[17px] font-medium text-foreground">Select a time</h1>
              <div className="min-w-[34px] text-right font-mono text-[13px] text-[hsl(var(--volta-warning))]">
                {timerText}
              </div>
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
                    <div className="mt-1 text-[11px] text-[hsl(var(--volta-tertiary))]">4 connectors · 0.4 km</div>
                  </div>
                </div>
                <Link className="text-xs text-primary underline underline-offset-4" to="/app">
                  Change
                </Link>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto pb-1">
              <div className="flex gap-2 pr-2">
                {dateOptions.map((date, index) => (
                  <button
                    className={cn(
                      "whitespace-nowrap rounded-full border px-4 py-2 text-xs transition-colors",
                      selectedDate === index
                        ? "border-primary bg-[hsl(var(--volta-tint))] text-primary"
                        : "border-border bg-card text-muted-foreground hover:bg-[hsl(var(--volta-surface-hover))]",
                    )}
                    key={date}
                    onClick={() => setSelectedDate(index)}
                    type="button"
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 overflow-x-auto pb-1">
              <div className="flex gap-2 pr-2">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  const isTaken = slot.state === "past";
                  const isAvailable = slot.state === "available" || isSelected;

                  return (
                    <button
                      className={cn(
                        "flex h-[52px] w-16 flex-col items-center justify-center rounded-lg border text-[13px] transition-colors",
                        isSelected && "border-primary bg-[hsl(var(--volta-tint))] font-medium text-primary",
                        isTaken && "cursor-not-allowed border-border bg-background text-[hsl(var(--volta-disabled))]",
                        !isSelected && isAvailable && "border-primary bg-card text-primary",
                        !isSelected && !isTaken && !isAvailable && "border-border bg-card text-muted-foreground",
                      )}
                      disabled={isTaken}
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot.time)}
                      type="button"
                    >
                      <span>{slot.time}</span>
                      {isSelected ? <Check className="mt-1 h-3 w-3" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <SectionLabel>Estimated duration</SectionLabel>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {durationOptions.map((duration, index) => (
                  <button
                    className={cn(
                      "rounded-lg border px-2 py-2 text-center text-xs transition-colors",
                      selectedDuration === index
                        ? "border-primary bg-[hsl(var(--volta-tint))] text-primary"
                        : "border-border bg-card text-muted-foreground hover:bg-[hsl(var(--volta-surface-hover))]",
                    )}
                    key={duration}
                    onClick={() => setSelectedDuration(index)}
                    type="button"
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[10px] border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-primary/50 bg-[hsl(var(--volta-tint))] p-2 text-primary">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Your car will reach <span className="text-foreground">~84%</span> by <span className="text-foreground">16:30</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Availability</span>
                <span>Selected slot locked for 4:00</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-background">
                <div className="h-2 w-[68%] rounded-full bg-primary" />
              </div>
            </div>

            <Link
              className={cn(
                "mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                selectedSlot
                  ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]"
                  : "pointer-events-none border border-[hsl(var(--volta-disabled))] bg-card text-[hsl(var(--volta-disabled))]",
              )}
              to="/app/vehicle"
            >
              Confirm time slot
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[hsl(var(--volta-warning))]">
              <Search className="h-3.5 w-3.5" />
              Last slot available on the chosen date
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-border bg-card/50 p-4 text-center text-xs text-muted-foreground">
              No slots available today? View tomorrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
