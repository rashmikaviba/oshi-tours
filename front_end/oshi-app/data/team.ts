export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  signature?: string;
}

export const team: TeamMember[] = [
  {
    id: "galle-fort",
    name: "Heritage",
    role: "COASTAL FORTRESS & SEA",
    photo: "/media/p_1.jpg",
    signature: "Heritage",
  },
  {
    id: "wilderness-safaris",
    name: "Wilderness",
    role: "LEOPARD & ELEPHANT SAFARIS",
    photo: "/media/p_2.jpg",
    signature: "Wilderness",
  },
  {
    id: "village-immersion",
    name: "Culture",
    role: "AUTHENTIC VILLAGE LAGOONS",
    photo: "/media/p_3.jpg",
    signature: "Culture",
  },
  {
    id: "highland-waterways",
    name: "Highlands",
    role: "PRIVATE SCENIC WATERWAYS",
    photo: "/media/p_4.jpg",
    signature: "Highlands",
  },
  {
    id: "ancient-citadels",
    name: "Sanctuaries",
    role: "ANCIENT UNESCO TEMPLES",
    photo: "/media/p_5.jpg",
    signature: "Sanctuaries",
  },
];
