'use client';
import {{ useState }} from 'react';
import {{ useRouter }} from 'next/navigation';

export default function Step() {{
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [platforms, setPlatforms] = useState(''); const [genres, setGenres] = useState(''); const [topGames, setTopGames] = useState(''); const [voicePref, setVoicePref] = useState('Sometimes');

  const save = async () => {{
    setSaving(true); setError(null);
    const res = await fetch('/api/onboarding', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({ step: 'gaming', platforms, genres, topGames, voicePref }),
    }});
    setSaving(false);
    if (!res.ok) {{ setError('Failed to save'); return; }}
    router.push('/(protected)/onboarding/photos');
  }};

  return (
    <main className="py-6 max-w-xl">
      <h1 className="text-2xl font-bold">Gaming Profile</h1>
      <div className="mt-6 space-y-3">
        <input className="w-full rounded bg-neutral-800 p-3" placeholder="Platforms (PC, PlayStation, Xbox, Switch, Mobile; comma-separated)" value={platforms} onChange={e=>setPlatforms(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Genres (RPG, FPS, MMO, Co-op, etc.; comma-separated)" value={genres} onChange={e=>setGenres(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Top games (comma-separated)" value={topGames} onChange={e=>setTopGames(e.target.value)} />
<select className="w-full rounded bg-neutral-800 p-3" value={voicePref} onChange={e=>setVoicePref(e.target.value)}>
  <option>Always</option>
  <option>Sometimes</option>
  <option>Text only</option>
</select>
      </div>
      {{error ? <p className="text-red-400 text-sm mt-2">{{error}}</p> : null}}
      <div className="mt-6 flex justify-end">
        <button onClick={{save}} disabled={{saving}} className="rounded bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-60">{{saving?'Saving...':'Continue'}}</button>
      </div>
    </main>
  );
}}
