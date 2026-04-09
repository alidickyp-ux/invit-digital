"use client";

import { Playfair_Display, Jost } from "next/font/google";
import { useState } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

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

  const choiceStyle = (val: string, cur: string): React.CSSProperties => ({
    flex: 1, padding: "14px 6px",
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    cursor: "pointer", fontFamily: "inherit",
    background: cur === val ? "#B8952A" : "#1A1D27",
    color: cur === val ? "#0F0F0F" : "#5A5D6E",
    border: cur === val ? "1px solid #B8952A" : "1px solid rgba(184,149,42,0.18)",
    transition: "all 0.25s",
  });

  return (
    <section style={{ background: "#0F0F0F", padding: "96px 40px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p className={`${jost.className} uppercase text-[#B8952A]`} style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "22px" }}>
          Konfirmasi Kehadiran
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "22px" }}>
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
          <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
          <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
        </div>
        <p className={`${playfair.className} italic text-[#5A5D6E]`} style={{ fontSize: "1.1rem" }}>
          Kehadiran Anda adalah kehormatan bagi kami
        </p>
        <p className={`${jost.className} text-[#5A5D6E] leading-relaxed`} style={{ fontSize: "13px", marginTop: "12px" }}>
          Mohon konfirmasi kehadiran melalui formulir berikut
        </p>
      </div>

      {submitted ? (
        <div style={{ textAlign: "center", padding: "56px 0" }}>
          <p className={`${playfair.className} italic text-[#B8952A]`} style={{ fontSize: "2.5rem" }}>Terima Kasih ✦</p>
          <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "11px", letterSpacing: "5px", marginTop: "14px" }}>
            Konfirmasi Anda telah tersimpan
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

          <div>
            <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "10px", letterSpacing: "4px", marginBottom: "14px" }}>
              Konfirmasi Kehadiran
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["Hadir", "Tidak Hadir", "Masih Ragu"].map((s) => (
                <button key={s} onClick={() => setStatus(s)} style={choiceStyle(s, status)}>{s}</button>
              ))}
            </div>
          </div>

          {status === "Hadir" && (
            <div>
              <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "10px", letterSpacing: "4px", marginBottom: "14px" }}>
                Jumlah Tamu
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {["1 Pax", "2 Pax", "3 Pax"].map((p) => (
                  <button key={p} onClick={() => setPax(p[0])} style={choiceStyle(p[0], pax)}>{p}</button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className={`${jost.className} uppercase text-[#5A5D6E]`} style={{ fontSize: "10px", letterSpacing: "4px", marginBottom: "14px" }}>
              Ucapan
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan atau pesan singkat..."
              style={{
                width: "100%", padding: "14px 16px", height: "110px",
                background: "#1A1D27", border: "1px solid rgba(184,149,42,0.18)",
                color: "#E8E6E0", fontSize: "13px", outline: "none", resize: "none",
                fontFamily: "inherit", lineHeight: 1.7,
              }}
              className="placeholder:text-[#2A2D38]"
            />
          </div>

          <button
            onClick={submit}
            disabled={loading || !status}
            style={{
              width: "100%", padding: "16px",
              background: "#B8952A", color: "#0F0F0F",
              fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase",
              fontFamily: "inherit", fontWeight: 600, cursor: "pointer", border: "none",
              opacity: (loading || !status) ? 0.4 : 1,
            }}
          >
            {loading ? "Mengirim..." : "Konfirmasi"}
          </button>
        </div>
      )}
    </section>
  );
}