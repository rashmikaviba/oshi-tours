'use client';

import { motion, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   StoryBeat — Scrollytelling text overlay
   Fades in/out with scroll progress, with y-shift + blur.
   Positioned absolutely within a sticky hero viewport.
   ═══════════════════════════════════════════════════════════ */

interface StoryBeatProps {
  /** Uppercase label rendered above the headline */
  eyebrow: string;
  /** Large display heading — italic GrandSlang */
  headline: string;
  /** Supporting body copy below the headline */
  sub: string;
  /** Determines flex alignment within the sticky viewport */
  alignment: 'center' | 'lower-left' | 'upper-right';
  /** Normalised scroll range [start, end] within 0–1 */
  scrollRange: [number, number];
  /** Smoothed scroll progress MotionValue (0–1) */
  progress: MotionValue<number>;
  /** When true (default), beat fades out at end of range */
  fadeOut?: boolean;
}

/* ── Alignment presets ── */
const ALIGNMENT_CLASSES: Record<StoryBeatProps['alignment'], string> = {
  center:
    'items-center justify-center text-center',
  'lower-left':
    'items-start justify-end pb-20 pl-8 sm:pb-28 sm:pl-12 lg:pb-36 lg:pl-20 text-left',
  'upper-right':
    'items-end justify-start pt-20 pr-8 sm:pt-28 sm:pr-12 lg:pt-36 lg:pr-20 text-right',
};

export default function StoryBeat({
  eyebrow,
  headline,
  sub,
  alignment,
  scrollRange,
  progress,
  fadeOut = true,
}: StoryBeatProps) {
  const prefersReducedMotion = useReducedMotion();

  const [start, end] = scrollRange;

  /* ── Derived transform values ── */

  // Opacity — fade in over first 8% of range, fade out over last 8%
  const opacity = useTransform(
    progress,
    fadeOut
      ? [start, start + 0.08, end - 0.08, end]
      : [start, start + 0.08],
    fadeOut
      ? [0, 1, 1, 0]
      : [0, 1],
  );

  // Y translate — enter from +28px → 0, exit 0 → -28px
  const y = useTransform(
    progress,
    fadeOut
      ? [start, start + 0.08, end - 0.08, end]
      : [start, start + 0.08],
    fadeOut
      ? [28, 0, 0, -28]
      : [28, 0],
  );

  // Blur — sharp entry blur dissolve
  const blurAmount = useTransform(
    progress,
    [start, start + 0.08],
    [8, 0],
  );

  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  /* ── Reduced-motion safe styles ── */
  const motionStyle = prefersReducedMotion
    ? { opacity }
    : { opacity, y, filter };

  return (
    <motion.div
      className={`absolute inset-0 z-10 flex pointer-events-none px-6 ${ALIGNMENT_CLASSES[alignment]}`}
      style={motionStyle}
      aria-hidden="false"
    >
      <div className={`max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
        {/* Eyebrow */}
        <p className="eyebrow mb-4 text-[var(--color-beige)]">
          {eyebrow}
        </p>

        {/* Headline */}
        <h2 className="display-heading !text-[clamp(1.8rem,1.2rem+3vw,4.5rem)] mb-5 text-[var(--color-white)]">
          {headline}
        </h2>

        {/* Sub-copy */}
        <p className={`body-serif text-[var(--color-white-80)] max-w-md ${alignment === 'center' ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      </div>
    </motion.div>
  );
}
