"use server";

import { LoginUsernameSchema } from "@/schema/UserSchema";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function loginUsername(formData: {
  username: string;
  password: string;
}) {
  const { success, error, data } = LoginUsernameSchema.safeParse(formData);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const form = new FormData();
    form.append("username", data.username);
    form.append("password", data.password);

    const response = await fetch(`${API_BASE_URL}/auth/login/username`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: form,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      return {
        success: false,
        message: "Login failed",
      };
    }

    const result = await response.json();

    // "Login successful:", result);
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(result.data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60,
      path: "/",
    });
    cookieStore.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60,
      path: "/",
    });
    cookieStore.set("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return {
      success: true,
      data: result.data,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
