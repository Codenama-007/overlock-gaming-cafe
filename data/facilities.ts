import type { Facility } from "@/lib/types";

// Confirmed facilities from the café poster. Icon keys map to lucide-react
// icons inside the Facilities component.
export const facilities: Facility[] = [
  {
    title: "Ultra Fast Internet",
    description: "Reliable gaming connectivity for your sessions.",
    icon: "zap",
  },
  {
    title: "PS5 Consoles",
    description: "Next-gen console gaming at your seat.",
    icon: "gamepad",
  },
  {
    title: "Comfy Zone",
    description: "Relax and recharge between matches.",
    icon: "armchair",
  },
  {
    title: "Food & Drinks",
    description: "Snacks and refreshments while you play.",
    icon: "coffee",
  },
  {
    title: "Tournaments & Events",
    description: "Compete in regular competitive events.",
    icon: "trophy",
  },
];