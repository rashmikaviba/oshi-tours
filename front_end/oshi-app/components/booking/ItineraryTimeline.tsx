"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import type { ExperienceData, ItineraryDay } from "@/data/experiences/hill-country-by-rail";
import DayActivityModal from "./DayActivityModal";

/* ═══════════════════════════════════════════════════════════
 ItineraryTimeline, Vertical alternating day-by-day layout
 Desktop ≥1024 px: cards alternate left / right of center line
 Mobile <1024 px: single-side, line on the left
 Enhanced with "VIEW MORE" button + interactive modal popup.
 ═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

interface ItineraryTimelineProps {
 experience: ExperienceData;
}

/* ── Fanned Cards Subcomponent ── */
function FannedCards({ images, isEven }: { images: string[]; isEven: boolean }) {
 const prefersReducedMotion = useReducedMotion();
 if (!images || images.length === 0) return null;

 return (
 <motion.div
 className={`relative w-full aspect-[4/3] max-w-[300px] sm:max-w-[340px] mx-auto flex items-center justify-center cursor-pointer ${
 isEven ? "lg:ml-0 lg:mr-auto" : "lg:ml-auto lg:mr-0"
 }`}
 whileHover={prefersReducedMotion ? undefined : "hover"}
 initial="initial"
 animate="initial"
 >
 {images.map((src, i) => {
 const isCenter = i === 1;
 const isLeft = i === 0;
 
 // Static layout matching PhotoFan precisely
 const staticRotate = isCenter ? 1 : isLeft ? -12 : 12;
 const staticX = isCenter ? "0%" : isLeft ? "-45%" : "45%";
 const staticY = isCenter ? "-4%" : "4%";
 const staticZIndex = isCenter ? 20 : 10;
 
 // On hover, spread side-by-side
 const hoverX = isCenter ? "0%" : isLeft ? "-105%" : "105%";

 return (
 <motion.div
 key={src}
 className="absolute w-[40%] aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border sm:border-2 border-[var(--color-white)]/90 origin-center"
 variants={{
 initial: { rotate: staticRotate, x: staticX, y: staticY, zIndex: staticZIndex },
 hover: { rotate: 0, x: hoverX, y: "0%", zIndex: 20 },
 }}
 transition={{ type: "spring", stiffness: 350, damping: 28 }}
 >
 <Image
 src={src}
 alt="Itinerary view"
 fill
 className="object-cover text-transparent"
 sizes="(max-width: 1024px) 100vw, 33vw"
 />
 </motion.div>
 );
 })}
 </motion.div>
 );
}

