"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type VideoRevealAnchor } from "@/data/videoRevealAnchors";

/* ═══════════════════════════════════════════════════════════
   OSHĪ — Leopard Wildlife Anchored Content & Stacked Fallback
   ───────────────────────────────────────────────────────────
   Choreographs percentage-positioned copy anchors (`top%`, `left%`)
   over the frozen leopard frame on desktop (≥768px/1024px) and seamlessly
   falls back to a poised editorial card stack on mobile (<768px).
   
   Per design guidelines: the media rests on a soft beige/sage negative space,
   so all three content zones use `--green` text directly with only a
   whisper-soft radial lightening to guarantee AA+ contrast.
   ═══════════════════════════════════════════════════════════ */

interface AnchoredContentProps {
  anchors: VideoRevealAnchor[];
  isRevealed: boolean;
  onCtaClick?: () => void;
  mode?: "overlay" | "stacked" | "auto";
}

export default function AnchoredContent({
  anchors,
  isRevealed,
  onCtaClick,
  mode = "auto",
}: AnchoredContentProps) {
  /* ── Helper to render the specific anchor type cleanly ── */
  const renderAnchorNode = (anchor: VideoRevealAnchor, isMobile = false) => {
    switch (anchor.type) {
      case "headline":
        return (
          <div className="relative min-w-0">
            {!isMobile && (
              <span className="absolute top-1.5 -left-8 w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse shadow-[0_0_8px_rgba(59,89,55,0.6)]" aria-hidden="true" />
            )}
            {anchor.eyebrow && (
              <p
                className={`eyebrow font-semibold tracking-[0.28em] text-[var(--color-green)] ${
                  isMobile
                    ? "text-[clamp(0.68rem,1.8vw,0.8rem)] mb-2 sm:mb-2.5 opacity-85"
                    : "text-[clamp(0.72rem,0.9vw,0.85rem)] mb-2 opacity-95 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                }`}
              >
                {anchor.eyebrow}
              </p>
            )}
            <h3
              className={`font-[family-name:var(--font-grandslang)] leading-[1.04] whitespace-pre-line text-[var(--color-green)] ${
                isMobile
                  ? "text-[clamp(2rem,6.5vw,3.25rem)] mb-4 sm:mb-5"
                  : "text-[clamp(2.25rem,3.2vw,3.6rem)] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] max-w-[340px] xl:max-w-[440px]"
              }`}
            >
              {anchor.text}
            </h3>
          </div>
        );

      case "subcopy":
        return (
          <div className="relative min-w-0">
            {!isMobile && (
              <span className="absolute top-2 -left-8 w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse shadow-[0_0_8px_rgba(59,89,55,0.6)]" aria-hidden="true" />
            )}
            <p
              className={`font-[family-name:var(--font-ogg)] font-light leading-relaxed text-[var(--color-green)] ${
                isMobile
                  ? "text-[clamp(0.95rem,2.2vw,1.2rem)] mb-7 sm:mb-8 opacity-90 max-w-xl"
                  : "text-[clamp(0.92rem,1.25vw,1.15rem)] opacity-95 drop-shadow-[0_1px_6px_rgba(255,255,255,0.8)] max-w-[300px] xl:max-w-[400px]"
              }`}
            >
              {anchor.text}
            </p>
          </div>
        );

      case "cta":
        const ctaProps = {
          onClick: onCtaClick,
          className: `inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:py-4 min-h-[44px] sm:min-h-[48px] rounded-full font-[family-name:var(--font-ogg)] text-xs sm:text-sm tracking-widest uppercase font-medium transition-all duration-300 ease-[var(--ease-expo-out)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)] select-none pointer-events-auto bg-[var(--color-green)] text-[var(--color-white)] hover:bg-[rgb(40_62_36)] shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 ${
            isMobile ? "w-full sm:w-auto" : ""
          }`,
        };

        const ctaNode = anchor.href ? (
          <Link href={anchor.href} {...ctaProps} aria-label={anchor.text}>
            <span>{anchor.text}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <button type="button" {...ctaProps} aria-label={anchor.text}>
            <span>{anchor.text}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        );

        return (
          <div
            className={`flex min-w-0 ${
              isMobile
                ? "flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-1"
                : "flex-col items-start gap-2"
            }`}
          >
            {ctaNode}
            {anchor.subtext && (
              <p
                className={`font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] tracking-wide min-w-0 ${
                  isMobile ? "pt-1 sm:pt-0 sm:pl-2 truncate" : "pl-2"
                }`}
              >
                {anchor.subtext}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const showOverlay = mode === "overlay" || mode === "auto";
  const showStacked = mode === "stacked" || mode === "auto";

  return (
    <>
      {/* ── DESKTOP ANCHORED OVERLAY (≥ 1024px / lg breakpoint) ─────────────────────── */}
      {showOverlay && (
        <div
          className={`${
            mode === "overlay" ? "hidden lg:block" : "hidden lg:block"
          } absolute inset-0 z-20 pointer-events-none select-none overflow-hidden`}
          aria-hidden={!isRevealed}
        >
          {anchors.map((anchor) => (
            <motion.div
              key={anchor.id}
              initial={{
                opacity: 0,
                x: anchor.enterFrom.x,
                y: anchor.enterFrom.y,
                filter: "blur(6px)",
              }}
              animate={
                isRevealed
                  ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                  : {
                      opacity: 0,
                      x: anchor.enterFrom.x,
                      y: anchor.enterFrom.y,
                      filter: "blur(6px)",
                    }
              }
              transition={{
                duration: 0.95,
                delay: anchor.staggerIndex * 0.14,
                ease: [0.16, 1, 0.3, 1], // --ease-expo-out
              }}
              style={{
                position: "absolute",
                top: `${anchor.topPct}%`,
                ...(anchor.align === "right"
                  ? { right: `${100 - anchor.leftPct}%` }
                  : { left: `${anchor.leftPct}%` }),
              }}
              className="pointer-events-auto"
            >
              {renderAnchorNode(anchor, false)}
            </motion.div>
          ))}
        </div>
      )}

      {/* ── MOBILE & TABLET STACKED FALLBACK (< 1024px / lg breakpoint) ───────────────── */}
      {/* Renders in normal document flow below the leopard frame on < 1024px (mobile 360/414 & tablet 768) so text NEVER overlaps the leopard or each other */}
      {showStacked && (
        <div
          className={`${
            mode === "stacked" ? "block lg:hidden" : "block lg:hidden"
          } relative z-20 bg-transparent text-[var(--color-green)] px-6 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto flex flex-col justify-between"
          >
            {/* Stacked in exact reading order: headline -> subcopy -> CTA */}
            {anchors
              .filter((a) => a.type === "headline")
              .map((anchor) => (
                <div key={`mobile-${anchor.id}`}>{renderAnchorNode(anchor, true)}</div>
              ))}

            {anchors
              .filter((a) => a.type === "subcopy")
              .map((anchor) => (
                <div key={`mobile-${anchor.id}`}>{renderAnchorNode(anchor, true)}</div>
              ))}

            {anchors
              .filter((a) => a.type === "cta")
              .map((anchor) => (
                <div key={`mobile-${anchor.id}`}>{renderAnchorNode(anchor, true)}</div>
              ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
