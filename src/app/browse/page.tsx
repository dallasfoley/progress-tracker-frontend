import AddUserBookButton from "@/components/buttons/add-userbook-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { Book } from "@/schema/BookSchema";
import { getAllBooks } from "@/server/actions/book/getAllBooks";
import Image from "next/image";

export default async function BrowsePage() {
  const [user, books] = await Promise.all([getCurrentUser(), getAllBooks()]);

  return (
    <main>
      <h1>Search</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book: Book, key: number) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>
                {book.title} by {book.author}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={book.coverUrl}
                alt={book.title}
                height={200}
                width={200}
                className="w-full h-auto object-cover"
              />
            </CardContent>
            <CardDescription>{book.description}</CardDescription>
            {user && <AddUserBookButton book={book} user={user} />}
          </Card>
        ))}
      </ul>
    </main>
  );
}
