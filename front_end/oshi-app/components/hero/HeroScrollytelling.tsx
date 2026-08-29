"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import HeroBackground from "./HeroBackground";
import StoryBeat from "./StoryBeat";
import HeroReveal from "./HeroReveal";

/* ═══════════════════════════════════════════════════════════
   Scroll-Range Map (tune these to adjust timing)
   ─────────────────────────────────────────────────────────
   Beat 1:  0.00 – 0.22   centered           "Where the wild still whispers."
   Beat 2:  0.24 – 0.46   lower-left         "Emerald hills. Endless coast."
   Beat 3:  0.48 – 0.70   upper-right        "Two thousand years of grace."
   Beat 4:  0.72 – 1.00   final resting UI    Hero assembly (does NOT fade out)
   ═══════════════════════════════════════════════════════════ */

const STORY_BEATS = [
  {
    eyebrow: "THE ISLAND OF SERENDIPITY",
    headline: "Where the wild still whispers.",
    sub: "An island shaped by monsoon light, ancient forests, and an ocean that remembers every tide.",
    alignment: "center" as const,
    scrollRange: [0.0, 0.23] as [number, number],
    fadeOut: true,
  },
  {
    eyebrow: "LANDSCAPES",
    headline: "Emerald hills. Endless coast.",
    sub: "From misted tea country to leopard-shadowed jungles, every horizon is a new chapter.",
    alignment: "center" as const,
    scrollRange: [0.24, 0.47] as [number, number],
    fadeOut: true,
  },
  {
    eyebrow: "CULTURE & SOUL",
    headline: "Two thousand years of grace.",
    sub: "Temples, ritual, and warmth — a heritage you don't visit, you're welcomed into.",
    alignment: "center" as const,
    scrollRange: [0.48, 0.71] as [number, number],
    fadeOut: true,
  },
];

interface HeroScrollytellingProps {
  isLoaded: boolean;
}

export default function HeroScrollytelling({ isLoaded }: HeroScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Scroll tracking ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Smooth the scroll progress with spring physics ── */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 300 : 100,
    damping: prefersReducedMotion ? 60 : 30,
    restDelta: 0.001,
  });

  /* ── Derive a 0-1 value for the final reveal activation ── */
  const revealProgress = useTransform(smoothProgress, [0.73, 0.93], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: isMobile ? "400vh" : "500vh" }}
      aria-label="Hero storytelling experience"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic background */}
        <HeroBackground progress={smoothProgress} />

        {/* Story beats 1–3 */}
        {isLoaded &&
          STORY_BEATS.map((beat, i) => (
            <StoryBeat
              key={i}
              eyebrow={beat.eyebrow}
              headline={beat.headline}
              sub={beat.sub}
              alignment={beat.alignment}
              scrollRange={beat.scrollRange}
              progress={smoothProgress}
              fadeOut={beat.fadeOut}
            />
          ))}

        {/* Beat 4 — Final resting frame (Hero UI assembly) */}
        {isLoaded && (
          <HeroReveal progress={revealProgress} />
        )}
      </div>
    </section>
  );
}
