"use client";

import { UserBookDetails } from "@/schema/UserBookSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import DeleteUserBookButton from "./buttons/delete-userbook-button";
import { Progress } from "./ui/progress";

export default function UserBook({
  userBook,
}: Readonly<{ userBook: UserBookDetails }>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userBook.title} by {userBook.author}
        </CardTitle>
        <Progress value={userBook.currentPage / userBook.pageCount} />
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={userBook.coverUrl}
          alt={userBook.title}
          height={100}
          width={100}
          className="w-full h-auto object-cover"
        />
        <CardDescription>{userBook.description}</CardDescription>
        <DeleteUserBookButton userBook={userBook} />
      </CardContent>
    </Card>
  );
}
