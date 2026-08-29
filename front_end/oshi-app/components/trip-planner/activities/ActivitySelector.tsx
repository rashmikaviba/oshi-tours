"use client";

import { useState } from "react";
import { ACTIVITY_PREFERENCES, ActivityPreference, ActivityItem } from "@/data/activityPreferences";
import { SelectedActivityPoint } from "@/types/tripPlanner";
import ActivityCard from "./ActivityCard";
import ActivityDetailsModal from "./ActivityDetailsModal";
import { Compass } from "lucide-react";

interface Props {
  selectedActivities: SelectedActivityPoint[];
  onToggleActivityPoint: (category: ActivityPreference, item: ActivityItem) => void;
}

export default function ActivitySelector({
  selectedActivities,
  onToggleActivityPoint,
}: Props) {
  const [activeModalActivity, setActiveModalActivity] = useState<ActivityPreference | null>(null);
  const [modalTriggerRef, setModalTriggerRef] = useState<React.RefObject<HTMLButtonElement | null> | undefined>(undefined);

  const handleOpenModal = (
    activity: ActivityPreference,
    triggerRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    setActiveModalActivity(activity);
    setModalTriggerRef(triggerRef);
  };

  const handleCloseModal = () => {
    setActiveModalActivity(null);
  };

  const totalSelectedPoints = selectedActivities.length;

  return (
    <div className="space-y-4 pt-2 animate-fade-in">
      {/* Activity Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] flex items-center gap-1.5 font-semibold">
          <Compass className="w-3.5 h-3.5 text-[var(--color-green)]" />
          Explore Activity Categories
        </span>
        <span className="text-xs font-mono font-bold text-[var(--color-green)] bg-[var(--color-green)]/10 px-3 py-1 rounded-full">
          {totalSelectedPoints > 0
            ? `${totalSelectedPoints} activity point${totalSelectedPoints > 1 ? "s" : ""} selected`
            : "0 selected"}
        </span>
      </div>

      {/* Grid of 11 Category Launcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACTIVITY_PREFERENCES.map((activity) => {
          const selectedCount = selectedActivities.filter(
            (s) => s.categoryId === activity.id
          ).length;

          return (
            <ActivityCard
              key={activity.id}
              activity={activity}
              selectedCount={selectedCount}
              onOpenModal={handleOpenModal}
            />
          );
        })}
      </div>

      {/* Category Details Modal for Point-Level Selection */}
      <ActivityDetailsModal
        activity={activeModalActivity}
        isOpen={Boolean(activeModalActivity)}
        selectedActivities={selectedActivities}
        onClose={handleCloseModal}
        onToggleActivityPoint={onToggleActivityPoint}
        triggerRef={modalTriggerRef}
      />
    </div>
  );
}
