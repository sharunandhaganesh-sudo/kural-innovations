import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Kural Innovations" className="h-8 w-8 object-contain opacity-60" />
          <span className="font-display text-sm tracking-wider text-muted-foreground">KURAL INNOVATIONS</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kural Innovations. Small Ideas. Powerful Solutions.
        </p>
      </div>
    </footer>
  );
}
