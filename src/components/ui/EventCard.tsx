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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "group relative p-6 cursor-pointer border border-border hover:border-opacity-100 transition-all duration-400 overflow-hidden",
        isTech ? "event-card-tech hover:border-accent/50" : "event-card-non-tech hover:border-purple-500/50",
        "hover-glow"
      )}
    >
      {/* ID */}
      <div className="text-text-muted font-mono text-[9px] mb-4">
        {String(event.id).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div className="text-3xl mb-4">{event.icon}</div>

      {/* Name */}
      <h3 className="text-text-primary text-sm font-semibold leading-tight mb-2 group-hover:text-accent transition-colors duration-200">
        {event.name}
      </h3>

      {/* Members badge */}
      <p className="text-text-muted text-[9px] tracking-widest uppercase mb-4">
        {event.maxMembers}
      </p>

      {/* Description preview */}
      <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
        {event.description}
      </p>

      {/* Arrow reveal on hover */}
      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span
          className={cn(
            "text-[9px] tracking-widest uppercase",
            isTech ? "text-accent" : "text-purple-400"
          )}
        >
          View Rules
        </span>
        <span
          className={cn(
            "text-xs",
            isTech ? "text-accent" : "text-purple-400"
          )}
        >
          →
        </span>
      </div>

      {/* Category tag bottom right */}
      <div
        className={cn(
          "absolute bottom-3 right-3 text-[7px] tracking-widest uppercase px-2 py-1",
          isTech
            ? "text-accent/50"
            : "text-purple-400/50"
        )}
      >
        {isTech ? "Technical" : "Non-Tech"}
      </div>

      {/* Hover glow line at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px origin-left",
          isTech ? "bg-accent" : "bg-purple-500"
        )}
      />
    </motion.div>
  );
}
