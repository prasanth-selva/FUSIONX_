"use client";

import { useRef, useState } from "react";
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

  const filtered =
    filter === "all"
      ? EVENTS
      : filter === "technical"
      ? TECH_EVENTS
      : NON_TECH_EVENTS;

  return (
    <section id="events" ref={ref} className="py-24 relative overflow-hidden">
      <MarqueeStrip />

      <div className="max-w-7xl mx-auto px-6 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
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

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-1 p-1 bg-surface border border-border"
          >
            {(["all", "technical", "non-technical"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 text-[9px] tracking-widest uppercase transition-all duration-300",
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

        {/* Events grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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

        {/* Participation note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex items-start gap-3 p-5 border border-border"
        >
          <span className="text-accent text-lg leading-none mt-0.5">ℹ</span>
          <p className="text-text-secondary text-xs leading-relaxed">
            <span className="text-text-primary font-medium">Participation Limit: </span>
            One participant can register for a maximum of{" "}
            <span className="text-accent">2 events</span> — either{" "}
            <span className="text-accent">1 Technical + 1 Non-Technical</span> or{" "}
            <span className="text-accent">2 Technical</span> events.
          </p>
        </motion.div>
      </div>

      {/* Event detail modal */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: SymposiumEvent;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-lg w-full p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-4xl mb-3">{event.icon}</div>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight">
              {event.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  "text-[9px] tracking-widest uppercase px-2 py-1 border",
                  event.category === "technical"
                    ? "border-accent/40 text-accent"
                    : "border-purple-500/40 text-purple-400"
                )}
              >
                {event.category}
              </span>
              <span className="text-text-muted text-[9px] tracking-widest uppercase">
                {event.maxMembers}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Rules */}
        <div>
          <h4 className="text-[9px] tracking-ultrawide uppercase text-accent mb-4">
            Rules & Guidelines
          </h4>
          <ul className="space-y-2">
            {event.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xs mt-0.5 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-text-secondary text-xs leading-relaxed">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 border border-accent text-accent text-xs tracking-widest uppercase hover:bg-accent hover:text-background transition-all duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
