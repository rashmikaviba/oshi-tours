"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { handleEmailClick, GMAIL_COMPOSE_URL } from "@/lib/emailHelper";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TripAdvisorIcon = ({ className }: { className?: string }) => (
  <Image
    src="/media/TripAdvisor.png"
    alt="TripAdvisor"
    width={20}
    height={20}
    className={`object-contain ${className}`}
    unoptimized
  />
);

export default function StickySocialBar() {
  const socialLinks = [
    {
      name: "TripAdvisor",
      icon: TripAdvisorIcon,
      href: "https://www.tripadvisor.com/Attraction_Review-g612384-d25355076-Reviews-Oshi_tours-Aluthgama_Western_Province.html",
      ariaLabel: "View OSHĪ Tours on TripAdvisor",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://web.facebook.com/oshitourslanka/?_rdc=1&_rdr#",
      ariaLabel: "Visit OSHĪ Tours on Facebook",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: "https://www.instagram.com/oshitours/",
      ariaLabel: "Follow OSHĪ Tours on Instagram",
    },
    {
      name: "Email",
      icon: Mail,
      href: GMAIL_COMPOSE_URL,
      ariaLabel: "Email OSHĪ Tours",
    },
  ];

  return (
    <aside
      className="fixed left-3 sm:left-6 top-[65%] sm:top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-auto"
      aria-label="Social media links"
    >
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] border border-[var(--color-beige)]/20 shadow-2xl backdrop-blur-md">
        {socialLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={item.name === "Email" ? handleEmailClick : undefined}
              aria-label={item.ariaLabel}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--color-beige)]/80 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-[var(--ease-expo-out)] cursor-pointer"
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-125 transition-transform duration-300 ease-[var(--ease-expo-out)]" />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
