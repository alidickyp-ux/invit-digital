"use client";

import { Invitation } from "@prisma/client";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { useEffect, useState } from "react";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"] });
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
    <div className="flex gap-3 justify-center">
      {[{ v: t.days, l: "Hari" }, { v: t.hours, l: "Jam" }, { v: t.minutes, l: "Menit" }, { v: t.seconds, l: "Detik" }].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-2">
          {/* Kotak besar seperti di contoh */}
          <div style={{
            width: "68px", height: "68px",
            border: "1px solid rgba(201,169,110,0.5)",
            background: "rgba(255,255,255,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className={`${cormorant.className} text-[2.2rem] font-light text-[#1a1a1a]`}>
              {String(v).padStart(2, "0")}
            </span>
          </div>
          <span className={`${jost.className} text-[10px] tracking-[3px] text-[#9E8A6E] uppercase`}>{l}</span>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 justify-center">
      <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
      <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
    </div>
  );
}

function EventCard({ title, date, time, location, address, mapsUrl }: {
  title: string; date: string; time?: string | null;
  location?: string | null; address?: string | null; mapsUrl?: string | null;
}) {
  return (
    <div className="relative text-center" style={{
      background: "rgba(255,255,255,0.65)",
      border: "1px solid rgba(201,169,110,0.3)",
      padding: "40px 32px",
    }}>
      {/* Corner accents */}
      {["top-3 left-3 border-t border-l","top-3 right-3 border-t border-r","bottom-3 left-3 border-b border-l","bottom-3 right-3 border-b border-r"].map((cls) => (
        <div key={cls} className={`absolute w-4 h-4 border-[#C9A96E]/50 ${cls}`} />
      ))}

      <p className={`${jost.className} text-[10px] tracking-[5px] text-[#9E8A6E] uppercase`} style={{ marginBottom: "16px" }}>{title}</p>
      <div style={{ height: "1px", width: "32px", background: "#C9A96E", opacity: 0.4, margin: "0 auto 24px" }} />
      <p className={`${jost.className} text-[16px] text-[#1a1a1a] font-medium`} style={{ marginBottom: "6px" }}>{date}</p>
      {time && <p className={`${jost.className} text-[13px] text-[#9E8A6E]`} style={{ marginBottom: "20px" }}>Pukul {time} WIB — Selesai</p>}
      {location && <p className={`${cormorant.className} text-[1.8rem] text-[#1a1a1a]`} style={{ marginBottom: "8px", marginTop: "8px" }}>{location}</p>}
      {address && <p className={`${jost.className} text-[13px] text-[#9E8A6E] italic leading-relaxed`} style={{ marginBottom: "20px" }}>{address}</p>}
      {mapsUrl && (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-[#3D3020] text-white text-[10px] tracking-[4px] uppercase hover:bg-[#C9A96E] transition-colors">
          Google Maps
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
    <section className={`${jost.className}`} style={{ padding: "80px 40px" }}>

      {/* Header waktu & tempat */}
      <div className="text-center" style={{ marginBottom: "64px" }}>
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase" style={{ marginBottom: "20px" }}>Waktu &amp; Tempat</p>
        <Divider />
        <p className={`${cormorant.className} text-xl italic text-[#7a6a58] leading-relaxed`} style={{ marginTop: "20px" }}>
          Merupakan suatu kehormatan apabila<br />Bapak/Ibu/Saudara/i berkenan hadir
        </p>
      </div>

      {/* Save the date */}
      <div className="text-center" style={{ marginBottom: "64px" }}>
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase" style={{ marginBottom: "32px" }}>Save The Date</p>
        <Countdown eventDate={data.eventDate} />
        <a href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Pernikahan " + data.brideName + " & " + data.groomName)}&dates=${new Date(data.eventDate).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`}
          target="_blank" rel="noopener noreferrer"
          className="inline-block text-[12px] tracking-[2px] text-[#9E8A6E] underline underline-offset-4"
          style={{ marginTop: "24px" }}>
          + Simpan di Google Kalender
        </a>
      </div>

      {/* Event cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {data.akadLocation && (
          <EventCard title="Akad Nikah" date={akadFormatted} time={data.akadTime}
            location={data.akadLocation} address={data.akadAddress} mapsUrl={data.akadMapsUrl} />
        )}
        <EventCard title="Resepsi" date={formattedDate} time={data.eventTime}
          location={data.locationName} address={data.address} mapsUrl={data.mapsUrl} />
      </div>
    </section>
  );
}