export type GamePlatform = "PC" | "PS5";

export type Game = {
  name: string;
  platform: GamePlatform[];
  description: string;
  image?: string;
};

export type Facility = {
  title: string;
  description: string;
  icon: string;
};

export type PricingPlan = {
  name: string;
  priceLabel: string;
  duration: string;
  description: string;
  features: string[];
  featured?: boolean;
  available: boolean;
};

export type DurationOption = {
  label: string;
  minutes: number;
};

export type PlatformOption = {
  value: GamePlatform;
  label: string;
};

export type BookingDetails = {
  name: string;
  phone: string;
  platform: GamePlatform;
  date: string;
  durationMinutes: number;
};

export type SessionStatus =
  | "BOOKED"
  | "ACTIVE"
  | "WARNING"
  | "COMPLETED"
  | "CANCELLED";

export type Customer = {
  id: string;
  name: string;
  phone: string;
};

export type GamingSession = {
  id: string;
  customerId: string;
  platform: GamePlatform;
  date: string;
  durationMinutes: number;
  startTime?: string;
  endTime?: string;
  startedAt?: string;
  status: SessionStatus;
};