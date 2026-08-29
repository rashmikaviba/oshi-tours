"use client";

import { TripPlannerFormData } from "@/types/tripPlanner";
import { Car, ShieldCheck, Check, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  update: (fields: Partial<TripPlannerFormData>) => void;
  next: () => void;
  prev: () => void;
}

const TRANSPORT_OPTIONS = [
  {
    id: "Private Car",
    title: "Private Car",
    description: "Comfortable sedan for 1–3 guests with dedicated private chauffeur.",
    recommended: true,
  },
  {
    id: "Mini Micro Van",
    title: "Mini Micro Van",
    description: "Compact van ideal for small families or small groups of up to 4–6 passengers.",
    recommended: false,
  },
  {
    id: "Highroof Micro Van",
    title: "Highroof Micro Van",
    description: "Spacious high-roof van for up to 6–10 guests with extra luggage room.",
    recommended: false,
  },
  {
    id: "Coach Bus",
    title: "Coach Bus",
    description: "Full-sized executive passenger coach for larger tour groups and corporate delegations.",
    recommended: false,
  },
  {
    id: "SUV",
    title: "SUV",
    description: "Luxury 4x4 SUV (Toyota Land Cruiser / Prado) for all-terrain exploration and premium comfort.",
    recommended: false,
  },
];

export default function Step5Transport({ data, update, next, prev }: Props) {
  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 5 • Ground & Air Travel
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Transportation Logistics
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          Select your preferred vehicle and chauffeur options for your private island route.
        </p>
      </div>

      <div className="space-y-4">
        {TRANSPORT_OPTIONS.map((opt) => {
          const isSelected = data.transportPreference === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => update({ transportPreference: opt.id })}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer select-none relative ${
                isSelected
                  ? "bg-[var(--color-beige)]/90 border-[var(--color-green)] ring-2 ring-[var(--color-green)]/15 shadow-sm"
                  : "bg-[var(--color-beige)]/50 border-[var(--color-green)]/15 hover:bg-[var(--color-beige)]/80 hover:border-[var(--color-green)]/30"
              }`}
            >
              {opt.recommended && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-[10px] font-mono tracking-wider uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Recommended</span>
                </span>
              )}

              <div className="flex items-start gap-4 pr-24">
                <div
                  className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-[var(--color-green)] bg-[var(--color-green)] text-[var(--color-beige)]"
                      : "border-[var(--color-green)]/30 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <h4 className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)]">
                    {opt.title}
                  </h4>
                  <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm"
        >
          <span>Continue to Preferences</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
