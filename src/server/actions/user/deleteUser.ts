"use server";

export async function deleteUser(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Network error during signup:", error);
    throw error;
  }
}
