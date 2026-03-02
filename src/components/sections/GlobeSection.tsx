"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[500px] overflow-hidden"
    >
      {/* Globe video */}
      <video
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-accent/60" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-accent text-[10px] tracking-ultrawide uppercase"
          >
            Intercollegiate
          </motion.span>
          <div className="w-8 h-px bg-accent/60" />
        </div>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(2rem,6vw,6rem)] font-bold tracking-tight text-text-primary leading-none"
          >
            Open to All.
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-[clamp(2rem,6vw,6rem)] font-bold tracking-tight text-gradient-gold leading-none"
          >
            Built for the Best.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-text-secondary text-sm max-w-md leading-relaxed"
        >
          FUSION X '26 welcomes participants from all institutions. Bring your
          team, your talent, and your drive.
        </motion.p>
      </div>
    </section>
  );
}
