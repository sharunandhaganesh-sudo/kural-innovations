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

const team = [
  { name: "Sharunandhaganesh S", role: "Co-Founder & Lead Engineer", domain: "IoT · AI/ML · Full-Stack · Research", color: "#00f5ff", highlights: ["IS-TEWS Creator — AUC 0.9957", "TCS NQT Digital Cleared", "6+ Live Deployed Projects"], github: "https://github.com/sharunandha", linkedin: "https://linkedin.com/in/sharunandhaganesh-s-211009259" },
  { name: "Thanga Veeraputhiran S", role: "Co-Founder & Embedded Lead", domain: "Firmware · RTOS · Real-Time Systems", color: "#7c00ff", highlights: ["RHCSA Certified", "Top C Programmer — FXEC", "Edge Computing Specialist"], github: "https://github.com/ThangaVeeraputhiran", linkedin: "https://linkedin.com/in/thangam2611" },
  { name: "Siva Srinivasan V", role: "Co-Founder & PCB Design Lead", domain: "PCB Design · Power Electronics · Hardware", color: "#00ff88", highlights: ["RHCSA Certified", "TCS NQT Digital Cleared", "ESP32 PCB Designer"], github: "https://github.com/vsiva763-git", linkedin: "https://linkedin.com/in/siva-srinivasan-v" },
  { name: "Siluvai Sujin S", role: "Co-Founder & IoT Hardware Engineer", domain: "IoT Firmware · Field Deployment · Hardware", color: "#ff6b00", highlights: ["RHCSA Certified", "IS-TEWS Hardware Node", "Scopus Co-Author"], github: "https://github.com/vsiva763-git", linkedin: "https://linkedin.com/in/siluvai-sujin-3240b0259" },
];

export default function TeamSection() {
  const { ref, visible } = useIntersection();

  return (
    <section id="team" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 circuit-grid opacity-10" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono text-sm text-primary tracking-widest mb-3">{"// TEAM"}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            The <span className="text-gradient">Founders</span>
          </h2>
          <p className="font-heading text-muted-foreground mt-4 max-w-2xl mx-auto">
            Four RHCSA-certified ECE engineers from Francis Xavier Engineering College, Tirunelveli — 2026 batch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group relative p-6 rounded-2xl border border-border transition-all duration-500 hover:-translate-y-2 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ background: "var(--gradient-card)", transitionDelay: `${200 * i}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: member.color }} />

              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-display font-bold mb-4"
                style={{ background: `${member.color}15`, color: member.color }}
              >
                {member.name.charAt(0)}
              </div>

              <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{member.name}</h3>
              <p className="font-mono text-[10px] tracking-wide mb-2" style={{ color: member.color }}>{member.role}</p>
              <p className="text-xs text-muted-foreground mb-4">{member.domain}</p>

              <div className="space-y-1.5 mb-4">
                {member.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <span className="text-[10px] mt-1" style={{ color: member.color }}>▸</span>
                    <span className="text-xs text-muted-foreground">{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">GitHub ↗</a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">LinkedIn ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
