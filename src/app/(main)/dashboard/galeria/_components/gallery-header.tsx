import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BadgeCheck,
  ShieldCheck,
  MapPin,
  CalendarDays,
  Globe,
  AlignCenterHorizontal,
  Heart,
  MessageSquare,
  Mail,
} from "lucide-react";
import { galleryData } from "../_data/mock-data";

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="text-center min-w-17.5">
    <p className="font-serif text-2xl text-primary">{value}</p>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
      {label}
    </p>
  </div>
);

export const GalleryHeader = () => {
  return (
    <section className="relative">
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={galleryData.banner}
          alt="Banner da galeria"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="relative shrink-0 mx-auto lg:mx-0">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-2xl">
              <AvatarImage src={galleryData.avatar} />
              <AvatarFallback>A27</AvatarFallback>
            </Avatar>
            {galleryData.verified && (
              <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                <BadgeCheck className="h-5 w-5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-2 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                {galleryData.name}
              </h1>
              {galleryData.verified && (
                <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Galeria verificada
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground mb-4">
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
            <p className="max-w-3xl text-muted-foreground leading-relaxed mb-6 mx-auto lg:mx-0">
              {galleryData.about}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
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

          <Card className="w-full lg:w-auto p-5 grid grid-cols-3 gap-6 backdrop-blur-md bg-card/80 shadow-xl max-w-sm mx-auto lg:mx-0">
            <Stat label="Artistas" value={galleryData.artistsCount} />
            <Stat label="Obras" value={galleryData.artworksCount} />
            <Stat label="Mostras" value={galleryData.exhibitionsCount} />
          </Card>
        </div>
      </div>
    </section>
  );
};
