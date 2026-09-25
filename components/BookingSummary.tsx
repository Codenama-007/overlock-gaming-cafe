import { Calendar, Monitor, Gamepad2, Timer, Receipt } from "lucide-react";
import type { BookingDetails, GamingSession } from "@/lib/types";

function getDurationLabel(minutes: number): string {
  const hours = minutes / 60;
  return hours >= 1 ? `${hours} Hour${hours > 1 ? "s" : ""}` : `${minutes} Minutes`;
}

export function BookingSummary({
  details,
  confirmed,
  savedBooking,
}: {
  details: BookingDetails | null;
  confirmed: boolean;
  savedBooking?: GamingSession;
}) {
  return (
    <aside
      aria-label="Booking summary"
      className="oc-hud-frame p-6 lg:sticky lg:top-24"
    >
      <h3 className="oc-section-badge">Booking Summary</h3>

      {confirmed && savedBooking && (
        <div className="mt-5 border border-oc-success/50 bg-oc-success/10 px-4 py-3">
          <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-oc-success">
            <CheckCircleMark /> Booking Confirmed
          </p>
          <p className="mt-1 text-sm text-oc-text">
            Your slot reservation was received. The café will confirm it when you
            arrive. Reference: #{savedBooking.id.slice(-6).toUpperCase()}
          </p>
          <p className="oc-mono-label mt-3 inline-block border border-oc-success/50 px-2 py-1 text-[9px] text-oc-success">
            Status · BOOKED
          </p>
        </div>
      )}

      {details ? (
        <dl className="mt-6 space-y-4 text-sm">
          {[
            {
              icon: <Receipt className="h-4 w-4 text-electric-blue" />,
              label: "Customer Name",
              value: details.name || "—",
            },
            {
              icon: <Receipt className="h-4 w-4 text-electric-blue" />,
              label: "Phone Number",
              value: details.phone || "—",
            },
            {
              icon:
                details.platform === "PC" ? (
                  <Monitor className="h-4 w-4 text-electric-blue" />
                ) : (
                  <Gamepad2 className="h-4 w-4 text-electric-blue" />
                ),
              label: "Platform",
              value: details.platform,
            },
            {
              icon: <Calendar className="h-4 w-4 text-electric-blue" />,
              label: "Date",
              value: details.date || "—",
            },
            {
              icon: <Timer className="h-4 w-4 text-electric-blue" />,
              label: "Duration",
              value: getDurationLabel(details.durationMinutes),
            },
          ].map((row, index) => (
            <div
              key={`${row.label}-${index}`}
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
        </dl>
      ) : (
        <p className="mt-6 text-sm text-oc-text">
          Fill in your details to preview your booking here.
        </p>
      )}
    </aside>
  );
}

function CheckCircleMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m8.5 12.5 2.5 2.5 5-6" />
    </svg>
  );
}