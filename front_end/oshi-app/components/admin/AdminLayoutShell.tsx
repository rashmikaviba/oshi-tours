"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { FileText, PlusCircle, Globe, Menu, X } from "lucide-react";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export default function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin/blog", label: "Blog Articles", icon: FileText },
    { href: "/admin/blog/new", label: "New Article", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-beige)]/80 backdrop-blur-lg border-r border-[var(--color-green)]/15 p-6 flex-shrink-0 relative z-20">
        {/* Brand Logo */}
        <div className="mb-10 pt-2">
          <Link href="/admin/blog" className="block group">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-green)]/60 block mb-1">
              Admin Portal
            </span>
            <span className="font-[family-name:var(--font-grandslang-roman)] text-3xl tracking-wide block text-[var(--color-green)] group-hover:opacity-80 transition-opacity">
              OSHĪ
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-green)] text-[var(--color-beige)] shadow-md shadow-[var(--color-green)]/20"
                    : "text-[var(--color-green)]/80 hover:bg-[var(--color-green)]/10 hover:text-[var(--color-green)]"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Live Site Link & User Controls */}
        <div className="pt-6 border-t border-[var(--color-green)]/15 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[var(--color-green)]/70 hover:text-[var(--color-green)] transition-colors px-2 py-1"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Public Site
            </span>
            <span>↗</span>
          </Link>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-[var(--color-green)]/10">
            <UserButton />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate text-[var(--color-green)]">
                {user?.fullName || user?.firstName || "Admin User"}
              </p>
              <p className="text-[10px] text-[var(--color-green)]/60 truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[var(--color-beige)]/90 backdrop-blur-md border-b border-[var(--color-green)]/15 sticky top-0 z-30">
        <Link href="/admin/blog" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)] font-semibold">
            OSHĪ
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-green)]/60 border-l border-[var(--color-green)]/20 pl-2">
            Admin
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <UserButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[var(--color-green)]/20 text-[var(--color-green)] hover:bg-[var(--color-green)]/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[var(--color-beige)] border-b border-[var(--color-green)]/20 p-6 z-20 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-[var(--color-green)] text-[var(--color-beige)]"
                      : "text-[var(--color-green)]/80 hover:bg-[var(--color-green)]/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[var(--color-green)]/15">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-green)]/70 py-2"
            >
              <Globe className="w-4 h-4" /> View Public Website
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 sm:p-10 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
