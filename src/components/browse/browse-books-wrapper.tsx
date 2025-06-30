import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getAllBooks } from "@/server/actions/book/getAllBooks";
import BrowseBooksList from "./browse-books-list";

export const experimental_ppr = false;

export default async function BrowseBooksWrapper() {
  const [user, books] = await Promise.all([
    getCurrentUser(),
    (await getAllBooks()).data,
  ]);

  if (!books || !user) return null;
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
