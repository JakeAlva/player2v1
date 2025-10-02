import "./../styles/globals.css";
import React from "react";

export const metadata = {
  title: "Player Two — Serious Gamer Dating",
  description: "Find your Player Two. Inclusive, serious dating for gamers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto max-w-4xl p-4">{children}</div>
      </body>
    </html>
  );
}
