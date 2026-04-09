import { Invitation } from "@prisma/client";
import { Playfair_Display, Jost } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function Couple({ data }: { data: Invitation }) {
  return (
    <section style={{ background: "#0F0F0F" }}>

      {/* ── Header section ── */}
      <div
        className="text-center"
        style={{ padding: "72px 40px 56px" }}
      >
        <p
          className={`${jost.className} uppercase text-[#B8952A]`}
          style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "20px" }}
        >
          Mempelai
        </p>
        <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "20px" }}>
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.5 }} />
          <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.5 }} />
        </div>
        <p className={`${playfair.className} italic text-[#5A5D6E] leading-relaxed`} style={{ fontSize: "1.05rem" }}>
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
        </p>
      </div>

      {/* ── Layout utama: foto kiri + info kanan ── */}
      <div style={{ display: "flex", minHeight: "560px" }}>

        {/* KIRI — dua foto bertumpuk */}
        <div style={{ width: "40%", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          {/* Foto atas (mempelai wanita) */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {data.bridePhoto ? (
              <img
                src={data.bridePhoto}
                alt={data.brideName}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(0.85)" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#1A1D27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#B8952A", fontSize: "2.5rem" }}>♀</span>
              </div>
            )}
            {/* Fade kanan */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, #0F0F0F)" }} />
          </div>

          {/* Garis emas pemisah dua foto */}
          <div style={{ height: "2px", background: "linear-gradient(to right, #B8952A, #E8C96A 50%, #B8952A)", flexShrink: 0 }} />

          {/* Foto bawah (mempelai pria) */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {data.groomPhoto ? (
              <img
                src={data.groomPhoto}
                alt={data.groomName}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(0.85)" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#B8952A", fontSize: "2.5rem" }}>♂</span>
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, #0F0F0F)" }} />
          </div>
        </div>

        {/* Garis vertikal emas */}
        <div style={{
          width: "1px",
          flexShrink: 0,
          background: "linear-gradient(to bottom, transparent, #B8952A 15%, #E8C96A 50%, #B8952A 85%, transparent)",
        }} />

        {/* KANAN — info mempelai */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 28px",
        }}>

          {/* ── Mempelai Wanita ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "32px" }}>
            <p
              className={`${jost.className} uppercase text-[#B8952A]`}
              style={{ fontSize: "9px", letterSpacing: "5px", marginBottom: "16px" }}
            >
              The Bride
            </p>
            <h3
              className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", marginBottom: "14px" }}
            >
              {data.brideName}
            </h3>
            {data.brideParents && (
              <div>
                <p className={`${jost.className}`} style={{ fontSize: "11px", color: "#5A5D6E", lineHeight: 1.7 }}>
                  Putri dari
                </p>
                <p className={`${jost.className}`} style={{ fontSize: "11px", color: "#8A8D9E", lineHeight: 1.7 }}>
                  {data.brideParents}
                </p>
              </div>
            )}
          </div>

          {/* ── Ampersand tengah ── */}
          <div style={{
            textAlign: "center",
            padding: "20px 0",
            borderTop: "1px solid rgba(184,149,42,0.2)",
            borderBottom: "1px solid rgba(184,149,42,0.2)",
          }}>
            <p className={`${playfair.className} italic text-[#B8952A]`} style={{ fontSize: "2.8rem" }}>&amp;</p>
          </div>

          {/* ── Mempelai Pria ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "32px" }}>
            <p
              className={`${jost.className} uppercase text-[#B8952A]`}
              style={{ fontSize: "9px", letterSpacing: "5px", marginBottom: "16px" }}
            >
              The Groom
            </p>
            <h3
              className={`${playfair.className} text-white font-bold uppercase leading-tight`}
              style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", marginBottom: "14px" }}
            >
              {data.groomName}
            </h3>
            {data.groomParents && (
              <div>
                <p className={`${jost.className}`} style={{ fontSize: "11px", color: "#5A5D6E", lineHeight: 1.7 }}>
                  Putra dari
                </p>
                <p className={`${jost.className}`} style={{ fontSize: "11px", color: "#8A8D9E", lineHeight: 1.7 }}>
                  {data.groomParents}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Padding bawah */}
      <div style={{ height: "72px" }} />
    </section>
  );
}