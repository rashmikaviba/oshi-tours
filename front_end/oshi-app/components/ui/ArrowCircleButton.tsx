"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArrowCircleButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
  isParentHovered?: boolean;
  size?: "default" | "compact";
}

export default function ArrowCircleButton({
  href,
  onClick,
  className = "",
  ariaLabel,
  isParentHovered = false,
  size = "default",
}: ArrowCircleButtonProps) {
  const isCompact = size === "compact";

  // Enforce >=44px tap target across all breakpoints (w-11 = 44px, w-12 = 48px, w-14 = 56px)
  const circleDimensions = isCompact
    ? "w-11 h-11 sm:w-12 sm:h-12"
    : "w-12 h-12 sm:w-14 sm:h-14";

  const iconDimensions = isCompact
    ? "w-4.5 h-4.5 sm:w-5 sm:h-5"
    : "w-5 h-5 sm:w-5.5 sm:h-5.5";

  const circleContent = (
    <div
      className={`
        relative flex items-center justify-center
        ${circleDimensions} rounded-full
        bg-[rgb(20,32,18)] text-[var(--color-white)]
        shadow-none
        transition-all duration-500 ease-[var(--ease-expo-out)]
        group-hover:scale-105 group-hover:bg-[var(--color-green)] group-hover:shadow-none
        focus-visible:outline-2 focus-visible:outline-[var(--color-beige)] focus-visible:outline-offset-4
        select-none flex-shrink-0
        ${className}
      `.trim()}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${iconDimensions} transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:translate-x-1 sm:group-hover:translate-x-1.5`}
        animate={isParentHovered ? { x: isCompact ? 3 : 4 } : { x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </motion.svg>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className="inline-block rounded-full focus-visible:outline-none shrink-0"
      >
        {circleContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="inline-block rounded-full focus-visible:outline-none shrink-0"
      >
        {circleContent}
      </button>
    );
  }

  return circleContent;
}


