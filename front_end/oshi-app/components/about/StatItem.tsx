"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  durationMs?: number;
}

export default function StatItem({
  value,
  suffix = "",
  decimals = 0,
  label,
  durationMs = 2000,
}: StatItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState<string>("0" + suffix);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, immediately show final formatted number
    if (prefersReducedMotion) {
      setDisplayValue(value.toFixed(decimals) + suffix);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, prefersReducedMotion, value, decimals, suffix]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Smooth easing out (cubic ease-out: 1 - (1-t)^3)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeOutProgress * value;

      setDisplayValue(currentNumber.toFixed(decimals) + suffix);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value.toFixed(decimals) + suffix);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, prefersReducedMotion, value, decimals, suffix, durationMs]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center min-w-0"
      data-stat-item
    >
      <span className="font-[family-name:var(--font-grandslang)] text-[clamp(2.5rem,4.5vw,4.25rem)] leading-none text-[var(--color-green)] font-normal tracking-tight">
        {displayValue}
      </span>
      <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] tracking-wide pt-2 sm:pt-2.5 leading-snug">
        {label}
      </p>
    </div>
  );
}
