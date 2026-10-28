import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, VERIFIED_FAQS } from "@/lib/college-knowledge";

const MAX_MESSAGE = 1000;
const MAX_HISTORY = 4;
const RATE_LIMIT = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 15;
  const hits = (RATE_LIMIT.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= max) return true;
  hits.push(now);
  RATE_LIMIT.set(ip, hits);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const message = body.message.trim();
    if (!message || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "Message must be 1-" + MAX_MESSAGE + " characters" }, { status: 400 });
    }
    const historyRaw = Array.isArray(body.history) ? body.history : [];
    const history = historyRaw
      .slice(-MAX_HISTORY)
      .filter(
        (m: any) =>
          m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
      )
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }));

    const ip = getClientIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "AI assistant is not configured yet. Here are verified answers to common questions:\n\n" +
          VERIFIED_FAQS.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n"),
        fallback: true,
      });
    }

    const contents = [
      ...history.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 256, temperature: 0.4 },
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (res.status === 429) {
      return NextResponse.json({
        reply: "The AI service is temporarily busy. Please try again in a moment. Meanwhile, here are verified answers:\n\n" +
          VERIFIED_FAQS.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n"),
        fallback: true,
      });
    }
    if (!res.ok) {
      console.error("Gemini provider error", res.status);
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") || "I'm sorry, I couldn't generate a response. Please try again.";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
