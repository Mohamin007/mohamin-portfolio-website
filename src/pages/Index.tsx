import { Navbar } from '@/components/Navbar';
import { ParticleField } from '@/components/ParticleField';
import { GlobalHoverParticles } from '@/components/GlobalHoverParticles';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TrackerSection } from '@/components/TrackerSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { JourneySection } from '@/components/JourneySection';
import { ContactSection } from '@/components/ContactSection';
import { AboutMeSection } from '@/components/AboutMeSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Particle Background */}
      <ParticleField />
      <GlobalHoverParticles />
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <TrackerSection />
        <CertificationsSection />
        <JourneySection />
        <AboutMeSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-muted-foreground/50 text-sm border-t border-foreground/5">
        <p>© 2025 Mohamin Mir. Crafted in the cosmos.</p>
      </footer>
    </div>
  );
};

export default Index;
