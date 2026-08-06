// Role-driven dynamic backgrounds for the Builder ID card.
import { BRAND } from "./brand";

export type BgStyle =
  | "neural" | "matrix" | "creative" | "startup" | "campus" | "goa";

export function styleForRole(role: string): BgStyle {
  const r = (role || "").toLowerCase();
  if (/\b(ai|ml|machine|deep|llm|nlp|prompt|data|neural)\b/.test(r)) return "neural";
  if (/\b(security|cyber|infosec|pentest|hack)\b/.test(r)) return "matrix";
  if (/\b(design|ux|ui|creative|figma|artist)\b/.test(r)) return "creative";
  if (/\b(founder|ceo|cto|product|pm|startup|business)\b/.test(r)) return "startup";
  if (/\b(student|learning|beginner|fresher|campus)\b/.test(r)) return "campus";
  return "goa";
}

// Paints a full-card background into ctx across (0,0,w,h).
export function paintBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  style: BgStyle
) {
  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, BRAND.dark);
  base.addColorStop(1, BRAND.darker);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  switch (style) {
    case "neural": neural(ctx, w, h); break;
    case "matrix": matrix(ctx, w, h); break;
    case "creative": creative(ctx, w, h); break;
    case "startup": startup(ctx, w, h); break;
    case "campus": campus(ctx, w, h); break;
    default: goa(ctx, w, h);
  }
  ctx.restore();

  // universal vignette + top glow
  const glow = ctx.createRadialGradient(w / 2, h * 0.22, 40, w / 2, h * 0.22, w);
  glow.addColorStop(0, "rgba(18,160,92,0.28)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
}

function neural(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const nodes: [number, number][] = [];
  for (let i = 0; i < 26; i++)
    nodes.push([Math.random() * w, Math.random() * h]);
  ctx.strokeStyle = "rgba(18,160,92,0.18)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]);
      if (d < 260) {
        ctx.beginPath();
        ctx.moveTo(nodes[i][0], nodes[i][1]);
        ctx.lineTo(nodes[j][0], nodes[j][1]);
        ctx.stroke();
      }
    }
  for (const [x, y] of nodes) {
    ctx.fillStyle = BRAND.yellow;
    ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function matrix(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.font = '600 22px monospace';
  ctx.fillStyle = "rgba(18,160,92,0.16)";
  const glyphs = "01<>[]{}#$@";
  for (let x = 20; x < w; x += 34)
    for (let y = 40; y < h; y += 40)
      ctx.fillText(glyphs[(x + y) % glyphs.length], x, y);
}

function creative(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const blobs: [number, number, number, string][] = [
    [w * 0.2, h * 0.3, 260, BRAND.pink],
    [w * 0.85, h * 0.5, 300, BRAND.greenBright],
    [w * 0.5, h * 0.8, 240, BRAND.yellow],
  ];
  for (const [x, y, r, c] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(c, 0.35));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
}

function startup(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = "rgba(255,212,59,0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  ctx.strokeStyle = hexA(BRAND.greenBright, 0.5);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.85);
  for (let x = 0; x <= w; x += w / 6) ctx.lineTo(x, h * 0.85 - (x / w) * h * 0.5);
  ctx.stroke();
}

function campus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = hexA(BRAND.yellow, Math.random() * 0.4 + 0.1);
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2.5 + 1, 0, 7);
    ctx.fill();
  }
}

function goa(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = hexA(BRAND.greenBright, 0.35);
  ctx.lineWidth = 3;
  for (let k = 0; k < 4; k++) {
    ctx.beginPath();
    const yb = h * (0.78 + k * 0.05);
    for (let x = 0; x <= w; x += 12)
      ctx.lineTo(x, yb + Math.sin((x / w) * Math.PI * 4 + k) * 16);
    ctx.stroke();
  }
}

function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
