export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  signature?: string;
}

export const team: TeamMember[] = [
  {
    id: "arun",
    name: "Arun Weerasinghe",
    role: "Wildlife Specialist",
    photo: "/media/p_1.jpg",
    signature: "Arun",
  },
  {
    id: "maya",
    name: "Maya Perera",
    role: "Heritage Guide",
    photo: "/media/p_2.jpg",
    signature: "Maya",
  },
  {
    id: "devin",
    name: "Devin Silva",
    role: "Expedition Leader",
    photo: "/media/p_3.jpg",
    signature: "Devin",
  },
  {
    id: "anya",
    name: "Anya Fernando",
    role: "Experience Designer",
    photo: "/media/p_4.jpg",
    signature: "Anya",
  },
  {
    id: "saman",
    name: "Saman Kumara",
    role: "Culinary Curator",
    photo: "/media/p_5.jpg",
    signature: "Saman",
  }
];
