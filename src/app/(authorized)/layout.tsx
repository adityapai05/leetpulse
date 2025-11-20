import { UserProvider } from "@/context/UserContext";
import { getUserFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default async function AuthorizedLayout({ children, modal }) {
  const user = getUserFromCookies();

  if (!user) {
    redirect("/api/auth/user/logout");
  }

  return (
    <UserProvider>
      <main className="min-h-screen flex flex-col bg-[radial-gradient(at_top_left,var(--bg-1),var(--bg-0))]">
        <Navbar />
        {children}
        {modal}
      </main>
    </UserProvider>
  );
}
