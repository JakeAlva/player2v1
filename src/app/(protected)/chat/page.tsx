'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const sp = useSearchParams();
  const matchId = sp.get("matchId");
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!matchId) return;
    const load = async () => {
      const res = await fetch(`/api/messages?matchId=${matchId}`);
      if (res.ok) setMessages(await res.json());
    };
    load();
  }, [matchId]);

  const send = async () => {
    if (!text.trim() || !matchId) return;
    const res = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ matchId, body: text.trim() }) });
    if (res.ok) {
      const msg = await res.json();
      setMessages(prev => [...prev, msg]);
      setText("");
    }
  };

  return (
    <main className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="h-96 overflow-y-auto border border-neutral-800 rounded p-3 space-y-2 bg-neutral-900">
        {messages.map((m:any)=>(<div key={m.id} className="text-sm"><span className="text-neutral-400">{new Date(m.createdAt).toLocaleTimeString()}:</span> {m.body}</div>))}
        {messages.length===0 && <p className="text-neutral-400">No messages yet.</p>}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 rounded bg-neutral-800 p-3" placeholder="Type a message..." value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={send} className="rounded bg-indigo-600 px-4">Send</button>
      </div>
    </main>
  );
}
