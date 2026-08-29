"use client";

import { useMemo } from "react";
import type { ExperienceData } from "@/data/experiences/hill-country-by-rail";

/* ═══════════════════════════════════════════════════════════
   SummaryCard — Sticky panel with live booking totals
   Reads parent state (adults, children, selectedPackage,
   selectedAddOns) and computes an estimated total.
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

  const packageSubtotal = pkg.price * adults;
  const addOnSubtotal = activeAddOns.reduce((sum, a) => sum + a.price, 0);
  const estimatedTotal = packageSubtotal + addOnSubtotal;

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <aside
      className="lg:sticky lg:top-24 bg-[var(--color-white)] rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--color-green)]/10"
      aria-label="Booking summary"
    >
      {/* ── Header ── */}
      <h3 className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)]">
        Booking Summary
      </h3>

      <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
        {experience.title}
      </p>

      {/* ── Divider ── */}
      <div className="border-t border-[var(--color-green)]/10 my-4" />

      {/* ── Line items ── */}
      <div className="space-y-3">
        {/* Package */}
        <div className="flex items-start justify-between gap-4">
          <div className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
            <span className="font-medium">{pkg.name}</span>
            <span className="block text-xs text-[var(--color-green-70)] mt-0.5">
              {formatUSD(pkg.price)} × {adults} {adults === 1 ? "adult" : "adults"}
            </span>
          </div>
          <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)] whitespace-nowrap">
            {formatUSD(packageSubtotal)}
          </span>
        </div>

        {/* Children note */}
        {children > 0 && (
          <div className="flex items-start justify-between gap-4">
            <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
              Children
              <span className="block text-xs text-[var(--color-green-70)] mt-0.5">
                {children} {children === 1 ? "child" : "children"}
              </span>
            </span>
            <span className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green-70)] italic whitespace-nowrap">
              Complimentary
            </span>
          </div>
        )}

        {/* Add-ons */}
        {activeAddOns.map((addOn) => (
          <div
            key={addOn.id}
            className="flex items-start justify-between gap-4"
          >
            <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)]">
              {addOn.label}
            </span>
            <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green)] whitespace-nowrap">
              +{formatUSD(addOn.price)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[var(--color-green)]/10 my-4" />

      {/* ── Estimated Total ── */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)]">
          Estimated Total
        </span>
        <span className="font-[family-name:var(--font-grandslang)] text-2xl sm:text-3xl text-[var(--color-green)]">
          {formatUSD(estimatedTotal)}
        </span>
      </div>

      {/* ── Footer note ── */}
      <p className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green-70)] italic mt-5 leading-relaxed">
        This is an enquiry — our team will confirm availability and final
        pricing within 24 hours.
      </p>
    </aside>
  );
}
