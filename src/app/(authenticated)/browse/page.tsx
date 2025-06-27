import Search from "@/components/browse/search";
import AddUserBookButton from "@/components/buttons/add-userbook-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { BookDetails } from "@/schema/BookSchema";
import { getAllBooks } from "@/server/actions/book/getAllBooks";
import Image from "next/image";
import Link from "next/link";

export default async function BrowsePage() {
  const [user, books] = await Promise.all([getCurrentUser(), getAllBooks()]);

  // console.log(books);
  console.log("role: ", user?.role);

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900 px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      {user?.role === "ADMIN" && (
        <Button variant="secondary" asChild>
          <Link href="/admin/add">Add Book to Database</Link>
        </Button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <Search books={books} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book: BookDetails, key: number) => (
            <Card
              key={key}
              className="group bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-zinc-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  height={300}
                  width={200}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {book.rating > 0 && (
                  <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{book.rating}</span>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                  {book.genre}
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg font-semibold line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                  {book.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">by {book.author}</span>
                  <span className="text-zinc-500">{book.yearPublished}</span>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <CardDescription className="text-zinc-400 text-sm line-clamp-3 mb-4">
                  {book.description}
                </CardDescription>

                <div className="flex justify-between items-center text-xs text-white -translate-y-6">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="">
                    {book.inProgressCount} currently reading
                  </span>
                  <span>{book.completedCount} have read!</span>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{book.pageCount} pages</span>
                  </span>
                </div>

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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
