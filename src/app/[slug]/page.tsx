import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ElegantIvory from "@/templates/elegant-ivory";
import GardenFloral from "@/templates/garden-floral";
import ModernDark from "@/templates/modern-dark";
import { Invitation } from "@prisma/client";

const templates: Record<string, React.ComponentType<{ data: Invitation; guestName: string }>> = {
  "elegant-ivory": ElegantIvory,
  "garden-floral": GardenFloral,
  "modern-dark": ModernDark,
};

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { slug } = await params;
  const { to } = await searchParams;

  const data = await prisma.invitation.findUnique({ where: { slug } });
  if (!data) return notFound();

  const guestName = to || "Tamu Undangan";
  const Template = templates[data.templateId] ?? ElegantIvory;

  return <Template data={data} guestName={guestName} />;
}