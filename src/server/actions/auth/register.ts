"use server";

import { RegisterSchema } from "@/schema/UserSchema";
import { revalidatePath, revalidateTag } from "next/cache";
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

    if (response.ok) {
      const [res, cookieStore] = await Promise.all([
        response.json(),
        cookies(),
      ]);
      cookieStore.set("user", res.data, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
      cookieStore.set("accessToken", res.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
      cookieStore.set("refreshToken", res.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      revalidatePath("/dashboard");
      revalidateTag("user");
      revalidateTag("user-books");
      return { success: true, message: res.message, data: res.data };
    } else {
      const res = await response.json();
      return {
        success: false,
        message:
          res.message ||
          `Server error: ${response.status}` ||
          "Network error during signup",
        data: null,
      };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Network error during signup",
    };
  }
}
