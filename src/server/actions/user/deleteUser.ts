"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "../book/getAllBooks";
import { logout } from "./logout";

export async function deleteUser(id: number) {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    console.log("url: ", `${API_BASE_URL}/users/${id}`);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      await logout();
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
