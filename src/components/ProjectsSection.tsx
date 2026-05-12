import { useRef, useEffect, useState, useCallback } from "react";
import SectionLabel from "./SectionLabel";
import { useTilt } from "@/hooks/useTilt";

import isTewsImg from "@/assets/is-tews.png";
import atmosenseImg from "@/assets/atmosense.png";
import smartRestaurantImg from "@/assets/smart-restaurant.png";
import predictiveMaintenanceImg from "@/assets/predictive-maintenance.jpg";
import esp32PcbImg from "@/assets/esp32-pcb.jpg";
import sewageGasImg from "@/assets/sewage-gas.png";
import bluelockImg from "@/assets/bluelock.jpg";
import natureMonitorImg from "@/assets/nature-monitor.png";
import industrialEnergyImg from "@/assets/industrial-energy.png";
import bridalEcommerceImg from "@/assets/bridal-ecommerce.png";
import fitnessImg from "@/assets/fitness-studio.jpg";
import clinicImg from "@/assets/clinic.jpg";

const projects = [
  { title: "IS-TEWS", subtitle: "India-Specific Tsunami Early Warning System", type: "Research · AI/ML · IoT", desc: "ML system trained on 17,038 real USGS earthquake events to predict tsunami risk with AUC 0.9957.", tech: ["LightGBM", "Python", "Flask", "ESP8266"], status: "Active — Research", image: isTewsImg },
  { title: "AtmoSense", subtitle: "PM2.5 Estimation & AQI Visualisation", type: "AI/ML · Web · Deployed", desc: "Offline air quality estimation from satellite imagery with zero API dependencies.", tech: ["Python", "Flask", "OpenCV"], status: "Live — Deployed", link: "https://pm-25-prediction-and-analysis-project-production-a9d3.up.railway.app/", image: sewageGasImg },
  { title: "Sewage Gas Monitor", subtitle: "IoT-Based Gas Detection & Alert System", type: "IoT · Safety · Deployed", desc: "Safety-focused IoT system monitoring toxic gas in confined spaces with real-time alerts.", tech: ["IoT", "Embedded C", "Firebase"], status: "Live — Deployed", link: "https://sewage-gas.onrender.com", image: atmosenseImg },
  { title: "Smart Restaurant", subtitle: "IoT-Enabled Ordering & Kitchen Alert", type: "IoT · Embedded · Web", desc: "QR ordering from ESP8266 AP. Orders to Firebase in <1s with kitchen alerts via buzzer/LED/LCD.", tech: ["ESP8266", "Arduino", "Firebase"], status: "Built & Functional", image: smartRestaurantImg },
  { title: "Predictive Maintenance", subtitle: "On-Device Industrial Fault Detection", type: "Embedded · AI · IoT", desc: "FFT-based vibration anomaly detection at the edge. Auto-shuts motor and sends SMS alerts.", tech: ["ESP8266", "MPU6050", "SIM800C"], status: "Built & Functional", image: predictiveMaintenanceImg },
  { title: "ESP32 PCB Design", subtitle: "2-Layer Wi-Fi Relay Switch PCB", type: "PCB · Hardware", desc: "Complete 2-layer PCB with buck converter, relay driver, and ESP32. DRC validated and fab-ready.", tech: ["ESP32", "EasyEDA", "Buck Converter"], status: "Fabrication-Ready", image: esp32PcbImg },
  { title: "AK Bangles", subtitle: "Bridal E-Commerce Jewelry Website", type: "Web · Commercial · Deployed", desc: "Professional commercial landing site for AK Bangles — traditional and modern bangles collection.", tech: ["HTML", "CSS", "JavaScript"], status: "Live — Deployed", link: "https://vsiva763-git.github.io/cheery-alfajores-407f3e/", image: bridalEcommerceImg },
  { title: "BlueLock Exam Portal", subtitle: "Secure Online Examination Platform", type: "Web · Deployed", desc: "Secure, timed online exams with auth, auto-evaluation, and instant results display.", tech: ["HTML", "JavaScript", "Firebase"], status: "Live — Deployed", link: "https://bluelockexamportal.netlify.app/", image: bluelockImg },
  { title: "Nature Monitor", subtitle: "Environmental Sensor Dashboard", type: "IoT · Web · Deployed", desc: "Real-time environmental dashboard aggregating live nature/weather sensor readings with trend viz.", tech: ["Python", "Flask", "IoT"], status: "Live — Deployed", link: "https://nature-monitor.onrender.com/", image: natureMonitorImg },
  { title: "Industrial Energy Monitor", subtitle: "IoT Real-Time Energy Dashboard", type: "IoT · Embedded · Deployed", desc: "Real-time IoT dashboard tracking electrical parameters with cloud push and threshold alerts.", tech: ["ESP8266", "ThingSpeak", "Firebase"], status: "Live — Deployed", link: "https://iot-energy-monitor.onrender.com/", image: industrialEnergyImg },
  { title: "Fitness Studio", subtitle: "Premium Unisex Gym Website", type: "Web · Commercial · Deployed", desc: "Bold, high-energy site for a premium Kovilpatti gym — facilities, trainers, classes, plans, and free-trial booking.", tech: ["React", "FastAPI", "Python"], status: "Live — Deployed", link: "https://immersive-fit-3d.preview.emergentagent.com/", image: fitnessImg },
  { title: "Clinic Webage", subtitle: "Immersive Healthcare Web Platform", type: "Web · Healthcare · Deployed", desc: "Modern patient-first clinic site with doctor profiles, specialities, appointment booking, and testimonials.", tech: ["React", "FastAPI", "Vercel"], status: "Live — Deployed", link: "https://yaazh-immersive-care.preview.emergentagent.com/", image: clinicImg },
];

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const tilt = useTilt(6);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  // attach both refs (tilt + reveal)
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    cardRef.current = node;
    (tilt.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }, [tilt.ref]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // stagger by position within row of 3 (desktop) — wrap delay so it stays snappy
  const delay = (index % 6) * 90;

  return (
    <article
      ref={setRefs}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      data-revealed={revealed}
      className="project-card tilt-card group relative rounded-2xl border border-border overflow-hidden card-elevated snap-start shrink-0 w-[88vw] sm:w-[60vw] md:w-auto md:shrink"
      style={{
        background: "var(--gradient-card)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-muted">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          decoding="async"
          fetchPriority={index < 3 ? "high" : "low"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-full backdrop-blur bg-card/80 border border-primary/30 text-primary">
            {p.status}
          </span>
        </div>
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        <p className="font-mono text-[10px] text-muted-foreground tracking-wider mb-2">{p.type}</p>
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {p.title}
        </h3>
        <p className="font-heading text-xs sm:text-sm text-muted-foreground mb-3">{p.subtitle}</p>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-heading text-xs text-primary hover:gap-2 transition-all"
          >
            View Live <span>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } }, { rootMargin: "-80px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <SectionLabel align="center">Portfolio</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-heading text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            12 shipped builds spanning Web, IoT, Embedded, AI/ML, and Hardware.
          </p>
        </div>
      </div>

      {/* Horizontal scroll-snap rail (mobile + tablet) */}
      <div className="md:hidden relative">
        <div
          ref={railRef}
          className="project-rail flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 pb-6"
          style={{ scrollPaddingInline: "1rem" }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
          <div className="shrink-0 w-2" aria-hidden />
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={() => scrollByCard(-1)} aria-label="Previous projects" className="h-10 w-10 rounded-full border border-border bg-card/80 backdrop-blur text-foreground hover:bg-primary hover:text-primary-foreground transition">←</button>
          <button onClick={() => scrollByCard(1)} aria-label="Next projects" className="h-10 w-10 rounded-full border border-border bg-card/80 backdrop-blur text-foreground hover:bg-primary hover:text-primary-foreground transition">→</button>
        </div>
      </div>

      {/* Desktop: vertical scroll-snap grid (auto-staggered reveal) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-y snap-mandatory">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
