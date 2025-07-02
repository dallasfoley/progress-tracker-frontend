"use server";

import { LoginEmailSchema } from "@/schema/UserSchema";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function loginEmail(formData: {
  email: string;
  password: string;
}) {
  const { success, error, data } = LoginEmailSchema.safeParse(formData);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const form = new FormData();
    form.append("email", data.email);
    form.append("password", data.password);

    const response = await fetch(`${API_BASE_URL}/auth/login/email`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: form,
    });

    if (response.ok) {
      const [result, cookieStore] = await Promise.all([
        response.json(),
        cookies(),
      ]);
      cookieStore.set("user", result.data, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60,
      });
      cookieStore.set("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60, // 1 hour
      });
      cookieStore.set("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return {
        success: true,
        message: "Login successful",
        data: result.data,
      };
    } else {
      const result = await response.json();
      return {
        success: false,
        message: result.message || "Login failed",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Login failed",
      data: null,
    };
  }
}
