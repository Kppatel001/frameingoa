# FrameInGoa — HH Goa 2026 Frame & Builder ID generator

A viral, no-login social tool for the **Hacker House Goa 2026** shortlisting task.
Upload a photo and instantly get a branded, share-ready graphic — either a **PFP frame**
(Format A) or a **Builder ID card** (Format B). Mobile-first, fast, and built to be posted
on X with **#FrameInGoa**.

Live flow: pick a format → upload + position photo (drag & zoom) → it renders instantly on a
`<canvas>` → **Download HD PNG** or **Share to X** (caption + hashtags pre-filled). No signup, one pass.

## What's inside

**Format A — PFP Frame (1080×1080)**
Circular photo wrapped in an HH Goa ring: curved event text (`HACKER HOUSE · GOA 2026`,
`BUILDER · HACKER · CREATOR · INNOVATOR`), neon pink/yellow accent arcs, the **गोवा** badge,
and a Goa wave motif. Drag + zoom to position the face inside the ring.

**Format B — Builder ID (1200×1500)**
Premium event badge: circular photo, name, role, city, a **fun AI builder title**
(re-rollable — e.g. `AI Engineer → Prompt Hacker`, `Full-Stack → Code Architect`), a
**role-based dynamic background** (neural / matrix / creative / startup / campus / goa),
GitHub · X · LinkedIn handles, a builder quote, a **QR code**, a unique **HHG-2026-####** ID,
and the "Hacking Goa's Future" badge.

**Shared**
- HEIC (iPhone) + JPG/PNG/WEBP support; any aspect ratio via crop.
- Instant client-side canvas rendering (no server round-trip).
- Share to X: native share sheet (attaches the image) → link with **dynamic OG image**
  (preview shows the real card) → download + composer fallback. Always works.
- Confetti on generate, live "builders framed" counter, rotating builder quotes.

## Tech
Next.js 14 (App Router) · TypeScript · Tailwind · `react-easy-crop` · `qrcode` ·
`canvas-confetti` · `heic2any` · `@vercel/blob`.

## Run locally
```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

## Deploy to Vercel
1. Push to GitHub → import on Vercel (framework auto-detected).
2. Set **`NEXT_PUBLIC_SITE_URL`** = your deployment URL (no trailing slash).
3. Optional: add a **Blob** store (Storage tab) → enables share *links* whose X preview is the
   real card (dynamic OG). Token is injected automatically.
4. Optional: add **Upstash KV/Redis** → the "builders framed" counter becomes a real global count.
   Without it the counter runs in-memory per instance.

The tool is fully functional with **zero** optional config — users just download the PNG and
attach it to the tweet (X's native image post).

## Design decisions (deliberate, for reliability + speed)
- **Positioning instead of in-browser face detection.** A fast drag-and-zoom crop (`react-easy-crop`)
  reliably centers any face across all photos, with no heavy ML model to download or misfire.
- **Dynamic gradient backgrounds instead of a background-removal wasm bundle.** Keeps first render
  under a second and the bundle small; the photo sits in a clean circular frame. (A background-removal
  step can be dropped into `lib/backgrounds.ts` / the crop pipeline later if desired.)
- **Query-param share page instead of a database.** `/c?img=…` carries the uploaded card URL and
  sets per-share OG tags — real link previews with no DB to run.

## Structure
```
app/
  page.tsx                 home (hero, two CTAs, features, counter, quotes)
  frame/page.tsx           Format A page  → components/FrameStudio
  id/page.tsx              Format B page  → components/IdStudio
  c/page.tsx               share landing + dynamic OG image
  api/upload/route.ts      PNG → Vercel Blob → share URL
  api/stats/route.ts       live counter (KV-backed, in-memory fallback)
  components/              Nav, PhotoCropper, FrameStudio, IdStudio, LiveCounter, QuoteTicker
  lib/                     brand, pfpRenderer, idRenderer, backgrounds, titles, qr,
                           image, share, confetti, builderId, quotes, fonts
```

## Submission checklist
- [ ] Deployed live link loads on mobile.
- [ ] Both formats generate in a couple of seconds.
- [ ] Download produces a real PNG (1080×1080 / 1200×1500).
- [ ] Share opens X with caption + **#FrameInGoa**.
- [ ] Post the result on X **containing #FrameInGoa** (required — missing it = invalid).
- [ ] One submission per team.

*Fan-made tool; branding inspired by the HH Goa mark. Not officially affiliated.*
