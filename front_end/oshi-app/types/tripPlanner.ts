export interface PlaceItem {
  id: string; // Internal unique ID
  placeId?: string;
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  mapsUrl?: string;
  photoUrl?: string;
  photoAttribution?: string;
  editorialSummary?: string;
  types?: string[];
}

export interface ItineraryDay {
  dateString: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Saturday, August 1st"
  places: PlaceItem[];
}

export type ActivityTitle =
  | "Hiking & Trekking"
  | "Wildlife & Safari"
  | "Adventure & Adrenaline"
  | "Beaches & Coastal Experiences"
  | "Whale, Dolphin & Marine Life"
  | "Culture & Heritage"
  | "Scenic Train Journeys"
  | "Wellness & Ayurveda"
  | "Culinary Experiences"
  | "Nature & Eco Experiences"
  | "Festivals & Local Life";

export const ALLOWED_ACTIVITY_TITLES: ActivityTitle[] = [
  "Hiking & Trekking",
  "Wildlife & Safari",
  "Adventure & Adrenaline",
  "Beaches & Coastal Experiences",
  "Whale, Dolphin & Marine Life",
  "Culture & Heritage",
  "Scenic Train Journeys",
  "Wellness & Ayurveda",
  "Culinary Experiences",
  "Nature & Eco Experiences",
  "Festivals & Local Life",
];

export interface SelectedActivityPoint {
  categoryId: string;
  categoryTitle: ActivityTitle;
  activityId: string;
  activityName: string;
}

export interface TripPlannerFormData {
  // Step 1: Plan Basics
  planName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD

  // Step 2: Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;

  // Step 3: Flight Details
  hasFlightDetails: boolean;
  arrivalDate: string;
  arrivalTime: string;
  arrivalFlightNumber: string;
  departureDate: string;
  departureTime: string;
  departureFlightNumber: string;

  // Step 4: Itinerary
  itinerary: ItineraryDay[];

  // Step 5: Transportation
  transportPreference: string;

  // Step 6: Additional Information
  hasActivities: boolean;
  selectedActivities: SelectedActivityPoint[];
  medicalConditions: string;
  communicationPreference: string;
  specialRequests: string;
}

export const INITIAL_TRIP_PLANNER_DATA: TripPlannerFormData = {
  planName: '',
  startDate: '',
  endDate: '',

  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',

  hasFlightDetails: false,
  arrivalDate: '',
  arrivalTime: '',
  arrivalFlightNumber: '',
  departureDate: '',
  departureTime: '',
  departureFlightNumber: '',

  itinerary: [],

  transportPreference: 'Private Car',

  hasActivities: false,
  selectedActivities: [],
  medicalConditions: '',
  communicationPreference: 'Email',
  specialRequests: '',
};

// Curated Sri Lanka Landmark Summaries and Image Fallbacks
export const SRI_LANKA_LANDMARK_SUMMARIES: Record<string, { summary: string; photoUrl: string }> = {
  sigiriya: {
    summary: "Ancient 5th-century rock fortress soaring 200 meters above the jungle, featuring preserved frescoes, water gardens, and the iconic Lion Gate.",
    photoUrl: "/media/Sigiriya/i_1.jpeg",
  },
  kandy: {
    summary: "Sacred mountain capital home to the Temple of the Tooth Relic, serene Kandy Lake, lush botanical gardens, and rich Kandyan cultural heritage.",
    photoUrl: "/media/Kandy/i_1.jpeg",
  },
  galle: {
    summary: "UNESCO World Heritage Dutch fort city with 17th-century ramparts, cobblestone alleys, boutique villas, and sweeping ocean views.",
    photoUrl: "/media/Galle/i_1.jpeg",
  },
  ella: {
    summary: "Highland village framed by misted mountain peaks, featuring the famous Nine Arch Railway Bridge, Little Adam's Peak, and Ravana Falls.",
    photoUrl: "/media/Ella/I_1.jpeg",
  },
  yala: {
    summary: "Sri Lanka's premier wildlife sanctuary boasting the highest density of leopards in the world, alongside wild Asian elephants and sloth bears.",
    photoUrl: "/media/Yala/i_1.jpeg",
  },
  nuwara: {
    summary: "Sri Lanka's 'Little England', renowned for cool mountain climate, manicured tea estates, colonial bungalows, and Gregory Lake.",
    photoUrl: "/media/Nuwara%20Eliya/i_1.jpeg",
  },
  dambulla: {
    summary: "Magnificent cave temple complex dating back to the 1st century BC, housing 153 Buddha statues and intricate rock ceiling murals.",
    photoUrl: "/media/Sigiriya/i_2.jpeg",
  },
  mirissa: {
    summary: "Golden south-coast beach bay celebrated for blue whale watching expeditions, coconut palm hill sunsets, and pristine ocean waters.",
    photoUrl: "/media/Mirissa/i_1.jpeg",
  },
  colombo: {
    summary: "Vibrant coastal metropolis blending colonial architecture, high-end oceanfront dining, Galle Face Green promenades, and modern luxury.",
    photoUrl: "/media/Colombo/i_1.jpeg",
  },
  anuradhapura: {
    summary: "Ancient sacred capital founded in the 4th century BC, featuring towering brick stupas, ancient monastic ruins, and the sacred Jaya Sri Maha Bodhi.",
    photoUrl: "/media/Anuradhapura/i_1.jpeg",
  },
  polonnaruwa: {
    summary: "Medieval royal kingdom showcasing colossal stone carvings at Gal Vihara, ancient palace ruins, and serene irrigation reservoirs.",
    photoUrl: "/media/Polonnaruwa/i_1.jpeg",
  },
  adam: {
    summary: "Sacred mountain peak revered across major religions, famous for sunrise summit pilgrimages above a sea of clouds.",
    photoUrl: "/media/Adam's%20Peak/i_1.jpeg",
  },
  negombo: {
    summary: "Charming coastal lagoon town near the international airport, known for Dutch canals, traditional catamarans, and fresh seafood markets.",
    photoUrl: "/media/Negombo/i_1.jpeg",
  },
};

export function getLandmarkSummary(name: string, formattedAddress: string = ''): { summary?: string; photoUrl?: string } {
  const query = `${name} ${formattedAddress}`.toLowerCase();
  for (const [key, data] of Object.entries(SRI_LANKA_LANDMARK_SUMMARIES)) {
    if (query.includes(key)) {
      return data;
    }
  }
  return {};
}

// Date helper functions
export function formatDateHeading(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' });

  // Ordinal suffix
  let dayNum = dateObj.getDate();
  let suffix = 'th';
  if (dayNum % 10 === 1 && dayNum !== 11) suffix = 'st';
  else if (dayNum % 10 === 2 && dayNum !== 12) suffix = 'nd';
  else if (dayNum % 10 === 3 && dayNum !== 13) suffix = 'rd';

  return `${weekday}, ${month} ${dayNum}${suffix}`;
}

export function formatShortRange(startStr: string, endStr: string): string {
  if (!startStr || !endStr) return '';
  const [sY, sM, sD] = startStr.split('-').map(Number);
  const [eY, eM, eD] = endStr.split('-').map(Number);
  return `${sM}/${sD} – ${eM}/${eD}`;
}

export function generateDateRangeStrings(startStr: string, endStr: string): string[] {
  if (!startStr || !endStr) return [];
  const [sY, sM, sD] = startStr.split('-').map(Number);
  const [eY, eM, eD] = endStr.split('-').map(Number);
  const start = new Date(sY, sM - 1, sD);
  const end = new Date(eY, eM - 1, eD);

  if (end < start) return [];

  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
