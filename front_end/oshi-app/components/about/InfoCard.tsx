"use client";

import React from "react";
import { handleEmailClick, GMAIL_COMPOSE_URL } from "@/lib/emailHelper";

interface InfoCardProps {
  onContactClick?: () => void;
}

export default function InfoCard({ onContactClick }: InfoCardProps) {
  const pillTags = [
    { label: "Private Guides", icon: "✦" },
    { label: "5–14 Day Trips", icon: "⏱" },
    { label: "Bespoke Routes", icon: "✧" },
    { label: "Sunset Safaris", icon: "☀" },
  ];

  return (
    <div
      className="group relative w-full h-full flex flex-col justify-between py-2 sm:py-4 bg-transparent"
      data-about-card="info"
    >
      {/* Top section: Icon + Copy + Pills */}
      <div>
        {/* Top-left small circular badge with compass/explore icon */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--color-green)]/25 bg-[var(--color-green)]/5 flex items-center justify-center text-[var(--color-green)] mb-6 sm:mb-8 transition-transform duration-500 group-hover:scale-105 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-5.5 sm:h-5.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>

        {/* Short paragraph about how trips are crafted */}
        <p className="font-[family-name:var(--font-ogg)] font-light text-[clamp(0.95rem,1.35vw,1.18rem)] leading-relaxed text-[var(--color-green)] mb-6 sm:mb-8">
          Explore Sri Lanka&apos;s rarest sanctuaries with itineraries crafted entirely from scratch. Every private expedition is paired with personal naturalists, remote tea bungalows, and scenic stops along the island&apos;s most breathtaking routes.
        </p>

        {/* Small pill tags grid */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {pillTags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-[family-name:var(--font-ogg)] font-medium bg-[var(--color-green)]/10 text-[var(--color-green)] border border-[var(--color-green)]/20 tracking-wide"
            >
              <span aria-hidden="true" className="opacity-75 text-[10px]">
                {tag.icon}
              </span>
              <span>{tag.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom buttons row: Contact Us + small circular arrow button */}
      <div className="relative z-20 flex items-center gap-3 w-full sm:w-auto pt-2 min-w-0 pointer-events-auto">
        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleEmailClick}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 min-h-[44px] sm:min-h-[48px] rounded-full bg-[var(--color-green)] text-[var(--color-white)] font-[family-name:var(--font-ogg)] text-xs sm:text-sm tracking-widest uppercase font-medium hover:bg-[rgb(40_62_36)] shadow-md hover:shadow-lg transition-all duration-300 shrink-0 cursor-pointer pointer-events-auto relative z-10"
        >
          <span>Contact Us</span>
        </a>

        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleEmailClick}
          aria-label="Contact Us email compose window"
          className="w-11 h-11 sm:w-12 sm:h-12 min-h-[44px] min-w-[44px] rounded-full bg-[var(--color-green)] text-[var(--color-white)] hover:bg-[rgb(40_62_36)] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center shrink-0 cursor-pointer pointer-events-auto relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 sm:group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
