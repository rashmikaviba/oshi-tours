"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TripPlannerFormData,
  INITIAL_TRIP_PLANNER_DATA,
  PlaceItem,
  ItineraryDay,
  generateDateRangeStrings,
  formatDateHeading,
} from "@/types/tripPlanner";
import dynamic from "next/dynamic";
import TripPlannerStepper from "./TripPlannerStepper";
import Step1Basics from "./steps/Step1Basics";
import Step2Personal from "./steps/Step2Personal";
import Step3Flight from "./steps/Step3Flight";
import Step4Itinerary from "./steps/Step4Itinerary";
import Step5Transport from "./steps/Step5Transport";
import Step6Additional from "./steps/Step6Additional";
import Step7Review from "./steps/Step7Review";
import { X, Map, Compass } from "lucide-react";

const TripPlannerMap = dynamic(() => import("./TripPlannerMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] bg-[var(--color-beige)] flex flex-col items-center justify-center text-[var(--color-green)] p-6">
      <Compass className="w-8 h-8 text-[var(--color-green)]/40 animate-spin mb-2" />
      <span className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)]">
        Loading Map Engine...
      </span>
    </div>
  ),
});

const STEPS = [
  { id: 1, title: "Plan Basics" },
  { id: 2, title: "Personal" },
  { id: 3, title: "Flights" },
  { id: 4, title: "Itinerary" },
  { id: 5, title: "Transport" },
  { id: 6, title: "Additional" },
  { id: 7, title: "Review" },
];

