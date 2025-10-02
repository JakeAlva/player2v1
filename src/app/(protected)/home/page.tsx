'use client';
import { useEffect, useState } from "react";

type Profile = any;

export default function HomeBrowse() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/profiles').then(r=>r.json()).then(setProfiles).catch(()=>setInfo("Failed to load profiles."));
  }, []);

  const like = async (userId: string) => {
    const res = await fetch('/api/likes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ toUserId: userId })});
    const j = await res.json();
    if (j.matched) setInfo("It's a match! 🎉 Check your Matches tab.");
    setProfiles(prev => prev.filter(p => p.userId !== userId));
  };

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Browse</h1>
      {info && <p className="text-green-300">{info}</p>}
      {profiles.length === 0 && <p className="text-neutral-400">No more profiles. Check back later.</p>}
      <div className="grid gap-4">
        {profiles.map((p:any)=> (
          <div key={p.userId} className="rounded-lg border border-neutral-800 p-4 bg-neutral-900">
            <div className="flex gap-4">
              <div className="w-32 h-32 bg-neutral-800 rounded overflow-hidden">
                {p.photos?.[0]?.url ? <img src={p.photos[0].url} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{p.displayName}</h2>
                <p className="text-sm text-neutral-400">{p.city || "Somewhere nearby"}</p>
                <p className="mt-2 text-neutral-300">Top games: {p.topGames?.join(", ") || "—"}</p>
                <p className="text-neutral-300">Platforms: {p.platforms?.join(", ") || "—"}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=>like(p.userId)} className="rounded bg-indigo-600 px-4 py-2 font-semibold">Like</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
