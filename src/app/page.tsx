import { Navbar } from "@/components/layout/Navbar";
import { HeroScroll } from "@/components/sections/HeroScroll";
import { AboutSection } from "@/components/sections/AboutSection";
import { PlaneMorph } from "@/components/sections/PlaneMorph";
import { EventsSection } from "@/components/sections/EventsSection";
import { RulesSection } from "@/components/sections/RulesSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GlobeSection } from "@/components/sections/GlobeSection";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

export default function Home() {
  return (
    <main className="bg-background text-text-primary">
      <Navbar />
      <HeroScroll />
      <AboutSection />
      <PlaneMorph />
      <EventsSection />
      <RulesSection />
      <CountdownSection />
      <GlobeSection />
      <Footer />
      <AudioPlayer />
    </main>
  );
}
