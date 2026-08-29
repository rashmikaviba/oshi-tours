"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LanguageSelector from "@/components/ui/LanguageSelector";

/* ═══════════════════════════════════════════════════════════
   Navbar — Transparent overlay navigation
   Enters from top as part of the final hero assembly.
   Fixed position, semi-transparent with backdrop blur.
   ═══════════════════════════════════════════════════════════ */

interface NavbarProps {
  isVisible?: boolean;
}

const NAV_LINKS = [
  { label: "Journeys", href: "/#journeys" },
  { label: "Trip Planner", href: "/trip-planner" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Journal", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const navVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Navbar({ isVisible = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16 py-5 bg-[var(--color-green)]/80 backdrop-blur-md"
          variants={prefersReducedMotion ? undefined : navVariants}
          initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
          animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
          role="banner"
        >
          {/* Fully transparent background */}

          <nav
            className="relative flex items-center justify-between max-w-[1440px] mx-auto"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* ── Logo ── */}
            <a
              href="/"
              className="font-[family-name:var(--font-grandslang-roman)] text-[var(--color-white)] text-xl md:text-2xl tracking-wide hover:text-[var(--color-beige)] transition-colors duration-300"
              aria-label="OSHĪ Home"
            >
              OSHĪ
            </a>

            {/* ── Desktop Links & Language Selector ── */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-newsreader-var)] text-[var(--color-white)]/90 text-sm tracking-[0.08em] hover:text-[var(--color-white)] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[var(--color-beige)] hover:after:w-full after:transition-all after:duration-500 after:ease-[var(--ease-expo-out)]"
                >
                  {link.label}
                </a>
              ))}

              {/* Language Selector */}
              <LanguageSelector />

              {/* Primary Nav CTA */}
              <a
                href="/trip-planner"
                className="font-[family-name:var(--font-newsreader-var)] text-[var(--color-green)] bg-[var(--color-beige)] px-5 py-2.5 text-sm tracking-[0.1em] uppercase hover:bg-[var(--color-white)] transition-colors duration-400 ease-[var(--ease-expo-out)] rounded-full font-medium"
              >
                Plan Your Journey
              </a>
            </div>

            {/* ── Mobile Header Actions (Language Selector + Hamburger) ── */}
            <div className="flex md:hidden items-center gap-3">
              <LanguageSelector />

              <button
                className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-[var(--color-white)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <span
                  className={`block w-5 h-px bg-current transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-current transition-transform duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
                />
              </button>
            </div>
          </nav>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden absolute left-0 right-0 top-full bg-[var(--color-green)]/95 backdrop-blur-md px-6 py-8"
              >
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="font-[family-name:var(--font-newsreader-var)] text-[var(--color-white)] text-lg tracking-[0.08em]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}

                  <a
                    href="/trip-planner"
                    className="font-[family-name:var(--font-newsreader-var)] text-[var(--color-green)] bg-[var(--color-beige)] px-5 py-3 text-sm tracking-[0.1em] uppercase text-center mt-2 rounded-full font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plan Your Journey
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
