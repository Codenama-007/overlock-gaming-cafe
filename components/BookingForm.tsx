"use client";

import { useActionState, useState } from "react";
import { Monitor, Gamepad2, Loader2 } from "lucide-react";
import { durationOptions, platformOptions } from "@/data/bookingOptions";
import type { BookingDetails, GamePlatform } from "@/lib/types";
import { BookingSummary } from "@/components/BookingSummary";
import { createBooking } from "@/app/actions/booking";
import type { BookingState } from "@/app/actions/booking";

const inputClasses =
  "w-full border border-oc-blue/40 bg-oc-surface px-4 py-3 text-sm text-oc-white placeholder:text-oc-text transition-colors focus:border-electric-blue focus:outline-none";

const labelClasses =
  "mb-2 block font-heading text-xs font-bold uppercase tracking-[0.2em] text-oc-text";

export function BookingForm() {
  const [details, setDetails] = useState<BookingDetails>({
    name: "",
    phone: "",
    platform: "PC",
    date: "",
    durationMinutes: 60,
  });
  const [attempted, setAttempted] = useState(false);
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    createBooking,
    undefined,
  );

  const valid =
    details.name.trim().length > 0 &&
    details.phone.replace(/\D/g, "").length >= 10 &&
    details.date.length > 0;

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
            Reserve your gaming slot at Overclock Gaming Café.
          </p>
        </div>

        <fieldset>
          <legend className={labelClasses}>Platform</legend>
          <div className="grid grid-cols-2 gap-3">
            {platformOptions.map((option) => {
              const selected = details.platform === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setField("platform", option.value as GamePlatform)}
                  className={`flex items-center justify-center gap-2 border px-4 py-3 font-heading text-sm font-bold uppercase tracking-widest transition-all ${
                    selected
                      ? "border-oc-orange bg-oc-orange/10 text-oc-white shadow-[0_0_20px_rgba(255,122,0,0.25)]"
                      : "border-oc-blue/40 bg-oc-surface text-oc-text hover:border-electric-blue hover:text-oc-white"
                  }`}
                >
                  {option.value === "PC" ? (
                    <Monitor className="h-4 w-4" />
                  ) : (
                    <Gamepad2 className="h-4 w-4" />
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="platform" value={details.platform} />
        </fieldset>

        <div>
          <label htmlFor="booking-date" className={labelClasses}>
            Date
          </label>
          <input
            id="booking-date"
            name="date"
            type="date"
            required
            value={details.date}
            onChange={(e) => setField("date", e.target.value)}
            className={`${inputClasses} [color-scheme:dark]`}
          />
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

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-name" className={labelClasses}>
              Customer Name
            </label>
            <input
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={details.name}
              onChange={(e) => setField("name", e.target.value)}
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
          </div>
        </div>

        {attempted && !valid && (
          <p
            role="alert"
            className="border border-oc-danger/50 bg-oc-danger/10 px-4 py-3 text-sm text-oc-danger"
          >
            Please fill in your name, a valid phone number and a date.
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

      <BookingSummary
        details={details}
        confirmed={state !== undefined && "success" in state}
        savedBooking={
          state !== undefined && "success" in state ? state.booking : undefined
        }
      />
    </div>
  );
}