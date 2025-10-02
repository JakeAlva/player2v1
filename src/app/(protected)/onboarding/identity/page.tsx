'use client';
import {{ useState }} from 'react';
import {{ useRouter }} from 'next/navigation';

export default function Step() {{
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [genderIdentity, setGI] = useState(''); const [orientation, setOri] = useState(''); const [showTo, setShow] = useState(''); const [intent, setIntent] = useState('Long-term relationship');

  const save = async () => {{
    setSaving(true); setError(null);
    const res = await fetch('/api/onboarding', {{
      method: 'POST',
      headers: {{ 'Content-Type': 'application/json' }},
      body: JSON.stringify({ step: 'identity', genderIdentity, orientation, showTo, intent }),
    }});
    setSaving(false);
    if (!res.ok) {{ setError('Failed to save'); return; }}
    router.push('/(protected)/onboarding/gaming');
  }};

  return (
    <main className="py-6 max-w-xl">
      <h1 className="text-2xl font-bold">Identity & Inclusivity</h1>
      <div className="mt-6 space-y-3">
        <input className="w-full rounded bg-neutral-800 p-3" placeholder="Gender identity (e.g., Woman, Man, Non-binary; comma-separated allowed)" value={genderIdentity} onChange={e=>setGI(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Sexual orientation (e.g., Heterosexual, Gay, Bi; comma-separated)" value={orientation} onChange={e=>setOri(e.target.value)} />
<input className="w-full rounded bg-neutral-800 p-3" placeholder="Who you want to see (Women, Men, Non-binary, Everyone; comma-separated)" value={showTo} onChange={e=>setShow(e.target.value)} />
<select className="w-full rounded bg-neutral-800 p-3" value={intent} onChange={e=>setIntent(e.target.value)}>
  <option>Long-term relationship</option>
  <option>Serious dating</option>
  <option>Open to friendship first</option>
</select>
      </div>
      {{error ? <p className="text-red-400 text-sm mt-2">{{error}}</p> : null}}
      <div className="mt-6 flex justify-end">
        <button onClick={{save}} disabled={{saving}} className="rounded bg-indigo-600 px-5 py-3 font-semibold disabled:opacity-60">{{saving?'Saving...':'Continue'}}</button>
      </div>
    </main>
  );
}}
