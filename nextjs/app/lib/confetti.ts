export async function burst() {
  try {
    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#FFD43B", "#FF2D7A", "#12A05C", "#FFFFFF"];
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.35 }, colors });
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors }), 150);
  } catch {}
}
