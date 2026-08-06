import Nav from "../components/Nav";
import FrameStudio from "../components/FrameStudio";

export const metadata = { title: "PFP Frame — HH Goa 2026" };

export default function FramePage() {
  return (
    <>
      <Nav />
      <main className="container">
        <div className="hero" style={{ padding: "26px 0 6px" }}>
          <h1 style={{ fontSize: "clamp(28px,6vw,46px)" }}>
            Your <span className="g">HH Goa</span> profile frame
          </h1>
          <p className="sub">Upload, position, and share a 1080×1080 PFP in seconds.</p>
        </div>
        <FrameStudio />
      </main>
    </>
  );
}
