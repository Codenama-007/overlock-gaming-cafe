import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getDashboardSnapshot } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Overclock Gaming Café admin dashboard — manage gaming sessions.",
  robots: { index: false, follow: false },
};

// Sessions age continuously, so every visit must see the current set of gamers.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // A database hiccup must not take the dashboard down; an empty table plus the
  // search box is still a usable screen.
  const { sessions, serverNow } = await getDashboardSnapshot().catch(
    () => ({ sessions: [], serverNow: 0 }),
  );

  return (
    <main className="oc-scanlines relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="oc-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
      />
      <div className="relative">
        <AdminDashboard sessions={sessions} serverNow={serverNow} />
      </div>
    </main>
  );
}
