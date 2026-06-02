"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import {
  BadgeCheck,
  MapPin,
  Users,
  Image as ImageIcon,
  CalendarDays,
  MessageSquare,
  Star,
  Heart,
  Plus,
  Trash2,
  Edit,
  Search,
  FileText,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Eye,
  Send,
  Paperclip,
  Sparkles,
  Globe,
  Mail,
  Archive,
  CheckCircle2,
  Clock,
  XCircle,
  Crown,
  BarChart3,
  Filter,
  AlignCenterHorizontal,
} from "lucide-react";

const galleryData = {
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

const featuredArtworks = [
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

const representedArtists = [
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

const eventsMock = [
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

const reviewsMock = [
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

const statusColor = (s: string) => {
  if (s === "Disponível")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (s === "Reservado")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  if (s === "Vendido")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  return "bg-muted text-muted-foreground";
};

const formatPrice = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    v,
  );

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="text-center min-w-17.5">
    <p className="font-serif text-2xl text-primary">{value}</p>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
      {label}
    </p>
  </div>
);

const SectionTitle = ({
  title,
  subtitle,
  inline,
}: {
  title: string;
  subtitle?: string;
  inline?: boolean;
}) => (
  <div className={inline ? "" : "mb-5"}>
    <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">{title}</h2>
    {subtitle && (
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    )}
  </div>
);

type Artwork = (typeof featuredArtworks)[number];
type Artist = (typeof representedArtists)[number];
type EventItem = (typeof eventsMock)[number];

const ArtworkCard = ({ a }: { a: Artwork }) => (
  <Card className="group overflow-hidden border-border/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
    <div className="relative overflow-hidden aspect-4/5">
      <img
        src={a.img}
        alt={a.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        <Badge variant="outline" className={statusColor(a.status)}>
          {a.status}
        </Badge>
        {a.collab && (
          <Badge className="bg-accent/90 text-accent-foreground gap-1">
            <Users className="h-3 w-3" />
            Colaborativa
          </Badge>
        )}
      </div>
      <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground gap-1">
        <BadgeCheck className="h-3 w-3" />
        Galeria
      </Badge>
      <button className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition opacity-0 group-hover:opacity-100">
        <Heart className="h-4 w-4" />
      </button>
    </div>
    <div className="p-4">
      <p className="font-serif text-lg leading-tight">{a.title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {a.artist} · {a.type}
      </p>
      <p className="font-medium mt-2 text-primary">{formatPrice(a.price)}</p>
    </div>
  </Card>
);

const ArtistCard = ({
  a,
  onRemove,
  expanded,
}: {
  a: Artist;
  onRemove: (id: string) => void;
  expanded?: boolean;
}) => (
  <Card className="p-5 hover:shadow-xl transition-all hover:-translate-y-0.5">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-14 w-14">
          <AvatarImage src={a.avatar} />
        </Avatar>
        <BadgeCheck className="h-4 w-4 text-primary absolute -bottom-0.5 -right-0.5 bg-background rounded-full" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{a.name}</p>
        <p className="text-xs text-muted-foreground">Desde {a.since}</p>
      </div>
      <Badge
        variant={a.contract === "Exclusivo" ? "default" : "secondary"}
        className="text-[10px]"
      >
        {a.contract}
      </Badge>
    </div>
    {expanded && (
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Obras</p>
          <p className="font-medium">{a.artworks}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Vendas</p>
          <p className="font-medium text-primary">{a.sales}</p>
        </div>
      </div>
    )}
    <div className="flex gap-2 mt-4">
      <Button size="sm" variant="outline" className="flex-1 gap-1.5">
        <MessageSquare className="h-3.5 w-3.5" />
        Contato
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onRemove(a.id)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  </Card>
);

const EventCard = ({ e }: { e: EventItem }) => (
  <Card className="overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={e.banner}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-md">
        {e.type}
      </Badge>
      {e.price > 0 ? (
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {formatPrice(e.price)}
        </Badge>
      ) : (
        <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
          Gratuito
        </Badge>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-serif text-xl mb-2">{e.title}</h3>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" />
          {e.date} · {e.time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          {e.location}
        </p>
        <p className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5" />
          {e.interested} interessados / {e.capacity} vagas
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm" className="flex-1">
          {e.price > 0 ? "Comprar ingresso" : "Tenho interesse"}
        </Button>
        <Button size="sm" variant="outline">
          Detalhes
        </Button>
      </div>
    </div>
  </Card>
);

const MetricCard = ({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
}) => (
  <Card className="p-5 hover:shadow-lg transition-all">
    <div className="flex items-center justify-between">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      {trend && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          {trend}
        </span>
      )}
    </div>
    <p className="font-serif text-2xl mt-3">{value}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
  </Card>
);

const DocRow = ({ label, status }: { label: string; status: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
    <div className="flex items-center gap-3">
      <FileText className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">{label}</span>
    </div>
    <Badge
      variant="outline"
      className={
        status === "Validado" || status === "Ativo"
          ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
          : status === "Pendente"
            ? "border-amber-500/40 text-amber-600 dark:text-amber-400"
            : "border-rose-500/40 text-rose-600 dark:text-rose-400"
      }
    >
      {status}
    </Badge>
  </div>
);

const Gallery = () => {
  const toast = useToast();
  const [artworks, setArtworks] = useState<Artwork[]>(featuredArtworks);
  const [artists, setArtists] = useState<Artist[]>(representedArtists);
  const [galleryEvents, setGalleryEvents] = useState<EventItem[]>(eventsMock);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Lívia Moreno",
      text: "Posso enviar as novas peças amanhã?",
      me: false,
      time: "10:42",
    },
    {
      id: 2,
      from: "Você",
      text: "Perfeito! Reservo o espaço da curadoria.",
      me: true,
      time: "10:45",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    type: "Exposição",
  });
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    artist: "",
    price: "",
    type: "Pintura",
  });
  const contractStatus: "Ativo" | "Pendente" | "Expirado" | "Encerrado" =
    "Ativo";

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), from: "Você", text: draft, me: true, time: "agora" },
    ]);
    setDraft("");
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast("Error", "Preencha os campos obrigatórios", "error");
      return;
    }
    setGalleryEvents([
      ...galleryEvents,
      {
        id: `e${Date.now()}`,
        ...newEvent,
        price: Number(newEvent.price) || 0,
        capacity: Number(newEvent.capacity) || 0,
        interested: 0,
        banner:
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&h=500&fit=crop",
      },
    ]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      price: "",
      capacity: "",
      type: "Exposição",
    });
    toast("Evento criado", "O evento foi adicionado à sua agenda.", "success");
  };

  const addArtwork = () => {
    if (!newArtwork.title || !newArtwork.artist) {
      toast("Error", "Preencha os campos obrigatórios", "error");
      return;
    }
    setArtworks([
      {
        id: `a${Date.now()}`,
        title: newArtwork.title,
        artist: newArtwork.artist,
        price: Number(newArtwork.price) || 0,
        status: "Disponível",
        type: newArtwork.type,
        collab: false,
        img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=1000&fit=crop",
      },
      ...artworks,
    ]);
    setNewArtwork({ title: "", artist: "", price: "", type: "Pintura" });
    toast("Obra adicionada", "A obra foi incluída no inventário.", "success");
  };

  const removeArtist = (id: string) => {
    setArtists(artists.filter((a) => a.id !== id));
    toast(
      "Representação encerrada",
      "A representação foi encerrada.",
      "success",
    );
  };

  const totalRevenue = artworks
    .filter((a) => a.status === "Vendido")
    .reduce((s, a) => s + a.price, 0);
  const available = artworks.filter((a) => a.status === "Disponível").length;
  const sold = artworks.filter((a) => a.status === "Vendido").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative">
        <div className="relative h-70 sm:h-90 lg:h-110 overflow-hidden">
          <img
            src={galleryData.banner}
            alt="Banner da galeria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
        </div>

        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative shrink-0">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-2xl ring-1 ring-border">
                <AvatarImage src={galleryData.avatar} />
                <AvatarFallback>A27</AvatarFallback>
              </Avatar>
              {galleryData.verified && (
                <span
                  className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background"
                  title="Galeria verificada"
                >
                  <BadgeCheck className="h-5 w-5" />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                  {galleryData.name}
                </h1>
                {galleryData.verified && (
                  <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/15 gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Galeria verificada
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {galleryData.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Fundada em {galleryData.founded}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-4 w-4" />
                  {galleryData.socials.website}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <AlignCenterHorizontal className="h-4 w-4" />
                  {galleryData.socials.instagram}
                </span>
              </div>
              <p className="max-w-3xl text-muted-foreground leading-relaxed mb-6">
                {galleryData.about}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Heart className="h-4 w-4" />
                  Seguir
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Mensagem
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contato
                </Button>
              </div>
            </div>

            <Card className="w-full lg:w-auto p-5 grid grid-cols-3 gap-6 backdrop-blur-md bg-card/80 shadow-xl">
              <Stat label="Artistas" value={galleryData.artistsCount} />
              <Stat label="Obras" value={galleryData.artworksCount} />
              <Stat label="Mostras" value={galleryData.exhibitionsCount} />
            </Card>
          </div>
        </div>
      </section>

      <main className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <Tabs defaultValue="overview" className="w-full">
          <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 bg-background/85 backdrop-blur-xl border-b border-border py-3 mb-8">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="artists">Artistas</TabsTrigger>
              <TabsTrigger value="artworks">Obras</TabsTrigger>
              <TabsTrigger value="inventory">Inventário</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="contracts">Contratos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-10 animate-fade-in">
            <section>
              <SectionTitle
                title="Obras em destaque"
                subtitle="Seleção curatorial atual"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {artworks.slice(0, 4).map((a) => (
                  <ArtworkCard key={a.id} a={a} />
                ))}
              </div>
            </section>

            <section className="grid lg:grid-cols-3 gap-5">
              <MetricCard
                icon={<DollarSign className="h-5 w-5" />}
                label="Receita do mês"
                value="R$ 84.200"
                trend="+12%"
              />
              <MetricCard
                icon={<Eye className="h-5 w-5" />}
                label="Visualizações"
                value="24.1k"
                trend="+8%"
              />
              <MetricCard
                icon={<TrendingUp className="h-5 w-5" />}
                label="Conversão"
                value="3.4%"
                trend="+0.6%"
              />
            </section>

            <section>
              <SectionTitle
                title="Artistas em destaque"
                subtitle="Representados pela galeria"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {artists.map((a) => (
                  <ArtistCard key={a.id} a={a} onRemove={removeArtist} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle title="Próximos eventos" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryEvents.map((e) => (
                  <EventCard key={e.id} e={e} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="artists" className="animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <SectionTitle
                title="Artistas representados"
                subtitle="Gerencie associações, contratos e selos"
                inline
              />
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Solicitar associação
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {artists.map((a) => (
                <ArtistCard key={a.id} a={a} onRemove={removeArtist} expanded />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artworks" className="animate-fade-in">
            <SectionTitle
              title="Obras representadas"
              subtitle="Aparecem no perfil da galeria e dos artistas"
            />
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-5">
              {artworks.map((a) => (
                <div key={a.id} className="mb-5 break-inside-avoid">
                  <ArtworkCard a={a} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-8 animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={<ImageIcon className="h-5 w-5" />}
                label="Inventário total"
                value={artworks.length}
              />
              <MetricCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Disponíveis"
                value={available}
              />
              <MetricCard
                icon={<Archive className="h-5 w-5" />}
                label="Vendidas"
                value={sold}
              />
              <MetricCard
                icon={<DollarSign className="h-5 w-5" />}
                label="Receita"
                value={formatPrice(totalRevenue)}
              />
            </div>

            <Card className="p-5">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="relative flex-1 min-w-55">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar obra ou artista"
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar obra
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova obra no inventário</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3 py-2">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={newArtwork.title}
                          onChange={(e) =>
                            setNewArtwork({
                              ...newArtwork,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Artista</Label>
                        <Input
                          value={newArtwork.artist}
                          onChange={(e) =>
                            setNewArtwork({
                              ...newArtwork,
                              artist: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Preço (R$)</Label>
                          <Input
                            type="number"
                            value={newArtwork.price}
                            onChange={(e) =>
                              setNewArtwork({
                                ...newArtwork,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Tipo</Label>
                          <Input
                            value={newArtwork.type}
                            onChange={(e) =>
                              setNewArtwork({
                                ...newArtwork,
                                type: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addArtwork}>Adicionar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground border-b border-border">
                    <tr>
                      <th className="py-3 pr-4">Obra</th>
                      <th className="py-3 pr-4">Artista</th>
                      <th className="py-3 pr-4">Tipo</th>
                      <th className="py-3 pr-4">Preço</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3 pr-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artworks.map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-border/60 hover:bg-muted/30"
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={a.img}
                              className="h-10 w-10 rounded object-cover"
                            />
                            <span className="font-medium">{a.title}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {a.artist}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {a.type}
                        </td>
                        <td className="py-3 pr-4">{formatPrice(a.price)}</td>
                        <td className="py-3 pr-4">
                          <Badge
                            variant="outline"
                            className={statusColor(a.status)}
                          >
                            {a.status}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-right">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setArtworks(artworks.filter((x) => x.id !== a.id))
                            }
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <SectionTitle
                title="Eventos"
                subtitle="Exposições, vernissages e mais"
                inline
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Criar evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo evento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3 py-2">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Data</Label>
                        <Input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Hora</Label>
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, time: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Local</Label>
                      <Input
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Preço (R$)</Label>
                        <Input
                          type="number"
                          value={newEvent.price}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, price: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Capacidade</Label>
                        <Input
                          type="number"
                          value={newEvent.capacity}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              capacity: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Input
                        value={newEvent.type}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, type: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addEvent}>Criar evento</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryEvents
                .filter((e) => e.type !== "Workshop")
                .map((e) => (
                  <EventCard key={e.id} e={e} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="animate-fade-in">
            <SectionTitle
              title="Workshops e aulas"
              subtitle="Conteúdo educacional e venda de ingressos"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryEvents
                .filter((e) => e.type === "Workshop")
                .map((e) => (
                  <EventCard key={e.id} e={e} />
                ))}
              <Card className="p-6 flex flex-col items-center justify-center text-center border-dashed">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Crie um novo workshop
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={<DollarSign className="h-5 w-5" />}
                label="Receita total"
                value="R$ 524.800"
                trend="+18%"
              />
              <MetricCard
                icon={<Eye className="h-5 w-5" />}
                label="Visualizações"
                value="142k"
                trend="+9%"
              />
              <MetricCard
                icon={<Users className="h-5 w-5" />}
                label="Novos seguidores"
                value="1.2k"
                trend="+22%"
              />
              <MetricCard
                icon={<TrendingUp className="h-5 w-5" />}
                label="Crescimento"
                value="14%"
                trend="+3%"
              />
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl">Performance mensal</h3>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-end gap-3 h-48">
                {[40, 62, 55, 78, 70, 88, 95, 72, 84, 91, 100, 86].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full rounded-t bg-linear-to-t from-primary/70 to-primary transition-all hover:opacity-80"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {
                          [
                            "J",
                            "F",
                            "M",
                            "A",
                            "M",
                            "J",
                            "J",
                            "A",
                            "S",
                            "O",
                            "N",
                            "D",
                          ][i]
                        }
                      </span>
                    </div>
                  ),
                )}
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-5">
              <Card className="p-6">
                <h3 className="font-serif text-xl mb-4">
                  Artistas com melhor performance
                </h3>
                <div className="space-y-3">
                  {artists.slice(0, 4).map((a, i) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-5">
                        {i + 1}
                      </span>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={a.avatar} />
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{a.name}</p>
                        <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${90 - i * 18}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {a.sales}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-serif text-xl mb-4">Obras mais vistas</h3>
                <div className="space-y-3">
                  {artworks.slice(0, 4).map((a, i) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <img
                        src={a.img}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{a.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.artist}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {(12000 - i * 1800).toLocaleString("pt-BR")} views
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <Card className="grid md:grid-cols-[280px_1fr] overflow-hidden h-150">
              <aside className="border-r border-border bg-muted/30">
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar conversa" className="pl-9" />
                  </div>
                </div>
                <div className="overflow-y-auto">
                  {artists.map((a, i) => (
                    <button
                      key={a.id}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 border-b border-border/60 ${i === 0 ? "bg-muted/50" : ""}`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={a.avatar} />
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium truncate">{a.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          Última mensagem...
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>
              <div className="flex flex-col">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={artists[0]?.avatar} />
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{artists[0]?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Artista representada
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.me ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${m.me ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p>{m.text}</p>
                        <p className="text-[10px] mt-1 opacity-70">{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escreva uma mensagem..."
                  />
                  <Button size="icon" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="animate-fade-in">
            <div className="grid lg:grid-cols-[320px_1fr] gap-6">
              <Card className="p-6 h-fit">
                <p className="text-sm text-muted-foreground">Avaliação geral</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-5xl">4.8</span>
                  <span className="text-muted-foreground text-sm">/ 5</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Baseado em 128 avaliações
                </p>
                <div className="mt-5 space-y-2">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <div key={r} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-muted-foreground">{r}</span>
                      <Star className="h-3 w-3 fill-muted-foreground text-muted-foreground" />
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${[78, 15, 4, 2, 1][5 - r]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="space-y-4">
                {reviewsMock.map((r) => (
                  <Card key={r.id} className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{r.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{r.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-linear-to-br from-primary/10 via-accent/5 to-transparent border-primary/20">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Crown className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl mb-1">Plano Premium</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Desbloqueie envios ilimitados de obras, selo prioritário e
                    relatórios avançados.
                  </p>
                  <Button>Fazer upgrade</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-serif text-xl mb-4">
                Documentos e verificação
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <DocRow label="CNPJ" status="Validado" />
                <DocRow label="CNART" status="Validado" />
                <DocRow label="Contrato de representação" status="Ativo" />
                <DocRow label="Termo de rescisão" status="Pendente" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl">Status do contrato</h3>
                <Badge
                  variant="outline"
                  className={
                    contractStatus === "Ativo"
                      ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                      : "border-amber-500/40 text-amber-600 dark:text-amber-400"
                  }
                >
                  {contractStatus}
                </Badge>
              </div>
              <div className="grid sm:grid-cols-4 gap-3 text-sm">
                {[
                  { s: "Ativo", icon: CheckCircle2 },
                  { s: "Pendente", icon: Clock },
                  { s: "Expirado", icon: XCircle },
                  { s: "Encerrado", icon: Archive },
                ].map(({ s, icon: Icon }) => (
                  <div
                    key={s}
                    className={`p-3 rounded-lg border ${contractStatus === s ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <Icon
                      className={`h-4 w-4 mb-1 ${contractStatus === s ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <p className="text-xs">{s}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 gap-2">
                <FileText className="h-4 w-4" />
                Enviar novo documento
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Arte na Mão — Plataforma para galerias e
        artistas independentes.
      </footer>
    </div>
  );
};

export default Gallery;
