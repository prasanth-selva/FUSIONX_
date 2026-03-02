"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useScrollCanvas } from "@/hooks/useScrollCanvas";
import { SYMPOSIUM_NAME, TAGLINE, HERO_DATE_DISPLAY, SEQUENCE_1_COUNT } from "@/lib/events";

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { images, progress, isReady } = useImagePreloader({
    basePath: "/sequence-1",
    prefix: "ezgif-frame-",
    count: SEQUENCE_1_COUNT,
    padLength: 3,
    extension: "jpg",
    startIndex: 1,
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

  // Text fades out as user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // Scroll indicator fades
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky canvas wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading overlay */}
        {!isReady && (
          <div className="absolute inset-0 bg-background flex flex-col items-center justify-center z-20">
            <div className="text-text-secondary text-xs tracking-ultrawide uppercase mb-6">
              Initializing
            </div>
            <div className="w-48 h-px bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-text-muted text-[10px] tracking-widest uppercase mt-4">
              {Math.round(progress * 100)}%
            </div>
          </div>
        )}

        {/* Canvas for frame animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Dark gradient overlays — minimized background frames */}
        <div className="absolute inset-0 bg-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/10 to-background/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none" />

        {/* Hero text overlay */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-accent" />
            <span className="text-accent text-[10px] tracking-ultrawide uppercase">
              KGISL Presents
            </span>
            <div className="w-8 h-px bg-accent" />
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,10vw,9rem)] font-bold tracking-[-0.02em] leading-none text-text-primary"
            >
              {SYMPOSIUM_NAME}
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[clamp(0.6rem,1.5vw,0.85rem)] text-accent tracking-ultrawide uppercase mb-8"
          >
            {TAGLINE}
          </motion.p>

          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="border border-border px-8 py-3 text-text-secondary text-xs tracking-widest uppercase"
          >
            {HERO_DATE_DISPLAY}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-text-muted text-[9px] tracking-ultrawide uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
