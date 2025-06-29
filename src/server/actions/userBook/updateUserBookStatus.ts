"use server";

import { UserBookDetails } from "@/schema/UserBookSchema";
import { API_BASE_URL } from "../book/getAllBooks";
import { cookies } from "next/headers";

export async function updateUserBookStatus(
  userbook: UserBookDetails,
  status: UserBookDetails["status"]
) {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(
      `${API_BASE_URL}/user_books/status/${userbook.userId}/${userbook.bookId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const res = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }

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
