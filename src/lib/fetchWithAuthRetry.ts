export async function fetchWithAuthRetry(
  input: RequestInfo,
  init?: RequestInit,
  refreshToken?: string
): Promise<{ response: Response; newAccessToken?: string }> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? ""
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    console.log(`Proxying request to: ${baseUrl}/api/authProxy`);

    const proxyResponse = await fetch(`${baseUrl}/api/authProxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: input.toString(),
        options: init,
        refreshToken,
      }),
    });

    const result = await proxyResponse.json();

    // If the proxy returned an error
    if (!proxyResponse.ok) {
      return {
        response: new Response(JSON.stringify(result), {
          status: proxyResponse.status,
          statusText: proxyResponse.statusText,
          headers: { "Content-Type": "application/json" },
        }),
      };
    }

    const responseData = JSON.stringify(result.data || {});
    return {
      response: new Response(responseData, {
        status: result.status || 200,
        statusText: result.ok ? "OK" : "Error",
        headers: { "Content-Type": "application/json" },
      }),
      newAccessToken: result.newAccessToken || "",
    };
  } catch (err) {
    console.error("Unexpected error in fetchWithAuthRetry:", err);

    return {
      response: new Response(
        JSON.stringify({
          error: "Network error or unexpected failure in fetchWithAuthRetry",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }
}
