// HH Goa 2026 brand tokens — single source of truth.
export const BRAND = {
  green: "#006B3C",
  greenBright: "#12A05C",
  yellow: "#FFD43B",
  pink: "#FF2D7A",
  dark: "#071B12",
  darker: "#04120C",
  white: "#FFFFFF",
  cream: "#FCE9A8",
} as const;

export const EVENT = "HH GOA 2026";
export const HASHTAGS = "#FrameInGoa #HHGoa2026 #BuildInPublic";

export const SITE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  "http://localhost:3000";
