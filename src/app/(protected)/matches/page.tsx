'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/matches').then(r=>r.json()).then(setMatches);
  }, []);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <div className="space-y-3">
        {matches.map(m => {
          const other = m.userA?.profile?.displayName ? m.userA : m.userB;
          const otherName = other?.profile?.displayName || "Someone";
          return (
            <div key={m.id} className="rounded border border-neutral-800 p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold">{otherName}</div>
                <div className="text-sm text-neutral-400">{m.messages?.[0]?.body ? ("Last: " + m.messages[0].body) : "Say hi!"}</div>
              </div>
              <Link href={`/(protected)/chat?matchId=${m.id}`} className="rounded bg-neutral-800 px-3 py-2">Open chat</Link>
            </div>
          );
        })}
        {matches.length === 0 && <p className="text-neutral-400">No matches yet.</p>}
      </div>
    </main>
  );
}
