import Link from "next/link";
import Nav from "./components/Nav";
import LiveCounter from "./components/LiveCounter";
import QuoteTicker from "./components/QuoteTicker";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="container">
        <section className="hero">
          <span className="pill">No signup · Instant · Mobile-first</span>
          <h1>
            Frame Yourself Into <span className="g">HH Goa 2026</span>
          </h1>
          <p className="sub">
            Create your HH Goa profile frame or builder ID card in seconds and share it
            with the world. Built for hackers, founders, and creators heading to Goa.
          </p>
          <div className="cta">
            <Link href="/frame" className="btn btn-pink">Create PFP Frame</Link>
            <Link href="/id" className="btn btn-yellow">Create Builder ID</Link>
          </div>
          <div className="features">
            <span><i className="check">✓</i> No signup required</span>
            <span><i className="check">✓</i> Instant generation</span>
            <span><i className="check">✓</i> Mobile friendly</span>
            <span><i className="check">✓</i> Share directly to X</span>
            <span><i className="check">✓</i> Download HD image</span>
          </div>
        </section>

        <section className="opts">
          <Link href="/frame" className="glass opt">
            <div className="ic">🖼️</div>
            <h3>PFP Frame</h3>
            <p>
              Wrap your photo in an HH Goa 2026 ring — neon accents, curved event text, and
              the गोवा badge. A ready-to-use X profile picture at 1080×1080.
            </p>
            <span className="btn btn-ghost btn-sm">Create PFP Frame →</span>
          </Link>
          <Link href="/id" className="glass opt">
            <div className="ic">🪪</div>
            <h3>Builder ID</h3>
            <p>
              A premium event badge with your photo, a fun AI builder title, a role-based
              background, a QR code, and a unique HHG-2026 ID. Made to post, not print.
            </p>
            <span className="btn btn-ghost btn-sm">Create Builder ID →</span>
          </Link>
        </section>

        <section className="stripe">
          <LiveCounter />
          <QuoteTicker />
        </section>

        <div className="foot">
          Not affiliated with the official event · a fan-made tool · share with{" "}
          <b>#FrameInGoa</b>
        </div>
      </main>
    </>
  );
}
