"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";

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

const inputClass = "w-full border border-white/10 bg-zinc-900 p-3 text-sm text-white outline-none focus:border-white/30 transition-all placeholder:text-zinc-600 rounded-none";
const labelClass = "text-[9px] tracking-[4px] text-zinc-500 uppercase block mb-2 font-medium";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-8 space-y-6 shadow-2xl">
      <div className="pb-4 border-b border-white/5">
        <h2 className="text-[10px] font-bold text-white tracking-[5px] uppercase">{title}</h2>
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
      setError("Slug, nama mempelai, dan tanggal wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        eventDate: form.eventDate ? new Date(form.eventDate).toISOString() : undefined,
        akadDate: form.akadDate ? new Date(form.akadDate).toISOString() : null,
        bridePhoto: form.bridePhoto || null,
        groomPhoto: form.groomPhoto || null,
        heroImage: form.heroImage || null,
        akadLocation: form.akadLocation || null,
        akadAddress: form.akadAddress || null,
        akadMapsUrl: form.akadMapsUrl || null,
        akadTime: form.akadTime || null,
        eventTime: form.eventTime || null,
        mapsUrl: form.mapsUrl || null,
        musicUrl: form.musicUrl || null,
        brideParents: form.brideParents || null,
        groomParents: form.groomParents || null,
        giftBank1: form.giftBank1 || null,
        giftAccNo1: form.giftAccNo1 || null,
        giftAccName1: form.giftAccName1 || null,
        giftBank2: form.giftBank2 || null,
        giftAccNo2: form.giftAccNo2 || null,
        giftAccName2: form.giftAccName2 || null,
      };

      // PERBAIKAN URL DISINI
      const url = mode === "create"
        ? "/api/admin/invitation"
        : `/api/admin/${initialData?.id}`; // Menghapus /invitation/ agar sesuai dengan api/admin/[id]/route.ts

      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Jika response bukan JSON (misal HTML 404), tangkap disini
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const d = await res.json();
          throw new Error(d.error || "Gagal menyimpan");
        } else {
          throw new Error("URL API tidak ditemukan (404). Periksa struktur folder API kamu.");
        }
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <Section title="General Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Slug URL *</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="nama-pasangan" className={inputClass} />
            <p className="text-[9px] text-zinc-600 mt-2 italic tracking-widest uppercase">Target: /{form.slug || "slug"}</p>
          </div>
          <div>
            <label className={labelClass}>Select Template *</label>
            <select value={form.templateId} onChange={(e) => set("templateId", e.target.value)} className={inputClass}>
              {TEMPLATES.map((t) => <option key={t.value} value={t.value} className="bg-black">{t.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-8 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={form.isPaid} onChange={(e) => set("isPaid", e.target.checked)}
              className="w-4 h-4 accent-white rounded-none bg-zinc-900 border-white/20" />
            <span className="text-[10px] uppercase tracking-[2px] text-zinc-400 group-hover:text-white transition-colors">Payment Verified</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)}
              className="w-4 h-4 accent-white rounded-none bg-zinc-900 border-white/20" />
            <span className="text-[10px] uppercase tracking-[2px] text-zinc-400 group-hover:text-white transition-colors">Published Status</span>
          </label>
        </div>
      </Section>

      <Section title="Primary Visual">
        <ImageUpload label="Hero Background" value={form.heroImage} aspectRatio="landscape"
          onChange={(url) => set("heroImage", url)} folder="invitations/hero" />
      </Section>

      <Section title="Couple Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-[9px] tracking-[4px] text-white border-l-2 border-white pl-3 uppercase font-bold">The Bride</p>
            <div>
              <label className={labelClass}>Full Name *</label>
              <input value={form.brideName} onChange={(e) => set("brideName", e.target.value)} placeholder="Aisyah Putri" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parents</label>
              <input value={form.brideParents} onChange={(e) => set("brideParents", e.target.value)} placeholder="Bpk. Ahmad & Ibu Siti" className={inputClass} />
            </div>
            <ImageUpload label="Bride Portrait" value={form.bridePhoto} onChange={(url) => set("bridePhoto", url)} folder="invitations/couple" aspectRatio="portrait" />
          </div>

          <div className="space-y-6">
            <p className="text-[9px] tracking-[4px] text-white border-l-2 border-white pl-3 uppercase font-bold">The Groom</p>
            <div>
              <label className={labelClass}>Full Name *</label>
              <input value={form.groomName} onChange={(e) => set("groomName", e.target.value)} placeholder="Rizky Pratama" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parents</label>
              <input value={form.groomParents} onChange={(e) => set("groomParents", e.target.value)} placeholder="Bpk. Hendra & Ibu Dewi" className={inputClass} />
            </div>
            <ImageUpload label="Groom Portrait" value={form.groomPhoto} onChange={(url) => set("groomPhoto", url)} folder="invitations/couple" aspectRatio="portrait" />
          </div>
        </div>
      </Section>

      <Section title="Ceremony Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className={labelClass}>Date</label><input type="date" value={form.akadDate} onChange={(e) => set("akadDate", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Time</label><input type="time" value={form.akadTime} onChange={(e) => set("akadTime", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Venue Name</label><input value={form.akadLocation} onChange={(e) => set("akadLocation", e.target.value)} placeholder="Masjid Al-Falah" className={inputClass} /></div>
          <div><label className={labelClass}>Maps URL</label><input value={form.akadMapsUrl} onChange={(e) => set("akadMapsUrl", e.target.value)} placeholder="https://goo.gl/maps/..." className={inputClass} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Full Address</label><textarea value={form.akadAddress} onChange={(e) => set("akadAddress", e.target.value)} placeholder="Jl. Merdeka No. 12, Bandung" className={inputClass} rows={2} style={{ resize: "none" }} /></div>
        </div>
      </Section>

      <Section title="Reception Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className={labelClass}>Date *</label><input type="date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Start Time</label><input type="time" value={form.eventTime} onChange={(e) => set("eventTime", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Venue *</label><input value={form.locationName} onChange={(e) => set("locationName", e.target.value)} placeholder="Hotel Savoy Homann" className={inputClass} /></div>
          <div><label className={labelClass}>Maps URL</label><input value={form.mapsUrl} onChange={(e) => set("mapsUrl", e.target.value)} placeholder="https://goo.gl/maps/..." className={inputClass} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Full Address *</label><textarea value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Jl. Asia Afrika No. 112, Bandung" className={inputClass} rows={2} style={{ resize: "none" }} /></div>
        </div>
      </Section>

      <Section title="Memories Gallery">
        <GalleryUpload value={form.galleryImages} onChange={(urls) => set("galleryImages", urls)} max={8} folder="invitations/gallery" />
      </Section>

      <Section title="Background Score">
        <div>
          <label className={labelClass}>Audio URL (Direct Link)</label>
          <input value={form.musicUrl} onChange={(e) => set("musicUrl", e.target.value)} placeholder="https://res.cloudinary.com/..." className={inputClass} />
          <p className="text-[9px] text-zinc-600 mt-3 uppercase tracking-widest font-medium italic">Recommended: .mp3 / .ogg format</p>
        </div>
      </Section>

      <Section title="Digital Gift">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 p-6 bg-zinc-950/50 border border-white/5">
            <p className="text-[9px] tracking-[3px] text-zinc-500 uppercase font-bold">Channel 01</p>
            <input value={form.giftBank1} onChange={(e) => set("giftBank1", e.target.value)} placeholder="Bank Name / E-Wallet" className={inputClass} />
            <input value={form.giftAccNo1} onChange={(e) => set("giftAccNo1", e.target.value)} placeholder="Account Number" className={inputClass} />
            <input value={form.giftAccName1} onChange={(e) => set("giftAccName1", e.target.value)} placeholder="Account Holder" className={inputClass} />
          </div>
          <div className="space-y-4 p-6 bg-zinc-950/50 border border-white/5">
            <p className="text-[9px] tracking-[3px] text-zinc-500 uppercase font-bold">Channel 02</p>
            <input value={form.giftBank2} onChange={(e) => set("giftBank2", e.target.value)} placeholder="Bank Name / E-Wallet" className={inputClass} />
            <input value={form.giftAccNo2} onChange={(e) => set("giftAccNo2", e.target.value)} placeholder="Account Number" className={inputClass} />
            <input value={form.giftAccName2} onChange={(e) => set("giftAccName2", e.target.value)} placeholder="Account Holder" className={inputClass} />
          </div>
        </div>
      </Section>

      {error && (
        <div className="bg-white/5 border border-red-900/50 p-6 text-[10px] tracking-widest uppercase text-red-500 font-bold">
          [ Error ]: {error}
        </div>
      )}

      <div className="flex gap-4 pt-10 sticky bottom-8 z-50">
        <button onClick={() => router.back()}
          className="px-10 py-4 border border-white/10 text-[10px] tracking-[4px] uppercase text-zinc-500 hover:text-white hover:border-white transition-all bg-black/80 backdrop-blur-md">
          Back
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="flex-1 py-4 bg-white text-black text-[10px] tracking-[5px] uppercase font-black hover:bg-zinc-200 transition-all disabled:opacity-20 shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
          {loading ? "Synchronizing..." : mode === "create" ? "Initiate Project" : "Commit Changes"}
        </button>
      </div>
    </div>
  );
}