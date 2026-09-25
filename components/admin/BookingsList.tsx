import { CalendarX2 } from "lucide-react";
import type { GamingSession } from "@/lib/types";
import { SessionStatusBadge } from "@/components/admin/SessionStatusBadge";

function getDurationLabel(minutes: number): string {
  const hours = minutes / 60;
  return hours >= 1 ? `${hours} Hour${hours > 1 ? "s" : ""}` : `${minutes} Minutes`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BookingsList({ sessions }: { sessions: GamingSession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="mt-5 flex items-center gap-3 text-sm text-oc-text">
        <CalendarX2 className="h-5 w-5 text-electric-blue" />
        No bookings found for this customer yet.
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="oc-mono-label text-[9px] text-oc-text">
            <th className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Date
            </th>
            <th className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Platform
            </th>
            <th className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Duration
            </th>
            <th className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Status
            </th>
            <th className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Booking ID
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session.id}
              className="border-b border-oc-blue/10 align-middle"
            >
              <td className="px-3 py-3 text-oc-text">{formatDate(session.date)}</td>
              <td className="px-3 py-3 font-heading font-bold tracking-wide text-oc-white">
                {session.platform}
              </td>
              <td className="px-3 py-3 text-oc-text">
                {getDurationLabel(session.durationMinutes)}
              </td>
              <td className="px-3 py-3">
                <SessionStatusBadge status={session.status} />
              </td>
              <td className="px-3 py-3 font-mono text-xs text-oc-text">
                #{session.id.slice(-6).toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}