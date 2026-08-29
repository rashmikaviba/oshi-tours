"use client";

import { useState } from "react";
import { BookingFormData } from "../types";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step4Transport({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.transportPreference) newErrors.transportPreference = "Please select a transport preference";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) next();
  };

  const options = [
    "Private Car",
    "Mini Micro Van",
    "Highroof Micro Van",
    "Coach Bus",
    "SUV",
  ];

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Transportation</h3>
      <p className="font-[family-name:var(--font-newsreader)] text-lg opacity-80 mb-8">
        How would you prefer to travel between destinations?
      </p>

      <div className="space-y-4 mb-8">
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => update({ transportPreference: opt })}
            className={`p-5 border cursor-pointer transition-all ${
              data.transportPreference === opt
                ? "border-[var(--color-green)] bg-[var(--color-green)]/5"
                : "border-[var(--color-green)]/20 hover:border-[var(--color-green)]/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  data.transportPreference === opt ? "border-[var(--color-green)]" : "border-[var(--color-green)]/40"
                }`}
              >
                {data.transportPreference === opt && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-green)]" />}
              </div>
              <span className="font-[family-name:var(--font-newsreader)] text-lg">{opt}</span>
            </div>
          </div>
        ))}
        {errors.transportPreference && <p className="text-red-700 text-xs mt-1">{errors.transportPreference}</p>}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          className="px-8 py-4 border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-4 bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-opacity"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
