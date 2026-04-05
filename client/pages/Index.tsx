import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Search } from "lucide-react";

import { PublicFooter, PublicHeader } from "@/components/volta/site-shell";
import {
  AppStoreBadge,
  GlowDivider,
  PhoneFrame,
  SectionLabel,
  StatusBadge,
  VoltaLogo,
} from "@/components/volta/ui";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "find",
    number: "01",
    title: "Find a station near you",
    description:
      "See real-time availability on the map. Available stations shown in green, busy in amber.",
    screen: "map" as const,
  },
  {
    id: "reserve",
    number: "02",
    title: "Reserve in under 60 seconds.",
    description:
      "Enter your plate number. Pick a time slot. Confirm. No account needed.",
    screen: "slot" as const,
  },
  {
    id: "scan",
    number: "03",
    title: "Scan the QR. Start charging.",
    description:
      "Arrive at the station. Scan your session code. Your charging session starts automatically.",
    screen: "qr" as const,
  },
];

const fallbackProof = [
  {
    value: "Growing network",
    label: "LIVE ROLLOUT",
  },
  {
    value: "Always monitored",
    label: "OPS STATUS",
  },
  {
    value: "Booking in under 60s",
    label: "BOOKING FLOW",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function TeardropPin({
  state,
  className,
}: {
  state: "available" | "busy" | "offline";
  className?: string;
}) {
  const palette = {
    available: {
      fill: "bg-[hsl(var(--volta-tint))]",
      border: "border-primary",
      inner: "text-primary",
    },
    busy: {
      fill: "bg-[hsl(var(--volta-warning-tint))]",
      border: "border-[hsl(var(--volta-warning))]",
      inner: "text-[hsl(var(--volta-warning))]",
    },
    offline: {
      fill: "bg-card",
      border: "border-[hsl(var(--volta-border-strong))]",
      inner: "text-[hsl(var(--volta-border-strong))]",
    },
  } as const;

  const styles = palette[state];

  return (
    <div className={cn("relative h-10 w-8", className)}>
      <div
        className={cn(
          "flex h-full w-full items-start justify-center rounded-t-full border-2 pt-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
          styles.fill,
          styles.border,
        )}
        style={{ clipPath: "path('M16 0C7.163 0 0 7.163 0 16c0 10.2 16 24 16 24s16-13.8 16-24C32 7.163 24.837 0 16 0Z')" }}
      >
        <div className={cn("mt-0.5 text-[10px]", styles.inner)}>
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="38" stroke="currentColor" strokeOpacity="0.25" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              fill="none"
              pathLength="100"
              r="38"
              stroke="currentColor"
              strokeDasharray="60 40"
              strokeLinecap="round"
              strokeWidth="8"
              transform="rotate(-90 50 50)"
            />
            <circle cx="50" cy="50" fill="currentColor" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MapPreviewScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-[hsl(var(--volta-map))]">
      <div className="absolute inset-0 volta-grid-overlay opacity-25" />
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[8%] top-[22%] h-px w-[46%] rotate-[14deg] bg-border" />
        <div className="absolute left-[22%] top-[48%] h-px w-[52%] -rotate-[18deg] bg-border" />
        <div className="absolute left-[52%] top-[18%] h-[48%] w-px rotate-[10deg] bg-border" />
        <div className="absolute left-[30%] top-[20%] h-[46%] w-px -rotate-[4deg] bg-border" />
      </div>
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pb-5 pt-5">
        <VoltaLogo size={26} />
        <div className="rounded-full border border-primary/60 bg-[hsl(var(--volta-tint))] px-3 py-1 text-[11px] font-medium text-primary">
          Sign in
        </div>
      </div>
      <div className="absolute left-[28%] top-[34%]">
        <TeardropPin state="busy" />
      </div>
      <div className="absolute left-[52%] top-[28%]">
        <TeardropPin className="scale-[1.3]" state="available" />
      </div>
      <div className="absolute left-[63%] top-[50%]">
        <TeardropPin state="available" />
      </div>
      <div className="absolute left-[38%] top-[60%]">
        <TeardropPin state="offline" />
      </div>

      <div className="absolute inset-x-0 bottom-0 rounded-t-[20px] border-t border-border bg-background/95 px-5 pb-5 pt-2 shadow-sheet backdrop-blur-xl">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border" />
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-[hsl(var(--volta-border-strong))] bg-card px-4 py-3 text-sm text-[hsl(var(--volta-tertiary))]">
          <Search className="h-4 w-4" />
          Search stations...
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[17px] font-medium text-foreground">
                Lac 1 · Zone A
              </div>
              <div className="mt-1 text-xs text-[hsl(var(--volta-tertiary))]">
                4 connectors · 0.4 km away
              </div>
            </div>
            <StatusBadge status="available">available</StatusBadge>
          </div>
          <div className="mt-4 rounded-lg bg-primary px-4 py-3 text-center text-[13px] font-medium text-primary-foreground">
            Select this station →
          </div>
        </div>
      </div>
    </div>
  );
}

function SlotPreviewScreen() {
  return (
    <div className="h-full bg-background px-5 pb-5 pt-5 text-foreground">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">←</span>
        <h3 className="text-[17px] font-medium">Select a time</h3>
        <span className="font-mono text-[13px] text-[hsl(var(--volta-warning))]">
          4:00
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-[10px] border border-primary/60 bg-[hsl(var(--volta-tint))] p-2">
              <VoltaLogo size={20} withWordmark={false} />
            </div>
            <div>
              <div className="text-[13px] font-medium">Lac 1 · Zone A</div>
              <div className="text-[11px] text-[hsl(var(--volta-tertiary))]">
                4 connectors · 0.4 km
              </div>
            </div>
          </div>
          <span className="text-xs text-primary">Change</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-hidden">
        {["Today", "Thu 8", "Fri 9", "Sat 10"].map((day, index) => (
          <div
            key={day}
            className={cn(
              "rounded-full border px-4 py-2 text-xs",
              index === 0
                ? "border-primary bg-[hsl(var(--volta-tint))] text-primary"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2 overflow-hidden">
        {["14:00", "14:30", "15:00", "15:30", "16:00"].map((slot, index) => (
          <div
            key={slot}
            className={cn(
              "flex h-[52px] w-16 flex-col items-center justify-center rounded-lg border text-[13px]",
              index === 1 && "border-primary bg-[hsl(var(--volta-tint))] font-medium text-primary",
              index === 0 && "border-border bg-background text-[hsl(var(--volta-disabled))]",
              index > 1 && "border-border bg-card text-muted-foreground",
            )}
          >
            <span>{slot}</span>
            {index === 1 ? <Check className="mt-1 h-3 w-3" /> : null}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SectionLabel>Estimated duration</SectionLabel>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["30min", "1h", "1.5h", "2h"].map((option, index) => (
            <div
              key={option}
              className={cn(
                "rounded-lg border px-3 py-2 text-center text-xs",
                index === 1
                  ? "border-primary bg-[hsl(var(--volta-tint))] text-primary"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[10px] border border-border bg-card p-4 text-sm text-muted-foreground">
        Your car will reach <span className="text-foreground">~84%</span> by{' '}
        <span className="text-foreground">16:30</span>
      </div>

      <div className="mt-6 rounded-lg bg-primary px-4 py-3 text-center text-[13px] font-medium text-primary-foreground">
        Confirm time slot
      </div>
    </div>
  );
}

function QrPreviewScreen() {
  const qrCells = Array.from({ length: 11 * 11 }, (_, index) => index);

  return (
    <div className="h-full bg-background px-5 pb-5 pt-6 text-foreground">
      <div className="flex items-center justify-center gap-3">
        <VoltaLogo size={26} />
        <StatusBadge status="available">Active session</StatusBadge>
      </div>

      <div className="mt-6 text-center">
        <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--volta-tertiary))]">
          LAC 1 · ZONE A · CONNECTOR 3
        </div>
        <p className="mt-2 text-sm font-medium">Show this code at the station</p>
      </div>

      <div className="mx-auto mt-4 max-w-[270px] rounded-2xl bg-[hsl(var(--volta-qr))] p-5">
        <div className="grid grid-cols-11 gap-1">
          {qrCells.map((cell) => {
            const row = Math.floor(cell / 11);
            const column = cell % 11;
            const isCorner =
              (row < 3 && column < 3) ||
              (row < 3 && column > 7) ||
              (row > 7 && column < 3);
            const isPattern = (row + column) % 2 === 0 || row === column;

            return (
              <div
                className={cn(
                  "aspect-square rounded-[2px]",
                  isCorner || isPattern ? "bg-background" : "bg-transparent",
                )}
                key={cell}
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

      <div className="mt-5 rounded-[10px] border border-border bg-card p-4 text-center">
        <div className="text-[10px] text-[hsl(var(--volta-tertiary))]">Slot begins in</div>
        <div className="mt-1 font-mono text-[22px] font-medium text-primary animate-soft-pulse">
          08:14
        </div>
      </div>
    </div>
  );
}

function PhonePreview({ screen }: { screen: (typeof steps)[number]["screen"] }) {
  if (screen === "slot") return <SlotPreviewScreen />;
  if (screen === "qr") return <QrPreviewScreen />;
  return <MapPreviewScreen />;
}

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-step-index"));
          setActiveStep(index);
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-12% 0px -35% 0px",
      },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const heroProgress = clamp(scrollY / 200);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader solid={scrollY > 100} />

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="hero-connector-video" />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(11, 11, 15, ${0.6 + heroProgress * 0.4})`,
            }}
          />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center transition-opacity duration-200"
            style={{ opacity: 1 - heroProgress }}
          >
            <VoltaLogo className="mb-8" markClassName="animate-float" size={48} withWordmark={false} />
            <h1
              className="max-w-4xl text-balance text-[clamp(2.75rem,8vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Reserve. Plug. Go.
            </h1>
            <p className="mt-4 max-w-2xl text-balance text-[18px] font-normal text-muted-foreground">
              Electric charging, on your schedule.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link className="volta-primary-btn px-8 py-[14px] text-[15px]" to="/app">
                Find a station near me
              </Link>
              <button
                className="text-[13px] text-[hsl(var(--volta-tertiary))] underline underline-offset-4"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                type="button"
              >
                How it works ↓
              </button>
            </div>
          </div>

          <div
            className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
            style={{ opacity: 1 - heroProgress }}
          >
            <div className="h-14 w-[2px] overflow-hidden rounded-full bg-primary/15">
              <div className="h-6 w-full rounded-full bg-primary animate-pulse-line" />
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[900px]">
            <div className="grid gap-8 md:grid-cols-3 md:gap-0">
              {fallbackProof.map((item, index) => (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center px-6 py-2 text-center",
                    index < fallbackProof.length - 1 &&
                      "border-b border-border md:border-b-0 md:border-r",
                  )}
                  key={item.label}
                >
                  <div className="font-mono text-[28px] font-medium text-primary md:text-[34px]">
                    {item.value}
                  </div>
                  <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[hsl(var(--volta-tertiary))]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel className="mb-6">How it works</SectionLabel>

            <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)] lg:items-start">
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div
                    className="relative rounded-[24px] border border-transparent px-1 py-1"
                    data-step-index={index}
                    key={step.id}
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                  >
                    <div
                      className={cn(
                        "rounded-[24px] border border-transparent p-6 transition-colors duration-300",
                        activeStep === index &&
                          "border-border bg-[hsl(var(--volta-surface))]/70",
                      )}
                    >
                      <div className="font-mono text-[40px] font-medium text-[hsl(var(--volta-tint))]">
                        {step.number}
                      </div>
                      <h2 className="mt-4 text-2xl font-medium text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky top-[20vh]">
                <PhoneFrame>
                  <div className="relative h-full w-full">
                    {steps.map((step, index) => (
                      <div
                        className={cn(
                          "absolute inset-0 transition-all duration-500",
                          activeStep === index
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0",
                        )}
                        key={step.id}
                      >
                        <PhonePreview screen={step.screen} />
                      </div>
                    ))}
                  </div>
                </PhoneFrame>
              </div>
            </div>

            <div className="space-y-12 lg:hidden">
              {steps.map((step) => (
                <div className="space-y-6" key={step.id}>
                  <PhoneFrame>
                    <PhonePreview screen={step.screen} />
                  </PhoneFrame>
                  <div>
                    <div className="font-mono text-[40px] font-medium text-[hsl(var(--volta-tint))]">
                      {step.number}
                    </div>
                    <h2 className="mt-4 text-2xl font-medium text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel className="mb-6">Find a station</SectionLabel>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-[hsl(var(--volta-map))] h-[280px] sm:h-[340px] lg:h-[400px]">
              <div className="absolute inset-0 volta-grid-overlay opacity-25" />
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[6%] top-[20%] h-px w-[44%] rotate-[10deg] bg-border" />
                <div className="absolute left-[24%] top-[38%] h-px w-[48%] -rotate-[18deg] bg-border" />
                <div className="absolute left-[44%] top-[66%] h-px w-[36%] rotate-[16deg] bg-border" />
                <div className="absolute left-[30%] top-[12%] h-[60%] w-px -rotate-[12deg] bg-border" />
                <div className="absolute left-[72%] top-[18%] h-[44%] w-px rotate-[8deg] bg-border" />
              </div>

              <Link className="absolute left-[24%] top-[34%]" to="/app">
                <TeardropPin state="available" />
              </Link>
              <Link className="absolute left-[58%] top-[26%]" to="/app">
                <TeardropPin state="available" />
              </Link>
              <Link className="absolute left-[68%] top-[50%]" to="/app">
                <TeardropPin state="busy" />
              </Link>
              <Link className="absolute left-[40%] top-[58%]" to="/app">
                <TeardropPin state="offline" />
              </Link>

              <div className="absolute inset-x-0 bottom-6 flex justify-center px-4">
                <Link
                  className="rounded-full border border-primary bg-[hsl(var(--volta-tint))] px-5 py-2 text-[13px] font-medium text-primary shadow-glow"
                  to="/app"
                >
                  Stations across Tunisia
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[720px]">
            <SectionLabel className="mb-6">Reliability</SectionLabel>
            <h2 className="text-[24px] font-medium text-foreground">
              What happens if something goes wrong?
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-8 text-muted-foreground">
              Every Volta station is monitored in real time. If a connector fails
              mid-session, your billing stops automatically and you are not charged
              for interrupted time. Our team responds within 15 minutes during
              operating hours.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
              to="/support"
            >
              Contact support <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
          <div className="mx-auto max-w-7xl">
            <GlowDivider className="mb-14" />
            <div className="text-center">
              <h2 className="text-[28px] font-medium text-foreground">
                Ready to charge?
              </h2>
              <p className="mt-2 text-[15px] text-muted-foreground">
                No account required. Booking takes 60 seconds.
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <Link className="volta-primary-btn px-8 py-[14px]" to="/app">
                  Find a station
                </Link>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <AppStoreBadge label="Download on the App Store" />
                  <AppStoreBadge label="Get it on Google Play" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
