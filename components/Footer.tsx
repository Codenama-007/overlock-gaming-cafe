import Link from "next/link";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { BrandLogo } from "@/components/BrandLogo";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Games", href: "/#games" },
  { label: "Pricing", href: "/#pricing" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-oc-blue/20 bg-overclock-black">
      <div
        aria-hidden="true"
        className="oc-grid-bg pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo />
          <p className="mt-4 text-sm leading-relaxed text-oc-text">
            {site.tagline} A gaming café built for performance, competition and
            your squad — in Virar West.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="oc-mono-label">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-oc-text transition-colors hover:text-oc-white hover:[text-shadow:0_0_10px_rgba(0,140,255,0.7)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div aria-label="Contact information">
          <h3 className="oc-mono-label">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={site.phoneLink}
                className="flex items-center gap-2 text-sm text-oc-text transition-colors hover:text-oc-white"
              >
                <Phone className="h-4 w-4 text-electric-blue" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-oc-text transition-colors hover:text-oc-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-blue" />
                <span>
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oc-btn oc-btn--secondary mt-2 !px-4 !py-2 text-xs"
              >
                Get Directions
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>

        <div aria-label="Booking">
          <h3 className="oc-mono-label">Booking</h3>
          <p className="mt-4 text-sm leading-relaxed text-oc-text">
            Reserve your slot and step into a dedicated gaming environment.
          </p>
          <Link href="/booking" className="oc-btn oc-btn--primary mt-5">
            Book a Slot
          </Link>
        </div>
      </div>

      <div className="relative border-t border-oc-blue/20">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-center text-xs text-oc-text sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. {site.tagline}
        </p>
      </div>
    </footer>
  );
}