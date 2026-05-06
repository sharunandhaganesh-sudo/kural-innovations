import ParticleField from "./ParticleField";
import logo from "@/assets/logo.png";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 circuit-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <ParticleField />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.18 195 / 30%) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mx-auto mb-8 animate-hero-logo">
          <img src={logo} alt="Kural Innovations" className="w-28 h-28 md:w-36 md:h-36 mx-auto drop-shadow-[0_0_30px_rgba(0,245,255,0.4)]" />
        </div>

        {/* Company name */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 animate-hero-fade" style={{ animationDelay: "0.3s" }}>
          <span className="text-gradient">KURAL</span>
          <br />
          <span className="text-foreground">INNOVATIONS</span>
        </h1>

        {/* Tagline */}
        <p className="font-heading text-xl md:text-2xl text-muted-foreground mb-3 animate-hero-fade" style={{ animationDelay: "0.6s" }}>
          Small Ideas. <span className="text-primary text-glow-cyan">Powerful Solutions.</span>
        </p>

        <p className="font-mono text-sm md:text-base text-muted-foreground tracking-wide mb-10 animate-hero-fade" style={{ animationDelay: "0.8s" }}>
          Web · IoT · Embedded · AI
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero-fade" style={{ animationDelay: "1s" }}>
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-lg font-heading text-sm tracking-wider bg-primary text-primary-foreground glow-cyan hover:scale-105 transition-transform duration-300"
          >
            VIEW PROJECTS
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-lg font-heading text-sm tracking-wider border border-primary text-primary hover:bg-primary/10 transition-all duration-300"
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-hero-fade" style={{ animationDelay: "1.3s" }}>
          {[
            { value: "10+", label: "Projects Built" },
            { value: "4", label: "Co-Founders" },
            { value: "5+", label: "Tech Domains" },
            { value: "0.9957", label: "Best AUC Score" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-primary text-glow-cyan">{stat.value}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-primary/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
