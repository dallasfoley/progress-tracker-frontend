"use server";

import { Book } from "@/schema/BookSchema";
import { cookies } from "next/headers";

export async function adminUpdateBook(
  book: Book
): Promise<{ success: boolean; message: string; data: Book | null }> {
  try {
    const accessToken = (await cookies()).get("access-token")?.value || "";
    const response = await fetch(`${process.env.API_BASE_URL}/books`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(book),
    });
    const res = await response.json();
    console.log("Response:", res);
    if (response.ok) {
      console.log("Book updated successfully!");
      return {
        success: true,
        message: "Book updated successfully!",
        data: res.data,
      };
    } else {
      console.error(res?.message || `Server error: ${response.status}`);
      return { success: false, message: res.message, data: null };
    }
  } catch (e) {
    console.error("Book creation error:", e);
    return { success: false, message: "Book creation error", data: null };
  }
}
