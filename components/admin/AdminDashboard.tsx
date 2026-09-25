"use client";

import { useActionState } from "react";
import { Radio, Users } from "lucide-react";
import type { ActiveSession } from "@/lib/types";
import { searchBooking } from "@/app/actions/sessions";
import type { SearchBookingState } from "@/app/actions/sessions";
import { ActiveSessionsTable } from "@/components/admin/ActiveSessionsTable";
import { CustomerResult } from "@/components/admin/CustomerResult";
import { CustomerSearch } from "@/components/admin/CustomerSearch";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { StartSessionButton } from "@/components/admin/StartSessionButton";
import { formatClock, getDurationLabel } from "@/lib/sessionTiming";

export function AdminDashboard({
  sessions,
  serverNow,
}: {
  sessions: ActiveSession[];
  serverNow: number;
}) {
  const [state, formAction, pending] = useActionState<
    SearchBookingState,
    FormData
  >(searchBooking, undefined);

  const booking = state !== undefined && "booking" in state ? state.booking : null;
  const liveSession = state !== undefined && "session" in state ? state.session : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="oc-display-text text-2xl font-black text-oc-white sm:text-3xl">
            ADMIN <span className="oc-glow-blue text-electric-blue">DASHBOARD</span>
          </h1>
          <p className="mt-1 text-sm text-oc-text">
            Search a phone number to find a booking and start a session.
          </p>
        </div>
        <LogoutButton />
      </header>

      <section aria-label="Search customer" className="oc-hud-frame mt-10 p-6">
        <h2 className="oc-mono-label text-[10px]">Search Customer</h2>
        <div className="mt-4">
          <CustomerSearch action={formAction} pending={pending} />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section aria-label="Customer">
          <h2 className="oc-mono-label text-[10px]">Customer</h2>
          <div className="mt-4">
            <CustomerResult state={state} />
          </div>
        </section>

        <section aria-label="Session control">
          <h2 className="oc-mono-label text-[10px]">Session</h2>
          <div className="oc-hud-frame mt-4 px-5 py-6">
            {!booking ? (
              <p className="text-sm text-oc-text">
                Once a customer is found you can start their timer here.
              </p>
            ) : liveSession ? (
              <div>
                <p className="oc-mono-label text-[9px] text-oc-success">
                  Session in progress
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="oc-mono-label">Start Time</dt>
                    <dd className="oc-display-text font-mono text-sm text-oc-white">
                      {formatClock(liveSession.startedAt)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="oc-mono-label">End Time</dt>
                    <dd className="oc-display-text font-mono text-sm text-oc-white">
                      {formatClock(liveSession.endTime)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="oc-mono-label">Booked</dt>
                    <dd className="font-heading text-sm font-bold uppercase tracking-wide text-oc-white">
                      {getDurationLabel(liveSession.durationMinutes)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-oc-text">
                  The live countdown is in the Active Sessions table below.
                </p>
              </div>
            ) : (
              <div>
                <p className="oc-mono-label text-[9px] text-electric-blue">
                  Ready to start
                </p>
                <p className="mt-3 text-sm text-oc-text">
                  The timer starts now and runs for{" "}
                  {getDurationLabel(booking.durationMinutes)}.
                </p>
                <StartSessionButton bookingId={booking.id} />
              </div>
            )}
          </div>
        </section>
      </div>

      <section aria-label="Active sessions" className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="oc-mono-label flex items-center gap-2 text-[10px]">
            <Users className="h-4 w-4 text-electric-blue" />
            Active Sessions ({sessions.length})
          </h2>
          <p className="oc-mono-label flex items-center gap-2 text-[9px] text-oc-text">
            {serverNow > 0 ? (
              <>
                <Radio className="h-3.5 w-3.5 text-oc-success" />
                Server time {formatClock(serverNow)}
              </>
            ) : (
              <>
                <Radio className="h-3.5 w-3.5 text-oc-orange" />
                Server time unavailable — using this device&apos;s clock
              </>
            )}
          </p>
        </div>
        <div className="mt-4">
          <ActiveSessionsTable sessions={sessions} serverNow={serverNow} />
        </div>
      </section>
    </div>
  );
}
