"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useScrollCanvas } from "@/hooks/useScrollCanvas";
import { SEQUENCE_2_COUNT } from "@/lib/events";

export function PlaneMorph() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { images, progress, isReady } = useImagePreloader({
    basePath: "/sequence-2",
    prefix: "ezgif-frame-",
    count: SEQUENCE_2_COUNT,
    padLength: 3,
    extension: "jpg",
    startIndex: 148,
  });

  const canvasRef = useScrollCanvas(
    containerRef as React.MutableRefObject<HTMLElement | null>,
    images,
    isReady
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.3], [0.92, 1]);

  return (
    <section
      ref={containerRef}
      id="sequence"
      className="relative"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading bar */}
        {!isReady && (
          <div className="absolute inset-0 bg-background z-20 flex items-center justify-center">
            <div className="w-32 h-px bg-border overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/10 to-background/80 pointer-events-none" />

        {/* Centered text appears mid-scroll */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6 z-10"
        >
          <div className="max-w-2xl">
            <p className="text-text-secondary text-xs tracking-ultrawide uppercase mb-4">
              — Innovation Elevated —
            </p>
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold leading-tight tracking-tight text-text-primary mb-6">
              Compete Across{" "}
              <span className="text-gradient-gold">10 Disciplines</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-lg mx-auto">
              From research papers to circuit design, from vibe-coding to
              esports — FUSION X '26 is where your every skill finds an arena.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
