import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import InvitationForm from "@/components/admin/InvitationForm";

export default async function EditInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inv = await prisma.invitation.findUnique({ where: { id } });
  
  if (!inv) return notFound();

  // Format tanggal ke string YYYY-MM-DD untuk input type=date
  const formatDate = (d: Date | null) => d ? d.toISOString().split("T")[0] : "";

  const initialData = {
    id: inv.id,
    slug: inv.slug,
    templateId: inv.templateId,
    brideName: inv.brideName,
    groomName: inv.groomName,
    brideParents: inv.brideParents ?? "",
    groomParents: inv.groomParents ?? "",
    bridePhoto: inv.bridePhoto ?? "",
    groomPhoto: inv.groomPhoto ?? "",
    heroImage: inv.heroImage ?? "",
    akadDate: formatDate(inv.akadDate),
    akadTime: inv.akadTime ?? "08:00",
    akadLocation: inv.akadLocation ?? "",
    akadAddress: inv.akadAddress ?? "",
    akadMapsUrl: inv.akadMapsUrl ?? "",
    eventDate: formatDate(inv.eventDate),
    eventTime: inv.eventTime ?? "11:00",
    locationName: inv.locationName,
    address: inv.address,
    mapsUrl: inv.mapsUrl ?? "",
    musicUrl: inv.musicUrl ?? "",
    galleryImages: inv.galleryImages ?? [],
    isPaid: inv.isPaid,
    isPublished: inv.isPublished,
    giftBank1: inv.giftBank1 ?? "",
    giftAccNo1: inv.giftAccNo1 ?? "",
    giftAccName1: inv.giftAccName1 ?? "",
    giftBank2: inv.giftBank2 ?? "",
    giftAccNo2: inv.giftAccNo2 ?? "",
    giftAccName2: inv.giftAccName2 ?? "",
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-10">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="group">
              <div className="p-2 border border-white/10 group-hover:border-white transition-all">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-white">← Back</span>
              </div>
            </Link>
            <div>
              <h1 className="text-3xl font-extralight tracking-tighter text-white uppercase">
                Edit Asset <span className="text-zinc-700">/</span> {inv.brideName}
              </h1>
              <p className="text-[9px] tracking-[4px] text-zinc-500 uppercase mt-1">
                Ref ID: {inv.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          
          <a href={`/${inv.slug}?to=Preview`} target="_blank"
            className="px-6 py-3 border border-white/10 text-[9px] tracking-[3px] uppercase text-zinc-400 hover:text-white hover:border-white transition-all">
            Live Preview ↗
          </a>
        </div>

        {/* Form Section */}
        <div className="mt-8">
          <InvitationForm mode="edit" initialData={initialData} />
        </div>

      </div>
    </div>
  );
}