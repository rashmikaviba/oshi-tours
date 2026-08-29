"use client";

import { useRef } from "react";
import Image from "next/image";
import { ActivityPreference } from "@/data/activityPreferences";
import { ArrowRight } from "lucide-react";

interface Props {
  activity: ActivityPreference;
  selectedCount: number;
  onOpenModal: (
    activity: ActivityPreference,
    triggerRef: React.RefObject<HTMLButtonElement | null>
  ) => void;
}

export default function ActivityCard({
  activity,
  selectedCount,
  onOpenModal,
}: Props) {
  const cardButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onOpenModal(activity, cardButtonRef);
  };

  return (
    <button
      ref={cardButtonRef}
      type="button"
      onClick={handleClick}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-[var(--color-green)]/20 bg-[var(--color-beige)]/60 hover:bg-[var(--color-beige)]/80 hover:border-[var(--color-green)]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]"
    >
      {/* Category Image Header */}
      <div className="relative w-full h-36 sm:h-40 overflow-hidden">
        <Image
          src={activity.imageSrc}
          alt={activity.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(20,32,18)]/80 via-transparent to-transparent" />

        {/* Top-Right Informational Badge (if points selected) */}
        {selectedCount > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-[10px] font-semibold tracking-wider uppercase shadow-sm">
              {selectedCount} Selected
            </span>
          </div>
        )}

        {/* Activity Count Badge */}
        <div className="absolute bottom-2.5 left-3">
          <span className="px-2.5 py-1 rounded-full bg-black/50 text-white/90 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm">
            {activity.activities.length} Activities
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <h4 className="font-[family-name:var(--font-grandslang)] text-xl text-[var(--color-green)] leading-snug font-semibold group-hover:text-emerald-950 transition-colors">
            {activity.title}
          </h4>
          <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] line-clamp-2 mt-1 leading-relaxed">
            {activity.introduction}
          </p>
        </div>

        {/* View Details Action Indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-green)]/10 text-xs">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase text-[var(--color-green)] font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>View Details & Select</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}
