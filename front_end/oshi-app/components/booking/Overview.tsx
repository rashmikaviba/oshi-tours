"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Icon Components ─── */

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l6.58-6.58a1 1 0 0 0 0-1.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ─── Facts Data ─── */

interface FactRow {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  getValue: (exp: ExperienceData) => string;
}

const facts: FactRow[] = [
  {
    icon: MapPinIcon,
    label: "Location",
    getValue: (exp) => exp.location,
  },
  {
    icon: ClockIcon,
    label: "Duration",
    getValue: (exp) =>
      `${exp.durationDays} day${exp.durationDays !== 1 ? "s" : ""}`,
  },
  {
    icon: CompassIcon,
    label: "Region",
    getValue: (exp) => exp.region,
  },
  {
    icon: TagIcon,
    label: "From Price",
    getValue: (exp) =>
      `${exp.currency} ${exp.priceFrom.toLocaleString("en-US")}`,
  },
];

/* ─── Overview Component ─── */

interface OverviewProps {
  experience: ExperienceData;
}

export default function Overview({ experience }: OverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /* Left column — facts panel */
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* Right column — content area, 0.2s later */
      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-10 md:px-16 lg:px-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-[1400px] mx-auto">
        {/* ── Left Column — Facts Panel ── */}
        <div
          ref={leftColRef}
          className="lg:col-span-4"
          style={prefersReducedMotion ? undefined : { opacity: 0 }}
        >
          <div className="flex flex-col">
            {facts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className={`flex items-center gap-4 py-4 ${
                    i < facts.length - 1
                      ? "border-b border-[var(--color-green)]/10"
                      : ""
                  }`}
                >
                  <Icon className="w-5 h-5 text-[var(--color-green-70)] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs tracking-widest uppercase text-[var(--color-green-70)]">
                      {fact.label}
                    </span>
                    <span className="font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] font-normal">
                      {fact.getValue(experience)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Column — Content ── */}
        <div
          ref={rightColRef}
          className="lg:col-span-8"
          style={prefersReducedMotion ? undefined : { opacity: 0 }}
        >
          {/* Eyebrow */}
          <p className="eyebrow text-[var(--color-green-70)] mb-6">
            The Experience
          </p>

          {/* Overview Text */}
          <p
            className="font-[family-name:var(--font-ogg)] text-[var(--color-green)] whitespace-pre-line leading-relaxed mb-12"
            style={{
              fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
            }}
          >
            {experience.overview}
          </p>


        </div>
      </div>
    </section>
  );
}
