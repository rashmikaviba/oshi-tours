"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import PillButton from "../ui/PillButton";
import JourneyCard from "./JourneyCard";
import { CURATED_JOURNEYS } from "@/data/journeys";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InspirationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* ── Scroll Entrance Animation via GSAP ScrollTrigger ── */
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 2. Bento Cards Staggered Reveal
      if (cardsContainerRef.current) {
        const cardElements = cardsContainerRef.current.querySelectorAll("[data-journey-card]");
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 48, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    // Fallback safety to ensure content is visible if scroll trigger is bypassed on mobile
    const safetyTimer = setTimeout(() => {
      if (headerRef.current) {
        gsap.to(headerRef.current.children, { opacity: 1, y: 0, duration: 0.5 });
      }
      if (cardsContainerRef.current) {
        const cardElements = cardsContainerRef.current.querySelectorAll("[data-journey-card]");
        gsap.to(cardElements, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
      }
    }, 2500);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const featureJourney = CURATED_JOURNEYS.find((j) => j.variant === "feature") || CURATED_JOURNEYS[0];
  const compactJourneys = CURATED_JOURNEYS.filter((j) => j.variant === "compact");

  return (
    <section
      ref={sectionRef}
      id="journeys"
      className="relative z-20 bg-transparent pt-6 sm:pt-8 lg:pt-9 xl:pt-10 pb-4 sm:pb-6 lg:pb-8 xl:pb-10 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
      aria-label="Curated travel journeys inspiration"
    >
      {/* Clean solid beige background surface without white gradient haze */}


      {/* Full-Width Expansive Container (Fluid, Content-Aware) */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10 min-w-0">
        
        {/* ── Header Row (Stacks title above pill on mobile, side-by-side on tablet/desktop) ── */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-5 mb-12 sm:mb-16 lg:mb-20 xl:mb-24 min-w-0"
        >
          <div className="max-w-3xl min-w-0">
            <p className="eyebrow text-[var(--color-green)] opacity-85 mb-1.5 sm:mb-2 tracking-[0.28em] text-xs font-semibold">
              CURATED JOURNEYS
            </p>
            <h2 className="font-[family-name:var(--font-grandslang)] text-[var(--color-green)] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] xl:text-[3.4rem] leading-[1.04] tracking-tight">
              Find inspiration in journeys we&apos;ve crafted
            </h2>
          </div>

          <div className="flex-shrink-0 self-start sm:self-end sm:pb-1 mt-2 sm:mt-0">
            <PillButton href="/trip-planner" ariaLabel="Plan Your Journey">
              Plan Your Journey
            </PillButton>
          </div>
        </div>

        {/* ── Responsive Bento Grid (Desktop: Bento 1+4 | Tablet: Top Hero + 2x2 | Mobile: 1-Col Stack) ── */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-stretch min-w-0"
        >
          {/* Left Column / Top Hero: Feature Card (spans 5 cols on desktop, 2 cols on tablet, 1 col on mobile) */}
          <div
            data-journey-card
            className="col-span-1 md:col-span-2 lg:col-span-5 h-full flex flex-col min-w-0"
          >
            <JourneyCard
              {...featureJourney}
              index={0}
            />
          </div>

          {/* Right Column / Bottom Grid: 4 Compact Cards (spans 7 cols on desktop as 2x2, 2 cols on tablet as 2x2, 1 col on mobile) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-stretch min-w-0">
            {compactJourneys.map((journey, index) => (
              <div
                key={journey.id}
                data-journey-card
                className="w-full h-full flex flex-col min-w-0"
              >
                <JourneyCard
                  {...journey}
                  index={index + 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom micro-label removed as per user request */}

      </div>
    </section>
  );
}

