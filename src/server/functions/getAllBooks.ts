"use server";

import { BookDetails } from "@/schema/BookSchema";
import { cookies } from "next/headers";

export async function getAllBooks(): Promise<{
  success: boolean;
  status: number;
  message: string;
  data: BookDetails[] | null;
}> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      cache: "force-cache",
      next: {
        tags: ["books"],
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        console.log("getAllBooks: 401 Unauthorized");
        return {
          success: false,
          status: 401,
          message: "401 Unauthorized",
          data: null,
        };
      }
      const res = await response.json();
      console.error(`Bad response (${response.status})`);
      return {
        success: false,
        status: response.status,
        message: res.message || res.error || "Request failed",
        data: null,
      };
    } else {
      const data = await response.json();
      return {
        success: true,
        status: 200,
        message: "Books fetched successfully",
        data: data,
      };
    }
  } catch (e) {
    console.error("Network error during signup:", e);
    throw e;
  }
}
