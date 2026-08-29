"use client";

import { TripPlannerFormData, PlaceItem } from "@/types/tripPlanner";
import ItineraryAccordion from "../ItineraryAccordion";
import { ArrowRight, ArrowLeft, Map } from "lucide-react";

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
            Search places or use pin-mode on the map to add destinations to each day of your expedition.
          </p>
        </div>

        {/* Mobile Map Preview Trigger Button */}
        {onOpenMobileMap && (
          <button
            type="button"
            onClick={onOpenMobileMap}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-wider uppercase shadow-md hover:bg-opacity-90 transition-all shrink-0"
          >
            <Map className="w-4 h-4" />
            <span>Open Map View</span>
          </button>
        )}
      </div>

      {/* Accordion Component */}
      <ItineraryAccordion
        itinerary={data.itinerary}
        startDate={data.startDate}
        endDate={data.endDate}
        onAddPlace={onAddPlace}
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-green)]/30 text-[var(--color-green)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--color-green)]/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-green)] text-[var(--color-beige)] rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-sm"
        >
          <span>Continue to Transport</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
