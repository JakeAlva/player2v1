'use client';

import { useState } from 'react';

export default function StepBasics() {
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'basics', displayName, city, dob }),
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Saved basics!');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-2xl font-semibold">Basics</h1>
      <input
        className="border p-2 w-full"
        placeholder="Display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={save}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? 'Saving…' : 'Save & Continue'}
      </button>
    </div>
  );
}
