"use client";

import { useState, useEffect, useCallback } from "react";
import {
 motion,
 useMotionValue,
 useTransform,
 animate,
 useReducedMotion,
 type Transition,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════
 OSHĪ, Cinematic Preloader
 Full-screen brand reveal with clip-path animations,
 progress bar, and percentage counter.
 ═══════════════════════════════════════════════════════════ */

interface PreloaderProps {
 /** Called once the exit animation has fully completed. */
 onComplete: () => void;
}

/** Minimum time (ms) the preloader stays visible regardless of load speed. */
const MINIMUM_DISPLAY_MS = 2200;

/** Expo-out easing used across the design system. */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared transition preset for slow, confident motion. */
const slowTransition: Transition = {
 duration: 1.4,
 ease: EXPO_OUT,
};

type Phase = "loading" | "exiting" | "done";

export default function Preloader({ onComplete }: PreloaderProps) {
 const prefersReducedMotion = useReducedMotion();
 const [phase, setPhase] = useState<Phase>("loading");

 /* ── Progress (0 → 100) ── */
 const progress = useMotionValue(0);
 const progressPercent = useTransform(progress, (v) => Math.round(v));
 const progressScaleX = useTransform(progress, [0, 100], [0, 1]);

 /* ── Displayed percentage string ── */
 const [displayPercent, setDisplayPercent] = useState(0);

 useEffect(() => {
 const unsubscribe = progressPercent.on("change", (latest) => {
 setDisplayPercent(latest);
 });
 return unsubscribe;
 }, [progressPercent]);

 /* ── Drive progress animation ── */
 useEffect(() => {
 const controls = animate(progress, 100, {
 duration: prefersReducedMotion ? 0.3 : MINIMUM_DISPLAY_MS / 1000,
 ease: EXPO_OUT,
 });

 return () => controls.stop();
 }, [progress, prefersReducedMotion]);

 /* ── Transition to exiting phase once progress completes ── */
 const beginExit = useCallback(() => {
 if (phase !== "loading") return;
 setPhase("exiting");
 }, [phase]);

 useEffect(() => {
 const unsubscribe = progress.on("change", (v) => {
 if (v >= 100) beginExit();
 });
 return unsubscribe;
 }, [progress, beginExit]);

 /* ── When exit animation finishes, mark done and notify parent ── */
 const handleExitComplete = useCallback(() => {
 setPhase("done");
 onComplete();
 }, [onComplete]);

 /* ── Remove from DOM once done ── */
 if (phase === "done") return null;

 /* ═══════════════════════════════════════════════════════════
 Reduced-motion path: static brand + quick opacity fade
 ═══════════════════════════════════════════════════════════ */
 if (prefersReducedMotion) {
 return (
 <motion.div
 className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[var(--color-beige)]"
 initial={{ opacity: 1 }}
 animate={phase === "exiting" ? { opacity: 0 } : { opacity: 1 }}
 transition={{ duration: 0.4, ease: "easeOut" }}
 onAnimationComplete={() => {
 if (phase === "exiting") handleExitComplete();
 }}
 >
 {/* Wordmark */}
 <span
 className="font-[var(--font-grandslang)] text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-[-0.02em] text-[var(--color-green)]"
 style={{ fontFamily: "var(--font-grandslang)" }}
 >
 OSHĪ
 </span>

 {/* Progress bar */}
 <div className="mt-6 h-[1px] w-[min(60vw,320px)] bg-[var(--color-green-8)]">
 <motion.div
 className="h-full origin-left bg-[var(--color-green)]"
 style={{ scaleX: progressScaleX }}
 />
 </div>

 {/* Percentage */}
 <span
 className="mt-3 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-green-70)]"
 style={{ fontFamily: "var(--font-ogg)" }}
 >
 {displayPercent}%
 </span>
 </motion.div>
 );
 }

 /* ═══════════════════════════════════════════════════════════
 Full cinematic path
 ═══════════════════════════════════════════════════════════ */

 /** Clip-path values for the panel exit (beige slides UP to reveal hero). */
 const panelClipPath =
 phase === "exiting" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)";

 return (
 <motion.div
 className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[var(--color-beige)]"
 initial={{ clipPath: "inset(0 0 0 0)" }}
 animate={{ clipPath: panelClipPath }}
 transition={{
 duration: phase === "exiting" ? 1.0 : 0,
 ease: EXPO_OUT,
 delay: phase === "exiting" ? 0.25 : 0,
 }}
 onAnimationComplete={() => {
 if (phase === "exiting") handleExitComplete();
 }}
 >
 {/* ── Wordmark: clip-path mask reveal (bottom → top) ── */}
 <motion.span
 className="text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-[-0.02em] text-[var(--color-green)]"
 style={{ fontFamily: "var(--font-grandslang)" }}
 initial={{ clipPath: "inset(100% 0 0 0)" }}
 animate={
 phase === "loading"
 ? { clipPath: "inset(0 0 0 0)" }
 : { clipPath: "inset(0 0 0 0)" }
 }
 transition={{
 clipPath: {
 duration: 1.2,
 ease: EXPO_OUT,
 delay: 0.15,
 },
 }}
 >
 {/* Breathing opacity pulse wrapper */}
 <motion.span
 className="inline-block"
 animate={
 phase === "loading"
 ? { opacity: [0.7, 1, 0.7] }
 : { opacity: 1 }
 }
 transition={
 phase === "loading"
 ? {
 opacity: {
 duration: 2.4,
 ease: "easeInOut",
 repeat: Infinity,
 repeatType: "loop",
 },
 }
 : { opacity: { duration: 0.3 } }
 }
 >
 OSHĪ
 </motion.span>
 </motion.span>

 {/* ── Progress bar ── */}
 <div className="mt-6 h-[1px] w-[min(60vw,320px)] overflow-hidden bg-[var(--color-green-8)]">
 <motion.div
 className="h-full w-full origin-left bg-[var(--color-green)]"
 style={{ scaleX: progressScaleX }}
 transition={slowTransition}
 />
 </div>

 {/* ── Percentage counter ── */}
 <motion.span
 className="mt-3 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-green-70)]"
 style={{ fontFamily: "var(--font-ogg)" }}
 initial={{ opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.8,
 ease: EXPO_OUT,
 delay: 0.5,
 }}
 >
 {displayPercent}%
 </motion.span>
 </motion.div>
 );
}
