"use server";

import { LoginUsernameSchema, User } from "@/schema/UserSchema";
import { handleResponse } from "@/lib/handleResponse";
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
      body: form,
    });

    if (response.ok) {
      const result = await handleResponse<User>(response);
      const cookieStore = await cookies();
      cookieStore.set("user-session", JSON.stringify(result), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return {
        success: true,
        data: result,
        message: "Login successful",
      };
    } else {
      await handleResponse<User>(response);
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
