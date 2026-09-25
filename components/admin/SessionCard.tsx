import { Loader2, Play } from "lucide-react";
import type { SessionStatus } from "@/lib/types";
import { SessionStatusBadge } from "@/components/admin/SessionStatusBadge";

type SessionCardProps = {
  customerName: string;
  platform: string;
  durationLabel: string;
  startTime: string;
  endTime: string;
  remaining: string;
  status: SessionStatus;
  starting: boolean;
  onStart: () => void;
};

export function SessionCard({
  customerName,
  platform,
  durationLabel,
  startTime,
  endTime,
  remaining,
  status,
  starting,
  onStart,
}: SessionCardProps) {
  const isWarning = status === "WARNING";
  const isCompleted = status === "COMPLETED";
  const isBooked = status === "BOOKED";

  return (
    <div className="oc-hud-frame p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="oc-mono-label">Gaming Session</p>
        <SessionStatusBadge status={status} />
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SessionMetric label="Start Time" value={startTime} danger={isWarning} />
        <SessionMetric label="End Time" value={endTime} danger={isWarning} />
        <SessionMetric label="Duration" value={durationLabel} />
        <SessionMetric label="Remaining" value={remaining} danger={isWarning} />
      </dl>

      <div
        aria-live="polite"
        className={`mt-6 border px-5 py-4 text-center ${
          isWarning
            ? "oc-warning-pulse border-oc-danger/70 bg-oc-danger/10"
            : isCompleted
              ? "border-oc-silver/50 bg-oc-silver/5"
              : "border-oc-blue/30 bg-oc-surface"
        }`}
      >
        {isCompleted ? (
          <p className="oc-display-text text-2xl font-bold text-oc-silver">
            SESSION ENDED
          </p>
        ) : (
          <p
            className={`oc-display-text text-3xl font-black tracking-wider ${
              isWarning ? "text-oc-danger" : "text-oc-white"
            }`}
          >
            {remaining}
          </p>
        )}
        <p className="oc-mono-label mt-2 text-[9px]">
          {customerName} · {platform}
        </p>
      </div>

      {isBooked && (
        <button
          type="button"
          onClick={onStart}
          disabled={starting}
          className="oc-btn oc-btn--primary mt-6 w-full"
        >
          {starting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Starting...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start Session
            </>
          )}
        </button>
      )}
    </div>
  );
}

function SessionMetric({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="border border-oc-blue/25 bg-oc-surface px-4 py-3">
      <dt className="oc-mono-label text-[9px]">{label}</dt>
      <dd
        className={`mt-1 font-heading text-lg font-bold tracking-wide ${
          danger ? "text-oc-danger" : "text-oc-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}