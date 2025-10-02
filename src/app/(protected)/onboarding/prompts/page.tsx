'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step() {
  const router = useRouter();
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 'prompts',
          prompts: [p1, p2, p3].filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      router.push('/'); // go wherever the next step/home is
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
        Prompts
      </h1>

      <label>Prompt 1</label>
      <input
        value={p1}
        onChange={(e) => setP1(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <label>Prompt 2</label>
      <input
        value={p2}
        onChange={(e) => setP2(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <label>Prompt 3</label>
      <input
        value={p3}
        onChange={(e) => setP3(e.target.value)}
        style={{ width: '100%', marginBottom: 16 }}
      />

      {error && (
        <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>
      )}

      <button onClick={save} disabled={saving}>
        {saving ? 'Saving…' : 'Save & Continue'}
      </button>
    </div>
  );
}
