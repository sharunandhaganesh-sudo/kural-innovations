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

const projects = [
  { title: "IS-TEWS", subtitle: "India-Specific Tsunami Early Warning System", type: "Research · AI/ML · IoT", desc: "ML system trained on 17,038 real USGS earthquake events to predict tsunami risk with AUC 0.9957. LightGBM classifier with 581 trees and 30-dimensional geophysical feature vector.", metrics: ["AUC 0.9957", "Recall 0.8571", "< 2s Latency", "17K Events"], tech: ["LightGBM", "Python", "Flask", "ESP8266", "Docker"], status: "Active — Research" },
  { title: "AtmoSense", subtitle: "PM2.5 Estimation & AQI Visualisation", type: "AI/ML · Web · Deployed", desc: "Offline air quality estimation from satellite imagery with zero API dependencies. Extracts haze, turbidity, visibility, contrast, brightness, and saturation indicators.", metrics: ["6 Indicators", "EPA AQI", "30-Day History", "Live"], tech: ["Python", "Flask", "OpenCV", "Matplotlib"], status: "Live — Deployed", link: "https://pm-25-prediction-and-analysis-project-production-a9d3.up.railway.app/" },
  { title: "Smart Restaurant", subtitle: "IoT-Enabled Ordering & Kitchen Alert System", type: "IoT · Embedded · Web", desc: "QR code ordering from ESP8266 access point. Orders reach Firebase in under 1 second. Kitchen alerts via buzzer, LED, and LCD display.", metrics: ["< 1s Order", "Multi-table", "3 Stages", "Real-time"], tech: ["ESP8266", "Arduino", "Firebase", "JavaScript"], status: "Built & Functional" },
  { title: "Predictive Maintenance", subtitle: "On-Device Industrial Fault Detection", type: "Embedded · AI · IoT", desc: "FFT-based vibration anomaly detection at the edge. Detects faults before failure, auto-shuts motor, sends SMS alerts — all without cloud dependency.", metrics: ["FFT Analysis", "Edge AI", "SMS Alert", "Auto-Shutdown"], tech: ["ESP8266", "MPU6050", "SIM800C", "L298N"], status: "Built & Functional" },
  { title: "ESP32 PCB Design", subtitle: "2-Layer Wi-Fi Relay Switch PCB", type: "PCB · Hardware", desc: "Complete 2-layer PCB with buck converter, relay driver, and ESP32 for wireless AC/DC load switching. DRC validated and fabrication-ready.", metrics: ["2-Layer", "Buck Conv.", "DRC Pass", "Fab-Ready"], tech: ["ESP32", "EasyEDA", "Buck Converter", "Relay"], status: "Fabrication-Ready" },
  { title: "Sewage Gas Monitor", subtitle: "IoT-Based Gas Detection & Alert System", type: "IoT · Safety · Deployed", desc: "Safety-focused IoT system monitoring toxic gas in confined spaces. Real-time alerts protect maintenance workers.", metrics: ["Real-time", "Safety", "Remote", "Live"], tech: ["IoT", "Embedded C", "Firebase", "Web"], status: "Live — Deployed", link: "https://sewage-gas.onrender.com" },
];

export default function ProjectsSection() {
  const { ref, visible } = useIntersection();
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono text-sm text-primary tracking-widest mb-3">{"// PORTFOLIO"}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Project tabs */}
        <div className={`flex flex-wrap gap-2 justify-center mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`font-mono text-xs px-4 py-2 rounded-lg transition-all duration-300 ${
                active === i
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active project card */}
        <div
          className={`relative rounded-2xl border border-border overflow-hidden transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs px-3 py-1 rounded-full border border-primary/30 text-primary">
                {projects[active].status}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{projects[active].type}</span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {projects[active].title}
            </h3>
            <p className="font-heading text-lg text-muted-foreground mb-6">{projects[active].subtitle}</p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">{projects[active].desc}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {projects[active].metrics.map((m) => (
                <div key={m} className="text-center p-3 rounded-xl bg-secondary/50">
                  <span className="font-display text-lg text-primary">{m}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-xs text-muted-foreground mr-2">Stack:</span>
              {projects[active].tech.map((t) => (
                <span key={t} className="font-mono text-[11px] px-3 py-1 rounded-md border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
              {projects[active].link && (
                <a href={projects[active].link} target="_blank" rel="noopener noreferrer"
                  className="ml-auto font-heading text-sm text-primary hover:text-primary/80 transition-colors">
                  View Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
