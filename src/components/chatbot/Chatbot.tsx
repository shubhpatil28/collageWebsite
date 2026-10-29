"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RobotMascot from "./RobotMascot";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What courses does AIM offer?",
  "How can I enquire about admission?",
  "Where is the college located?",
  "How can I contact the college?",
  "Tell me about the BCA programme.",
];

function renderText(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const linked = escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="underline text-amber-700">$1</a>'
  );
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
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "fixed",
              bottom: "108px",   /* sits above the 76px mascot + spacing */
              right: "1rem",
              zIndex: 50,
              width: "min(92vw, 370px)",
              maxHeight: "560px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.25rem",
              boxShadow:
                "0 16px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,149,255,0.18)",
              overflow: "hidden",
              background: "#fff",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="AIM College Assistant chat"
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg,#0F1F3D 0%,#152d5b 100%)",
                color: "#fff",
                padding: "0.65rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(0,149,255,0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {/* Small robot avatar in header */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aim-chatbot-robot.png"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                    AIM College Assistant
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#fbbf24", marginTop: "1px" }}>
                    Ask about courses, admissions &amp; more
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => setMsgs([])}
                  aria-label="Clear conversation"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "6px",
                    lineHeight: 1,
                    display: "flex",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "6px",
                    lineHeight: 1,
                    display: "flex",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                fontSize: "0.875rem",
              }}
            >
              {msgs.length === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div
                    style={{
                      background: "#f1f5f9",
                      borderRadius: "0.75rem",
                      padding: "0.6rem 0.8rem",
                      color: "#374151",
                    }}
                  >
                    Welcome! I&apos;m the AIM College Assistant. How can I help you
                    today?
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        style={{
                          fontSize: "0.72rem",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "9999px",
                          border: "1px solid #f59e0b",
                          color: "#92400e",
                          background: "transparent",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#fffbeb")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {msgs.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      borderRadius: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      background:
                        m.role === "user" ? "#0F1F3D" : "#f1f5f9",
                      color: m.role === "user" ? "#fff" : "#1e293b",
                    }}
                  >
                    {renderText(m.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      background: "#f1f5f9",
                      borderRadius: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      color: "#64748b",
                      fontSize: "0.75rem",
                    }}
                  >
                    Thinking…
                  </div>
                </div>
              )}

              {err && (
                <div style={{ color: "#dc2626", fontSize: "0.75rem", padding: "0 0.5rem" }}>
                  {err}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderTop: "1px solid #e2e8f0",
                padding: "0.5rem",
              }}
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
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                disabled={loading}
                maxLength={1000}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(245,158,11,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow = "none")
                }
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  background: "#f59e0b",
                  color: "#1c1917",
                  border: "none",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  display: "flex",
                  lineHeight: 1,
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Robot mascot launcher ── */}
      <RobotMascot isOpen={open} onClick={() => setOpen((o) => !o)} />
    </>
  );
}
