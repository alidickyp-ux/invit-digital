"use client";

import { Playfair_Display, Jost } from "next/font/google";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"], style: ["italic", "normal"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function Wishes({ invitationId }: { invitationId: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<{ name: string; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/wish?invitationId=${invitationId}`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setWishes(d));
  }, [invitationId]);

  const submit = async () => {
    if (!name || !message) return;
    setLoading(true);
    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, name, message }),
      });
      const newWish = await res.json();
      setWishes((prev) => [newWish, ...prev]);
      setName("");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    background: "#1A1D27", border: "1px solid rgba(184,149,42,0.18)",
    color: "#E8E6E0", fontSize: "13px", outline: "none",
    fontFamily: "inherit",
  };

  return (
    <section style={{ background: "#111318", padding: "96px 40px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p className={`${jost.className} uppercase text-[#B8952A]`} style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "22px" }}>
          Ucapan &amp; Doa
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "22px" }}>
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
          <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
        </div>
        <p className={`${playfair.className} italic text-[#5A5D6E]`} style={{ fontSize: "1.1rem" }}>
          Kirimkan doa &amp; ucapan kepada kedua mempelai
        </p>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "56px" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda"
          style={inputStyle} className="placeholder:text-[#2A2D38]" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doa..."
          style={{ ...inputStyle, height: "110px", resize: "none", lineHeight: 1.7 }}
          className="placeholder:text-[#2A2D38]" />
        <button onClick={submit} disabled={loading || !name || !message}
          style={{
            width: "100%", padding: "15px",
            background: "#B8952A", color: "#0F0F0F",
            fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase",
            fontFamily: "inherit", fontWeight: 600, cursor: "pointer", border: "none",
            opacity: (loading || !name || !message) ? 0.4 : 1,
          }}>
          {loading ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </div>

      {/* List ucapan */}
      {wishes.length > 0 && (
        <div>
          <div style={{ height: "1px", background: "rgba(184,149,42,0.12)", marginBottom: "36px" }} />
          <p className={`${jost.className} uppercase text-[#5A5D6E] text-center`} style={{ fontSize: "10px", letterSpacing: "5px", marginBottom: "36px" }}>
            {wishes.length} Ucapan
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {wishes.map((w, i) => (
              <div key={i} style={{
                display: "flex", gap: "18px", alignItems: "flex-start",
                padding: "28px 0",
                borderBottom: "1px solid rgba(184,149,42,0.08)",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                  background: "#1A1D27", border: "1px solid rgba(184,149,42,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "15px", color: "#B8952A", fontWeight: 500 }}>
                    {w.name[0]?.toUpperCase()}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className={`${playfair.className} text-[#E8E6E0]`} style={{ fontSize: "1.05rem", marginBottom: "6px" }}>
                    {w.name}
                  </p>
                  <p className={`${jost.className} text-[#5A5D6E] leading-relaxed`} style={{ fontSize: "13px" }}>
                    {w.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}