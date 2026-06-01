// src/lib/mock-data.ts

// ─── Tipos locais para os mocks ───────────────────────────────────────────────

export interface FeaturedArtwork {
  id: string;
  imagemUrl: string;
  titulo: string;
  artistaNome: string;
  categoria: string;
}

export interface ArtistaMock {
  id: string;
  nome: string;
  specialty: string;
  location: string;
  avatar: string;
  obras: {
    id: string;
    titulo: string;
    imagemUrl: string;
    preco: string;
  }[];
}

export interface EventoMock {
  id: string;
  imagemUrl: string;
  titulo: string;
  date: string;
  local: string;
  descricao: string;
  attendees: string;
  badge: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: "eye" | "users" | "calendar";
}

// ─── Obras em destaque ────────────────────────────────────────────────────────

export const featuredArtworks: FeaturedArtwork[] = [
  {
    id: "1",
    imagemUrl:
      "https://i.pinimg.com/736x/95/d7/17/95d7173af19728c91cc65a0a50ae3607.jpg",
    titulo: "Raízes Nordestinas",
    artistaNome: "Maria Silva",
    categoria: "PINTURA",
  },
  {
    id: "2",
    imagemUrl:
      "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?auto=format&fit=crop&q=80&w=687",
    titulo: "Vasos",
    artistaNome: "João Santos",
    categoria: "ESCULTURA",
  },
  {
    id: "3",
    imagemUrl:
      "https://i.pinimg.com/736x/31/22/c8/3122c8817a8c1c3c78843cd210fffcf8.jpg",
    titulo: "Vida no Sertão",
    artistaNome: "Ana Costa",
    categoria: "FOTOGRAFIA",
  },
  {
    id: "4",
    imagemUrl:
      "https://i.pinimg.com/736x/08/38/b5/0838b5a14beaa2e7e19026a39745931d.jpg",
    titulo: "Caatinga em Flor",
    artistaNome: "Maria Silva",
    categoria: "PINTURA",
  },
  {
    id: "5",
    imagemUrl:
      "https://plus.unsplash.com/premium_photo-1714841433964-2ea7e12d174a?auto=format&fit=crop&q=80&w=688",
    titulo: "Pratos",
    artistaNome: "João Santos",
    categoria: "ESCULTURA",
  },
];

// ─── Artistas com suas obras ──────────────────────────────────────────────────

export const artistsWithWorks: ArtistaMock[] = [
  {
    id: "a1",
    nome: "Maria Silva",
    specialty: "Pintora",
    location: "Recife, PE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    obras: [
      {
        id: "o1",
        titulo: "Seca",
        imagemUrl:
          "https://plus.unsplash.com/premium_photo-1675705698856-4e15ed5506d6?auto=format&fit=crop&q=80&w=1170",
        preco: "R$ 1.300",
      },
      {
        id: "o2",
        titulo: "Raízes Africanas",
        imagemUrl:
          "https://i.pinimg.com/736x/5a/26/6f/5a266f7460a16bd5e7b0d2cabf54e874.jpg",
        preco: "R$ 1.500",
      },
      {
        id: "o3",
        titulo: "Ancestralidade",
        imagemUrl:
          "https://i.pinimg.com/736x/ea/8d/7b/ea8d7b910f4fd6b05f2b70b5e84c3ac9.jpg",
        preco: "R$ 1.100",
      },
    ],
  },
  {
    id: "a2",
    nome: "João Santos",
    specialty: "Escultor",
    location: "Caruaru, PE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    obras: [
      {
        id: "o4",
        titulo: "Casas",
        imagemUrl:
          "https://i.pinimg.com/1200x/f2/ca/cd/f2cacdb383628c6fb4eb1709b4541032.jpg",
        preco: "R$ 150",
      },
      {
        id: "o5",
        titulo: "Forró",
        imagemUrl:
          "https://i.pinimg.com/1200x/d8/6d/d3/d86dd375d0d6a3fbbb9f44dfda27188b.jpg",
        preco: "R$ 190",
      },
      {
        id: "o6",
        titulo: "Vida Sertaneja",
        imagemUrl:
          "https://i.pinimg.com/736x/82/5d/8a/825d8a5df3181889761439567a8a136f.jpg",
        preco: "R$ 320",
      },
    ],
  },
  {
    id: "a3",
    nome: "Ana Costa",
    specialty: "Fotógrafa",
    location: "Fortaleza, CE",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    obras: [
      {
        id: "o7",
        titulo: "Vida no Sertão",
        imagemUrl:
          "https://i.pinimg.com/736x/86/75/41/8675418f86f36084045bc78f029ef571.jpg",
        preco: "R$ 100",
      },
      {
        id: "o8",
        titulo: "Tradição",
        imagemUrl:
          "https://i.pinimg.com/736x/e3/ab/8f/e3ab8f854b25610a8f78a6d4fec2da39.jpg",
        preco: "R$ 300",
      },
      {
        id: "o9",
        titulo: "Texturas do Agreste",
        imagemUrl:
          "https://i.pinimg.com/736x/b1/a2/ce/b1a2ce649c6cf0675d35ba7eed391404.jpg",
        preco: "R$ 200",
      },
    ],
  },
];

// ─── Eventos ──────────────────────────────────────────────────────────────────

export const eventsData: EventoMock[] = [
  {
    id: "e1",
    imagemUrl:
      "https://i.pinimg.com/1200x/f4/d5/f3/f4d5f330620f5a256b9ea3b4c3dee9f3.jpg",
    titulo: "Exposição: Cores do Sertão",
    date: "15 de Novembro, 2025",
    local: "Recife, PE",
    descricao:
      "Uma celebração da paleta vibrante do sertão nordestino através de pinturas e fotografias contemporâneas.",
    attendees: "142",
    badge: "Em Breve",
  },
  {
    id: "e2",
    imagemUrl:
      "https://i.pinimg.com/1200x/06/90/2d/06902d24bd882fe77adbb3377c6c3353.jpg",
    titulo: "Workshop: Xilogravura Tradicional",
    date: "22 de Novembro, 2025",
    local: "Fortaleza, CE",
    descricao:
      "Aprenda as técnicas ancestrais de xilogravura com mestres da arte popular nordestina.",
    attendees: "56",
    badge: "Inscrições Abertas",
  },
  {
    id: "e3",
    imagemUrl:
      "https://i.pinimg.com/736x/49/f9/9e/49f99e8f865f4be8ab53dc88413b301c.jpg",
    titulo: "Feira de Arte Regional",
    date: "8 de Dezembro, 2025",
    local: "Salvador, BA",
    descricao:
      "Encontro de artistas, colecionadores e apreciadores. Obras exclusivas à venda e apresentações ao vivo.",
    attendees: "320",
    badge: "Destaque",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const statsData: StatItem[] = [
  {
    id: "s1",
    value: "3.587.929",
    label: "Visualizações em Obras",
    icon: "eye",
  },
  {
    id: "s2",
    value: "12.000.000",
    label: "Alcance da Rede",
    icon: "users",
  },
  {
    id: "s3",
    value: "90",
    label: "Eventos Realizados",
    icon: "calendar",
  },
];
