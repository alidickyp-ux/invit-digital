import { Invitation } from "@prisma/client";
import { Playfair_Display, Jost } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Ornamen bunga SVG — persis seperti referensi
function FlowerOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C130 30 160 20 180 50 C160 40 140 55 100 40 C60 55 40 40 20 50 C40 20 70 30 100 10Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.7"/>
      <path d="M100 10 C120 50 150 70 170 100 C140 80 110 90 100 60 C90 90 60 80 30 100 C50 70 80 50 100 10Z" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="100" cy="80" r="25" stroke="white" strokeWidth="0.7" fill="none" opacity="0.5"/>
      <path d="M75 55 Q100 40 125 55 Q140 80 125 105 Q100 120 75 105 Q60 80 75 55Z" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4"/>
      <path d="M100 30 L100 130" stroke="white" strokeWidth="0.4" opacity="0.3"/>
      <path d="M40 80 L160 80" stroke="white" strokeWidth="0.4" opacity="0.3"/>
      <circle cx="100" cy="80" r="5" stroke="white" strokeWidth="0.6" fill="none" opacity="0.6"/>
      <path d="M60 40 C50 60 55 80 60 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.4"/>
      <path d="M140 40 C150 60 145 80 140 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.4"/>
    </svg>
  );
}

export default function Hero({ data }: { data: Invitation }) {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section
      className="relative flex overflow-hidden"
      style={{ background: "#0F0F0F", minHeight: "100vh" }}
    >
      {/* ── KOLOM KIRI: Dua foto bertumpuk ── */}
      <div className="w-[38%] flex-shrink-0 flex flex-col" style={{ minHeight: "100vh" }}>
        {/* Foto atas */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: "50vh" }}>
          {data.bridePhoto ? (
            <img
              src={data.bridePhoto}
              alt={data.brideName}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88)" }}
            />
          ) : data.heroImage ? (
            <img
              src={data.heroImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88)" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#1a1a1a" }}>
              <span style={{ color: "#B8952A", fontSize: "2rem" }}>♀</span>
            </div>
          )}
          {/* Gradient kanan menyatu dengan panel */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 60%, #0F0F0F)" }}
          />
        </div>

        {/* Garis pemisah emas */}
        <div style={{ height: "2px", background: "linear-gradient(to right, #B8952A, #E8C96A, #B8952A)", flexShrink: 0 }} />

        {/* Foto bawah */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: "50vh" }}>
          {data.groomPhoto ? (
            <img
              src={data.groomPhoto}
              alt={data.groomName}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88)" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#111111" }}>
              <span style={{ color: "#B8952A", fontSize: "2rem" }}>♂</span>
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 60%, #0F0F0F)" }}
          />
        </div>
      </div>

      {/* ── KOLOM KANAN: Teks undangan ── */}
      <div
        className="flex-1 flex flex-col justify-center relative"
        style={{ padding: "48px 28px 48px 20px" }}
      >
        {/* Ornamen bunga pojok kanan atas */}
        <FlowerOrnament
          className="absolute top-0 right-0 opacity-20"
          style={{ width: "130px", height: "130px" } as React.CSSProperties}
        />
        {/* Ornamen bunga pojok kiri bawah */}
        <FlowerOrnament
          className="absolute bottom-0 left-0 opacity-15 rotate-180"
          style={{ width: "100px", height: "100px" } as React.CSSProperties}
        />

        <div className="relative z-10 space-y-6">
          {/* Label atas */}
          <div className="space-y-2">
            <p
              className={`${jost.className} uppercase text-white`}
              style={{ fontSize: "11px", letterSpacing: "5px", fontWeight: 400 }}
            >
              Undangan Pernikahan
            </p>
            {/* Garis ornamen emas */}
            <div className="flex items-center gap-2">
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #B8952A, transparent)" }} />
              <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, #B8952A, transparent)" }} />
            </div>
          </div>

          {/* Nama mempelai — besar & bold uppercase */}
          <div className="space-y-1">
            <h1
              className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", letterSpacing: "1px" }}
            >
              {data.brideName}
            </h1>
            <p
              className={`${jost.className} text-white uppercase`}
              style={{ fontSize: "11px", letterSpacing: "4px", opacity: 0.7 }}
            >
              Dan
            </p>
            <h1
              className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", letterSpacing: "1px" }}
            >
              {data.groomName}
            </h1>
          </div>

          {/* Garis pemisah */}
          <div style={{ height: "1px", background: "rgba(184,149,42,0.3)" }} />

          {/* Info acara */}
          <div className="space-y-3">
            <p
              className={`${jost.className} text-white uppercase`}
              style={{ fontSize: "10px", letterSpacing: "3px", opacity: 0.6 }}
            >
              Akan Dilaksanakan Pada Tanggal :
            </p>
            <div className="space-y-1">
              <p
                className={`${playfair.className} text-white font-bold uppercase`}
                style={{ fontSize: "1.3rem", letterSpacing: "2px" }}
              >
                {new Date(data.eventDate).toLocaleDateString("id-ID", { weekday: "long" }).toUpperCase()}
              </p>
              <p
                className={`${jost.className} text-white`}
                style={{ fontSize: "13px", letterSpacing: "1px", opacity: 0.9 }}
              >
                {new Date(data.eventDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}
              </p>
              <p
                className={`${jost.className}`}
                style={{ fontSize: "12px", letterSpacing: "1px", color: "rgba(255,255,255,0.6)" }}
              >
                PUKUL {data.eventTime ?? "11.00"} WIB - SELESAI
              </p>
            </div>
            <div style={{ height: "1px", background: "rgba(184,149,42,0.2)" }} />
            <div className="space-y-1">
              <p
                className={`${playfair.className} text-white font-bold uppercase`}
                style={{ fontSize: "1.2rem", letterSpacing: "1px" }}
              >
                {data.locationName?.toUpperCase()}
              </p>
              <p
                className={`${jost.className}`}
                style={{ fontSize: "11px", letterSpacing: "1px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}
              >
                {data.address?.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}