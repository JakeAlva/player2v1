import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !(session as any).userId) return new Response("Unauthorized", { status: 401 });
  const userId = (session as any).userId;
  const { toUserId } = await req.json();
  if (!toUserId) return new Response("Bad Request", { status: 400 });
  await prisma.like.create({ data: { fromUserId: userId, toUserId } });

  const reciprocal = await prisma.like.findFirst({ where: { fromUserId: toUserId, toUserId: userId } });
  if (reciprocal) {
    const existing = await prisma.match.findFirst({ where: { OR: [{ userAId: userId, userBId: toUserId }, { userAId: toUserId, userBId: userId }] } });
    if (!existing) {
      await prisma.match.create({ data: { userAId: userId, userBId: toUserId } });
      return new Response(JSON.stringify({ matched: true }), { status: 200 });
    }
  }
  return new Response(JSON.stringify({ matched: false }), { status: 200 });
}
