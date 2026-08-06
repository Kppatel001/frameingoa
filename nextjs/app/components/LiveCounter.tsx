"use client";
import { useEffect, useState } from "react";

export default function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { if (alive) setCount(typeof d.count === "number" ? d.count : 0); })
      .catch(() => { if (alive) setCount(0); });
    return () => { alive = false; };
  }, []);

  const shown = count == null ? "—" : count.toLocaleString();
  return (
    <div className="glass" style={{ padding: "14px 22px", textAlign: "center" }}>
      <div className="counter">
        {shown}
        <small>builders framed</small>
      </div>
    </div>
  );
}
