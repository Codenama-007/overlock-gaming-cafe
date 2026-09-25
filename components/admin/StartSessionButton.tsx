"use client";

import { useActionState } from "react";
import { Loader2, Play } from "lucide-react";
import { startSession } from "@/app/actions/sessions";
import type { StartSessionState } from "@/app/actions/sessions";

export function StartSessionButton({ bookingId }: { bookingId: string }) {
  const [state, formAction, pending] = useActionState<StartSessionState, FormData>(
    startSession,
    undefined,
  );

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="bookingId" value={bookingId} />
      <button
        type="submit"
        disabled={pending}
        className="oc-btn oc-btn--primary w-full"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting...
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            Start Session
          </>
        )}
      </button>
      {state && "error" in state ? (
        <p role="alert" className="mt-3 text-sm text-oc-danger">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
