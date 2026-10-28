"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What courses does AIM offer?",
  "How can I enquire about admission?",
  "Where is the college located?",
  "How can I contact the college?",
  "Tell me about the BCA programme.",
];

function renderText(text: string) {
  // Safe: escape HTML then convert simple markdown links
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const linked = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline text-amber-700">$1</a>');
  const bold = linked.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return bold.split("\n").map((line, i) => (
    <span key={i}>
      <span dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
      <br />
    </span>
  ));
}

export default function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  if (pathname?.startsWith("/admin")) return null;

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    setErr("");
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t, history: msgs }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed");
      setMsgs([...next, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[92vw] max-w-sm rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col h-[70vh] max-h-[560px]">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F1F3D] text-white rounded-t-2xl">
            <div>
              <div className="font-semibold text-sm">AIM College Assistant</div>
              <div className="text-[11px] text-amber-300">Ask about courses, admissions & more</div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setMsgs([])} aria-label="Clear conversation" className="p-1.5 hover:bg-white/10 rounded">
                <Trash2 size={16} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1.5 hover:bg-white/10 rounded">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-sm">
            {msgs.length === 0 && (
              <div className="space-y-2">
                <div className="bg-slate-100 rounded-xl px-3 py-2 text-slate-700">
                  Welcome! I'm the AIM College Assistant. How can I help you today?
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-amber-400 text-amber-800 hover:bg-amber-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    m.role === "user" ? "bg-[#0F1F3D] text-white" : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-xl px-3 py-2 text-slate-500 text-xs">Thinking…</div>
              </div>
            )}
            {err && <div className="text-red-600 text-xs px-2">{err}</div>}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Type your question…"
              aria-label="Chat message"
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              disabled={loading}
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="p-2 rounded-lg bg-amber-500 text-slate-900 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AIM College Assistant"
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-[#0F1F3D] text-white shadow-xl flex items-center justify-center hover:bg-[#1a2f5a]"
      >
        <MessageCircle size={26} />
      </button>
    </>
  );
}
