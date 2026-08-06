import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "blob_not_configured" }, { status: 501 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "no_file" }, { status: 400 });
    }
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const blob = await put(`cards/${id}.png`, file, {
      access: "public", contentType: "image/png",
    });
    const base = SITE_URL || new URL(req.url).origin;
    const params = new URLSearchParams({ img: blob.url });
    for (const k of ["name", "title", "id", "kind"]) {
      const v = form.get(k);
      if (typeof v === "string" && v) params.set(k, v);
    }
    return NextResponse.json({ url: blob.url, shareUrl: `${base}/c?${params.toString()}` });
  } catch (e) {
    console.error("upload failed", e);
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
