import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET satu invitation
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inv = await prisma.invitation.findUnique({ where: { id } });
  if (!inv) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(inv);
}

// PATCH update invitation
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const inv = await prisma.invitation.update({ where: { id }, data: body });
    return NextResponse.json(inv);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE invitation
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.invitation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}