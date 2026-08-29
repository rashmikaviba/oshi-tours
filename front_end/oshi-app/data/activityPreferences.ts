import { ActivityTitle } from "@/types/tripPlanner";

export interface ActivityItem {
  id: string;
  name: string;
  description: string;
}

export interface ActivityPreference {
  id: string;
  title: ActivityTitle;
  imageSrc: string;
  introduction: string;
  activities: ActivityItem[];
}

export const ACTIVITY_PREFERENCES: ActivityPreference[] = [
  {
    "id": "hiking-trekking",
    "title": "Hiking & Trekking",
    "imageSrc": "/media/activities/hiking-trekking.jpeg",
    "introduction": "From sacred pre-dawn pilgrimages to misty highland ridgelines, Sri Lanka rewards walkers of every level with dramatic viewpoints packed into a small island.",
    "activities": [
      {
        "id": "adams-peak",
        "name": "Adam's Peak (Sri Pada)",
        "description": "A night-time pilgrimage climb up thousands of steps to reach the summit for sunrise; sacred to Buddhists, Hindus, Muslims and Christians alike for the footprint-shaped mark at its peak."
      },
      {
        "id": "pidurangala-rock",
        "name": "Pidurangala Rock, Sigiriya",
        "description": "A shorter climb opposite Sigiriya, culminating in an open boulder platform with the best photographic views of the rock fortress itself."
      },
      {
        "id": "ella-rock",
        "name": "Ella Rock",
        "description": "A half-day hike through tea estates and pine forest to a sweeping viewpoint over the Ella Gap and southern hill country."
      },
      {
        "id": "little-adams-peak",
        "name": "Little Adam's Peak",
        "description": "An easy 1\u20132 hour walk near Ella suited to all fitness levels, with panoramic tea-country views."
      },
      {
        "id": "knuckles-range",
        "name": "Knuckles Mountain Range",
        "description": "Multi-day trekking through a UNESCO-listed biosphere reserve of cloud forest, grasslands and remote villages."
      },
      {
        "id": "worlds-end",
        "name": "World's End, Horton Plains",
        "description": "An early-morning walk across highland grasslands to a sheer 870-metre escarpment drop, best seen before the clouds roll in."
      },
      {
        "id": "bambarakanda-falls",
        "name": "Bambarakanda Falls Hike",
        "description": "A trail to the base (or summit detour) of Sri Lanka's tallest waterfall, near Haputale."
      },
      {
        "id": "ritigala-monastery",
        "name": "Ritigala Forest Monastery",
        "description": "A quiet jungle-clad ruin-hike to an ancient forest-dwelling monastic complex, far less visited than the main Cultural Triangle sites."
      },
      {
        "id": "liptons-seat",
        "name": "Lipton's Seat, Haputale",
        "description": "A ridge-top viewpoint amid tea estates, reputedly where Sir Thomas Lipton once surveyed his plantations."
      },
      {
        "id": "namunukula-knuckles-day-peaks",
        "name": "Namunukula / Knuckles day peaks",
        "description": "Shorter half-day summit hikes for guests wanting highland views without a multi-day commitment."
      }
    ]
  },
  {
    "id": "wildlife-safari",
    "title": "Wildlife & Safari",
    "imageSrc": "/media/activities/wildlife-safari.jpeg",
    "introduction": "Sri Lanka packs an extraordinary density of wildlife into a compact area \u2013 leopards, elephants, sloth bears and hundreds of bird species across a range of habitats.",
    "activities": [
      {
        "id": "yala-national-park",
        "name": "Yala National Park",
        "description": "Sri Lanka's most visited park, with one of the highest recorded densities of leopards in the world."
      },
      {
        "id": "wilpattu-national-park",
        "name": "Wilpattu National Park",
        "description": "The island's largest national park, known for its natural 'villu' lakes and a quieter, less-crowded leopard safari experience."
      },
      {
        "id": "udawalawe-national-park",
        "name": "Udawalawe National Park",
        "description": "Reliable, year-round elephant sightings across open grassland around the Udawalawe reservoir."
      },
      {
        "id": "minneriya-gathering",
        "name": "Minneriya / Kawudulla / Hurulu Eco Park",
        "description": "Seasonal stage for 'The Gathering', one of Asia's largest congregations of wild Asian elephants."
      },
      {
        "id": "bundala-national-park",
        "name": "Bundala National Park",
        "description": "A Ramsar-listed wetland sanctuary rich in migratory and resident birdlife, plus crocodiles and elephants."
      },
      {
        "id": "sinharaja-forest-reserve",
        "name": "Sinharaja Forest Reserve",
        "description": "A UNESCO World Heritage rainforest with exceptional biodiversity and a high rate of endemic species."
      },
      {
        "id": "wasgamuwa-national-park",
        "name": "Wasgamuwa National Park",
        "description": "An off-the-beaten-path park known for elephant herds and a peaceful, low-tourist-traffic safari."
      },
      {
        "id": "kumana-national-park",
        "name": "Kumana National Park",
        "description": "A birdwatcher's park adjoining Yala, famous for its heronry and migratory wading birds."
      },
      {
        "id": "horton-plains-sambar-deer",
        "name": "Horton Plains Sambar Deer",
        "description": "Habituated wild sambar deer commonly seen grazing along the Horton Plains walking trail."
      }
    ]
  },
  {
    "id": "adventure-adrenaline",
    "title": "Adventure & Adrenaline",
    "imageSrc": "/media/activities/adventure-adrenaline.jpeg",
    "introduction": "For guests seeking a faster heartbeat, Sri Lanka's rivers, coastline and hill country offer a genuine range of adventure sports.",
    "activities": [
      {
        "id": "kitulgala-rafting",
        "name": "White-Water Rafting, Kitulgala",
        "description": "Grade 2\u20133 rapids on the Kelani River, Sri Lanka's premier rafting location."
      },
      {
        "id": "zip-lining",
        "name": "Zip-Lining",
        "description": "Canopy zip-line courses available near Ella and Kitulgala with hill-country or rainforest views."
      },
      {
        "id": "hot-air-ballooning",
        "name": "Hot Air Ballooning",
        "description": "Sunrise balloon flights over the Cultural Triangle near Sigiriya and Dambulla (seasonal, roughly Dec\u2013Apr)."
      },
      {
        "id": "surfing",
        "name": "Surfing",
        "description": "Consistent breaks for all levels at Arugam Bay (east coast season), Weligama (beginner-friendly) and Hikkaduwa."
      },
      {
        "id": "canyoning",
        "name": "Canyoning",
        "description": "Waterfall abseiling and river-gorge descents in the Badulla / Ella highlands."
      },
      {
        "id": "atv-quad-biking",
        "name": "Quad Biking / ATV Tours",
        "description": "Off-road trail rides through paddy fields and coastal scrub, popular around Bentota."
      },
      {
        "id": "deep-sea-fishing",
        "name": "Deep-Sea Fishing",
        "description": "Half- and full-day charters from Mirissa, Kalpitiya and the west coast."
      },
      {
        "id": "safari-camping",
        "name": "Jungle / Safari Camping",
        "description": "Overnight tented camps on the fringes of Yala or Wilpattu for an immersive wildlife experience."
      },
      {
        "id": "cycling-tours",
        "name": "Cycling Tours",
        "description": "Guided rides through Polonnaruwa's ancient ruins, rural villages, or the Jaffna peninsula."
      },
      {
        "id": "scuba-wreck-diving",
        "name": "Scuba Diving & Wreck Diving",
        "description": "Wreck and reef dives off Trincomalee, Hikkaduwa and Kalpitiya, including WWII-era wrecks."
      },
      {
        "id": "kalpitiya-kite-surfing",
        "name": "Kite Surfing, Kalpitiya",
        "description": "One of South Asia's top kite-surfing destinations, with a reliable wind season from May to October."
      },
      {
        "id": "snorkeling",
        "name": "Snorkeling",
        "description": "Reef and coral snorkelling at Pigeon Island (Trincomalee), Hikkaduwa's marine sanctuary and the Kalpitiya/Bar Reef area, with sightings of reef fish, turtles and occasional reef sharks."
      }
    ]
  },
  {
    "id": "beaches-coastal-experiences",
    "title": "Beaches & Coastal Experiences",
    "imageSrc": "/media/activities/beaches-coastal-experiences.jpeg",
    "introduction": "With two distinct coastal seasons, Sri Lanka's beaches range from surf towns to sleepy palm-fringed bays.",
    "activities": [
      {
        "id": "mirissa-beach",
        "name": "Mirissa",
        "description": "A laid-back south-coast beach town and the island's premier base for whale watching."
      },
      {
        "id": "unawatuna-beach",
        "name": "Unawatuna",
        "description": "A sheltered, calm bay ideal for swimming, near Galle Fort."
      },
      {
        "id": "hikkaduwa-beach",
        "name": "Hikkaduwa",
        "description": "Coral reef snorkelling, surf breaks and a lively beachfront strip."
      },
      {
        "id": "bentota-beach",
        "name": "Bentota",
        "description": "A water-sports hub with calm lagoon and river frontage alongside open-sea beach."
      },
      {
        "id": "arugam-bay",
        "name": "Arugam Bay",
        "description": "The east coast's surf capital, at its best April to October."
      },
      {
        "id": "nilaveli-trincomalee",
        "name": "Nilaveli & Trincomalee",
        "description": "Pristine, uncrowded white-sand beaches with nearby Pigeon Island snorkelling."
      },
      {
        "id": "kalpitiya-beach",
        "name": "Kalpitiya",
        "description": "A quieter lagoon-and-peninsula coastline known for kite surfing and dolphin watching."
      },
      {
        "id": "tangalle-coves",
        "name": "Tangalle",
        "description": "Secluded, dramatic coves and beaches with fewer crowds than the main south-coast strip."
      },
      {
        "id": "weligama-bay",
        "name": "Weligama",
        "description": "A wide, gentle bay that has become Sri Lanka's leading beginner surf school destination, alongside its iconic stilt fishermen."
      },
      {
        "id": "jaffna-beaches",
        "name": "Jaffna Peninsula Beaches",
        "description": "Casuarina Beach and the island of Nagadeepa offer a quieter, culturally distinct northern coastal experience."
      }
    ]
  },
  {
    "id": "whale-dolphin-marine-life",
    "title": "Whale, Dolphin & Marine Life",
    "imageSrc": "/media/activities/whale-dolphin-marine-life.jpeg",
    "introduction": "Sri Lanka sits on a major migratory corridor, making it one of the most reliable places on Earth to see large marine mammals from shore-based trips.",
    "activities": [
      {
        "id": "mirissa-whale-watching",
        "name": "Mirissa Whale Watching",
        "description": "Regular sightings of blue whales and sperm whales, best November to April."
      },
      {
        "id": "kalpitiya-dolphin-watching",
        "name": "Kalpitiya Dolphin Watching",
        "description": "Large pods of spinner dolphins, sometimes numbering in the hundreds, sighted most mornings in season."
      },
      {
        "id": "trincomalee-whale-watching",
        "name": "Trincomalee Whale Watching",
        "description": "An alternative east-coast whale watching season running roughly May to October."
      },
      {
        "id": "nilaveli-dolphin-watching",
        "name": "Nilaveli Dolphin Watching",
        "description": "Morning boat trips off Nilaveli with frequent sightings of spinner and other dolphin pods; on a lucky day, whales are sometimes spotted in the same waters during the May\u2013October season."
      },
      {
        "id": "pigeon-island-snorkelling",
        "name": "Pigeon Island Snorkelling",
        "description": "A protected marine national park off Trincomalee with reef sharks, turtles and vibrant coral."
      }
    ]
  },
  {
    "id": "culture-heritage",
    "title": "Culture & Heritage",
    "imageSrc": "/media/activities/culture-heritage.jpeg",
    "introduction": "Over two millennia of Buddhist, Hindu, colonial and indigenous history have left Sri Lanka an unusually dense concentration of heritage sites for its size.",
    "activities": [
      {
        "id": "sigiriya-fortress",
        "name": "Sigiriya Rock Fortress",
        "description": "A 5th-century UNESCO-listed rock palace with celebrated frescoes and ancient water gardens."
      },
      {
        "id": "dambulla-cave-temple",
        "name": "Dambulla Cave Temple",
        "description": "A UNESCO site in continuous use for over 2,000 years, housing 153 Buddha statues across five painted caves."
      },
      {
        "id": "anuradhapura-city",
        "name": "Anuradhapura Sacred City",
        "description": "Sri Lanka's ancient first capital, home to some of the world's oldest continuously tended stupas and the sacred Sri Maha Bodhi tree."
      },
      {
        "id": "polonnaruwa-city",
        "name": "Polonnaruwa Ancient City",
        "description": "A UNESCO medieval capital best explored by bicycle, famed for the Gal Vihara rock-cut Buddhas."
      },
      {
        "id": "kandy-tooth-temple",
        "name": "Kandy \u2013 Temple of the Sacred Tooth Relic",
        "description": "The spiritual heart of Sri Lankan Buddhism, and stage for the spectacular Esala Perahera festival each July/August."
      },
      {
        "id": "galle-fort",
        "name": "Galle Fort",
        "description": "A UNESCO-listed 16th\u201317th-century Portuguese and Dutch fortified city, now a boutique-lined living town."
      },
      {
        "id": "jaffna-fort-nallur",
        "name": "Jaffna Fort & Nallur Kovil",
        "description": "Distinct Tamil and colonial Dutch heritage in the north, including one of Sri Lanka's most important Hindu temples."
      },
      {
        "id": "ambalangoda-mask-making",
        "name": "Traditional Mask Making, Ambalangoda",
        "description": "Workshops demonstrating the carving of ritual devil-dance and folklore masks."
      },
      {
        "id": "traditional-dance-shows",
        "name": "Traditional Dance & Drumming Shows",
        "description": "Kandyan, low-country and Sabaragamuwa dance traditions performed with fire-walking and acrobatics."
      }
    ]
  },
  {
    "id": "scenic-train-journeys",
    "title": "Scenic Train Journeys",
    "imageSrc": "/media/activities/scenic-train-journeys.jpeg",
    "introduction": "Built during the colonial tea-plantation era, Sri Lanka's rail lines are now attractions in their own right.",
    "activities": [
      {
        "id": "kandy-ella-train",
        "name": "Kandy to Ella (via Nanu Oya)",
        "description": "Widely regarded as one of the most scenic train rides on Earth, threading through tea estates, cloud forest and tunnels."
      },
      {
        "id": "colombo-galle-train",
        "name": "Colombo to Galle Coastal Line",
        "description": "A relaxed ride hugging the southwest coastline with ocean views for much of the journey."
      },
      {
        "id": "demodara-nine-arch",
        "name": "Demodara Nine Arch Bridge & Loop",
        "description": "A photogenic railway viaduct near Ella, built without steel during the First World War."
      }
    ]
  },
  {
    "id": "wellness-ayurveda",
    "title": "Wellness & Ayurveda",
    "imageSrc": "/media/activities/wellness-ayurveda.jpeg",
    "introduction": "Sri Lanka is one of the birthplaces of Ayurvedic tourism, with a wellness culture that pairs traditional treatment with tropical surroundings.",
    "activities": [
      {
        "id": "ayurvedic-spa-retreats",
        "name": "Ayurvedic Spa Retreats",
        "description": "Traditional herbal treatments and consultations at dedicated wellness resorts, especially around Bentota and Beruwala."
      },
      {
        "id": "yoga-meditation-retreats",
        "name": "Yoga & Meditation Retreats",
        "description": "Multi-day retreats in the hill country and south coast, often combined with a plant-based retreat menu."
      },
      {
        "id": "monastery-meditation",
        "name": "Monastery Meditation Sessions",
        "description": "Guided introductory meditation with resident monks at select Buddhist temples."
      }
    ]
  },
  {
    "id": "culinary-experiences",
    "title": "Culinary Experiences",
    "imageSrc": "/media/activities/culinary-experiences.jpeg",
    "introduction": "Sri Lankan cuisine varies distinctly by region, and hands-on food experiences are consistently one of the highest-rated additions to any itinerary.",
    "activities": [
      {
        "id": "cooking-class",
        "name": "Sri Lankan Cooking Class",
        "description": "Hands-on classes covering classic curries, hoppers ('appa') and sambols, often taught in a home setting."
      },
      {
        "id": "ceylon-tea-tasting",
        "name": "Ceylon Tea Tasting",
        "description": "Factory tours and tastings in the tea-producing highlands of Nuwara Eliya, Ella and Kandy."
      },
      {
        "id": "colombo-street-food",
        "name": "Street Food Tours, Colombo",
        "description": "Guided tastings through Pettah market and the Galle Face Green food stalls."
      },
      {
        "id": "toddy-arrack-tasting",
        "name": "Toddy Tapping & Arrack Tasting",
        "description": "A look at traditional coconut-palm toddy tapping and the distillation of Sri Lanka's national spirit."
      },
      {
        "id": "cinnamon-island",
        "name": "Cinnamon Island, Madu River",
        "description": "A demonstration of traditional Ceylon cinnamon peeling and processing on a river island."
      },
      {
        "id": "jaffna-cuisine-tasting",
        "name": "Jaffna Cuisine Tasting",
        "description": "Distinctive Tamil dishes such as crab curry and palmyrah-based sweets, rarely sampled outside the north."
      }
    ]
  },
  {
    "id": "nature-eco-experiences",
    "title": "Nature & Eco Experiences",
    "imageSrc": "/media/activities/nature-eco-experiences.jpeg",
    "introduction": "Beyond formal safaris, Sri Lanka's wetlands, rainforests and highlands offer quieter, close-up encounters with nature.",
    "activities": [
      {
        "id": "sinharaja-rainforest-walks",
        "name": "Sinharaja Rainforest Walks",
        "description": "Guided walks through Sri Lanka's last major primary rainforest, rich in endemic flora and fauna."
      },
      {
        "id": "muthurajawela-marsh-safari",
        "name": "Muthurajawela Wetland Boat Safari",
        "description": "A boat safari through a coastal marsh ecosystem near Negombo, home to varied birdlife."
      },
      {
        "id": "madu-river-mangrove-safari",
        "name": "Madu River Mangrove Safari",
        "description": "A boat trip through a Ramsar-listed wetland of mangrove channels and small islands."
      },
      {
        "id": "horton-plains-nature-walk",
        "name": "Horton Plains & World's End",
        "description": "A highland nature walk across montane grassland to a dramatic escarpment viewpoint."
      },
      {
        "id": "birdwatching",
        "name": "Birdwatching",
        "description": "Endemic species such as the Sri Lanka Blue Magpie and Sri Lankan Junglefowl are best sought in Sinharaja and Kitulgala."
      },
      {
        "id": "turtle-conservation",
        "name": "Turtle Conservation Visits",
        "description": "Hatchery and rehabilitation visits at Kosgoda and Bentota, or night-time nesting watches at Rekawa."
      }
    ]
  },
  {
    "id": "festivals-local-life",
    "title": "Festivals & Local Life",
    "imageSrc": "/media/activities/festivals-local-life.jpeg",
    "introduction": "Timing a trip around a festival, or simply spending time in a village setting, gives guests a far deeper sense of Sri Lankan life.",
    "activities": [
      {
        "id": "esala-perahera-kandy",
        "name": "Esala Perahera, Kandy",
        "description": "A grand ten-day pageant of elephants, dancers and drummers held in July or August in honour of the Sacred Tooth Relic."
      },
      {
        "id": "sinhala-tamil-new-year",
        "name": "Sinhala & Tamil New Year",
        "description": "A nationwide traditional New Year celebrated in mid-April with games, sweets and family rituals."
      },
      {
        "id": "vesak-festival",
        "name": "Vesak Festival",
        "description": "Commemorating the Buddha's birth, enlightenment and passing, marked island-wide with illuminated lanterns and pandals, usually in May."
      },
      {
        "id": "vel-festival-colombo",
        "name": "Vel Festival, Colombo",
        "description": "A colourful Hindu chariot procession held annually in the capital."
      },
      {
        "id": "village-homestay",
        "name": "Village Homestay Experiences",
        "description": "Overnight or day stays with local families for an authentic look at rural Sri Lankan life."
      }
    ]
  }
];
