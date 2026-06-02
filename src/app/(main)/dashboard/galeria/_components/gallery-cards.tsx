import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Users,
  Heart,
  MessageSquare,
  Trash2,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { Artwork, Artist, EventItem } from "../_data/mock-data";

export const formatPrice = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    v,
  );

export const statusColor = (s: string) => {
  if (s === "Disponível")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (s === "Reservado")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  if (s === "Vendido")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
  return "bg-muted text-muted-foreground";
};

export const SectionTitle = ({
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

export const ArtworkCard = ({ a }: { a: Artwork }) => (
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
          <Badge className="bg-accent/90 text-accent-foreground gap-1 text-[10px]">
            <Users className="h-3 w-3" /> Colaborativa
          </Badge>
        )}
      </div>
      <button className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition opacity-0 group-hover:opacity-100 shadow-md">
        <Heart className="h-4 w-4" />
      </button>
    </div>
    <div className="p-4">
      <p className="font-serif text-lg leading-tight truncate">{a.title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {a.artist} · {a.type}
      </p>
      <p className="font-medium mt-2 text-primary">{formatPrice(a.price)}</p>
    </div>
  </Card>
);

export const ArtistCard = ({
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
        <MessageSquare className="h-3.5 w-3.5" /> Contato
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onRemove(a.id)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  </Card>
);

export const EventCard = ({ e }: { e: EventItem }) => (
  <Card className="overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={e.banner}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt={e.title}
      />
      <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-md">
        {e.type}
      </Badge>
      <Badge
        className={`absolute top-3 right-3 ${e.price > 0 ? "bg-primary" : "bg-emerald-500 text-white"}`}
      >
        {e.price > 0 ? formatPrice(e.price) : "Gratuito"}
      </Badge>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-xl mb-2 line-clamp-1">{e.title}</h3>
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

export const MetricCard = ({
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
