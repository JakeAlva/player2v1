import React from 'react';
import Nav from '../../components/Nav'; // <-- use relative path (no @ alias)

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <main className="p-6">{children}</main>
    </div>
  );
}
