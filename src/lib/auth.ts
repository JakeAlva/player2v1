export type SessionUser = { id: string; email?: string | null };

export async function currentUser(): Promise<SessionUser | null> {
  // Return null in build; wire up real NextAuth later.
  return null;
}

export async function requireUser(): Promise<SessionUser> {
  // Temporary no-op to satisfy API route imports during build.
  // Replace with your real auth gating when ready.
  return { id: 'dev-user' };
}
