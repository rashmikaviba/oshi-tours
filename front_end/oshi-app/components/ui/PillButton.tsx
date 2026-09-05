"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  showArrow?: boolean;
}

export default function PillButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
  showArrow = true,
}: PillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    group relative inline-flex items-center justify-center gap-3
    px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full
    border border-[var(--color-green)] text-[var(--color-green)]
    font-[family-name:var(--font-ogg)] text-xs sm:text-base tracking-wide
    transition-colors duration-500 ease-[var(--ease-expo-out)]
    hover:text-[var(--color-white)]
    focus-visible:outline-2 focus-visible:outline-[var(--color-green)] focus-visible:outline-offset-4
    overflow-hidden select-none cursor-pointer
    ${className}
  `.trim();

  const content = (
    <>
      {/* Background sweep fill on hover */}
      <span
        className="absolute inset-0 bg-[var(--color-green)] transform origin-left transition-transform duration-500 ease-[var(--ease-expo-out)] scale-x-0 group-hover:scale-x-100 rounded-full"
        aria-hidden="true"
      />

      {/* Label and Arrow container */}
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-0.5">
        <span>{children}</span>
        {showArrow && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </motion.svg>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        aria-label={ariaLabel || typeof children === "string" ? String(children) : "See more"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || typeof children === "string" ? String(children) : "See more"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
