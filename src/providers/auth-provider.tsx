"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useTransition,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { refreshAndRetry } from "@/server/actions/auth/refreshAndRetry";

interface AuthContextType {
  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  executeWithAuth: <T>(action: () => Promise<T>) => Promise<T | null>;
  refreshAndRetryRequest: (url: string, options?: RequestInit) => Promise<any>;
  clearError: () => void;

  // Transition state Refre
  isPending: boolean;
}

interface RefreshAndRetryResult {
  success: boolean;
  needsLogin: boolean;
  error: string | null;
  data: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshAndRetryRequest = useCallback(
    async (
      url: string,
      options: RequestInit = {}
    ): Promise<RefreshAndRetryResult | null> => {
      return new Promise((resolve) => {
        startTransition(async () => {
          try {
            console.log("Auth Context: Calling refreshAndRetry server action");

            // Call the true server action that can set cookies
            const result = await refreshAndRetry(url, options);

            if (result.needsLogin) {
              console.log(
                "Auth Context: Need to login again after refresh attempt"
              );
              setError("Session expired. Please login again.");
              router.push("/login");
              resolve(null);
              return;
            }

            if (!result.success) {
              console.log("Auth Context: Refresh and retry failed");
              setError(result.error || "Authentication failed");
              resolve(null);
              return;
            }

            console.log("Auth Context: Refresh and retry successful");
            resolve(result.data);
          } catch (error) {
            console.error("Auth Context: Error in refreshAndRetry:", error);
            const errorMessage =
              error instanceof Error ? error.message : "Authentication failed";
            setError(errorMessage);
            resolve(null);
          }
        });
      });
    },
    [router]
  );

  const executeWithAuth = useCallback(
    async <T,>(action: () => Promise<T>): Promise<T | null> => {
      return new Promise((resolve) => {
        setIsLoading(true);
        setError(null);

        startTransition(async () => {
          try {
            console.log("Auth Context: Executing initial action");

            const result = await action();

            // Check if result indicates auth failure (401)
            if (
              result &&
              typeof result === "object" &&
              "status" in result &&
              result.status === 401 &&
              "needsLogin" in result &&
              result.needsLogin
            ) {
              console.log(
                "Auth Context: Got 401, attempting refresh and retry"
              );

              // Extract URL and options from the original request
              // This is a bit tricky - we need to reconstruct the request details
              // For now, we'll handle this in the specific hook implementations
              setError("Token expired, please try again");
              resolve(null);
              return;
            }

            // Check if result indicates general failure
            if (
              result &&
              typeof result === "object" &&
              "success" in result &&
              !result.success
            ) {
              const message =
                "message" in result
                  ? (result.message as string)
                  : "Operation failed";
              setError(message);
              resolve(null);
              return;
            }

            console.log("Auth Context: Action completed successfully");
            resolve(result);
          } catch (error) {
            console.error("Auth Context: Action failed with error:", error);
            const errorMessage =
              error instanceof Error
                ? error.message
                : "An unexpected error occurred";
            setError(errorMessage);
            resolve(null);
          } finally {
            setIsLoading(false);
          }
        });
      });
    },
    [router]
  );

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        error,
        executeWithAuth,
        refreshAndRetryRequest,
        clearError,
        isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
