"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SUB_TAGLINE, PARTICIPATION_RULE } from "@/lib/events";

const STATS = [
  { value: "10", label: "Events" },
  { value: "2", label: "Categories" },
  { value: "1", label: "Epic Day" },
  { value: "∞", label: "Memories" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 40 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-accent"
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-accent text-[10px] tracking-ultrawide uppercase"
          >
            About the Event
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading */}
          <div>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-tight tracking-tight text-text-primary"
              >
                One Day.
                <br />
                <span className="text-gradient-gold">Ten Arenas.</span>
                <br />
                Limitless Ambition.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-text-secondary text-[10px] tracking-ultrawide uppercase mb-6"
            >
              {SUB_TAGLINE}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="grid grid-cols-4 gap-4 mt-12"
            >
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-border pt-4">
                  <div className="text-3xl font-bold text-accent mb-1">{s.value}</div>
                  <div className="text-text-muted text-[9px] tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card p-8 space-y-6">
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="text-text-primary font-medium">FUSION X '26</span> is
                KGISL's flagship intercollegiate technical symposium — an elite,
                single-day competition where the best minds across institutions
                converge to think, build, and compete.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Across 8 technical and 2 non-technical events, participants will
                push the boundaries of research, design, engineering, and
                esports — all in a single, high-stakes day on{" "}
                <span className="text-accent">March 27, 2026</span>.
              </p>

              {/* Participation rule */}
              <div className="border-l-2 border-accent pl-4 py-1">
                <p className="text-text-secondary text-xs leading-relaxed">
                  <span className="text-accent font-medium block mb-1 text-[9px] tracking-widest uppercase">
                    Participation Rule
                  </span>
                  {PARTICIPATION_RULE}
                </p>
              </div>

              <a
                href="#events"
                className="inline-flex items-center gap-3 text-accent text-xs tracking-widest uppercase hover:gap-5 transition-all duration-300"
              >
                Explore Events
                <span className="text-lg leading-none">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
