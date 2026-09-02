"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PolaroidCard from "./PolaroidCard";
import { team } from "@/data/team";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Scattered angles for the cards across all screen sizes
const CARD_ROTATIONS = [-5, 3, -2, 4, -4, 2];

export default function TeamPolaroids() {
  const sectionRef = useRef<HTMLElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Animate text in
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // 2. Animate cards scattering in
      if (clusterRef.current) {
        const cards = clusterRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: clusterRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-transparent px-0 lg:px-20 pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8 overflow-hidden"
      aria-label="Handcrafted Ceylon Experiences"
    >
      {/* ── Heading ── */}
      <div ref={textRef} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 px-6 sm:px-10">
        <h2 className="font-[family-name:var(--font-grandslang)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-[var(--color-green)] mb-6">
          Unforgettable Ceylon Moments
        </h2>
        <p className="body-serif text-[var(--color-green-70)] text-base sm:text-lg">
          Snapshots of private safaris, ancient citadels, and serene coastal escapes curated by our specialists.
        </p>
      </div>

      {/* ── Overlapping Polaroid Cluster (Mobile & Desktop) ── */}
      <div className="w-full relative">
        <div 
          ref={clusterRef}
          className="flex flex-row overflow-x-auto lg:overflow-visible items-center justify-start lg:justify-center gap-0 px-6 sm:px-10 lg:px-0 pb-8 pt-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {team.map((member, i) => {
            const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];
            
            return (
              <div 
                key={member.id} 
                className={`snap-center shrink-0 transition-opacity duration-300 ${
                  hoveredId && hoveredId !== member.id ? 'opacity-60' : 'opacity-100'
                } ${i !== 0 ? '-ml-10 sm:-ml-10 xl:-ml-12' : ''}`}
              >
                <PolaroidCard
                  member={member}
                  rotation={rotation}
                  index={i}
                  isHovered={hoveredId === member.id}
                  onHoverStart={() => setHoveredId(member.id)}
                  onHoverEnd={() => setHoveredId(null)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
