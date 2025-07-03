import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const debugInfo = {
      timestamp: new Date().toISOString(),
      totalCookies: allCookies.length,
      cookieNames: allCookies.map((c) => c.name),
      userCookie: {
        exists: !!cookieStore.get("user"),
        valueLength: cookieStore.get("user")?.value?.length || 0,
        value: cookieStore.get("user")?.value?.slice(0, 100) + "...", // First 100 chars only
      },
      accessToken: {
        exists: !!cookieStore.get("accessToken"),
        valueLength: cookieStore.get("accessToken")?.value?.length || 0,
      },
      refreshToken: {
        exists: !!cookieStore.get("refreshToken"),
        valueLength: cookieStore.get("refreshToken")?.value?.length || 0,
      },
    };

    return NextResponse.json(debugInfo);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to read cookies",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
