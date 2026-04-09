"use client";

import { useRef, useState } from "react";

interface Props {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export default function ImageUpload({ label, value, onChange, folder = "invitations", aspectRatio = "square" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-video",
  }[aspectRatio];

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("File harus berupa gambar"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Maksimal 10MB"); return; }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError("Upload gagal");
    } catch {
      setError("Upload gagal, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[11px] tracking-[2px] text-[#9E8A6E] uppercase block">{label}</label>

      <div
        className={`${aspectClass} relative border-2 border-dashed border-[#C9A96E]/40 rounded-lg overflow-hidden bg-[#FDFBF7] cursor-pointer hover:border-[#C9A96E] transition-colors group`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            {/* Overlay saat hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs tracking-widest uppercase">Ganti Foto</p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#C9A96E]/60">
            {loading ? (
              <div className="w-6 h-6 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <span className="text-[11px] text-center leading-relaxed px-3">
                  Klik atau drag foto<br />JPG, PNG, WebP
                </span>
              </>
            )}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}