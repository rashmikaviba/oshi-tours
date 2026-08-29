export interface ActivityDetail {
  title: string;
  description: string;
  location?: string;
  season?: string;
  category?: string;
  image?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  images: string[];
  cityImage?: string;
  categoryImage?: string;
  historicalNote?: string;
  primaryExcursions?: ActivityDetail[];
  regionalExperiences?: ActivityDetail[];
}

export interface Package {
  id?: string;
  name: string;
  price: number;
  perks: string[];
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export interface ExperienceData {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  location: string;
  durationDays: number;
  groupSize: string;
  priceFrom: number;
  currency: string;
  overview: string;
  highlights: string[];
  included: string[];
  itinerary: ItineraryDay[];
  packages: Package[];
  coordinates: { lat: number; lng: number };
  region: string;
  addOns: AddOn[];
}

const hillCountryByRail: ExperienceData = {
  slug: "hill-country-by-rail",
  title: "Hill Country by Rail",
  tagline:
    "A private vintage rail journey through Ceylon's emerald highlands, staying in exclusive colonial bungalows above the clouds.",
  heroImage:
    "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=1920&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop",
  ],
  location: "Kandy → Ella, Sri Lanka",
  durationDays: 5,
  groupSize: "2–8 guests",
  priceFrom: 2850,
  currency: "USD",
  overview:
    "Steeped in colonial heritage and surrounded by misty peaks, the Hill Country by Rail journey takes you back to an era of slow, elegant travel. Board Sri Lanka’s iconic blue train as it winds through emerald tea plantations, dramatic mountain passes, and waterfalls cascading into deep valleys.\n\nYour base throughout this journey will be handpicked luxury tea planter bungalows and boutique retreats, where private butler service, afternoon high tea, and open fireplaces come standard.",
  highlights: [
    "Private observation class seats on the iconic Kandy to Ella train",
    "Stay in restored 19th-century colonial tea planter bungalows",
    "Guided tea plucking and private tea tasting with a master blender",
    "Sunrise trek to Little Adam's Peak and the Nine Arch Bridge",
    "Private chef-curated dining featuring local organic ingredients",
  ],
  included: [
    "4 nights in luxury boutique accommodation",
    "Daily breakfast, lunch, and gourmet dinner",
    "First-class train tickets (Kandy to Ella)",
    "Private air-conditioned vehicle with chauffeur-guide",
    "All entrance fees and guided excursion costs",
    "24/7 dedicated concierge service",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kandy & Sacred Heritage",
      description:
        "Arrive in Kandy and check into your luxury boutique retreat overlooking the Mahaweli River. In the late afternoon, enjoy a private guided tour of the Temple of the Sacred Tooth Relic during evening puja.",
      images: [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
      ],
    },
    {
      day: 2,
      title: "Royal Botanical Gardens & Highland Ascent",
      description:
        "Explore the Peradeniya Botanical Gardens before boarding the observation train to Nuwara Eliya. Watch as tropical palms give way to misty pine forests and blanketed tea estates.",
      images: [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
      ],
    },
    {
      day: 3,
      title: "Tea Country Heritage & Estate Tasting",
      description:
        "Spend the day immersed in Ceylon tea history. Walk through private tea fields with a local estate manager, observe traditional hand-plucking, and enjoy a curated tea tasting session.",
      images: [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
      ],
    },
    {
      day: 4,
      title: "The Scenic Train to Ella & Nine Arch Bridge",
      description:
        "Re-board the train for the most dramatic leg of the journey towards Ella. Arrive in time to view the iconic Nine Arch Bridge as the afternoon train crosses the viaduct.",
      images: [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
      ],
    },
    {
      day: 5,
      title: "Sunrise at Little Adam's Peak & Departure",
      description:
        "Conclude your journey with an gentle early morning hike up Little Adam's Peak for 360-degree views over the Ella Gap, followed by a private transfer to your next destination.",
      images: [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586523969998-a78767e29038?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
      ],
    },
  ],
  packages: [
    {
      name: "Classic",
      price: 2850,
      perks: [
        "Boutique hotel & bungalow accommodation",
        "Daily breakfast & dinner",
        "First-class train seats",
        "Private vehicle with driver-guide",
      ],
    },
    {
      name: "Private",
      price: 4200,
      perks: [
        "Luxury suite upgrades",
        "All meals + wine pairing dinners",
        "Senior naturalist guide",
        "Priority scheduling",
      ],
    },
    {
      name: "Ultra",
      price: 6500,
      perks: [
        "Exclusive private carriage",
        "Bungalow buyout — entire property",
        "Personal chef + sommelier",
        "Helicopter transfer option",
        "Dedicated concierge + photographer",
        "Spa treatments included",
      ],
    },
  ],
  coordinates: { lat: 6.8667, lng: 81.0469 },
  region: "Central Highlands",
  addOns: [
    { id: "private-guide", label: "Private naturalist guide upgrade", price: 350 },
    { id: "airport-transfer", label: "Airport transfer (Colombo)", price: 120 },
    { id: "photography", label: "Professional photography package", price: 450 },
    { id: "helicopter", label: "Helicopter scenic transfer", price: 980 },
  ],
};

export default hillCountryByRail;

// Import all experiences
import essentialCeylon from './essential-ceylon-9-days';
import ceylonCoastToHighlands from './ceylon-coast-to-highlands-10-days';
import culturalTriangleAndSouth from './cultural-triangle-and-south-11-days';
import highlandsWildsGoldenSouth from './highlands-wilds-golden-south-12-days';
import grandTour from './grand-tour-14-days';

// Registry of all experiences — add new ones here
export const experiences: Record<string, ExperienceData> = {
  "hill-country-by-rail": hillCountryByRail,
  "essential-ceylon-9-days": essentialCeylon,
  "ceylon-coast-to-highlands-10-days": ceylonCoastToHighlands,
  "cultural-triangle-and-south-11-days": culturalTriangleAndSouth,
  "highlands-wilds-golden-south-12-days": highlandsWildsGoldenSouth,
  "grand-tour-14-days": grandTour,
};
