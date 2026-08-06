# FrameInGoa — HH Goa 2026 Builder Identity Platform

A premium, no-login web app for the **Hacker House Goa 2026** shortlisting task.
Multi-step flow: Welcome → Details → Stack → Photo → Theme → Review → animated
loading → reveal of a themed **Builder Card** (or **PFP Frame**), with download and
Share-to-X (**#FrameInGoa**).

## Two versions in this repo
- **`index.html`** — the full single-file app (deploys as a static site; no build).
  Ten themes, drag/zoom/brightness photo tools, builder titles, QR, builder number,
  "Builder Story" badge, confetti. Open it directly or deploy to any static host.
- **`nextjs/`** — the richer Next.js 14 project (real scannable QR + dynamic OG
  share previews). `cd nextjs && npm install && npm run dev`.

## Deploy the static app on Vercel
Vercel → **Add New → Project → import this repo**. It auto-detects a static site and
serves `index.html`. Then **Settings → Deployment Protection → disable Vercel
Authentication** so the URL is public.

*Fan-made; branding inspired by the Hacker House Goa mark. #FrameInGoa*
