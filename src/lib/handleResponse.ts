export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.text().catch(() => response.statusText);
    console.error("API Error:", response.status, errorData);
    throw new Error(errorData || `Error: ${response.status}`);
  }

  // If the response is empty or status is 204 No Content, return null
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null as T;
  }

  // Only try to parse JSON if we have content
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();
    // Check if there's actual content to parse
    return text ? JSON.parse(text) : (null as T);
  }

  return null as T;
}
