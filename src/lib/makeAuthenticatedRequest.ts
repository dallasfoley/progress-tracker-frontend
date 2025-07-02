// Server-side API client (no cookie setting)
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
  accessToken?: string
) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      needsRefresh: response.status === 401, // Key flag for frontend
      data: response.ok ? data : null,
      error: response.ok
        ? null
        : data.message || data.error || "Request failed",
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      status: 500,
      needsRefresh: false,
      data: null,
      error: "Network error occurred",
    };
  }
}
