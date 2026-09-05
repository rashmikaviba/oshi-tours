"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
 anchors as LEOPARD_ANCHORS,
 VIDEO_REVEAL_CONFIG,
} from "@/data/videoRevealAnchors";
import AnchoredContent from "./AnchoredContent";

/* ═══════════════════════════════════════════════════════════
 OSHĪ, Cinematic Play-Once Leopard Video Reveal Section
 ───────────────────────────────────────────────────────────
 Implements the one-shot playback state machine (`idle` → `playing` →
 `frozen` → `content-revealed`) triggered by IntersectionObserver.
 
 Once triggered (~45% viewport entry), `Tiger.gif` restarts via timestamp
 cache-busting (`?t=...`) and plays exactly once (`8000ms`). It then
 crossfades to the pixel-for-pixel static leopard still (`leopard-last-frame.jpg`)
 and staggers in the percentage-based copy blocks (`Zones 1, 2, 3`).
 ═══════════════════════════════════════════════════════════ */

type RevealState = "idle" | "playing" | "frozen" | "content-revealed";

interface VideoRevealSectionProps {
 /** Optional drop-in override for first frame poster path */
 startImageUrl?: string;
 /** Optional drop-in override for GIF path */
 gifUrl?: string;
 /** Optional drop-in override for static final still path */
 freezeImageUrl?: string;
 /**
 * Optional upgrade drop-in swap: if an `.mp4/.webm` is supplied instead of GIF,
 * set `mediaType="video"` and provide `videoUrl`. The component will natively call
 * `video.play()` once on entry and rest cleanly on its final frame when `onEnded` fires.
 */
 mediaType?: "gif" | "video";
 videoUrl?: string;
 /** Hard-coded measured GIF duration in milliseconds */
 durationMs?: number;
}

