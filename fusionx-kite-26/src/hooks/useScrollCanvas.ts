"use client";

import { useEffect, useRef, MutableRefObject } from "react";

export function useScrollCanvas(
  containerRef: MutableRefObject<HTMLElement | null>,
  images: HTMLImageElement[],
  isReady: boolean
): MutableRefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isReady || images.length === 0) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Enable high-quality image smoothing to eliminate pixel breakage
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let rafId: number | null = null;
    let lastFrame = -1;

    /**
     * Set canvas logical size to CSS size × devicePixelRatio.
     * This is the key fix for retina / high-DPI pixelation.
     */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;

      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      // Re-apply smoothing after resize (context state resets on resize)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      renderFrame(getCurrentFrame(), true);
    };

    const getCurrentFrame = (): number => {
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(1, containerHeight - viewportHeight);
      const progress = Math.max(
        0,
        Math.min(1, (scrollTop - containerTop) / scrollable)
      );
      return Math.min(
        images.length - 1,
        Math.floor(progress * (images.length - 1))
      );
    };

    const renderFrame = (index: number, force = false) => {
      if (!force && index === lastFrame) return; // skip redundant draws
      lastFrame = index;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;   // physical pixels
      const ch = canvas.height;

      // Fill background black first so no flicker
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, cw, ch);

      // Scale frame to 85% of canvas to reduce full-bleed pixelation
      const SCALE = 0.85;
      const targetW = cw * SCALE;
      const targetH = ch * SCALE;

      // Cover-fit within the scaled target
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const targetAspect = targetW / targetH;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > targetAspect) {
        drawH = targetH;
        drawW = drawH * imgAspect;
      } else {
        drawW = targetW;
        drawH = drawW / imgAspect;
      }

      // Centre the frame
      drawX = (cw - drawW) / 2;
      drawY = (ch - drawH) / 2;

      // Slight blur on context to smooth JPEG compression artifacts
      ctx.filter = "blur(0.6px)";
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.filter = "none";
    };

    // Throttle via rAF to prevent multiple draws per frame
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        renderFrame(getCurrentFrame());
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReady, images, containerRef]);

  return canvasRef;
}
