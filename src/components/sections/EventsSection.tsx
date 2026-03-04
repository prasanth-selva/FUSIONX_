"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EVENTS, TECH_EVENTS, NON_TECH_EVENTS, type SymposiumEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { EventCard } from "@/components/ui/EventCard";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";

type Filter = "all" | "technical" | "non-technical";

export function EventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [filter, setFilter] = useState<Filter>("all");
  const [activeEvent, setActiveEvent] = useState<SymposiumEvent | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeEvent]);

  const filtered =
    filter === "all"
      ? EVENTS
      : filter === "technical"
      ? TECH_EVENTS
      : NON_TECH_EVENTS;

  return (
    <section id="events" ref={ref} className="py-24 relative overflow-hidden">
      <MarqueeStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 40 } : {}}
                transition={{ duration: 0.8 }}
                className="h-px bg-accent"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent text-[10px] tracking-ultrawide uppercase"
              >
                Competitions
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-text-primary"
              >
                Choose Your Arena
              </motion.h2>
            </div>
          </div>

          {/* ── Filter tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-1 p-1 bg-surface border border-border self-start sm:self-auto"
          >
            {(["all", "technical", "non-technical"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 sm:px-4 py-2 text-[9px] tracking-widest uppercase transition-all duration-300 whitespace-nowrap",
                  filter === f
                    ? "bg-accent text-background font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {f === "all" ? "All" : f === "technical" ? "Technical" : "Non-Tech"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Events grid (responsive) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onClick={() => setActiveEvent(event)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Participation note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex items-start gap-3 p-4 sm:p-5 border border-border"
        >
          <span className="text-accent text-lg leading-none mt-0.5 shrink-0">ℹ</span>
          <p className="text-text-secondary text-xs leading-relaxed">
            <span className="text-text-primary font-medium">Participation Limit: </span>
            One participant can register for a maximum of{" "}
            <span className="text-accent">2 events</span> — either{" "}
            <span className="text-accent">1 Technical + 1 Non-Technical</span> or{" "}
            <span className="text-accent">2 Technical</span> events.
          </p>
        </motion.div>
      </div>

      {/* ── Event detail modal ── */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Modal with 3D rotation entrance animation                     */
/* ────────────────────────────────────────────────────────────── */

function EventModal({
  event,
  onClose,
}: {
  event: SymposiumEvent;
  onClose: () => void;
}) {
  const isTech = event.category === "technical";
  const accentColor = isTech ? "#c8a96e" : "#a855f7";

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-background/75 backdrop-blur-xl"
    >
      {/* Outer perspective container for 3D effect */}
      <div style={{ perspective: "1100px" }} className="w-full flex justify-center">
        <motion.div
          key={`modal-${event.id}`}
          initial={{ opacity: 0, scale: 0.82, rotateX: 14, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, rotateX: -10, y: 40 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xs sm:max-w-xl lg:max-w-3xl bg-surface border border-white/8 overflow-hidden shadow-2xl"
        >
          {/* ── Top: image banner ── */}
          <div className="relative w-full h-52 sm:h-64 lg:h-72 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            {/* Colored diagonal stripe overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, transparent 60%)`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 border border-white/10 text-text-primary hover:bg-background transition-colors text-lg leading-none z-10"
              aria-label="Close"
            >
              ×
            </button>

            {/* Category badge */}
            <span
              className={cn(
                "absolute top-4 left-4 text-[8px] tracking-widest uppercase px-2 py-1 font-semibold",
                isTech
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              )}
            >
              {isTech ? "Technical" : "Non-Tech"}
            </span>

            {/* Event number */}
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30">
              {String(event.id).padStart(2, "0")}
            </span>
          </div>

          {/* ── Content split: desktop two-col ── */}
          <div className="flex flex-col lg:flex-row">
            {/* Left / top: header + description */}
            <div className="flex-1 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/5">
              {/* Animated accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ background: accentColor }}
                className="h-[1.5px] origin-left mb-5 w-12"
              />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{event.icon}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight leading-snug">
                  {event.name}
                </h3>
              </div>

              <p
                className="text-[9px] tracking-widest uppercase mb-1 font-semibold"
                style={{ color: accentColor }}
              >
                {event.maxMembers}
              </p>
              <p
                className="text-[9px] tracking-widest uppercase mb-4 font-semibold flex items-center gap-1"
                style={{ color: accentColor }}
              >
                🕐 {event.timing}
              </p>

              <p className="text-text-secondary text-sm leading-relaxed">
                {event.description}
              </p>

              {/* Register hint */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 hidden lg:block"
              >
                <button
                  onClick={onClose}
                  className="text-[8px] tracking-widest uppercase font-semibold px-4 py-2 border transition-all duration-250"
                  style={{
                    borderColor: `${accentColor}50`,
                    color: accentColor,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = accentColor;
                    (e.currentTarget as HTMLButtonElement).style.color = "#050505";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = accentColor;
                  }}
                >
                  Close
                </button>
              </motion.div>
            </div>

            {/* Right / bottom: rules */}
            <div className="lg:w-72 xl:w-80 p-5 sm:p-7 flex flex-col">
              <h4
                className="text-[9px] tracking-widest uppercase font-semibold mb-4"
                style={{ color: accentColor }}
              >
                Rules &amp; Guidelines
              </h4>

              <ul className="space-y-3 flex-1 overflow-y-auto max-h-56 lg:max-h-none pr-1 scrollbar-thin">
                {event.rules.map((rule, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="text-xs mt-0.5 font-mono shrink-0 font-semibold"
                      style={{ color: accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-text-secondary text-xs leading-relaxed">
                      {rule}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile close */}
              <button
                onClick={onClose}
                className="lg:hidden mt-6 w-full py-3 text-xs tracking-widest uppercase font-semibold border transition-all duration-300"
                style={{ borderColor: `${accentColor}50`, color: accentColor }}
              >
                Close
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ background: accentColor }}
            className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}