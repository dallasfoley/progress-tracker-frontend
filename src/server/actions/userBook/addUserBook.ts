"use server";

import { UserBook, UserBookSchema } from "@/schema/UserBookSchema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function addUserBook(userBook: UserBook) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_books/${userBook.userId}/${userBook.bookId}`;

  const { success, error, data } = UserBookSchema.safeParse(userBook);

  if (!success) {
    throw new Error(error.message);
  }

  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-store", // Ensure we always get the latest data
      next: {
        tags: ["user-books"],
      },
    };
    const response = await fetch(url, options);
    const res = await response.json();

    console.log("Response status:", response.status);

    if (response.status === 401) {
      const { success, error, data } = await refreshAndRetry(url, options);
      if (!success) {
        return {
          success: false,
          message: error || "Unauthorized, login required",
          data: null,
        };
      } else {
        revalidateTag("user-books");
        revalidateTag("books");
        return {
          success: true,
          message: data.message,
          data: data.data,
        };
      }
    }
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
