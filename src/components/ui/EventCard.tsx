"use client";

import { motion } from "framer-motion";
import { type SymposiumEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: SymposiumEvent;
  index: number;
  onClick: () => void;
}

export function EventCard({ event, index, onClick }: EventCardProps) {
  const isTech = event.category === "technical";
  const accentColor = isTech ? "#c8a96e" : "#a855f7";

  return (
    <motion.div
      layout
      layoutId={`event-card-${event.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
      className="group relative cursor-pointer border bg-surface overflow-hidden rounded-sm select-none"
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Image ────────────────────────────────────────── */}
      <motion.div
        layoutId={`event-img-${event.id}`}
        className="relative h-44 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

        {/* Category badge */}
        <motion.span
          layoutId={`event-badge-${event.id}`}
          className={cn(
            "absolute top-3 left-3 text-[8px] tracking-widest uppercase px-2 py-1 font-semibold",
            isTech
              ? "bg-accent/20 text-accent border border-accent/30"
              : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
          )}
        >
          {isTech ? "Technical" : "Non-Tech"}
        </motion.span>

        <span className="absolute top-3 right-3 text-[9px] font-mono text-white/30">
          {String(event.id).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="p-5">
        <motion.h3
          layoutId={`event-title-${event.id}`}
          className="text-text-primary text-sm font-bold leading-snug mb-1 group-hover:text-accent transition-colors duration-200"
        >
          <span className="mr-2">{event.icon}</span>
          {event.name}
        </motion.h3>

        <p className="text-text-muted text-[9px] tracking-widest uppercase mb-1">
          {event.maxMembers}
        </p>
        <p className="text-text-muted text-[9px] tracking-widest uppercase mb-3">
          🕐 {event.timing}
        </p>

        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>

        <span
          className={cn(
            "text-[8px] tracking-widest uppercase font-semibold transition-opacity duration-200 opacity-0 group-hover:opacity-100",
            isTech ? "text-accent" : "text-purple-400"
          )}
        >
          Tap to expand →
        </span>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
        style={{ background: accentColor }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
      />
    </motion.div>
  );
}
