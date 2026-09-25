import type { SessionStatus } from "@/lib/types";

const styles: Record<SessionStatus, string> = {
  BOOKED: "border-oc-blue/60 text-electric-blue bg-oc-blue/10",
  ACTIVE: "border-oc-success/60 text-oc-success bg-oc-success/10",
  WARNING: "border-oc-danger/70 text-oc-danger bg-oc-danger/10",
  COMPLETED: "border-oc-silver/50 text-oc-silver bg-oc-silver/10",
  CANCELLED: "border-oc-text/40 text-oc-text bg-oc-text/10",
};

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 font-heading text-xs font-bold tracking-[0.2em] ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}