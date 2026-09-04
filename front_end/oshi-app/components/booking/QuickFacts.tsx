"use client";

import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

/* ═══════════════════════════════════════════════════════════
   QuickFacts — Compact stat cards for the booking hero strip
   ───────────────────────────────────────────────────────────
   Renders a responsive grid of 4 glassmorphic cards showing
   Duration, Location, Group Size, and Travel Style.
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
      className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-white)]/70"
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
      className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-white)]/70"
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
      className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  compass: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-white)]/70"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
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
      icon: icons.compass,
      label: "Travel Style",
      value: "Private Chauffeur Tour",
    },
  ];
}

export default function QuickFacts({ experience }: QuickFactsProps) {
  const facts = buildFacts(experience);

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-xl sm:rounded-2xl border border-[var(--color-white)]/20 bg-[var(--color-white)]/10 px-3 py-2.5 sm:px-5 sm:py-4 backdrop-blur-md"
        >
          {fact.icon}

          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--color-white)]/60">
            {fact.label}
          </p>

          <p className="font-[family-name:var(--font-ogg)] text-xs font-light text-[var(--color-white)] sm:text-base leading-tight mt-0.5 sm:mt-0">
            {fact.value}
          </p>
        </div>
      ))}
    </div>
  );
}
