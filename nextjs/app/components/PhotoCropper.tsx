"use client";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { fileToCropSource, cropToCanvas, type Area } from "../lib/image";

export default function PhotoCropper({
  shape = "round",
  onCropped,
}: {
  shape?: "round" | "rect";
  onCropped: (canvas: HTMLCanvasElement) => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(null);
    setBusy(true);
    try {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const { url: u, image } = await fileToCropSource(f);
      urlRef.current = u;
      imgRef.current = image;
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setUrl(u);
    } catch {
      setErr("Couldn't read that image. Try a JPG or PNG.");
    } finally {
      setBusy(false);
    }
  };

  const onComplete = useCallback(
    (_area: Area, pixels: Area) => {
      if (!imgRef.current) return;
      const canvas = cropToCanvas(imgRef.current, pixels, shape === "round" ? 900 : 1000);
      onCropped(canvas);
    },
    [onCropped, shape]
  );

  return (
    <div>
      {!url && (
        <label className="uploadbox">
          <input
            type="file"
            accept="image/*,.heic,.heif"
            onChange={onFile}
            hidden
          />
          <span style={{ fontSize: 28 }}>📸</span>
          <span style={{ color: "var(--yellow)", fontWeight: 700 }}>
            {busy ? "Loading photo…" : "Upload your photo"}
          </span>
          <span style={{ color: "rgba(234,255,243,.6)", fontSize: 13 }}>
            JPG · PNG · WEBP · HEIC
          </span>
        </label>
      )}

      {url && (
        <>
          <div className="crop-area">
            <Cropper
              image={url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape={shape}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onComplete}
            />
          </div>
          <div className="crop-controls">
            <span style={{ fontSize: 13, color: "var(--cream)" }}>Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <label className="btn btn-ghost btn-sm" style={{ cursor: "pointer" }}>
              <input type="file" accept="image/*,.heic,.heif" onChange={onFile} hidden />
              Change
            </label>
          </div>
        </>
      )}
      {err && <p className="err">{err}</p>}
    </div>
  );
}
