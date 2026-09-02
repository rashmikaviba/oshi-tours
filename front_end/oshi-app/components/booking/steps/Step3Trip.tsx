"use client";

import { useState, useMemo } from "react";
import { BookingFormData } from "../types";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step3Trip({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.startLocation.trim()) {
      newErrors.startLocation = "Start location is required";
    } else if (data.startLocation.trim().length < 2) {
      newErrors.startLocation = "Please enter a valid location name";
    }

    if (!data.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (data.startDate < todayStr) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (!data.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!data.endLocation.trim()) {
      newErrors.endLocation = "End location is required";
    } else if (data.endLocation.trim().length < 2) {
      newErrors.endLocation = "Please enter a valid location name";
    }

    if (!data.endDate) {
      newErrors.endDate = "End date is required";
    } else if (data.endDate < todayStr) {
      newErrors.endDate = "End date cannot be in the past";
    } else if (data.startDate && data.endDate < data.startDate) {
      newErrors.endDate = "End date cannot be earlier than start date";
    }

    if (!data.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (!data.numberOfTravelers || data.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = "Must be at least 1 traveler";
    } else if (data.numberOfTravelers > 50) {
      newErrors.numberOfTravelers = "For groups over 50, please contact our concierge directly";
    }

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
              <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                Location / Hotel <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={data.startLocation}
                onChange={(e) => {
                  update({ startLocation: e.target.value });
                  if (errors.startLocation) setErrors((prev) => ({ ...prev, startLocation: "" }));
                }}
                className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                placeholder="e.g. Colombo / Airport"
              />
              {errors.startLocation && <p className="text-red-700 text-xs mt-1">{errors.startLocation}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                  Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={data.startDate}
                  onChange={(e) => {
                    update({ startDate: e.target.value });
                    if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: "" }));
                  }}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg cursor-pointer"
                />
                {errors.startDate && <p className="text-red-700 text-xs mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                  Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="time"
                  value={data.startTime}
                  onChange={(e) => {
                    update({ startTime: e.target.value });
                    if (errors.startTime) setErrors((prev) => ({ ...prev, startTime: "" }));
                  }}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg cursor-pointer"
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
              <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                Location / Drop-off <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={data.endLocation}
                onChange={(e) => {
                  update({ endLocation: e.target.value });
                  if (errors.endLocation) setErrors((prev) => ({ ...prev, endLocation: "" }));
                }}
                className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                placeholder="e.g. Galle / Airport"
              />
              {errors.endLocation && <p className="text-red-700 text-xs mt-1">{errors.endLocation}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                  Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  min={data.startDate || todayStr}
                  value={data.endDate}
                  onChange={(e) => {
                    update({ endDate: e.target.value });
                    if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: "" }));
                  }}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg cursor-pointer"
                />
                {errors.endDate && <p className="text-red-700 text-xs mt-1">{errors.endDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">
                  Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="time"
                  value={data.endTime}
                  onChange={(e) => {
                    update({ endTime: e.target.value });
                    if (errors.endTime) setErrors((prev) => ({ ...prev, endTime: "" }));
                  }}
                  className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg cursor-pointer"
                />
                {errors.endTime && <p className="text-red-700 text-xs mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 pt-6 border-t border-[var(--color-green)]/10">
        <label className="block text-sm font-mono tracking-wider opacity-70 mb-4 uppercase">
          Number of Travelers <span className="text-red-600">*</span>
        </label>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => {
              const val = Math.max(1, data.numberOfTravelers - 1);
              update({ numberOfTravelers: val });
              if (errors.numberOfTravelers) setErrors((prev) => ({ ...prev, numberOfTravelers: "" }));
            }}
            className="w-12 h-12 rounded-full border border-[var(--color-green)]/30 flex items-center justify-center hover:bg-[var(--color-green)]/5 transition-colors text-xl cursor-pointer"
          >
            -
          </button>
          <span className="font-[family-name:var(--font-grandslang)] text-4xl w-12 text-center">
            {data.numberOfTravelers}
          </span>
          <button
            type="button"
            onClick={() => {
              const val = Math.min(50, data.numberOfTravelers + 1);
              update({ numberOfTravelers: val });
              if (errors.numberOfTravelers) setErrors((prev) => ({ ...prev, numberOfTravelers: "" }));
            }}
            className="w-12 h-12 rounded-full border border-[var(--color-green)]/30 flex items-center justify-center hover:bg-[var(--color-green)]/5 transition-colors text-xl cursor-pointer"
          >
            +
          </button>
        </div>
        {errors.numberOfTravelers && <p className="text-red-700 text-xs mt-2">{errors.numberOfTravelers}</p>}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          className="px-8 py-4 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-all duration-300 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-4 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 cursor-pointer shadow-md"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
