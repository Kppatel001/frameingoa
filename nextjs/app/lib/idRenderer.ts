import { BRAND } from "./brand";
import { paintBackground, styleForRole } from "./backgrounds";

export const ID_W = 1200;
export const ID_H = 1500;
type Img = HTMLImageElement | HTMLCanvasElement | null;

export interface IdData {
  photo: Img;
  name: string;
  role: string;
  city: string;
  title: string;
  github?: string;
  x?: string;
  linkedin?: string;
  builderId: string;
  quote: string;
  qr: HTMLImageElement | null;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const m = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + m, y);
  ctx.arcTo(x + w, y, x + w, y + h, m);
  ctx.arcTo(x + w, y + h, x, y + h, m);
  ctx.arcTo(x, y + h, x, y, m);
  ctx.arcTo(x, y, x + w, y, m);
  ctx.closePath();
}

function coverCircle(ctx: CanvasRenderingContext2D, img: Img, cx: number, cy: number, r: number) {
  if (!img) return;
  const iw = (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width;
  const ih = (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;
  if (!iw || !ih) return;
  const s = Math.max((r * 2) / iw, (r * 2) / ih);
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
  ctx.drawImage(img, cx - (iw * s) / 2, cy - (ih * s) / 2, iw * s, ih * s);
  ctx.restore();
}

function fit(ctx: CanvasRenderingContext2D, t: string, mw: number, wt: string, fam: string, start: number, min: number) {
  let s = start; ctx.font = `${wt} ${s}px ${fam}`;
  while (ctx.measureText(t).width > mw && s > min) { s -= 2; ctx.font = `${wt} ${s}px ${fam}`; }
  return s;
}

function spaced(ctx: CanvasRenderingContext2D, t: string, cx: number, y: number, sp: number) {
  const a = [...t]; let tot = 0;
  for (const c of a) tot += ctx.measureText(c).width + sp;
  tot -= sp; let x = cx - tot / 2;
  const pa = ctx.textAlign; ctx.textAlign = "left";
  for (const c of a) { ctx.fillText(c, x, y); x += ctx.measureText(c).width + sp; }
  ctx.textAlign = pa;
}

export function renderId(ctx: CanvasRenderingContext2D, d: IdData) {
  const W = ID_W, H = ID_H, C = W / 2;
  paintBackground(ctx, W, H, styleForRole(d.role));

  // frame
  ctx.strokeStyle = "rgba(255,212,59,0.55)"; ctx.lineWidth = 3;
  rrect(ctx, 26, 26, W - 52, H - 52, 40); ctx.stroke();

  ctx.textBaseline = "alphabetic"; ctx.textAlign = "center";

  // header wordmark
  ctx.fillStyle = BRAND.yellow;
  ctx.font = '900 64px "Playfair Display"';
  spaced(ctx, "HACKER HOUSE", C, 130, 3);
  const bw = 168, bh = 60, bx = C - bw / 2, by = 150;
  ctx.fillStyle = BRAND.pink; rrect(ctx, bx, by, bw, bh, 30); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 2; rrect(ctx, bx, by, bw, bh, 30); ctx.stroke();
  ctx.fillStyle = BRAND.white; ctx.font = '700 36px "Noto Sans Devanagari"';
  ctx.textAlign = "center"; ctx.fillText("गोवा", C, by + 43);
  ctx.fillStyle = BRAND.cream; ctx.font = '700 26px "Space Grotesk"';
  spaced(ctx, "2026   ·   BUILDER PASS", C, 262, 4);

  // photo circle
  const pr = 250, pcy = 560;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 12;
  ctx.fillStyle = BRAND.dark; ctx.beginPath(); ctx.arc(C, pcy, pr + 12, 0, 7); ctx.fill();
  ctx.restore();
  if (d.photo) coverCircle(ctx, d.photo, C, pcy, pr);
  else {
    ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.beginPath(); ctx.arc(C, pcy, pr, 0, 7); ctx.fill();
    ctx.fillStyle = BRAND.cream; ctx.font = '500 34px "Space Grotesk"';
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Your photo", C, pcy);
    ctx.textBaseline = "alphabetic";
  }
  ctx.strokeStyle = BRAND.yellow; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(C, pcy, pr, 0, 7); ctx.stroke();
  ctx.strokeStyle = BRAND.pink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(C, pcy, pr + 12, 0, 7); ctx.stroke();

  // name
  const name = (d.name || "Your Name").trim().slice(0, 34);
  ctx.textAlign = "center";
  const ns = fit(ctx, name, 1000, "900", '"Playfair Display"', 88, 44);
  ctx.fillStyle = BRAND.yellow; ctx.font = `900 ${ns}px "Playfair Display"`;
  ctx.fillText(name, C, 920);

  // role + city
  const rc = [d.role, d.city].filter(Boolean).join("  ·  ").slice(0, 52);
  if (rc) {
    ctx.fillStyle = BRAND.white; ctx.font = '500 34px "Space Grotesk"';
    ctx.fillText(rc, C, 972);
  }

  // title pill
  const t = (d.title || "Builder").toUpperCase().slice(0, 30);
  ctx.font = '700 34px "Space Grotesk"';
  const tw = ctx.measureText(t).width, pw = tw + 72, ph = 66, plx = C - pw / 2, ply = 1010;
  const pg = ctx.createLinearGradient(plx, 0, plx + pw, 0);
  pg.addColorStop(0, BRAND.pink); pg.addColorStop(1, "#FF5E9C");
  ctx.fillStyle = pg; rrect(ctx, plx, ply, pw, ph, 33); ctx.fill();
  ctx.fillStyle = BRAND.white; ctx.fillText(t, C, ply + 45);

  // quote
  if (d.quote) {
    ctx.fillStyle = "rgba(252,233,168,0.85)"; ctx.font = 'italic 500 30px "Space Grotesk"';
    ctx.fillText(`"${d.quote}"`, C, 1140);
  }

  // socials
  const socials = [
    d.github ? `gh/${d.github.replace(/^@/, "")}` : "",
    d.x ? `x/${d.x.replace(/^@/, "")}` : "",
    d.linkedin ? `in/${d.linkedin.replace(/^@/, "")}` : "",
  ].filter(Boolean).join("     ");
  if (socials) {
    ctx.fillStyle = BRAND.greenBright; ctx.font = '500 28px "Space Grotesk"';
    ctx.fillText(socials, C, 1196);
  }

  // bottom band
  const bandY = 1250;
  ctx.fillStyle = "rgba(255,255,255,0.05)"; rrect(ctx, 60, bandY, W - 120, 190, 24); ctx.fill();
  ctx.strokeStyle = "rgba(255,212,59,0.3)"; ctx.lineWidth = 2; rrect(ctx, 60, bandY, W - 120, 190, 24); ctx.stroke();

  // QR
  const qs = 150, qx = 96, qy = bandY + 20;
  if (d.qr) {
    ctx.fillStyle = BRAND.yellow; rrect(ctx, qx - 8, qy - 8, qs + 16, qs + 16, 14); ctx.fill();
    ctx.drawImage(d.qr, qx, qy, qs, qs);
  }

  // ID + badge (right of QR)
  const tx = qx + qs + 44;
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = '500 24px "Space Grotesk"';
  ctx.fillText("BUILDER ID", tx, bandY + 52);
  ctx.fillStyle = BRAND.yellow; ctx.font = '700 44px "Space Grotesk"';
  ctx.fillText(d.builderId, tx, bandY + 100);
  ctx.fillStyle = BRAND.pink; ctx.font = '900 30px "Playfair Display"';
  ctx.fillText("Hacking Goa's Future", tx, bandY + 150);

  // footer hashtag
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(252,233,168,0.7)"; ctx.font = '700 26px "Space Grotesk"';
  ctx.fillText("#FrameInGoa", C, H - 46);
}
