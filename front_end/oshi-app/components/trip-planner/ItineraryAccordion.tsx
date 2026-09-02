"use client";

import { useState } from "react";
import { ItineraryDay, PlaceItem, formatShortRange } from "@/types/tripPlanner";
import PlaceSearchInput from "./PlaceSearchInput";
import PlaceCard from "./PlaceCard";
import { ChevronDown, ChevronUp, MapPin, Calendar, Plus, AlertCircle } from "lucide-react";

interface Props {
  itinerary: ItineraryDay[];
  startDate: string;
  endDate: string;
  onAddPlace: (dateString: string, place: PlaceItem) => void;
  onRemovePlace: (dateString: string, placeId: string) => void;
  activePinDate: string | null;
  onTogglePinMode: (dateString: string) => void;
  onSelectPlaceCard?: (place: PlaceItem) => void;
  selectedPlaceId?: string;
}

export default function ItineraryAccordion({
  itinerary,
  startDate,
  endDate,
  onAddPlace,
  onRemovePlace,
  activePinDate,
  onTogglePinMode,
  onSelectPlaceCard,
  selectedPlaceId,
}: Props) {
  // First day expanded by default
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (itinerary.length > 0) {
      initial[itinerary[0].dateString] = true;
    }
    return initial;
  });

  const toggleDay = (dateStr: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [dateStr]: !prev[dateStr],
    }));
  };

  const rangeTag = formatShortRange(startDate, endDate);

  if (itinerary.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15 text-center">
        <Calendar className="w-8 h-8 text-[var(--color-green)]/30 mx-auto mb-3" />
        <h4 className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)] mb-1">
          No Travel Dates Selected
        </h4>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)]">
          Please return to Step 1 to select valid start and end dates for your trip.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Range Tag & Summary Bar */}
      <div className="flex items-center justify-between bg-[var(--color-beige)]/60 p-4 rounded-2xl border border-[var(--color-green)]/15">
        <div>
          <h3 className="font-[family-name:var(--font-grandslang)] text-2xl text-[var(--color-green)]">
            Itinerary Route
          </h3>
          <p className="text-xs text-[var(--color-green-70)] font-mono uppercase tracking-wider">
            {itinerary.length} {itinerary.length === 1 ? 'Day' : 'Days'} Total &middot; Min 1, Max 3 places per day
          </p>
        </div>

        {rangeTag && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)] text-xs font-mono font-semibold tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>{rangeTag}</span>
          </div>
        )}
      </div>

      {/* Accordion Days List */}
      <div className="space-y-3">
        {itinerary.map((day, dayIdx) => {
          const isExpanded = expandedDates[day.dateString] ?? (dayIdx === 0);
          const isPinningActive = activePinDate === day.dateString;
          const placeCount = day.places.length;
          const isFull = placeCount >= 3;
          const isEmpty = placeCount === 0;

          return (
            <div
              key={day.dateString}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-[var(--color-beige)]/80 border-[var(--color-green)]/30 shadow-sm"
                  : "bg-[var(--color-beige)]/40 border-[var(--color-green)]/15 hover:bg-[var(--color-beige)]/60"
              }`}
            >
              {/* Day Accordion Header */}
              <div
                onClick={() => toggleDay(day.dateString)}
                className="flex items-center justify-between p-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--color-green)]/10 text-[var(--color-green)] flex items-center justify-center font-mono text-xs font-bold">
                    D{dayIdx + 1}
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-grandslang)] text-lg text-[var(--color-green)]">
                      {day.displayDate}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-green-70)] mt-0.5 font-mono">
                      <span>{placeCount}/3 places</span>
                      {isEmpty && (
                        <span className="text-red-600/90 font-mono text-[11px] font-semibold flex items-center gap-1">
                          &bull; 1 place required
                        </span>
                      )}
                      {isFull && (
                        <span className="text-emerald-700 font-mono text-[11px] font-semibold">
                          &bull; Max limit reached
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDay(day.dateString);
                    }}
                    className="p-1 text-[var(--color-green)]/60 hover:text-[var(--color-green)]"
                    aria-label={isExpanded ? "Collapse day" : "Expand day"}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-[var(--color-green)]/10 space-y-4">
                  {/* Limit Banner or Action Search Input Bar */}
                  {isFull ? (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Maximum 3 places reached for this day (3/3).</span>
                      </span>
                      <span className="text-[11px] opacity-80">Remove a place to add another</span>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex-1">
                        <PlaceSearchInput
                          onPlaceSelect={(place) => onAddPlace(day.dateString, place)}
                          placeholder={`Add place to ${day.displayDate.split(',')[0]} (${placeCount + 1}/3)...`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => onTogglePinMode(day.dateString)}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 shrink-0 ${
                          isPinningActive
                            ? "bg-[var(--color-green)] text-[var(--color-beige)] ring-2 ring-[var(--color-green)]/30 font-semibold"
                            : "bg-[var(--color-green)]/10 text-[var(--color-green)] hover:bg-[var(--color-green)]/20"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{isPinningActive ? "Pinning Active" : "Add Pin"}</span>
                      </button>
                    </div>
                  )}

                  {/* Added Places List */}
                  {placeCount > 0 ? (
                    <div className="space-y-3 pt-2">
                      {day.places.map((place, pIdx) => (
                        <PlaceCard
                          key={place.id}
                          place={place}
                          index={pIdx}
                          onRemove={(id) => onRemovePlace(day.dateString, id)}
                          onSelect={onSelectPlaceCard}
                          isSelected={selectedPlaceId === place.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-dashed border-red-400/40 bg-red-500/5 text-center">
                      <p className="font-[family-name:var(--font-ogg)] text-sm text-red-700 italic mb-2 font-medium">
                        At least 1 place must be added for this day.
                      </p>
                      <p className="text-xs text-[var(--color-green-70)] font-mono">
                        Use the search input above or click <span className="font-semibold text-[var(--color-green)]">"Add Pin"</span> to drop a marker on the map.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
