"use server";

import { API_BASE_URL } from "../book/getAllBooks";
import { logout } from "./logout";

export async function deleteUser(id: number) {
  try {
    console.log("url: ", `${API_BASE_URL}/users/${id}`);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      await logout();
      return { success: true, message: "User deleted successfully!" };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    return { success: false, message: "Failed to delete user." };
  }
}
