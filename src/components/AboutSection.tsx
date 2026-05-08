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

export default function AboutSection() {
  const { ref, visible } = useIntersection();

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono text-sm text-primary tracking-widest mb-3">{"// ABOUT US"}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Where Ideas Meet <span className="text-gradient">Implementation</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Kural Innovations is a technology-driven innovation studio based in Tamil Nadu, focused on transforming simple ideas into powerful, real-world solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are not a typical service provider. We operate as a <span className="text-primary font-semibold">build lab</span> — where ideas are designed, developed, and implemented into practical systems that solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Inspired by "Kural" — short yet impactful wisdom. The belief that the smallest idea, combined with the right technology, creates meaningful real-world impact.
            </p>
          </div>

          <div className={`space-y-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {[
              { icon: "🔧", title: "Real-world working solutions", desc: "Not mockups. Not prototypes. Every delivery works in the field." },
              { icon: "🏗️", title: "Web + IoT + Embedded under one roof", desc: "Rare combination of firmware, hardware, and software expertise." },
              { icon: "🎯", title: "Problem-first approach", desc: 'Every project begins with: "What real problem are we solving?"' },
              { icon: "💡", title: "Innovation-first mindset", desc: "Every solution is custom-engineered from scratch." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group card-elevated"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
