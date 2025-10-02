import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !(session as any).userId) return new Response("Unauthorized", { status: 401 });
  const userId = (session as any).userId;
  const matchId = req.nextUrl.searchParams.get("matchId");
  if (!matchId) return new Response("Bad Request", { status: 400 });

  const m = await prisma.match.findUnique({ where: { id: matchId } });
  if (!m || (m.userAId !== userId && m.userBId !== userId)) return new Response("Forbidden", { status: 403 });

  const messages = await prisma.message.findMany({ where: { matchId }, orderBy: { createdAt: "asc" } });
  return new Response(JSON.stringify(messages), { status: 200 });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !(session as any).userId) return new Response("Unauthorized", { status: 401 });
  const userId = (session as any).userId;
  const { matchId, body } = await req.json();
  if (!matchId || !body) return new Response("Bad Request", { status: 400 });

  const m = await prisma.match.findUnique({ where: { id: matchId } });
  if (!m || (m.userAId !== userId && m.userBId !== userId)) return new Response("Forbidden", { status: 403 });

  const msg = await prisma.message.create({ data: { matchId, fromUserId: userId, body } });
  return new Response(JSON.stringify(msg), { status: 200 });
}
