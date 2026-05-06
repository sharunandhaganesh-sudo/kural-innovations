import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: "🌐",
    title: "Web Solutions",
    desc: "Modern responsive websites and landing pages. Clean design, fast performance, mobile-first.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    color: "var(--neon-cyan)",
    glowClass: "glow-cyan",
  },
  {
    icon: "📡",
    title: "IoT Systems",
    desc: "Smart connected systems using ESP8266/ESP32 with web dashboards for monitoring and automation.",
    tech: ["ESP8266", "ESP32", "Firebase", "REST API"],
    color: "var(--electric-violet)",
    glowClass: "glow-violet",
  },
  {
    icon: "🧠",
    title: "Smart Automation",
    desc: "Custom solutions combining software, hardware, and automation for intelligent systems.",
    tech: ["Embedded C", "Python", "AI/ML", "GPIO"],
    color: "var(--plasma-green)",
    glowClass: "glow-green",
  },
  {
    icon: "🔬",
    title: "AI/ML Solutions",
    desc: "Machine learning models and data pipelines built for real problems. AUC 0.9957 proven track record.",
    tech: ["LightGBM", "TensorFlow", "Flask", "Pandas"],
    color: "var(--solar-orange)",
    glowClass: "glow-orange",
  },
  {
    icon: "🛠️",
    title: "PCB & Hardware",
    desc: "Circuit design, 2-layer PCB layout, assembly, and testing for production systems.",
    tech: ["EasyEDA", "ESP32", "Buck Converter", "SMT"],
    color: "var(--neon-cyan)",
    glowClass: "glow-cyan",
  },
  {
    icon: "🎓",
    title: "Student Projects",
    desc: "Complete final-year project solutions — idea, hardware, software, and documentation.",
    tech: ["Hardware", "Software", "Documentation"],
    color: "var(--electric-violet)",
    glowClass: "glow-violet",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 circuit-grid opacity-10" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-3">// SERVICES</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            What We <span className="text-gradient">Build</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-500"
              style={{ background: "var(--gradient-card)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}10, transparent 70%)` }}
              />

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
