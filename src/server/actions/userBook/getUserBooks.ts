// src/server/actions/userBook/getUserBooks.ts
"use server";

import { getAccessToken, getRefreshToken } from "@/lib/auth";
import { fetchWithAuthRetry } from "@/lib/fetchWithAuthRetry";

export async function getUserBooks(userId: number) {
  const targetUrl = `${process.env.API_BASE_URL}/user_books/${userId}`;

  try {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    console.log("Access Token getUserBooks:", accessToken);
    console.log("Refresh Token getUserBooks:", refreshToken);
    const { response } = await fetchWithAuthRetry(
      targetUrl,
      {
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
      },
      refreshToken ?? undefined
    );

    const res = await response.json();

    if (!response.ok) {
      const errorResult = {
        success: false,
        message: res.message || res.error || "Request failed",
        data: null,
      };

      return errorResult;
    }

    const successResult = {
      success: true,
      message: res.message,
      data: res.data,
    };

    return successResult;
  } catch (error) {
    const errorResult = {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };

    return errorResult;
  }
}
