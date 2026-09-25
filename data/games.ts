import type { Game } from "@/lib/types";

// Confirmed by the café owner. Platforms/descriptions are configurable and
// can be adjusted whenever the café provides updates. Replace `image` with
// official game art paths when available.
export const games: Game[] = [
  {
    name: "FC 26",
    platform: ["PS5", "PC"],
    description: "Football simulation and esports competition.",
  },
  {
    name: "Tekken 8",
    platform: ["PS5", "PC"],
    description: "Fast-paced competitive fighting game.",
  },
  {
    name: "GTA 5",
    platform: ["PS5", "PC"],
    description: "Open-world action and online heists.",
  },
  {
    name: "WWE 2K26",
    platform: ["PS5"],
    description: "Pro-wrestling action and rivalry mode.",
  },
  {
    name: "God of War",
    platform: ["PS5"],
    description: "Epic cinematic action-adventure.",
  },
];