"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown } from "lucide-react";

const UKFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 60 30" aria-hidden="true">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const FranceFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 3 2" aria-hidden="true">
    <rect width="1" height="2" fill="#002395" />
    <rect width="1" height="2" x="1" fill="#FFFFFF" />
    <rect width="1" height="2" x="2" fill="#ED2939" />
  </svg>
);

const GermanyFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 5 3" aria-hidden="true">
    <rect width="5" height="1" y="0" fill="#000000" />
    <rect width="5" height="1" y="1" fill="#DD0000" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
);

const NetherlandsFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 9 6" aria-hidden="true">
    <rect width="9" height="2" y="0" fill="#AE1C28" />
    <rect width="9" height="2" y="2" fill="#FFFFFF" />
    <rect width="9" height="2" y="4" fill="#21468B" />
  </svg>
);

const SpainFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 750 500" aria-hidden="true">
    <rect width="750" height="500" fill="#AA1523" />
    <rect width="750" height="250" y="125" fill="#FFC400" />
  </svg>
);

const PolandFlag = () => (
  <svg className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-white/30 shadow-xs" viewBox="0 0 16 10" aria-hidden="true">
    <rect width="16" height="5" y="0" fill="#FFFFFF" />
    <rect width="16" height="5" y="5" fill="#DC143C" />
  </svg>
);

export interface LanguageOption {
  code: string;
  name: string;
  FlagComponent: React.ComponentType;
  shortName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", FlagComponent: UKFlag, shortName: "EN" },
  { code: "fr", name: "Français", FlagComponent: FranceFlag, shortName: "FR" },
  { code: "de", name: "Deutsch", FlagComponent: GermanyFlag, shortName: "DE" },
  { code: "nl", name: "Nederlands", FlagComponent: NetherlandsFlag, shortName: "NL" },
  { code: "es", name: "Español", FlagComponent: SpainFlag, shortName: "ES" },
  { code: "pl", name: "Polski", FlagComponent: PolandFlag, shortName: "PL" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read saved language from cookie on mount & initialize Google Translate script
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }

    // Define global callback if not present
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,de,nl,es,pl",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load Google Translate script dynamically if not already loaded
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Handle outside clicks to close dropdown
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set cookie for Google Translate
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;

    // Update select element inside Google Translate widget
    const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const ActiveFlag = activeLangObj.FlagComponent;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden Google Translate element mount container */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-white)]/10 text-[var(--color-white)] hover:bg-[var(--color-white)]/20 border border-[var(--color-white)]/20 text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Select website language"
      >
        <ActiveFlag />
        <span className="font-semibold">{activeLangObj.shortName}</span>
        <ChevronDown className={`w-3 h-3 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--color-green)] text-white border border-[var(--color-beige)]/20 shadow-2xl backdrop-blur-md p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-1.5 border-b border-[var(--color-beige)]/10 text-[10px] font-mono tracking-widest uppercase text-[var(--color-beige)]/60">
            Select Language
          </div>
          <div className="py-1 space-y-0.5 max-h-60 overflow-y-auto">
            {LANGUAGES.map((lang) => {
              const FlagComp = lang.FlagComponent;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left cursor-pointer ${
                    currentLang === lang.code
                      ? "bg-[var(--color-beige)] text-[var(--color-green)] font-semibold"
                      : "hover:bg-white/10 text-white/90"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagComp />
                    <span>{lang.name}</span>
                  </div>
                  <span className={`text-[10px] uppercase ${currentLang === lang.code ? "text-[var(--color-green)]/70" : "text-white/60"}`}>
                    {lang.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
