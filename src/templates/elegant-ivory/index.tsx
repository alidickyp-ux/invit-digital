"use client";

import { Invitation } from "@prisma/client";
import { useState } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Hero from "./sections/Hero";
import Couple from "./sections/Couple";
import Event from "./sections/Event";
import Gallery from "./sections/Gallery";
import Gift from "./sections/Gift";
import RSVP from "./sections/RSVP";
import Wishes from "./sections/Wishes";
import OpeningCover from "@/components/shared/OpeningCover";
import MusicPlayer from "@/components/shared/MusicPlayer";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

interface Props { data: Invitation; guestName: string; }

// Garis pemisah section yang terlihat jelas
function Divider() {
  return (
    <div style={{ height: "2px", background: "linear-gradient(to right, transparent, rgba(201,169,110,0.35), transparent)" }} />
  );
}

export default function ElegantIvory({ data, guestName }: Props) {
  const [opened, setOpened] = useState(false);
  if (!opened) return <OpeningCover data={data} guestName={guestName} onOpen={() => setOpened(true)} />;

  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen lg:overflow-hidden" style={{ background: "#FDFBF7" }}>

      {/* ══ KIRI: Foto 70% ══ */}
      <section className="hidden lg:block lg:w-[70%] h-full relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: data.heroImage ? `url(${data.heroImage})` : `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80)` }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#FDFBF7]/90" />

        {/* Nama di kiri bawah */}
        <div className="absolute bottom-16 left-14 z-10 space-y-3">
          <p className={`${jost.className} text-[11px] tracking-[6px] uppercase text-white/70 font-light`}>The Wedding of</p>
          <h1 className={`${cormorant.className} text-[6rem] font-light text-white leading-none`}
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>{data.brideName}</h1>
          <span className={`${cormorant.className} text-4xl italic text-[#C9A96E] block py-1`}>&amp;</span>
          <h1 className={`${cormorant.className} text-[6rem] font-light text-white leading-none`}
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>{data.groomName}</h1>
        </div>
      </section>

      {/* ══ KANAN: Konten scroll 30% ══ */}
      <section className="w-full lg:w-[30%] h-auto lg:h-full lg:overflow-y-auto flex-shrink-0 relative"
        style={{ background: "#FDFBF7", boxShadow: "-8px 0 40px rgba(0,0,0,0.07)" }}>

        {/* Paper texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

        <div className="relative z-10">

          {/* ① Hero mobile */}
          <div className="lg:hidden" style={{ background: "#FDFBF7" }}>
            <Hero data={data} />
          </div>

          {/* ② COUPLE */}
          <Divider />
          <div style={{ background: "#F5EEE6" }}>
            <Couple data={data} />
          </div>

          {/* ③ QUOTE */}
          <Divider />
          <div className="text-center" style={{ background: "#FFFFFF", padding: "80px 48px" }}>
            <p className={`${cormorant.className} text-[1.6rem] text-[#C9A96E]`} style={{ marginBottom: "28px" }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "28px" }}>
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
            </div>
            <p className={`${cormorant.className} text-[1.15rem] italic text-[#5a4a3a] leading-[1.9]`}>
              "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <p className={`${jost.className} text-[11px] tracking-[4px] text-[#9E8A6E] uppercase`} style={{ marginTop: "28px", marginBottom: "28px" }}>
              — QS. Ar-Rum : 21 —
            </p>
            <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "28px" }}>
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
            </div>
            <p className={`${jost.className} text-[14px] text-[#9E8A6E] leading-[1.9]`}>
              Dengan memohon rahmat dan ridha Allah SWT, kami mengundang<br />
              Bapak/Ibu/Saudara/i untuk hadir dalam hari bahagia kami.
            </p>
          </div>

          {/* ④ EVENT */}
          <Divider />
          <div style={{ background: "#FDFBF7" }}>
            <Event data={data} />
          </div>

          {/* ⑤ GALLERY */}
          {(data.galleryImages?.length ?? 0) > 0 && (
            <>
              <Divider />
              <div style={{ background: "#FFFFFF" }}>
                <Gallery data={data} />
              </div>
            </>
          )}

          {/* ══ TAMBAHKAN SECTION GIFT DI SINI ══ */}
{(data.giftBank1 || data.giftBank2) && (
  <>
    <Divider />
    <div style={{ background: "#FDFBF7" }}>
      <Gift data={data} />
    </div>
  </>
)}

          {/* ⑥ RSVP */}
          <Divider />
          <div style={{ background: "#F4EBE6" }}>
            <RSVP invitationId={data.id} guestName={guestName} />
          </div>

          {/* ⑦ WISHES */}
          <Divider />
          <div style={{ background: "#FFFFFF" }}>
            <Wishes invitationId={data.id} />
          </div>

          {/* ⑧ FOOTER */}
          <Divider />
          <footer className="text-center" style={{ background: "#FDFBF7", padding: "72px 40px" }}>
            <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "28px" }}>
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
            </div>
            <p className={`${cormorant.className} text-[1.8rem] italic text-[#1a1a1a]`}>
              {data.brideName} &amp; {data.groomName}
            </p>
            <p className={`${jost.className} text-[11px] tracking-[6px] text-[#9E8A6E] uppercase`} style={{ marginTop: "16px", marginBottom: "28px" }}>
              Truly Yours
            </p>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
              <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
            </div>
          </footer>
        </div>
      </section>

      <MusicPlayer src={data.musicUrl} />
    </main>
  );
}