"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types & Layout Generator ─── */

type GalleryItemDef =
  | { type: "image"; id: string; src: string; baseFlex: number; hoverFlex: number }
  | { type: "text"; id: string; text: string; subtext: string; baseFlex: number; hoverFlex: number };

function generateLayout(images: string[]): GalleryItemDef[] {
  const layout: GalleryItemDef[] = [];
  
  if (images.length > 0) layout.push({ type: "image", id: "img0", src: images[0], baseFlex: 2.2, hoverFlex: 3.5 });
  if (images.length > 1) layout.push({ type: "text", id: "txt1", text: "A piece of paradise", subtext: "Ceylon Highlands", baseFlex: 1, hoverFlex: 1.3 });
  if (images.length > 2) layout.push({ type: "image", id: "img1", src: images[1], baseFlex: 3, hoverFlex: 4.5 });
  if (images.length > 3) layout.push({ type: "image", id: "img2", src: images[2], baseFlex: 2, hoverFlex: 3.5 });
  
  // Row 2
  if (images.length > 4) layout.push({ type: "image", id: "img3", src: images[3], baseFlex: 3, hoverFlex: 4.5 });
  if (images.length > 5) layout.push({ type: "image", id: "img4", src: images[4], baseFlex: 2.2, hoverFlex: 3.5 });
  if (images.length >= 6) {
    layout.push({ type: "text", id: "txt2", text: "Timeless journeys", subtext: "Handpicked Stays", baseFlex: 1, hoverFlex: 1.3 });
    layout.push({ type: "image", id: "img5", src: images[5], baseFlex: 2, hoverFlex: 3.5 });
  }
  
  return layout;
}

/* ─── Gallery Component ─── */

interface GalleryProps {
  experience: ExperienceData;
}

export default function Gallery({ experience }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const layout = generateLayout(experience.gallery);
  
  // Split into rows for desktop (4 items per row if available)
  const row1 = layout.slice(0, 4);
  const row2 = layout.slice(4, 8);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, experience.gallery.length]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 w-full overflow-hidden flex flex-col"
    >
      {/* Eyebrow */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mb-10 sm:mb-14">
        <p className="eyebrow text-[var(--color-green-70)] text-center">
          Gallery
        </p>
      </div>

      {/* ── Mobile Layout (Horizontal Swipe Strip) ── */}
      <div className="md:hidden flex flex-row overflow-x-auto snap-x snap-mandatory w-full h-[60vh] min-h-[400px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {layout.map((item, idx) => (
          <div
            key={`mobile-${item.id}`}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="relative w-[85vw] flex-none snap-center h-full border-r border-[var(--color-green)]/10 last:border-r-0"
            style={prefersReducedMotion ? undefined : { opacity: 0 }}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt="Gallery preview"
                fill
                className="object-cover text-transparent"
                sizes="(max-width: 768px) 85vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-[rgb(59,89,55)] flex flex-col items-center justify-center text-center p-8 text-[var(--color-white)]">
                <span className="font-[family-name:var(--font-grand-slang)] text-3xl mb-3">
                  {item.text}
                </span>
                <span className="font-[family-name:var(--font-ogg)] text-sm tracking-widest uppercase opacity-80">
                  {item.subtext}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop Layout (Full Bleed Flex Bands) ── */}
      <div className="hidden md:flex flex-col w-full gap-0">
        {[row1, row2].map((row, rowIndex) => {
          if (row.length === 0) return null;
          return (
            <div
              key={rowIndex}
              className="flex flex-row w-full h-[40vh] min-h-[320px] max-h-[520px]"
            >
              {row.map((item, colIndex) => {
                const absoluteIdx = layout.length + (rowIndex * 4) + colIndex;
                
                return (
                  <div
                    key={`desktop-${item.id}`}
                    ref={(el) => {
                      cardsRef.current[absoluteIdx] = el;
                    }}
                    className="group relative overflow-hidden transition-[flex] duration-700 ease-[var(--ease-expo-out)] cursor-pointer border-r border-[rgb(59,89,55)]/20 last:border-r-0"
                    style={{ flex: item.baseFlex, ...(prefersReducedMotion ? {} : { opacity: 0 }) }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.flex = String(item.hoverFlex);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.flex = String(item.baseFlex);
                    }}
                  >
                    {item.type === "image" ? (
                      <>
                        <Image
                          src={item.src}
                          alt="Gallery preview"
                          fill
                          className="object-cover text-transparent transition-transform duration-1000 ease-out group-hover:scale-105"
                          sizes="(max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-[rgb(59,89,55)]/10 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-[rgb(59,89,55)] flex flex-col items-center justify-center text-center p-6 text-[var(--color-white)]">
                        <span className="font-[family-name:var(--font-grand-slang)] text-2xl lg:text-3xl xl:text-4xl leading-tight mb-2">
                          {item.text}
                        </span>
                        <span className="font-[family-name:var(--font-ogg)] text-xs lg:text-sm tracking-widest uppercase opacity-80">
                          {item.subtext}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
