"use client";

import { useEffect, useRef, useState } from "react";
import { GooglePlaceReview } from "@/lib/googlePlaceReviews";
import GoogleReviewCard from "./GoogleReviewCard";

interface Props {
  reviews: GooglePlaceReview[];
}

export default function GoogleReviewsCarousel({ reviews }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleGroupRef = useRef<HTMLDivElement>(null);

  const [groupWidth, setGroupWidth] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Measure single group width cleanly via ResizeObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const updateWidth = () => {
      if (singleGroupRef.current) {
        setGroupWidth(singleGroupRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (singleGroupRef.current) {
      observer.observe(singleGroupRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [reviews]);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Calculate speed: ~25px per second
  const animationDurationSeconds = groupWidth > 0 ? groupWidth / 25 : 40;

  // Render reduced-motion fallback (manually scrollable horizontal list)
  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-x-auto py-4 px-6 sm:px-10 scrollbar-thin scrollbar-thumb-[var(--color-green)]/30 scrollbar-track-transparent">
        <div className="flex items-center gap-6 min-w-max">
          {reviews.map((review) => (
            <GoogleReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Left/Right Edge Fades for Seamless Blend */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[var(--color-beige)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[var(--color-beige)] to-transparent" />

      {/* Infinite Left-to-Right Carousel Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 w-max"
        style={{
          animationName: groupWidth > 0 ? "scrollLeftToRight" : "none",
          animationDuration: groupWidth > 0 ? `${animationDurationSeconds}s` : "0s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Set 1: Unique Real Reviews (Accessible to Screen Readers & Keyboard) */}
        <div ref={singleGroupRef} className="flex items-center gap-6 shrink-0">
          {reviews.map((review) => (
            <GoogleReviewCard key={`unique-${review.id}`} review={review} isDuplicate={false} />
          ))}
        </div>

        {/* Set 2: Visual Animation Duplicate Set 1 (Hidden from Screen Readers & Keyboard) */}
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {reviews.map((review, i) => (
            <GoogleReviewCard key={`dup1-${review.id}-${i}`} review={review} isDuplicate={true} />
          ))}
        </div>

        {/* Set 3: Visual Animation Duplicate Set 2 (Hidden from Screen Readers & Keyboard) */}
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {reviews.map((review, i) => (
            <GoogleReviewCard key={`dup2-${review.id}-${i}`} review={review} isDuplicate={true} />
          ))}
        </div>
      </div>

      {/* Keyframe animation injected for Left-to-Right translation */}
      <style jsx global>{`
        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-${groupWidth}px);
          }
          100% {
            transform: translateX(0px);
          }
        }
      `}</style>
    </div>
  );
}
