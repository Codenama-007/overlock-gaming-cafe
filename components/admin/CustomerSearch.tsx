"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

type CustomerSearchProps = {
  action: (formData: FormData) => void;
  pending: boolean;
};

export function CustomerSearch({ action, pending }: CustomerSearchProps) {
  const [phone, setPhone] = useState("");

  return (
    <form
      action={action}
      role="search"
      aria-label="Search customer by phone number"
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="customer-phone" className="sr-only">
        Phone Number
      </label>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-electric-blue" />
        <input
          id="customer-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-oc-blue/40 bg-oc-surface py-3 pl-11 pr-4 text-sm text-oc-white placeholder:text-oc-text transition-colors focus:border-electric-blue focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="oc-btn oc-btn--primary shrink-0"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        {pending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}