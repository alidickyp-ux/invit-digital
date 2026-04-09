"use client";

import { Invitation } from "@prisma/client";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { useEffect, useState, useRef } from "react";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

interface Props {
  data: Invitation;
  guestName: string;
}

function CountdownTimer({ eventDate }: { eventDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(eventDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
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
      {[["days", "Hari"], ["hours", "Jam"], ["minutes", "Menit"], ["seconds", "Detik"]].map(([key, label]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-xl bg-[#E8F0E4] flex items-center justify-center">
            <span className={`${dmSerif.className} text-2xl text-[#2D4A28]`}>
              {String(time[key as keyof typeof time]).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[8px] tracking-[1px] text-[#8AAE7E] uppercase mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function GardenFloral({ data, guestName }: Props) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const formattedDate = new Date(data.eventDate).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const handleOpen = () => {
    setOpened(true);
    if (data.musicUrl && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  if (!opened) {
    return (
      <div className={`${dmSans.className} fixed inset-0 bg-[#F7F4EF] flex flex-col items-center justify-center p-8`}>
        {/* Decorative leaf blobs */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#D9E8D2] opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#D9E8D2] opacity-40 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/3 right-0 w-24 h-24 rounded-full bg-[#F2E4D4] opacity-60 translate-x-1/2" />

        <div className="relative text-center space-y-5 max-w-xs">
          <div className="w-24 h-24 rounded-full bg-[#D9E8D2] border-2 border-[#8AAE7E]/40 mx-auto flex items-center justify-center">
            <span className="text-3xl">🌿</span>
          </div>
          <p className="text-[9px] tracking-[3px] text-[#8AAE7E] uppercase">Undangan Pernikahan</p>
          <h1 className={`${dmSerif.className} text-4xl text-[#2D4A28] leading-tight`}>
            {data.brideName}<br />
            <span className="text-[#C4956A] text-2xl italic">&amp;</span><br />
            {data.groomName}
          </h1>
          <p className="text-xs text-[#8AAE7E]">{formattedDate}</p>
          <div className="space-y-1">
            <p className="text-[9px] tracking-[2px] text-[#8AAE7E] uppercase">Kepada</p>
            <p className={`${dmSerif.className} text-xl italic text-[#2D4A28]`}>{guestName}</p>
          </div>
          <button
            onClick={handleOpen}
            className="mt-2 px-10 py-3 rounded-full bg-[#2D4A28] text-white text-[9px] tracking-[2px] uppercase hover:bg-[#8AAE7E] transition-colors duration-300"
          >
            Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={`${dmSans.className} min-h-screen bg-[#F7F4EF] text-[#3D3D3D] overflow-x-hidden`}>
      {data.musicUrl && <audio ref={audioRef} src={data.musicUrl} loop />}

      <button onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#2D4A28] rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-sm">{playing ? "♪" : "♩"}</span>
      </button>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#D9E8D2] opacity-40 -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D9E8D2] opacity-30 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-[#F2E4D4] opacity-50 translate-x-1/2" />

        <div className="relative z-10 text-center px-6 space-y-5 max-w-xs">
          <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase">The Wedding of</p>

          {/* Circle photo */}
          <div className="w-48 h-48 rounded-full mx-auto border-4 border-white shadow-xl overflow-hidden bg-[#D9E8D2] ring-2 ring-[#8AAE7E]/30">
            {data.heroImage ? (
              <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-4xl">🌸</div>
            )}
          </div>

          <h1 className={`${dmSerif.className} text-[3rem] text-[#2D4A28] leading-tight`}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex-1 h-px bg-[#C4956A] opacity-40" />
            <span className={`${dmSerif.className} text-xl italic text-[#C4956A]`}>&amp;</span>
            <div className="flex-1 h-px bg-[#C4956A] opacity-40" />
          </div>
          <h1 className={`${dmSerif.className} text-[3rem] text-[#2D4A28] leading-tight`}>
            {data.groomName}
          </h1>
          <p className="text-xs text-[#8AAE7E]">{formattedDate}</p>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-14 px-8 text-center max-w-sm mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#8AAE7E] opacity-30" />
          <span className="text-lg">🌿</span>
          <div className="flex-1 h-px bg-[#8AAE7E] opacity-30" />
        </div>
        <p className={`${dmSerif.className} text-lg italic text-[#5A7A55] leading-relaxed`}>
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri."
        </p>
        <p className="text-[8px] tracking-[2px] text-[#8AAE7E] uppercase">— QS. Ar-Rum : 21 —</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#8AAE7E] opacity-30" />
          <span className="text-lg">🌿</span>
          <div className="flex-1 h-px bg-[#8AAE7E] opacity-30" />
        </div>
      </section>

      {/* COUPLE */}
      <section className="py-10 px-6">
        <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase text-center mb-8">Mempelai</p>
        <div className="space-y-6">
          {[
            { name: data.brideName, parents: data.brideParents, photo: data.bridePhoto ?? null, role: "Mempelai Wanita" },
            { name: data.groomName, parents: data.groomParents, photo: data.groomPhoto ?? null, role: "Mempelai Pria" },
          ].map((person, i) => (
            <div key={i}>
              <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-[#D5E8CE]">
                <div className="w-16 h-16 rounded-full bg-[#D9E8D2] border-2 border-[#8AAE7E]/40 flex-shrink-0 overflow-hidden">
                  {person.photo ? (
                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xl">{i === 0 ? "🌸" : "🌿"}</div>
                  )}
                </div>
                <div>
                  <p className="text-[8px] tracking-[2px] text-[#8AAE7E] uppercase">{person.role}</p>
                  <h3 className={`${dmSerif.className} text-xl text-[#2D4A28] mt-0.5`}>{person.name}</h3>
                  {person.parents && (
                    <p className="text-xs text-[#8AAE7E] leading-relaxed mt-1">
                      Putra/i dari <span className="font-medium text-[#5A7A55]">{person.parents}</span>
                    </p>
                  )}
                </div>
              </div>
              {i === 0 && (
                <div className="text-center py-3">
                  <span className={`${dmSerif.className} text-3xl italic text-[#C4956A]`}>&amp;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EVENT */}
      <section className="py-12 px-6 space-y-4">
        <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase text-center mb-6">Detail Acara</p>
        {[
          { icon: "🕌", label: "Akad Nikah", time: data.akadTime, location: data.akadLocation, address: data.akadAddress, maps: data.akadMapsUrl },
          { icon: "🏡", label: "Resepsi", time: data.eventTime, location: data.locationName, address: data.address, maps: data.mapsUrl },
        ].map((event, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#D5E8CE] shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{event.icon}</span>
              <div>
                <p className="font-medium text-[#2D4A28]">{event.label}</p>
                <p className="text-xs text-[#8AAE7E]">{formattedDate} · {event.time ?? "09.00"} WIB</p>
              </div>
            </div>
            {event.location && (
              <div className="pl-9">
                <p className="text-sm font-medium text-[#2D4A28]">{event.location}</p>
                {event.address && <p className="text-xs text-[#8AAE7E] leading-relaxed">{event.address}</p>}
              </div>
            )}
            {event.maps && (
              <a href={event.maps} target="_blank" rel="noopener noreferrer"
                className="ml-9 inline-block text-xs text-[#2D4A28] underline underline-offset-2">
                Buka Google Maps →
              </a>
            )}
          </div>
        ))}
      </section>

      {/* COUNTDOWN */}
      <section className="py-12 px-6 text-center space-y-6">
        <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase">Save The Date</p>
        <CountdownTimer eventDate={data.eventDate} />
      </section>

      {/* RSVP */}
      <RSVPSection invitationId={data.id} guestName={guestName} dmSerifClass={dmSerif.className} dmSansClass={dmSans.className} />

      {/* WISHES */}
      <WishSection invitationId={data.id} dmSerifClass={dmSerif.className} />

      {/* FOOTER */}
      <footer className="py-14 text-center space-y-3 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#D9E8D2] opacity-40 -translate-x-1/2 translate-y-1/2" />
        <p className={`${dmSerif.className} text-2xl italic text-[#2D4A28]`}>
          {data.brideName} &amp; {data.groomName}
        </p>
        <p className="text-[7px] tracking-[3px] text-[#8AAE7E] uppercase">With Love</p>
      </footer>
    </main>
  );
}

function RSVPSection({ invitationId, guestName, dmSerifClass, dmSansClass }: {
  invitationId: string; guestName: string; dmSerifClass: string; dmSansClass: string;
}) {
  const [status, setStatus] = useState("");
  const [pax, setPax] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!status) return;
    setLoading(true);
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitationId, guestName, status, pax: Number(pax), message }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className={`${dmSansClass} py-14 px-6 bg-[#F0F4EC]`}>
      <div className="max-w-sm mx-auto space-y-5">
        <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase text-center">Konfirmasi Kehadiran</p>
        <p className={`${dmSerifClass} text-xl italic text-[#5A7A55] text-center`}>
          Kehadiran Anda adalah kehormatan bagi kami
        </p>
        {submitted ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-[#D5E8CE]">
            <span className="text-3xl">🌿</span>
            <p className={`${dmSerifClass} text-xl italic text-[#2D4A28] mt-2`}>Terima kasih!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 border border-[#D5E8CE] space-y-4">
            <div>
              <label className="text-[8px] tracking-[2px] text-[#8AAE7E] uppercase block mb-2">Kehadiran</label>
              <div className="grid grid-cols-3 gap-2">
                {["Hadir", "Tidak Hadir", "Masih Ragu"].map((s) => (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`py-2 text-xs rounded-lg border transition-all ${status === s ? "bg-[#2D4A28] text-white border-[#2D4A28]" : "border-[#D5E8CE] text-[#5A7A55]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {status === "Hadir" && (
              <div>
                <label className="text-[8px] tracking-[2px] text-[#8AAE7E] uppercase block mb-2">Jumlah Tamu</label>
                <select value={pax} onChange={(e) => setPax(e.target.value)}
                  className="w-full border border-[#D5E8CE] rounded-lg bg-transparent p-2 text-sm text-[#2D4A28]">
                  {["1", "2", "3", "4", "5"].map((n) => <option key={n} value={n}>{n} Pax</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="text-[8px] tracking-[2px] text-[#8AAE7E] uppercase block mb-2">Pesan (opsional)</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-[#D5E8CE] rounded-lg bg-transparent p-2 text-sm text-[#2D4A28] resize-none h-16"
                placeholder="Tuliskan pesan..." />
            </div>
            <button onClick={submit} disabled={loading || !status}
              className="w-full py-3 rounded-xl bg-[#2D4A28] text-white text-xs tracking-wider uppercase disabled:opacity-40">
              {loading ? "Mengirim..." : "Konfirmasi Kehadiran"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function WishSection({ invitationId, dmSerifClass }: { invitationId: string; dmSerifClass: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<{ name: string; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/wish?invitationId=${invitationId}`).then((r) => r.json()).then(setWishes);
  }, [invitationId]);

  const submit = async () => {
    if (!name || !message) return;
    setLoading(true);
    const res = await fetch("/api/wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitationId, name, message }),
    });
    const newWish = await res.json();
    setWishes((prev) => [newWish, ...prev]);
    setName(""); setMessage("");
    setLoading(false);
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-sm mx-auto space-y-5">
        <p className="text-[8px] tracking-[3px] text-[#8AAE7E] uppercase text-center">Ucapan &amp; Doa</p>
        <div className="bg-white rounded-2xl p-5 border border-[#D5E8CE] space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda"
            className="w-full border-b border-[#D5E8CE] pb-2 text-sm text-[#2D4A28] outline-none placeholder:text-[#8AAE7E]/60 bg-transparent" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tuliskan ucapan..."
            className="w-full border-b border-[#D5E8CE] pb-2 text-sm text-[#2D4A28] resize-none h-16 outline-none placeholder:text-[#8AAE7E]/60 bg-transparent" />
          <button onClick={submit} disabled={loading || !name || !message}
            className="w-full py-2.5 rounded-xl bg-[#2D4A28] text-white text-xs tracking-wider uppercase disabled:opacity-40">
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
        <div className="space-y-3">
          {wishes.map((w, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-[#D5E8CE]">
              <p className={`${dmSerifClass} font-medium text-[#2D4A28] flex items-center gap-1`}>
                <span>🌱</span> {w.name}
              </p>
              <p className="text-xs text-[#8AAE7E] leading-relaxed mt-1">{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}