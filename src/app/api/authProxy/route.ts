import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, options, refreshToken } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    async function makeAuthenticatedRequest(token?: string) {
      return fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          ...options?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    }

    async function refreshAccessToken() {
      const refreshRes = await fetch(
        `${process.env.API_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshRes.ok) throw new Error("Token refresh failed");

      const json = await refreshRes.json();
      return json.accessToken;
    }

    let response = await makeAuthenticatedRequest();
    let newAccessToken: string | undefined = undefined;

    if (response.status === 401) {
      const body = await response
        .clone()
        .json()
        .catch(() => ({}));
      if (body?.error === "Unauthorized" || body?.code === "EXPIRED_TOKEN") {
        newAccessToken = await refreshAccessToken();
        response = await makeAuthenticatedRequest(newAccessToken);
      }
    }

    const data = await response.json();

    const nextResponse = NextResponse.json({
      data,
      status: response.status,
      ok: response.ok,
      newAccessToken,
      tokenRefreshed: !!newAccessToken,
    });

    if (newAccessToken) {
      nextResponse.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("Error in proxy handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
