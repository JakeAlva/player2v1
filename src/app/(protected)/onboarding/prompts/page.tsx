'use client';
import {{ useState }} from 'react';
import {{ useRouter }} from 'next/navigation';

export default function Step() {{
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [p1, setP1] = useState(''); const [p2, setP2] = useState('');

  const save = async () => {{
    setSaving(true); setError(null);
    const res = await fetch('/api/onboarding', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({ step: 'prompts', prompts: [{ key: 'ideal_first_gaming_date', answer: p1 }, { key: 'comfort_game', answer: p2 }] }),
    }});
    setSaving(false);
    if (!res.ok) {{ setError('Failed to save'); return; }}
    router.push('/(protected)/home');
  }};

  return (
    <main className="py-6 max-w-xl">
      <h1 className="text-2xl font-bold">Prompts</h1>
      <div className="mt-6 space-y-3">
        <textarea className="w-full rounded bg-neutral-800 p-3" placeholder="Ideal first gaming date..." value={p1} onChange={e=>setP1(e.target.value)} />
<textarea className="w-full rounded bg-neutral-800 p-3" placeholder="My comfort game is..." value={p2} onChange={e=>setP2(e.target.value)} />
      </div>
      {{error ? <p className="text-red-400 text-sm mt-2">{{error}}</p> : null}}
      <div className="mt-6 flex justify-end">
        <button onClick={{save}} disabled={{saving}} className="rounded bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-60">{{saving?'Saving...':'Continue'}}</button>
      </div>
    </main>
  );
}}
