"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { refreshAndRetry } from "../auth/refreshAndRetry";

export async function deleteUserBook(userId: number, bookId: number) {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_books/${userId}/${bookId}`;

    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
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
    if (response.ok) {
      revalidateTag("user-books");
      return {
        success: res.success ?? true,
        message: res.message || "Book added successfully!",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
