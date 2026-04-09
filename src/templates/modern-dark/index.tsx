"use client";

import { Invitation } from "@prisma/client";
import { useState, useRef } from "react";
import { Playfair_Display, Jost } from "next/font/google";
import Hero from "./sections/Hero";
import Couple from "./sections/Couple";
import Event from "./sections/Event";
import Gallery from "./sections/Gallery";
import Gift from "./sections/Gift";
import RSVP from "./sections/RSVP";
import Wishes from "./sections/Wishes";
import MusicPlayer from "@/components/shared/MusicPlayer";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

interface Props { data: Invitation; guestName: string; }

// ── Cover pembuka ──────────────────────────────────────────
function Cover({ data, guestName, onOpen }: {
  data: Invitation; guestName: string; onOpen: () => void;
}) {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className={`${jost.className} fixed inset-0 z-[9999] overflow-hidden flex`} style={{ background: "#0F0F0F" }}>

      {/* KIRI foto — desktop */}
      <div className="hidden lg:block lg:w-[58%] h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data.heroImage
              ? `url(${data.heroImage})`
              : `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80)`,
            filter: "brightness(0.72)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 45%, #0F0F0F)" }} />
        {/* Ornamen bunga */}
        <div className="absolute top-0 left-0 w-44 h-44 opacity-20 pointer-events-none">
          <svg viewBox="0 0 180 180" fill="none">
            <circle cx="60" cy="60" r="42" stroke="white" strokeWidth="0.7" fill="none"/>
            <path d="M18 18 Q60 4 102 18 Q116 60 102 102 Q60 116 18 102 Q4 60 18 18Z" stroke="white" strokeWidth="0.7" fill="none"/>
            <path d="M0 0 C50 35, 70 60, 50 150" stroke="white" strokeWidth="0.5" fill="none"/>
            <path d="M0 0 C70 25, 120 45, 180 20" stroke="white" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
      </div>

      {/* KANAN panel */}
      <div
        className="w-full lg:w-[42%] h-full flex flex-col items-center justify-between relative overflow-hidden"
        style={{ padding: "72px 48px" }}
      >
        {/* Geometric frame */}
        <div style={{ position: "absolute", inset: "18px", border: "1px solid rgba(184,149,42,0.12)", pointerEvents: "none" }} />
        {[["top","left","borderTop","borderLeft"],["top","right","borderTop","borderRight"],["bottom","left","borderBottom","borderLeft"],["bottom","right","borderBottom","borderRight"]].map(([v,h,b1,b2]) => (
          <div key={`${v}${h}`} style={{ position: "absolute", [v]: "18px", [h]: "18px", width: "22px", height: "22px", [b1]: "2px solid #B8952A", [b2]: "2px solid #B8952A" } as React.CSSProperties} />
        ))}

        {/* Atas */}
        <div className="relative text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ height: "1px", width: "64px", background: "#B8952A", opacity: 0.45 }} />
          <p className="text-[10px] tracking-[7px] uppercase text-[#5A5D6E]">Undangan Pernikahan</p>
          <div style={{ height: "1px", width: "64px", background: "#B8952A", opacity: 0.45 }} />
        </div>

        {/* Tengah */}
        <div className="relative text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div className="lg:hidden w-44 overflow-hidden"
            style={{ height: "196px", borderRadius: "88px 88px 0 0", border: "2px solid rgba(184,149,42,0.4)", background: "#1A1D27" }}>
            {data.heroImage
              ? <img src={data.heroImage} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.78)" }} />
              : <div className="flex items-center justify-center h-full"><span style={{ color: "#B8952A", fontSize: "11px", letterSpacing: "2px" }}>PHOTO</span></div>
            }
          </div>

          <div style={{ width: "1px", height: "44px", background: "linear-gradient(to bottom, transparent, #B8952A)", opacity: 0.5 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p className="text-[11px] tracking-[6px] uppercase text-[#5A5D6E]">The Wedding of</p>
            <h1 className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "2px" }}>
              {data.brideName}
            </h1>
            <p className={`${playfair.className} italic text-[#B8952A]`} style={{ fontSize: "2rem" }}>&amp;</p>
            <h1 className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "2px" }}>
              {data.groomName}
            </h1>
          </div>

          <div style={{ width: "1px", height: "44px", background: "linear-gradient(to top, transparent, #B8952A)", opacity: 0.5 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p className="text-[10px] tracking-[5px] uppercase text-[#5A5D6E]">Kepada Yth.</p>
            <p className={`${playfair.className} italic text-[#B8952A]`} style={{ fontSize: "1.4rem" }}>{guestName}</p>
          </div>
        </div>

        {/* Bawah */}
        <div className="relative text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <p className="text-[11px] tracking-[2px] text-[#5A5D6E]">{formattedDate}</p>
          <button
            onClick={onOpen}
            style={{
              padding: "15px 44px",
              background: "#B8952A", color: "#0F0F0F",
              fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase",
              fontFamily: "inherit", fontWeight: 700, cursor: "pointer", border: "none",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E8C96A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#B8952A"; }}
          >
            ✉ Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Divider antar section ─────────────────────────────────
function Divider() {
  return (
    <div style={{ height: "2px", background: "linear-gradient(to right, transparent, rgba(184,149,42,0.28), transparent)" }} />
  );
}

// ── Main ──────────────────────────────────────────────────
export default function ModernDark({ data, guestName }: Props) {
  const [opened, setOpened] = useState(false);

  // Ref untuk panel scroll kanan (desktop) dan window (mobile)
  const scrollPanelRef = useRef<HTMLElement>(null);

  const handleOpen = () => {
    setOpened(true);

    // Auto-scroll ke bawah setelah animasi cover selesai
    setTimeout(() => {
      const panel = scrollPanelRef.current;
      if (panel) {
        // Desktop — scroll panel kanan
        panel.scrollTo({ top: 400, behavior: "smooth" });
      } else {
        // Mobile — scroll window
        window.scrollTo({ top: window.innerHeight * 0.4, behavior: "smooth" });
      }
    }, 350);
  };

  if (!opened) return <Cover data={data} guestName={guestName} onOpen={handleOpen} />;

  return (
    <main
      className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen lg:overflow-hidden"
      style={{ background: "#0F0F0F" }}
    >
      {/* ══ KIRI: Foto 70% ══ */}
      <section className="hidden lg:block lg:w-[70%] h-full relative overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data.heroImage
              ? `url(${data.heroImage})`
              : `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80)`,
            filter: "brightness(0.62)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 35%, #0F0F0F)" }} />

        {/* Ornamen pojok kanan atas */}
        <div className="absolute top-0 right-0 w-52 h-52 opacity-14 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="130" cy="70" r="50" stroke="white" strokeWidth="0.7" fill="none"/>
            <path d="M80 20 Q130 4 180 20 Q196 70 180 120 Q130 136 80 120 Q64 70 80 20Z" stroke="white" strokeWidth="0.7" fill="none"/>
          </svg>
        </div>

        {/* Nama di kiri bawah */}
        <div className="absolute bottom-16 left-12 z-10" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p className={`${jost.className} uppercase text-white/40`} style={{ fontSize: "10px", letterSpacing: "7px" }}>The Wedding of</p>
          <h1
            className={`${playfair.className} text-white font-bold uppercase leading-none`}
            style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            {data.brideName}
          </h1>
          <span className={`${playfair.className} italic text-[#B8952A]`} style={{ fontSize: "2.2rem" }}>&amp;</span>
          <h1
            className={`${playfair.className} text-white font-bold uppercase leading-none`}
            style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            {data.groomName}
          </h1>
        </div>
      </section>

      {/* ══ KANAN: Konten scroll 30% ══ */}
      <section
        ref={scrollPanelRef}
        className="w-full lg:w-[30%] h-auto lg:h-full lg:overflow-y-auto flex-shrink-0 relative"
        style={{ background: "#0F0F0F", boxShadow: "-8px 0 48px rgba(0,0,0,0.5)" }}
      >
        <div className="relative z-10">

          {/* ① Hero — mobile only */}
          <div className="lg:hidden">
            <Hero data={data} />
          </div>

          {/* ② COUPLE */}
          <Divider />
          <Couple data={data} />

          {/* ③ QUOTE */}
          <Divider />
          <div style={{ background: "#111318", padding: "88px 44px", textAlign: "center" }}>
            <p className={`${playfair.className} text-[#B8952A]`} style={{ fontSize: "1.6rem", marginBottom: "28px" }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "28px" }}>
              <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
              <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
              <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
            </div>
            <p className={`${playfair.className} italic text-[#5A5D6E] leading-[1.95]`} style={{ fontSize: "1.05rem" }}>
              "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <p className={`${jost.className} uppercase text-[#B8952A]`} style={{ fontSize: "10px", letterSpacing: "5px", margin: "28px 0" }}>
              — QS. Ar-Rum : 21 —
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "28px" }}>
              <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
              <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
              <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
            </div>
            <p className={`${jost.className} text-[#5A5D6E] leading-[1.95]`} style={{ fontSize: "13px" }}>
              Dengan memohon rahmat dan ridha Allah SWT,<br />
              kami mengundang Bapak/Ibu/Saudara/i<br />
              untuk hadir dalam hari bahagia kami.
            </p>
          </div>

          {/* ④ EVENT */}
          <Divider />
          <Event data={data} />

          {/* ⑤ GALLERY */}
          {(data.galleryImages?.length ?? 0) > 0 && (
            <>
              <Divider />
              <Gallery data={data} />
            </>
          )}

          {/* ⑥ GIFT */}
          <Divider />
          <Gift data={data} />

          {/* ⑦ RSVP */}
          <Divider />
          <RSVP invitationId={data.id} guestName={guestName} />

          {/* ⑧ WISHES */}
          <Divider />
          <Wishes invitationId={data.id} />

          {/* ⑨ FOOTER */}
          <Divider />
          <footer style={{ background: "#0A0C12", padding: "80px 44px", textAlign: "center" }}>
            <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, #B8952A)", opacity: 0.5, margin: "0 auto 28px" }} />
            <p className={`${playfair.className} italic text-white`} style={{ fontSize: "1.9rem" }}>
              {data.brideName} &amp; {data.groomName}
            </p>
            <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "10px", letterSpacing: "7px", marginTop: "18px", marginBottom: "28px" }}>
              With Love
            </p>
            <div style={{ width: "1px", height: "56px", background: "linear-gradient(to top, transparent, #B8952A)", opacity: 0.5, margin: "0 auto" }} />
          </footer>
        </div>
      </section>

      <MusicPlayer src={data.musicUrl} />
    </main>
  );
}