// Unique-ish builder ID: HHG-2026-#### (4 digits).
export function makeBuilderId(seedStr?: string): string {
  let n: number;
  if (seedStr && seedStr.trim()) {
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) | 0;
    n = Math.abs(h) % 9000 + 1000;
  } else {
    n = Math.floor(1000 + Math.random() * 9000);
  }
  return `HHG-2026-${n}`;
}
