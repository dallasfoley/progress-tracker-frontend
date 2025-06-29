"use server";

import { revalidateTag } from "next/cache";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:7000/api";

export async function deleteUserBook(userId: number, bookId: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/user_books/${userId}/${bookId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    if (response.ok) {
      revalidateTag("user-books");
      return {
        success: res.success ?? true,
        message: res.message || "Book added successfully!",
        data: res.data,
      };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
