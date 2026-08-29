import { type ExperienceData } from './hill-country-by-rail';

const transportOnlyService: ExperienceData = {
  slug: "highlands-wilds-golden-south-12-days",
  title: "Oshī Chauffeur-Driven Transport Service",
  tagline: "Private chauffeur-driven day-based vehicle service across Sri Lanka — maximum travel flexibility, total comfort, and transparent pricing without forced hotel packages.",
  heroImage: "/media/hero_5.jpg",
  gallery: [
    "/media/Colombo/i_1.jpeg",
    "/media/Sigiriya/i_1.jpeg",
    "/media/Kandy/i_1.jpeg",
    "/media/Nuwara%20Eliya/i_1.jpeg",
    "/media/Ella/I_1.jpeg",
    "/media/Galle/i_1.jpeg"
  ],
  location: "Island-Wide, Sri Lanka",
  durationDays: 1,
  groupSize: "1–40 guests",
  priceFrom: 95,
  currency: "USD",
  overview: "The Transport Service Package is a dedicated, day-based private vehicle service with an experienced chauffeur. We do not arrange or book hotel accommodation as part of this package, giving you complete freedom to choose and book your own stays independently.\n\nOur vehicle and driver remain at your disposal each day to take you safely, comfortably, and efficiently between your chosen destinations, heritage sites, national parks, and coastal retreats across Sri Lanka.",
  highlights: [
    "Experienced, courteous professional chauffeur for your entire trip",
    "Complimentary high-speed onboard Wi-Fi throughout the journey",
    "Day-based flexible service — travel to any location of your choice",
    "Vehicles matched precisely to passenger count & luggage needs",
    "No forced accommodation bundles — book your own preferred hotels",
    "Transparent daily pricing with zero hidden booking markups"
  ],
  included: [
    "Private air-conditioned vehicle matched to passenger count",
    "Professional English-speaking chauffeur-guide",
    "Complimentary onboard Wi-Fi connection",
    "Fuel, road tolls, parking fees & driver allowances",
    "Day-based island-wide transfers & excursion travel",
    "24/7 dedicated transport concierge support"
  ],
  itinerary: [], // No timeline for Transport Only Service
  packages: [
    {
      name: "Private Car (1–2 Pax)",
      price: 95,
      perks: [
        "Comfortable sedan car for solo travellers, couples or small families",
        "Professional English-speaking chauffeur",
        "Complimentary onboard Wi-Fi",
        "Full island-wide day flexibility"
      ]
    },
    {
      name: "Mini Micro Van (3–6 Pax)",
      price: 135,
      perks: [
        "Standard choice for small family groups with ample luggage space",
        "Professional English-speaking chauffeur",
        "Complimentary onboard Wi-Fi",
        "Full island-wide day flexibility"
      ]
    },
    {
      name: "Highroof Micro Van (7–10 Pax)",
      price: 175,
      perks: [
        "Recommended for mid-sized groups travelling together",
        "Professional English-speaking chauffeur",
        "Complimentary onboard Wi-Fi",
        "Full island-wide day flexibility"
      ]
    },
    {
      name: "Coach Bus (11–40 Pax)",
      price: 290,
      perks: [
        "For larger groups, corporate retreats or school tours",
        "Professional chauffeur & vehicle assistant",
        "Complimentary onboard Wi-Fi",
        "Dedicated group luggage capacity"
      ]
    }
  ],
  coordinates: { lat: 6.927, lng: 79.861 },
  region: "Island-Wide Transport",
  addOns: [
    { id: "english-guide-upgrade", label: "Specialist licensed national guide upgrade", price: 65 },
    { id: "child-seat", label: "Infant / Child safety seat installation", price: 15 },
    { id: "airport-vip-meet", label: "Airport VIP arrival page & meet service", price: 40 },
    { id: "water-coolbox", label: "Onboard chilled refreshment coolbox", price: 20 }
  ]
};

export default transportOnlyService;
