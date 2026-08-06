export const BUILDER_QUOTES = [
  "Ship before you're ready.",
  "Done beats perfect.",
  "Build. Break. Learn.",
  "Talk less, deploy more.",
  "Ideas are cheap. Demos win.",
  "Commit early, commit often.",
  "Make it work, then make it wow.",
  "The best time to ship was yesterday.",
  "Hack the future in Goa.",
  "Small teams, big dents.",
];

export function randomQuote(seed?: number): string {
  const i =
    seed == null
      ? Math.floor(Math.random() * BUILDER_QUOTES.length)
      : seed % BUILDER_QUOTES.length;
  return BUILDER_QUOTES[i];
}
