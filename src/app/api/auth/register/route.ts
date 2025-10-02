import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password || password.length < 8) {
    return new Response(JSON.stringify({ message: "Email and password (min 8 chars) required" }), { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new Response(JSON.stringify({ message: "Email already in use" }), { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, passwordHash: hash } });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
