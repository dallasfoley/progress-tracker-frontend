import { getCurrentUser } from "@/lib/auth";
import { getUserBooks } from "@/server/functions/getUserBooks";
import { redirect } from "next/navigation";
import type { UserBookDetails } from "@/schema/UserBookSchema";
import { UserBooksDisplay } from "./user-books-display";
import { UserBooksClientWrapper } from "./user-books-list-client-wrapper";

export const experimental_ppr = false;

export async function UserBooksList() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  let userBooks: UserBookDetails[] = [];
  let error: string | null = null;

  try {
    const response = await getUserBooks(user.id);
    if (response.status === 401) {
      return <UserBooksClientWrapper userId={user.id} userRole={user.role} />;
    }
    userBooks = response.data || [];
  } catch (e) {
    // console.error("Error fetching user books:", e);
    error = e instanceof Error ? e.message : "Failed to load your books";
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (userBooks.length === 0) {
    return (
      <p className="text-zinc-400 text-center">
        You have no books in your reading list.
      </p>
    );
  }

  return <UserBooksDisplay userBooks={userBooks} userRole={user.role} />;
}
