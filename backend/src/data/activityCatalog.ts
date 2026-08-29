export interface CatalogActivityItem {
  id: string;
  name: string;
}

export interface CatalogCategory {
  id: string;
  title: string;
  activities: CatalogActivityItem[];
}

export const ACTIVITY_CATALOG: CatalogCategory[] = [
  {
    id: "hiking-trekking",
    title: "Hiking & Trekking",
    activities: [
      { id: "adams-peak", name: "Adam's Peak (Sri Pada)" },
      { id: "pidurangala-rock", name: "Pidurangala Rock, Sigiriya" },
      { id: "ella-rock", name: "Ella Rock" },
      { id: "little-adams-peak", name: "Little Adam's Peak" },
      { id: "knuckles-range", name: "Knuckles Mountain Range" },
      { id: "worlds-end", name: "World's End, Horton Plains" },
      { id: "bambarakanda-falls", name: "Bambarakanda Falls Hike" },
      { id: "ritigala-monastery", name: "Ritigala Forest Monastery" },
      { id: "liptons-seat", name: "Lipton's Seat, Haputale" },
      { id: "namunukula-knuckles-day-peaks", name: "Namunukula / Knuckles day peaks" },
    ],
  },
  {
    id: "wildlife-safari",
    title: "Wildlife & Safari",
    activities: [
      { id: "yala-national-park", name: "Yala National Park" },
      { id: "wilpattu-national-park", name: "Wilpattu National Park" },
      { id: "udawalawe-national-park", name: "Udawalawe National Park" },
      { id: "minneriya-gathering", name: "Minneriya / Kawudulla / Hurulu Eco Park" },
      { id: "bundala-national-park", name: "Bundala National Park" },
      { id: "sinharaja-forest-reserve", name: "Sinharaja Forest Reserve" },
      { id: "wasgamuwa-national-park", name: "Wasgamuwa National Park" },
      { id: "kumana-national-park", name: "Kumana National Park" },
      { id: "horton-plains-sambar-deer", name: "Horton Plains Sambar Deer" },
    ],
  },
  {
    id: "adventure-adrenaline",
    title: "Adventure & Adrenaline",
    activities: [
      { id: "kitulgala-rafting", name: "White-Water Rafting, Kitulgala" },
      { id: "zip-lining", name: "Zip-Lining" },
      { id: "hot-air-ballooning", name: "Hot Air Ballooning" },
      { id: "surfing", name: "Surfing" },
      { id: "canyoning", name: "Canyoning" },
      { id: "atv-quad-biking", name: "Quad Biking / ATV Tours" },
      { id: "deep-sea-fishing", name: "Deep-Sea Fishing" },
      { id: "safari-camping", name: "Jungle / Safari Camping" },
      { id: "cycling-tours", name: "Cycling Tours" },
      { id: "scuba-wreck-diving", name: "Scuba Diving & Wreck Diving" },
      { id: "kalpitiya-kite-surfing", name: "Kite Surfing, Kalpitiya" },
      { id: "snorkeling", name: "Snorkeling" },
    ],
  },
  {
    id: "beaches-coastal-experiences",
    title: "Beaches & Coastal Experiences",
    activities: [
      { id: "mirissa-beach", name: "Mirissa" },
      { id: "unawatuna-beach", name: "Unawatuna" },
      { id: "hikkaduwa-beach", name: "Hikkaduwa" },
      { id: "bentota-beach", name: "Bentota" },
      { id: "arugam-bay", name: "Arugam Bay" },
      { id: "nilaveli-trincomalee", name: "Nilaveli & Trincomalee" },
      { id: "kalpitiya-beach", name: "Kalpitiya" },
      { id: "tangalle-coves", name: "Tangalle" },
      { id: "weligama-bay", name: "Weligama" },
      { id: "jaffna-beaches", name: "Jaffna Peninsula Beaches" },
    ],
  },
  {
    id: "whale-dolphin-marine-life",
    title: "Whale, Dolphin & Marine Life",
    activities: [
      { id: "mirissa-whale-watching", name: "Mirissa Whale Watching" },
      { id: "kalpitiya-dolphin-watching", name: "Kalpitiya Dolphin Watching" },
      { id: "trincomalee-whale-watching", name: "Trincomalee Whale Watching" },
      { id: "nilaveli-dolphin-watching", name: "Nilaveli Dolphin Watching" },
      { id: "pigeon-island-snorkelling", name: "Pigeon Island Snorkelling" },
    ],
  },
  {
    id: "culture-heritage",
    title: "Culture & Heritage",
    activities: [
      { id: "sigiriya-fortress", name: "Sigiriya Rock Fortress" },
      { id: "dambulla-cave-temple", name: "Dambulla Cave Temple" },
      { id: "anuradhapura-city", name: "Anuradhapura Sacred City" },
      { id: "polonnaruwa-city", name: "Polonnaruwa Ancient City" },
      { id: "kandy-tooth-temple", name: "Kandy – Temple of the Sacred Tooth Relic" },
      { id: "galle-fort", name: "Galle Fort" },
      { id: "jaffna-fort-nallur", name: "Jaffna Fort & Nallur Kovil" },
      { id: "ambalangoda-mask-making", name: "Traditional Mask Making, Ambalangoda" },
      { id: "traditional-dance-shows", name: "Traditional Dance & Drumming Shows" },
    ],
  },
  {
    id: "scenic-train-journeys",
    title: "Scenic Train Journeys",
    activities: [
      { id: "kandy-ella-train", name: "Kandy to Ella (via Nanu Oya)" },
      { id: "colombo-galle-train", name: "Colombo to Galle Coastal Line" },
      { id: "demodara-nine-arch", name: "Demodara Nine Arch Bridge & Loop" },
    ],
  },
  {
    id: "wellness-ayurveda",
    title: "Wellness & Ayurveda",
    activities: [
      { id: "ayurvedic-spa-retreats", name: "Ayurvedic Spa Retreats" },
      { id: "yoga-meditation-retreats", name: "Yoga & Meditation Retreats" },
      { id: "monastery-meditation", name: "Monastery Meditation Sessions" },
    ],
  },
  {
    id: "culinary-experiences",
    title: "Culinary Experiences",
    activities: [
      { id: "cooking-class", name: "Sri Lankan Cooking Class" },
      { id: "ceylon-tea-tasting", name: "Ceylon Tea Tasting" },
      { id: "colombo-street-food", name: "Street Food Tours, Colombo" },
      { id: "toddy-arrack-tasting", name: "Toddy Tapping & Arrack Tasting" },
      { id: "cinnamon-island", name: "Cinnamon Island, Madu River" },
      { id: "jaffna-cuisine-tasting", name: "Jaffna Cuisine Tasting" },
    ],
  },
  {
    id: "nature-eco-experiences",
    title: "Nature & Eco Experiences",
    activities: [
      { id: "sinharaja-rainforest-walks", name: "Sinharaja Rainforest Walks" },
      { id: "muthurajawela-marsh-safari", name: "Muthurajawela Wetland Boat Safari" },
      { id: "madu-river-mangrove-safari", name: "Madu River Mangrove Safari" },
      { id: "horton-plains-nature-walk", name: "Horton Plains & World's End" },
      { id: "birdwatching", name: "Birdwatching" },
      { id: "turtle-conservation", name: "Turtle Conservation Visits" },
    ],
  },
  {
    id: "festivals-local-life",
    title: "Festivals & Local Life",
    activities: [
      { id: "esala-perahera-kandy", name: "Esala Perahera, Kandy" },
      { id: "sinhala-tamil-new-year", name: "Sinhala & Tamil New Year" },
      { id: "vesak-festival", name: "Vesak Festival" },
      { id: "vel-festival-colombo", name: "Vel Festival, Colombo" },
      { id: "village-homestay", name: "Village Homestay Experiences" },
    ],
  },
];

// Calculate total available points across catalog
export const TOTAL_AVAILABLE_ACTIVITY_POINTS = ACTIVITY_CATALOG.reduce(
  (acc: number, cat: CatalogCategory) => acc + cat.activities.length,
  0
);

// Map for fast lookup
export const ACTIVITY_CATALOG_MAP = new Map<string, { categoryTitle: string; activityName: string }>();
ACTIVITY_CATALOG.forEach((cat: CatalogCategory) => {
  cat.activities.forEach((act: CatalogActivityItem) => {
    ACTIVITY_CATALOG_MAP.set(`${cat.id}::${act.id}`, {
      categoryTitle: cat.title,
      activityName: act.name,
    });
  });
});
