"use client";

import { TripPlannerFormData, SelectedActivityPoint } from "@/types/tripPlanner";
import { ActivityPreference, ActivityItem } from "@/data/activityPreferences";
import ActivitySelector from "../activities/ActivitySelector";
import { MessageSquare, Heart, Compass, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  data: TripPlannerFormData;
  update: (fields: Partial<TripPlannerFormData>) => void;
  next: () => void;
  prev: () => void;
}

const COMM_OPTIONS = ["Email", "WhatsApp", "Phone Call"];

export default function Step6Additional({ data, update, next, prev }: Props) {
  // Toggle top-level activities checkbox with confirmation if selections exist
  const handleToggleHasActivities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (!checked) {
      if (data.selectedActivities && data.selectedActivities.length > 0) {
        const confirmClear = window.confirm(
          "Disabling Activities will clear your current activity selections. Do you wish to proceed?"
        );
        if (!confirmClear) return;
      }
      update({ hasActivities: false, selectedActivities: [] });
    } else {
      update({ hasActivities: true });
    }
  };

  // Toggle individual activity point selection
  const handleToggleActivityPoint = (
    category: ActivityPreference,
    item: ActivityItem
  ) => {
    const current = data.selectedActivities || [];
    const exists = current.some(
      (s) => s.categoryId === category.id && s.activityId === item.id
    );

    if (exists) {
      update({
        selectedActivities: current.filter(
          (s) => !(s.categoryId === category.id && s.activityId === item.id)
        ),
      });
    } else {
      const newPoint: SelectedActivityPoint = {
        categoryId: category.id,
        categoryTitle: category.title,
        activityId: item.id,
        activityName: item.name,
      };
      update({
        selectedActivities: [...current, newPoint],
      });
    }
  };

  return (
    <div className="text-[var(--color-green)] space-y-6">
      <div>
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green-70)] block mb-1">
          Step 6 • Preferences & Customization
        </span>
        <h3 className="font-[family-name:var(--font-grandslang)] text-3xl text-[var(--color-green)]">
          Additional Information
        </h3>
        <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] mt-1">
          Share activity preferences, dietary requirements, or preferred communication channels.
        </p>
      </div>

      <div className="bg-[var(--color-beige)]/60 p-6 sm:p-8 rounded-3xl border border-[var(--color-green)]/15 space-y-6">
        {/* Preferred Communication */}
        <div>
          <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
            Preferred Communication Channel
          </label>
          <div className="flex flex-wrap gap-3">
            {COMM_OPTIONS.map((opt) => {
              const isSelected = data.communicationPreference === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update({ communicationPreference: opt })}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                    isSelected
                      ? "bg-[var(--color-green)] text-[var(--color-beige)] font-semibold shadow-sm"
                      : "bg-[var(--color-beige)]/60 text-[var(--color-green)] border border-[var(--color-green)]/20 hover:bg-[var(--color-beige)]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top-Level Activities Checkbox Section */}
        <div className="pt-2 border-t border-[var(--color-green)]/10">
          <label className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/20 cursor-pointer select-none transition-colors hover:bg-[var(--color-beige)]/80 hover:border-[var(--color-green)]/40">
            <input
              type="checkbox"
              checked={Boolean(data.hasActivities)}
              onChange={handleToggleHasActivities}
              className="w-5 h-5 accent-[var(--color-green)] rounded cursor-pointer shrink-0"
            />
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[var(--color-green)] shrink-0" />
              <div>
                <span className="font-[family-name:var(--font-grandslang)] text-lg text-[var(--color-green)] font-semibold block leading-tight">
                  Activities
                </span>
                <span className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green-70)] block">
                  Include specialized activity & experience preferences in your trip plan
                </span>
              </div>
            </div>
          </label>

          {/* Conditional Multi-Select Activity Cards Grid */}
          {data.hasActivities && (
            <div className="mt-4 pl-1">
              <ActivitySelector
                selectedActivities={data.selectedActivities || []}
                onToggleActivityPoint={handleToggleActivityPoint}
              />
            </div>
          )}
        </div>

        {/* Medical & Dietary */}
        <div className="pt-2 border-t border-[var(--color-green)]/10">
          <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
            Dietary or Medical Considerations (Optional)
          </label>
          <div className="relative">
            <Heart className="absolute left-4 top-3.5 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
            <input
              type="text"
              value={data.medicalConditions}
              onChange={(e) => update({ medicalConditions: e.target.value })}
              placeholder="e.g. Vegetarian, Gluten-free, Mobility restrictions"
              className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs font-mono tracking-wider opacity-70 mb-2 uppercase">
            Special Requests / Custom Notes (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
            <textarea
              rows={3}
              value={data.specialRequests}
              onChange={(e) => update({ specialRequests: e.target.value })}
              placeholder="Any specific luxury villa preferences, anniversary celebrations, or custom timing requests..."
              className="w-full bg-[var(--color-beige)]/40 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-4 py-3 font-[family-name:var(--font-ogg)] text-base text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)] transition-colors"
            />
          </div>
        </div>
      </div>

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
          <span>Review & Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
