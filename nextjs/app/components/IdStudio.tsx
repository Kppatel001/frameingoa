"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import { ID_W, ID_H, renderId } from "../lib/idRenderer";
import { ensureFonts } from "../lib/fonts";
import { generateFunTitle } from "../lib/titles";
import { makeBuilderId } from "../lib/builderId";
import { randomQuote } from "../lib/quotes";
import { makeQrImage } from "../lib/qr";
import { downloadCanvas, shareToX } from "../lib/share";
import { burst } from "../lib/confetti";
import { bumpCounter } from "../lib/stats-client";

export default function IdStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const qrRef = useRef<HTMLImageElement | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [github, setGithub] = useState("");
  const [xh, setXh] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [seed, setSeed] = useState(0);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const builderId = useMemo(() => makeBuilderId(name || "builder"), [name]);
  const quote = useMemo(() => randomQuote(builderId.length + name.length), [builderId, name]);

  useEffect(() => {
    if (!titleTouched) setTitle(generateFunTitle(role, seed));
  }, [role, seed, titleTouched]);

  const draw = useCallback(async () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    await ensureFonts();
    renderId(ctx, {
      photo: photoRef.current, name, role, city,
      title: title || generateFunTitle(role, seed),
      github, x: xh, linkedin, builderId, quote, qr: qrRef.current,
    });
  }, [name, role, city, title, seed, github, xh, linkedin, builderId, quote]);

  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => { draw(); }, [draw]);

  // (re)generate QR only when the builder id changes, then redraw once.
  useEffect(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://frameingoa.app";
    let alive = true;
    makeQrImage(`${origin}/?ref=${builderId}`)
      .then((img) => { if (alive) { qrRef.current = img; drawRef.current(); } })
      .catch(() => {});
    return () => { alive = false; };
  }, [builderId]);

  const onCropped = useCallback((canvas: HTMLCanvasElement) => {
    photoRef.current = canvas; setHasPhoto(true); draw();
  }, [draw]);

  const canGo = hasPhoto && name.trim().length > 0;
  const caption = `🚀 Just minted my HH Goa 2026 Builder Card — ${title || "Builder"}! Ready to build, hack, and innovate in Goa.`;

  const onDownload = async () => {
    await draw();
    if (canvasRef.current) downloadCanvas(canvasRef.current, `HHGoa2026-${builderId}.png`);
    burst(); bumpCounter();
  };
  const onShare = async () => {
    if (!canvasRef.current) return;
    setSharing(true); setNote(null);
    try {
      await draw();
      const how = await shareToX({
        canvas: canvasRef.current, fileName: `HHGoa2026-${builderId}.png`,
        caption, kind: "id",
        meta: { name, title: title || "Builder", id: builderId },
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

        <div style={{ marginTop: 16 }}>
          <div className="field">
            <label>Name <span className="req">*</span></label>
            <input className="input" value={name} maxLength={34}
              placeholder="Ada Lovelace" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="row2">
            <div className="field">
              <label>Role / stack</label>
              <input className="input" value={role} maxLength={40}
                placeholder="AI Engineer" onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="field">
              <label>City</label>
              <input className="input" value={city} maxLength={24}
                placeholder="Bengaluru" onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="title-row" style={{ marginBottom: 14 }}>
            <div className="field">
              <label>Builder title <span style={{ color: "rgba(252,233,168,.5)" }}>(AI-generated)</span></label>
              <input className="input" value={title} maxLength={30}
                placeholder="Prompt Hacker"
                onChange={(e) => { setTitle(e.target.value); setTitleTouched(true); }} />
            </div>
            <button className="btn btn-green btn-sm" title="Re-roll title"
              onClick={() => { setTitleTouched(false); setSeed((s) => s + 1); }}>🎲</button>
          </div>

          <div className="row2">
            <div className="field">
              <label>GitHub</label>
              <input className="input" value={github} maxLength={24}
                placeholder="username" onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="field">
              <label>X</label>
              <input className="input" value={xh} maxLength={24}
                placeholder="handle" onChange={(e) => setXh(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>LinkedIn <span style={{ color: "rgba(252,233,168,.5)" }}>(optional)</span></label>
            <input className="input" value={linkedin} maxLength={30}
              placeholder="in-handle" onChange={(e) => setLinkedin(e.target.value)} />
          </div>
        </div>

        <div className="row2" style={{ marginTop: 6 }}>
          <button className="btn btn-ghost" onClick={onDownload} disabled={!canGo}>⬇ Download</button>
          <button className="btn btn-pink" onClick={onShare} disabled={!canGo || sharing}>
            {sharing ? "Opening…" : "𝕏 Share to X"}
          </button>
        </div>
        {!canGo && <p className="hint">Add a photo and your name to enable download &amp; share.</p>}
        {note && <p className="hint">{note}</p>}
      </section>

      <section className="preview">
        <canvas ref={canvasRef} width={ID_W} height={ID_H} aria-label="Builder ID preview" />
      </section>
    </div>
  );
}
