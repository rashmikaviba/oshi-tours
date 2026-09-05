import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export const metadata = {
 title: "Admin Dashboard, OSHĪ Luxury Travel",
 robots: { index: false, follow: false },
};

export default async function ProtectedDashboardLayout({ children }: { children: React.ReactNode }) {
 let userId: string | null = null;
 let sessionClaims: any = null;
 let user: any = null;

 try {
 const authData = await auth();
 userId = authData.userId;
 sessionClaims = authData.sessionClaims;
 if (userId) {
 user = await currentUser();
 }
 } catch (err: any) {
 console.warn("[ProtectedDashboardLayout] Auth check warning:", err.message);
 }

 // 1. Unauthenticated check -> Redirect to login
 if (!userId) {
 redirect("/admin/login");
 }

 // 2. Fetch Admin Role Metadata (Includes owner email as initial admin)
 const userEmail = user?.primaryEmailAddress?.emailAddress;
 const role =
 (sessionClaims?.metadata as any)?.role ||
 (sessionClaims?.publicMetadata as any)?.role ||
 (user?.publicMetadata as any)?.role ||
 (userEmail === "rajkumararashmika@gmail.com" ? "admin" : undefined);

 // 3. Authorization Check
 if (role !== "admin") {
 return (
 <div className="min-h-screen bg-[var(--color-beige)] flex flex-col items-center justify-center p-6 text-[var(--color-green)] text-center font-sans">
 <div className="max-w-md bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-red-200 shadow-xl space-y-4">
 <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto font-mono font-bold text-xl">
 403
 </div>
 <h1 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-red-950">
 Access Restricted
 </h1>
 <p className="text-sm text-red-900/80 leading-relaxed">
 Your signed-in account (<strong>{userEmail || "User"}</strong>) does not have administrator privileges required to access blog management.
 </p>
 <a
 href="/admin/login"
 className="inline-block px-6 py-3 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-widest uppercase hover:bg-[rgb(20,32,18)] transition-colors"
 >
 Sign In As Admin
 </a>
 </div>
 </div>
 );
 }

 return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
