import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripPlannerContainer from "@/components/trip-planner/TripPlannerContainer";

export const metadata: Metadata = {
 title: "OSHĪ, Custom Luxury Trip Planner | Bespoke Sri Lanka Routes",
 description:
 "Design your private Sri Lanka itinerary with interactive maps, custom daily place curation, and executive ground support from OSHĪ Luxury Travel.",
};

export default function TripPlannerPage() {
 return (
 <main className="relative min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] selection:bg-[var(--color-green-40)] selection:text-[var(--color-white)] flex flex-col justify-between">
 <div>
 {/* ── Global Overlay Header ── */}
 <div className="relative z-50">
 <Navbar isVisible={true} />
 </div>

 {/* Spacer for Fixed Navbar */}
 <div className="h-[80px]" />

 {/* ── Main Trip Planner Split-Screen Container ── */}
 <TripPlannerContainer />
 </div>

 {/* ── Global Footer ── */}
 <Footer />
 </main>
 );
}
