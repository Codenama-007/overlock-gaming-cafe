import { CheckCircle2, FileQuestion, Hash, Phone, Timer } from "lucide-react";
import type { SearchBookingState } from "@/app/actions/sessions";
import { getDurationLabel } from "@/lib/sessionTiming";

export function CustomerResult({ state }: { state: SearchBookingState }) {
  if (!state) {
    return (
      <div className="border border-oc-blue/25 bg-oc-surface px-5 py-6">
        <p className="flex items-center gap-3 text-sm text-oc-text">
          <FileQuestion className="h-5 w-5 text-electric-blue" />
          Search a phone number to get started.
        </p>
      </div>
    );
  }

  if ("error" in state) {
    return (
      <div className="flex items-center gap-3 border border-oc-danger/50 bg-oc-danger/10 px-5 py-6 text-sm text-oc-danger">
        <FileQuestion className="h-5 w-5" />
        {state.error}
      </div>
    );
  }

  const { booking, session } = state;

  return (
    <div className="oc-hud-frame px-5 py-6">
      <p className="oc-mono-label flex items-center gap-2 text-[9px] text-oc-success">
        <CheckCircle2 className="h-4 w-4" />
        Customer Found
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Name</dt>
          <dd className="font-heading text-lg font-bold uppercase tracking-wide text-oc-white">
            {booking.username}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Phone</dt>
          <dd className="flex items-center gap-2 font-mono text-xs text-oc-white">
            <Phone className="h-3.5 w-3.5 text-electric-blue" />
            {booking.phone}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Booked Duration</dt>
          <dd className="flex items-center gap-2 font-heading font-bold uppercase tracking-wide text-oc-white">
            <Timer className="h-4 w-4 text-electric-blue" />
            {getDurationLabel(booking.durationMinutes)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Reference</dt>
          <dd className="flex items-center gap-2 font-mono text-xs text-oc-text">
            <Hash className="h-3.5 w-3.5 text-electric-blue" />#
            {booking.id.slice(-6).toUpperCase()}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Status</dt>
          <dd className="font-heading text-xs font-bold uppercase tracking-widest text-oc-white">
            {session ? "Playing now" : "Booked"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
