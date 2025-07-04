import { cookies } from "next/headers";
import type { User } from "@/schema/UserSchema";
//import { unstable_cache } from "next/cache";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log(
    "Available cookies:",
    allCookies.map((c) => c.name)
  );

  const userSession = cookieStore.get("user");
  if (!userSession || !userSession.value) {
    console.log("No user session found in cookies.");
    return null;
  }

  return JSON.parse(userSession.value);
}

//export const getCurrentUser = unstable_cache(_getCurrentUser, ["user"]);

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  return accessTokenCookie?.value || null;
}

//export const getAccessToken = unstable_cache(_getAccessToken, ["accessToken"]);

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshTokenCookie = cookieStore.get("refreshToken");
  return refreshTokenCookie?.value || null;
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
