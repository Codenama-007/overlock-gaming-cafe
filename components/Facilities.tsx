import { Zap, Gamepad2, Armchair, Coffee, Trophy } from "lucide-react";
import { facilities } from "@/data/facilities";

const iconMap = {
  zap: Zap,
  gamepad: Gamepad2,
  armchair: Armchair,
  coffee: Coffee,
  trophy: Trophy,
} as const;

export function Facilities() {
  return (
    <div aria-labelledby="facilities-heading">
      <div className="flex flex-col items-center text-center">
        <p className="oc-section-badge">Facilities</p>
        <h3
          id="facilities-heading"
          className="oc-display-text mt-4 text-2xl font-bold text-oc-white sm:text-3xl"
        >
          WHAT&nbsp;YOU&nbsp;GET&nbsp;HERE
        </h3>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => {
          const Icon = iconMap[facility.icon as keyof typeof iconMap] ?? Zap;
          return (
            <article
              key={facility.title}
              className="oc-card oc-card--hover oc-hud-frame p-6"
            >
              <span className="grid h-12 w-12 place-items-center border border-oc-orange/50 bg-overclock-black text-oc-orange">
                <Icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h4 className="mt-5 font-heading text-lg font-bold uppercase tracking-wider text-oc-white">
                {facility.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-oc-text">
                {facility.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}