import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";

type SP = { [k: string]: string | string[] | undefined };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] ?? "" : v ?? "");

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const img = one(searchParams.img);
  const name = one(searchParams.name) || "A builder";
  const title = one(searchParams.title) || "Builder";
  const heading = `${name} · ${title} — HH Goa 2026`;
  const desc = "Framed into HH Goa 2026. Make yours. #FrameInGoa";
  return {
    title: heading,
    description: desc,
    openGraph: { title: heading, description: desc, images: img ? [{ url: img }] : [] },
    twitter: { card: "summary_large_image", title: heading, description: desc, images: img ? [img] : [] },
  };
}

export default function ShareCard({ searchParams }: { searchParams: SP }) {
  const img = one(searchParams.img);
  const name = one(searchParams.name) || "A builder";
  const title = one(searchParams.title) || "Builder";
  const id = one(searchParams.id);

  return (
    <>
      <Nav />
      <main className="container" style={{ textAlign: "center", paddingBottom: 60 }}>
        <div className="hero" style={{ padding: "24px 0 10px" }}>
          <h1 style={{ fontSize: "clamp(26px,6vw,44px)" }}>{name}</h1>
          <p className="sub" style={{ marginBottom: 8 }}>
            {title} · HH Goa 2026 {id ? `· ${id}` : ""}
          </p>
        </div>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={`${name} — HH Goa 2026`}
            style={{ width: "100%", maxWidth: 440, borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,.5)" }} />
        ) : (
          <p className="hint">No card found.</p>
        )}
        <div style={{ marginTop: 26 }}>
          <Link href="/" className="btn btn-yellow">Make your own →</Link>
        </div>
        <div className="foot">Share yours with <b>#FrameInGoa</b></div>
      </main>
    </>
  );
}