export default function TripPlannerContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TripPlannerFormData>(INITIAL_TRIP_PLANNER_DATA);
  const [activePinDate, setActivePinDate] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(undefined);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);

  // Update Form State Partial
  const updateFormData = (fields: Partial<TripPlannerFormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };

      // If startDate or endDate changed, regenerate itinerary dates preserving existing places
      if (fields.startDate !== undefined || fields.endDate !== undefined) {
        const newStart = fields.startDate !== undefined ? fields.startDate : prev.startDate;
        const newEnd = fields.endDate !== undefined ? fields.endDate : prev.endDate;

        if (newStart && newEnd && new Date(newEnd) >= new Date(newStart)) {
          const newDateStrings = generateDateRangeStrings(newStart, newEnd);
          const existingMap: Record<string, PlaceItem[]> = {};
          prev.itinerary.forEach((day) => {
            existingMap[day.dateString] = day.places;
          });

          // Check if any removed date contained places
          const removedDatesWithPlaces = prev.itinerary.filter(
            (day) => !newDateStrings.includes(day.dateString) && day.places.length > 0
          );

          if (removedDatesWithPlaces.length > 0) {
            const confirmChange = window.confirm(
              `Changing travel dates will remove ${removedDatesWithPlaces.length} day(s) containing saved places. Do you wish to proceed?`
            );
            if (!confirmChange) {
              return prev; // Cancel change if user declines
            }
          }

          const newItinerary: ItineraryDay[] = newDateStrings.map((dStr) => ({
            dateString: dStr,
            displayDate: formatDateHeading(dStr),
            places: existingMap[dStr] || [],
          }));

          updated.itinerary = newItinerary;
        }
      }

      return updated;
    });
  };

  // Add Place to Day (Enforcing max 3 places per day limit)
  const handleAddPlace = useCallback((dateString: string, place: PlaceItem) => {
    let limitReached = false;
    setFormData((prev) => {
      const targetDay = prev.itinerary.find((day) => day.dateString === dateString);
      if (targetDay && targetDay.places.length >= 3) {
        limitReached = true;
        return prev;
      }

      return {
        ...prev,
        itinerary: prev.itinerary.map((day) => {
          if (day.dateString === dateString) {
            return {
              ...day,
              places: [...day.places, place],
            };
          }
          return day;
        }),
      };
    });

    if (limitReached) {
      alert("Maximum 3 places allowed per day. Please remove an existing place before adding another.");
      return;
    }

    setSelectedPlaceId(place.id);
  }, []);

  // Remove Place from Day
  const handleRemovePlace = useCallback((dateString: string, placeId: string) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((day) => {
        if (day.dateString === dateString) {
          return {
            ...day,
            places: day.places.filter((p) => p.id !== placeId),
          };
        }
        return day;
      }),
    }));
  }, []);

  // Toggle Pin Mode for a Day
  const handleTogglePinMode = useCallback((dateString: string) => {
    setActivePinDate((prev) => (prev === dateString ? null : dateString));
    // On mobile, automatically open map sheet when pinning is activated
    if (window.innerWidth < 1024) {
      setIsMobileMapOpen(true);
    }
  }, []);

  // Add Pin Place
  const handlePinAddPlace = useCallback((dateString: string, place: PlaceItem) => {
    handleAddPlace(dateString, place);
    setActivePinDate(null);
  }, [handleAddPlace]);

  // Step Navigation
  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (stepId: number) => {
    if (stepId >= 1 && stepId <= STEPS.length) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activePinDateDisplay = formData.itinerary.find(
    (d) => d.dateString === activePinDate
  )?.displayDate;

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-[var(--color-beige)] overflow-x-hidden">
      {/* ── LEFT PANEL: Form Stepper & Step Views (52% width on desktop) ── */}
      <div className="w-full lg:w-[52%] px-6 sm:px-10 lg:px-14 py-8 flex flex-col justify-between min-h-full">
        <div>
          {/* Multi-Step Stepper */}
          <TripPlannerStepper
            currentStep={currentStep}
            totalSteps={STEPS.length}
            steps={STEPS}
            onStepClick={goToStep}
          />

          {/* Render Active Step Component */}
          <div className="mt-4 transition-all duration-300">
            {currentStep === 1 && (
              <Step1Basics data={formData} update={updateFormData} next={nextStep} />
            )}
            {currentStep === 2 && (
              <Step2Personal
                data={formData}
                update={updateFormData}
                next={nextStep}
                prev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <Step3Flight
                data={formData}
                update={updateFormData}
                next={nextStep}
                prev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <Step4Itinerary
                data={formData}
                onAddPlace={handleAddPlace}
                onRemovePlace={handleRemovePlace}
                activePinDate={activePinDate}
                onTogglePinMode={handleTogglePinMode}
                onSelectPlaceCard={(place) => setSelectedPlaceId(place.id)}
                selectedPlaceId={selectedPlaceId}
                onOpenMobileMap={() => setIsMobileMapOpen(true)}
                next={nextStep}
                prev={prevStep}
              />
            )}
            {currentStep === 5 && (
              <Step5Transport
                data={formData}
                update={updateFormData}
                next={nextStep}
                prev={prevStep}
              />
            )}
            {currentStep === 6 && (
              <Step6Additional
                data={formData}
                update={updateFormData}
                next={nextStep}
                prev={prevStep}
              />
            )}
            {currentStep === 7 && (
              <Step7Review data={formData} goToStep={goToStep} prev={prevStep} />
            )}
          </div>
        </div>

        {/* Footer Brand Note */}
        <div className="mt-12 pt-6 border-t border-[var(--color-green)]/10 text-center sm:text-left text-xs font-mono text-[var(--color-green-70)]">
          OSHĪ Private Expeditions &middot; Bespoke Sri Lanka Travel Planner
        </div>
      </div>

      {/* ── RIGHT PANEL: Persistent Google Map (48% width on desktop) ── */}
      <div className="hidden lg:block lg:w-[48%] sticky top-[80px] h-[calc(100vh-80px)] border-l border-[var(--color-green)]/15">
        <TripPlannerMap
          itinerary={formData.itinerary}
          activePinDate={activePinDate}
          activePinDateDisplay={activePinDateDisplay}
          onCancelPinMode={() => setActivePinDate(null)}
          onPinAddPlace={handlePinAddPlace}
          onMarkerSelectPlace={(place) => setSelectedPlaceId(place.id)}
          selectedPlaceId={selectedPlaceId}
        />
      </div>

      {/* ── MOBILE FULL-SCREEN MAP MODAL/SHEET ── */}
      {isMobileMapOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="w-full h-[90vh] bg-[var(--color-beige)] rounded-t-3xl overflow-hidden flex flex-col shadow-2xl relative animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-white)] border-b border-[var(--color-green)]/15">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-[var(--color-green)]" />
                <span className="font-[family-name:var(--font-grandslang)] text-lg text-[var(--color-green)]">
                  Interactive Route Map
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMapOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--color-green)]/10 text-[var(--color-green)]"
                aria-label="Close Map"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Map Container inside Modal */}
            <div className="flex-1 w-full h-full relative">
              <TripPlannerMap
                itinerary={formData.itinerary}
                activePinDate={activePinDate}
                activePinDateDisplay={activePinDateDisplay}
                onCancelPinMode={() => setActivePinDate(null)}
                onPinAddPlace={(dStr, place) => {
                  handlePinAddPlace(dStr, place);
                  setIsMobileMapOpen(false); // Close map after pin added on mobile
                }}
                onMarkerSelectPlace={(place) => setSelectedPlaceId(place.id)}
                selectedPlaceId={selectedPlaceId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
