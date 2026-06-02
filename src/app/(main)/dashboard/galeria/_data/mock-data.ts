export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  status: "Disponível" | "Reservado" | "Vendido" | string;
  img: string;
  type: string;
  collab: boolean;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  contract: "Exclusivo" | "Não-exclusivo" | string;
  since: string;
  artworks: number;
  sales: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  interested: number;
  banner: string;
  type: "Vernissage" | "Workshop" | "Exposição" | string;
}

export const galleryData = {
  name: "Galeria Atelier 27",
  location: "São Paulo, SP — Vila Madalena",
  banner:
    "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1920&h=600&fit=crop",
  avatar:
    "https://images.unsplash.com/photo-1545987796-200677ee1011?w=300&h=300&fit=crop",
  about:
    "Espaço dedicado à arte contemporânea brasileira. Representamos artistas emergentes e consagrados, com curadoria voltada à pintura, fotografia e arte multimídia.",
  founded: 2014,
  verified: true,
  artistsCount: 28,
  artworksCount: 312,
  exhibitionsCount: 47,
  socials: { instagram: "@atelier27", website: "atelier27.art" },
};

export const featuredArtworks: Artwork[] = [
  {
    id: "a1",
    title: "Travessia",
    artist: "Lívia Moreno",
    price: 4800,
    status: "Disponível",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
    type: "Pintura",
    collab: false,
  },
  {
    id: "a2",
    title: "Mata Adentro",
    artist: "Caio Bento",
    price: 6200,
    status: "Reservado",
    img: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1000&fit=crop",
    type: "Pintura",
    collab: true,
  },
  {
    id: "a3",
    title: "Silêncio Urbano",
    artist: "Rita Andrade",
    price: 3500,
    status: "Disponível",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop",
    type: "Fotografia",
    collab: false,
  },
  {
    id: "a4",
    title: "Cerâmica Viva",
    artist: "Pedro Mauá",
    price: 2100,
    status: "Vendido",
    img: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&h=1000&fit=crop",
    type: "Escultura",
    collab: false,
  },
  {
    id: "a5",
    title: "Aurora Boreal",
    artist: "Lívia Moreno",
    price: 5400,
    status: "Disponível",
    img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=1000&fit=crop",
    type: "Pintura",
    collab: false,
  },
  {
    id: "a6",
    title: "Ritmo Tropical",
    artist: "Caio Bento",
    price: 3900,
    status: "Disponível",
    img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=1000&fit=crop",
    type: "Pintura",
    collab: true,
  },
];

export const representedArtists: Artist[] = [
  {
    id: "ar1",
    name: "Lívia Moreno",
    avatar: "https://i.pravatar.cc/200?img=47",
    contract: "Exclusivo",
    since: "2021",
    artworks: 24,
    sales: "R$ 184k",
  },
  {
    id: "ar2",
    name: "Caio Bento",
    avatar: "https://i.pravatar.cc/200?img=12",
    contract: "Não-exclusivo",
    since: "2022",
    artworks: 18,
    sales: "R$ 92k",
  },
  {
    id: "ar3",
    name: "Rita Andrade",
    avatar: "https://i.pravatar.cc/200?img=32",
    contract: "Exclusivo",
    since: "2019",
    artworks: 31,
    sales: "R$ 211k",
  },
  {
    id: "ar4",
    name: "Pedro Mauá",
    avatar: "https://i.pravatar.cc/200?img=22",
    contract: "Não-exclusivo",
    since: "2023",
    artworks: 9,
    sales: "R$ 38k",
  },
];

export const eventsMock: EventItem[] = [
  {
    id: "e1",
    title: "Vernissage — Travessias",
    date: "12 Jun 2026",
    time: "19h00",
    location: "Galeria Atelier 27",
    price: 0,
    capacity: 120,
    interested: 84,
    banner:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&h=500&fit=crop",
    type: "Vernissage",
  },
  {
    id: "e2",
    title: "Workshop de Pintura Abstrata",
    date: "20 Jun 2026",
    time: "14h00",
    location: "Atelier 27",
    price: 180,
    capacity: 18,
    interested: 12,
    banner:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&h=500&fit=crop",
    type: "Workshop",
  },
  {
    id: "e3",
    title: "Exposição — Mata Adentro",
    date: "05 Jul 2026",
    time: "10h00",
    location: "Galeria Atelier 27",
    price: 0,
    capacity: 300,
    interested: 142,
    banner:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&h=500&fit=crop",
    type: "Exposição",
  },
];

export const reviewsMock = [
  {
    id: "r1",
    author: "Marina Costa",
    rating: 5,
    text: "Curadoria impecável e atendimento atencioso. Comprei uma peça e o processo foi transparente do início ao fim.",
    date: "Há 2 semanas",
  },
  {
    id: "r2",
    author: "Eduardo Lins",
    rating: 5,
    text: "Galeria de referência. Sempre traz artistas relevantes e mostras bem montadas.",
    date: "Há 1 mês",
  },
  {
    id: "r3",
    author: "Beatriz Hoffman",
    rating: 4,
    text: "Excelente espaço. Recomendo as visitas guiadas.",
    date: "Há 2 meses",
  },
];
