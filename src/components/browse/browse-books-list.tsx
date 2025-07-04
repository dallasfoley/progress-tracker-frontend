"use client";

import { BookDetails } from "@/schema/BookSchema";
import Link from "next/link";
import AddUserBookButton from "../buttons/add-userbook-button";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { User } from "@/schema/UserSchema";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserBookDetails } from "@/schema/UserBookSchema";

export default function BrowseBooksList({
  books,
  user,
  userBooks,
}: {
  books: BookDetails[];
  user: User;
  userBooks: UserBookDetails[];
}) {
  const [bookList, setBookList] = useState<BookDetails[]>(books);
  const isBookInUserLibrary = (bookId: number) => {
    return userBooks.some((userBook) => userBook.bookId === bookId);
  };

  return (
    <>
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4">
          Discover Books
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Explore our collection and find your next great read
        </p>
        <div className="inline-flex items-center bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-full px-6 py-3 mt-6">
          <div className="flex items-center space-x-2 text-zinc-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {bookList.length} books available
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search books..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredBooks = books.filter((book) => {
                  const title = book.title.toLowerCase();
                  const author = book.author.toLowerCase();
                  return (
                    title.includes(searchTerm) || author.includes(searchTerm)
                  );
                });
                setBookList(filteredBooks);
              }}
              className="w-64 h-11 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 pl-10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center text-white space-x-3 pr-4">
          <Select
            onValueChange={(val) =>
              val === "all"
                ? setBookList(books)
                : setBookList(
                    books.filter((book) =>
                      book.genre.toLowerCase().includes(val.toLowerCase())
                    )
                  )
            }
          >
            <SelectTrigger className="text-white">
              <SelectValue placeholder="Genre" className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="science fiction">Science Fiction</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <button className="h-11 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300 backdrop-blur-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookList.map((book: BookDetails, key: number) => (
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
              {isBookInUserLibrary(book.id) && (
                <div className="absolute bottom-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>In Library</span>
                </div>
              )}
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
                <span>
                  {book.completedCount}{" "}
                  {book.completedCount === 1 ? "has" : "have"} read!
                </span>
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

              {user && !isBookInUserLibrary(book.id) && (
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
    </>
  );
}
