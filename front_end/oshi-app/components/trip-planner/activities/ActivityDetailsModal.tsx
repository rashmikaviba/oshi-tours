"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityPreference, ActivityItem } from "@/data/activityPreferences";
import { SelectedActivityPoint } from "@/types/tripPlanner";
import { useLenis } from "@/lib/smooth-scroll-provider";
import { X, Sparkles, Check } from "lucide-react";

interface Props {
  activity: ActivityPreference | null;
  isOpen: boolean;
  selectedActivities: SelectedActivityPoint[];
  onClose: () => void;
  onToggleActivityPoint: (category: ActivityPreference, item: ActivityItem) => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function ActivityDetailsModal({
  activity,
  isOpen,
  selectedActivities,
  onClose,
  onToggleActivityPoint,
  triggerRef,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Lock background page scroll, pause Lenis, and trap focus
  useEffect(() => {
    if (!isOpen) return;

    // Pause global Lenis scroll controller while modal is open
    lenis?.stop();

    // 1. Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const savedScrollY = window.scrollY;

    // 2. Save previous inline styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyLeft = document.body.style.left;
    const originalBodyRight = document.body.style.right;
    const originalBodyWidth = document.body.style.width;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // 3. Fix background body completely in place
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 4. Focus initial close button
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 5. Handle Keyboard Trap & Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 6. Cleanup & restore exact scroll position and restart Lenis
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = originalBodyLeft;
      document.body.style.right = originalBodyRight;
      document.body.style.width = originalBodyWidth;
      document.body.style.paddingRight = originalBodyPaddingRight;

      window.scrollTo(0, savedScrollY);
      window.removeEventListener("keydown", handleKeyDown);

      lenis?.start();

      if (triggerRef && triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef, lenis]);

  if (typeof window === "undefined" || !isOpen || !activity) return null;

  // Count points selected in this specific category
  const categorySelectedCount = selectedActivities.filter(
    (s) => s.categoryId === activity.id
  ).length;

  // Handle wheel events anywhere on the modal shell
  const handleModalWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // If mouse wheel is used over header/footer/padding (outside scroll container),
    // forward scroll delta to the inner activity content container
    if (!container.contains(e.target as Node)) {
      container.scrollTop += e.deltaY;
    }
  };

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-black/60 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={modalRef}
          data-lenis-prevent
          data-lenis-prevent-touch
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onWheel={handleModalWheel}
          className="relative w-full max-w-2xl bg-[var(--color-beige)] text-[var(--color-green)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-green)]/20 flex flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[85vh] shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image Banner */}
          <div className="relative w-full h-44 sm:h-56 shrink-0">
            <Image
              src={activity.imageSrc}
              alt={activity.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(20,32,18)]/90 via-[rgb(20,32,18)]/40 to-transparent" />

            {/* Accessible Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close activity details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Title & Badge on Banner */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase mb-1">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                {activity.activities.length} Available Activities
              </span>
              <h2
                id="activity-modal-title"
                className="font-[family-name:var(--font-grandslang)] text-2xl sm:text-3xl text-white drop-shadow-md"
              >
                {activity.title}
              </h2>
            </div>
          </div>

          {/* Modal Content Scroll Area (The ONLY scrollable region) */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            data-lenis-prevent-touch
            className="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1 min-h-0 overscroll-contain text-[var(--color-green)] [scrollbar-width:thin] [scrollbar-color:rgba(59,89,55,0.3)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[var(--color-green)]/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {/* Category Introduction Panel */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15">
              <p className="font-[family-name:var(--font-ogg)] text-sm sm:text-base leading-relaxed text-[var(--color-green)]">
                {activity.introduction}
              </p>
            </div>

            {/* Selectable Activity Points List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono text-xs tracking-wider uppercase text-[var(--color-green-70)] font-semibold">
                  Select Experiences
                </h3>
                <span className="text-xs font-mono text-[var(--color-green)] font-medium">
                  {categorySelectedCount} selected in category
                </span>
              </div>

              <div className="space-y-3">
                {activity.activities.map((item) => {
                  const isPointSelected = selectedActivities.some(
                    (s) => s.categoryId === activity.id && s.activityId === item.id
                  );

                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                        isPointSelected
                          ? "bg-[var(--color-beige)] border-[var(--color-green)] shadow-sm ring-1 ring-[var(--color-green)]/20 text-[var(--color-green)]"
                          : "bg-[var(--color-beige)]/40 border-[var(--color-green)]/15 hover:border-[var(--color-green)]/35 hover:bg-[var(--color-beige)]/70 text-[var(--color-green)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isPointSelected}
                        onChange={() => onToggleActivityPoint(activity, item)}
                        className="w-5 h-5 mt-0.5 accent-[var(--color-green)] rounded cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-[family-name:var(--font-grandslang)] text-base font-semibold text-[var(--color-green)]">
                            {item.name}
                          </h4>
                          {isPointSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-[var(--color-green)] font-bold bg-[var(--color-green)]/10 px-2.5 py-0.5 rounded-full">
                              <Check className="w-3 h-3 stroke-[3]" /> Selected
                            </span>
                          )}
                        </div>
                        <p className="font-[family-name:var(--font-ogg)] text-xs sm:text-sm text-[var(--color-green-70)] leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fixed Modal Footer Action Bar */}
          <div className="p-4 sm:p-5 bg-[var(--color-beige)] border-t border-[var(--color-green)]/15 flex items-center justify-between shrink-0">
            <span className="font-mono text-xs text-[var(--color-green-70)]">
              {categorySelectedCount > 0
                ? `${categorySelectedCount} activity point${categorySelectedCount > 1 ? "s" : ""} selected`
                : "No activity points selected"}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs tracking-wider uppercase hover:bg-opacity-90 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
