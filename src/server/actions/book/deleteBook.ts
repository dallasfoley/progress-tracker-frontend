"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function deleteBook(id: number) {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      return { success: true, message: "Book deleted successfully!" };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
