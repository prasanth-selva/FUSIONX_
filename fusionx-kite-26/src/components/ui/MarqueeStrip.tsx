"use client";

import { MARQUEE_ITEMS } from "@/lib/events";

export function MarqueeStrip() {
  // Duplicate array for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full overflow-hidden border-y border-border py-4 bg-surface">
      <div
        className="flex gap-12 whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="text-text-muted text-[9px] tracking-ultrawide uppercase">
              {item}
            </span>
            <span className="text-accent text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
