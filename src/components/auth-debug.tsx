"use client";

import { useEffect, useState } from "react";

interface DebugInfo {
  timestamp: string;
  totalCookies: number;
  cookieNames: string[];
  userCookie: {
    exists: boolean;
    valueLength: number;
    value: string;
  };
  accessToken: {
    exists: boolean;
    valueLength: number;
  };
  refreshToken: {
    exists: boolean;
    valueLength: number;
  };
}

export function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/debug")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setDebugInfo(data);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      {error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : debugInfo ? (
        <div className="space-y-1">
          <p>Cookies: {debugInfo.totalCookies}</p>
          <p>User: {debugInfo.userCookie.exists ? "✓" : "✗"}</p>
          <p>Access Token: {debugInfo.accessToken.exists ? "✓" : "✗"}</p>
          <p>Refresh Token: {debugInfo.refreshToken.exists ? "✓" : "✗"}</p>
          <p className="text-xs text-gray-400">{debugInfo.timestamp}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
