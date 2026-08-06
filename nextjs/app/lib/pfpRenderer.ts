import { BRAND } from "./brand";

export const PFP_SIZE = 1080;
type Photo = HTMLImageElement | HTMLCanvasElement | null;

function arcText(
  ctx: CanvasRenderingContext2D, str: string, cx: number, cy: number,
  r: number, centerAngle: number, dir: 1 | -1, spacing = 0
) {
  const chars = [...str];
  const widths = chars.map((c) => ctx.measureText(c).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0);
  let angle = centerAngle - (dir * total) / r / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < chars.length; i++) {
    const wAng = widths[i] / r;
    angle += (dir * wAng) / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + (dir > 0 ? Math.PI / 2 : -Math.PI / 2));
    ctx.fillText(chars[i], 0, 0);
    ctx.restore();
    angle += (dir * wAng) / 2;
  }
}

function cover(
  ctx: CanvasRenderingContext2D, img: Photo, cx: number, cy: number, r: number
) {
  if (!img) return;
  const iw = (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width;
  const ih = (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;
  if (!iw || !ih) return;
  const s = Math.max((r * 2) / iw, (r * 2) / ih);
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, cx - (iw * s) / 2, cy - (ih * s) / 2, iw * s, ih * s);
  ctx.restore();
}

export function renderPfp(ctx: CanvasRenderingContext2D, photo: Photo) {
  const S = PFP_SIZE, C = S / 2;

  // backdrop
  const bg = ctx.createRadialGradient(C, C * 0.8, 80, C, C, S * 0.72);
  bg.addColorStop(0, "#0C2A1B");
  bg.addColorStop(1, BRAND.darker);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);

  // corner Goa wave motif
  ctx.strokeStyle = "rgba(18,160,92,0.22)";
  ctx.lineWidth = 3;
  for (let k = 0; k < 4; k++) {
    ctx.beginPath();
    for (let x = 0; x <= S; x += 14)
      ctx.lineTo(x, S * (0.9 + k * 0.03) + Math.sin((x / S) * Math.PI * 5 + k) * 14);
    ctx.stroke();
  }

  const rOuter = 500, rText = 470, rPhoto = 396;

  // ring band
  ctx.save();
  ctx.beginPath();
  ctx.arc(C, C, rOuter, 0, Math.PI * 2);
  ctx.arc(C, C, rPhoto + 6, 0, Math.PI * 2, true);
  const ring = ctx.createLinearGradient(0, 0, S, S);
  ring.addColorStop(0, BRAND.green);
  ring.addColorStop(0.5, "#0B7A45");
  ring.addColorStop(1, BRAND.green);
  ctx.fillStyle = ring;
  ctx.fill("evenodd");
  ctx.restore();

  // neon accent arcs (pink + yellow)
  ctx.lineCap = "round";
  ctx.strokeStyle = BRAND.pink;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(C, C, rOuter - 4, Math.PI * 0.08, Math.PI * 0.42);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(C, C, rOuter - 4, Math.PI * 1.08, Math.PI * 1.42);
  ctx.stroke();
  ctx.strokeStyle = BRAND.yellow;
  ctx.beginPath();
  ctx.arc(C, C, rOuter - 4, Math.PI * 0.58, Math.PI * 0.92);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(C, C, rOuter - 4, Math.PI * 1.58, Math.PI * 1.92);
  ctx.stroke();

  // outline rings
  ctx.strokeStyle = BRAND.yellow;
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(C, C, rOuter, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(C, C, rPhoto + 6, 0, Math.PI * 2); ctx.stroke();

  // photo
  if (photo) {
    cover(ctx, photo, C, C, rPhoto);
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath(); ctx.arc(C, C, rPhoto, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = BRAND.cream;
    ctx.font = '500 40px "Space Grotesk"';
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("Your photo", C, C);
  }

  // curved text
  ctx.fillStyle = BRAND.yellow;
  ctx.font = '900 46px "Playfair Display"';
  arcText(ctx, "HACKER HOUSE  •  GOA 2026", C, C, rText, -Math.PI / 2, 1, 2);

  ctx.fillStyle = BRAND.white;
  ctx.font = '700 30px "Space Grotesk"';
  arcText(ctx, "BUILDER • HACKER • CREATOR • INNOVATOR", C, C, rText, Math.PI / 2, -1, 3);

  // गोवा badge at bottom center overlapping ring
  const bw = 168, bh = 60, bx = C - bw / 2, by = C + rPhoto - 4;
  ctx.fillStyle = BRAND.pink;
  roundRect(ctx, bx, by, bw, bh, 30); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 2;
  roundRect(ctx, bx, by, bw, bh, 30); ctx.stroke();
  ctx.fillStyle = BRAND.white;
  ctx.font = '700 36px "Noto Sans Devanagari"';
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("गोवा", C, by + bh / 2 + 2);
}

function roundRect(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number
) {
  const m = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + m, y);
  ctx.arcTo(x + w, y, x + w, y + h, m);
  ctx.arcTo(x + w, y + h, x, y + h, m);
  ctx.arcTo(x, y + h, x, y, m);
  ctx.arcTo(x, y, x + w, y, m);
  ctx.closePath();
}
