import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ring-2 ring-bg2 bg-bg0 flex flex-col md:flex-col lg:flex-col gap-12 md:gap-16 justify-center text-sm text-text_muted px-6 md:px-32 py-8">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
        {/* Logo */}
        <div className="flex flex-col items-start md:items-start gap-4">
          <Link href="/" className="text-3xl font-bold text-text_primary">
            leetpulse
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Social Media
          </span>
          <Link
            href="https://www.youtube.com/@leetpulse"
            target="_blank"
            className="hover:text-accent"
          >
            Youtube
          </Link>
          <Link
            href="https://www.instagram.com/leetpulse"
            target="_blank"
            className="hover:text-accent"
          >
            Instagram
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Contact
          </span>
          <span className="text-text_primary">leetpulse@gmail.com</span>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Legal links
          </span>
          <Link href="/terms" className="hover:text-accent">
            Terms of service
          </Link>
          <Link href="/privacy" className="hover:text-accent">
            Privacy policy
          </Link>
        </div>
      </div>

      <div className="text-center text-text_primary mt-8">
        &copy; {new Date().getFullYear()}, leetpulse &middot; v1.0.0
      </div>
    </footer>
  );
}
