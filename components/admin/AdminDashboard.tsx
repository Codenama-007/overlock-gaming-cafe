"use client";

import { useActionState, useState } from "react";
import { FlaskConical } from "lucide-react";
import type { SessionStatus } from "@/lib/types";
import { searchCustomer } from "@/app/actions/customers";
import type { SearchCustomerState } from "@/app/actions/customers";
import { CustomerSearch } from "@/components/admin/CustomerSearch";
import { CustomerResult } from "@/components/admin/CustomerResult";
import { SessionCard } from "@/components/admin/SessionCard";
import { LogoutButton } from "@/components/admin/LogoutButton";

const demoSessionByStatus: Record<
  Exclude<SessionStatus, "BOOKED">,
  { startTime: string; endTime: string; remaining: string }
> = {
  ACTIVE: { startTime: "4:00 PM", endTime: "6:00 PM", remaining: "01:30:00" },
  WARNING: { startTime: "4:00 PM", endTime: "6:00 PM", remaining: "00:15:00" },
  COMPLETED: { startTime: "4:00 PM", endTime: "6:00 PM", remaining: "00:00:00" },
  CANCELLED: { startTime: "--", endTime: "--", remaining: "--" },
};

function getDurationLabel(minutes: number): string {
  const hours = minutes / 60;
  return hours >= 1 ? `${hours} Hour${hours > 1 ? "s" : ""}` : `${minutes} Minutes`;
}

export function AdminDashboard() {
  const [state, formAction, pending] = useActionState<
    SearchCustomerState,
    FormData
  >(searchCustomer, undefined);
  const [status, setStatus] = useState<SessionStatus>("BOOKED");
  const [starting, setStarting] = useState(false);

  const found = state !== undefined && "customer" in state;
  const customer = found ? state.customer : null;
  const latestSession = found && state.sessions.length > 0 ? state.sessions[0] : null;

  const handleStart = () => {
    if (starting) return;
    setStarting(true);
    window.setTimeout(() => {
      setStatus("ACTIVE");
      setStarting(false);
    }, 600);
  };

  const showDemoTimes =
    status !== "BOOKED" && status !== "CANCELLED";
  const demoTimes = demoSessionByStatus[status as Exclude<SessionStatus, "BOOKED">];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="oc-display-text text-2xl font-black text-oc-white sm:text-3xl">
            ADMIN <span className="oc-glow-blue text-electric-blue">DASHBOARD</span>
          </h1>
          <p className="mt-1 text-sm text-oc-text">
            Search a customer by phone number to manage their gaming session.
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

      <section aria-label="Customer" className="mt-6">
        <h2 className="oc-mono-label text-[10px]">Customer</h2>
        <div className="mt-4">
          <CustomerResult state={state} />
        </div>
      </section>

      {found && customer && (
        <>
          <section aria-label="Gaming session" className="mt-6">
            <h2 className="sr-only">Gaming Session</h2>
            <SessionCard
              customerName={customer.name}
              platform={
                latestSession
                  ? `${latestSession.platform} · ${getDurationLabel(latestSession.durationMinutes)}`
                  : "—"
              }
              durationLabel={
                latestSession ? getDurationLabel(latestSession.durationMinutes) : "—"
              }
              startTime={
                showDemoTimes ? demoTimes.startTime : "--"
              }
              endTime={showDemoTimes ? demoTimes.endTime : "--"}
              remaining={showDemoTimes ? demoTimes.remaining : "--"}
              status={status}
              starting={starting}
              onStart={handleStart}
            />
          </section>

          <section
            aria-label="Demo states"
            className="mt-6 border border-oc-orange/30 bg-overclock-black/60 p-6"
          >
            <p className="oc-mono-label flex items-center gap-2 text-[9px]">
              <FlaskConical className="h-4 w-4 text-oc-orange" />
              Demo · session start is mocked until Phase 4
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["ACTIVE", "WARNING", "COMPLETED"] as const).map((demoStatus) => (
                <button
                  key={demoStatus}
                  type="button"
                  onClick={() => setStatus(demoStatus)}
                  disabled={starting}
                  className={`border px-4 py-2 font-heading text-xs font-bold tracking-widest transition-colors ${
                    status === demoStatus
                      ? "border-oc-orange bg-oc-orange/15 text-oc-white"
                      : "border-oc-blue/40 text-oc-text hover:border-electric-blue hover:text-oc-white"
                  }`}
                >
                  {demoStatus}
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}