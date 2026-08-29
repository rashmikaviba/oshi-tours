"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MapPin, Calendar, CheckCircle2, Sparkles, Tag, BookOpen } from "lucide-react";
import type { ItineraryDay } from "@/data/experiences/hill-country-by-rail";

interface DayActivityModalProps {
  day: ItineraryDay | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DayActivityModal({
  day,
  isOpen,
  onClose,
}: DayActivityModalProps) {
  // Prevent background page scrolling while modal is active
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!day) return null;

  const coverSrc = day.cityImage || day.images?.[0] || day.categoryImage || "/media/Sigiriya/i_1.jpeg";
  const hasPrimary = Boolean(day.primaryExcursions?.length);
  const hasRegional = Boolean(day.regionalExperiences?.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop Scrim */}
          <motion.div
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[var(--color-beige)] text-[var(--color-green)] border border-[var(--color-green)]/20 shadow-2xl overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            data-lenis-prevent="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer"
              aria-label="Close activity details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Banner */}
            <div className="relative w-full h-48 sm:h-60 lg:h-64 shrink-0 overflow-hidden">
              <Image
                src={coverSrc}
                alt={day.title}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(20,32,18)]/90 via-[rgb(20,32,18)]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2 text-white">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs font-semibold">
                    DAY {day.day}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                    4 NIGHTS 5 DAYS CULTURAL TRIANGLE TOUR
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-grandslang)] text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
                  {day.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-12rem)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[var(--color-green)]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Day Overview Summary */}
              <div className="space-y-4 pb-6 border-b border-[var(--color-green)]/15">
                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-green-70)] font-semibold">
                    DAY OVERVIEW & ITINERARY SUMMARY
                  </h4>
                  <p className="font-[family-name:var(--font-ogg)] text-base sm:text-lg text-[var(--color-green)] leading-relaxed">
                    {day.description}
                  </p>
                </div>

                {/* Historical & Cultural Note Callout */}
                {day.historicalNote && (
                  <div className="p-4 rounded-2xl bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 space-y-1.5">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-green)] font-semibold flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Historical & Cultural Note</span>
                    </h4>
                    <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] leading-relaxed font-light">
                      {day.historicalNote}
                    </p>
                  </div>
                )}
              </div>

              {/* Detailed Activity Grid (Two Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column: Included Activities */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-green)]/15">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-green)] font-semibold">
                      Included Activities
                    </h4>
                  </div>

                  {hasPrimary ? (
                    <div className="space-y-4">
                      {day.primaryExcursions?.map((act, i) => (
                        <div
                          key={i}
                          className="h-[185px] sm:h-[195px] p-5 rounded-2xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/15 flex flex-col justify-between hover:bg-[var(--color-green)]/10 transition-colors overflow-hidden"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <h5 className="font-[family-name:var(--font-grandslang)] text-base sm:text-lg font-semibold text-[var(--color-green)] leading-tight">
                                {act.title}
                              </h5>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {act.location && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">
                                  <MapPin className="w-2.5 h-2.5" />
                                  <span>{act.location}</span>
                                </span>
                              )}
                              {act.category && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">
                                  <Tag className="w-2.5 h-2.5" />
                                  <span>{act.category}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] leading-relaxed line-clamp-3">
                            {act.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] italic">
                      No included activity notes for this day.
                    </p>
                  )}
                </div>

                {/* Right Column: Optional Add-On Activities */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-green)]/15">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-green)] font-semibold">
                      Optional Add-On Activities
                    </h4>
                  </div>

                  {hasRegional ? (
                    <div className="space-y-4">
                      {day.regionalExperiences?.map((act, i) => (
                        <div
                          key={i}
                          className="h-[185px] sm:h-[195px] p-5 rounded-2xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/15 flex flex-col justify-between hover:bg-[var(--color-green)]/10 transition-colors overflow-hidden"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <h5 className="font-[family-name:var(--font-grandslang)] text-base sm:text-lg font-semibold text-[var(--color-green)] leading-tight">
                                {act.title}
                              </h5>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {act.location && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">
                                  <MapPin className="w-2.5 h-2.5" />
                                  <span>{act.location}</span>
                                </span>
                              )}
                              {act.season && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">
                                  <Calendar className="w-2.5 h-2.5" />
                                  <span>{act.season}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] leading-relaxed line-clamp-3">
                            {act.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-[family-name:var(--font-ogg)] text-sm text-[var(--color-green-70)] italic">
                      No optional add-on activity notes for this day.
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-[var(--color-green)]/15 flex items-center justify-between text-xs font-mono text-[var(--color-green-70)]">
                <span>All activities tailored by your private Sri Lanka specialist.</span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-[var(--color-green)] text-white hover:bg-black transition-colors font-semibold cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
