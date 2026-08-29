"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PillButton from "@/components/ui/PillButton";
import Hero from "@/components/booking/Hero";
import Overview from "@/components/booking/Overview";
import Gallery from "@/components/booking/Gallery";
import ItineraryTimeline from "@/components/booking/ItineraryTimeline";
import TransportServiceDetails from "@/components/booking/TransportServiceDetails";
import BookingForm from "@/components/booking/BookingForm";
import Footer from "@/components/Footer";
import { experiences } from "@/data/experiences/hill-country-by-rail";

export default function ExperiencePage() {
  const params = useParams();
  const slug = (typeof params?.slug === "string" ? params.slug : "hill-country-by-rail");
  
  // Lookup experience data, fallback to hill-country-by-rail
  const experience = experiences[slug] || experiences["hill-country-by-rail"];
  const isTransportOnly = !experience.itinerary || experience.itinerary.length === 0;

  return (
    <main className="relative min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] overflow-x-hidden selection:bg-[var(--color-green-40)] selection:text-[var(--color-white)]">
      {/* ── Fixed Transparent Overlay Navbar ── */}
      <Navbar isVisible={true} />

      {/* ── 1. Cinematic Hero (Includes QuickFacts row at bottom) ── */}
      <Hero experience={experience} />

      {/* ── Continuous Beige Background Wrapper for Sections 2-6 ── */}
      <div className="w-full bg-[var(--color-beige)] text-[var(--color-green)]">
        {/* ── 2. Overview / Details & Facts ── */}
        <Overview experience={experience} />

        {/* ── 3. Timeline vs Transport Only Layout Redesign ── */}
        {isTransportOnly ? (
          <TransportServiceDetails />
        ) : (
          <ItineraryTimeline experience={experience} />
        )}

        {/* ── 4. Editorial Gallery Collage ── */}
        <Gallery experience={experience} />

        {/* ── 5. Booking Form Section ── */}
        <section
          id="booking-form"
          className="border-t border-[var(--color-green)]/15"
          aria-label="Booking enquiry section"
        >
          <BookingForm experienceName={experience.title} />
        </section>

        {/* ── 6. Closing CTA / Footer Reassurance ── */}
        <section
          className="py-20 sm:py-28 px-6 sm:px-10 md:px-16 lg:px-20 border-t border-[var(--color-green)]/15 text-center"
          aria-label="Closing reassurance"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-grandslang)] text-2xl sm:text-3xl lg:text-4xl text-[var(--color-green)] mb-4">
              Every journey is tailored — speak to a specialist.
            </h3>
            <p className="font-[family-name:var(--font-ogg)] text-[var(--color-green-70)] text-sm sm:text-base leading-relaxed mb-8">
              Whether you wish to extend your stay, add a private helicopter transfer across the central mountain range, or combine this route with our southern coast safaris, our private travel designers are at your service.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PillButton href="/" showArrow={true}>
                Explore More Journeys
              </PillButton>
              <a
                href="mailto:oshitourslanka@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-[family-name:var(--font-ogg)] text-sm tracking-wide hover:bg-[var(--color-green)] hover:text-[var(--color-white)] transition-all duration-300"
              >
                oshitourslanka@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* ── 7. Global Footer ── */}
        <Footer />
      </div>
    </main>
  );
}
