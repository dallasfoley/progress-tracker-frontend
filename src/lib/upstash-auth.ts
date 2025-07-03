// lib/upstash-auth.ts
import { JWTSessionManager } from "./session";
import type { User } from "@/schema/UserSchema";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await JWTSessionManager.getSession();
    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  try {
    // This will automatically refresh if needed
    const session = await JWTSessionManager.getSession();
    return session?.accessToken || null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const session = await JWTSessionManager.getSession();
    return session?.refreshToken || null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
}

export async function clearUserSession(): Promise<void> {
  try {
    await JWTSessionManager.deleteSession();
  } catch (error) {
    console.error("Error clearing user session:", error);
  }
}
