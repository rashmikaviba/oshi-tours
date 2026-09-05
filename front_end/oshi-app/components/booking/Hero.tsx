"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";
import QuickFacts from "./QuickFacts";

/* ═══════════════════════════════════════════════════════════
 Hero, Full-bleed cinematic hero for the booking page
 ───────────────────────────────────────────────────────────
 Features a Ken Burns CSS animation on the background image,
 GSAP staggered fade-up for text content, and a bottom-pinned
 QuickFacts strip.
 ═══════════════════════════════════════════════════════════ */

interface HeroProps {
 experience: ExperienceData;
}

export default function Hero({ experience }: HeroProps) {
 const contentRef = useRef<HTMLDivElement>(null);
 const prefersReducedMotion = useReducedMotion();

 /* ── GSAP: stagger-in text content on mount ──────────────── */
 useEffect(() => {
 if (prefersReducedMotion || !contentRef.current) return;

 const ctx = gsap.context(() => {
 const targets = contentRef.current!.querySelectorAll("[data-hero-reveal]");

 gsap.set(targets, { opacity: 0, y: 32 });
 gsap.to(targets, {
 opacity: 1,
 y: 0,
 duration: 1,
 ease: "power4.out",
 stagger: 0.15,
 delay: 0.3,
 });
 }, contentRef);

 return () => ctx.revert();
 }, [prefersReducedMotion]);

 /** Scroll-to-form handler */
 const handleCheckAvailability = () => {
 document
 .getElementById("booking-form")
 ?.scrollIntoView({ behavior: "smooth" });
 };

 return (
 <section
 className="relative h-[80vh] overflow-hidden sm:h-[85vh] lg:h-screen"
 aria-label={`${experience.title}, booking hero`}
 >
 {/* ── Background Image with Ken Burns ──────────────────── */}
 <div
 className="absolute inset-0 animate-kenburns"
 aria-hidden="true"
 style={
 prefersReducedMotion
 ? undefined
 : ({
 "--kenburns-play": "running",
 } as React.CSSProperties)
 }
 >
 <Image
 src={experience.heroImage}
 alt={experience.title}
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />
 </div>

 {/* ── Gradient scrim overlay ───────────────────────────── */}
 <div
 className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(20,32,18)]/90 via-[rgb(20,32,18)]/40 to-transparent"
 aria-hidden="true"
 />

 {/* ── Content overlay ─────────────────────────────────── */}
 <div className="absolute inset-0 flex flex-col justify-end">
 <div
 ref={contentRef}
 className="flex flex-col gap-5 px-6 pb-8 sm:px-10 md:px-16 lg:px-20 lg:pb-10"
 >
 {/* Eyebrow */}
 <span
 data-hero-reveal
 className="eyebrow text-[var(--color-white)]/80"
 >
 {experience.region}
 </span>

 {/* Title */}
 <h1
 data-hero-reveal
 className="font-[family-name:var(--font-grandslang)] text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.05] text-white"
 >
 {experience.title}
 </h1>

 {/* Tagline */}
 <p
 data-hero-reveal
 className="max-w-xl font-[family-name:var(--font-ogg)] text-[clamp(0.95rem,1.5vw,1.25rem)] font-light leading-relaxed text-[var(--color-white)]/80"
 >
 {experience.tagline}
 </p>

 {/* CTA Button */}
 <div data-hero-reveal>
 <button
 type="button"
 onClick={handleCheckAvailability}
 className="mt-2 inline-flex min-h-[44px] items-center rounded-full border border-white px-8 py-3 font-[family-name:var(--font-ogg)] text-sm font-normal tracking-wide text-white transition-colors duration-300 ease-[var(--ease-expo-out)] hover:bg-white hover:text-[var(--color-green)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
 >
 Check Availability
 </button>
 </div>

 {/* QuickFacts strip */}
 <div data-hero-reveal className="mt-4 sm:mt-6 lg:mt-8">
 <QuickFacts experience={experience} />
 </div>
 </div>
 </div>

 {/* ── Ken Burns keyframes (injected via <style>) ────────
 Using CSS @keyframes directly to keep the animation
 purely GPU-accelerated and independent of JS ticks.
 ──────────────────────────────────────────────────── */}
 <style jsx>{`
 @keyframes kenburns {
 from {
 transform: scale(1);
 }
 to {
 transform: scale(1.05);
 }
 }

 .animate-kenburns {
 animation: kenburns 12s ease-in-out infinite alternate;
 animation-play-state: var(--kenburns-play, paused);
 }
 `}</style>
 </section>
 );
}
