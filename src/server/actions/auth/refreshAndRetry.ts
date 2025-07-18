"use server";

import { cookies } from "next/headers";

export async function refreshAndRetry(url: string, options: RequestInit = {}) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      console.error("No refresh token found");
    }

    console.log("Server Action: Refreshing token...");

    // Refresh the token
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshResponse.ok) {
      console.error("Token refresh failed");
      return {
        success: false,
        needsLogin: true,
        error: "Token refresh failed",
        data: null,
      };
    }

    const refreshData = await refreshResponse.json();
    const newAccessToken = refreshData.accessToken;

    // Set the new access token cookie (this works because it's a true server action)
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    console.log("Server Action: Token refreshed and cookie updated");

    // Retry the original request with new token
    console.log("Server Action: Retrying original request");
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(newAccessToken && { Authorization: `Bearer ${newAccessToken}` }),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      needsRefresh: response.status === 401, // Key flag for frontend
      data: response.ok ? data : null,
      error: response.ok
        ? null
        : data.message || data.error || "Request failed",
    };
  } catch (error) {
    console.error("Error in refreshTokenAndRetryRequest:", error);
    return {
      success: false,
      needsLogin: true,
      error: "Authentication failed",
      data: null,
    };
  }
}
