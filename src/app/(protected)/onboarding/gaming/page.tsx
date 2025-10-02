'use client';

import { useState } from 'react';

export default function StepGaming() {
  const [platforms, setPlatforms] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [topGames, setTopGames] = useState<string>('');
  const [voicePref, setVoicePref] = useState<string>('text');
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
          step: 'gaming',
          platforms,
          genres,
          topGames,
          voicePref,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Saved gaming!');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-2xl font-semibold">Gaming</h1>
      <input
        className="border p-2 w-full"
        placeholder="Platforms (comma separated)"
        value={platforms}
        onChange={(e) => setPlatforms(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Favorite genres (comma separated)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Top games (comma separated)"
        value={topGames}
        onChange={(e) => setTopGames(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={voicePref}
        onChange={(e) => setVoicePref(e.target.value)}
      >
        <option value="text">Text Only</option>
        <option value="voice">Voice OK</option>
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
