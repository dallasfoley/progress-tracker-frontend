import { getCurrentUser } from "@/lib/auth";
import { Link } from "lucide-react";
import AddUserBookButton from "../buttons/add-userbook-button";
import { Button } from "../ui/button";
import { BookDetails } from "@/schema/BookSchema";

export const experimental_ppr = false;

export default async function BrowseBooksButtons(book: BookDetails) {
  const user = await getCurrentUser();
  return (
    <div>
      {user && (
        <div className="mt-4">
          <AddUserBookButton book={book} user={user} />
        </div>
      )}
      {user?.role === "ADMIN" && (
        <Button variant="secondary" className="w-full mt-4" asChild>
          <Link href={`/admin/${book.id}`}>Open in Admin Page</Link>
        </Button>
      )}
    </div>
  );
}
