"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/eminence.mp3");
    audio.loop = true;
    audio.volume = 0.32;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 2.5 }}
      onClick={toggle}
      title={playing ? "Pause EMINENCE" : "Play EMINENCE"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3
        bg-surface/90 backdrop-blur-md border hover:border-accent
        transition-all duration-300 group cursor-pointer select-none"
      style={{
        borderColor: playing ? "rgba(200,169,110,0.8)" : "rgba(26,26,26,1)",
      }}
    >
      {/* Sound wave bars */}
      <div className="flex items-end gap-[2.5px] h-4 flex-shrink-0">
        {[3, 5, 4, 7, 4, 5, 3].map((h, i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-full"
            style={{
              height: `${h * 2}px`,
              transformOrigin: "bottom",
              backgroundColor: playing ? "#c8a96e" : "#3d3b37",
            }}
            animate={
              playing
                ? {
                    scaleY: [0.4, 1, 0.5, 1.2, 0.6, 1, 0.4],
                    transition: {
                      duration: 1.1,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    },
                  }
                : { scaleY: 0.3 }
            }
          />
        ))}
      </div>

      {/* Track info */}
      <div className="flex flex-col items-start leading-none">
        <span className="text-[8px] tracking-ultrawide uppercase text-text-muted group-hover:text-accent transition-colors duration-200">
          {playing ? "Now Playing" : "Press to Play"}
        </span>
        <span className="text-[10px] tracking-widest uppercase font-medium mt-0.5"
          style={{ color: playing ? "#c8a96e" : "#7a776e" }}>
          EMINENCE
        </span>
      </div>

      {/* Play/Pause icon */}
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center border rounded-full text-[8px]"
        style={{
          borderColor: playing ? "#c8a96e" : "#3d3b37",
          color: playing ? "#c8a96e" : "#7a776e",
        }}>
        {playing ? "❚❚" : "▶"}
      </div>

      {/* Animated border glow when playing */}
      {playing && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ border: "1px solid rgba(200,169,110,0.3)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
