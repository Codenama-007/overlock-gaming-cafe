import Link from "next/link";
import { Info } from "lucide-react";
import { pricingPlans } from "@/data/pricing";
import { PricingCard } from "@/components/PricingCard";
import type { PricingPlan } from "@/lib/types";

function ComingSoon() {
  return (
    <div className="oc-hud-frame mx-auto mt-12 max-w-2xl p-10 text-center">
      <Info className="mx-auto h-10 w-10 text-oc-orange" />
      <p className="oc-display-text mt-5 text-2xl font-bold text-oc-white">
        PRICING COMING SOON
      </p>
      <p className="mx-auto mt-3 max-w-md text-oc-text">
        Our session plans are being finalized. Book a slot through the café and
        we will confirm the current rates for your session.
      </p>
      <Link href="/booking" className="oc-btn oc-btn--primary mt-8">
        Book a Slot
      </Link>
    </div>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing plans"
      className="relative py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-oc-deep/60 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="oc-section-badge">Session Plans</p>
          <h2 className="oc-display-text mt-4 text-3xl font-black text-oc-white sm:text-4xl">
            PRICING
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-oc-text">
            Clear, simple session plans. Details are announced as soon as
            official pricing is confirmed.
          </p>
        </div>

        {pricingPlans.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan: PricingPlan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}