import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, CircleDot, LoaderCircle, Phone, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel, VoltaLogo } from "@/components/volta/ui";
import { cn } from "@/lib/utils";

const boxes = Array.from({ length: 6 }, (_, index) => index);

function DigitBox({
  value,
  active,
  onClick,
}: {
  value: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "flex h-14 w-12 items-center justify-center rounded-lg border bg-card font-mono text-[22px] text-foreground transition-all",
        active ? "border-primary" : "border-[hsl(var(--volta-border-strong))]",
        value ? "scale-100" : "text-[hsl(var(--volta-disabled))]",
      )}
      onClick={onClick}
      type="button"
    >
      {value || "•"}
    </button>
  );
}

export default function OtpPage() {
  const [showDifferentNumber, setShowDifferentNumber] = useState(false);
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(47);
  const [activeBox, setActiveBox] = useState(0);

  useEffect(() => {
    if (!sent || secondsLeft === 0) return undefined;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sent, secondsLeft]);

  useEffect(() => {
    const nextIndex = code.findIndex((digit) => digit === "");
    setActiveBox(nextIndex === -1 ? 5 : nextIndex);
  }, [code]);

  const otpComplete = useMemo(() => code.every(Boolean), [code]);

  const handleSendCode = () => {
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setCode((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
  };

  const handleResend = () => {
    setSecondsLeft(60);
    setCode(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-background px-0 py-0 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-background shadow-none sm:rounded-[32px] sm:border sm:border-border sm:shadow-volta">
        <div className="relative min-h-screen overflow-hidden bg-background sm:min-h-[844px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,107,0.08),transparent_34%),linear-gradient(180deg,rgba(21,21,25,0.24),rgba(11,11,15,0))]" />

          <div className="sticky top-0 z-20 border-b border-transparent bg-background/90 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <Link className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground" to="/app/vehicle">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-[17px] font-medium text-foreground">Verify your number</h1>
              <div className="font-mono text-[13px] text-[hsl(var(--volta-warning))]">4:00</div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-6">
            <p className="mx-auto max-w-[300px] text-center text-[14px] leading-7 text-muted-foreground">
              We&apos;ll send a one-time code to confirm your identity for this session.
            </p>

            <div className="mt-5 rounded-xl border border-border bg-card p-4">
              <SectionLabel>Owner number on file</SectionLabel>
              <div className="mt-2 flex items-center justify-between gap-4">
                <div className="font-mono text-[18px] text-foreground">+216 •• •• •• 47</div>
                <button
                  className="text-[12px] font-medium text-primary underline underline-offset-4"
                  onClick={() => setShowDifferentNumber((current) => !current)}
                  type="button"
                >
                  Use a different number for this session →
                </button>
              </div>
            </div>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200 ease-out",
                showDifferentNumber ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="space-y-2 rounded-xl border border-border bg-card p-4">
                <SectionLabel>Alternative number</SectionLabel>
                <input
                  className="w-full rounded-lg border border-[hsl(var(--volta-border-strong))] bg-background px-4 py-3 font-mono text-[16px] text-foreground outline-none placeholder:text-[hsl(var(--volta-disabled))] focus:border-primary"
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+216 ..."
                  value={phone}
                />
                <p className="text-[11px] leading-5 text-[hsl(var(--volta-tertiary))]">
                  This number is for this session only. Not saved to your account.
                </p>
              </div>
            </div>

            <button
              className={cn(
                "mt-5 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                sending
                  ? "cursor-wait bg-primary/80 text-primary-foreground"
                  : "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]",
              )}
              onClick={handleSendCode}
              type="button"
            >
              {sending ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending code
                </span>
              ) : (
                "Send code"
              )}
            </button>

            {sent ? (
              <>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {boxes.map((index) => (
                    <DigitBox
                      active={index === activeBox}
                      key={index}
                      onClick={() => setActiveBox(index)}
                      value={code[index]}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <input
                    className="sr-only"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "").slice(0, 6);
                      const next = ["", "", "", "", "", ""];
                      digits.split("").forEach((digit, index) => {
                        next[index] = digit;
                      });
                      setCode(next);
                    }}
                    value={code.join("")}
                  />
                </div>

                <div className="mt-4 text-center text-[12px] text-[hsl(var(--volta-tertiary))]">
                  {secondsLeft > 0 ? `Resend code in 0:${String(secondsLeft).padStart(2, "0")}` : "Resend code"}
                </div>

                {secondsLeft === 0 ? (
                  <button
                    className="mt-2 block w-full text-center text-[12px] font-medium text-primary underline underline-offset-4"
                    onClick={handleResend}
                    type="button"
                  >
                    Resend code
                  </button>
                ) : null}

                <div className="mt-3 rounded-xl border border-border bg-card p-4 text-[11px] leading-6 text-muted-foreground">
                  After 60 seconds, a voice OTP fallback appears if the SMS does not arrive.
                </div>

                <div className="mt-5 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-primary/50 bg-[hsl(var(--volta-tint))] p-2 text-primary">
                      {otpComplete ? <Check className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-foreground">
                        {otpComplete ? "Code verified" : "Enter the 6-digit code"}
                      </div>
                      <div className="mt-1 text-[11px] leading-5 text-[hsl(var(--volta-tertiary))]">
                        {otpComplete
                          ? "You can continue to the reservation summary."
                          : "Tap each box to fill the code. The session continues automatically once verified."}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  className={cn(
                    "mt-5 flex w-full items-center justify-center rounded-lg px-4 py-3 text-[13px] font-medium transition-colors",
                    otpComplete
                      ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--volta-brand-hover))]"
                      : "pointer-events-none border border-[hsl(var(--volta-disabled))] bg-card text-[hsl(var(--volta-disabled))]",
                  )}
                  to="/app/summary"
                >
                  Continue
                </Link>

                <button
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-muted-foreground"
                  type="button"
                  onClick={() => setShowDifferentNumber(true)}
                >
                  <Phone className="h-4 w-4" />
                  Wrong number
                </button>

                <button
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[13px] font-medium text-muted-foreground"
                  type="button"
                  onClick={handleResend}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Call me instead
                </button>
              </>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-border bg-card/50 p-4 text-center text-xs text-muted-foreground">
                Send the code to unlock the OTP entry state.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
