"use server";

import { UserBookDetails } from "@/schema/UserBookSchema";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function updateUserBookRating(
  userbook: UserBookDetails,
  rating: number
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_}/user_books/rating/${userbook.userId}/${userbook.bookId}`;
    const accessToken = (await cookies()).get("accessToken")?.value;
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ rating }),
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
    if (!response.ok) {
      const res = await response.json();
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }

    const res = await response.json();
    revalidateTag("user-books");
    return {
      success: res.success ?? true,
      message: res.message || "Book updated successfully!",
      data: res.data,
    };
  } catch (error) {
    if (error instanceof Error) {
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
