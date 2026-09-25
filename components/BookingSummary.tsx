import { CheckCircle2, User, Phone, Timer, Receipt } from "lucide-react";
import type { Booking, BookingDetails } from "@/lib/types";
import { getDurationLabel } from "@/lib/sessionTiming";

export function BookingSummary({
  details,
  saved,
}: {
  details: BookingDetails | null;
  saved: Booking | null;
}) {
  const rows = details
    ? [
        {
          icon: <User className="h-4 w-4 text-electric-blue" />,
          label: "Customer Name",
          value: details.username || "—",
        },
        {
          icon: <Phone className="h-4 w-4 text-electric-blue" />,
          label: "Phone Number",
          value: details.phone || "—",
        },
        {
          icon: <Timer className="h-4 w-4 text-electric-blue" />,
          label: "Duration",
          value: getDurationLabel(details.durationMinutes),
        },
      ]
    : [];

  return (
    <aside
      aria-label="Booking summary"
      className="oc-hud-frame p-6 lg:sticky lg:top-24"
    >
      <h3 className="oc-section-badge">Booking Summary</h3>

      {saved && (
        <div className="mt-5 border border-oc-success/50 bg-oc-success/10 px-4 py-3">
          <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-oc-success">
            <CheckCircle2 className="h-4 w-4" /> Booking Confirmed
          </p>
          <p className="mt-1 text-sm text-oc-text">
            Show this reference when you arrive. Reference: #
            {saved.id.slice(-6).toUpperCase()}
          </p>
        </div>
      )}

      {details ? (
        <dl className="mt-6 space-y-4 text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-oc-blue/15 pb-3"
            >
              <dt className="flex items-center gap-2 text-oc-text">
                {row.icon}
                {row.label}
              </dt>
              <dd className="text-right font-heading font-bold uppercase tracking-wide text-oc-white">
                {row.value}
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-oc-text">
              <Receipt className="h-4 w-4 text-electric-blue" />
              Status
            </dt>
            <dd className="text-right font-heading font-bold uppercase tracking-wide text-oc-white">
              {saved ? "Booked" : "Draft"}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-sm text-oc-text">
          Fill in your details to preview your booking here.
        </p>
      )}
    </aside>
  );
}
