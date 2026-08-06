import Nav from "../components/Nav";
import IdStudio from "../components/IdStudio";

export const metadata = { title: "Builder ID — HH Goa 2026" };

export default function IdPage() {
  return (
    <>
      <Nav />
      <main className="container">
        <div className="hero" style={{ padding: "26px 0 6px" }}>
          <h1 style={{ fontSize: "clamp(28px,6vw,46px)" }}>
            Your <span className="g">HH Goa</span> builder ID
          </h1>
          <p className="sub">
            Photo, role, an AI builder title, a QR code, and your unique HHG-2026 ID —
            a 1200×1500 badge made to post.
          </p>
        </div>
        <IdStudio />
      </main>
    </>
  );
}
