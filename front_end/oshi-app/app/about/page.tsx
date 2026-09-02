import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillButton from "@/components/ui/PillButton";
import { Mail, Phone, MessageCircle, ArrowUpRight, Compass, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — OSHĪ Luxury Sri Lanka Travel",
  description:
    "Learn about OSHĪ, our founder Oshan Fernando, and our commitment to crafting unhurried, private, and design-led travel experiences across Sri Lanka.",
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21l4.604-1.208a8.943 8.943 0 0 0 4.445 1.185h.004c4.947 0 8.976-4.027 8.978-8.977a8.92 8.92 0 0 0-2.628-6.367zm-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.277c-.002 4.114-3.348 7.464-7.465 7.464zm4.095-5.586c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.879-.13.149-.261.168-.486.056-.225-.113-.949-.349-1.808-1.115-.668-.596-1.119-1.332-1.25-1.557-.13-.225-.014-.347.099-.459.101-.101.225-.262.337-.393.113-.131.149-.225.225-.375.075-.15.037-.281-.019-.393-.056-.113-.504-1.217-.691-1.666-.182-.437-.367-.378-.504-.385a3.6 3.6 0 0 0-.431-.008c-.149 0-.393.056-.599.281-.205.225-.786.767-.786 1.872 0 1.104.805 2.17 0.917 2.32.113.149 1.583 2.418 3.837 3.391.536.232.955.37 1.282.474.538.171 1.027.147 1.414.089.432-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.093-.205-.15-.43-.262z" />
  </svg>
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] font-sans selection:bg-[var(--color-green-40)] selection:text-white">
      {/* Navigation */}
      <Navbar isVisible={true} />

      {/* ── 1. Hero Banner ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 sm:px-12 md:px-16 lg:px-20 border-b border-[var(--color-green)]/15">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="eyebrow text-[var(--color-green)]/70 tracking-[0.25em] block">
            OUR STORY & PHILOSOPHY
          </span>
          <h1 className="font-[family-name:var(--font-grandslang-roman)] text-4xl sm:text-5xl md:text-6xl text-[var(--color-green)] leading-[1.06] tracking-tight">
            Crafting Unhurried & Bespoke Ceylon Journeys
          </h1>
          <p className="font-[family-name:var(--font-newsreader-var)] text-lg sm:text-xl text-[var(--color-green)]/80 max-w-2xl mx-auto leading-relaxed">
            OSHĪ was founded on a simple promise: to offer travelers private, design-led, and authentic access to Sri Lanka’s UNESCO heritage, leopard wilderness, and misted tea sanctuaries — entirely free from rushed itineraries.
          </p>
        </div>
      </section>

      {/* ── 2. Founder Spotlight (Featuring p_9.PNG) ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-green)]/20 aspect-[4/5] bg-[var(--color-green)]/10">
              <Image
                src="/media/p_9.PNG"
                alt="Oshan Fernando — Founder of OSHĪ Tours & Travels"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-[var(--ease-expo-out)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(20,32,18)]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-beige)]/80 block">
                  Founder & Managing Director
                </span>
                <h3 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-white">
                  Oshan Fernando
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow text-[var(--color-green)]/70 tracking-[0.2em] block">
              A MESSAGE FROM THE FOUNDER
            </span>
            <h2 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl text-[var(--color-green)] leading-[1.1]">
              &ldquo;Travel should be an art of immersion, not a race against time.&rdquo;
            </h2>

            <div className="space-y-4 font-[family-name:var(--font-newsreader-var)] text-base sm:text-lg text-[var(--color-green)]/85 leading-relaxed">
              <p>
                Welcome to OSHĪ. Having spent over a decade curating private routes across Sri Lanka, I realized that true luxury lies in unhurried moments — watching the dawn light touch Sigiriya’s rock face before the crowds arrive, taking tea with local planters in Nuwara Eliya, or tracking wild leopards in Yala with expert naturalists.
              </p>
              <p>
                Whether you choose one of our meticulously crafted multi-day itineraries or rely on our private chauffeur-driven transport service, my team and I personally ensure every route, vehicle, and host meets the highest standard of hospitality and safety.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="mailto:oshitourslanka@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-green)] text-white text-xs font-mono tracking-wider hover:bg-[rgb(20,32,18)] transition-colors shadow-md"
              >
                <Mail className="w-4 h-4 text-[var(--color-beige)]" />
                <span>oshitourslanka@gmail.com</span>
              </a>

              <a
                href="https://wa.me/94728352612"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-800 text-xs font-mono tracking-wider hover:bg-emerald-100 transition-colors font-semibold"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp 0728352612</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Four Core Pillars ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-[var(--color-green)]/5 border-t border-b border-[var(--color-green)]/15">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="eyebrow text-[var(--color-green)]/70 tracking-[0.2em] block">
              THE OSHĪ DIFFERENCE
            </span>
            <h2 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl text-[var(--color-green)]">
              Why Travelers Choose OSHĪ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-[var(--color-beige)] border border-[var(--color-green)]/15 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-green)] text-white flex items-center justify-center">
                <Compass className="w-6 h-6 text-[var(--color-beige)]" />
              </div>
              <h3 className="font-[family-name:var(--font-grandslang-roman)] text-xl text-[var(--color-green)]">
                Bespoke Curation
              </h3>
              <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/80 leading-relaxed">
                No cookie-cutter tours. Every day is tailored around your group&apos;s exact rhythm, interests, and preferred pace.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-[var(--color-beige)] border border-[var(--color-green)]/15 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-green)] text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[var(--color-beige)]" />
              </div>
              <h3 className="font-[family-name:var(--font-grandslang-roman)] text-xl text-[var(--color-green)]">
                Chauffeur Fleet
              </h3>
              <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/80 leading-relaxed">
                Modern, climate-controlled sedans, micro vans, and SUVs with experienced, English-speaking driver-guides.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-[var(--color-beige)] border border-[var(--color-green)]/15 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-green)] text-white flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[var(--color-beige)]" />
              </div>
              <h3 className="font-[family-name:var(--font-grandslang-roman)] text-xl text-[var(--color-green)]">
                Sanctuary Access
              </h3>
              <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/80 leading-relaxed">
                Private entrance arrangements for ancient fortresses, tea planter estates, and wildlife reserves across the island.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-3xl bg-[var(--color-beige)] border border-[var(--color-green)]/15 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-green)] text-white flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-[var(--color-beige)]" />
              </div>
              <h3 className="font-[family-name:var(--font-grandslang-roman)] text-xl text-[var(--color-green)]">
                24/7 Concierge
              </h3>
              <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/80 leading-relaxed">
                Direct concierge ground support from airport arrival in Colombo to your final departure flight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Call To Action (CTA) ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl lg:text-5xl text-[var(--color-green)]">
            Ready to design your private Sri Lanka itinerary?
          </h2>
          <p className="font-[family-name:var(--font-newsreader-var)] text-base sm:text-lg text-[var(--color-green)]/80 max-w-xl mx-auto">
            Use our interactive Trip Planner or speak directly with our private travel designers to start crafting your journey.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PillButton href="/trip-planner" showArrow={true} className="w-full sm:w-64 h-14">
              Plan Your Custom Journey
            </PillButton>
            <Link
              href="/#experiences"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-64 h-14 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-[family-name:var(--font-newsreader-var)] text-sm tracking-wide hover:bg-[var(--color-green)] hover:text-white transition-all duration-300 font-medium"
            >
              Explore Curated Routes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
