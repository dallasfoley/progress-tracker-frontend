"use server";

import { AddBook } from "@/schema/BookSchema";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:7000/api";

export async function adminAddBook(book: AddBook) {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(book),
    });
    const res = await response.json();
    console.log("Response:", res);
    if (response.ok) {
      console.log("Book created successfully!");
      return {
        success: true,
        message: "Book created successfully!",
        data: res,
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
