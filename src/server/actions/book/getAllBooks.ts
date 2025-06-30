import { fetchWithAuthRetry } from "@/lib/fetchWithAuthRetry";
import { BookDetails } from "@/schema/BookSchema";
import { cookies } from "next/headers";

export const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:7000/api";

export async function getAllBooks(): Promise<{
  success: boolean;
  message: string;
  data: BookDetails[] | null;
}> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const { response } = await fetchWithAuthRetry(`${API_BASE_URL}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      cache: "force-cache",
    });

    if (!response.ok) {
      const res = await response.json();
      console.error(`Bad response (${response.status})`);
      return {
        success: false,
        message: res.message || res.error || "Request failed",
        data: null,
      };
    } else {
      const data = await response.json();
      return {
        success: true,
        message: "Books fetched successfully",
        data: data,
      };
    }
  } catch (e) {
    console.error("Network error during signup:", e);
    throw e;
  }
}
