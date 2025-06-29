"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "../book/getAllBooks";

export async function logout() {
  try {
    const cookieStore = await cookies();
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    cookieStore.delete("user-session");
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
