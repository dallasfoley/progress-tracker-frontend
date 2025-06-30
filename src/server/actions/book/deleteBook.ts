"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:7000/api";

export async function deleteBook(id: number) {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (response.ok) {
      return { success: true, message: "Book deleted successfully!" };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
