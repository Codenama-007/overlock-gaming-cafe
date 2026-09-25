import { MonitorX } from "lucide-react";
import type { ActiveSession } from "@/lib/types";
import {
  formatClock,
  getDurationLabel,
  getEndTime,
} from "@/lib/sessionTiming";
import { SessionTimer } from "@/components/admin/SessionTimer";
import { DeleteSessionButton } from "@/components/admin/DeleteSessionButton";

type ActiveSessionsTableProps = {
  sessions: ActiveSession[];
  serverNow: number;
};

export function ActiveSessionsTable({
  sessions,
  serverNow,
}: ActiveSessionsTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="border border-oc-blue/25 bg-oc-surface px-5 py-6">
        <p className="flex items-center gap-3 text-sm text-oc-text">
          <MonitorX className="h-5 w-5 text-electric-blue" />
          No active gaming sessions right now.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Active gaming sessions with live countdowns
        </caption>
        <thead>
          <tr className="oc-mono-label text-[9px] text-oc-text">
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Username
            </th>
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Phone
            </th>
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Start Time
            </th>
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              End Time
            </th>
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Countdown
            </th>
            <th scope="col" className="border-b border-oc-blue/25 px-3 py-2 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-b border-oc-blue/10 align-middle">
              <td className="px-3 py-3 font-heading text-sm font-bold uppercase tracking-wide text-oc-white">
                {session.username}
                <span className="oc-mono-label mt-1 block text-[9px] font-normal text-oc-text">
                  {getDurationLabel(session.durationMinutes)}
                </span>
              </td>
              <td className="px-3 py-3 font-mono text-xs text-oc-text">
                {session.phone}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-oc-white">
                {formatClock(session.startedAt)}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-oc-white">
                {formatClock(getEndTime(session.startedAt, session.durationMinutes))}
              </td>
              <td className="px-3 py-3">
                <SessionTimer
                  startedAt={session.startedAt}
                  durationMinutes={session.durationMinutes}
                  serverNow={serverNow}
                />
              </td>
              <td className="px-3 py-3">
                <DeleteSessionButton session={session} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
