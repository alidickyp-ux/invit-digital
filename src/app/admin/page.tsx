import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminPage() {
  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      templateId: true,
      brideName: true,
      groomName: true,
      eventDate: true,
      isPaid: true,
      isPublished: true,
    },
  });

  return (
    <div className="min-h-screen bg-black text-white p-8 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-10">
          <div>
            <h1 className="text-4xl font-extralight tracking-tighter text-white">
              Invitations <span className="text-zinc-700">/</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[5px] text-zinc-500 mt-3 font-medium">
              Digital Assets Control — COOL
            </p>
          </div>
          <Link
            href="/admin/invitation/new"
            className="px-8 py-3 bg-white text-black text-[10px] tracking-[3px] uppercase font-bold hover:bg-zinc-200 transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          >
            + Create New
          </Link>
        </div>

        {/* Stats - Grid Monochrome */}
        <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 mb-12 overflow-hidden">
          {[
            { label: "Total Asset", value: invitations.length },
            { label: "Live Status", value: invitations.filter((i) => i.isPublished).length },
            { label: "Revenue Clear", value: invitations.filter((i) => i.isPaid).length },
          ].map((s) => (
            <div key={s.label} className="bg-black p-8 text-center group hover:bg-zinc-900 transition-colors">
              <p className="text-4xl font-extralight tracking-tighter text-white mb-2 italic">
                {s.value.toString().padStart(2, "0")}
              </p>
              <p className="text-[9px] tracking-[4px] text-zinc-500 uppercase font-medium group-hover:text-zinc-300 transition-colors">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* List Table */}
        {invitations.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10">
            <p className="text-zinc-500 text-[11px] uppercase tracking-[4px]">No digital assets found</p>
            <Link href="/admin/invitation/new" className="text-white text-[10px] uppercase tracking-[2px] mt-4 inline-block border-b border-white/20 pb-1 hover:border-white transition-all">
              Initiate First Project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5 border-t border-b border-white/5">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="group flex items-center justify-between py-8 px-4 hover:bg-zinc-900/50 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-light tracking-tight text-zinc-200">
                      {inv.brideName} <span className="text-zinc-600">&</span> {inv.groomName}
                    </h3>
                    <div className="flex gap-2">
                      <span className={`text-[8px] tracking-[2px] uppercase px-2 py-0.5 border ${inv.isPublished ? "border-white/40 text-white" : "border-zinc-800 text-zinc-600"}`}>
                        {inv.isPublished ? "Live" : "Draft"}
                      </span>
                      {inv.isPaid && (
                        <span className="text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-white/20 bg-white/5 text-zinc-400">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[10px] uppercase tracking-[3px] text-zinc-600">
                    <span className="text-zinc-400">/{inv.slug}</span>
                    <span className="hidden md:inline italic">{inv.templateId}</span>
                    <span className="hidden md:inline">
                      {new Date(inv.eventDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`/${inv.slug}?to=Preview`}
                    target="_blank"
                    className="text-[10px] tracking-[2px] uppercase text-zinc-500 hover:text-white transition-colors"
                  >
                    View
                  </a>
                  <Link
                    href={`/admin/invitation/${inv.id}`}
                    className="px-6 py-2 bg-zinc-800 text-white text-[10px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Footer */}
        <div className="mt-20 py-10 border-t border-white/5 flex justify-between items-center opacity-30">
          <p className="text-[9px] uppercase tracking-[4px]">System Version 2.0.4</p>
          <p className="text-[9px] uppercase tracking-[4px]">Logged as Admin</p>
        </div>
      </div>
    </div>
  );
}