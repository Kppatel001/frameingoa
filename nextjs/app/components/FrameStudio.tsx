"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import { PFP_SIZE, renderPfp } from "../lib/pfpRenderer";
import { ensureFonts } from "../lib/fonts";
import { downloadCanvas, shareToX } from "../lib/share";
import { burst } from "../lib/confetti";
import { bumpCounter } from "../lib/stats-client";

const CAPTION = "🚀 Framed myself into HH Goa 2026 — ready to build, hack, and innovate in Goa.";

export default function FrameStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const draw = useCallback(async () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    await ensureFonts();
    renderPfp(ctx, photoRef.current);
  }, []);

  useEffect(() => { draw(); }, [draw]);

  const onCropped = useCallback((canvas: HTMLCanvasElement) => {
    photoRef.current = canvas;
    setHasPhoto(true);
    draw();
  }, [draw]);

  const onDownload = async () => {
    await draw();
    if (canvasRef.current) downloadCanvas(canvasRef.current, "HHGoa2026-PFP.png");
    burst(); bumpCounter();
  };

  const onShare = async () => {
    if (!canvasRef.current) return;
    setSharing(true); setNote(null);
    try {
      await draw();
      const how = await shareToX({
        canvas: canvasRef.current, fileName: "HHGoa2026-PFP.png",
        caption: CAPTION, kind: "frame",
      });
      burst(); bumpCounter();
      if (how === "download") setNote("Image downloaded — attach it to your tweet, then post with #FrameInGoa.");
    } catch { setNote("Couldn't open share. Use Download, then attach it."); }
    finally { setSharing(false); }
  };

  return (
    <div className="studio">
      <section className="glass panel">
        <PhotoCropper shape="round" onCropped={onCropped} />
        <div className="row2" style={{ marginTop: 18 }}>
          <button className="btn btn-ghost" onClick={onDownload} disabled={!hasPhoto}>⬇ Download</button>
          <button className="btn btn-pink" onClick={onShare} disabled={!hasPhoto || sharing}>
            {sharing ? "Opening…" : "𝕏 Share to X"}
          </button>
        </div>
        {!hasPhoto && <p className="hint">Upload a photo to enable download &amp; share.</p>}
        {note && <p className="hint">{note}</p>}
      </section>
      <section className="preview">
        <canvas ref={canvasRef} width={PFP_SIZE} height={PFP_SIZE} aria-label="PFP frame preview" />
      </section>
    </div>
  );
}
