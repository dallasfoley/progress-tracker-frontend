"use server";

import { RegisterSchema } from "@/schema/UserSchema";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function register(formData: {
  username: string;
  email: string;
  password: string;
}) {
  const { success, error, data } = RegisterSchema.safeParse(formData);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const form = new FormData();
    form.append("username", data.username);
    form.append("email", data.email);
    form.append("password", data.password);

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: form,
      credentials: "include",
    });

    console.log("Response status:", response.status);
    const res = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }

    if (res.accessToken) {
      (await cookies()).set({
        name: "accessToken",
        value: res.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
      });
      (await cookies()).set({
        name: "user-session",
        value: res.data,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
      });
    }

    return {
      success: res.success ?? true,
      message: res.message || "User registered successfully! Please login now",
      data: res.data,
      accessToken: res.accessToken,
    };
  } catch (error) {
    console.error("Network error during signup:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Network error during signup",
    };
  }
}
