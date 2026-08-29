"use client";

import { useState } from "react";
import { BookingFormData } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: BookingFormData;
  update: (data: Partial<BookingFormData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step2Flight({ data, update, next, prev }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (data.hasFlightDetails) {
      if (!data.arrivalDate) newErrors.arrivalDate = "Required";
      if (!data.arrivalTime) newErrors.arrivalTime = "Required";
      if (!data.arrivalFlightNumber) newErrors.arrivalFlightNumber = "Required";
      
      if (!data.departureDate) newErrors.departureDate = "Required";
      if (!data.departureTime) newErrors.departureTime = "Required";
      if (!data.departureFlightNumber) newErrors.departureFlightNumber = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) next();
  };

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Flight Details</h3>

      <div className="mb-8 flex items-center gap-3">
        <input
          type="checkbox"
          id="hasFlights"
          checked={data.hasFlightDetails}
          onChange={(e) => update({ hasFlightDetails: e.target.checked })}
          className="w-5 h-5 accent-[var(--color-green)] cursor-pointer"
        />
        <label htmlFor="hasFlights" className="font-[family-name:var(--font-newsreader)] text-lg cursor-pointer select-none">
          I have my flight details ready
        </label>
      </div>

      <AnimatePresence>
        {data.hasFlightDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/30 p-6 sm:p-8 rounded-sm mb-6 border border-[var(--color-green)]/10">
              <h4 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-6">Arrival</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Date</label>
                  <input
                    type="date"
                    value={data.arrivalDate}
                    onChange={(e) => update({ arrivalDate: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                  />
                  {errors.arrivalDate && <p className="text-red-700 text-xs mt-1">{errors.arrivalDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Time</label>
                  <input
                    type="time"
                    value={data.arrivalTime}
                    onChange={(e) => update({ arrivalTime: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                  />
                  {errors.arrivalTime && <p className="text-red-700 text-xs mt-1">{errors.arrivalTime}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Flight No.</label>
                  <input
                    type="text"
                    value={data.arrivalFlightNumber}
                    onChange={(e) => update({ arrivalFlightNumber: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                    placeholder="e.g. UL 504"
                  />
                  {errors.arrivalFlightNumber && <p className="text-red-700 text-xs mt-1">{errors.arrivalFlightNumber}</p>}
                </div>
              </div>
            </div>

            <div className="bg-white/30 p-6 sm:p-8 rounded-sm mb-8 border border-[var(--color-green)]/10">
              <h4 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-6">Departure</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Date</label>
                  <input
                    type="date"
                    value={data.departureDate}
                    onChange={(e) => update({ departureDate: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                  />
                  {errors.departureDate && <p className="text-red-700 text-xs mt-1">{errors.departureDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Time</label>
                  <input
                    type="time"
                    value={data.departureTime}
                    onChange={(e) => update({ departureTime: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg"
                  />
                  {errors.departureTime && <p className="text-red-700 text-xs mt-1">{errors.departureTime}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider opacity-70 mb-1">Flight No.</label>
                  <input
                    type="text"
                    value={data.departureFlightNumber}
                    onChange={(e) => update({ departureFlightNumber: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-green)]/30 py-2 focus:outline-none focus:border-[var(--color-green)] transition-colors font-[family-name:var(--font-newsreader)] text-lg placeholder-[var(--color-green)]/30"
                    placeholder="e.g. UL 505"
                  />
                  {errors.departureFlightNumber && <p className="text-red-700 text-xs mt-1">{errors.departureFlightNumber}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
