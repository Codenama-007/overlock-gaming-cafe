import { Gauge, Cpu } from "lucide-react";
import { site } from "@/data/site";
import { Facilities } from "@/components/Facilities";

export function About() {
  return (
    <section
      id="about"
      aria-label="About Overclock Gaming Café"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="oc-grid-bg absolute -inset-4"
            />
            <div className="oc-hud-frame relative grid aspect-[4/3] place-items-center overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-oc-deep via-overclock-black to-oc-elevated"
              />
              <div
                aria-hidden="true"
                className="oc-hud-ring oc-hud-ring--dash absolute inset-8 rounded-none border-oc-blue/20"
              />
              <Cpu
                aria-hidden="true"
                className="absolute h-40 w-40 text-oc-blue/10"
              />
              <div className="relative z-10 text-center">
                <Gauge className="mx-auto h-14 w-14 text-oc-orange" strokeWidth={1.4} />
                <p className="oc-display-text mt-4 text-xl font-bold text-oc-white">
                  {site.name}
                </p>
                <p className="oc-mono-label mt-2 text-[10px]">VIRAR WEST · EST. 2026</p>
              </div>
              <span className="oc-mono-label absolute left-4 top-4 text-[10px]">
                {`// OVERCLOCK ZONE`}
              </span>
              <span className="oc-mono-label absolute bottom-4 right-4 text-[10px]">
                SESSION READY
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="oc-section-badge">About the Café</p>
            <h2 className="oc-display-text mt-4 text-3xl font-black text-oc-white sm:text-4xl">
              ABOUT{" "}
              <span className="oc-glow-blue text-electric-blue">OVERCLOCK</span>
            </h2>
            <div className="oc-divider mt-5 w-40" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-oc-text">
              {site.aboutDescription.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="oc-btn oc-btn--secondary mt-8">
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-20">
          <Facilities />
        </div>
      </div>
    </section>
  );
}