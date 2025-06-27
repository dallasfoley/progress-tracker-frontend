import { cookies } from "next/headers";
import type { User } from "@/schema/UserSchema";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userSession = cookieStore.get("user-session");

    if (!userSession || !userSession.value) {
      return null;
    }
    console.log(userSession.value);
    return JSON.parse(userSession.value);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("user-session");
}
