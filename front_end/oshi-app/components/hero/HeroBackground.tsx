"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   HeroBackground — Pinned Canvas Frame Scrubber
   ───────────────────────────────────────────────────────────
   Renders 192 extracted WebP frames (`/media/frames/frame_0001.webp` -> `frame_0192.webp`)
   onto an HTML5 `<canvas>` element driven directly by scroll progress.
   All green overlays and green tinting are completely removed so the natural
   forest colors and lighting remain untouched.
   ═══════════════════════════════════════════════════════════ */

interface HeroBackgroundProps {
  progress: MotionValue<number>;
}

const TOTAL_FRAMES = 192;

export default function HeroBackground({ progress }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  /* ── Preload frame images on mount ─────────────────────── */
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = (i + 1).toString().padStart(4, "0");
      img.src = `/media/frames/frame_${frameNum}.webp`;

      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;

        // Draw initial frame as soon as frame 0 is ready
        if (i === 0 && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.naturalWidth || 800;
            canvas.height = img.naturalHeight || 450;
            
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
    }
  }, []);

  /* ── Helper to draw a frame cleanly to the canvas ──────── */
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      if (canvas.width !== img.naturalWidth && img.naturalWidth > 0) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      
      // Enable high-quality image smoothing for better upscaling/downscaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  /* ── Scrub canvas on scroll progress change ───────────── */
  useMotionValueEvent(progress, "change", (latest) => {
    if (prefersReducedMotion) {
      renderFrame(0);
      return;
    }
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1)))
    );
    renderFrame(frameIndex);
  });

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[var(--color-shadow)]"
      aria-hidden="true"
    >
      {/* ── Canvas Layer (Scroll-Scrubbed Forest Footage) ───── */}
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── Subtle Neutral Text Legibility Gradient (No Green) ── */}
      {/* Pure neutral dark shadow only at top & bottom edges to ensure white typography remains crisp against bright sky patches. Natural forest colors remain 100% untouched. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 22%,
            transparent 72%,
            rgba(0, 0, 0, 0.40) 100%
          )`,
        }}
      />

      {/* ── Film Grain (Neutral CSS texture) ───────────────── */}
      <div className="film-grain pointer-events-none absolute inset-0 opacity-40" />
    </div>
  );
}
