import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-bg2 flex flex-row justify-between px-16 py-4 text-sm">
      <div className="flex flex-row gap-6">
        <Link className="hover:text-accent" href="">
          Review
        </Link>
        <Link className="hover:text-accent" href="/problems/add">
          Add Questions
        </Link>
        <Link className="hover:text-accent" href="">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}
