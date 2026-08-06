import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="brandmark">
        HACKER HOUSE <span className="dev">गोवा</span>
      </Link>
      <div className="nav-links">
        <Link href="/frame" className="btn btn-ghost btn-sm">PFP Frame</Link>
        <Link href="/id" className="btn btn-yellow btn-sm">Builder ID</Link>
      </div>
    </nav>
  );
}
