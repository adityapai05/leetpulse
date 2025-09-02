import { getUserFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default async function AuthorizedLayout({ children }) {
  const user = getUserFromCookies();

  if (!user) {
    redirect("/api/auth/user/logout");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(at_top_left,var(--bg-1),var(--bg-0))]">
      <Navbar />
      {children}
    </main>
  );
}
