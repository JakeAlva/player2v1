'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [displayName, setDisplayName] = useState(''); const [city, setCity] = useState(''); const [dob, setDob] = useState('');

  const save = async () => {{
    setSaving(true); setError(null);
    const res = await fetch('/api/onboarding', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({ step: 'basics', displayName, city, dob }),
    }});
    setSaving(false);
    if (!res.ok) {{ setError('Failed to save'); return; }}
    router.push('/(protected)/onboarding/identity');
  }};

  return (
    <main className="py-6 max-w-xl">
      <h1 className="text-2xl font-bold">Basics</h1>
      <div className="mt-6 space-y-3">
        <input className="w-full rounded bg-neutral-800 p-3" placeholder="Display name" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="City (approximate)" value={city} onChange={e=>setCity(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" type="date" value={dob} onChange={e=>setDob(e.target.value)} />
      </div>
      {{error ? <p className="text-red-400 text-sm mt-2">{{error}}</p> : null}}
      <div className="mt-6 flex justify-end">
        <button onClick={{save}} disabled={{saving}} className="rounded bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-60">{{saving?'Saving...':'Continue'}}</button>
      </div>
    </main>
  );
}}
