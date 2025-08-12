import { getUserFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function AuthorizedLayout({ children }) {
  const user = getUserFromCookies();

  // If user is not authenticated, redirect to landing page
  if (!user) {
    redirect("/");
  }

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
