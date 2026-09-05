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

 Desktop (≥1024px): Overlay copy text fades in over the video after it finishes.
 Mobile (<1024px): Copy text below the video loads immediately while playing
 so users can seamlessly scroll down and view the rest of the page.
 ═══════════════════════════════════════════════════════════ */

type RevealState = "idle" | "playing" | "frozen" | "content-revealed";

interface VideoRevealSectionProps {
  /** Optional drop-in override for first frame poster path */
  startImageUrl?: string;
  /** Optional drop-in override for GIF path */
  gifUrl?: string;
  /** Optional drop-in override for static final still path */
  freezeImageUrl?: string;
  /** Optional upgrade for mp4 video format */
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
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;

          if (mediaType === "video" && videoRef.current) {
            setState("playing");
            videoRef.current.play().catch(() => {
              setState("content-revealed");
            });
          } else {
            const timestamp = Date.now();
            setActiveGifSrc(`${gifUrl}?t=${timestamp}`);
            setState("playing");

            timerRef.current = setTimeout(() => {
              setState("frozen");
              setTimeout(() => {
                setState("content-revealed");
              }, 250);
            }, durationMs);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "50px 0px",
      }
    );

    observer.observe(element);

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
      {/* ── FULL SCREEN MEDIA CONTAINER ── */}
      <div className="relative w-full max-w-none aspect-[16/9] flex items-center justify-center bg-transparent overflow-hidden">
        {/* ── TOP & BOTTOM EDGE GRADIENT FADES ── */}
        <div
          className="block md:hidden absolute top-0 left-0 right-0 pointer-events-none z-10 h-8"
          style={{
            background: "linear-gradient(to bottom, rgba(211,214,187,0.65) 0%, rgba(211,214,187,0.2) 60%, rgba(211,214,187,0) 100%)",
          }}
        />
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

        {/* Media Layers */}
        <div className="absolute inset-0 w-full h-full">
          {/* Layer A0: First Frame Poster */}
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

          {/* Layer A: Final Still Image */}
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

          {/* Layer B: Active GIF or Video */}
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

        {/* Layer D: Desktop Overlay (Unchanged behavior: waits until video finishes) */}
        <AnchoredContent
          anchors={LEOPARD_ANCHORS}
          isRevealed={isRevealed}
          mode="overlay"
        />
      </div>

      {/* Layer E: Mobile & Tablet Stacked Fallback (Loads immediately while video plays) */}
      <div className="lg:hidden w-full bg-transparent">
        <AnchoredContent
          anchors={LEOPARD_ANCHORS}
          isRevealed={isRevealed || state !== "idle"}
          mode="stacked"
        />
      </div>
    </section>
  );
}
