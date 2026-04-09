"use client";

import { Invitation } from "@prisma/client";
import { Playfair_Display, Jost } from "next/font/google";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

function Countdown({ eventDate }: { eventDate: Date }) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(eventDate).getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {[
        { v: t.days, l: "Hari" },
        { v: t.hours, l: "Jam" },
        { v: t.minutes, l: "Menit" },
        { v: t.seconds, l: "Detik" },
      ].map(({ v, l }) => (
        <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "64px", height: "64px",
            background: "#1A1D27",
            border: "1px solid rgba(184,149,42,0.35)",
            borderTop: "2px solid #B8952A",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className={`${playfair.className} text-white`} style={{ fontSize: "1.9rem", fontWeight: 400 }}>
              {String(v).padStart(2, "0")}
            </span>
          </div>
          <span className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "9px", letterSpacing: "3px" }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
      <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
      <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
      <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
    </div>
  );
}

function EventCard({ title, date, time, location, address, mapsUrl }: {
  title: string; date: string; time?: string | null;
  location?: string | null; address?: string | null; mapsUrl?: string | null;
}) {
  return (
    <div style={{
      background: "#1A1D27",
      border: "1px solid rgba(184,149,42,0.18)",
      padding: "44px 32px",
      textAlign: "center",
      position: "relative",
    }}>
      {/* Gold top line */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: "linear-gradient(to right, transparent, #B8952A, transparent)" }} />
      {/* Corner accents */}
      {[["top-3 left-3","borderTop","borderLeft"],["top-3 right-3","borderTop","borderRight"],["bottom-3 left-3","borderBottom","borderLeft"],["bottom-3 right-3","borderBottom","borderRight"]].map(([cls, b1, b2]) => (
        <div key={cls} className={`absolute ${cls} w-4 h-4`} style={{ [b1]: "1px solid rgba(184,149,42,0.5)", [b2]: "1px solid rgba(184,149,42,0.5)" } as React.CSSProperties} />
      ))}

      <p className={`${jost.className} uppercase text-[#B8952A]`} style={{ fontSize: "9px", letterSpacing: "6px", marginBottom: "18px" }}>
        {title}
      </p>
      <div style={{ height: "1px", width: "28px", background: "#B8952A", opacity: 0.4, margin: "0 auto 24px" }} />
      <p className={`${jost.className} text-white`} style={{ fontSize: "15px", fontWeight: 500, marginBottom: "6px" }}>{date}</p>
      {time && (
        <p className={`${jost.className} text-[#5A5D6E]`} style={{ fontSize: "12px", marginBottom: "24px" }}>
          Pukul {time} WIB — Selesai
        </p>
      )}
      {location && (
        <p className={`${playfair.className} italic text-[#E8E6E0]`} style={{ fontSize: "1.5rem", marginBottom: "10px", marginTop: "16px" }}>
          {location}
        </p>
      )}
      {address && (
        <p className={`${jost.className} text-[#5A5D6E] italic leading-relaxed`} style={{ fontSize: "12px", marginBottom: "28px" }}>
          {address}
        </p>
      )}
      {mapsUrl && (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          padding: "11px 32px",
          background: "#B8952A",
          color: "#0F0F0F",
          fontSize: "9px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          fontWeight: 600,
          textDecoration: "none",
        }}>
          Buka Maps
        </a>
      )}
    </div>
  );
}

export default function Event({ data }: { data: Invitation }) {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const akadFormatted = data.akadDate
    ? new Date(data.akadDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : formattedDate;

  return (
    <section style={{ background: "#0F0F0F", padding: "96px 40px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "72px" }}>
        <p className={`${jost.className} uppercase text-[#B8952A]`} style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "22px" }}>
          Waktu &amp; Tempat
        </p>
        <GoldDivider />
        <p className={`${playfair.className} italic text-[#5A5D6E] leading-relaxed`} style={{ fontSize: "1.1rem", marginTop: "22px" }}>
          Merupakan suatu kehormatan apabila<br />Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      {/* Countdown */}
      <div style={{ textAlign: "center", marginBottom: "72px" }}>
        <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "36px" }}>
          Save The Date
        </p>
        <Countdown eventDate={data.eventDate} />
        <a
          href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Pernikahan " + data.brideName + " & " + data.groomName)}&dates=${new Date(data.eventDate).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`}
          target="_blank" rel="noopener noreferrer"
          className={`${jost.className} text-[#5A5D6E] underline underline-offset-4`}
          style={{ display: "inline-block", marginTop: "28px", fontSize: "11px", letterSpacing: "2px" }}
        >
          + Simpan di Google Kalender
        </a>
      </div>

      {/* Event cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {data.akadLocation && (
          <EventCard
            title="Akad Nikah"
            date={akadFormatted}
            time={data.akadTime}
            location={data.akadLocation}
            address={data.akadAddress}
            mapsUrl={data.akadMapsUrl}
          />
        )}
        <EventCard
          title="Resepsi"
          date={formattedDate}
          time={data.eventTime}
          location={data.locationName}
          address={data.address}
          mapsUrl={data.mapsUrl}
        />
      </div>
    </section>
  );
}