import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getAllBooks } from "@/server/functions/getAllBooks";
import BrowseBooksList from "./browse-books-list";
import ClientBrowseBooksList from "./client-browse-books-list";
import { Suspense } from "react";

export const experimental_ppr = false;

export default async function BrowseBooksWrapper() {
  const [user, { data, status }] = await Promise.all([
    getCurrentUser(),
    await getAllBooks(),
  ]);

  if (!user) return null;

  const books = data;

  if (status === 401 || !books) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ClientBrowseBooksList />
      </Suspense>
    );
  }

  return (
    <div>
      {user?.role === "ADMIN" && (
        <Button variant="secondary" asChild>
          <Link href="/admin/add">Add Book to Database</Link>
        </Button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <BrowseBooksList books={books} user={user} />
      </div>
    </div>
  );
}
