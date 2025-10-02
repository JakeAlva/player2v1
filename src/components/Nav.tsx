'use client';

import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">Player2</div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/onboarding/basics">Onboarding</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}
