/* ═══════════════════════════════════════════════════════════
 OSHĪ, Luxury Sri Lanka Travel
 Curated Journeys Data Array (5 Journeys)
 ═══════════════════════════════════════════════════════════ */

export interface Journey {
 id: string;
 title: string;
 description: string;
 eyebrow: string;
 duration: string;
 image: string;
 localFallback: string;
 href: string;
 variant: "feature" | "compact";
}

export const CURATED_JOURNEYS: Journey[] = [
 {
 id: "ultimate-sri-lanka-adventure-15-days",
 title: "14 Nights 15 Days Ultimate Sri Lanka Adventure",
 description:
 "The ultimate 15-day circuit, Millennium Elephants, Sigiriya, Polonnaruwa, indigenous Vedda village at Dambana, Kandy, highland train to Ella, Yala safaris, Mirissa blue whales, Galle Fort and Lunuganga.",
 eyebrow: "THE COMPREHENSIVE ISLAND CIRCUIT",
 duration: "15 Days · Private Route",
 image: "/media/card_image 5.jpg",
 localFallback: "/media/card_image 5.jpg",
 href: "/experiences/ultimate-sri-lanka-adventure-15-days",
 variant: "feature",
 },
 {
 id: "cultural-triangle-5-days",
 title: "4 Nights 5 Days Cultural Triangle Tour",
 description:
 "Sigiriya Rock Citadel, 2,000-year-old Dambulla UNESCO caves, rural village lotus leaf dining, wild elephant safari, Kandy Sacred Tooth Relic Temple, and Colombo capital tour.",
 eyebrow: "SIGIRIYA, KANDY & COLOMBO",
 duration: "5 Days · Private Route",
 image: "/media/card_image 1.jpg",
 localFallback: "/media/card_image 1.jpg",
 href: "/experiences/cultural-triangle-5-days",
 variant: "compact",
 },
 {
 id: "sri-lanka-highlights-8-days",
 title: "7 Nights 8 Days Sri Lanka Highlights Tour",
 description:
 "Negombo, Cultural Triangle, Sigiriya Rock, Dambulla caves, Kandy Tooth Relic Temple, Nuwara Eliya tea estate, Nanu Oya to Ella scenic train, Yala leopard safari, and Galle Fort.",
 eyebrow: "NEGOMBO TO GALLE VIA HILL COUNTRY & YALA",
 duration: "8 Days · Private Route",
 image: "/media/card_image 2.jpg",
 localFallback: "/media/card_image 2.jpg",
 href: "/experiences/sri-lanka-highlights-8-days",
 variant: "compact",
 },
 {
 id: "sri-lanka-grand-discovery-11-days",
 title: "10 Nights 11 Days Grand Discovery Tour",
 description:
 "Wilpattu National Park leopard safaris, Sigiriya, Polonnaruwa ancient city cycling, Dambulla Cave Temple, Kandy Tooth Relic, highland rail to Ella, Udawalawe Transit Home, and Galle.",
 eyebrow: "WILPATTU, CULTURAL TRIANGLE & SOUTH",
 duration: "11 Days · Private Route",
 image: "/media/card_image 3.jpg",
 localFallback: "/media/card_image 3.jpg",
 href: "/experiences/sri-lanka-grand-discovery-11-days",
 variant: "compact",
 },
 {
 id: "chauffeur-transport-service",
 title: "Oshī Chauffeur Transport Service",
 description:
 "Chauffeur-driven private vehicle service across Sri Lanka, maximum travel flexibility, free onboard Wi-Fi, matched vehicle fleet, and zero forced hotel bundles.",
 eyebrow: "DAY-BASED PRIVATE VEHICLE & DRIVER",
 duration: "Flexible · Day-Based Service",
 image: "/media/card_image 4.jpg",
 localFallback: "/media/card_image 4.jpg",
 href: "/experiences/chauffeur-transport-service",
 variant: "compact",
 },
];
