import { CheckCircle2, FileQuestion } from "lucide-react";
import type { SearchCustomerState } from "@/app/actions/customers";
import { BookingsList } from "@/components/admin/BookingsList";

export function CustomerResult({ state }: { state: SearchCustomerState }) {
  if (!state) {
    return (
      <div className="border border-oc-blue/25 bg-oc-surface px-5 py-6">
        <p className="flex items-center gap-3 text-sm text-oc-text">
          <FileQuestion className="h-5 w-5 text-electric-blue" />
          Search a customer&apos;s phone number to get started.
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
            {state.customer.name}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="oc-mono-label">Phone</dt>
          <dd className="font-heading font-bold tracking-wide text-oc-white">
            {state.customer.phone}
          </dd>
        </div>
      </dl>
      <div className="mt-5">
        <p className="oc-mono-label text-[9px]">Bookings</p>
        <BookingsList sessions={state.sessions} />
      </div>
    </div>
  );
}