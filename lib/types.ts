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

export type BookingDetails = {
  username: string;
  phone: string;
  durationMinutes: number;
};

/**
 * A customer's submitted booking request. There are no customer accounts — a
 * booking is just this record, and the admin looks it up by phone number.
 */
export type Booking = {
  id: string;
  username: string;
  phone: string;
  durationMinutes: number;
  createdAt: string;
};

/**
 * A temporary record created when the admin starts a gamer's timer. The end
 * time, countdown and 20-minute warning are all derived from `startedAt`; none
 * of them are stored.
 */
export type ActiveSession = {
  id: string;
  bookingId: string;
  username: string;
  phone: string;
  durationMinutes: number;
  startedAt: string;
  endTime: string;
  deleteAt: string;
};