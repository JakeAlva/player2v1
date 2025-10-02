'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [photo1, setP1] = useState(''); const [photo2, setP2] = useState(''); const [showcase, setShow] = useState('');

  const save = async () => {{
    setSaving(true); setError(null);
    const res = await fetch('/api/onboarding', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({ step: 'photos', photos: [photo1, photo2].filter(Boolean), showcase }),
    }});
    setSaving(false);
    if (!res.ok) {{ setError('Failed to save'); return; }}
    router.push('/(protected)/onboarding/prompts');
  }};

  return (
    <main className="py-6 max-w-xl">
      <h1 className="text-2xl font-bold">Photos & Media (URLs for MVP)</h1>
      <div className="mt-6 space-y-3">
        <input className="w-full rounded bg-neutral-800 p-3" placeholder="Photo URL #1" value={photo1} onChange={e=>setP1(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Photo URL #2" value={photo2} onChange={e=>setP2(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Showcase URL (optional: Twitch/YouTube clip)" value={showcase} onChange={e=>setShow(e.target.value)} />
<p className="text-sm text-neutral-400">Tip: You can host images on Imgur/Cloudinary now. We can add Supabase Storage later.</p>
      </div>
      {{error ? <p className="text-red-400 text-sm mt-2">{{error}}</p> : null}}
      <div className="mt-6 flex justify-end">
        <button onClick={{save}} disabled={{saving}} className="rounded bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-60">{{saving?'Saving...':'Continue'}}</button>
      </div>
    </main>
  );
}}
