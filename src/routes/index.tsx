import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kural Innovations — Small Ideas. Powerful Solutions." },
      { name: "description", content: "Technology innovation studio building real-world solutions across Web, IoT, Embedded Systems & AI/ML. Based in Tamil Nadu, India." },
      { property: "og:title", content: "Kural Innovations — Small Ideas. Powerful Solutions." },
      { property: "og:description", content: "Where ideas meet implementation — Web · IoT · Embedded · AI" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
