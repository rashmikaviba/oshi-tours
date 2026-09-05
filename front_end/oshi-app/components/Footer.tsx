"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, User, ArrowUpRight } from "lucide-react";
import { handleEmailClick, GMAIL_COMPOSE_URL } from "@/lib/emailHelper";

const WhatsAppIcon = ({ className }: { className?: string }) => (
 <svg
 className={className}
 viewBox="0 0 24 24"
 fill="currentColor"
 aria-hidden="true"
 >
 <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21l4.604-1.208a8.943 8.943 0 0 0 4.445 1.185h.004c4.947 0 8.976-4.027 8.978-8.977a8.92 8.92 0 0 0-2.628-6.367zm-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.277c-.002 4.114-3.348 7.464-7.465 7.464zm4.095-5.586c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.879-.13.149-.261.168-.486.056-.225-.113-.949-.349-1.808-1.115-.668-.596-1.119-1.332-1.25-1.557-.13-.225-.014-.347.099-.459.101-.101.225-.262.337-.393.113-.131.149-.225.225-.375.075-.15.037-.281-.019-.393-.056-.113-.504-1.217-.691-1.666-.182-.437-.367-.378-.504-.385a3.6 3.6 0 0 0-.431-.008c-.149 0-.393.056-.599.281-.205.225-.786.767-.786 1.872 0 1.104.805 2.17 0.917 2.32.113.149 1.583 2.418 3.837 3.391.536.232.955.37 1.282.474.538.171 1.027.147 1.414.089.432-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.093-.205-.15-.43-.262z" />
 </svg>
);

export default function Footer() {
 return (
 <footer className="bg-[var(--color-green)] text-[var(--color-beige)] pt-16 pb-12 px-6 sm:px-12 border-t border-[var(--color-beige)]/10 font-sans">
 <div className="max-w-7xl mx-auto space-y-12">
 {/* Top Grid */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
 {/* Brand Identity */}
 <div className="md:col-span-5 space-y-4">
 <Link href="/" className="inline-block">
 <span className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl tracking-wide text-[var(--color-white)]">
 OSHĪ
 </span>
 </Link>
 <p className="font-[family-name:var(--font-newsreader-var)] text-base text-[var(--color-white-80)] max-w-md leading-relaxed">
 Private, design-led journeys and chauffeur-driven transport through Sri Lanka&apos;s rarest landscapes, wildlife, and living heritage, crafted entirely around you.
 </p>
 </div>

 {/* Direct Contact Information */}
 <div className="md:col-span-4 space-y-4">
 <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-beige)]/60 block mb-2">
 Direct Contact & Concierge
 </span>

 <div className="space-y-3.5 font-[family-name:var(--font-newsreader-var)] text-sm sm:text-base text-[var(--color-white-80)]">
 {/* Contact Person */}
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-white)] shrink-0">
 <User className="w-4 h-4" />
 </div>
 <div>
 <span className="text-[10px] font-mono text-[var(--color-beige)]/60 uppercase block">Contact Person</span>
 <span className="font-semibold text-white tracking-wide">OSHAN FERNANDO</span>
 </div>
 </div>

 {/* Email */}
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-white)] shrink-0">
 <Mail className="w-4 h-4" />
 </div>
 <div>
 <span className="text-[10px] font-mono text-[var(--color-beige)]/60 uppercase block">Email Inquiries</span>
 <a 
 href={GMAIL_COMPOSE_URL} 
 target="_blank"
 rel="noopener noreferrer"
 onClick={handleEmailClick}
 className="hover:text-white hover:underline transition-colors font-mono text-xs sm:text-sm text-white cursor-pointer pointer-events-auto relative z-10"
 >
 oshitourslanka@gmail.com
 </a>
 </div>
 </div>

 {/* Phone */}
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-white)] shrink-0">
 <Phone className="w-4 h-4" />
 </div>
 <div>
 <span className="text-[10px] font-mono text-[var(--color-beige)]/60 uppercase block">Phone Hotline</span>
 <a 
 href="tel:0773762612" 
 className="hover:text-white transition-colors font-mono text-xs sm:text-sm text-white"
 >
 0773762612
 </a>
 </div>
 </div>

 {/* Business WhatsApp */}
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
 <WhatsAppIcon className="w-4.5 h-4.5" />
 </div>
 <div>
 <span className="text-[10px] font-mono text-[var(--color-beige)]/60 uppercase block">Business WhatsApp</span>
 <a 
 href="https://wa.me/94728352612" 
 target="_blank" 
 rel="noopener noreferrer"
 className="hover:text-emerald-300 transition-colors font-mono text-xs sm:text-sm text-emerald-400 flex items-center gap-1 font-semibold"
 >
 <span>0728352612</span>
 <ArrowUpRight className="w-3.5 h-3.5" />
 </a>
 </div>
 </div>
 </div>
 </div>

 {/* Quick Navigation Links */}
 <div className="md:col-span-3 space-y-3">
 <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-beige)]/60 block mb-2">
 Explore Journeys
 </span>
 <ul className="space-y-2.5 text-sm font-[family-name:var(--font-newsreader-var)] text-[var(--color-white-80)]">
 <li>
 <Link href="/trip-planner" className="hover:text-[var(--color-white)] transition-colors">
 Custom Trip Planner
 </Link>
 </li>
 <li>
 <Link href="/#journeys" className="hover:text-[var(--color-white)] transition-colors">
 Curated Experiences
 </Link>
 </li>
 <li>
 <Link href="/experiences/chauffeur-transport-service" className="hover:text-[var(--color-white)] transition-colors">
 Chauffeur Transport Service
 </Link>
 </li>
 <li>
 <Link href="/blog" className="hover:text-[var(--color-white)] transition-colors">
 Journals & Essays
 </Link>
 </li>
 <li>
 <Link href="/about" className="hover:text-[var(--color-white)] transition-colors">
 About Us & Founder Story
 </Link>
 </li>
 </ul>
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="pt-8 border-t border-[var(--color-beige)]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-beige)]/50">
 <p>© {new Date().getFullYear()} OSHĪ Tours & Travels. All rights reserved.</p>
 <p className="tracking-wider uppercase">Unhurried & Private Ceylon Journeys</p>
 <p>
 Created by{" "}
 <a
 href="https://vibamadusanka.com"
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--color-beige)]/80 hover:text-white transition-colors underline underline-offset-4 font-semibold"
 >
 VIBA
 </a>
 </p>
 </div>
 </div>
 </footer>
 );
}
