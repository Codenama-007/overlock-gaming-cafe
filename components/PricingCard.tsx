import Link from "next/link";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/types";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className="oc-card oc-card--hover relative flex flex-col p-6"
      style={
        plan.featured
          ? {
              borderColor: "var(--overclock-orange)",
              boxShadow: "0 0 25px rgba(255, 122, 0, 0.25)",
            }
          : undefined
      }
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-overclock-orange px-3 py-1 font-heading text-[10px] font-bold tracking-[0.2em] text-overclock-black">
          MOST POPULAR
        </span>
      )}

      <h3 className="font-heading text-lg font-bold uppercase tracking-[0.18em] text-oc-white">
        {plan.name}
      </h3>
      <p className="mt-4">
        <span className="oc-display-text text-3xl font-black text-oc-white">
          {plan.priceLabel}
        </span>
        <span className="oc-mono-label ml-2 text-[10px]">{plan.duration}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-oc-text">
        {plan.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3" aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-oc-text">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-oc-success" />
            {feature}
          </li>
        ))}
      </ul>

      {plan.available ? (
        <Link href="/booking" className="oc-btn oc-btn--primary mt-8">
          Book This Slot
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="oc-btn oc-btn--secondary mt-8 w-full cursor-not-allowed opacity-60"
        >
          Coming Soon
        </span>
      )}
    </article>
  );
}