import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg0 flex flex-col gap-16 justify-center text-sm text-text_muted px-16 py-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <a href="#features" className="text-3xl font-bold text-text_primary">
            leetpulse
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Quick Links
          </span>
          <Link className="hover:text-accent" href="#whyleetpulse">
            Why leetpulse?
          </Link>
          <Link className="hover:text-accent" href="#howitworks">
            How it works
          </Link>
          <Link className="hover:text-accent" href="#pricing">
            Pricing
          </Link>
          <Link className="hover:text-accent" href="#about">
            About
          </Link>
        </div>
        <div className="flex flex-col gap-4">
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
          <a href="#pricing" className="hover:text-accent">
            Instagram
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Contact
          </span>
          <a href="#features" className="hover:text-accent">
            contact@leetpulse.com
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-text_primary font-semibold text-lg">
            Legal links
          </span>
          <a href="#features" className="hover:text-accent">
            Terms of service
          </a>
          <a href="#features" className="hover:text-accent">
            Privacy policy
          </a>
        </div>
      </div>
      <div className="text-text_primary">
        &copy; {new Date().getFullYear()}, leetpulse &middot; v1.0.0
      </div>
    </footer>
  );
}
