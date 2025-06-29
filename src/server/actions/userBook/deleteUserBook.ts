"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function deleteUserBook(userId: number, bookId: number) {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(
      `${API_BASE_URL}/user_books/${userId}/${bookId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Response status:", response.status);
    return await response.json();
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
