import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { StatusBadge, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

type StationStatus = "available" | "busy" | "offline";

type Station = {
  id: string;
  name: string;
  distance: string;
  connectors: number;
  status: StationStatus;
  availability: string;
  position: { top: string; left: string };
};

const stations: Station[] = [
  {
    id: "lac-1",
    name: "Lac 1 · Zone A",
    distance: "0.4 km",
    connectors: 4,
    status: "available",
    availability: "2 slots now",
    position: { top: "28%", left: "56%" },
  },
  {
    id: "berge-du-lac",
    name: "Berges du Lac · East",
    distance: "1.1 km",
    connectors: 6,
    status: "available",
    availability: "4 slots now",
    position: { top: "42%", left: "34%" },
  },
  {
    id: "marsa-hub",
    name: "La Marsa · Hub 2",
    distance: "2.8 km",
    connectors: 3,
    status: "busy",
    availability: "Next 15:30",
    position: { top: "22%", left: "72%" },
  },
  {
    id: "downtown-grid",
    name: "Downtown · Connector Bay",
    distance: "4.0 km",
    connectors: 5,
    status: "offline",
    availability: "Offline",
    position: { top: "64%", left: "46%" },
  },
];

function StationPin({
  station,
  selected,
  onClick,
}: {
  station: Station;
  selected: boolean;
  onClick: () => void;
}) {
  const palette = {
    available: {
      fill: "bg-[hsl(var(--volta-tint))]",
      stroke: "border-primary",
      inner: "text-primary",
    },
    busy: {
      fill: "bg-[hsl(var(--volta-warning-tint))]",
      stroke: "border-[hsl(var(--volta-warning))]",
      inner: "text-[hsl(var(--volta-warning))]",
    },
    offline: {
      fill: "bg-card",
      stroke: "border-[hsl(var(--volta-border-strong))]",
      inner: "text-[hsl(var(--volta-border-strong))]",
    },
  } as const;

  const styles = palette[station.status];

  return (
    <button
      aria-label={station.name}
      className="absolute -translate-x-1/2 -translate-y-1/2 no-tap-highlight"
      onClick={onClick}
      style={station.position}
      type="button"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full border border-primary/20",
          selected ? "animate-ring-expand" : "opacity-0",
        )}
      />
      <span
        className={cn(
          "relative flex h-10 w-8 items-start justify-center rounded-t-full border-2 pb-2 pt-1 transition-transform",
          styles.fill,
          styles.stroke,
          selected ? "scale-[1.3] shadow-glow" : "scale-100",
        )}
        style={{ clipPath: "path('M16 0C7.163 0 0 7.163 0 16c0 10.2 16 24 16 24s16-13.8 16-24C32 7.163 24.837 0 16 0Z')" }}
      >
        <span className={cn("relative mt-0.5 flex h-4 w-4 items-center justify-center", styles.inner)}>
          <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 100 100">
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
        </span>
      </span>
    </button>
  );
}

export default function AppReserve() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("lac-1");

  const filteredStations = useMemo(() => {
    if (!query.trim()) return stations;

    const normalized = query.trim().toLowerCase();
    return stations.filter((station) =>
      station.name.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedStation =
    filteredStations.find((station) => station.id === selectedId) ??
    filteredStations[0] ??
    stations[0];

  const canReserve = selectedStation.status === "available";

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="absolute inset-0 bg-[hsl(var(--volta-map))]" />
          <div className="absolute inset-0 volta-grid-overlay opacity-30" />
          <div className="absolute left-[-8%] top-[14%] h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-[-10%] top-[30%] h-52 w-52 rounded-full bg-[hsl(var(--volta-warning))]/10 blur-3xl" />

          <div className="absolute inset-0 opacity-60">
            <div className="absolute left-[12%] top-[22%] h-px w-[38%] rotate-[12deg] bg-border" />
            <div className="absolute left-[36%] top-[45%] h-px w-[28%] -rotate-[24deg] bg-border" />
            <div className="absolute left-[8%] top-[62%] h-px w-[44%] rotate-[8deg] bg-border" />
            <div className="absolute left-[58%] top-[18%] h-[40%] w-px rotate-[8deg] bg-border" />
            <div className="absolute left-[30%] top-[18%] h-[52%] w-px -rotate-[8deg] bg-border" />
          </div>

          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pb-6 pt-5">
            <VoltaLogo size={28} />
            <Link className="volta-ghost-btn px-3 py-2 text-xs" to="/app/account">
              Sign in
            </Link>
          </div>

          <div className="absolute inset-0 z-10">
            {stations.map((station) => (
              <StationPin
                key={station.id}
                onClick={() => setSelectedId(station.id)}
                selected={station.id === selectedStation.id}
                station={station}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 rounded-t-[20px] border-t border-border bg-background/95 px-5 pb-5 pt-2 shadow-sheet backdrop-blur-xl">
            <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border" />

            <label className="mb-4 flex items-center gap-3 rounded-lg border border-[hsl(var(--volta-border-strong))] bg-card px-4 py-3 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <input
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-[hsl(var(--volta-tertiary))]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stations..."
                value={query}
              />
            </label>

            <div className="mb-4 rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-[17px] font-medium text-foreground">
                    {selectedStation.name}
                  </h1>
                  <p className="mt-1 text-xs text-[hsl(var(--volta-tertiary))]">
                    {selectedStation.connectors} connectors · {selectedStation.distance} away
                  </p>
                </div>
                <StatusBadge status={selectedStation.status}>
                  {selectedStation.status}
                </StatusBadge>
              </div>

              <Link
                aria-disabled={!canReserve}
                className={cn(
                  "mt-4 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                  canReserve
                    ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]"
                    : "cursor-not-allowed border border-[hsl(var(--volta-disabled))] bg-card text-[hsl(var(--volta-disabled))]",
                )}
                to={canReserve ? "/app/select-time" : "#"}
              >
                {canReserve ? "Select this station →" : "Station is not available"}
              </Link>
            </div>

            <div className="space-y-3">
              {filteredStations.length ? (
                filteredStations.map((station) => (
                  <button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[10px] border bg-card px-3 py-3 text-left transition-colors",
                      station.id === selectedStation.id
                        ? "border-primary bg-[hsl(var(--volta-tint))]/60"
                        : "border-border hover:bg-[hsl(var(--volta-surface-hover))]",
                    )}
                    key={station.id}
                    onClick={() => setSelectedId(station.id)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        station.status === "available" && "bg-primary",
                        station.status === "busy" && "bg-[hsl(var(--volta-warning))]",
                        station.status === "offline" && "bg-[hsl(var(--volta-border-strong))]",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-foreground">
                        {station.name}
                      </div>
                      <div className="mt-1 text-[10px] text-[hsl(var(--volta-tertiary))]">
                        {station.distance} · {station.connectors} connectors
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-[11px] font-medium",
                        station.status === "available" && "text-primary",
                        station.status === "busy" && "text-[hsl(var(--volta-warning))]",
                        station.status === "offline" && "text-[hsl(var(--volta-tertiary))]",
                      )}
                    >
                      {station.availability}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-xl border border-border bg-card px-4 py-8 text-center">
                  <div className="mx-auto mb-4 w-fit rounded-2xl border border-primary/40 bg-[hsl(var(--volta-tint))] p-3">
                    <VoltaLogo size={28} withWordmark={false} />
                  </div>
                  <h2 className="text-base font-medium text-foreground">
                    No stations nearby
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Try a wider search or browse the full network across Tunisia.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
