import type { DurationOption, PlatformOption } from "@/lib/types";

export const durationOptions: DurationOption[] = [
  { label: "1 Hour", minutes: 60 },
  { label: "2 Hours", minutes: 120 },
  { label: "3 Hours", minutes: 180 },
];

export const platformOptions: PlatformOption[] = [
  { value: "PC", label: "PC" },
  { value: "PS5", label: "PS5" },
];