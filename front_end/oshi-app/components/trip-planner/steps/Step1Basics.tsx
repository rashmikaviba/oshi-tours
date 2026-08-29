"use client";

import { useState, useMemo } from "react";
import { TripPlannerFormData } from "@/types/tripPlanner";
import { Calendar, Compass, ArrowRight, AlertCircle } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  update: (fields: Partial<TripPlannerFormData>) => void;
  next: () => void;
}

export default function Step1Basics({ data, update, next }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Compute today's date string YYYY-MM-DD in local time
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.planName.trim()) {
      newErrors.planName = "Travel plan name is required";
    }

    if (!data.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (data.startDate < todayStr) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (!data.endDate) {
      newErrors.endDate = "End date is required";
    } else if (data.endDate < todayStr) {
      newErrors.endDate = "End date cannot be in the past";
    }

    if (data.startDate && data.endDate) {
      if (data.endDate < data.startDate) {
        newErrors.endDate = "End date cannot be earlier than start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      next();
    }
  };

  const handleStartDateChange = (val: string) => {
    const fields: Partial<TripPlannerFormData> = { startDate: val };
    // If end date is now before start date, reset end date
    if (data.endDate && val && data.endDate < val) {
      fields.endDate = val;
    }
    update(fields);
    if (errors.startDate || errors.endDate) {
      setErrors((prev) => ({ ...prev, startDate: "", endDate: "" }));
    }
  };

  const handleEndDateChange = (val: string) => {
    update({ endDate: val });
    if (errors.endDate) {
      setErrors((prev) => ({ ...prev, endDate: "" }));
    }
  };

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 1 • Getting Started
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Plan Basics
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          Name your private expedition and select your travel window to generate your custom daily itinerary.
        </p>
      </div>

      <div className="bg-[var(--color-beige)]/60 p-6 sm:p-8 rounded-3xl border border-[var(--color-green)]/15 space-y-6">
        {/* Travel Plan Name */}
        <div>
          <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
            Travel Plan Name <span className="text-red-600">*</span>
          </label>
          <div className="relative flex items-center">
            <Compass className="absolute left-4 w-5 h-5 text-[var(--color-green)]/40 pointer-events-none" />
            <input
              type="text"
              value={data.planName}
              onChange={(e) => {
                update({ planName: e.target.value });
                if (errors.planName) setErrors((prev) => ({ ...prev, planName: "" }));
              }}
              placeholder="e.g. Ceylon Highland & Coast Expedition"
              className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-12 pr-4 py-3.5 font-[family-name:var(--font-ogg)] text-lg text-[var(--color-green)] placeholder-[var(--color-green)]/30 focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10 transition-all duration-300"
            />
          </div>
          {errors.planName && (
            <p className="text-red-600 text-xs mt-1.5 font-mono flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.planName}</span>
            </p>
          )}
        </div>

        {/* Start Date & End Date Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Start Date */}
          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              Start Date <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-4 w-5 h-5 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="date"
                min={todayStr}
                value={data.startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-12 pr-4 py-3.5 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10 transition-all duration-300 cursor-pointer"
              />
            </div>
            {errors.startDate && (
              <p className="text-red-600 text-xs mt-1.5 font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.startDate}</span>
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
              End Date <span className="text-red-600">*</span>
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-4 w-5 h-5 text-[var(--color-green)]/40 pointer-events-none" />
              <input
                type="date"
                min={data.startDate || todayStr}
                value={data.endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-12 pr-4 py-3.5 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10 transition-all duration-300 cursor-pointer"
              />
            </div>
            {errors.endDate && (
              <p className="text-red-600 text-xs mt-1.5 font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.endDate}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm"
        >
          <span>Continue to Personal Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
