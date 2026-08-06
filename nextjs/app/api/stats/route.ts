import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KEY = "frameingoa:count";

// In-memory fallback (per server instance) when no KV is configured.
let mem = 0;

async function kv(path: string): Promise<number | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const r = await fetch(`${KV_URL}/${path}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    const d = await r.json();
    const n = Number(d.result);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return null;
  }
}

export async function GET() {
  const n = await kv(`get/${KEY}`);
  return NextResponse.json({ count: n ?? mem });
}

export async function POST() {
  const n = await kv(`incr/${KEY}`);
  if (n == null) mem += 1;
  return NextResponse.json({ count: n ?? mem });
}
