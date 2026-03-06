"use client";

import { signInWithEmail } from "@/features/auth/actions";

export function EmailOtpForm() {
  return (
    <form action={signInWithEmail} className="flex flex-col gap-3">
      <label htmlFor="email" className="text-sm font-medium text-gray-700">
        Or sign in with email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="adventurer@example.com"
        className="rounded-lg border border-gray-300 px-4 py-3 text-sm
                   shadow-sm focus:border-amber-500 focus:outline-none
                   focus:ring-1 focus:ring-amber-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium
                   text-white shadow-sm transition-colors hover:bg-amber-600"
      >
        Send Magic Link ✉️
      </button>
    </form>
  );
}
