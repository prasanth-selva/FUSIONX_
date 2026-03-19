"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SYMPOSIUM_DATE } from "@/lib/events";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = SYMPOSIUM_DATE.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function CountdownSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  // Initialize with zeros to avoid SSR/client hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set real value on client immediately, then tick every second
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: pad(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <section
      id="register"
      ref={ref}
      className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-10 h-px bg-accent/40" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-[10px] tracking-ultrawide uppercase"
          >
            T‑Minus
          </motion.span>
          <div className="w-10 h-px bg-accent/40" />
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-tight text-text-primary"
          >
            The Clock Is Ticking
          </motion.h2>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 w-full max-w-2xl mx-auto"
        >
          {units.map((unit, i) => (
            <div
              key={unit.label}
              className="glass-card px-2 sm:px-4 py-4 sm:py-8 flex flex-col items-center gap-1 sm:gap-2"
            >
              <span className="text-[clamp(1.6rem,6vw,5rem)] font-bold font-mono text-text-primary leading-none tabular-nums">
                {unit.value}
              </span>
              <span className="text-text-muted text-[7px] sm:text-[9px] tracking-widest uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeTcH8QkwFr-tNHPsD0m39dyyXEb4v-DdFNv_f4p6Li3-7Q_Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-accent text-background text-xs tracking-widest uppercase font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,169,110,0.3)] text-center"
          >
            Register Now
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-border text-text-secondary text-xs tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300 text-center"
          >
            View Events
          </a>
        </motion.div>

        {/* Date note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-text-muted text-[10px] tracking-widest uppercase mt-10"
        >
          March 27, 2026 — KGISL Campus
        </motion.p>
      </div>
    </section>
  );
}
