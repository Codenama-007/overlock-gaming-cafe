"use client";

import { useActionState, useState } from "react";
import { Lock, User, Loader2, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { login } from "@/app/actions/auth";
import type { LoginState } from "@/app/actions/auth";

const inputClasses =
  "w-full border border-oc-blue/40 bg-oc-surface py-3 pl-11 pr-4 text-sm text-oc-white placeholder:text-oc-text transition-colors focus:border-electric-blue focus:outline-none";

const passwordInputClasses =
  "w-full border border-oc-blue/40 bg-oc-surface py-3 pl-11 pr-12 text-sm text-oc-white placeholder:text-oc-text transition-colors focus:border-electric-blue focus:outline-none";

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={formAction} className="oc-hud-frame w-full max-w-md p-8">
      <span className="oc-mono-label inline-block border border-oc-blue/50 px-2 py-1 text-[9px] text-electric-blue">
        SECURE ADMIN ACCESS
      </span>
      <h1 className="oc-display-text mt-4 text-2xl font-bold text-oc-white">
        ADMIN <span className="oc-glow-blue text-electric-blue">LOGIN</span>
      </h1>
      <p className="mt-2 text-sm text-oc-text">
        Sign in to manage gaming sessions.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="admin-email" className="sr-only">
            Email / Phone
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-electric-blue" />
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="Email / Phone"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="admin-password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-electric-blue" />
            <input
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              required
              className={passwordInputClasses}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-oc-text transition-colors hover:text-electric-blue focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {state?.message && (
        <p
          role="alert"
          className="mt-5 flex items-center gap-2 border border-oc-danger/50 bg-oc-danger/10 px-4 py-3 text-sm text-oc-danger"
        >
          <ShieldAlert className="h-4 w-4" /> {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="oc-btn oc-btn--primary mt-8 w-full"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging In...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}