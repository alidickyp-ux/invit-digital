import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400"] });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={`${lexend.className} min-h-screen bg-[#0c0c0c] text-zinc-300 p-6`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-white italic">COOL <span className="text-zinc-600">/</span> Admin</h1>
            <p className="text-[0.7rem] uppercase tracking-[3px] text-zinc-500 mt-1">Management Console</p>
          </div>
          <Link href="/admin/invitation/new" className="px-6 py-2.5 bg-zinc-100 text-black text-[10px] tracking-[2px] uppercase font-bold hover:bg-white transition-all">
            + New Project
          </Link>
        </div>

        {/* Table List */}
        <div className="space-y-3">
          {invitations.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between p-5 bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all rounded-sm">
              <div>
                <h3 className="text-[0.85rem] font-medium text-white tracking-tight">
                  {inv.brideName} & {inv.groomName}
                </h3>
                <p className="text-[0.7rem] text-zinc-500 mt-1 tracking-wider uppercase italic">/{inv.slug}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Link href={`/admin/invitation/${inv.id}`} className="text-[10px] uppercase tracking-[2px] text-zinc-400 hover:text-white transition-colors border-b border-zinc-800 pb-0.5">
                  Manage
                </Link>
                <a href={`/${inv.slug}`} target="_blank" className="text-[10px] uppercase tracking-[2px] text-zinc-600 hover:text-white transition-colors">
                  Live ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {invitations.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 opacity-50">
            <p className="text-[0.75rem] uppercase tracking-widest">No Active Projects</p>
          </div>
        )}
      </div>
    </div>
  );
}