import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth";

/**
 * Provider configuration for Auth.js.
 * Separated from the main config to allow edge-compatible imports.
 */
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "QuestLog Pro <noreply@questlogpro.app>",
    }),
  ],
} satisfies NextAuthConfig;
