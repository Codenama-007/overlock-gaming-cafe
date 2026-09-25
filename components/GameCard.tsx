import type { Game } from "@/lib/types";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="oc-card oc-card--hover oc-hud-frame group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-oc-deep via-overclock-black to-oc-elevated">
        <div
          aria-hidden="true"
          className="oc-grid-bg absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-oc-orange/70"
        />
        <p className="oc-display-text relative z-10 py-8 text-center text-2xl font-bold text-oc-white transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_14px_rgba(0,140,255,0.8)] sm:text-3xl">
          {game.name}
        </p>
        <span className="oc-mono-label absolute bottom-3 right-3 text-[9px]">
          {`// OC.LIBRARY`}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-oc-white">
            {game.name}
          </h3>
          <ul className="flex gap-2" aria-label={`${game.name} platforms`}>
            {game.platform.map((platform) => (
              <li
                key={platform}
                className="flex items-center border border-oc-blue/50 bg-overclock-black px-2 py-1 font-heading text-[10px] font-bold tracking-widest text-electric-blue"
              >
                {platform}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-oc-text">
          {game.description}
        </p>
      </div>
    </article>
  );
}