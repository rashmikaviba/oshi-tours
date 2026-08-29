import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import SmoothScrollProvider from "@/lib/smooth-scroll-provider";
import StickySocialBar from "@/components/ui/StickySocialBar";

/* ═══════════════════════════════════════════════════════════
   Font Loading
   GrandSlang (display serif) for headings
   Newsreader (Google Font) for body, labels, buttons
   ═══════════════════════════════════════════════════════════ */

const grandSlang = localFont({
  src: [
    {
      path: "../public/fonts/grandslang/GrandSlang-Roman/GrandSlang-Roman.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-grandslang-roman",
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader-var",
  display: "swap",
});

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "OSHĪ — Luxury Sri Lanka Travel | Curated Journeys",
  description:
    "Private, design-led journeys through Sri Lanka's rarest landscapes, wildlife, and living heritage — crafted entirely around you.",
  openGraph: {
    title: "OSHĪ — Luxury Sri Lanka Travel",
    description:
      "Private, design-led journeys through Sri Lanka's rarest landscapes, wildlife, and living heritage.",
    type: "website",
  },
};

/* ── Root Layout ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPubKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ||
    "pk_test_c3VwZXJiLWxhZHlidWctNDYzMi5jbGVyay5hY2NvdW50cy5kZXYk";

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        variables: {
          colorPrimary: "#2C3E2D",
          colorBackground: "#F4F5F0",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="en" className={`${grandSlang.variable} ${newsreader.variable}`} suppressHydrationWarning>
        <body suppressHydrationWarning>
          <SmoothScrollProvider>
            <StickySocialBar />
            {children}
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
