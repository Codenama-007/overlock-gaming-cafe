import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Overclock Gaming Café admin dashboard — manage gaming sessions.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <main className="oc-scanlines relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="oc-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
      />
      <div className="relative">
        <AdminDashboard />
      </div>
    </main>
  );
}