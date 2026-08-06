export async function ensureFonts(): Promise<void> {
  if (typeof document === "undefined" || !(document as any).fonts) return;
  const f = (document as any).fonts;
  const jobs = [
    '900 80px "Playfair Display"',
    '700 60px "Playfair Display"',
    '700 40px "Space Grotesk"',
    '500 32px "Space Grotesk"',
    '700 34px "Noto Sans Devanagari"',
  ].map((x: string) => f.load(x).catch(() => {}));
  try { await Promise.all(jobs); await f.ready; } catch {}
}
