import { cookies } from "next/headers";
import type { User } from "@/schema/UserSchema";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get("user");

    if (!userSession || !userSession.value) {
      console.log("❌ No user session found in cookies");
      return null;
    }

    console.log("✅ User session found:", userSession.value);
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

    if (!accessTokenCookie || !accessTokenCookie.value) {
      console.log("❌ No access token found in cookies");
      return null;
    }

    console.log("✅ Access token found");
    return accessTokenCookie.value;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get("refreshToken");

    if (!refreshTokenCookie || !refreshTokenCookie.value) {
      console.log("❌ No refresh token found in cookies");
      return null;
    }

    console.log("✅ Refresh token found");
    return refreshTokenCookie.value;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
