export const MINUTE_MS = 60 * 1000;

/** The countdown turns red once this much time (or less) is left. */
export const WARNING_THRESHOLD_MS = 20 * MINUTE_MS;

/** A finished session stays visible for this long before MongoDB reaps it. */
export const SESSION_GRACE_MS = 10 * MINUTE_MS;

export type TickerState = {
  remainingMs: number;
  warning: boolean;
  ended: boolean;
  label: string;
};

/**
 * The session end is always derived: startedAt + booked duration. It is never
 * persisted, so a refresh can never disagree with the database.
 */
export function getEndTime(startedAt: Date | string, durationMinutes: number): number {
  return new Date(startedAt).getTime() + durationMinutes * MINUTE_MS;
}

/** MongoDB deletes the session at endTime + grace, using the server clock. */
export function getDeleteAt(startedAt: Date | string, durationMinutes: number): Date {
  return new Date(getEndTime(startedAt, durationMinutes) + SESSION_GRACE_MS);
}

/** Clamped at zero, so the countdown can never display a negative value. */
export function getRemainingMs(
  endTime: number | string,
  now: number | Date = Date.now(),
): number {
  const end =
    typeof endTime === "number" ? endTime : new Date(endTime).getTime();
  return Math.max(0, end - new Date(now).getTime());
}

export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.floor(Math.max(0, remainingMs) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function formatClock(value: Date | string | number): string {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getTickerState(
  endTime: number | string,
  now: number | Date = Date.now(),
): TickerState {
  const remainingMs = getRemainingMs(endTime, now);
  const ended = remainingMs <= 0;
  return {
    remainingMs,
    warning: !ended && remainingMs <= WARNING_THRESHOLD_MS,
    ended,
    label: ended ? "SESSION ENDED" : formatCountdown(remainingMs),
  };
}

export function getDurationLabel(minutes: number): string {
  const hours = minutes / 60;
  if (Number.isInteger(hours)) {
    return `${hours} Hour${hours > 1 ? "s" : ""}`;
  }
  return `${minutes} Minutes`;
}
