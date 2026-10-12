import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://ph-b14-a07.vercel.app",
});
export const { signIn, signUp, useSession } = authClient;