"use client";

import { useState } from "react";
import { TripPlannerFormData, SelectedActivityPoint } from "@/types/tripPlanner";
import { CheckCircle2, Edit2, Loader2, Send, MapPin, AlertCircle, ArrowLeft } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  goToStep: (stepId: number) => void;
  prev: () => void;
}

export default function Step7Review({ data, goToStep, prev }: Props) {
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!consent) return;

    // Check if any day has 0 places
    const emptyDays = data.itinerary.filter((day) => day.places.length === 0);
    if (emptyDays.length > 0) {
      const dayNames = emptyDays.map((d) => d.displayDate.split(",")[0]).join(", ");
      setErrorMessage(`Cannot submit trip plan: every day must have at least 1 place selected. Please edit step 4 to add destinations for: ${dayNames}.`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const payload = {
        submissionType: "trip-planner",
        ...data,
      };

      const response = await fetch(`${apiUrl}/api/trip-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (resData.success) {
        setReference(resData.reference);
      } else {
        setErrorMessage(resData.message || "Failed to submit trip plan request. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error submitting trip plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group selected activity points by category
  const groupedActivities = (data.selectedActivities || []).reduce<
    Record<string, SelectedActivityPoint[]>
  >((acc, point) => {
    const key = point.categoryTitle;
    if (!acc[key]) acc[key] = [];
    acc[key].push(point);
    return acc;
  }, {});

  // Success State View
  if (reference) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15 text-center space-y-6 animate-fade-in shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
            Enquiry Received
          </span>
          <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)] mb-2">
            Your Custom Route is Submitted
          </h3>
          <div className="inline-block px-4 py-2 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] font-mono text-sm font-bold tracking-wider my-2">
            Reference &middot; #{reference}
          </div>
          <p className="font-[family-name:var(--font-ogg)] text-base text-[var(--color-green-70)] max-w-md mx-auto leading-relaxed mt-2">
            Thank you, {data.firstName}. Our lead travel designer will review your custom itinerary and contact you at <strong className="text-[var(--color-green)]">{data.email}</strong> within 24 hours to begin refining your journey.
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--color-green)]/10">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  const totalPlacesCount = data.itinerary.reduce((acc, day) => acc + day.places.length, 0);

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 7 • Final Review
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Review & Submit Enquiry
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          Please review your custom travel plan details before submitting to our private curation team.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Summary Cards Grid */}
      <div className="space-y-4">
        {/* Section 1: Plan Basics */}
        <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--color-green)]/10 pb-2">
            <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
              1. Plan Basics
            </h4>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-green)] hover:underline"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-xs text-[var(--color-green-70)] block">Plan Name:</span>
              <strong className="font-[family-name:var(--font-grandslang)] text-base">{data.planName}</strong>
            </div>
            <div>
              <span className="text-xs text-[var(--color-green-70)] block">Travel Window:</span>
              <span>{data.startDate} to {data.endDate}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Details */}
        <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--color-green)]/10 pb-2">
            <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
              2. Personal Details
            </h4>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-green)] hover:underline"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-xs text-[var(--color-green-70)] block">Guest Name:</span>
              <span>{data.firstName} {data.lastName}</span>
            </div>
            <div>
              <span className="text-xs text-[var(--color-green-70)] block">Contact Email:</span>
              <span>{data.email}</span>
            </div>
            <div>
              <span className="text-xs text-[var(--color-green-70)] block">Phone / Nationality:</span>
              <span>{data.phone} ({data.nationality})</span>
            </div>
          </div>
        </div>

        {/* Section 3: Flight Details */}
        <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--color-green)]/10 pb-2">
            <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
              3. Flight Logistics
            </h4>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-green)] hover:underline"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          {data.hasFlightDetails ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-[var(--color-green-70)] block">Arrival:</span>
                <span>{data.arrivalDate} @ {data.arrivalTime} ({data.arrivalFlightNumber})</span>
              </div>
              <div>
                <span className="text-xs text-[var(--color-green-70)] block">Departure:</span>
                <span>{data.departureDate} @ {data.departureTime} ({data.departureFlightNumber})</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-green-70)] italic">
              Flight details not provided yet.
            </p>
          )}
        </div>

        {/* Section 4: Itinerary Places Summary */}
        <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--color-green)]/10 pb-2">
            <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
              4. Custom Daily Itinerary ({data.itinerary.length} Days, {totalPlacesCount} Places)
            </h4>
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-green)] hover:underline"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
            {data.itinerary.map((day) => (
              <div key={day.dateString} className="text-xs">
                <span className="font-bold text-[var(--color-green)]">{day.displayDate}:</span>
                {day.places.length > 0 ? (
                  <ul className="mt-1 space-y-1 pl-4">
                    {day.places.map((p, pIdx) => (
                      <li key={p.id} className="text-[var(--color-green-70)] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[var(--color-green)] shrink-0" />
                        <span>{pIdx + 1}. {p.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-[var(--color-green-70)] italic ml-2">No places added</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Transport & Section 6: Additional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
            <div className="flex items-center justify-between mb-2 border-b border-[var(--color-green)]/10 pb-2">
              <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
                5. Transport
              </h4>
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="text-xs font-mono text-[var(--color-green)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="text-sm font-medium">{data.transportPreference}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
            <div className="flex items-center justify-between mb-2 border-b border-[var(--color-green)]/10 pb-2">
              <h4 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
                6. Preferences
              </h4>
              <button
                type="button"
                onClick={() => goToStep(6)}
                className="text-xs font-mono text-[var(--color-green)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="text-xs text-[var(--color-green-70)] mb-2">
              Channel: <strong className="text-[var(--color-green)]">{data.communicationPreference}</strong>
            </p>

            <div className="mb-2">
              <span className="text-xs text-[var(--color-green-70)] block mb-1">Activities:</span>
              {data.hasActivities && data.selectedActivities && data.selectedActivities.length > 0 ? (
                <div className="space-y-2 mt-1.5 pl-1">
                  {Object.entries(groupedActivities).map(([categoryTitle, points]) => (
                    <div key={categoryTitle} className="text-xs">
                      <span className="font-semibold font-[family-name:var(--font-grandslang)] text-[var(--color-green)] block">
                        {categoryTitle}
                      </span>
                      <ul className="pl-3 space-y-0.5 mt-0.5 border-l-2 border-[var(--color-green)]/20">
                        {points.map((pt) => (
                          <li
                            key={`${pt.categoryId}-${pt.activityId}`}
                            className="text-[var(--color-green-70)] flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--color-green)] shrink-0" />
                            <span>{pt.activityName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-[var(--color-green-70)] italic">No activities selected</span>
              )}
            </div>

            {data.customActivity && (
              <p className="text-xs text-[var(--color-green-70)] mt-1 truncate">
                Custom Activity: <strong className="text-[var(--color-green)]">{data.customActivity}</strong>
              </p>
            )}
            {data.medicalConditions && (
              <p className="text-xs text-[var(--color-green-70)] mt-1 truncate">
                Medical/Diet: <strong className="text-[var(--color-green)]">{data.medicalConditions}</strong>
              </p>
            )}
            {data.specialRequests && (
              <p className="text-xs text-[var(--color-green-70)] mt-1 truncate">
                Note: {data.specialRequests}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-[var(--color-green)] rounded cursor-pointer shrink-0"
        />
        <span className="text-xs font-[family-name:var(--font-ogg)] text-[var(--color-green)] leading-relaxed">
          I confirm that all provided details and itinerary places are accurate. I understand that this is a private enquiry and an OSHĪ travel designer will curate final pricing and logistics for my review.
        </span>
      </label>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prev}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-[11px] sm:text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors shrink-0 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!consent || isSubmitting}
          className="inline-flex items-center gap-1.5 px-5 py-3 sm:px-10 sm:py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-[11px] sm:text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Trip Plan Request</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
