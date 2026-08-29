"use client";

import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   ScrollCue — "Scroll to Explore" indicator
   Visible at 0% scroll, fades out by ~8–10%.
   Minimalist mouse outline with animated dot.
   ═══════════════════════════════════════════════════════════ */

interface ScrollCueProps {
  progress: MotionValue<number>;
  isVisible: boolean;
}

export default function ScrollCue({ progress, isVisible }: ScrollCueProps) {
  const prefersReducedMotion = useReducedMotion();
  const opacity = useTransform(progress, [0, 0.06, 0.1], [1, 0.5, 0]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Mouse outline */}
      <div className="relative w-6 h-10 border border-[var(--color-white-60)] rounded-full flex items-start justify-center pt-2">
        {/* Animated scroll dot */}
        <motion.div
          className="w-1 h-1 rounded-full bg-[var(--color-white)]"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                  opacity: [1, 0.3, 1],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.45, 0, 0.15, 1],
          }}
        />
      </div>

      {/* Label */}
      <span className="eyebrow text-[var(--color-white-60)] text-[0.6rem] tracking-[0.3em]">
        SCROLL TO EXPLORE
      </span>
    </motion.div>
  );
}