export default function VideoRevealSection({
 startImageUrl = VIDEO_REVEAL_CONFIG.startImagePath || "/media/leopard-first-frame.jpg",
 gifUrl = VIDEO_REVEAL_CONFIG.gifPath,
 freezeImageUrl = VIDEO_REVEAL_CONFIG.freezeImagePath,
 mediaType = "gif",
 videoUrl = "",
 durationMs = VIDEO_REVEAL_CONFIG.durationMs,
}: VideoRevealSectionProps) {
 const sectionRef = useRef<HTMLElement>(null);
 const videoRef = useRef<HTMLVideoElement>(null);
 const hasPlayedRef = useRef(false);
 const timerRef = useRef<NodeJS.Timeout | null>(null);

 const prefersReducedMotion = useReducedMotion();
 const [state, setState] = useState<RevealState>("idle");
 const [activeGifSrc, setActiveGifSrc] = useState<string>("");
 const [imgError, setImgError] = useState(false);
 const [freezeImgError, setFreezeImgError] = useState(false);

 /* ── 1. IntersectionObserver One-Shot Trigger ──────────────────────── */
 useEffect(() => {
 // If reduced motion is requested, immediately jump to final state
 if (prefersReducedMotion) {
 hasPlayedRef.current = true;
 setState("content-revealed");
 return;
 }

 const element = sectionRef.current;
 if (!element) return;

 const observer = new IntersectionObserver(
 (entries) => {
 const [entry] = entries;
 // Trigger once when section reaches ~45% visibility inside viewport
 if (entry.isIntersecting && !hasPlayedRef.current) {
 hasPlayedRef.current = true;

 if (mediaType === "video" && videoRef.current) {
 setState("playing");
 videoRef.current.play().catch(() => {
 // If autoplay policy blocks, jump smoothly to freeze still
 setState("content-revealed");
 });
 } else {
 // Restart GIF from frame 0 using cache-busting query parameter
 const timestamp = Date.now();
 setActiveGifSrc(`${gifUrl}?t=${timestamp}`);
 setState("playing");

 // Schedule crossfade to static still frame exactly at measured durationMs
 timerRef.current = setTimeout(() => {
 setState("frozen");
 // Allow crossfade (700ms) to begin settling, then choreograph content anchors
 setTimeout(() => {
 setState("content-revealed");
 }, 250);
 }, durationMs);
 }
 }
 },
 {
 threshold: 0.45,
 rootMargin: "0px 0px -5% 0px",
 }
 );

 observer.observe(element);

 /* ── Cleanup observers and timers on unmount (60fps guaranteed) ── */
 return () => {
 observer.disconnect();
 if (timerRef.current) {
 clearTimeout(timerRef.current);
 }
 };
 }, [prefersReducedMotion, mediaType, gifUrl, durationMs]);

 /* ── 2. Error Fallback Handlers ───────────────────────────────────── */
 const handleGifError = () => {
 if (!imgError && gifUrl !== VIDEO_REVEAL_CONFIG.fallbackGifPath) {
 setImgError(true);
 const timestamp = Date.now();
 setActiveGifSrc(`${VIDEO_REVEAL_CONFIG.fallbackGifPath}?t=${timestamp}`);
 } else {
 // If GIF fails completely, resolve safely to the static still
 setState("content-revealed");
 }
 };

 const handleFreezeError = () => {
 if (!freezeImgError && freezeImageUrl !== VIDEO_REVEAL_CONFIG.fallbackFreezeImagePath) {
 setFreezeImgError(true);
 }
 };

 const resolvedFreezeSrc = freezeImgError
 ? VIDEO_REVEAL_CONFIG.fallbackFreezeImagePath
 : freezeImageUrl;

 const resolvedStartSrc = startImageUrl || VIDEO_REVEAL_CONFIG.startImagePath || "/media/leopard-first-frame.jpg";

 const isRevealed = state === "frozen" || state === "content-revealed" || prefersReducedMotion === true;

 return (
 <section
 ref={sectionRef}
 id="cinematic-wildlife-reveal"
 className="relative z-20 w-full max-w-none bg-transparent select-none overflow-hidden"
 aria-label="Cinematic wildlife encounter: the leopard's island"
 >
 {/* ── FULL SCREEN MEDIA CONTAINER (100vw edge-to-edge, no max-width, no side padding, uncropped object-contain) ── */}
 <div className="relative w-full max-w-none aspect-[16/9] flex items-center justify-center bg-transparent overflow-hidden">
 {/* ── TOP & BOTTOM EDGE GRADIENT FADES ── */}
 {/* Mobile top edge overlay: soft, short (32px), subtle fade so the leopard image stays visible */}
 <div
 className="block md:hidden absolute top-0 left-0 right-0 pointer-events-none z-10 h-8"
 style={{
 background: "linear-gradient(to bottom, rgba(211,214,187,0.65) 0%, rgba(211,214,187,0.2) 60%, rgba(211,214,187,0) 100%)",
 }}
 />
 {/* Desktop top edge overlay: exact original deep gradient blend */}
 <div
 className="hidden md:block absolute top-0 left-0 right-0 pointer-events-none z-10"
 style={{
 height: "clamp(60px, 15vh, 240px)",
 background: "linear-gradient(to bottom, #D3D6BB 0%, #D3D6BB 15%, rgba(211,214,187,0.92) 35%, rgba(211,214,187,0.65) 65%, rgba(211,214,187,0) 100%)",
 }}
 />
 <div
 className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
 style={{
 height: "clamp(40px, 8vh, 120px)",
 background: "linear-gradient(to top, #D3D6BB 0%, rgba(211,214,187,0.75) 35%, rgba(211,214,187,0) 100%)",
 }}
 />

 {/* Plain media layers directly inside container, no masks, no overlays, no container box */}
 <div className="absolute inset-0 w-full h-full">
 {/* Layer A0, Static First Frame Poster Image (Idle state before viewport entry / underneath active GIF) */}
 <div
 className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
 isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
 }`}
 >
 <Image
 src={resolvedStartSrc}
 alt="Sri Lankan leopard resting gracefully on mossy branch starting frame"
 fill
 sizes="100vw"
 priority
 className="object-contain object-center"
 unoptimized={true}
 />
 </div>

 {/* Layer A, Static Final Frame Still Image (Freeze state after video finishes playing) */}
 <div
 className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
 isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
 }`}
 >
 <Image
 src={resolvedFreezeSrc}
 alt="Sri Lankan leopard resting gracefully on mossy branch final frame"
 fill
 sizes="100vw"
 priority
 className="object-contain object-center"
 onError={handleFreezeError}
 unoptimized={true}
 />
 </div>

 {/* Layer B, Active Play-Once GIF or Video Overlay (Uncropped object-contain) */}
 {mediaType === "video" && videoUrl ? (
 <video
 ref={videoRef}
 src={videoUrl}
 playsInline
 muted
 className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${
 state === "playing" ? "opacity-100" : "opacity-0 pointer-events-none"
 }`}
 onEnded={() => {
 setState("frozen");
 setTimeout(() => setState("content-revealed"), 200);
 }}
 />
 ) : (
 /* GIF Play-Once Layer: crossfades gracefully to Layer A */
 activeGifSrc && state === "playing" && (
 <div
 className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-[var(--ease-expo-out)] ${
 state === "playing" ? "opacity-100" : "opacity-0 pointer-events-none"
 }`}
 >
 <Image
 src={activeGifSrc}
 alt="Sri Lanka wildlife footage of rare leopard"
 fill
 sizes="100vw"
 className="object-contain object-center"
 onError={handleGifError}
 unoptimized={true}
 />
 </div>
 )
 )}
 </div>

 {/* Layer D, Desktop Anchored Content Overlays (Rendered over media frame only on ≥ 1024px / lg breakpoint) */}
 <AnchoredContent
 anchors={LEOPARD_ANCHORS}
 isRevealed={isRevealed}
 mode="overlay"
 />
 </div>

 {/* Layer E, Stacked Mobile & Tablet Fallback Container (< 1024px / lg breakpoint rendered directly below leopard frame) */}
 <div className="lg:hidden w-full bg-transparent">
 <AnchoredContent
 anchors={LEOPARD_ANCHORS}
 isRevealed={isRevealed}
 mode="stacked"
 />
 </div>
 </section>
 );
}
