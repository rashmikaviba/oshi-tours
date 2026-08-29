"use client";

import { useState, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroScrollytelling from "@/components/hero/HeroScrollytelling";
import ScrollCue from "@/components/ScrollCue";
import InspirationSection from "@/components/inspiration/InspirationSection";
import VideoRevealSection from "@/components/video-reveal/VideoRevealSection";
import AboutSection from "@/components/about/AboutSection";
import TeamPolaroids from "@/components/team/TeamPolaroids";
import GoogleReviewsSection from "@/components/reviews/GoogleReviewsSection";
import Footer from "@/components/Footer";

/* ═══════════════════════════════════════════════════════════
   OSHĪ — Luxury Sri Lanka Travel
   Landing Page
   ═══════════════════════════════════════════════════════════ */

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Global scroll tracking for ScrollCue & Navbar ── */
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  /* ── Show nav once scroll reaches the final reveal zone ── */
  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    setTimeout(() => setShowNav(true), 800);
  };

  return (
    <main>
      {/* ACT 1 — Cinematic Pre-loader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Navigation */}
      <Navbar isVisible={showNav} />

      {/* ACT 2 & 3 — Scrollytelling Hero */}
      <div ref={heroRef}>
        <HeroScrollytelling isLoaded={isLoaded} />
      </div>

      {/* Scroll Cue */}
      <ScrollCue progress={smoothScrollProgress} isVisible={isLoaded} />

      {/* ── CONTINUOUS BEIGE PAGE BACKGROUND WRAPPER (Sections 2–6 share exactly #D3D6BB with zero seams) ── */}
      <div className="w-full bg-[var(--color-beige)] text-[var(--color-green)]">
        {/* ACT 4 — Section 2: Asymmetric Bento Showcase (Curated Journeys) */}
        <InspirationSection />

        {/* ACT 5 — Section 3: Cinematic Wildlife Play-Once Video Reveal & Anchored Choreography (Leopard) */}
        <VideoRevealSection />

        {/* ACT 6 — Section 4: About / Story + Stats */}
        <AboutSection />

        {/* ACT 7 — Section 5: Team / Scattered Polaroids */}
        <TeamPolaroids />

        {/* ACT 8 — Section 6: Guest Stories / Google Places Reviews */}
        <GoogleReviewsSection />

        {/* ACT 9 — Footer Section */}
        <Footer />
      </div>
    </main>
  );
}
