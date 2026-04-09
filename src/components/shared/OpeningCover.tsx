"use client";

import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function OpeningCover({ data, guestName, onOpen }: any) {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className={`${jost.className} fixed inset-0 z-[9999] overflow-hidden flex`}>
      {/* KIRI foto — desktop */}
      <div className="hidden lg:block lg:w-[65%] h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: data.heroImage ? `url(${data.heroImage})` : `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-[#FDFBF7]" />
        <div className="absolute bottom-16 left-14 z-10 space-y-3">
          <p className="text-[11px] tracking-[5px] uppercase text-white/70">The Wedding of</p>
          <h1 className={`${cormorant.className} text-8xl font-light text-white leading-none`}
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>{data.brideName}</h1>
          <span className={`${cormorant.className} text-4xl italic text-[#C9A96E] block`}>&amp;</span>
          <h1 className={`${cormorant.className} text-8xl font-light text-white leading-none`}
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>{data.groomName}</h1>
        </div>
      </div>

      {/* KANAN panel */}
      <div className="w-full lg:w-[35%] h-full bg-[#FDFBF7] flex flex-col items-center justify-between py-20 px-12 relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

        {/* Atas */}
        <div className="relative flex flex-col items-center gap-3">
          <div className="h-px w-20 bg-[#C9A96E] opacity-40" />
          <p className="text-[10px] tracking-[6px] text-[#9E8A6E] uppercase">Undangan Pernikahan</p>
          <div className="h-px w-20 bg-[#C9A96E] opacity-40" />
        </div>

        {/* Tengah */}
        <div className="relative flex flex-col items-center text-center gap-8">
          {/* Arch photo mobile */}
          <div className="lg:hidden w-44 overflow-hidden shadow-xl"
            style={{ height: "200px", borderRadius: "88px 88px 0 0", border: "5px solid #fff", outline: "1px solid #C9A96E", background: "#EDE6DA" }}>
            {data.heroImage
              ? <img src={data.heroImage} alt="" className="w-full h-full object-cover" />
              : <div className="flex items-center justify-center h-full"><span className="text-[9px] text-[#C9A96E] tracking-widest uppercase">Photo</span></div>}
          </div>

          <div className="space-y-4">
            <p className="text-[11px] tracking-[5px] text-[#9E8A6E] uppercase">The Wedding of</p>
            <h1 className={`${cormorant.className} text-[4.5rem] font-light text-[#1a1a1a] leading-none`}>{data.brideName}</h1>
            <p className={`${cormorant.className} text-4xl italic text-[#C9A96E]`}>&amp;</p>
            <h1 className={`${cormorant.className} text-[4.5rem] font-light text-[#1a1a1a] leading-none`}>{data.groomName}</h1>
          </div>

          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A96E] opacity-35" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
            <div className="h-px flex-1 max-w-[60px] bg-[#C9A96E] opacity-35" />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] tracking-[4px] text-[#9E8A6E] uppercase">Kepada Yth.</p>
            <p className={`${cormorant.className} text-2xl italic text-[#1a1a1a]`}>{guestName}</p>
          </div>
        </div>

        {/* Bawah */}
        <div className="relative flex flex-col items-center gap-5">
          <p className="text-[11px] tracking-[2px] text-[#9E8A6E]">{formattedDate}</p>
          <button onClick={onOpen}
            className="flex items-center gap-3 px-12 py-4 border border-[#C9A96E] text-[10px] tracking-[5px] text-[#5a4a3a] uppercase hover:bg-[#C9A96E] hover:text-white transition-all duration-500">
            <span>✉</span><span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  );
}