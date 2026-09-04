import { type ExperienceData } from './hill-country-by-rail';

const grandTour14Days: ExperienceData = {
  slug: "grand-tour-14-days",
  title: "14 Nights 15 Days Ultimate Sri Lanka Adventure",
  tagline: "Wildlife, Rainforest, Hill Country & Coast — Comprehensive Grand Tour across Sri Lanka",
  heroImage: "/media/hero_3.jpg",
  gallery: [
    "/media/Sigiriya/i_1.jpeg",
    "/media/Polonnaruwa/i_1.jpeg",
    "/media/Kandy/i_1.jpeg",
    "/media/Nuwara%20Eliya/i_1.jpeg",
    "/media/Yala/i_1.jpeg",
    "/media/Mirissa/i_1.jpeg",
    "/media/Galle/i_1.jpeg"
  ],
  location: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Udawalawe → Mirissa → Galle → Bentota → Colombo, Sri Lanka",
  durationDays: 15,
  groupSize: "2–8 guests",
  priceFrom: 4200,
  currency: "USD",
  overview: "The definitive 15-day Sri Lanka odyssey combining every corner of the island: elephant sanctuaries, UNESCO ancient kingdoms, indigenous Vedda heritage in Mahiyanganaya, misted tea country rail, Yala leopard safari, Udawalawe elephant transit home, ocean blue whale watching in Mirissa, Galle Fort, Madu River Ramsar wetlands, and Geoffrey Bawa's Lunuganga estate.\n\nHandpicked luxury boutique retreats, private air-conditioned vehicle transfers, and dedicated naturalist guides throughout.",
  highlights: [
    "Millennium Elephant Foundation river bathing observation",
    "Sigiriya Lion Rock climb & Polonnaruwa UNESCO cycling tour",
    "Cultural exchange with the indigenous Vedda community at Dambana",
    "Temple of the Tooth Relic & Kandyan Cultural Dance performance",
    "Highland tea estate tour & Nanu Oya to Ella scenic train journey",
    "Yala National Park leopard safari & Udawalawe Elephant Transit Home",
    "Blue whale & dolphin ocean charter in Mirissa",
    "Madu River Ramsar wetland safari & Geoffrey Bawa's Lunuganga Garden"
  ],
  included: [
    "14 nights in luxury boutique hotels, tea planter bungalows & beachfront villas",
    "Daily breakfast and gourmet dinners",
    "Private air-conditioned vehicle with chauffeur-guide throughout",
    "All entrance fees (Sigiriya, Dambulla, Polonnaruwa, Temple of Tooth, Lunuganga)",
    "Yala & Udawalawe 4x4 jeep safaris with expert tracker",
    "Mirissa blue whale watching boat excursion",
    "Observation-class train tickets (Nanu Oya to Ella)",
    "24/7 dedicated on-trip concierge service"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival – Millennium Elephant Foundation – Transfer to Sigiriya",
      description: "On arrival at Bandaranaike International Airport, transfer towards Kegalle to visit the Millennium Elephant Foundation before continuing to Sigiriya.",
      images: ["/media/Sigiriya/i_1.jpeg", "/media/Sigiriya/i_2.jpeg", "/media/Sigiriya/i_3.jpeg"],
      cityImage: "/media/Sigiriya/i_1.jpeg",
      categoryImage: "/media/activities/wildlife-safari.jpeg",
      historicalNote: "The Millennium Elephant Foundation is a retirement and welfare sanctuary for former working elephants, providing them long-term care in a natural setting. Guests observe elephants at close range and watch them bathe in the adjoining river.",
      primaryExcursions: [
        {
          title: "Airport Meet & Greet and Private Transfer",
          description: "Met on arrival at Colombo airport and transferred by private air-conditioned vehicle.",
          location: "Colombo / Kegalle",
          category: "Transfer"
        },
        {
          title: "Millennium Elephant Foundation Visit",
          description: "Observe rescued elephants enjoying river bathing and learn about Sri Lanka's elephant welfare efforts.",
          location: "Kegalle Sanctuary",
          category: "Wildlife & Conservation"
        },
        {
          title: "Continued Transfer to Sigiriya",
          description: "Proceed to your boutique jungle eco-lodge in Sigiriya.",
          location: "Sigiriya Lodge",
          category: "Transfer & Stay"
        }
      ],
      regionalExperiences: [
        {
          title: "Evening Village Lake Walk on arrival in Sigiriya",
          description: "Relaxed stroll along a quiet rural reservoir near your lodge at golden hour.",
          location: "Sigiriya Village",
          category: "Nature"
        }
      ]
    },
    {
      day: 2,
      title: "Sigiriya Rock Fortress Climb, Village Tour & Evening Safari",
      description: "A full day exploring Sigiriya: the climb of the rock fortress in the morning, a traditional village tour in the afternoon, and a wildlife safari at dusk.",
      images: ["/media/Sigiriya/i_4.jpg", "/media/Sigiriya/i_5.jpg", "/media/Sigiriya/i_6.jpg"],
      cityImage: "/media/Sigiriya/i_4.jpg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "Sigiriya's 5th-century rock fortress and palace, built for King Kashyapa, is a UNESCO World Heritage Site (1982), famed for its frescoes, Mirror Wall and sophisticated ancient water-garden engineering.",
      primaryExcursions: [
        {
          title: "Sigiriya Rock Fortress Climb",
          description: "Dawn climb of King Kashyapa's Lion Rock citadel, mirror wall, and summit gardens.",
          location: "Sigiriya Citadel",
          category: "Culture & Heritage"
        },
        {
          title: "Village Tour (Bullock Cart, Canoe Ride, Village Lunch)",
          description: "Traditional bullock cart ride, catamaran lake float, and lotus leaf village lunch.",
          location: "Habarana Village",
          category: "Local Life & Culinary"
        },
        {
          title: "Evening Jeep Safari at Minneriya / Kaudulla / Hurulu Eco Park",
          description: "4x4 game safari to observe wild elephant herds congregating at dusk.",
          location: "Minneriya / Kaudulla",
          category: "Wildlife & Safari"
        }
      ],
      regionalExperiences: [
        {
          title: "Sunrise Hot Air Balloon Ride over the Cultural Triangle",
          description: "Float over ancient reservoirs and jungle canopy at sunrise (seasonal Dec–Apr).",
          location: "Sigiriya Skies",
          season: "Dec–Apr",
          category: "Adventure"
        },
        {
          title: "Sunrise Pidurangala Rock Hike",
          description: "Alternative morning hike opposite Sigiriya for 360-degree views.",
          location: "Pidurangala",
          category: "Hiking"
        }
      ]
    },
    {
      day: 3,
      title: "Polonnaruwa UNESCO Ancient City & Dambulla Cave Temple",
      description: "A day trip to the ancient city of Polonnaruwa, best explored by bicycle, followed by a visit to the Dambulla Cave Temple and a nearby spice garden.",
      images: ["/media/Polonnaruwa/i_1.jpeg", "/media/Polonnaruwa/i_2.jpeg", "/media/Polonnaruwa/i_3.jpeg"],
      cityImage: "/media/Polonnaruwa/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "Polonnaruwa, Sri Lanka's medieval capital from the 11th to 13th centuries, is a UNESCO World Heritage Site renowned for the monumental Gal Vihara rock-cut Buddhas. Dambulla Cave Temple is a UNESCO site housing 153 Buddha statues.",
      primaryExcursions: [
        {
          title: "Polonnaruwa Ancient City Excursion",
          description: "Guided cycling tour of Gal Vihara rock-cut Buddhas, Royal Palace, and Rankoth Vehera stupa.",
          location: "Polonnaruwa",
          category: "Culture & Heritage"
        },
        {
          title: "Dambulla Cave Temple Visit",
          description: "Explore 5 painted cave shrines with 153 Buddha statues and ancient murals.",
          location: "Dambulla",
          category: "Culture & Heritage"
        },
        {
          title: "Matale Spice Garden Visit",
          description: "Guided tour of cinnamon, cardamom, and pepper plantations.",
          location: "Matale",
          category: "Culinary"
        }
      ],
      regionalExperiences: [
        {
          title: "Ritigala Forest Monastery Ruins Visit",
          description: "Trek through jungle-clad ruins of an ancient ascetic monastic retreat.",
          location: "Ritigala Reserve",
          category: "Hiking & Heritage"
        },
        {
          title: "Additional Safari Session",
          description: "Secondary game drive in Kaudulla or Hurulu Eco Park.",
          location: "Kaudulla",
          category: "Wildlife"
        }
      ]
    },
    {
      day: 4,
      title: "Transfer to Kandy – Temple of the Tooth & Cultural Show",
      description: "Travel to Kandy, visiting the Temple of the Sacred Tooth Relic and enjoying a traditional cultural show in the evening.",
      images: ["/media/Kandy/i_1.jpeg", "/media/Kandy/i_2.jpeg", "/media/Kandy/i_3.jpeg"],
      cityImage: "/media/Kandy/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "The Temple of the Sacred Tooth Relic lies at the heart of the Sacred City of Kandy, a UNESCO World Heritage Site since 1988, enshrining the relic of the Buddha's tooth.",
      primaryExcursions: [
        {
          title: "Transfer to Kandy",
          description: "Ascend from the plains into the mountain foothills surrounding Kandy.",
          location: "Kandy Road",
          category: "Transfer"
        },
        {
          title: "Temple of the Sacred Tooth Relic Visit",
          description: "Evening puja ritual at Sri Dalada Maligawa.",
          location: "Kandy Lake",
          category: "Culture & Heritage"
        },
        {
          title: "Kandy Downtown Walk",
          description: "Guided stroll through Kandy's historic artisan quarters.",
          location: "Kandy City",
          category: "Local Life"
        },
        {
          title: "Traditional Kandyan Cultural Show",
          description: "Live performance of Kandyan drumming, dance, and fire-walking.",
          location: "Kandy Cultural Centre",
          category: "Local Life"
        }
      ],
      regionalExperiences: [
        {
          title: "Royal Botanical Garden, Peradeniya",
          description: "Historic 147-acre botanical grounds with palm avenues.",
          location: "Peradeniya",
          category: "Nature"
        },
        {
          title: "Kandy Gem Museum & Lake Stroll",
          description: "Explore sapphire exhibitions and take a lake walk.",
          location: "Kandy Downtown",
          category: "Heritage"
        }
      ]
    },
    {
      day: 5,
      title: "Mahiyanganaya Dabana & Dambana Vedda Village Visit",
      description: "A day trip from Kandy to Mahiyanganaya to visit its sacred stupa, followed by a visit to the indigenous Vedda community at nearby Dambana.",
      images: ["/media/Kandy/i_2.jpeg", "/media/Kandy/i_1.jpeg", "/media/Kandy/i_3.jpeg"],
      cityImage: "/media/Kandy/i_2.jpeg",
      categoryImage: "/media/activities/festivals-local-life.jpeg",
      historicalNote: "Mahiyanganaya Dabana stupa marks the first place Buddha visited in Sri Lanka. Dambana is home to the Vedda people, Sri Lanka's indigenous hunter-gatherer descendants, offering a rare cultural exchange.",
      primaryExcursions: [
        {
          title: "Excursion to Mahiyanganaya Dabana",
          description: "Visit the ancient stupa venerated as the first location visited by Buddha in Sri Lanka.",
          location: "Mahiyanganaya",
          category: "Culture & Heritage"
        },
        {
          title: "Visit to the Vedda Indigenous Community at Dambana",
          description: "Cultural exchange with Vedda elders learning about traditional hunting, forest lore, and language.",
          location: "Dambana Village",
          category: "Indigenous Culture"
        }
      ],
      regionalExperiences: [
        {
          title: "Traditional Vedda Dance or Storytelling Session",
          description: "Hear ancient folklore and observe ritual community dances.",
          location: "Dambana Community",
          category: "Culture"
        },
        {
          title: "Short Forest Walk with a Vedda Guide",
          description: "Guided medicinal plant walk led by indigenous forest trackers.",
          location: "Dambana Forest",
          category: "Nature & Hiking"
        }
      ]
    },
    {
      day: 6,
      title: "Transfer to Nuwara Eliya – Tea Country",
      description: "Continue up into the hills to Nuwara Eliya, visiting a working tea factory and the colonial-era townscape.",
      images: ["/media/Nuwara%20Eliya/i_1.jpeg", "/media/Nuwara%20Eliya/i_2.jpeg", "/media/Nuwara%20Eliya/i_3.jpeg"],
      cityImage: "/media/Nuwara%20Eliya/i_1.jpeg",
      categoryImage: "/media/activities/culinary-experiences.jpeg",
      historicalNote: "Nuwara Eliya, nicknamed 'Little England', was developed by British planters from the 1820s as a cool-climate hill retreat at roughly 1,868 metres elevation.",
      primaryExcursions: [
        {
          title: "Transfer to Nuwara Eliya",
          description: "Ascend mountain passes past waterfalls into misted tea hills.",
          location: "Nuwara Eliya Road",
          category: "Transfer"
        },
        {
          title: "Tea Factory Visit and Tasting",
          description: "Private tour of working tea factory and single-origin Ceylon tea tasting.",
          location: "Nuwara Eliya Factory",
          category: "Culinary & Heritage"
        }
      ],
      regionalExperiences: [
        {
          title: "Gregory Lake Boating",
          description: "Swan pedal-boating or speedboat ride on colonial Gregory Lake.",
          location: "Gregory Lake",
          category: "Relaxation"
        },
        {
          title: "Hakgala Botanical Garden & Ramboda Falls Stop",
          description: "High-altitude rose gardens and waterfall viewpoints.",
          location: "Hakgala / Ramboda",
          category: "Nature"
        },
        {
          title: "Victoria Park",
          description: "Stroll through manicured gardens in central Nuwara Eliya.",
          location: "Victoria Park",
          category: "Nature"
        }
      ]
    },
    {
      day: 7,
      title: "Transfer to Nanu Oya – Scenic Train to Ella",
      description: "Board the train at Nanu Oya for the ride to Ella, one of the most celebrated rail journeys in the world.",
      images: ["/media/Ella/I_1.jpeg", "/media/Ella/i_2.jpeg", "/media/Ella/i_3.jpeg"],
      cityImage: "/media/Ella/I_1.jpeg",
      categoryImage: "/media/activities/scenic-train-journeys.jpeg",
      historicalNote: "The Nanu Oya-to-Ella line, built during the colonial tea-plantation boom, winds through terraced tea estates, misty peaks and hillside tunnels.",
      primaryExcursions: [
        {
          title: "Scenic Train Journey, Nanu Oya to Ella",
          description: "Observation-class train journey through mountain cloud forest and tea estates.",
          location: "Highland Rail Line",
          category: "Scenic Train"
        },
        {
          title: "Transfer and Check-in in Ella",
          description: "Met at Ella station and transferred to your hillside hotel.",
          location: "Ella Valley",
          category: "Transfer & Stay"
        }
      ],
      regionalExperiences: [
        {
          title: "Nine Arch Bridge Visit",
          description: "Walk to the 99-foot stone railway viaduct built without steel.",
          location: "Nine Arch Bridge",
          category: "Scenic"
        },
        {
          title: "Little Adam's Peak Hike",
          description: "Gentle walk up Little Adam's Peak for 360-degree views.",
          location: "Little Adam's Peak",
          category: "Hiking"
        },
        {
          title: "Ravana Falls Stop & Ella Rock Hike",
          description: "Visit cascading Ravana Falls or hike Ella Rock.",
          location: "Ravana Waterfalls",
          category: "Nature"
        }
      ]
    },
    {
      day: 8,
      title: "Transfer to Yala – Wildlife Safari",
      description: "Travel to Yala National Park for a jeep safari in search of its famously dense leopard population and abundant wildlife.",
      images: ["/media/wilpattu/i_1.jpg", "/media/wilpattu/i_2.jpg", "/media/wilpattu/i_3.jpg"],
      cityImage: "/media/wilpattu/i_1.jpg",
      categoryImage: "/media/activities/wildlife-safari.jpeg",
      historicalNote: "Yala National Park is Sri Lanka's most visited national park and holds one of the highest recorded densities of leopards anywhere in the world.",
      primaryExcursions: [
        {
          title: "Transfer to Yala",
          description: "Descend from the highlands to the southern dry-zone wildlife plains.",
          location: "Yala Lowlands",
          category: "Transfer"
        },
        {
          title: "One Jeep Safari at Yala National Park",
          description: "4x4 game safari for leopards, sloth bears, wild Asian elephants, and crocodiles.",
          location: "Yala National Park",
          category: "Wildlife & Safari"
        }
      ],
      regionalExperiences: [
        {
          title: "Additional Safari Session",
          description: "Second game drive in Yala Block I for avid wildlife photographers.",
          location: "Yala Block I",
          category: "Wildlife"
        },
        {
          title: "Kataragama Temple Visit",
          description: "Multi-faith pilgrimage city venerated by Buddhists and Hindus.",
          location: "Kataragama",
          category: "Culture"
        }
      ]
    },
    {
      day: 9,
      title: "Transfer to Udawalawe – Elephant Transit Home & Safari",
      description: "Continue to Udawalawe, visiting the Elephant Transit Home before heading out on an afternoon safari in the national park.",
      images: ["/media/Yala/i_2.jpeg", "/media/Yala/i_1.jpeg", "/media/Yala/i_3.jpeg"],
      cityImage: "/media/Yala/i_2.jpeg",
      categoryImage: "/media/activities/wildlife-safari.jpeg",
      historicalNote: "The Udawalawe Elephant Transit Home cares for orphaned wild elephant calves aiming to release them back into the wild. Udawalawe National Park offers year-round wild elephant sightings.",
      primaryExcursions: [
        {
          title: "Udawalawe Elephant Transit Home Visit",
          description: "Observe supervised milk-feeding of rescued wild elephant calves.",
          location: "Udawalawe Transit Home",
          category: "Wildlife & Conservation"
        },
        {
          title: "Jeep Safari at Udawalawe National Park",
          description: "4x4 safari across open grassland habitats for wild elephant herds.",
          location: "Udawalawe Park",
          category: "Wildlife & Safari"
        }
      ],
      regionalExperiences: [
        {
          title: "Additional Safari Session",
          description: "Early morning or late afternoon extra game drive.",
          location: "Udawalawe Reservoir",
          category: "Wildlife"
        }
      ]
    },
    {
      day: 10,
      title: "Transfer to Mirissa",
      description: "Travel to the south-coast beach town of Mirissa, with the afternoon free to relax ahead of the next day's whale watching excursion.",
      images: ["/media/Mirissa/i_1.jpeg", "/media/Mirissa/i_2.jpeg", "/media/Mirissa/i_3.jpeg"],
      cityImage: "/media/Mirissa/i_1.jpeg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Mirissa lies on Sri Lanka's southern whale-watching migratory route, one of the closest points in the world to deep-water shelves where blue whales feed.",
      primaryExcursions: [
        {
          title: "Transfer to Mirissa",
          description: "Drive along the southern coastline to Mirissa beach bay.",
          location: "Mirissa Coast",
          category: "Transfer"
        },
        {
          title: "Afternoon at Leisure",
          description: "Relax on golden sand beaches or enjoy a beachside meal.",
          location: "Mirissa Beach",
          category: "Relaxation"
        }
      ],
      regionalExperiences: [
        {
          title: "Coconut Tree Hill Sunset Visit",
          description: "Walk up the famous palm-covered cliff headland for sunset views.",
          location: "Coconut Tree Hill",
          category: "Scenic"
        },
        {
          title: "Parrot Rock Viewpoint",
          description: "Climb the rocky islet in Mirissa bay during low tide.",
          location: "Parrot Rock",
          category: "Scenic"
        }
      ]
    },
    {
      day: 11,
      title: "Mirissa Whale Watching",
      description: "An early-morning boat excursion in search of blue whales, sperm whales and dolphins, with the rest of the day free at the beach.",
      images: ["/media/Mirissa/i_4.jpg", "/media/Mirissa/i_5.jpg", "/media/Mirissa/i_6.jpg"],
      cityImage: "/media/Mirissa/i_4.jpg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Waters off Mirissa form a major migratory corridor for blue whales, the largest animal on Earth (Nov–Apr), alongside sperm whales and spinner dolphins.",
      primaryExcursions: [
        {
          title: "Whale Watching Boat Excursion",
          description: "Early-morning ocean charter off Mirissa to observe blue whales and dolphins.",
          location: "Mirissa Ocean",
          category: "Marine Life"
        }
      ],
      regionalExperiences: [
        {
          title: "Beach Relaxation / Water Sports",
          description: "Surfing, paddleboarding, or swimming in Mirissa bay.",
          location: "Mirissa Beach",
          category: "Water Sports"
        },
        {
          title: "Snorkelling Trip",
          description: "Snorkel in clear coastal waters with sea turtles.",
          location: "Polhena Bay",
          category: "Marine Life"
        }
      ]
    },
    {
      day: 12,
      title: "Transfer to Galle – Galle Fort Walking Tour",
      description: "Travel a short distance to Galle and spend the afternoon exploring the ramparts and colonial streets of Galle Fort.",
      images: ["/media/Galle/i_1.jpeg", "/media/Galle/i_2.jpeg", "/media/Galle/i_3.jpeg"],
      cityImage: "/media/Galle/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "Galle Fort (UNESCO World Heritage Site) was built by the Portuguese in the 16th century and expanded by the Dutch from 1649.",
      primaryExcursions: [
        {
          title: "Transfer to Galle",
          description: "Short coastal drive from Mirissa to historic Galle Fort.",
          location: "Galle Road",
          category: "Transfer"
        },
        {
          title: "Galle Fort Walking Tour",
          description: "Guided stroll along Dutch sea walls, bastions, lighthouse, and boutique streets.",
          location: "Galle Fort",
          category: "Culture & Heritage"
        }
      ],
      regionalExperiences: [
        {
          title: "Unawatuna Beach Time",
          description: "Swim in golden crescent bay near Galle.",
          location: "Unawatuna",
          category: "Relaxation"
        },
        {
          title: "Stilt Fishermen Photo Stop",
          description: "Photograph traditional stilt fishermen perched over ocean waves.",
          location: "Koggala",
          category: "Local Life"
        },
        {
          title: "Boutique Shopping within Fort",
          description: "Browse artisan gem, antique, and fashion shops.",
          location: "Galle Fort",
          category: "Shopping"
        }
      ]
    },
    {
      day: 13,
      title: "Madu River Ramsar Wetland – Transfer to Bentota – Turtle Conservation Project",
      description: "Depart Galle for a boat safari on the Madu River, before continuing to Bentota to visit a turtle conservation project.",
      images: ["/media/Galle/i_2.jpeg", "/media/Galle/i_1.jpeg", "/media/Galle/i_3.jpeg"],
      cityImage: "/media/Galle/i_2.jpeg",
      categoryImage: "/media/activities/nature-eco-experiences.jpeg",
      historicalNote: "Madu River estuary is an internationally important Ramsar wetland with mangrove channels and Cinnamon Island. Bentota turtle conservation hatcheries protect endangered marine turtle species.",
      primaryExcursions: [
        {
          title: "Madu River Boat Safari (Ramsar Wetland)",
          description: "Boat safari through mangrove tunnels, visiting Cinnamon Island and fish therapy spots.",
          location: "Madu River",
          category: "Nature & Eco"
        },
        {
          title: "Transfer to Bentota",
          description: "Proceed to your beachfront resort in Bentota.",
          location: "Bentota Beach",
          category: "Transfer & Stay"
        },
        {
          title: "Turtle Conservation Project Visit",
          description: "Visit a sea turtle hatchery protecting endangered marine turtle eggs and releasing hatchlings.",
          location: "Bentota Hatchery",
          category: "Wildlife & Conservation"
        }
      ],
      regionalExperiences: [
        {
          title: "Cinnamon Island Demonstration",
          description: "Watch local artisans peel and roll raw cinnamon bark.",
          location: "Cinnamon Island",
          category: "Handicrafts"
        },
        {
          title: "Bentota Beach Time",
          description: "Unwind on Bentota's wide golden sand ocean beach.",
          location: "Bentota Coast",
          category: "Relaxation"
        }
      ]
    },
    {
      day: 14,
      title: "Lunuganga Garden, Bentota – Transfer to Colombo – City Tour",
      description: "Visit Geoffrey Bawa's Lunuganga estate in the morning, before transferring to Colombo for an evening city tour.",
      images: ["/media/Colombo/i_1.jpeg", "/media/Colombo/i_2.jpeg", "/media/Negombo/i_1.jpeg"],
      cityImage: "/media/Colombo/i_1.jpeg",
      categoryImage: "/media/activities/culture-heritage.jpeg",
      historicalNote: "Lunuganga was the country estate of Geoffrey Bawa (1919–2003), pioneer of 'Tropical Modernism' fusing modernist form with Sri Lankan climate and landscape.",
      primaryExcursions: [
        {
          title: "Lunuganga Garden Visit, Bentota",
          description: "Guided garden walk through architect Geoffrey Bawa's living laboratory estate.",
          location: "Lunuganga Estate",
          category: "Architecture & Heritage"
        },
        {
          title: "Transfer to Colombo",
          description: "Drive to Colombo along the expressway.",
          location: "Colombo Expressway",
          category: "Transfer"
        },
        {
          title: "Colombo City Tour (Galle Face Green, Gangaramaya Temple, Independence Square)",
          description: "Guided capital tour covering historic temples, seafront, and Dutch precinct.",
          location: "Colombo City",
          category: "City & Culture"
        }
      ],
      regionalExperiences: [
        {
          title: "Shopping at Odel or House of Fashions",
          description: "Shop for Ceylon tea, spices, and local designer wear.",
          location: "Colombo Shopping",
          category: "Shopping"
        },
        {
          title: "Lotus Tower Observation Deck",
          description: "Enjoy panoramic night views from South Asia's tallest self-supported tower.",
          location: "Lotus Tower Colombo",
          category: "City Views"
        }
      ]
    },
    {
      day: 15,
      title: "Departure",
      description: "After breakfast, transfer to Bandaranaike International Airport for your onward flight.",
      images: ["/media/departure/i_1.jpg", "/media/departure/i_2.jpg", "/media/departure/i_3.jpg"],
      cityImage: "/media/departure/i_1.jpg",
      categoryImage: "/media/activities/beaches-coastal-experiences.jpeg",
      historicalNote: "Direct highway transfer from Colombo to Bandaranaike Airport.",
      primaryExcursions: [
        {
          title: "Breakfast at Hotel",
          description: "Full gourmet breakfast at your Colombo hotel.",
          location: "Colombo Hotel",
          category: "Relaxation"
        },
        {
          title: "Private Transfer to the Airport",
          description: "Private air-conditioned transfer to Bandaranaike Airport for departure.",
          location: "Bandaranaike Airport",
          category: "Transfer"
        }
      ],
      regionalExperiences: [
        {
          title: "Last-Minute Souvenir Shopping en route",
          description: "Final stop for Ceylon tea and handicraft gifts before departure.",
          location: "Airport Road",
          category: "Shopping"
        }
      ]
    }
  ],
  packages: [
    {
      name: "Classic",
      price: 4200,
      perks: ["Boutique hotel & bungalow stays", "Daily breakfast & dinner", "Private vehicle with chauffeur-guide", "All included excursion tickets"]
    },
    {
      name: "Private",
      price: 5800,
      perks: ["Suite upgrades at all stays", "All meals + wine pairings", "Senior specialist guide", "Priority train seating"]
    },
    {
      name: "Ultra",
      price: 8500,
      perks: ["Property buyout options", "Personal chef + butler", "Helicopter transfers", "Dedicated photographer & concierge"]
    }
  ],
  coordinates: { lat: 6.927, lng: 79.861 },
  region: "Island-Wide Circuit",
  addOns: [
    { id: "hot-air-balloon", label: "Hot air balloon flight over Sigiriya", price: 280 },
    { id: "vedda-forest-walk", label: "Private forest walk with Vedda guide", price: 90 },
    { id: "whale-vip", label: "Private whale watching catamaran upgrade", price: 350 },
    { id: "helicopter-transfer", label: "Helicopter scenic transfer option", price: 980 }
  ]
};

export default grandTour14Days;
