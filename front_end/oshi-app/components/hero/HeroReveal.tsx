"use client";

import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   HeroReveal — Final Resting Frame (Beat 4)
   The hero UI assembles here and STAYS visible.
   Staggered entrance: H1, description, CTAs — each with its
   own delay and premium expo-out ease.
   ═══════════════════════════════════════════════════════════ */

interface HeroRevealProps {
  progress: MotionValue<number>; // 0→1 within the reveal range (0.72–0.92 of total)
}

export default function HeroReveal({ progress }: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  /* ── Staggered opacity transforms ── */
  const headlineOpacity = useTransform(progress, [0, 0.3], [0, 1]);
  const headlineY = useTransform(progress, [0, 0.3], [40, 0]);

  const descOpacity = useTransform(progress, [0.15, 0.45], [0, 1]);
  const descY = useTransform(progress, [0.15, 0.45], [30, 0]);

  const ctaOpacity = useTransform(progress, [0.3, 0.6], [0, 1]);
  const ctaY = useTransform(progress, [0.3, 0.6], [24, 0]);

  const cta2Opacity = useTransform(progress, [0.4, 0.7], [0, 1]);
  const cta2Y = useTransform(progress, [0.4, 0.7], [24, 0]);

  const accentOpacity = useTransform(progress, [0.5, 0.8], [0, 1]);

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl w-full text-center">
        {/* ── Main H1 ── */}
        <motion.h1
          className="display-heading !text-[clamp(1.8rem,1.2rem+3vw,4.5rem)] text-[var(--color-white)] mb-6 md:mb-8"
          style={
            prefersReducedMotion
              ? { opacity: headlineOpacity }
              : { opacity: headlineOpacity, y: headlineY }
          }
        >
          Sri Lanka, curated for the few.
        </motion.h1>

        {/* ── Supporting Description ── */}
        <motion.p
          className="body-serif text-[var(--color-white-80)] max-w-2xl mx-auto mb-8 md:mb-10"
          style={
            prefersReducedMotion
              ? { opacity: descOpacity }
              : { opacity: descOpacity, y: descY }
          }
        >
          Private, design-led journeys through the island&apos;s rarest landscapes, wildlife,
          and living heritage — crafted entirely around you.
        </motion.p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center pointer-events-auto">
          {/* Primary CTA */}
          <motion.a
            href="/trip-planner"
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-64 h-14 rounded-full bg-[var(--color-beige)] text-[var(--color-green)] overflow-hidden transition-colors duration-500 shadow-md"
            style={
              prefersReducedMotion
                ? { opacity: ctaOpacity }
                : { opacity: ctaOpacity, y: ctaY }
            }
            aria-label="Begin Your Journey"
          >
            {/* Hover sweep fill */}
            <span className="absolute inset-0 bg-[var(--color-white)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[var(--ease-expo-out)] rounded-full" />
            <span className="relative z-10 font-[family-name:var(--font-ogg)] text-sm tracking-[0.15em] uppercase font-medium">
              Begin Your Journey
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-current">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="/#journeys"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-64 h-14 rounded-full border border-[var(--color-white-60)] text-[var(--color-white)] hover:border-[var(--color-white)] hover:bg-[var(--color-white-60)]/10 transition-all duration-500"
            style={
              prefersReducedMotion
                ? { opacity: cta2Opacity }
                : { opacity: cta2Opacity, y: cta2Y }
            }
            aria-label="Explore Experiences"
          >
            <span className="font-[family-name:var(--font-ogg)] text-sm tracking-[0.15em] uppercase font-medium">
              Explore Experiences
            </span>
          </motion.a>
        </div>

        {/* ── Accent: Location Tag ── */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center justify-center gap-3"
          style={{ opacity: accentOpacity }}
        >
          <span className="block w-8 h-px bg-[var(--color-white-60)]" />
          <span className="eyebrow text-[var(--color-white-60)] text-[0.65rem]">
            Ceylon · Indian Ocean · 7°N 80°E
          </span>
          <span className="block w-8 h-px bg-[var(--color-white-60)]" />
        </motion.div>
      </div>
    </div>
  );
}
