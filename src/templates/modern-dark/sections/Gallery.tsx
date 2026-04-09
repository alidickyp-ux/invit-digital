"use client";

import { Playfair_Display, Jost } from "next/font/google";
import { useState, useEffect, useCallback } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
}

function Lightbox({ images, index: initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  const getPrev = () => (current - 1 + images.length) % images.length;
  const getNext = () => (current + 1) % images.length;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      {/* Tombol close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "20px", right: "24px",
          background: "transparent", border: "1px solid rgba(184,149,42,0.4)",
          color: "#B8952A", width: "40px", height: "40px",
          fontSize: "18px", cursor: "pointer", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "inherit",
        }}
      >
        ✕
      </button>

      {/* Counter */}
      <p
        className={`${jost.className}`}
        style={{
          position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "4px",
          zIndex: 10,
        }}
      >
        {current + 1} / {images.length}
      </p>

      {/* Carousel dengan foto spill */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", gap: "16px", padding: "0 48px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Foto sebelumnya — spill blur */}
        <div
          style={{
            width: "80px", flexShrink: 0,
            aspectRatio: "3/4",
            overflow: "hidden", borderRadius: "4px",
            opacity: 0.4, filter: "blur(3px)",
            cursor: "pointer", transition: "opacity 0.3s",
          }}
          onClick={prev}
        >
          <img src={images[getPrev()]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Foto utama */}
        <div style={{
          flex: 1, maxWidth: "360px",
          position: "relative",
          borderRadius: "4px", overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          border: "1px solid rgba(184,149,42,0.2)",
        }}>
          <img
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            style={{
              width: "100%", height: "auto",
              maxHeight: "65vh", objectFit: "cover",
              display: "block",
            }}
          />
          {/* Gold border overlay */}
          <div style={{ position: "absolute", inset: "6px", border: "1px solid rgba(184,149,42,0.15)", pointerEvents: "none" }} />
        </div>

        {/* Foto sesudahnya — spill blur */}
        <div
          style={{
            width: "80px", flexShrink: 0,
            aspectRatio: "3/4",
            overflow: "hidden", borderRadius: "4px",
            opacity: 0.4, filter: "blur(3px)",
            cursor: "pointer", transition: "opacity 0.3s",
          }}
          onClick={next}
        >
          <img src={images[getNext()]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      {/* Tombol navigasi kiri kanan */}
      <div
        style={{
          position: "absolute", bottom: "80px",
          display: "flex", gap: "16px", alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          style={{
            width: "44px", height: "44px",
            background: "rgba(184,149,42,0.12)",
            border: "1px solid rgba(184,149,42,0.35)",
            color: "#B8952A", fontSize: "18px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.12)"; }}
        >
          ←
        </button>

        {/* Bubble dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "#B8952A" : "rgba(184,149,42,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            width: "44px", height: "44px",
            background: "rgba(184,149,42,0.12)",
            border: "1px solid rgba(184,149,42,0.35)",
            color: "#B8952A", fontSize: "18px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.12)"; }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function Gallery({ data }: { data: any }) {
  const images: string[] = data.galleryImages || [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <section style={{ background: "#111318", padding: "96px 40px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            className={`${jost.className} uppercase text-[#B8952A]`}
            style={{ fontSize: "10px", letterSpacing: "7px", marginBottom: "20px" }}
          >
            Our Gallery
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
            <div style={{ width: "6px", height: "6px", background: "#B8952A", transform: "rotate(45deg)" }} />
            <div style={{ height: "1px", width: "48px", background: "#B8952A", opacity: 0.45 }} />
          </div>
          <p className={`${playfair.className} italic text-[#5A5D6E]`} style={{ fontSize: "1.05rem" }}>
            Every love story is beautiful, but ours is my favorite
          </p>
        </div>

        {/* Grid foto — klik untuk buka lightbox */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              style={{
                gridColumn: i % 3 === 0 ? "1 / -1" : "auto",
                aspectRatio: i % 3 === 0 ? "16/9" : "1/1",
                overflow: "hidden",
                background: "#1A1D27",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "grayscale(20%)",
                  transition: "filter 0.6s ease, transform 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(20%)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(184,149,42,0)",
                transition: "background 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0)"; }}
              >
                <span style={{ color: "rgba(255,255,255,0)", fontSize: "22px", transition: "color 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0)"; }}
                >
                  ⊕
                </span>
              </div>
              {/* Gold inner border */}
              <div style={{ position: "absolute", inset: "4px", border: "1px solid rgba(184,149,42,0.1)", pointerEvents: "none" }} />
            </div>
          ))}
        </div>

        {/* Hint klik */}
        <p
          className={`${jost.className} text-[#3A3D4E] text-center`}
          style={{ fontSize: "10px", letterSpacing: "3px", marginTop: "20px", textTransform: "uppercase" }}
        >
          Tap foto untuk memperbesar
        </p>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}