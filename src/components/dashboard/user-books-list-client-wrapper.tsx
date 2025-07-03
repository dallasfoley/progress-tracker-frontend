"use client";

import { getUserBooks } from "@/server/functions/getUserBooks";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { UserBooksDisplay } from "./user-books-display";
import { Suspense, useCallback, useMemo } from "react";

interface UserBooksClientWrapperProps {
  userId: number;
  userRole: string;
}

export function UserBooksClientWrapper({
  userId,
  userRole,
}: UserBooksClientWrapperProps) {
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include" as RequestCredentials,
      cache: "force-cache" as RequestCache,
      next: {
        tags: ["user-books"],
      },
    }),
    []
  );

  const fetchAction = useCallback(() => getUserBooks(userId), [userId]);

  const {
    data: result,
    isLoading,
    error,
    refetch,
    hasInitialized,
  } = useAuthenticatedFetch({
    fetchAction,
    requestUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user_books/${userId}`,
    requestOptions: options,
  });

  if (isLoading && !hasInitialized) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  if (!result || !result.success) {
    return (
      <p className="text-zinc-400 text-center">Failed to load your books.</p>
    );
  }

  const userBooks = Array.isArray(result.data) ? result.data : [];
  if (!userBooks || userBooks.length === 0) {
    return (
      <p className="text-zinc-400 text-center">
        You have no books in your reading list.
      </p>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserBooksDisplay userBooks={result.data} userRole={userRole} />
    </Suspense>
  );
}
