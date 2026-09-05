import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
 title: "Admin Sign In, OSHĪ Luxury Travel",
 robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
 const { userId } = await auth();

 // If already signed in, redirect to admin blog management
 if (userId) {
 redirect("/admin/blog");
 }

 return (
 <div className="min-h-screen bg-[var(--color-beige)] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
 {/* Background Decorative Scrim */}
 <div className="absolute inset-0 bg-radial from-[var(--color-green)]/5 via-transparent to-transparent pointer-events-none" />

 {/* OSHĪ Brand Identity Header */}
 <div className="text-center mb-8 relative z-10 space-y-1">
 <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--color-green)]/60 block">
 Management Portal
 </span>
 <h1 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl text-[var(--color-green)] tracking-wide">
 OSHĪ <span className="italic font-normal">Admin</span>
 </h1>
 </div>

 {/* Clerk Sign In Card */}
 <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md p-2 rounded-3xl border border-[var(--color-green)]/15 shadow-2xl flex justify-center">
 <SignIn
 path="/admin/login"
 fallbackRedirectUrl="/admin/blog"
 appearance={{
 elements: {
 rootBox: "w-full",
 cardBox: "w-full shadow-none bg-transparent",
 card: "w-full bg-transparent shadow-none p-4",
 headerTitle: "font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)]",
 headerSubtitle: "text-xs text-[var(--color-green)]/70 font-sans",
 formButtonPrimary:
 "bg-[var(--color-green)] hover:bg-[rgb(20,32,18)] text-[var(--color-beige)] rounded-xl py-3 font-medium transition-all duration-200",
 formFieldInput:
 "rounded-xl border-[var(--color-green)]/20 bg-white/80 focus:border-[var(--color-green)] focus:ring-1 focus:ring-[var(--color-green)] text-[var(--color-green)]",
 footerActionLink: "text-[var(--color-green)] hover:underline font-medium",
 },
 }}
 />
 </div>

 {/* Footer Disclaimer */}
 <p className="mt-8 text-xs font-mono text-[var(--color-green)]/50 tracking-wider text-center relative z-10">
 CONFIDENTIAL & RESTRICTED ACCESS SYSTEM
 </p>
 </div>
 );
}
