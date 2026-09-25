import Image from "next/image";
import Link from "next/link";
import { Gauge } from "lucide-react";
import { site, logo } from "@/data/site";

export function BrandLogo({ withName = true }: { withName?: boolean }) {
  if (logo.enabled) {
    return (
      <Link
        href="/"
        aria-label={`${site.name} — home`}
        className="flex items-center gap-3"
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={44}
          height={44}
          priority
          className="h-11 w-11 object-contain"
        />
        {withName && (
          <span className="oc-display-text text-sm font-bold text-oc-white">
            {site.name.split(" Gaming ")[0]}
            <span className="block text-[11px] font-semibold tracking-[0.34em] text-electric-blue">
              GAMING CAFÉ
            </span>
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="flex items-center gap-3"
    >
      <span className="relative grid h-11 w-11 place-items-center border border-oc-blue/50 bg-oc-surface">
        <span className="absolute inset-0 -z-0 border-b-2 border-r-2 border-oc-orange/80" />
        <Gauge className="relative z-10 h-6 w-6 text-oc-orange" strokeWidth={1.8} />
      </span>
      {withName && (
        <span className="oc-display-text text-sm font-bold tracking-[0.12em] text-oc-white">
          OVERCLOCK
          <span className="block text-[10px] font-semibold tracking-[0.34em] text-electric-blue">
            GAMING CAFÉ
          </span>
        </span>
      )}
    </Link>
  );
}