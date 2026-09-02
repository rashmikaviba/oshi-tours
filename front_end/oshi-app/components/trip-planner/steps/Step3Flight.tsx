"use client";

import { useState, useMemo } from "react";
import { TripPlannerFormData } from "@/types/tripPlanner";
import { Plane, Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  update: (fields: Partial<TripPlannerFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step3Flight({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const validate = () => {
    if (!data.hasFlightDetails) return true;

    const newErrors: { [key: string]: string } = {};

    if (!data.arrivalDate) {
      newErrors.arrivalDate = "Arrival date is required";
    } else if (data.arrivalDate < todayStr) {
      newErrors.arrivalDate = "Arrival date cannot be in the past";
    }

    if (!data.arrivalTime) {
      newErrors.arrivalTime = "Arrival time is required";
    }

    if (!data.arrivalFlightNumber.trim()) {
      newErrors.arrivalFlightNumber = "Arrival flight number is required";
    } else if (data.arrivalFlightNumber.trim().length < 2) {
      newErrors.arrivalFlightNumber = "Please enter a valid flight number";
    }

    if (!data.departureDate) {
      newErrors.departureDate = "Departure date is required";
    } else if (data.departureDate < todayStr) {
      newErrors.departureDate = "Departure date cannot be in the past";
    } else if (data.arrivalDate && data.departureDate < data.arrivalDate) {
      newErrors.departureDate = "Departure date cannot be earlier than arrival date";
    }

    if (!data.departureTime) {
      newErrors.departureTime = "Departure time is required";
    }

    if (!data.departureFlightNumber.trim()) {
      newErrors.departureFlightNumber = "Departure flight number is required";
    } else if (data.departureFlightNumber.trim().length < 2) {
      newErrors.departureFlightNumber = "Please enter a valid flight number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      next();
    }
  };

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 3 • Logistics
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Flight Details
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          If you have already booked your international flights to Colombo (CMB), provide details below so we can coordinate your private airport transfers.
        </p>
      </div>

      <div className="bg-[var(--color-beige)]/60 p-6 sm:p-8 rounded-3xl border border-[var(--color-green)]/15 space-y-6">
        {/* Toggle Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl bg-[var(--color-beige)]/40 border border-[var(--color-green)]/15 hover:border-[var(--color-green)]/30 transition-all select-none">
          <input
            type="checkbox"
            checked={data.hasFlightDetails}
            onChange={(e) => update({ hasFlightDetails: e.target.checked })}
            className="w-5 h-5 accent-[var(--color-green)] rounded cursor-pointer"
          />
          <div>
            <span className="font-[family-name:var(--font-ogg)] text-base font-medium text-[var(--color-green)] block">
              I have my flight details available
            </span>
            <span className="text-xs text-[var(--color-green-70)]">
              Uncheck if your flights are not yet confirmed — you can provide them later.
            </span>
          </div>
        </label>

        {/* Flight Details Fields */}
        {data.hasFlightDetails && (
          <div className="space-y-6 pt-2 animate-fade-in">
            {/* Arrival Flight */}
            <div className="p-5 rounded-2xl border border-[var(--color-green)]/15 bg-[var(--color-beige)]/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--color-green)] font-semibold">
                <Plane className="w-4 h-4 text-[var(--color-green)]" />
                <span>Arrival Flight (Into CMB)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    min={data.startDate || todayStr}
                    value={data.arrivalDate}
                    onChange={(e) => {
                      update({ arrivalDate: e.target.value });
                      if (errors.arrivalDate) setErrors((prev) => ({ ...prev, arrivalDate: "" }));
                    }}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)] cursor-pointer"
                  />
                  {errors.arrivalDate && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.arrivalDate}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="time"
                    value={data.arrivalTime}
                    onChange={(e) => {
                      update({ arrivalTime: e.target.value });
                      if (errors.arrivalTime) setErrors((prev) => ({ ...prev, arrivalTime: "" }));
                    }}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)] cursor-pointer"
                  />
                  {errors.arrivalTime && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.arrivalTime}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Flight # <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.arrivalFlightNumber}
                    onChange={(e) => {
                      update({ arrivalFlightNumber: e.target.value });
                      if (errors.arrivalFlightNumber) setErrors((prev) => ({ ...prev, arrivalFlightNumber: "" }));
                    }}
                    placeholder="e.g. UL 504"
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)]"
                  />
                  {errors.arrivalFlightNumber && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.arrivalFlightNumber}</p>}
                </div>
              </div>
            </div>

            {/* Departure Flight */}
            <div className="p-5 rounded-2xl border border-[var(--color-green)]/15 bg-[var(--color-beige)]/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--color-green)] font-semibold">
                <Plane className="w-4 h-4 text-[var(--color-green)] rotate-90" />
                <span>Departure Flight (Out of CMB)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    min={data.arrivalDate || data.endDate || data.startDate || todayStr}
                    value={data.departureDate}
                    onChange={(e) => {
                      update({ departureDate: e.target.value });
                      if (errors.departureDate) setErrors((prev) => ({ ...prev, departureDate: "" }));
                    }}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)] cursor-pointer"
                  />
                  {errors.departureDate && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.departureDate}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="time"
                    value={data.departureTime}
                    onChange={(e) => {
                      update({ departureTime: e.target.value });
                      if (errors.departureTime) setErrors((prev) => ({ ...prev, departureTime: "" }));
                    }}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)] cursor-pointer"
                  />
                  {errors.departureTime && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.departureTime}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider opacity-70 mb-1 uppercase">
                    Flight # <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.departureFlightNumber}
                    onChange={(e) => {
                      update({ departureFlightNumber: e.target.value });
                      if (errors.departureFlightNumber) setErrors((prev) => ({ ...prev, departureFlightNumber: "" }));
                    }}
                    placeholder="e.g. EK 653"
                    className="w-full bg-[var(--color-white)] border border-[var(--color-green)]/20 rounded-xl px-3 py-2.5 text-sm font-[family-name:var(--font-ogg)]"
                  />
                  {errors.departureFlightNumber && <p className="text-red-600 text-[11px] mt-1 font-mono">{errors.departureFlightNumber}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center gap-1.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-[11px] sm:text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-5 py-3 sm:px-8 sm:py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-[11px] sm:text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm cursor-pointer"
        >
          <span>Continue to Itinerary</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
