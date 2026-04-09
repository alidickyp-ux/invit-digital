import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { invitationId, name, message } = await req.json();
    if (!invitationId || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const wish = await prisma.wish.create({
      data: { invitationId, name, message },
    });
    return NextResponse.json(wish);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const invitationId = req.nextUrl.searchParams.get("invitationId");
  if (!invitationId) return NextResponse.json([]);
  const wishes = await prisma.wish.findMany({
    where: { invitationId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(wishes);
}