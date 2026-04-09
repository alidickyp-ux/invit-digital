"use client";

import { Invitation } from "@prisma/client";
import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic", "normal"] });

export default function Gallery({ data }: { data: Invitation }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const images = data.galleryImages || [];

  if (images.length === 0) return null;

  const next = () => setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  // Hitung persentase untuk lingkaran (SVG Stroke Dasharray)
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const progress = ((index + 1) / images.length) * circumference;

  return (
    <section className="py-20 px-4 text-center bg-white/30">
      <h2 className={`${cormorant.className} text-4xl text-[#3D3020] mb-12`}>Captured Memories</h2>

      {/* Grid Utama (Sama seperti sebelumnya) */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto px-4">
        {images.map((url, i) => (
          <div 
            key={i} 
            onClick={() => { setIndex(i); setIsOpen(true); }}
            className={`cursor-pointer overflow-hidden rounded-sm border border-[#C9A96E]/20 bg-stone-100 transition-all hover:shadow-lg active:scale-95 ${
              i === 0 ? "col-span-2 aspect-video" : "aspect-square"
            }`}
          >
            <img src={url} alt="Gallery" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        ))}
      </div>

      {/* --- FLOATING SLIDER MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-md animate-in fade-in duration-300">
          
          {/* Tombol Close di Atas */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-10 right-10 text-[#3D3020]/40 hover:text-[#C9A96E] text-2xl transition-colors"
          >
            ✕
          </button>

          {/* AREA CAROUSEL (Kiri - Tengah - Kanan) */}
          <div className="relative w-full flex items-center justify-center overflow-hidden h-[50vh]">
            
            {/* Foto Sebelumnya (Intipan Kiri) */}
            <div 
              className="absolute left-[-40%] md:left-[-15%] w-[60%] h-[70%] opacity-20 blur-[2px] transition-all duration-700 scale-90 cursor-pointer hidden sm:block"
              onClick={prev}
            >
              <img src={images[index === 0 ? images.length - 1 : index - 1]} className="w-full h-full object-cover rounded-lg" alt="prev" />
            </div>

            {/* FOTO UTAMA (TENGAH) */}
            <div className="relative z-10 w-[85%] md:w-[60%] lg:w-[40%] h-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden border-4 border-white animate-in zoom-in-95 duration-500">
               <img src={images[index]} className="w-full h-full object-cover" alt="current" />
               
               {/* Navigasi Kiri Kanan Transparan */}
               <button onClick={prev} className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-start pl-4 text-white/50 hover:text-white transition-opacity bg-gradient-to-r from-black/20 to-transparent">‹</button>
               <button onClick={next} className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 text-white/50 hover:text-white transition-opacity bg-gradient-to-l from-black/20 to-transparent">›</button>
            </div>

            {/* Foto Sesudahnya (Intipan Kanan) */}
            <div 
              className="absolute right-[-40%] md:right-[-15%] w-[60%] h-[70%] opacity-20 blur-[2px] transition-all duration-700 scale-90 cursor-pointer hidden sm:block"
              onClick={next}
            >
              <img src={images[index === images.length - 1 ? 0 : index + 1]} className="w-full h-full object-cover rounded-lg" alt="next" />
            </div>
          </div>

          {/* INDIKATOR LINGKARAN & COUNTER */}
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="relative flex items-center justify-center w-16 h-16">
              {/* Lingkaran Background */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32" cy="32" r={radius}
                  className="stroke-[#C9A96E]/10 fill-none"
                  strokeWidth="2"
                />
                {/* Lingkaran Progress yang Bergerak */}
                <circle
                  cx="32" cy="32" r={radius}
                  className="stroke-[#C9A96E] fill-none transition-all duration-700 ease-out"
                  strokeWidth="2"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                />
              </svg>
              {/* Angka di tengah lingkaran */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#3D3020]">{index + 1}</span>
              </div>
            </div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#9E8A6E] opacity-60">of {images.length} Moments</p>
          </div>

          {/* Instruksi Swipe */}
          <p className="absolute bottom-10 text-[8px] tracking-[2px] uppercase text-stone-400">Click sides to navigate</p>
        </div>
      )}
    </section>
  );
}