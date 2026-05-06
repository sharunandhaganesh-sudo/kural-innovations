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

export default function ContactSection() {
  const { ref, visible } = useIntersection();

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono text-sm text-primary tracking-widest mb-3">{"// CONTACT"}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="font-heading text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Have an idea? A problem that needs solving? Let's talk about how we can turn it into a working solution.
          </p>
        </div>

        <div className={`grid sm:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="mailto:kuralinnovation@gmail.com"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}>
            <div className="text-3xl mb-3">📧</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Email</p>
            <p className="font-mono text-xs text-primary break-all">kuralinnovation@gmail.com</p>
          </a>

          <a href="tel:+919345852826"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}>
            <div className="text-3xl mb-3">📞</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Phone</p>
            <p className="font-mono text-xs text-primary">+91 9345852826</p>
          </a>

          <a href="https://instagram.com/kural_innovations" target="_blank" rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}>
            <div className="text-3xl mb-3">📸</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Instagram</p>
            <p className="font-mono text-xs text-primary">@kural_innovations</p>
          </a>
        </div>

        <div className={`flex items-center gap-2 justify-center text-muted-foreground transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <span className="text-sm">📍</span>
          <span className="font-mono text-sm">Tamil Nadu, India</span>
        </div>
      </div>
    </section>
  );
}
