"use server";

import { UserBookDetails } from "@/schema/UserBookSchema";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function updateUserBookPage(
  userbook: UserBookDetails,
  currentPage: number
) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_books/page/${userbook.userId}/${userbook.bookId}`;
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ currentPage }),
    };
    const response = await fetch(url, options);
    if (response.status === 401) {
      const { success, error, data } = await refreshAndRetry(url, options);
      if (!success) {
        return {
          success: false,
          message: error || "Unauthorized, login required",
          data: null,
        };
      } else {
        return {
          success: true,
          message: data.message,
          data: data.data,
        };
      }
    }
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
