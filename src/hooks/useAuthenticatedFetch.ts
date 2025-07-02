"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/auth-provider";

interface UseAuthenticatedFetchOptions<T> {
  fetchAction: () => Promise<T>;
  requestUrl?: string; // URL for refresh and retry
  requestOptions?: RequestInit; // Options for refresh and retry
  autoFetch?: boolean;
}

export function useAuthenticatedFetch<T>({
  fetchAction,
  requestUrl,
  requestOptions = { method: "GET" },
  autoFetch = true,
}: UseAuthenticatedFetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { refreshAndRetryRequest, isLoading, error, clearError, isPending } =
    useAuth();

  const fetchData = useCallback(async () => {
    clearError();

    try {
      console.log("useAuthenticatedFetch: Making initial request");

      // Call the server function first
      const result = await fetchAction();

      // Check if we got a 401 and need to refresh
      if (
        result &&
        typeof result === "object" &&
        "status" in result &&
        result.status === 401
      ) {
        console.log("useAuthenticatedFetch: 401, attempting refresh and retry");

        if (!requestUrl) {
          console.error(
            "useAuthenticatedFetch: No requestUrl provided for refresh and retry"
          );
          setData(null);
          setHasInitialized(true);
          return;
        }

        // Use the refreshAndRetryRequest from context
        const retryResult = await refreshAndRetryRequest(
          requestUrl,
          requestOptions
        );

        if (retryResult) {
          console.log("useAuthenticatedFetch: Refresh and retry successful");
          // The retryResult should be the actual data from the API
          setData({
            success: true,
            data: retryResult,
            message: "Data fetched successfully after token refresh",
          } as T);
        } else {
          console.log("useAuthenticatedFetch: Refresh and retry failed");
          setData(null);
        }
      } else {
        // Initial request was successful or failed for non-auth reasons
        console.log("useAuthenticatedFetch: Initial request completed");
        setData(result);
      }
    } catch (error) {
      console.error("useAuthenticatedFetch: Error in fetchData:", error);
      setData(null);
    } finally {
      setHasInitialized(true);
    }
  }, [
    fetchAction,
    requestUrl,
    requestOptions,
    refreshAndRetryRequest,
    clearError,
  ]);
  const refetch = () => {
    setHasInitialized(false);
    fetchData();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    isLoading: isLoading || isPending || !hasInitialized,
    error,
    refetch,
    hasInitialized,
  };
}
