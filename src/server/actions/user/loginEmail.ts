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
      body: form,
    });

    if (response.ok) {
      const result = await response.json();
      const cookieStore = await cookies();
      cookieStore.set("user-session", JSON.stringify(result.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
      cookieStore.set("access-token", JSON.stringify(result.accessToken), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
    }
    return await response.json();
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
