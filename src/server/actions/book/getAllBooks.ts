const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7000/api";

export async function getAllBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Bad response (${response.status}):`,
        await response.text()
      );
      throw new Error(`Error fetching user books: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}
