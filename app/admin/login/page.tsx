import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Overclock Gaming Café admin login.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="oc-scanlines relative grid flex-1 place-items-center overflow-hidden px-4 py-16">
      <div
        aria-hidden="true"
        className="oc-grid-bg pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-oc-blue/10 blur-3xl"
      />

      <div className="relative flex w-full flex-col items-center">
        <div className="mb-8">
          <BrandLogo />
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}