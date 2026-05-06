import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-3">// ABOUT US</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Where Ideas Meet <span className="text-gradient">Implementation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              Kural Innovations is a technology-driven innovation studio based in Tamil Nadu, focused on transforming simple ideas into powerful, real-world solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are not a typical service provider. We operate as a <span className="text-primary font-semibold">build lab</span> — where ideas are designed, developed, and implemented into practical systems that solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Inspired by "Kural" — short yet impactful wisdom. The belief that the smallest idea, combined with the right technology, creates meaningful real-world impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              { icon: "🔧", title: "Real-world working solutions", desc: "Not mockups. Not prototypes. Every delivery works in the field." },
              { icon: "🏗️", title: "Web + IoT + Embedded under one roof", desc: "Rare combination of firmware, hardware, and software expertise." },
              { icon: "🎯", title: "Problem-first approach", desc: 'Every project begins with: "What real problem are we solving?"' },
              { icon: "💡", title: "Innovation-first mindset", desc: "Every solution is custom-engineered from scratch." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
