// src/server/actions/userBook/getUserBooks.ts
"use server";

import { getAccessToken, getRefreshToken } from "@/lib/auth";
import { fetchWithAuthRetry } from "@/lib/fetchWithAuthRetry";
import { cookies } from "next/headers";

export async function getUserBooks(userId: number) {
  const targetUrl = `${process.env.API_BASE_URL}/user_books/${userId}`;

  try {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    console.log("Access Token getUserBooks:", accessToken);
    console.log("Refresh Token getUserBooks:", refreshToken);
    console.log("🔄 Calling fetchWithAuthRetry");
    let { response, newAccessToken } = await fetchWithAuthRetry(
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

    console.log("🔄 Parsing response JSON");

    const res = await response.json();

    if (!response.ok) {
      console.log("❌ Response not ok");
      const errorResult = {
        success: false,
        message: res.message || res.error || "Request failed",
        data: null,
      };

      return errorResult;
    }

    console.log("✅ Request successful");
    const successResult = {
      success: true,
      message: res.message,
      data: res.data,
    };

    console.log("✅ getUserBooks completed successfully");

    return successResult;
  } catch (error) {
    console.log("💥 ERROR in getUserBooks:", error);

    const errorResult = {
      success: false,
      message: "An unexpected error occurred",
      data: null,
    };

    console.log("❌ Returning error result");

    return errorResult;
  }
}
