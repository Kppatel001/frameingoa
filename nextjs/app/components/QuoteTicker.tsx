"use client";
import { useEffect, useState } from "react";
import { BUILDER_QUOTES } from "../lib/quotes";

export default function QuoteTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % BUILDER_QUOTES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return <p className="quote">“{BUILDER_QUOTES[i]}”</p>;
}
