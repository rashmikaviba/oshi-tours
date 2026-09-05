"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import InfoCard from "./InfoCard";
import PhotoFan from "./PhotoFan";
import StatItem from "./StatItem";

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
 const sectionRef = useRef<HTMLElement>(null);
 const introRef = useRef<HTMLDivElement>(null);
 const featureRowRef = useRef<HTMLDivElement>(null);
 const statsRef = useRef<HTMLDivElement>(null);
 const prefersReducedMotion = useReducedMotion();

 useEffect(() => {
 if (prefersReducedMotion || !sectionRef.current) return;

 const ctx = gsap.context(() => {
 // 1. Intro statement fade up
 if (introRef.current) {
 gsap.fromTo(
 introRef.current.children,
 { opacity: 0, y: 36 },
 {
 opacity: 1,
 y: 0,
 duration: 1.1,
 stagger: 0.15,
 ease: "power4.out",
 scrollTrigger: {
 trigger: introRef.current,
 start: "top 92%",
 once: true,
 invalidateOnRefresh: true,
 },
 }
 );
 }

 // 2. Feature row cards staggered entrance
 if (featureRowRef.current) {
 const cards = featureRowRef.current.querySelectorAll("[data-about-card]");
 gsap.fromTo(
 cards,
 { opacity: 0, y: 48, scale: 0.98 },
 {
 opacity: 1,
 y: 0,
 scale: 1,
 duration: 1.25,
 stagger: 0.14,
 ease: "expo.out",
 scrollTrigger: {
 trigger: featureRowRef.current,
 start: "top 92%",
 once: true,
 invalidateOnRefresh: true,
 },
 }
 );
 }

 // 3. Stats bar reveal
 if (statsRef.current) {
 const statItems = statsRef.current.querySelectorAll("[data-stat-item]");
 gsap.fromTo(
 statItems,
 { opacity: 0, y: 30 },
 {
 opacity: 1,
 y: 0,
 duration: 1.0,
 stagger: 0.12,
 ease: "power3.out",
 scrollTrigger: {
 trigger: statsRef.current,
 start: "top 92%",
 once: true,
 invalidateOnRefresh: true,
 },
 }
 );
 }
 });

 const safetyTimer = setTimeout(() => {
 if (introRef.current) {
 gsap.to(introRef.current.children, { opacity: 1, y: 0, duration: 0.5 });
 }
 if (featureRowRef.current) {
 const cards = featureRowRef.current.querySelectorAll("[data-about-card]");
 gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
 }
 if (statsRef.current) {
 const statItems = statsRef.current.querySelectorAll("[data-stat-item]");
 gsap.to(statItems, { opacity: 1, y: 0, duration: 0.5 });
 }
 }, 2800);

 return () => {
 clearTimeout(safetyTimer);
 ctx.revert();
 };
 }, [prefersReducedMotion]);

 return (
 <section
 ref={sectionRef}
 className="relative z-10 w-full bg-transparent px-6 sm:px-10 md:px-16 lg:px-20 pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
 aria-label="About OSHĪ and our luxury travel story"
 >
 {/* ── PART 1: INTRO STATEMENT (TOP) ── */}
 <div ref={introRef} className="max-w-4xl mb-16 sm:mb-20 lg:mb-28">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-green)]/25 bg-[var(--color-green)]/5 text-xs font-semibold tracking-[0.25em] uppercase text-[var(--color-green)] mb-6 sm:mb-8 shadow-sm">
 <span>About OSHĪ</span>
 </div>
 <h2 className="font-[family-name:var(--font-grandslang)] text-[clamp(1.85rem,4vw,3.5rem)] leading-[1.08] text-[var(--color-green)] font-normal tracking-tight">
 Since 2016, we&apos;ve guided a select few through Sri Lanka&apos;s rarest landscapes, from misted tea country to the wild southern coast.
 </h2>
 </div>

 {/* ── PART 2: FEATURE ROW (MIDDLE), 3 Columns on Desktop, 2 on Tablet, 1 on Mobile ── */}
 <div
 ref={featureRowRef}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 xl:gap-20 items-stretch mb-16 sm:mb-20 lg:mb-28"
 >
 {/* Left, Info Card */}
 <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col">
 <InfoCard />
 </div>

 {/* Center, Large Feature Image Card (Visual Anchor) */}
 <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col">
 <div
 className="group relative w-full h-[360px] sm:h-[420px] md:h-full min-h-[380px] lg:min-h-[460px] rounded-[2rem] overflow-hidden shadow-xl border border-[var(--color-green)]/15 select-none"
 data-about-card="feature-image"
 >
 {/* Top-left pill label overlay */}
 <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-[var(--color-green)]/80 backdrop-blur-md text-[var(--color-white)] font-[family-name:var(--font-ogg)] text-sm tracking-wide border border-[var(--color-white)]/20 shadow-md">
 <span>Hill Country & Tea Trails</span>
 </div>

 {/* Subtle bottom gradient and descriptive caption */}
 <div className="absolute inset-0 bg-gradient-to-t from-[rgb(40,62,36)]/85 via-transparent to-transparent z-10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

 <div className="absolute bottom-0 inset-x-0 z-20 p-6 sm:p-8 flex items-end">
 <p className="text-[var(--color-white)] font-[family-name:var(--font-ogg)] text-base sm:text-lg font-light leading-snug drop-shadow-sm">
 Journey by private vintage rail through Ceylon&apos;s emerald highlands, staying in exclusive colonial bungalows above the clouds.
 </p>
 </div>

 {/* Background Image with Ken Burns / Parallax effect on hover */}
 <Image
 src="/media/big_card_1.jpg"
 alt="Sri Lanka tea country highlands and railway"
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
 className="object-cover object-center transition-transform duration-1000 ease-[var(--ease-expo-out)] group-hover:scale-108"
 />
 </div>
 </div>

 {/* Right, Fanned Photo Cluster */}
 <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col">
 <PhotoFan />
 </div>
 </div>

 {/* ── PART 3: STATS BAR (BOTTOM), 4 Stats with Count-Up ── */}
 <div
 ref={statsRef}
 className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 pt-12 sm:pt-16 lg:pt-20 border-t border-[var(--color-green)]/20"
 >
 <StatItem
 value={8}
 suffix="+"
 label="years of experience"
 durationMs={1800}
 />
 <StatItem
 value={900}
 suffix="+"
 label="happy travelers"
 durationMs={2200}
 />
 <StatItem
 value={40}
 suffix="+"
 label="curated routes"
 durationMs={2000}
 />
 <StatItem
 value={4.9}
 decimals={1}
 label="average rating"
 durationMs={1600}
 />
 </div>
 </section>
 );
}
