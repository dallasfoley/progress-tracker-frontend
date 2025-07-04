import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getAllBooks } from "@/server/functions/getAllBooks";
import BrowseBooksList from "./browse-books-list";
import ClientBrowseBooksList from "./client-browse-books-list";
import { Suspense } from "react";
import { getUserBooks } from "@/server/functions/getUserBooks";
import { redirect } from "next/navigation";

export default async function BrowseBooksWrapper() {
  const [user, booksResponse] = await Promise.all([
    getCurrentUser(),
    getAllBooks(),
  ]);

  if (!user) redirect("/");

  const books = booksResponse?.data;
  const status = booksResponse?.status;

  if (status === 401 || !books) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ClientBrowseBooksList />
      </Suspense>
    );
  }

  const userBooksResponse = await getUserBooks(user.id);
  const userBooks = userBooksResponse.data || [];

  return (
    <div>
      {user?.role === "ADMIN" && (
        <Button variant="secondary" asChild>
          <Link href="/admin/add">Add Book to Database</Link>
        </Button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <BrowseBooksList books={books} user={user} userBooks={userBooks} />
      </div>
    </div>
  );
}
