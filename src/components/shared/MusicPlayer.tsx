"use client";

import { useEffect, useRef, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

export default function MusicPlayer({ src }: { src?: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src || !audioRef.current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  }, [src]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={toggle}
        title={playing ? "Pause musik" : "Play musik"}
        className={`
          fixed bottom-5 right-5 z-50
          w-11 h-11 rounded-full bg-white
          border border-[#C9A96E] shadow-md
          flex items-center justify-center
          transition-all duration-300
          ${playing ? "animate-spin-slow" : ""}
        `}
        style={{ animationDuration: "4s" }}
      >
        <span className={`${cormorant.className} text-lg text-[#C9A96E] leading-none`}>
          {playing ? "♪" : "♩"}
        </span>
      </button>
    </>
  );
}