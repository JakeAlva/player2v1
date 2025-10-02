'use client';

import { useState } from 'react';

export default function StepIdentity() {
  const [genderIdentity, setGenderIdentity] = useState('');
  const [orientation, setOrientation] = useState('');
  const [showTo, setShowTo] = useState('everyone'); // everyone | men | women | lgbtqia+
  const [intent, setIntent] = useState('serious');   // serious | casual | friends
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: 'identity',
          genderIdentity,
          orientation,
          showTo,
          intent,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Saved identity!');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-2xl font-semibold">Identity</h1>
      <input
        className="border p-2 w-full"
        placeholder="Gender identity"
        value={genderIdentity}
        onChange={(e) => setGenderIdentity(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Orientation"
        value={orientation}
        onChange={(e) => setOrientation(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={showTo}
        onChange={(e) => setShowTo(e.target.value)}
      >
        <option value="everyone">Show to everyone</option>
        <option value="men">Show to men</option>
        <option value="women">Show to women</option>
        <option value="lgbtqia+">Show to LGBTQIA+</option>
      </select>
      <select
        className="border p-2 w-full"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
      >
        <option value="serious">Serious dating</option>
        <option value="casual">Casual</option>
        <option value="friends">Friends</option>
      </select>
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
