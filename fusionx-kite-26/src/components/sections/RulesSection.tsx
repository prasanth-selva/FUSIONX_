"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EVENTS, type SymposiumEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export function RulesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="rules" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 bg-surface relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-10 h-px bg-accent" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-accent text-[10px] tracking-ultrawide uppercase"
            >
              Regulations
            </motion.span>
            <div className="w-10 h-px bg-accent" />
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight text-text-primary"
            >
              Event Rules & Guidelines
            </motion.h2>
          </div>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border">
          {EVENTS.map((event, i) => (
            <RuleAccordion
              key={event.id}
              event={event}
              index={i}
              isOpen={active === event.id}
              onToggle={() => setActive(active === event.id ? null : event.id)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RuleAccordion({
  event,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  event: SymposiumEvent;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="text-text-muted font-mono text-[10px]">
            {String(event.id).padStart(2, "0")}
          </span>
          <span className="text-lg">{event.icon}</span>
          <span className="text-text-primary text-sm font-medium group-hover:text-accent transition-colors duration-200">
            {event.name}
          </span>
          <span
            className={cn(
              "hidden sm:block text-[8px] tracking-widest uppercase px-2 py-0.5 border",
              event.category === "technical"
                ? "border-accent/30 text-accent"
                : "border-purple-500/30 text-purple-400"
            )}
          >
            {event.category}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted text-xl leading-none flex-shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 sm:pb-6 pl-6 sm:pl-10">
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              <ul className="space-y-2">
                {event.rules.map((rule, ri) => (
                  <li key={ri} className="flex items-start gap-3">
                    <span className="text-accent text-[10px] font-mono mt-0.5">
                      —
                    </span>
                    <span className="text-text-secondary text-xs leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
