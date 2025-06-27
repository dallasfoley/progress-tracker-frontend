"use server";

import { Register, RegisterSchema } from "@/schema/UserSchema";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function updateUser(user: Register, id: number) {
  const { success, error, data } = RegisterSchema.safeParse(user);

  if (!success) {
    throw new Error(error.message);
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token")?.value || "";

  try {
    const { username, email, password } = data;
    const userData = { id, username, email, password };
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });

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
