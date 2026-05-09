import ParticleField from "./ParticleField";
import logo from "@/assets/logo.png";
import { useParallax } from "@/hooks/useParallax";

export default function HeroSection() {
  const { x, y } = useParallax();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Deep background grid */}
      <div
        className="absolute inset-0 circuit-grid opacity-20"
        style={{
          transform: `translate3d(${x * -15}px, ${y * -15}px, -200px) scale(1.1)`,
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <ParticleField />

      {/* Far-depth orb */}
      <div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full opacity-[0.10] blur-2xl"
        style={{
          background: "var(--gradient-cyan-violet)",
          transform: `translate3d(${x * -60}px, ${y * -60}px, -150px)`,
          transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      {/* Mid-depth orb */}
      <div
        className="absolute bottom-[20%] right-[10%] w-56 h-56 rounded-full opacity-[0.10] blur-xl"
        style={{
          background: "oklch(0.55 0.18 155)",
          transform: `translate3d(${x * 45}px, ${y * 45}px, -50px)`,
          transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      {/* Near orb */}
      <div
        className="absolute top-[60%] left-[60%] w-40 h-40 rounded-full opacity-[0.12] blur-lg"
        style={{
          background: "oklch(0.60 0.18 50)",
          transform: `translate3d(${x * 80}px, ${y * -60}px, 50px)`,
          transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 max-w-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.22 255 / 25%) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${x * -25}px), calc(-50% + ${y * -25}px))`,
        }}
      />

      <div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full"
        style={{
          transform: `perspective(1000px) rotateY(${x * 3}deg) rotateX(${y * -3}deg) translateZ(20px)`,
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Logo */}
        <div className="mx-auto mb-6 sm:mb-8 animate-hero-logo" style={{ transform: "translateZ(60px)" }}>
          <img
            src={logo}
            alt="Kural Innovations"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto drop-shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
          />
        </div>

        {/* Company name — responsive sizing prevents overflow */}
        <h1
          className="font-display font-bold tracking-wider mb-4 animate-hero-fade leading-[1.05] break-words"
          style={{
            animationDelay: "0.3s",
            transform: "translateZ(40px)",
            fontSize: "clamp(2.25rem, 11vw, 6rem)",
          }}
        >
          <span className="text-gradient block">KURAL</span>
          <span className="text-foreground block">INNOVATIONS</span>
        </h1>

        <p
          className="font-heading text-base sm:text-xl md:text-2xl text-muted-foreground mb-3 animate-hero-fade px-2"
          style={{ animationDelay: "0.6s", transform: "translateZ(30px)" }}
        >
          Small Ideas. <span className="text-primary">Powerful Solutions.</span>
        </p>

        <p
          className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground tracking-wide mb-8 sm:mb-10 animate-hero-fade"
          style={{ animationDelay: "0.8s", transform: "translateZ(25px)" }}
        >
          Web · IoT · Embedded · AI
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-hero-fade px-4"
          style={{ animationDelay: "1s", transform: "translateZ(50px)" }}
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 sm:px-8 py-3 rounded-lg font-heading text-sm tracking-wider bg-primary text-primary-foreground glow-cyan hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            VIEW PROJECTS
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 sm:px-8 py-3 rounded-lg font-heading text-sm tracking-wider border border-primary text-primary hover:bg-primary/5 transition-all duration-300"
          >
            GET IN TOUCH
          </button>
        </div>

        <div
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-hero-fade"
          style={{ animationDelay: "1.3s", transform: "translateZ(20px)" }}
        >
          {[
            { value: "12+", label: "Projects Built" },
            { value: "4", label: "Co-Founders" },
            { value: "5+", label: "Tech Domains" },
            { value: "0.9957", label: "Best AUC Score" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-3xl text-primary">{stat.value}</div>
              <div className="font-mono text-[10px] sm:text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
