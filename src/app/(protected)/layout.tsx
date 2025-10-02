import Nav from "@/components/Nav";
import React from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      <div className="mx-auto max-w-4xl p-4">{children}</div>
    </div>
  );
}
