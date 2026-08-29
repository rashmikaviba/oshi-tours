import { type ExperienceData } from './hill-country-by-rail';

const ceylonCoastToHighlands: ExperienceData = {
  slug: "ceylon-coast-to-highlands-10-days",
  title: "7 Nights 8 Days Sri Lanka Highlights Tour",
  tagline: "Negombo to Galle via Hill Country & Yala — Culture, Hill Country, Wildlife & Coast",
  heroImage: "/media/hero_4.jpg",
  gallery: [
    "/media/Negombo/i_1.jpeg",
    "/media/Sigiriya/i_1.jpeg",
    "/media/Kandy/i_1.jpeg",
    "/media/Nuwara%20Eliya/i_1.jpeg",
    "/media/Ella/I_1.jpeg",
    "/media/Galle/i_1.jpeg"
  ],
  location: "Negombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Galle, Sri Lanka",
  durationDays: 8,
  groupSize: "2–8 guests",
  priceFrom: 2250,
  currency: "USD",
  overview: "A perfectly balanced 8-day private journey covering Sri Lanka's essential highlights: the UNESCO Cultural Triangle, spiritual hill capital of Kandy, misty tea country by scenic rail, a wild leopard safari in Yala, and the Dutch colonial ramparts of Galle Fort.\n\nEnjoy luxury private transfers, expert local guides, handpicked boutique stays, and flexible daily itineraries.",
  highlights: [
    "Climb the 5th-century Sigiriya Rock Fortress (UNESCO)",
    "Explore 2,000-year-old Dambulla Cave Temple painted shrines",
    "Wild elephant safari at Minneriya or Kaudulla National Park",
    "Evening puja ceremony at the Temple of the Sacred Tooth Relic in Kandy",
    "Scenic highland train journey from Nanu Oya to Ella",
    "Nine Arch Bridge viaduct walk & Little Adam's Peak trek",
    "Yala National Park 4x4 safari for leopards, elephants & sloth bears",
    "Walking tour of UNESCO-listed Galle Fort ramparts"
  ],
  included: [
    "7 nights luxury boutique accommodation",
    "Daily breakfast and gourmet dinners",
    "Private air-conditioned vehicle with chauffeur-guide throughout",
    "Observation-class train tickets (Nanu Oya to Ella)",
    "Sigiriya Rock Fortress & Dambulla Cave Temple entrance fees",
    "Temple of the Tooth Relic & Kandyan Cultural Show tickets",
    "Yala National Park 4x4 jeep safari with expert tracker",
    "24/7 dedicated on-trip concierge service"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Negombo",
      description: "On arrival at Bandaranaike International Airport, transfer to the nearby coastal town of Negombo for a relaxed first night to unwind before the tour begins in earnest.",
      images: ["/media/Negombo/i_1.jpeg", "/media/Negombo/i_2.jpeg", "/media/Negombo/i_3.jpeg"],
      cityImage: "/media/Negombo/i_1.jpeg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Negombo is a historic fishing town shaped by Portuguese and later Dutch colonial rule, still visible in its old Dutch canal system, fort remains and the strong Catholic heritage reflected in its many churches.",
      primaryExcursions: [
        {
          title: "Airport Meet & Greet and Transfer to Negombo",
          description: "Met on arrival by private chauffeur-guide and transferred to your beachfront hotel in Negombo.",
          location: "Colombo Airport / Negombo",
          category: "Transfer"
        },
        {
          title: "Evening at Leisure by the Beach",
          description: "Relax on the golden beach and ease into island time after your long-haul flight.",
          location: "Negombo Coast",
          category: "Relaxation"
        }
      ],
      regionalExperiences: [
        {
          title: "Negombo Lagoon Boat Ride",
          description: "Peaceful boat ride through mangrove channels and lagoon waterways rich in birdlife.",
          location: "Negombo Lagoon",
          category: "Nature"
        },
        {
          title: "Early-Morning Fish Market (Lellama) Visit",
          description: "Observe traditional fishermen unloading their daily catch at Negombo's vibrant fish market.",
          location: "Negombo Town",
          category: "Local Life"
        },
        {
          title: "Muthurajawela Wetland Boat Safari",
          description: "Guided safari through coastal marshlands home to monitor lizards and endemic birds.",
          location: "Muthurajawela",
          category: "Wildlife"
        }
      ]
    },
    {
      day: 2,
      title: "Transfer to Sigiriya – Rock Fortress Climb & Village Tour",
      description: "Travel to the Cultural Triangle and spend the day exploring the iconic Sigiriya Rock Fortress and the surrounding countryside.",
      images: ["/media/Sigiriya/i_1.jpeg", "/media/Sigiriya/i_2.jpeg", "/media/Sigiriya/i_3.jpeg"],
      cityImage: "/media/Sigiriya/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "Sigiriya is a 5th-century rock fortress built by King Kashyapa and inscribed as a UNESCO World Heritage Site in 1982, renowned for its frescoes, Mirror Wall and sophisticated ancient urban planning and water-garden engineering.",
      primaryExcursions: [
        {
          title: "Transfer to Sigiriya",
          description: "Drive north to the Cultural Triangle through scenic countryside and rural plantations.",
          location: "Cultural Triangle",
          category: "Transfer"
        },
        {
          title: "Sigiriya Rock Fortress Climb",
          description: "Ascend King Kashyapa's 5th-century citadel featuring water gardens, frescoes, and summit palace ruins.",
          location: "Sigiriya Citadel",
          category: "Culture & Heritage"
        },
        {
          title: "Traditional Village Tour",
          description: "Experience rural life with a bullock cart ride, canoe float on a village lake, and home-cooked lunch.",
          location: "Habarana Village",
          category: "Local Life & Culinary"
        }
      ],
      regionalExperiences: [
        {
          title: "Sunrise Pidurangala Rock Hike",
          description: "Hike up Pidurangala Rock opposite Sigiriya for 360-degree views of the Lion Rock citadel.",
          location: "Pidurangala",
          category: "Hiking"
        },
        {
          title: "Village Cycling Tour",
          description: "Guided bike ride along quiet dirt paths through farmlands and reservoir banks.",
          location: "Habarana Trails",
          category: "Active"
        },
        {
          title: "Hot Air Balloon Ride (Seasonal)",
          description: "Sunrise hot air balloon flight over ancient reservoirs and jungle canopy (seasonal Dec–Apr).",
          location: "Sigiriya Skies",
          season: "Dec–Apr",
          category: "Adventure"
        }
      ]
    },
    {
      day: 3,
      title: "Sigiriya – Dambulla Cave Temple & Wildlife Safari",
      description: "A second day based in Sigiriya, with the option to explore the UNESCO-listed Dambulla Cave Temple and to head out on a wildlife safari in one of the nearby national parks.",
      images: ["/media/Sigiriya/i_2.jpeg", "/media/Sigiriya/i_1.jpeg", "/media/Sigiriya/i_3.jpeg"],
      cityImage: "/media/Sigiriya/i_2.jpeg",
      categoryImage: "/media/activities/wildlife-safari.jpeg",
      historicalNote: "The Dambulla Cave Temple, a UNESCO World Heritage Site since 1991, has drawn pilgrims for over 2,000 years and houses 153 Buddha statues across five ornately painted cave shrines. Nearby Minneriya, Kaudulla and Hurulu Eco Park are seasonal stages for 'The Gathering' of wild Asian elephants.",
      primaryExcursions: [
        {
          title: "Dambulla Cave Temple Visit",
          description: "Explore 5 painted cave shrines housing 153 Buddha statues and 2,100 m² of ancient murals.",
          location: "Dambulla",
          category: "Culture & Heritage"
        },
        {
          title: "Jeep Safari at Minneriya / Kaudulla / Hurulu Eco Park",
          description: "4x4 jeep safari to observe wild elephant herds congregating near ancient reservoirs.",
          location: "Minneriya / Kaudulla",
          category: "Wildlife & Safari"
        }
      ],
      regionalExperiences: [
        {
          title: "Full-Day Excursion to Polonnaruwa UNESCO Ancient City",
          description: "Explore the medieval capital by bicycle, visiting Gal Vihara Buddhas and Royal Palace ruins.",
          location: "Polonnaruwa",
          category: "Culture & Heritage"
        },
        {
          title: "Matale Spice Garden Visit",
          description: "Guided walkthrough of spice gardens showcasing cinnamon, cardamom, and herbal remedies.",
          location: "Matale",
          category: "Culinary"
        },
        {
          title: "Additional Safari Game Drive",
          description: "Second safari session in an adjacent national park for maximum wildlife photography.",
          location: "Eco Park",
          category: "Wildlife"
        }
      ]
    },
    {
      day: 4,
      title: "Transfer to Kandy – Temple of the Tooth & Cultural Show",
      description: "Travel to the hill capital of Kandy, visiting the city's most treasured religious site and enjoying an evening of traditional dance.",
      images: ["/media/Kandy/i_1.jpeg", "/media/Kandy/i_2.jpeg", "/media/Kandy/i_3.jpeg"],
      cityImage: "/media/Kandy/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "The Temple of the Sacred Tooth Relic sits within the Sacred City of Kandy, a UNESCO World Heritage Site since 1988, and enshrines a relic revered as the Buddha's tooth, brought to the island in the 4th century AD and central to the annual Esala Perahera pageant.",
      primaryExcursions: [
        {
          title: "Transfer to Kandy",
          description: "Scenic drive from the Cultural Triangle up into the foothills of Kandy.",
          location: "Kandy Road",
          category: "Transfer"
        },
        {
          title: "Temple of the Sacred Tooth Relic Visit",
          description: "Visit Sri Dalada Maligawa during evening puja to witness sacred Buddhist rituals.",
          location: "Kandy Lake",
          category: "Culture & Heritage"
        },
        {
          title: "Traditional Kandyan Cultural Show",
          description: "Live performance of Kandyan drumming, traditional dance, and fire-walking acrobatics.",
          location: "Kandy Cultural Centre",
          category: "Local Life"
        }
      ],
      regionalExperiences: [
        {
          title: "Royal Botanical Garden, Peradeniya",
          description: "Historic 147-acre botanical garden featuring giant bamboo and palm avenues.",
          location: "Peradeniya",
          category: "Nature"
        },
        {
          title: "Kandy City Walk and Lake Stroll",
          description: "Unhurried walk around Kandy Lake and central heritage market streets.",
          location: "Kandy Downtown",
          category: "Local Life"
        },
        {
          title: "Kandy Gem Museum & Ceylon Tea Museum, Hantana",
          description: "Exhibitions showcasing Sri Lankan sapphires and colonial tea processing equipment.",
          location: "Hantana Hills",
          category: "Heritage"
        }
      ]
    },
    {
      day: 5,
      title: "Transfer to Nuwara Eliya – Scenic Train to Ella",
      description: "Drive up into the hill country to Nuwara Eliya, before continuing to Nanu Oya station to board one of the world's most scenic train journeys down to Ella.",
      images: ["/media/Nuwara%20Eliya/i_1.jpeg", "/media/Nuwara%20Eliya/i_2.jpeg", "/media/Nuwara%20Eliya/i_3.jpeg"],
      cityImage: "/media/Nuwara%20Eliya/i_1.jpeg",
      categoryImage: "/media/activities/scenic-train-journeys.jpeg",
      historicalNote: "Nuwara Eliya, nicknamed 'Little England', is a colonial-era hill station founded in the 1800s at roughly 1,868 metres elevation. The rail line from Nanu Oya to Ella, built during the colonial tea-boom era, winds through tea estates, misty mountains and tunnels.",
      primaryExcursions: [
        {
          title: "Tea Plantation and Factory Visit in Nuwara Eliya",
          description: "Tour a working tea factory and emerald terraces with single-origin Ceylon tea tasting.",
          location: "Nuwara Eliya",
          category: "Culinary & Heritage"
        },
        {
          title: "Scenic Train Journey, Nanu Oya to Ella",
          description: "Observation-class rail trip through misty cloud forest, waterfalls, and tea estates.",
          location: "Highland Rail Line",
          category: "Scenic Train"
        },
        {
          title: "Transfer and Check-in in Ella",
          description: "Met at Ella station and transferred to your hillside retreat overlooking Ella Gap.",
          location: "Ella Valley",
          category: "Transfer & Stay"
        }
      ],
      regionalExperiences: [
        {
          title: "Gregory Lake Boating, Nuwara Eliya",
          description: "Swan pedal-boating or speedboat ride on colonial Gregory Lake.",
          location: "Gregory Lake",
          category: "Relaxation"
        },
        {
          title: "Hakgala Botanical Garden & Ramboda Falls Stop",
          description: "Visit high-altitude Rose gardens and panoramic mountain waterfall viewpoints.",
          location: "Hakgala / Ramboda",
          category: "Nature"
        },
        {
          title: "Victoria Park Birdwatching",
          description: "Spot rare highland migratory birds in Nuwara Eliya's central botanical park.",
          location: "Victoria Park",
          category: "Wildlife"
        }
      ]
    },
    {
      day: 6,
      title: "Ella – Transfer to Yala National Park",
      description: "A relaxed morning to explore Ella's landmarks before transferring to Yala for an afternoon or early-morning safari in search of the park's famous leopards.",
      images: ["/media/Ella/I_1.jpeg", "/media/Ella/i_2.jpeg", "/media/Ella/i_3.jpeg"],
      cityImage: "/media/Ella/I_1.jpeg",
      categoryImage: "/media/activities/wildlife-safari.jpeg",
      historicalNote: "Ella is best known for the Nine Arch Bridge, a colonial-era railway viaduct built without steel during WWI. Yala National Park boasts one of the highest densities of leopards recorded anywhere in the world.",
      primaryExcursions: [
        {
          title: "Visit to Nine Arch Bridge / Little Adam's Peak",
          description: "Morning hike to Little Adam's Peak and view of the iconic 99-foot Nine Arch Viaduct.",
          location: "Ella Ridge",
          category: "Hiking & Scenic"
        },
        {
          title: "Transfer to Yala",
          description: "Descend from the misty hill country down to the southern dry-zone lowlands.",
          location: "Yala Lowlands",
          category: "Transfer"
        },
        {
          title: "One Jeep Safari at Yala National Park",
          description: "4x4 game drive in search of leopards, sloth bears, wild Asian elephants, and crocodiles.",
          location: "Yala National Park",
          category: "Wildlife & Safari"
        }
      ],
      regionalExperiences: [
        {
          title: "Ravana Falls Stop & Ella Rock Hike",
          description: "Visit 82-foot Ravana Falls or undertake a challenging trek up Ella Rock cliff.",
          location: "Ravana Waterfalls",
          category: "Hiking"
        },
        {
          title: "Additional Yala Safari Session",
          description: "Dawn or dusk secondary safari for dedicated wildlife enthusiasts.",
          location: "Yala Block I",
          category: "Wildlife"
        },
        {
          title: "Kataragama Temple Visit",
          description: "Multi-faith holy shrine city venerated by Buddhists, Hindus, and indigenous Veddas.",
          location: "Kataragama",
          category: "Culture"
        }
      ]
    },
    {
      day: 7,
      title: "Transfer to Galle – Galle Fort Walking Tour",
      description: "Travel to the south coast and spend the afternoon exploring the atmospheric streets and ramparts of Galle Fort.",
      images: ["/media/Galle/i_1.jpeg", "/media/Galle/i_2.jpeg", "/media/Galle/i_3.jpeg"],
      cityImage: "/media/Galle/i_1.jpeg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Galle Fort is a UNESCO World Heritage Site, built originally by the Portuguese in the 16th century and substantially fortified by the Dutch from 1649 onwards. Its ramparts, lighthouse, Dutch Reformed Church and colonial townhouses make it the best-preserved example of a European fortified city in South Asia.",
      primaryExcursions: [
        {
          title: "Transfer to Galle",
          description: "Drive along the southern coastline passing coconut palms and ocean bays.",
          location: "South Coast",
          category: "Transfer"
        },
        {
          title: "Galle Fort Walking Tour",
          description: "Guided walking tour along 17th-century Dutch ramparts, bastions, and cobblestone lanes.",
          location: "Galle Fort",
          category: "Culture & Heritage"
        }
      ],
      regionalExperiences: [
        {
          title: "Unawatuna Beach Time & Jungle Beach Visit",
          description: "Relax on golden sand beaches or swim in clear turquoise bays near Galle.",
          location: "Unawatuna",
          category: "Relaxation"
        },
        {
          title: "Turtle Hatchery Visit & Stilt Fishermen Photo Stop",
          description: "Observe endangered sea turtle conservation efforts and traditional stilt fishermen.",
          location: "Koggala Coast",
          category: "Local Life & Wildlife"
        },
        {
          title: "Boutique Shopping within Galle Fort",
          description: "Browse independent jewelry shops, handicraft studios, and cafes inside the fort.",
          location: "Galle Fort Boutiques",
          category: "Shopping"
        }
      ]
    },
    {
      day: 8,
      title: "Departure",
      description: "After breakfast, transfer from Galle to Bandaranaike International Airport (approx. 2 hours) for your departure flight.",
      images: ["/media/Colombo/i_1.jpeg", "/media/Colombo/i_2.jpeg", "/media/Negombo/i_1.jpeg"],
      cityImage: "/media/Colombo/i_1.jpeg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Direct highway transfer via the Southern Expressway ensures smooth travel back to Colombo and Bandaranaike Airport.",
      primaryExcursions: [
        {
          title: "Breakfast at Hotel",
          description: "Full gourmet breakfast at your boutique hotel overlooking the ocean.",
          location: "Galle Hotel",
          category: "Relaxation"
        },
        {
          title: "Private Transfer to the Airport",
          description: "Direct highway transfer via Southern Expressway to Bandaranaike Airport (approx. 2 hrs).",
          location: "Bandaranaike Airport",
          category: "Transfer"
        }
      ],
      regionalExperiences: [
        {
          title: "Stop at a Lace-Making / Handicraft Workshop en route",
          description: "Watch traditional bobbin lace-making and woodcarving demonstrations.",
          location: "Southern Coast",
          category: "Handicrafts"
        },
        {
          title: "Coastal Photo Stops along the Galle Road",
          description: "Final scenic photo stops along palm-fringed ocean vistas before heading home.",
          location: "Galle Road",
          category: "Scenic"
        }
      ]
    }
  ],
  packages: [
    {
      name: "Classic",
      price: 2250,
      perks: ["Boutique hotel & lodge stays", "Daily breakfast & dinner", "Private vehicle with chauffeur-guide", "All included excursion tickets"]
    },
    {
      name: "Private",
      price: 3200,
      perks: ["Suite upgrades at all stays", "All meals + wine pairings", "Senior specialist guide", "Priority train seating"]
    },
    {
      name: "Ultra",
      price: 4900,
      perks: ["Property buyout options", "Personal chef + butler", "Helicopter transfers", "Dedicated photographer & concierge"]
    }
  ],
  coordinates: { lat: 6.0535, lng: 80.221 },
  region: "Island-Wide Circuit",
  addOns: [
    { id: "pidurangala-hike", label: "Sunrise Pidurangala hike upgrade", price: 60 },
    { id: "polonnaruwa-excursion", label: "Polonnaruwa ancient city full-day trip", price: 140 },
    { id: "hot-air-balloon", label: "Hot air balloon flight over Sigiriya", price: 280 },
    { id: "yala-safari-extra", label: "Additional Yala safari game drive", price: 110 }
  ]
};

export default ceylonCoastToHighlands;
