"use server";

import { Register, RegisterSchema } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function updateUser(user: Register, id: number) {
  const { success, error, data } = RegisterSchema.safeParse(user);

  if (!success) {
    throw new Error(error.message);
  }
  const cookieStore = await cookies();
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;
    const accessToken = cookieStore.get("accessToken")?.value;
    const { username, email, password } = data;
    const userData = { id, username, email, password };
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const result = await response.json();
      cookieStore.set("user-session", JSON.stringify(result.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
      return {
        success: true,
        message: "User updated successfully!",
        data: result.data,
      };
    }
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
    return {
      success: false,
      message: "Failed to update user.",
      data: null,
    };
  } catch (error) {
    console.error("Network error during user update:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error during user update",
    };
  }
}
