"use server";

import { cookies } from "next/headers";
import { logout } from "../auth/logout";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function deleteUser(id: number) {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    };
    const response = await fetch(url, options);
    if (response.status === 401) {
      const { success, error, data } = await refreshAndRetry(url, options);
      if (!success) {
        return {
          success: false,
          message: error || "Unauthorized, login required",
          data: null,
        };
      } else {
        return {
          success: true,
          message: data.message,
          data: data.data,
        };
      }
    }
    if (response.ok) {
      await logout();
      return { success: true, message: "User deleted successfully!" };
    } else {
      return { success: false, message: "Failed to delete user." };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    return { success: false, message: "Failed to delete user." };
  }
}
