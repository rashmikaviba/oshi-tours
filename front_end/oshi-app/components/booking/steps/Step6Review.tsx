"use client";

import { BookingFormData } from "../types";
import { Loader2 } from "lucide-react";

interface Props {
  data: BookingFormData;
  prev: () => void;
  submit: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export default function Step6Review({ data, prev, submit, isSubmitting, error }: Props) {
  const SummaryRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="py-3 border-b border-[var(--color-green)]/10 flex flex-col sm:flex-row sm:justify-between gap-1">
      <span className="font-mono text-xs tracking-wider uppercase opacity-60">{label}</span>
      <span className="font-[family-name:var(--font-newsreader)] text-lg">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="text-[var(--color-green)]">
      <h3 className="font-[family-name:var(--font-grandslang)] text-2xl mb-6">Review Your Request</h3>
      <p className="font-[family-name:var(--font-newsreader)] text-lg opacity-80 mb-8">
        Please verify the details below before submitting. Our concierge will be in touch within 24 hours.
      </p>

      <div className="bg-white/30 p-6 rounded-sm border border-[var(--color-green)]/10 mb-8 space-y-2">
        <SummaryRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow label="Email" value={data.email} />
        <SummaryRow label="Phone" value={data.phone} />
        <SummaryRow label="Nationality" value={data.nationality} />
        <SummaryRow label="Travelers" value={data.numberOfTravelers} />
        
        <div className="pt-4 mt-2">
          <SummaryRow label="Journey Route" value={`${data.startLocation} ⟶ ${data.endLocation}`} />
          <SummaryRow label="Journey Dates" value={`${data.startDate} to ${data.endDate}`} />
          <SummaryRow label="Transport" value={data.transportPreference} />
        </div>

        {data.hasFlightDetails && (
          <div className="pt-4 mt-2">
            <SummaryRow label="Arrival" value={`${data.arrivalDate} @ ${data.arrivalTime} (${data.arrivalFlightNumber})`} />
            <SummaryRow label="Departure" value={`${data.departureDate} @ ${data.departureTime} (${data.departureFlightNumber})`} />
          </div>
        )}

        {data.customActivity && (
          <div className="pt-4 mt-2">
            <SummaryRow label="Custom Activity / Special Interest" value={data.customActivity} />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 mb-8 border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={submit}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 cursor-pointer shadow-md"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
