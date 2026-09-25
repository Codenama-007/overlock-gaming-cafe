"use client";

import { useActionState, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteSession } from "@/app/actions/sessions";
import type { DeleteSessionState } from "@/app/actions/sessions";
import type { ActiveSession } from "@/lib/types";

export function DeleteSessionButton({
  session,
}: {
  session: Pick<ActiveSession, "id" | "username">;
}) {
  const [state, formAction, pending] = useActionState<DeleteSessionState, FormData>(
    deleteSession,
    undefined,
  );
  const [confirming, setConfirming] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!confirming) {
      event.preventDefault();
      setConfirming(true);
      return;
    }
    setConfirming(false);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="inline">
      <input type="hidden" name="sessionId" value={session.id} />
      <button
        type="submit"
        disabled={pending}
        onBlur={() => setConfirming(false)}
        title={
          confirming
            ? "Click again to permanently delete the session and booking"
            : "End session"
        }
        className={`oc-btn oc-btn--ghost !px-3 !py-2 text-xs ${
          confirming
            ? "!border-oc-danger !text-oc-danger"
            : "hover:!border-oc-danger hover:!text-oc-danger"
        }`}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        {pending ? "Deleting..." : confirming ? "Confirm?" : "Delete"}
      </button>
      {state && "error" in state ? (
        <p role="alert" className="mt-2 text-xs text-oc-danger">
          {state.error}
        </p>
      ) : null}
      {confirming ? (
        <p className="oc-mono-label mt-2 max-w-[16rem] text-[9px] leading-relaxed text-oc-danger">
          Ends {session.username}&apos;s session and deletes the booking
          permanently.
        </p>
      ) : null}
    </form>
  );
}
