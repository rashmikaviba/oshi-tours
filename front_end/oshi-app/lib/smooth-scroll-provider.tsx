"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Context ── */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/* ── Provider ── */
interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenisInstance = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.08,
      smoothWheel: !prefersReducedMotion,
      syncTouch: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Sync Lenis → GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Sync native window events for mobile touch devices
    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Sync GSAP ticker → Lenis
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
