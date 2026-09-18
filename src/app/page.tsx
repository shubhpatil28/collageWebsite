import HeroSection from "@/components/home/HeroSection";
import QuickActionBar from "@/components/home/QuickActionBar";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import NoticesAndDownloadsSection from "@/components/home/NoticesAndDownloadsSection";
import AdmissionCtaSection from "@/components/home/AdmissionCtaSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <QuickActionBar />
      <AboutSection />
      <ProgramsSection />
      <LeadershipSection />
      <NoticesAndDownloadsSection />
      <AdmissionCtaSection />
    </main>
  );
}
