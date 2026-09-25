import Link from "next/link";
import { Gauge, ArrowRight, Gamepad2 } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Overclock Gaming Café intro"
      className="oc-scanlines relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden="true"
        className="oc-grid-bg pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-oc-blue/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-oc-orange/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="oc-section-badge">{site.name}</p>

          <h1 className="oc-display-text mt-6 text-4xl font-black text-oc-white sm:text-5xl lg:text-6xl">
            PLAY&nbsp;BETTER.
            <br />
            PLAY&nbsp;FASTER.
            <br />
            <span className="oc-glow-orange" data-text="PLAY AT OVERCLOCK.">
              PLAY&nbsp;AT&nbsp;OVERCLOCK.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-oc-text">
            {site.heroDescription}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/booking" className="oc-btn oc-btn--primary">
              Book a Slot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#games" className="oc-btn oc-btn--secondary">
              Explore Games
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 sm:gap-6">
            {[
              { term: "PC & PS5", desc: "Play your way" },
              { term: "Ultra Fast Net", desc: "Zero lag setup" },
              { term: "Esports Ready", desc: "Compete daily" },
            ].map((item) => (
              <div key={item.term} className="border-l border-oc-blue/40 pl-3">
                <dt className="oc-mono-label text-[10px]">{item.desc}</dt>
                <dd className="mt-1 font-heading text-sm font-bold uppercase tracking-wider text-oc-white">
                  {item.term}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden justify-center lg:flex">
          <HeroHud />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="oc-mono-label text-[10px]">Scroll to explore</span>
      </div>
    </section>
  );
}

function HeroHud() {
  return (
    <div
      aria-hidden="true"
      className="relative grid h-[420px] w-[420px] place-items-center"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="oc-speed-line"
          style={{
            left: `${18 + i * 14}%`,
            top: "68%",
            height: `${120 + i * 18}px`,
            animationDelay: `${i * 0.18}s`,
            opacity: 0.5,
          }}
        />
      ))}

      <div className="oc-hud-ring oc-hud-ring--track absolute inset-4 rounded-full" />
      <div className="oc-hud-ring oc-hud-ring--dash absolute inset-10 rounded-full" />
      <div className="oc-hud-ring oc-hud-ring--dash absolute inset-16 rounded-full" />

      <span
        className="oc-hud-dot"
        style={{ top: "-4px", left: "50%", marginLeft: "-5px" }}
      />
      <span
        className="oc-hud-dot"
        style={{
          bottom: "8%",
          left: "-4px",
          background: "#008CFF",
          boxShadow: "0 0 12px rgba(0,140,255,0.9)",
        }}
      />

      <div className="relative grid aspect-square h-60 w-60 place-items-center rounded-full border border-oc-blue/40 bg-oc-surface/80">
        <span className="oc-hud-ping" />
        <div className="relative grid place-items-center">
          <Gauge className="h-16 w-16 text-oc-orange" strokeWidth={1.4} />
          <span className="oc-display-text mt-2 text-2xl font-black text-oc-white">
            OC
          </span>
          <span className="oc-mono-label mt-1 text-[10px] text-oc-success">
            SYSTEM READY
          </span>
        </div>
      </div>

      <span className="absolute -top-2 right-2 grid place-items-center gap-1 border border-oc-blue/40 bg-oc-surface px-3 py-2">
        <Gamepad2 className="h-4 w-4 text-electric-blue" />
        <span className="oc-mono-label text-[9px]">PS5 READY</span>
      </span>
    </div>
  );
}