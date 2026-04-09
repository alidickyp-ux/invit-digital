import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET semua invitation
export async function GET() {
  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, slug: true, templateId: true,
      brideName: true, groomName: true,
      eventDate: true, isPaid: true, isPublished: true, createdAt: true,
    },
  });
  return NextResponse.json(invitations);
}

// POST buat invitation baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const invitation = await prisma.invitation.create({ data: body });
    return NextResponse.json(invitation);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}