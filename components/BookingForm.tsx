"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { durationOptions } from "@/data/bookingOptions";
import type { BookingDetails } from "@/lib/types";
import { BookingSummary } from "@/components/BookingSummary";
import { createBooking } from "@/app/actions/booking";
import type { BookingState } from "@/app/actions/booking";

const inputClasses =
  "w-full border border-oc-blue/40 bg-oc-surface px-4 py-3 text-sm text-oc-white placeholder:text-oc-text transition-colors focus:border-electric-blue focus:outline-none";

const labelClasses =
  "mb-2 block font-heading text-xs font-bold uppercase tracking-[0.2em] text-oc-text";

const EMPTY_DETAILS: BookingDetails = {
  username: "",
  phone: "",
  durationMinutes: durationOptions[0].minutes,
};

export function BookingForm() {
  const [details, setDetails] = useState<BookingDetails>(EMPTY_DETAILS);
  const [attempted, setAttempted] = useState(false);
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    createBooking,
    undefined,
  );

  const valid =
    details.username.trim().length > 0 &&
    details.phone.replace(/\D/g, "").length >= 10;

  const setField = <K extends keyof BookingDetails>(
    key: K,
    value: BookingDetails[K],
  ) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setAttempted(true);
    if (!valid) {
      e.preventDefault();
    }
  };

  const saved = state !== undefined && "success" in state ? state.booking : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="oc-hud-frame space-y-8 p-6 sm:p-8"
      >
        <div>
          <h2 className="oc-display-text text-2xl font-bold text-oc-white">
            BOOK YOUR SESSION
          </h2>
          <p className="mt-2 text-sm text-oc-text">
            Reserve your gaming slot at Overclock Gaming Café. Your timer starts
            the moment you arrive and the admin starts your session.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-name" className={labelClasses}>
              Customer Name
            </label>
            <input
              id="booking-name"
              name="username"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={details.username}
              onChange={(e) => setField("username", e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="booking-phone" className={labelClasses}>
              Phone Number
            </label>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="10 digit mobile number"
              value={details.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className={inputClasses}
            />
            <p className="oc-mono-label mt-2 text-[9px]">
              The café uses this to find your booking when you arrive.
            </p>
          </div>
        </div>

        <fieldset>
          <legend className={labelClasses}>Duration</legend>
          <div className="grid grid-cols-3 gap-3">
            {durationOptions.map((option) => {
              const selected = details.durationMinutes === option.minutes;
              return (
                <button
                  key={option.minutes}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setField("durationMinutes", option.minutes)}
                  className={`border px-2 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all ${
                    selected
                      ? "border-oc-blue bg-oc-blue/15 text-oc-white shadow-[0_0_20px_rgba(0,140,255,0.3)]"
                      : "border-oc-blue/40 bg-oc-surface text-oc-text hover:border-electric-blue hover:text-oc-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <input
            type="hidden"
            name="durationMinutes"
            value={details.durationMinutes}
          />
        </fieldset>

        {attempted && !valid && (
          <p
            role="alert"
            className="border border-oc-danger/50 bg-oc-danger/10 px-4 py-3 text-sm text-oc-danger"
          >
            Please fill in your name and a valid phone number.
          </p>
        )}

        {state && "message" in state && (
          <p
            role="alert"
            className="border border-oc-danger/50 bg-oc-danger/10 px-4 py-3 text-sm text-oc-danger"
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="oc-btn oc-btn--primary w-full"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </form>

      <BookingSummary details={details} saved={saved} />
    </div>
  );
}
