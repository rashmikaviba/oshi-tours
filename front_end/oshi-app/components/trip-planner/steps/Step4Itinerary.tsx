"use client";

import { useState } from "react";
import { TripPlannerFormData, PlaceItem } from "@/types/tripPlanner";
import ItineraryAccordion from "../ItineraryAccordion";
import { ArrowRight, ArrowLeft, Map, AlertCircle } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  onAddPlace: (dateString: string, place: PlaceItem) => void;
  onRemovePlace: (dateString: string, placeId: string) => void;
  activePinDate: string | null;
  onTogglePinMode: (dateString: string) => void;
  onSelectPlaceCard?: (place: PlaceItem) => void;
  selectedPlaceId?: string;
  onOpenMobileMap?: () => void;
  next: () => void;
  prev: () => void;
}

export default function Step4Itinerary({
  data,
  onAddPlace,
  onRemovePlace,
  activePinDate,
  onTogglePinMode,
  onSelectPlaceCard,
  selectedPlaceId,
  onOpenMobileMap,
  next,
  prev,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    // Validate that every day in the itinerary has at least 1 place added
    const emptyDays = data.itinerary.filter((day) => day.places.length === 0);

    if (emptyDays.length > 0) {
      const dayLabels = emptyDays
        .map((d) => d.displayDate.split(",")[0])
        .join(", ");
      setError(
        `Each day must have at least 1 place added. Please select destinations for: ${dayLabels}.`
      );
      return;
    }

    setError(null);
    next();
  };

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
            Step 4 • Custom Itinerary Builder
          </span>
          <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
            Trip Places & Days
          </h3>
          <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
            Search places or use pin-mode on the map to add 1–3 destinations for each day of your expedition.
          </p>
        </div>

        {/* Mobile Map Preview Trigger Button */}
        {onOpenMobileMap && (
          <button
            type="button"
            onClick={onOpenMobileMap}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-wider uppercase shadow-md hover:bg-opacity-90 transition-all shrink-0 cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>Open Map View</span>
          </button>
        )}
      </div>

      {/* Validation Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-800 text-sm font-mono flex items-start gap-3 animate-fade-in shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Incomplete Days Warning</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Accordion Component */}
      <ItineraryAccordion
        itinerary={data.itinerary}
        startDate={data.startDate}
        endDate={data.endDate}
        onAddPlace={(dStr, place) => {
          onAddPlace(dStr, place);
          if (error) setError(null);
        }}
        onRemovePlace={onRemovePlace}
        activePinDate={activePinDate}
        onTogglePinMode={onTogglePinMode}
        onSelectPlaceCard={onSelectPlaceCard}
        selectedPlaceId={selectedPlaceId}
      />

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
          <span>Continue to Transport</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
