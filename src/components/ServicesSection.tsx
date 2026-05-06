import { useRef, useEffect, useState } from "react";

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
    <section id="services" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 circuit-grid opacity-10" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono text-sm text-primary tracking-widest mb-3">{"// SERVICES"}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            What We <span className="text-gradient">Build</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ background: "var(--gradient-card)", transitionDelay: `${150 * i}ms` }}
            >
              <div className="relative z-10">
                <span className="text-4xl block mb-4">{service.icon}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
