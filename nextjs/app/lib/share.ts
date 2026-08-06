// Client-side download + Share-to-X helpers, shared by both studios.
import { HASHTAGS } from "./brand";

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((res) => canvas.toBlob((b) => res(b), "image/png", 0.95));
}

export function downloadCanvas(canvas: HTMLCanvasElement, fileName: string) {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url; a.download = fileName;
  document.body.appendChild(a); a.click(); a.remove();
}

function tweetUrl(text: string, url?: string) {
  const p = new URLSearchParams({ text });
  if (url) p.set("url", url);
  return `https://twitter.com/intent/tweet?${p.toString()}`;
}

export interface ShareOpts {
  canvas: HTMLCanvasElement;
  fileName: string;
  caption: string;
  kind: "frame" | "id";
  meta?: Record<string, string>;
}

// Returns how the share resolved so the UI can react.
export async function shareToX(o: ShareOpts): Promise<"native" | "link" | "download"> {
  const blob = await canvasToBlob(o.canvas);
  if (!blob) throw new Error("render failed");
  const file = new File([blob], o.fileName, { type: "image/png" });

  const nav = navigator as Navigator & { canShare?: (d: { files?: File[] }) => boolean };
  if (nav.canShare && nav.canShare({ files: [file] })) {
    try {
      await (navigator as any).share({ files: [file], text: `${o.caption} ${HASHTAGS}` });
      return "native";
    } catch { /* fall through */ }
  }

  let shareUrl: string | undefined;
  try {
    const fd = new FormData();
    fd.append("file", blob, o.fileName);
    fd.append("kind", o.kind);
    Object.entries(o.meta || {}).forEach(([k, v]) => fd.append(k, v));
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) shareUrl = (await res.json()).shareUrl;
  } catch { /* blob not configured */ }

  downloadCanvas(o.canvas, o.fileName);
  window.open(tweetUrl(`${o.caption} ${HASHTAGS}`, shareUrl), "_blank", "noopener,noreferrer");
  return shareUrl ? "link" : "download";
}
