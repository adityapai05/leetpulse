import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export default function Navbar() {
  const navLinks = [
    { id: "whyleetpulse", label: "Why leetpulse?" },
    { id: "howitworks", label: "How it works" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 px-6 md:px-8 lg:px-32 py-4 bg-[var(--glass-bg)] backdrop-blur-md border-b border-border">
      <MobileNavbar navLinks={navLinks} />
      <DesktopNavbar navLinks={navLinks} />
    </nav>
  );
}
