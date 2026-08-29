"use client";

import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

/* ═══════════════════════════════════════════════════════════
   QuickFacts — Compact stat cards for the booking hero strip
   ───────────────────────────────────────────────────────────
   Renders a responsive grid of 4 glassmorphic cards showing
   Duration, Location, Group Size, and starting price.
   ═══════════════════════════════════════════════════════════ */

interface QuickFactsProps {
  experience: ExperienceData;
}

/** Inline SVG icon paths — kept co-located to avoid an icon-library dep. */
const icons = {
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-2 h-5 w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  mapPin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-2 h-5 w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <path d="M12 21c-4-4-8-7.33-8-11a8 8 0 1 1 16 0c0 3.67-4 7-8 11Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  users: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-2 h-5 w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  tag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-2 h-5 w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  ),
} as const;

interface Fact {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function buildFacts(experience: ExperienceData): Fact[] {
  return [
    {
      icon: icons.calendar,
      label: "Duration",
      value: `${experience.durationDays} Days`,
    },
    {
      icon: icons.mapPin,
      label: "Location",
      value: experience.location,
    },
    {
      icon: icons.users,
      label: "Group Size",
      value: experience.groupSize,
    },
    {
      icon: icons.tag,
      label: "From",
      value: `${experience.currency} ${experience.priceFrom.toLocaleString()}`,
    },
  ];
}

export default function QuickFacts({ experience }: QuickFactsProps) {
  const facts = buildFacts(experience);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-2xl border border-[var(--color-white)]/20 bg-[var(--color-white)]/10 px-5 py-4 backdrop-blur-md"
        >
          {fact.icon}

          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-white)]/60">
            {fact.label}
          </p>

          <p className="font-[family-name:var(--font-ogg)] text-sm font-light text-[var(--color-white)] sm:text-base">
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}
