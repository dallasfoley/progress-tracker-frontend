import { BookDetails } from "@/schema/BookSchema";
import { cookies } from "next/headers";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function getAllBooks(): Promise<BookDetails[]> {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      console.error(
        `Bad response (${response.status}):`,
        await response.text()
      );
      throw new Error(`Error fetching user books: ${response.statusText}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.error("Network error during signup:", e);
    throw e;
  }
}
