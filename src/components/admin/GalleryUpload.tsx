"use client";

import { useRef, useState } from "react";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  folder?: string;
}

export default function GalleryUpload({ value = [], onChange, max = 8, folder = "invitations/gallery" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url || null;
  };

  const handleFiles = async (files: FileList) => {
    const remaining = max - value.length;
    if (remaining <= 0) { setError(`Maksimal ${max} foto`); return; }

    const filesToUpload = Array.from(files).slice(0, remaining);
    setLoading(true);
    setError("");

    try {
      const urls = await Promise.all(filesToUpload.map(uploadFile));
      const valid = urls.filter(Boolean) as string[];
      onChange([...value, ...valid]);
    } catch {
      setError("Beberapa foto gagal diupload");
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const movePhoto = (from: number, to: number) => {
    const arr = [...value];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    onChange(arr);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] tracking-[2px] text-[#9E8A6E] uppercase">
          Foto Gallery ({value.length}/{max})
        </label>
        {value.length < max && (
          <button type="button" onClick={() => inputRef.current?.click()}
            className="text-[10px] tracking-widest text-[#C9A96E] uppercase border border-[#C9A96E]/40 px-3 py-1.5 hover:bg-[#C9A96E] hover:text-white transition-colors">
            + Tambah Foto
          </button>
        )}
      </div>

      {/* Grid foto */}
      <div className="grid grid-cols-4 gap-2">
        {value.map((url, i) => (
          <div key={url} className="relative group aspect-square bg-[#EDE6DA] rounded overflow-hidden">
            <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
              {/* Hapus */}
              <button type="button" onClick={() => removePhoto(i)}
                className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                ✕
              </button>
              {/* Pindah kiri */}
              <div className="flex gap-1 mt-1">
                {i > 0 && (
                  <button type="button" onClick={() => movePhoto(i, i - 1)}
                    className="w-5 h-5 rounded bg-white/30 text-white text-[10px] flex items-center justify-center">
                    ←
                  </button>
                )}
                {i < value.length - 1 && (
                  <button type="button" onClick={() => movePhoto(i, i + 1)}
                    className="w-5 h-5 rounded bg-white/30 text-white text-[10px] flex items-center justify-center">
                    →
                  </button>
                )}
              </div>
            </div>

            {/* Nomor urut */}
            <div className="absolute top-1 left-1 w-4 h-4 bg-black/40 rounded-full flex items-center justify-center">
              <span className="text-white text-[9px]">{i + 1}</span>
            </div>
          </div>
        ))}

        {/* Slot kosong */}
        {value.length < max && (
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-[#C9A96E]/30 rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#C9A96E] transition-colors bg-[#FDFBF7]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-[#C9A96E]/50 text-xl">+</span>
                <span className="text-[9px] text-[#C9A96E]/50">Upload</span>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
      <p className="text-[10px] text-[#9E8A6E]">
        Foto pertama tampil besar (landscape), sisanya kotak. Hover foto untuk hapus atau ubah urutan.
      </p>

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
    </div>
  );
}