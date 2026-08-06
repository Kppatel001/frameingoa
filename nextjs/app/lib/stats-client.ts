// Fire-and-forget increment of the global counter (no-op if unconfigured).
export function bumpCounter() {
  try { fetch("/api/stats", { method: "POST" }); } catch {}
}
