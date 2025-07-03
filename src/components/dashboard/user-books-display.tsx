import { UserBookDetails } from "@/schema/UserBookSchema";
import UserBook from "@/components/dashboard/userbook";
import { Button } from "../ui/button";
import Link from "next/link";
import { Suspense } from "react";

interface UserBooksDisplayProps {
  userBooks: UserBookDetails[];
  userRole: string;
}

export function UserBooksDisplay({
  userBooks,
  userRole,
}: UserBooksDisplayProps) {
  if (!userBooks || userBooks.length === 0) {
    return (
      <p className="text-zinc-400 text-center">
        You have no books in your reading list.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {userRole === "ADMIN" && (
        <div className="flex justify-end mb-4">
          <Button variant="secondary" asChild>
            <Link href="/admin/add">Add Book to Database</Link>
          </Button>
        </div>
      )}
      <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <Suspense fallback={<div>Loading...</div>}>
          {userBooks.map((book: UserBookDetails, index: number) => (
            <li key={book.bookId || index} className="text-zinc-200">
              <Suspense
                fallback={<div>Loading...</div>}
                key={book.bookId || index}
              >
                <UserBook userBook={book} />
              </Suspense>
            </li>
          ))}
        </Suspense>
      </ul>
    </div>
  );
}