export default function ItineraryTimeline({
 experience,
}: ItineraryTimelineProps) {
 const sectionRef = useRef<HTMLElement>(null);
 const headerRef = useRef<HTMLDivElement>(null);
 const lineRef = useRef<HTMLDivElement>(null);
 const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
 const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
 const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
 const prefersReducedMotion = useReducedMotion();

 const [selectedDay, setSelectedDay] = useState<ItineraryDay | null>(null);

 useEffect(() => {
 if (prefersReducedMotion) return;

 const ctx = gsap.context(() => {
 /* ── Header entrance animation ── */
 if (headerRef.current) {
 gsap.fromTo(
 headerRef.current,
 { opacity: 0, y: 30 },
 {
 opacity: 1,
 y: 0,
 duration: 0.9,
 ease: "expo.out",
 scrollTrigger: {
 trigger: headerRef.current,
 start: "top 85%",
 once: true,
 },
 }
 );
 }

 /* ── Center-line grow animation (scrub) ── */
 if (lineRef.current) {
 gsap.fromTo(
 lineRef.current,
 { scaleY: 0 },
 {
 scaleY: 1,
 ease: "none",
 scrollTrigger: {
 trigger: sectionRef.current,
 start: "top 75%",
 end: "bottom 60%",
 scrub: true,
 },
 }
 );
 }

 /* ── Synced entrance animations for text and images ── */
 rowsRef.current.forEach((row, index) => {
 if (!row) return;
 const card = cardsRef.current[index];
 const imgContainer = imagesRef.current[index];
 const isEven = index % 2 === 0;
 const xDesktop = isEven ? -40 : 40;

 if (card) {
 gsap.fromTo(
 card,
 { opacity: 0, x: xDesktop },
 {
 opacity: 1,
 x: 0,
 duration: 0.8,
 ease: "power3.out",
 scrollTrigger: {
 trigger: row,
 start: "top 85%",
 once: true,
 },
 }
 );
 }

 if (imgContainer) {
 gsap.fromTo(
 imgContainer,
 { opacity: 0, x: -xDesktop },
 {
 opacity: 1,
 x: 0,
 duration: 0.8,
 ease: "power3.out",
 scrollTrigger: {
 trigger: row,
 start: "top 85%",
 once: true,
 },
 }
 );
 }
 });
 }, sectionRef);

 return () => ctx.revert();
 }, [prefersReducedMotion, experience.itinerary.length]);

 return (
 <section
 ref={sectionRef}
 className="pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden"
 aria-label="Itinerary timeline"
 >
 {/* ── Header ── */}
 <div
 ref={headerRef}
 className="text-center mb-16 sm:mb-24 max-w-2xl mx-auto"
 style={prefersReducedMotion ? undefined : { opacity: 0 }}
 >
 <p className="eyebrow text-[var(--color-green-70)] mb-5">
 Your Itinerary
 </p>
 <h2 className="font-[family-name:var(--font-grandslang)] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.08] text-[var(--color-green)] tracking-tight">
 A journey, day by day
 </h2>
 <p className="font-[family-name:var(--font-ogg)] text-[var(--color-green-70)] text-base sm:text-lg mt-4 font-light">
 Every day is paced to the rhythm of the highlands. Click View More on any day for the complete activity guide.
 </p>
 </div>

 {/* ── Timeline wrapper ── */}
 <div className="relative max-w-6xl mx-auto">
 {/* ── Vertical line ── */}
 <div
 ref={lineRef}
 className="absolute top-0 bottom-0 w-[2px] bg-[var(--color-green)]/20 left-4 lg:left-1/2 lg:-translate-x-1/2 origin-top"
 aria-hidden="true"
 />

 {/* ── Day entries ── */}
 <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
 {experience.itinerary.map((day, index) => {
 const isEven = index % 2 === 0;

 return (
 <div
 key={day.day}
 ref={(el) => {
 rowsRef.current[index] = el;
 }}
 className={`relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0 ${
 isEven ? "lg:flex-row" : "lg:flex-row-reverse"
 }`}
 >
 {/* ── Circle node ── */}
 <div
 className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-2 lg:top-1/2 lg:-translate-y-1/2 w-4 h-4 rounded-full border-2 border-[var(--color-green)] bg-[var(--color-beige)] z-10 shrink-0"
 aria-hidden="true"
 />

 {/* ── Text Card ── */}
 <div
 ref={(el) => {
 cardsRef.current[index] = el;
 }}
 className={`ml-12 lg:ml-0 lg:w-[calc(50%-3rem)] flex flex-col justify-center ${
 isEven
 ? "lg:pr-12 lg:text-right lg:mr-auto lg:items-end"
 : "lg:pl-12 lg:text-left lg:ml-auto lg:items-start"
 }`}
 style={prefersReducedMotion ? undefined : { opacity: 0 }}
 >
 <span className="inline-block bg-[var(--color-green)]/10 text-[var(--color-green)] px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
 Day {day.day}
 </span>
 <h3 className="font-[family-name:var(--font-grandslang)] text-xl sm:text-2xl text-[var(--color-green)] mb-3">
 {day.title}
 </h3>
 <p className="font-[family-name:var(--font-ogg)] text-[var(--color-green-70)] text-sm sm:text-base leading-relaxed max-w-md">
 {day.description}
 </p>

 {/* ── VIEW MORE BUTTON ── */}
 <button
 onClick={() => setSelectedDay(day)}
 className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs font-semibold tracking-widest uppercase hover:bg-[var(--color-green)] hover:text-white transition-all duration-300 group cursor-pointer"
 aria-label={`View detailed activities for Day ${day.day}`}
 >
 <span>VIEW MORE</span>
 <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
 </button>
 </div>

 {/* ── Fanned Images ── */}
 <div
 ref={(el) => {
 imagesRef.current[index] = el;
 }}
 className={`ml-12 lg:ml-0 lg:w-[calc(50%-3rem)] ${
 isEven
 ? "lg:pl-12 lg:ml-auto"
 : "lg:pr-12 lg:mr-auto"
 }`}
 style={prefersReducedMotion ? undefined : { opacity: 0 }}
 >
 <FannedCards images={day.images || []} isEven={isEven} />
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* ── Interactive Activity Modal Popup ── */}
 <DayActivityModal
 day={selectedDay}
 isOpen={Boolean(selectedDay)}
 onClose={() => setSelectedDay(null)}
 />
 </section>
 );
}
