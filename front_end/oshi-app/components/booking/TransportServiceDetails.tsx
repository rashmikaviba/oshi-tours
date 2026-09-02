"use client";

import React from "react";
import { 
  Car, 
  Users, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Info, 
  MapPin, 
  Sparkles,
  DollarSign
} from "lucide-react";

export default function TransportServiceDetails() {
  const vehicleFleet = [
    {
      pax: "1 – 2 Pax",
      type: "Private Car",
      description: "Comfortable option for solo travellers, couples and small families.",
      icon: Car,
      capacity: "Up to 2 Guests + 2 Suitcases"
    },
    {
      pax: "1 – 4 Pax",
      type: "SUV",
      description: "Luxury 4x4 SUV (Toyota Land Cruiser / Prado) for all-terrain exploration and premium comfort.",
      icon: Car,
      capacity: "Up to 4 Guests + 3 Suitcases"
    },
    {
      pax: "3 – 6 Pax",
      type: "Mini Micro Van",
      description: "Standard choice for small groups and families, with ample space for luggage.",
      icon: Users,
      capacity: "Up to 6 Guests + 5 Suitcases"
    },
    {
      pax: "7 – 10 Pax",
      type: "Highroof Micro Van",
      description: "Recommended for mid-sized groups travelling together across Sri Lanka.",
      icon: Users,
      capacity: "Up to 10 Guests + 8 Suitcases"
    },
    {
      pax: "11+ Pax (up to 40)",
      type: "Coach Bus",
      description: "For larger groups, conferences, family reunions, or corporate tours.",
      icon: Users,
      capacity: "Up to 40 Guests + Full Luggage Compartment"
    }
  ];

  const includedItems = [
    {
      title: "Professional Driver",
      description: "An experienced, courteous, English-speaking chauffeur for the full duration of your trip."
    },
    {
      title: "Free Onboard Wi-Fi",
      description: "Complimentary high-speed onboard Wi-Fi connection throughout your journey."
    },
    {
      title: "Day-Based Flexible Service",
      description: "Vehicle is available each day for travel to and between any locations you select."
    },
    {
      title: "Vehicle Matched to Pax Count",
      description: "Appropriately sized luxury vehicle assigned based on your total passenger count."
    }
  ];

  const notIncludedItems = [
    {
      title: "Hotel Accommodation",
      description: "Hotel bookings of any kind are arranged independently by the client."
    },
    {
      title: "Meals & Drinks",
      description: "Breakfast, lunch, dinner, and personal dining expenses are not included."
    },
    {
      title: "Entrance Tickets & Safaris",
      description: "Heritage site entry fees, national park tickets, and safari jeep charges."
    },
    {
      title: "Guiding Services",
      description: "Specialist tour guides (unless separately requested and arranged)."
    }
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto space-y-20">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] text-xs font-mono uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FLEXIBLE CHAUFFEUR TRANSPORT</span>
        </div>

        <h2 className="font-[family-name:var(--font-grandslang)] text-3xl sm:text-4xl lg:text-5xl text-[var(--color-green)] font-normal leading-tight">
          Vehicle Guide by Passenger Count
        </h2>

        <p className="font-[family-name:var(--font-ogg)] text-base sm:text-lg text-[var(--color-green-70)] leading-relaxed">
          Select your travel group size. We assign an appropriately sized, air-conditioned luxury vehicle with a dedicated professional chauffeur for your entire stay.
        </p>
      </div>

      {/* ── Vehicle Fleet Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {vehicleFleet.map((v, i) => {
          const IconComp = v.icon;
          return (
            <div
              key={i}
              className="p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-green)]/15 text-[var(--color-green)] font-semibold">
                    {v.pax}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-green)]/10 flex items-center justify-center text-[var(--color-green)]">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-[family-name:var(--font-grandslang)] text-xl font-semibold text-[var(--color-green)]">
                    {v.type}
                  </h3>
                  <p className="font-mono text-[11px] text-[var(--color-green-70)] uppercase tracking-wide">
                    {v.capacity}
                  </p>
                </div>

                <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-green)]/10 flex items-center gap-2 text-xs font-mono text-[var(--color-green)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Onboard Wi-Fi Included</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Included vs Not Included Comparison ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-8">
        {/* Left Column: What's Included */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-green)]/20">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-grandslang)] text-2xl text-[var(--color-green)] font-semibold">
                What&apos;s Included
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-green-70)]">
                Provided as part of your daily transport rate
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {includedItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-[family-name:var(--font-grandslang)] text-base font-semibold text-[var(--color-green)]">
                    {item.title}
                  </h4>
                  <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: What's Not Included */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/15 space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-green)]/15">
            <div className="w-10 h-10 rounded-full bg-[var(--color-green)]/20 text-[var(--color-green)] flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-grandslang)] text-2xl text-[var(--color-green)] font-semibold">
                What&apos;s Not Included
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-green-70)]">
                Arranged independently by client
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {notIncludedItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <XCircle className="w-5 h-5 text-[var(--color-green-40)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-[family-name:var(--font-grandslang)] text-base font-semibold text-[var(--color-green)]">
                    {item.title}
                  </h4>
                  <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pricing & Calculation Policy Callout ── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-green)] text-white space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          <h3 className="font-[family-name:var(--font-grandslang)] text-2xl text-white font-normal">
            How Charges Are Calculated
          </h3>
        </div>

        <p className="font-[family-name:var(--font-ogg)] text-base sm:text-lg text-white/90 leading-relaxed max-w-4xl">
          Under this package, charges apply strictly to the transport service — the driver, vehicle, fuel, road tolls, and day-based usage described above. Clients are billed only for the transport component; no hotel accommodation, meal, or activity charges are included or added on our end, as those are arranged independently by you.
        </p>

        <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between text-xs font-mono text-white/80 gap-4">
          <span>Vehicle types above are indicative and adjusted to match availability or specific requests.</span>
          <a
            href="#booking-form"
            className="px-5 py-2.5 rounded-full bg-white text-[var(--color-green)] hover:bg-emerald-100 font-semibold transition-colors"
          >
            Calculate Transport Quote
          </a>
        </div>
      </div>
    </section>
  );
}
