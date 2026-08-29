"use client";

import React from "react";
import { Mail } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
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

export default function StickySocialBar() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://facebook.com",
      ariaLabel: "Visit OSHĪ Tours on Facebook",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: "https://instagram.com",
      ariaLabel: "Follow OSHĪ Tours on Instagram",
    },
    {
      name: "Gmail",
      icon: Mail,
      href: "mailto:oshitourslanka@gmail.com",
      ariaLabel: "Email OSHĪ Tours via Gmail",
    },
  ];

  return (
    <aside 
      className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-auto"
      aria-label="Social media links"
    >
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] border border-[var(--color-beige)]/20 shadow-2xl backdrop-blur-md">
        {socialLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={item.ariaLabel}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--color-beige)]/80 hover:text-white hover:bg-white/15 transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Floating Left Tooltip */}
              <span className="absolute left-12 px-2.5 py-1 rounded-lg bg-[var(--color-green)] text-white text-[11px] font-mono tracking-wider whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 border border-[var(--color-beige)]/20">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
      <div className="w-[1px] h-10 bg-[var(--color-green)]/20 hidden sm:block" />
    </aside>
  );
}
