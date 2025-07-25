// src/server/functions/userBook/getUserBooks.ts
"use server";

import { getAccessToken } from "@/lib/auth";

export async function getUserBooks(userId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_books/${userId}`;

  try {
    const accessToken = await getAccessToken();
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      cache: "force-cache",
      next: {
        tags: ["user-books"],
      },
    };
    const response = await fetch(url, options);
    console.log("status getUserBooks:", response.status);

    if (response.status === 401) {
      return {
        success: false,
        status: 401,
        needsLogin: true,
        message: "401 Unauthorized",
        data: null,
      };
    }

    const res = await response.json();
    if (!response.ok) {
      const errorResult = {
        success: false,
        status: response.status,
        message: res.message || res.error || "Request failed",
        data: null,
      };

      return errorResult;
    }

    const successResult = {
      success: true,
      status: 200,
      message: res.message,
      data: res.data,
    };

    return successResult;
  } catch (error) {
    const errorResult = {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };

    return errorResult;
  }
}
