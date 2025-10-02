'use client';

import { useState } from 'react';

export default function StepPhotos() {
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [showcase, setShowcase] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const photos = [photo1, photo2].filter(Boolean);
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'photos', photos, showcase }),
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Saved photos!');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-2xl font-semibold">Photos</h1>
      <input
        className="border p-2 w-full"
        placeholder="Photo URL #1"
        value={photo1}
        onChange={(e) => setPhoto1(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Photo URL #2"
        value={photo2}
        onChange={(e) => setPhoto2(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Showcase caption"
        value={showcase}
        onChange={(e) => setShowcase(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={save}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? 'Saving…' : 'Save & Finish'}
      </button>
    </div>
  );
}
