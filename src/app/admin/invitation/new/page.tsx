import Link from "next/link";
import InvitationForm from "@/components/admin/InvitationForm";

export default function NewInvitationPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-[#9E8A6E] hover:text-[#C9A96E] text-sm">← Kembali</Link>
          <div>
            <h1 className="text-2xl font-light text-[#1a1a1a] tracking-wide">Buat Undangan Baru</h1>
            <p className="text-sm text-[#9E8A6E] mt-0.5">Isi semua data mempelai dan detail acara</p>
          </div>
        </div>
        <InvitationForm mode="create" />
      </div>
    </div>
  );
}