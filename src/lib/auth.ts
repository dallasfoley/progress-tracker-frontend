import { cookies } from "next/headers";
import type { User } from "@/schema/UserSchema";
//import { unstable_cache } from "next/cache";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get("user");
    console.log("User session cookie:", userSession);
    console.log("All cookies:", cookieStore.getAll());
    if (!userSession || !userSession.value) {
      console.log("No user session found in cookies.");
      return null;
    }

    return JSON.parse(userSession.value);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

//export const getCurrentUser = unstable_cache(_getCurrentUser, ["user"]);

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

//export const getAccessToken = unstable_cache(_getAccessToken, ["accessToken"]);

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
