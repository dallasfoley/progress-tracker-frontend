import UserBook from "@/components/userbook";
import { getCurrentUser } from "@/lib/auth";
import { getUserBooks } from "@/server/actions/userBook/getUserBooks";
import { redirect } from "next/navigation";
import type { UserBookDetails } from "@/schema/UserBookSchema";
import Link from "next/link";
import { Button } from "../ui/button";

export const experimental_ppr = false;

export async function UserBooksList() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  let userBooks: UserBookDetails[] = [];
  let error: string | null = null;

  try {
    const response = await getUserBooks(user.id);
    if (response.success && response.data) {
      userBooks = response.data;
    } else {
      error = response.message;
    }
  } catch (e) {
    console.error("Error fetching user books:", e);
    error = e instanceof Error ? e.message : "Failed to load your books";
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (userBooks.length === 0) {
    return (
      <p className="text-zinc-400 text-center">
        You have no books in your reading list.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {user.role === "ADMIN" && (
        <div className="flex justify-end mb-4">
          <Button variant="secondary" asChild>
            <Link href="/admin/add">Add Book to Database</Link>
          </Button>
        </div>
      )}
      <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {userBooks.map((book: UserBookDetails, index: number) => (
          <li key={book.bookId || index} className="text-zinc-200">
            <UserBook userBook={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}
