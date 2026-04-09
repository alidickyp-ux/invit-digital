import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { invitationId, guestName, status, pax, message } = await req.json();
    if (!invitationId || !guestName || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const rsvp = await prisma.rSVP.create({
      data: { invitationId, guestName, status, pax: pax ?? 1, message },
    });
    return NextResponse.json(rsvp);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const invitationId = req.nextUrl.searchParams.get("invitationId");
  if (!invitationId) return NextResponse.json([], { status: 400 });
  const rsvps = await prisma.rSVP.findMany({
    where: { invitationId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rsvps);
}