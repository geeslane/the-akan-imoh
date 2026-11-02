import { ENQUIRY_INTENTS, type EnquiryIntent, type EnquiryPayload } from "@/lib/types";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function isIntent(value: string): value is EnquiryIntent {
  return (ENQUIRY_INTENTS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json(
      { ok: false, error: "Please wait a few minutes before sending another enquiry." },
      { status: 429 },
    );
  }

  let json: Record<string, unknown>;
  try {
    json = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "The enquiry could not be read." }, { status: 400 });
  }

  if (clean(json.companyWebsite, 200)) {
    return Response.json({ ok: true, method: "discarded" });
  }

  const payload = {
    name: clean(json.name, 120),
    email: clean(json.email, 200),
    organisation: clean(json.organisation, 160),
    role: clean(json.role, 160),
    intent: clean(json.intent, 80),
    message: clean(json.message, 4000),
  };

  if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !isIntent(payload.intent)) {
    return Response.json({ ok: false, error: "Please check the name, email, and enquiry type." }, { status: 400 });
  }

  if (payload.message.length < 12) {
    return Response.json({ ok: false, error: "Please add a short note about the enquiry." }, { status: 400 });
  }

  const enquiry: EnquiryPayload = {
    name: payload.name,
    email: payload.email,
    organisation: payload.organisation,
    role: payload.role,
    intent: payload.intent,
    message: payload.message,
  };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhook) return Response.json({ ok: true, method: "mailto" });

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...enquiry, submittedAt: new Date().toISOString(), source: "akan-imoh-website" }),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return Response.json(
        { ok: false, error: "The enquiry could not be delivered. Please write by email instead." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, method: "webhook" });
  } catch {
    return Response.json(
      { ok: false, error: "The enquiry could not be delivered. Please write by email instead." },
      { status: 502 },
    );
  }
}
