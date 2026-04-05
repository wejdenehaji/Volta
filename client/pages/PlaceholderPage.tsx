import { Link } from "react-router-dom";

import { PublicFooter, PublicHeader } from "@/components/volta/site-shell";
import { GlowDivider, SectionLabel, VoltaLogo } from "@/components/volta/ui";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  ctaLabel = "Back to home",
  ctaTo = "/",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader solid />
      <main className="px-5 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="volta-card relative overflow-hidden rounded-[28px] p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-volta-hero opacity-80" />
            <div className="pointer-events-none absolute inset-0 volta-grid-overlay opacity-25" />

            <div className="relative space-y-8">
              <SectionLabel>{eyebrow}</SectionLabel>

              <div className="space-y-4">
                <VoltaLogo size={44} withWordmark={false} />
                <h1 className="max-w-2xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] text-foreground">
                  {title}
                </h1>
                <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>

              <GlowDivider />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link className="volta-primary-btn px-6" to={ctaTo}>
                  {ctaLabel}
                </Link>
                <Link className="volta-ghost-btn px-6" to="/app">
                  Open reservation preview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
