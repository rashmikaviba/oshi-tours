"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import ArrowCircleButton from "../ui/ArrowCircleButton";

if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

interface JourneyCardProps {
 id: string;
 title: string;
 description: string;
 eyebrow: string;
 duration: string;
 image: string;
 localFallback: string;
 href: string;
 variant: "feature" | "compact";
 index?: number;
}

export default function JourneyCard({
 id,
 title,
 description,
 eyebrow,
 duration,
 image,
 localFallback,
 href,
 variant,
}: JourneyCardProps) {
 const cardRef = useRef<HTMLAnchorElement>(null);
 const imageWrapperRef = useRef<HTMLDivElement>(null);
 const [imgSrc, setImgSrc] = useState(image);
 const [isHovered, setIsHovered] = useState(false);
 const prefersReducedMotion = useReducedMotion();

 /* ── Image Parallax via GSAP ScrollTrigger ── */
 useEffect(() => {
 if (prefersReducedMotion || !imageWrapperRef.current || !cardRef.current) return;

 const ctx = gsap.context(() => {
 gsap.fromTo(
 imageWrapperRef.current,
 { yPercent: -8 },
 {
 yPercent: 8,
 ease: "none",
 scrollTrigger: {
 trigger: cardRef.current,
 start: "top bottom",
 end: "bottom top",
 scrub: true,
 },
 }
 );
 }, cardRef);

 return () => ctx.revert();
 }, [prefersReducedMotion]);

 /* ── Fallback to local image if Unsplash fails ── */
 const handleImageError = () => {
 if (imgSrc !== localFallback) {
 setImgSrc(localFallback);
 }
 };

 /* ── FEATURE VARIANT (Large Left Card, Fluid & Content-Aware) ── */
 if (variant === "feature") {
 return (
 <Link
 ref={cardRef}
 href={href}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 className="group relative flex flex-col w-full h-full min-w-0 rounded-2xl sm:rounded-3xl bg-[rgb(20_32_18)] border border-[rgb(59_89_55_/_0.15)] shadow-2xl transition-all duration-500 ease-[var(--ease-expo-out)] hover:shadow-[0_24px_54px_rgb(20_32_18_/_0.3)] focus-visible:outline-2 focus-visible:outline-[var(--color-green)] focus-visible:outline-offset-4 select-none"
 aria-label={`Explore journey: ${title}, ${duration}`}
 >
 {/* Region 1, Media (Parallax inside rounded image boundary) */}
 <div className="relative w-full aspect-[6/5] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[280px] xl:min-h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[rgb(20_32_18)] shrink-0">
 <div
 ref={imageWrapperRef}
 className="absolute inset-[0%] -top-[10%] -bottom-[10%] w-full h-[120%] overflow-hidden transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:scale-105"
 >
 <Image
 src={imgSrc}
 alt={`${title}, Sri Lanka journey landscape`}
 fill
 sizes="(max-width: 1024px) 100vw, 50vw"
 className="object-cover transition-opacity duration-500"
 onError={handleImageError}
 unoptimized={true}
 priority
 />
 </div>

 {/* Gradient Scrim Overlay */}
 <div
 className="absolute inset-0 bg-gradient-to-t from-[rgb(20_32_18_/_0.96)] via-[rgb(20_32_18_/_0.42)] to-transparent opacity-95 transition-opacity duration-700 ease-[var(--ease-expo-out)] group-hover:opacity-100 pointer-events-none"
 aria-hidden="true"
 />

 {/* Top Floating Badge */}
 <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-7 lg:left-7 z-10">
 <span className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[rgb(20_32_18_/_0.75)] backdrop-blur-md border border-[var(--color-white-60)] text-[var(--color-white)] text-xs sm:text-sm font-[family-name:var(--font-ogg)] tracking-widest uppercase shadow-md">
 {duration}
 </span>
 </div>

 {/* Desktop editorial content overlaid over Region 1 when space permits, or cleanly structured */}
 <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-5 xl:p-6 flex flex-col justify-end z-10 min-w-0">
 <div className="flex items-end justify-between gap-4 sm:gap-5 min-w-0">
 <div className="min-w-0 flex-1">
 <p className="eyebrow text-[var(--color-beige)] mb-1 sm:mb-1 opacity-95 tracking-[0.28em] text-[0.68rem] sm:text-xs truncate min-w-0">
 {eyebrow}
 </p>
 <h3 className="font-[family-name:var(--font-grandslang)] text-[var(--color-white)] text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl leading-[1.06] mb-1 sm:mb-1.5 transform transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:-translate-y-1 line-clamp-2 min-w-0">
 {title}
 </h3>
 <p className="font-[family-name:var(--font-ogg)] font-light text-[var(--color-white-80)] text-xs sm:text-sm md:text-sm leading-relaxed line-clamp-2 min-w-0">
 {description}
 </p>
 </div>

 <ArrowCircleButton
 ariaLabel={`Open ${title} journey`}
 isParentHovered={isHovered}
 className="hidden sm:flex shrink-0 mb-1"
 size="default"
 />
 </div>

 {/* Mobile arrow affordance row */}
 <div className="flex sm:hidden items-center justify-between mt-3.5 pt-2.5 border-t border-[var(--color-white-60)] min-w-0 gap-3">
 <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-beige)] tracking-wider truncate min-w-0">
 Explore signature itinerary
 </span>
 <ArrowCircleButton
 ariaLabel={`Open ${title} journey`}
 isParentHovered={isHovered}
 size="compact"
 />
 </div>
 </div>
 </div>
 </Link>
 );
 }

 /* ── COMPACT VARIANT (Two-Region Flow: Region 1 Media + Region 2 Content, Fluid & Unclipped) ── */
 return (
 <Link
 ref={cardRef}
 href={href}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 className="group relative flex flex-col w-full h-full min-w-0 rounded-2xl sm:rounded-3xl bg-[var(--color-white)] border border-[rgb(59_89_55_/_0.15)] shadow-[0_12px_36px_rgb(20_32_18_/_0.06)] transition-all duration-500 ease-[var(--ease-expo-out)] hover:shadow-[0_20px_50px_rgb(20_32_18_/_0.16)] hover:border-[var(--color-green-40)] focus-visible:outline-2 focus-visible:outline-[var(--color-green)] focus-visible:outline-offset-4 select-none"
 aria-label={`Explore journey: ${title}, ${duration}`}
 >
 {/* Region 1, Media (Fluid & stretching when needed, taller aspect-ratio, scoped overflow-hidden) */}
 <div className="relative w-full flex-1 min-h-[140px] sm:min-h-[160px] lg:min-h-[150px] xl:min-h-[165px] aspect-[16/10] sm:aspect-[3/2] lg:aspect-[16/10] xl:aspect-[3/2] rounded-t-2xl sm:rounded-t-3xl overflow-hidden bg-[rgb(20_32_18)]">
 <div
 ref={imageWrapperRef}
 className="absolute inset-[0%] -top-[10%] -bottom-[10%] w-full h-[120%] overflow-hidden transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:scale-105"
 >
 <Image
 src={imgSrc}
 alt={`${title}, Sri Lanka journey landscape`}
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
 className="object-cover transition-opacity duration-500"
 onError={handleImageError}
 unoptimized={true}
 />
 </div>

 {/* Subtle top dark gradient for tag contrast */}
 <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[rgb(20_32_18_/_0.42)] pointer-events-none" />

 {/* Category / Duration Badge Top-Left */}
 <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
 <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[rgb(20_32_18_/_0.75)] backdrop-blur-md text-[var(--color-white)] text-[0.68rem] sm:text-xs font-[family-name:var(--font-ogg)] tracking-widest uppercase shadow-sm">
 {eyebrow}
 </span>
 </div>
 </div>

 {/* Region 2, Content (Normal flow, symmetric horizontal padding, snug & unclipped, shrink-0 so photo takes extra height) */}
 <div className="shrink-0 flex flex-col justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 lg:px-4 lg:py-3 xl:px-4.5 xl:py-3.5 bg-[var(--color-white)] text-[var(--color-green)] rounded-b-2xl sm:rounded-b-3xl min-w-0">
 <div className="min-w-0 mb-1.5 sm:mb-2">
 <h3 className="font-[family-name:var(--font-grandslang)] text-[var(--color-green)] text-base sm:text-lg lg:text-lg xl:text-xl leading-[1.08] mb-1 line-clamp-1 sm:line-clamp-2 transform transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:-translate-y-0.5 min-w-0">
 {title}
 </h3>
 
 {/* Meta Row (Unclipped, min-w-0 + symmetric padding stops left/right mobile clipping - Bug B fixed) */}
 <p className="font-[family-name:var(--font-ogg)] text-[0.68rem] sm:text-xs text-[var(--color-green-70)] truncate min-w-0 mb-1">
 <span className="font-medium text-[var(--color-green)]">{duration}</span> · {eyebrow}
 </p>

 {/* Description (Clean line-clamp-2 with ellipsis, never hard-cut - Bug A fixed) */}
 <p className="font-[family-name:var(--font-ogg)] font-light text-[var(--color-green-70)] text-[0.68rem] sm:text-xs xl:text-[0.8rem] leading-snug line-clamp-2 min-w-0">
 {description}
 </p>
 </div>

 {/* Footer Affordance Row pinned with mt-auto, unclipped button */}
 <div className="mt-auto pt-1.5 sm:pt-2 border-t border-[rgb(59_89_55_/_0.12)] flex items-center justify-between gap-2 sm:gap-2.5 shrink-0 min-w-0">
 <span className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green)] font-medium tracking-wide truncate min-w-0">
 Explore private route
 </span>
 <ArrowCircleButton
 ariaLabel={`Open ${title} journey`}
 isParentHovered={isHovered}
 size="compact"
 />
 </div>
 </div>
 </Link>
 );
}




