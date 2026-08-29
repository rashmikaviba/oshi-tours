"use client";

import { useState } from "react";
import { BookingFormData } from "../types";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step5Additional({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.communicationPreference) newErrors.communicationPreference = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) next();
  };

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Additional Information</h3>

      <div className="space-y-8 mb-8">
        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">Activities of Interest</label>
          <textarea
            value={data.activitiesOfInterest}
            onChange={(e) => update({ activitiesOfInterest: e.target.value })}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30 resize-none min-h-[80px]"
            placeholder="Wildlife safaris, historical sites, culinary tours, wellness..."
          />
        </div>

        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">Medical Conditions / Dietary Requirements</label>
          <textarea
            value={data.medicalConditions}
            onChange={(e) => update({ medicalConditions: e.target.value })}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30 resize-none min-h-[80px]"
            placeholder="Any allergies, mobility issues, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-2 uppercase">Special Requests</label>
          <textarea
            value={data.specialRequests}
            onChange={(e) => update({ specialRequests: e.target.value })}
            className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-3 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30 resize-none min-h-[80px]"
            placeholder="Anniversary celebration, specific room type, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-mono tracking-wider opacity-70 mb-4 uppercase">Preferred Communication Method</label>
          <div className="flex gap-6">
            {['Email', 'Phone', 'WhatsApp'].map(method => (
              <label key={method} className="flex items-center gap-2 cursor-pointer font-[family-name:var(--font-newsreader)] text-lg">
                <input
                  type="radio"
                  name="commPreference"
                  value={method}
                  checked={data.communicationPreference === method}
                  onChange={(e) => update({ communicationPreference: e.target.value })}
                  className="w-4 h-4 accent-[var(--color-green)]"
                />
                {method}
              </label>
            ))}
          </div>
          {errors.communicationPreference && <p className="text-red-700 text-xs mt-1">{errors.communicationPreference}</p>}
        </div>
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
          Review Details
        </button>
      </div>
    </div>
  );
}
