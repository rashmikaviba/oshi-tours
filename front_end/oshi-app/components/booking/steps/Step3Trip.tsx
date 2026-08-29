"use client";

import { useState } from "react";
import { BookingFormData } from "../types";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step3Trip({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.startDate) newErrors.startDate = "Required";
    if (!data.startTime) newErrors.startTime = "Required";
    if (!data.endDate) newErrors.endDate = "Required";
    if (!data.endTime) newErrors.endTime = "Required";
    if (!data.startLocation.trim()) newErrors.startLocation = "Required";
    if (!data.endLocation.trim()) newErrors.endLocation = "Required";
    if (data.numberOfTravelers < 1) newErrors.numberOfTravelers = "Must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) next();
  };

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Trip Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Start of Journey</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Location / Hotel</label>
              <input
                type="text"
                value={data.startLocation}
                onChange={(e) => update({ startLocation: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                placeholder="e.g. Colombo / Airport"
              />
              {errors.startLocation && <p className="text-red-700 text-xs mt-1">{errors.startLocation}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Date</label>
                <input
                  type="date"
                  value={data.startDate}
                  onChange={(e) => update({ startDate: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                />
                {errors.startDate && <p className="text-red-700 text-xs mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Time</label>
                <input
                  type="time"
                  value={data.startTime}
                  onChange={(e) => update({ startTime: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                />
                {errors.startTime && <p className="text-red-700 text-xs mt-1">{errors.startTime}</p>}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">End of Journey</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Location / Drop-off</label>
              <input
                type="text"
                value={data.endLocation}
                onChange={(e) => update({ endLocation: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                placeholder="e.g. Galle / Airport"
              />
              {errors.endLocation && <p className="text-red-700 text-xs mt-1">{errors.endLocation}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Date</label>
                <input
                  type="date"
                  value={data.endDate}
                  onChange={(e) => update({ endDate: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                />
                {errors.endDate && <p className="text-red-700 text-xs mt-1">{errors.endDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Time</label>
                <input
                  type="time"
                  value={data.endTime}
                  onChange={(e) => update({ endTime: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                />
                {errors.endTime && <p className="text-red-700 text-xs mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 pt-6 border-t border-[var(--color-green)]/10">
        <label className="block text-sm font-mono tracking-wider opacity-70 mb-4 uppercase">Number of Travelers</label>
        <div className="flex items-center gap-6">
          <button
            onClick={() => update({ numberOfTravelers: Math.max(1, data.numberOfTravelers - 1) })}
            className="w-12 h-12 rounded-full border border-[var(--color-green)]/30 flex items-center justify-center hover:bg-[var(--color-green)]/5 transition-colors text-xl"
          >
            -
          </button>
          <span className="font-[family-name:var(--font-grandslang)] text-4xl w-12 text-center">
            {data.numberOfTravelers}
          </span>
          <button
            onClick={() => update({ numberOfTravelers: data.numberOfTravelers + 1 })}
            className="w-12 h-12 rounded-full border border-[var(--color-green)]/30 flex items-center justify-center hover:bg-[var(--color-green)]/5 transition-colors text-xl"
          >
            +
          </button>
        </div>
        {errors.numberOfTravelers && <p className="text-red-700 text-xs mt-2">{errors.numberOfTravelers}</p>}
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
