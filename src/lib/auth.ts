import { cookies } from "next/headers";
import type { User } from "@/schema/UserSchema";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get("user");

    if (!userSession || !userSession.value) {
      return null;
    }

    return JSON.parse(userSession.value);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("accessToken");
    return accessTokenCookie?.value || null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get("refreshToken");
    return refreshTokenCookie?.value || null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
}

export async function clearUserSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    console.error("Error clearing user session:", error);
  }
}
