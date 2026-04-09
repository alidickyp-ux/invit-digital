"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300"] });

export default function CountdownTimer({ eventDate }: { eventDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(eventDate).getTime() - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const Item = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="w-14 h-14 border-[0.5px] border-[#C9A96E]/40 flex items-center justify-center bg-white/50">
        <span className={`${cormorant.className} text-2xl text-[#3D3020]`}>{String(val).padStart(2, '0')}</span>
      </div>
      <span className="text-[8px] tracking-widest text-[#9E8A6E] uppercase mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-3 justify-center items-center py-4">
      <Item val={time.days} label="Hari" />
      <Item val={time.hours} label="Jam" />
      <Item val={time.minutes} label="Menit" />
      <Item val={time.seconds} label="Detik" />
    </div>
  );
}