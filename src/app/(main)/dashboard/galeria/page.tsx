"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Eye, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/toast";

import {
  featuredArtworks,
  representedArtists,
  eventsMock,
  Artwork,
  Artist,
  EventItem,
} from "./_data/mock-data";
import { GalleryHeader } from "./_components/gallery-header";
import {
  SectionTitle,
  ArtworkCard,
  MetricCard,
  ArtistCard,
  EventCard,
} from "./_components/gallery-cards";

export default function GalleryPage() {
  const toast = useToast();
  const [artworks] = useState<Artwork[]>(featuredArtworks);
  const [artists, setArtists] = useState<Artist[]>(representedArtists);
  const [galleryEvents] = useState<EventItem[]>(eventsMock);

  const removeArtist = (id: string) => {
    setArtists(artists.filter((a) => a.id !== id));
    toast(
      "Representação encerrada",
      "A associação foi revogada com sucesso.",
      "success",
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Header Alinhado para Desktop */}
      <GalleryHeader />

      {/* Conteúdo Principal com Largura Máxima Confortável no Desktop */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <Tabs defaultValue="overview" className="w-full space-y-10">
          {/* ABAS PREMIUM DE DESKTOP (Estilo Linha Inferior / Shadcn original) */}
          <div className="border-b border-border w-full sticky top-14 bg-background/80 backdrop-blur-md z-30">
            <TabsList className="flex w-full justify-start gap-6 bg-transparent p-0 h-12 rounded-none">
              {[
                { value: "overview", label: "Visão Geral" },
                { value: "artists", label: "Artistas" },
                { value: "artworks", label: "Obras" },
                { value: "inventory", label: "Inventário" },
                { value: "events", label: "Eventos" },
                { value: "reports", label: "Relatórios" },
                { value: "messages", label: "Mensagens" },
                { value: "reviews", label: "Avaliações" },
                { value: "contracts", label: "Contratos" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent text-muted-foreground hover:text-foreground rounded-none h-full bg-transparent px-1 shadow-none transition-all font-medium text-sm border-b-2 border-transparent pb-3 pt-2"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* CONTEÚDO: VISÃO GERAL */}
          <TabsContent
            value="overview"
            className="space-y-12 focus-visible:outline-none mt-0"
          >
            {/* Grid de Métricas no Topo */}
            <section className="grid grid-cols-3 gap-6">
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

            {/* Obras com Grid Simétrico de 4 Colunas */}
            <section>
              <SectionTitle
                title="Obras em destaque"
                subtitle="Seleção curatorial atual da galeria"
              />
              <div className="grid grid-cols-4 gap-6">
                {artworks.slice(0, 4).map((a) => (
                  <ArtworkCard key={a.id} a={a} />
                ))}
              </div>
            </section>

            {/* Artistas com Grid Simétrico de 4 Colunas */}
            <section>
              <SectionTitle
                title="Artistas em destaque"
                subtitle="Membros ativos na plataforma"
              />
              <div className="grid grid-cols-4 gap-6">
                {artists.map((a) => (
                  <ArtistCard key={a.id} a={a} onRemove={removeArtist} />
                ))}
              </div>
            </section>

            {/* Eventos com Grid Simétrico de 3 Colunas */}
            <section>
              <SectionTitle title="Próximos eventos agendados" />
              <div className="grid grid-cols-3 gap-6">
                {galleryEvents.map((e) => (
                  <EventCard key={e.id} e={e} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* CONTEÚDO: ARTISTAS */}
          <TabsContent
            value="artists"
            className="focus-visible:outline-none mt-0"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <SectionTitle
                title="Artistas representados"
                subtitle="Gerencie associações, contratos e permissões de exibição"
                inline
              />
              <Button className="gap-2 h-10 px-4">
                <Plus className="h-4 w-4" />
                Solicitar nova associação
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {artists.map((a) => (
                <ArtistCard key={a.id} a={a} onRemove={removeArtist} expanded />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
