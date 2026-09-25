"use client";

import { useEffect, useState } from "react";
import { getEndTime, getTickerState } from "@/lib/sessionTiming";

type SessionTimerProps = {
  /** The persisted session start. This is the only source of truth. */
  startedAt: string;
  durationMinutes: number;
  /**
   * Database clock at render time. Used to correct for a skewed admin machine
   * so the countdown always agrees with the timestamp in MongoDB. Only ever 0
   * when the database was unreachable, in which case no sessions are listed.
   */
  serverNow: number;
  className?: string;
};

export function SessionTimer({
  startedAt,
  durationMinutes,
  serverNow,
  className = "",
}: SessionTimerProps) {
  const endTime = getEndTime(startedAt, durationMinutes);

  // Rendered on the server too, so the first paint is deterministic and the
  // hydration comparison matches. Ticking only begins after mount.
  const [now, setNow] = useState(() => serverNow);

  useEffect(() => {
    const offset = serverNow - Date.now();
    const tick = () => setNow(Date.now() + offset);
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [serverNow]);

  const { remainingMs, warning, ended, label } = getTickerState(endTime, now);

  return (
    <div
      className={`inline-flex min-w-[9.5rem] flex-col items-center justify-center border px-3 py-1.5 text-center transition-colors ${
        warning
          ? "oc-warning-pulse border-oc-danger/70 bg-oc-danger/10"
          : "border-oc-blue/30 bg-oc-surface"
      } ${className}`}
    >
      <span
        aria-live="off"
        className={`oc-display-text text-lg font-black tabular-nums tracking-wider ${
          warning ? "text-oc-danger" : "text-oc-white"
        }`}
      >
        {ended ? "00:00:00" : label}
      </span>
      <span
        className={`oc-mono-label text-[8px] ${
          warning ? "text-oc-danger" : "text-oc-text"
        }`}
      >
        {ended ? "Session Ended" : warning ? "Time Running Out" : "Time Left"}
      </span>
      <span className="sr-only">{Math.ceil(remainingMs / 1000)} seconds remaining</span>
    </div>
  );
}
