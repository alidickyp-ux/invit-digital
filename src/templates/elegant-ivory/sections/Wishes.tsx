"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["italic", "normal"] });
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
      setName(""); setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid rgba(201,169,110,0.4)",
    background: "rgba(255,255,255,0.8)", padding: "16px",
    fontSize: "14px", color: "#3D3020", outline: "none",
  };

  return (
    <section className={`${jost.className}`} style={{ padding: "80px 40px" }}>

      {/* Header */}
      <div className="text-center" style={{ marginBottom: "56px" }}>
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase" style={{ marginBottom: "20px" }}>Ucapan &amp; Doa</p>
        <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "20px" }}>
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
        </div>
        <p className={`${cormorant.className} text-xl italic text-[#7a6a58]`}>
          Kirimkan doa &amp; ucapan kepada kedua mempelai
        </p>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda" style={inputStyle}
          className="placeholder:text-[#C9A96E]/40" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doa..."
          style={{ ...inputStyle, height: "120px", resize: "none", lineHeight: "1.7" }}
          className="placeholder:text-[#C9A96E]/40" />
        <button onClick={submit} disabled={loading || !name || !message}
          style={{ width: "100%", padding: "16px", background: "#3D3020", color: "#fff", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase" }}
          className="disabled:opacity-30 hover:bg-[#C9A96E] transition-colors">
          {loading ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </div>

      {/* List */}
      {wishes.length > 0 && (
        <div>
          <div style={{ height: "1px", background: "#C9A96E", opacity: 0.15, marginBottom: "32px" }} />
          <p className="text-[11px] tracking-[4px] text-[#9E8A6E] uppercase text-center" style={{ marginBottom: "32px" }}>
            {wishes.length} Ucapan
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {wishes.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "24px 0", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "#EDE6DA", border: "1px solid rgba(201,169,110,0.3)",
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "15px", color: "#C9A96E", fontWeight: 500 }}>{w.name[0]?.toUpperCase()}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className={`${cormorant.className} text-[1.15rem] text-[#1a1a1a]`} style={{ marginBottom: "4px" }}>{w.name}</p>
                  <p className="text-[13px] text-[#9E8A6E] leading-relaxed">{w.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}