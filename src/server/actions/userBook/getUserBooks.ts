import { UserBookDetails } from "@/schema/UserBookSchema";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function getUserBooks(userId: number): Promise<{
  success: boolean;
  message: string;
  data: UserBookDetails[] | null;
}> {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(`${API_BASE_URL}/user_books/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: res.message || `Server error: ${response.status}`,
        data: null,
      };
    }

    return {
      success: res.success ?? true,
      message: res.message || "Got books!",
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}
