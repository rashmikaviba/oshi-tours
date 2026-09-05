"use client";

import { useMemo } from "react";
import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

/* ═══════════════════════════════════════════════════════════
 SummaryCard, Sticky panel with live journey specifications
 Reads parent state (adults, children, selectedPackage,
 selectedAddOns) and presents a luxury bespoke summary.
 ═══════════════════════════════════════════════════════════ */

interface SummaryCardProps {
 experience: ExperienceData;
 adults: number;
 children: number;
 selectedPackage: number;
 selectedAddOns: Set<string>;
}

export default function SummaryCard({
 experience,
 adults,
 children,
 selectedPackage,
 selectedAddOns,
}: SummaryCardProps) {
 const pkg = experience.packages[selectedPackage] ?? experience.packages[0];

 const activeAddOns = useMemo(
 () => experience.addOns.filter((a) => selectedAddOns.has(a.id)),
 [experience.addOns, selectedAddOns]
 );

 return (
 <aside
 className="lg:sticky lg:top-24 bg-[var(--color-white)] rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--color-green)]/10"
 aria-label="Booking summary"
 >
 {/* ── Header ── */}
 <h3 className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)]">
 Journey Summary
 </h3>

 <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
 {experience.title}
 </p>

 {/* ── Divider ── */}
 <div className="border-t border-[var(--color-green)]/10 my-4" />

 {/* ── Specification Items ── */}
 <div className="space-y-3">
 {/* Selected Tier / Package */}
 <div className="flex items-start justify-between gap-4">
 <div className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
 <span className="font-medium">Selected Tier: {pkg.name}</span>
 <span className="block text-xs text-[var(--color-green-70)] mt-0.5">
 Curated Private Circuit
 </span>
 </div>
 </div>

 {/* Travelers */}
 <div className="flex items-start justify-between gap-4 pt-1">
 <div className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
 <span className="text-xs uppercase tracking-wider text-[var(--color-green-70)] block">Travelers</span>
 <span>{adults} {adults === 1 ? "Adult" : "Adults"} {children > 0 ? `· ${children} ${children === 1 ? "Child" : "Children"}` : ""}</span>
 </div>
 </div>

 {/* Duration */}
 <div className="flex items-start justify-between gap-4 pt-1">
 <div className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
 <span className="text-xs uppercase tracking-wider text-[var(--color-green-70)] block">Duration</span>
 <span>{experience.durationDays} Days / {experience.durationDays - 1} Nights</span>
 </div>
 </div>

 {/* Selected Add-ons */}
 {activeAddOns.length > 0 && (
 <div className="pt-2 border-t border-[var(--color-green)]/10">
 <span className="text-xs uppercase tracking-wider text-[var(--color-green-70)] block mb-1">Add-ons Included</span>
 <ul className="space-y-1">
 {activeAddOns.map((addOn) => (
 <li key={addOn.id} className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green)] flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] shrink-0" />
 {addOn.label}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* ── Divider ── */}
 <div className="border-t border-[var(--color-green)]/10 my-4" />

 {/* ── Service Highlight ── */}
 <div className="bg-[var(--color-green)]/5 p-4 rounded-xl border border-[var(--color-green)]/10">
 <span className="font-[family-name:var(--font-ogg)] text-xs font-semibold text-[var(--color-green)] block uppercase tracking-wider mb-0.5">
 Bespoke Chauffeur Service
 </span>
 <span className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green-70)] block leading-relaxed">
 Dedicated vehicle, matched driver, and 24/7 on-trip support included.
 </span>
 </div>

 {/* ── Footer note ── */}
 <p className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green-70)] italic mt-4 leading-relaxed">
 This is an enquiry, our team will confirm availability and send a customized quote within 24 hours.
 </p>
 </aside>
 );
}
