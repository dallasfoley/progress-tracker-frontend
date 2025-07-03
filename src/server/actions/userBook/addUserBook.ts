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
      if (success) revalidateTag("user-books");
      return {
        success,
        message: error || "Unauthorized, please log in again.",
        data,
      };
    }
    if (response.ok) revalidateTag("user-books");
    return {
      success: response.ok,
      message: res.message || "Error adding book",
      data: res.data || null,
    };
  } catch (error) {
    console.error("Error in addUserBook:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add book",
      data: null,
    };
  }
}
