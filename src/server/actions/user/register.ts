"use server";

import { RegisterSchema, User } from "@/schema/UserSchema";
import { handleResponse } from "@/lib/handleResponse";

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
    });

    console.log("Response status:", response.status);
    return handleResponse<User>(response);
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
