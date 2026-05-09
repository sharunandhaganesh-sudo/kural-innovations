import { useRef, useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import { useTilt } from "@/hooks/useTilt";

function useIntersection(margin = "-100px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { rootMargin: margin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return { ref, visible };
}

const services = [
  { icon: "🌐", title: "Web Solutions", desc: "Modern responsive websites and landing pages. Clean design, fast performance, mobile-first.", tech: ["HTML", "CSS", "JavaScript", "React"] },
  { icon: "📡", title: "IoT Systems", desc: "Smart connected systems using ESP8266/ESP32 with web dashboards for monitoring and automation.", tech: ["ESP8266", "ESP32", "Firebase", "REST API"] },
  { icon: "🧠", title: "Smart Automation", desc: "Custom solutions combining software, hardware, and automation for intelligent systems.", tech: ["Embedded C", "Python", "AI/ML", "GPIO"] },
  { icon: "🔬", title: "AI/ML Solutions", desc: "Machine learning models and data pipelines built for real problems. AUC 0.9957 proven track record.", tech: ["LightGBM", "TensorFlow", "Flask", "Pandas"] },
  { icon: "🛠️", title: "PCB & Hardware", desc: "Circuit design, 2-layer PCB layout, assembly, and testing for production systems.", tech: ["EasyEDA", "ESP32", "Buck Converter", "SMT"] },
  { icon: "🎓", title: "Student Projects", desc: "Complete final-year project solutions — idea, hardware, software, and documentation.", tech: ["Hardware", "Software", "Documentation"] },
];

export default function ServicesSection() {
  const { ref, visible } = useIntersection();

  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="absolute inset-0 circuit-grid opacity-[0.06]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <SectionLabel align="center">Services</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            What We <span className="text-gradient">Build</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, visible }: { service: typeof services[0]; index: number; visible: boolean }) {
  const tilt = useTilt(7);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`tilt-card group relative p-6 rounded-2xl border border-border transition-all duration-500 card-elevated ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "var(--gradient-card)", transitionDelay: `${150 * index}ms` }}
    >
      <div className="relative z-10">
        <span className="text-4xl block mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">{service.icon}</span>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
        <div className="flex flex-wrap gap-2">
          {service.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-secondary text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
