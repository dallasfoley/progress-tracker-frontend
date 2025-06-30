"use server";

import { UserBookDetails } from "@/schema/UserBookSchema";
import { API_BASE_URL } from "../book/getAllBooks";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function updateUserBookStatus(
  userbook: UserBookDetails,
  status: UserBookDetails["status"]
) {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(
      `${API_BASE_URL}/user_books/status/${userbook.userId}/${userbook.bookId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const res = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }
    revalidateTag("user-books");
    return {
      success: res.success ?? true,
      message: res.message || "Book updated successfully!",
      data: res.data,
    };
  } catch (error) {
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
