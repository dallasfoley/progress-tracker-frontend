"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "../book/getAllBooks";

export async function logout() {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";

    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const cookieStore = await cookies();
    cookieStore.delete("user-session");
    cookieStore.delete("access-token");
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
