import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-3">// CONTACT</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="font-heading text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Have an idea? A problem that needs solving? Let's talk about how we can turn it into a working solution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          <a
            href="mailto:kuralinnovation@gmail.com"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="text-3xl mb-3">📧</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Email</p>
            <p className="font-mono text-xs text-primary group-hover:text-glow-cyan break-all">kuralinnovation@gmail.com</p>
          </a>

          <a
            href="tel:+919345852826"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="text-3xl mb-3">📞</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Phone</p>
            <p className="font-mono text-xs text-primary">+91 9345852826</p>
          </a>

          <a
            href="https://instagram.com/kural_innovations"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="text-3xl mb-3">📸</div>
            <p className="font-heading font-semibold text-foreground text-sm mb-1">Instagram</p>
            <p className="font-mono text-xs text-primary">@kural_innovations</p>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 justify-center text-muted-foreground"
        >
          <span className="text-sm">📍</span>
          <span className="font-mono text-sm">Tamil Nadu, India</span>
        </motion.div>
      </div>
    </section>
  );
}
