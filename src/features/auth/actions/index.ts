"use server";

import { signIn as authSignIn, signOut as authSignOut } from "@/features/auth/lib/auth";

export async function signInWithProvider(provider: string) {
  await authSignIn(provider, { redirectTo: "/" });
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  await authSignIn("resend", { email, redirectTo: "/" });
}

export async function signOutAction() {
  await authSignOut({ redirectTo: "/login" });
}
