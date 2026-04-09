"use client";

import { useState } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

export default function RSVP({ invitationId, guestName }: { invitationId: string; guestName: string }) {
  const [status, setStatus] = useState("");
  const [pax, setPax] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!status) return;
    setLoading(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, guestName, status, pax: Number(pax), message }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const btnBase = "py-4 text-[12px] border transition-all duration-300 tracking-wider";
  const btnActive = "bg-[#3D3020] text-white border-[#3D3020]";
  const btnIdle = "bg-white border-[#C9A96E]/40 text-[#5a4a3a] hover:border-[#C9A96E]";

  return (
    <section className={`${jost.className}`} style={{ padding: "80px 40px" }}>

      {/* Header */}
      <div className="text-center" style={{ marginBottom: "56px" }}>
        <p className="text-[11px] tracking-[6px] text-[#9E8A6E] uppercase" style={{ marginBottom: "20px" }}>Konfirmasi Kehadiran</p>
        <div className="flex items-center gap-4 justify-center" style={{ marginBottom: "20px" }}>
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E] opacity-55" />
          <div className="h-px w-12 bg-[#C9A96E] opacity-35" />
        </div>
        <p className={`${cormorant.className} text-xl italic text-[#7a6a58]`}>
          Kehadiran Anda adalah kehormatan bagi kami
        </p>
        <p className="text-[14px] text-[#9E8A6E] leading-relaxed" style={{ marginTop: "12px" }}>
          Mohon konfirmasi kehadiran melalui formulir di bawah ini.
        </p>
      </div>

      {submitted ? (
        <div className="text-center" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          <p className={`${cormorant.className} text-4xl italic text-[#C9A96E]`}>Terima Kasih ✦</p>
          <p className="text-[13px] text-[#9E8A6E] uppercase tracking-widest" style={{ marginTop: "12px" }}>
            Konfirmasi Anda telah tersimpan
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Status kehadiran */}
          <div>
            <label className="text-[11px] tracking-[3px] text-[#9E8A6E] uppercase block" style={{ marginBottom: "12px" }}>
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Hadir", "Tidak Hadir", "Masih Ragu"].map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`${btnBase} ${status === s ? btnActive : btnIdle}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pilih pax */}
          {status === "Hadir" && (
            <div>
              <label className="text-[11px] tracking-[3px] text-[#9E8A6E] uppercase block" style={{ marginBottom: "12px" }}>
                Hadir di acara — Jumlah Tamu
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["1 Pax", "2 Pax", "3 Pax"].map((p) => (
                  <button key={p} onClick={() => setPax(p[0])}
                    className={`${btnBase} ${pax === p[0] ? btnActive : btnIdle}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ucapan */}
          <div>
            <label className="text-[11px] tracking-[3px] text-[#9E8A6E] uppercase block" style={{ marginBottom: "12px" }}>
              Ucapan
            </label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan atau pesan singkat..."
              style={{
                width: "100%", border: "1px solid rgba(201,169,110,0.4)",
                background: "rgba(255,255,255,0.8)", padding: "16px",
                fontSize: "14px", color: "#3D3020", resize: "none",
                height: "120px", outline: "none", lineHeight: "1.7",
              }}
              className="placeholder:text-[#C9A96E]/40" />
          </div>

          <button onClick={submit} disabled={loading || !status}
            style={{ width: "100%", padding: "16px", background: "#3D3020", color: "#fff", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase" }}
            className="disabled:opacity-30 hover:bg-[#C9A96E] transition-all">
            {loading ? "Mengirim..." : "Konfirmasi"}
          </button>
        </div>
      )}
    </section>
  );
}