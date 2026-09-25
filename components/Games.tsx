import { PackageOpen } from "lucide-react";
import { games } from "@/data/games";
import { GameCard } from "@/components/GameCard";

export function Games() {
  return (
    <section
      id="games"
      aria-label="Games available at Overclock Gaming Café"
      className="relative py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-oc-deep/60 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="oc-section-badge">Game Library</p>
          <h2 className="oc-display-text mt-4 text-3xl font-black text-oc-white sm:text-4xl">
            SELECT YOUR <span className="oc-glow-orange text-oc-orange-warm">GAME</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-oc-text">
            Choose your loadout from the games available at the café. The lineup
            keeps growing — check the board in store for the latest titles.
          </p>
        </div>

        {games.length === 0 ? (
          <div className="oc-hud-frame mx-auto mt-12 max-w-xl p-10 text-center">
            <PackageOpen className="mx-auto h-10 w-10 text-electric-blue" />
            <p className="oc-display-text mt-4 text-xl font-bold text-oc-white">
              GAME LINEUP COMING SOON
            </p>
            <p className="mt-2 text-oc-text">
              The café will announce its full game library shortly.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}