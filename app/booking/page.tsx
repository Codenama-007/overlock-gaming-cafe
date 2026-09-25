import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Slot",
  description:
    "Reserve your gaming slot at Overclock Gaming Café in Virar West. Pick your platform, date, time and duration.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <section
          aria-label="Booking"
          className="relative overflow-hidden py-16 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="oc-grid-bg pointer-events-none absolute inset-0"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="oc-section-badge">Booking</p>
              <h1 className="oc-display-text mt-4 text-3xl font-black text-oc-white sm:text-4xl">
                BOOK YOUR <span className="oc-glow-orange text-oc-orange-warm">SLOT</span>
              </h1>
              <p className="mt-3 max-w-2xl text-oc-text">
                Pick your platform, date and duration. Your details and
                selected plan are previewed in the booking summary.
              </p>
            </div>

            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}