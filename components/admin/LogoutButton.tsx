"use client";

import { useActionState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export function LogoutButton() {
  const [, formAction, pending] = useActionState<void, FormData>(
    logout,
    undefined,
  );

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        className="oc-btn oc-btn--ghost !px-4 !py-2 text-xs"
      >
        <LogOut className="h-4 w-4" />
        {pending ? "Logging Out..." : "Logout"}
      </button>
    </form>
  );
}