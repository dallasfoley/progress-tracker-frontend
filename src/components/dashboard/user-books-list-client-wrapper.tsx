"use client";

import { getUserBooks } from "@/server/functions/getUserBooks";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { UserBooksDisplay } from "./user-books-display";

interface UserBooksClientWrapperProps {
  userId: number;
  userRole: string;
}

export function UserBooksClientWrapper({
  userId,
  userRole,
}: UserBooksClientWrapperProps) {
  const {
    data: result,
    isLoading,
    error,
    refetch,
    hasInitialized,
  } = useAuthenticatedFetch({
    fetchAction: () => getUserBooks(userId),
    requestUrl: `${process.env.API_BASE_URL}/user_books/${userId}`,
    requestOptions: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      cache: "force-cache",
      next: {
        tags: ["user-books"],
      },
    },
    dependencies: [userId],
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

  return <UserBooksDisplay userBooks={result.data || []} userRole={userRole} />;
}
