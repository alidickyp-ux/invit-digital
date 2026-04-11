"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

interface FormData {
  slug: string;
  templateId: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  bridePhoto: string;
  groomPhoto: string;
  heroImage: string;
  akadDate: string;
  akadTime: string;
  akadLocation: string;
  akadAddress: string;
  akadMapsUrl: string;
  eventDate: string;
  eventTime: string;
  locationName: string;
  address: string;
  mapsUrl: string;
  musicUrl: string;
  galleryImages: string[];
  giftBank1: string;
  giftAccNo1: string;
  giftAccName1: string;
  giftBank2: string;
  giftAccNo2: string;
  giftAccName2: string;
  isPaid: boolean;
  isPublished: boolean;
}

interface Props {
  initialData?: Partial<FormData> & { id?: string };
  mode: "create" | "edit";
}

const TEMPLATES = [
  { value: "elegant-ivory", label: "Elegant Ivory — White & Gold" },
  { value: "modern-dark", label: "Modern Dark — Black & White" },
];

// TEMA CLEAN LIGHT BLUE (Request Ali)
const inputClass = "w-full border border-zinc-200 bg-white p-3 text-[0.85rem] text-black font-bold outline-none focus:border-blue-300 focus:bg-blue-50/20 transition-all placeholder:text-zinc-600 placeholder:font-normal rounded-sm shadow-sm";
const labelClass = "text-[11px] tracking-[2px] text-zinc-700 uppercase block mb-2 font-medium";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-zinc-100 p-6 space-y-6 rounded-md shadow-sm">
      <div className="pb-3 border-b border-zinc-100">
        <h2 className="text-[12px] font-bold text-blue-900 tracking-[3px] uppercase">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function InvitationForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    slug: "", templateId: "elegant-ivory",
    brideName: "", groomName: "",
    brideParents: "", groomParents: "",
    bridePhoto: "", groomPhoto: "", heroImage: "",
    akadDate: "", akadTime: "08:00",
    akadLocation: "", akadAddress: "", akadMapsUrl: "",
    eventDate: "", eventTime: "11:00",
    locationName: "", address: "", mapsUrl: "",
    musicUrl: "", galleryImages: [],
    giftBank1: "", giftAccNo1: "", giftAccName1: "",
    giftBank2: "", giftAccNo2: "", giftAccName2: "",
    isPaid: false, isPublished: false,
    ...initialData,
  });

  const set = (key: keyof FormData, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    if (!form.slug || !form.brideName || !form.groomName || !form.eventDate) {
      setError("Wajib diisi: Slug, Nama Mempelai, dan Tanggal Resepsi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        eventDate: form.eventDate ? new Date(form.eventDate).toISOString() : undefined,
        akadDate: form.akadDate ? new Date(form.akadDate).toISOString() : null,
      };

      const url = mode === "create" ? "/api/admin/invitation" : `/api/admin/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal sinkronisasi data");

      router.refresh();
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${lexend.className} min-h-screen bg-blue-50 space-y-8 pb-20 p-6 rounded-xl border border-zinc-100`}>
      
      {/* ── Header Form ── */}
      <div className="pb-4 border-b border-zinc-100">
        <h1 className="text-2xl font-bold tracking-tight text-blue-950">
          {mode === "create" ? "Initialize Digital Asset" : "Modify Invitation Detail"}
        </h1>
        <p className="text-[0.8rem] uppercase tracking-[3px] text-zinc-500 mt-1">Management Console — COOL</p>
      </div>

      {/* ── 1. GENERAL SETTINGS ── */}
      <Section title="General">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Slug URL (Unique Link)</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="contoh: dicky-dan-istri" className={inputClass} />
            <p className="text-[10px] text-zinc-500 mt-2 font-light tracking-wide italic uppercase">Target: /{form.slug || "slug"}</p>
          </div>
          <div>
            <label className={labelClass}>Template</label>
            <select value={form.templateId} onChange={(e) => set("templateId", e.target.value)} className={`${inputClass} font-normal`}>
              {TEMPLATES.map((t) => <option key={t.value} value={t.value} className="bg-white">{t.label}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPaid} onChange={(e) => set("isPaid", e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-[10px] uppercase text-zinc-600 tracking-widest font-medium">Verified Payment</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-[10px] uppercase text-zinc-600 tracking-widest font-medium">Published Live</span>
          </label>
        </div>
      </Section>

      {/* ── 2. COUPLE ── */}
      <Section title="Couple Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-[10px] text-blue-800 tracking-[3px] uppercase font-bold italic">Bride (Wanita)</p>
            <input value={form.brideName} onChange={(e) => set("brideName", e.target.value)} placeholder="Nama Lengkap Wanita" className={inputClass} />
            <input value={form.brideParents} onChange={(e) => set("brideParents", e.target.value)} placeholder="Nama Orang Tua" className={inputClass} />
            <ImageUpload label="Foto Wanita" value={form.bridePhoto} onChange={(url) => set("bridePhoto", url)} folder="invitations/couple" />
          </div>
          <div className="space-y-4">
            <p className="text-[10px] text-blue-800 tracking-[3px] uppercase font-bold italic">Groom (Pria)</p>
            <input value={form.groomName} onChange={(e) => set("groomName", e.target.value)} placeholder="Nama Lengkap Pria" className={inputClass} />
            <input value={form.groomParents} onChange={(e) => set("groomParents", e.target.value)} placeholder="Nama Orang Tua" className={inputClass} />
            <ImageUpload label="Foto Pria" value={form.groomPhoto} onChange={(url) => set("groomPhoto", url)} folder="invitations/couple" />
          </div>
        </div>
      </Section>

      {/* ── 3. ACARA ── */}
      <Section title="Ceremony & Reception">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <p className="text-[10px] text-blue-800 tracking-[3px] uppercase font-bold italic">Akad Nikah / Pemberkatan</p>
             <div className="grid grid-cols-2 gap-2">
               <input type="date" value={form.akadDate} onChange={(e) => set("akadDate", e.target.value)} className={inputClass} />
               <input type="time" value={form.akadTime} onChange={(e) => set("akadTime", e.target.value)} className={inputClass} />
             </div>
             <input value={form.akadLocation} onChange={(e) => set("akadLocation", e.target.value)} placeholder="Nama Lokasi Akad" className={inputClass} />
             <textarea value={form.akadAddress} onChange={(e) => set("akadAddress", e.target.value)} placeholder="Alamat Lengkap Akad" className={inputClass} rows={2} />
             <input value={form.akadMapsUrl} onChange={(e) => set("akadMapsUrl", e.target.value)} placeholder="Google Maps URL Akad" className={inputClass} />
          </div>
          <div className="space-y-4">
             <p className="text-[10px] text-blue-800 tracking-[3px] uppercase font-bold italic">Resepsi Pernikahan</p>
             <div className="grid grid-cols-2 gap-2">
               <input type="date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} className={inputClass} />
               <input type="time" value={form.eventTime} onChange={(e) => set("eventTime", e.target.value)} className={inputClass} />
             </div>
             <input value={form.locationName} onChange={(e) => set("locationName", e.target.value)} placeholder="Nama Lokasi Resepsi" className={inputClass} />
             <textarea value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Alamat Lengkap Resepsi" className={inputClass} rows={2} />
             <input value={form.mapsUrl} onChange={(e) => set("mapsUrl", e.target.value)} placeholder="Google Maps URL Resepsi" className={inputClass} />
          </div>
        </div>
      </Section>

      {/* ── 4. MEDIA ── */}
      <Section title="Media Content">
        <ImageUpload label="Hero Main Background" value={form.heroImage} onChange={(url) => set("heroImage", url)} folder="invitations/hero" />
        <div className="pt-4">
          <label className={labelClass}>Gallery Photos</label>
          <GalleryUpload value={form.galleryImages} onChange={(urls) => set("galleryImages", urls)} folder="invitations/gallery" />
        </div>
        <div className="pt-4">
          <label className={labelClass}>Audio URL (.mp3)</label>
          <input value={form.musicUrl} onChange={(e) => set("musicUrl", e.target.value)} placeholder="Link direct mp3 dari Cloudinary/Drive" className={`${inputClass} font-normal text-zinc-700`} />
        </div>
      </Section>

      {/* ── 5. GIFT ── */}
      <Section title="Digital Gift">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 p-4 bg-zinc-50 border border-zinc-100 rounded-sm shadow-inner">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Bank 01</p>
            <input value={form.giftBank1} onChange={(e) => set("giftBank1", e.target.value)} placeholder="Nama Bank" className={inputClass} />
            <input value={form.giftAccNo1} onChange={(e) => set("giftAccNo1", e.target.value)} placeholder="Nomor Rekening" className={inputClass} />
            <input value={form.giftAccName1} onChange={(e) => set("giftAccName1", e.target.value)} placeholder="Atas Nama" className={inputClass} />
          </div>
          <div className="space-y-4 p-4 bg-zinc-50 border border-zinc-100 rounded-sm shadow-inner">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Bank 02</p>
            <input value={form.giftBank2} onChange={(e) => set("giftBank2", e.target.value)} placeholder="Nama Bank" className={inputClass} />
            <input value={form.giftAccNo2} onChange={(e) => set("giftAccNo2", e.target.value)} placeholder="Nomor Rekening" className={inputClass} />
            <input value={form.giftAccName2} onChange={(e) => set("giftAccName2", e.target.value)} placeholder="Atas Nama" className={inputClass} />
          </div>
        </div>
      </Section>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[10px] text-center uppercase tracking-widest rounded-sm">
          [ Error ]: {error}
        </div>
      )}

      {/* Tombol Simpan (di paling bawah, static) */}
      <div className="flex flex-col gap-3 pt-10 border-t border-zinc-100 mt-10">
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full py-4 bg-blue-900 text-white text-[11px] tracking-[4px] uppercase font-bold hover:bg-blue-950 transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(30,58,138,0.25)]"
        >
          {loading ? "Synchronizing..." : mode === "create" ? "Establish Project" : "Commit Changes"}
        </button>
        <button 
          onClick={() => router.back()}
          className="w-full py-4 border border-zinc-200 bg-white text-[11px] tracking-[4px] uppercase text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-all"
        >
          Discard & Back
        </button>
      </div>
    </div>
  );
}