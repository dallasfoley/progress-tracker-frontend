"use server";

import { UserBook, UserBookSchema } from "@/schema/UserBookSchema";
import { cookies } from "next/headers";

export async function addUserBook(userBook: UserBook) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

  const { success, error, data } = UserBookSchema.safeParse(userBook);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(
      `${API_BASE_URL}/user_books/${userBook.userId}/${userBook.bookId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();

    console.log("Response status:", response.status);
    if (!response.ok) {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }

    return {
      success: res.success ?? true,
      message: res.message || "Book added successfully!",
      data: res.data,
    };
  } catch (error) {
    console.error("Error in addUserBook:", error);

    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        return {
          success: false,
          message: "Network error. Please check your connection.",
        };
      }
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
