import { NavbarHome } from "@/app/._components/NavbarHome";
import { FooterHome } from "@/app/._components/FooterHome";
import { HeroSection } from "@/app/._components/HeroSection";
import { StatsSection } from "@/app/._components/StatsSection";
import { MissionSection } from "@/app/._components/MissionSection";
import { FeaturedSection } from "@/app/._components/FeaturedSection";
import { ArtistsSection } from "@/app/._components/ArtistSection";
import { EventsSection } from "@/app/._components/EventsSection";
import { CtaSection } from "@/app/._components/CtaSection";

export default function HomePage() {
  return (
    <>
      <NavbarHome />
      <main>
        <HeroSection />
        <StatsSection />
        <MissionSection />
        <FeaturedSection />
        <ArtistsSection />
        <EventsSection />
        <CtaSection />
      </main>
      <FooterHome />
    </>
  );
}
