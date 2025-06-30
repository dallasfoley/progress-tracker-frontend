"use server";

import { UserBook, UserBookSchema } from "@/schema/UserBookSchema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addUserBook(userBook: UserBook) {
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:7000/api";

  const { success, error, data } = UserBookSchema.safeParse(userBook);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(
      `${API_BASE_URL}/user_books/${userBook.userId}/${userBook.bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
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
    } else {
      revalidateTag("user-books");
      return {
        success: res.success ?? true,
        message: res.message || "Book added successfully!",
        data: res.data,
      };
    }
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
