"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | undefined;
    let frameId: number;

    try {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis!.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn("Lenis init failed, falling back to native scroll", e);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
