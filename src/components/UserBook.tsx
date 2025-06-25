import type { UserBookDetails } from "@/schema/UserBookSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Progress } from "./ui/progress";
import UpdateUserBookForm from "./forms/update-userbook-form";
import DeleteUserBookButton from "./buttons/delete-userbook-button";

export default function UserBook({
  userBook,
}: Readonly<{ userBook: UserBookDetails }>) {
  let progressPercentage = (userBook.currentPage / userBook.pageCount) * 100;
  if (userBook?.status == "COMPLETED") {
    progressPercentage = 100;
    userBook.currentPage = userBook.pageCount;
  } else if (userBook?.status == "NOT_STARTED") {
    progressPercentage = 0;
  }

  let currentPage = userBook.currentPage;
  if (userBook.status == "COMPLETED") {
    currentPage = userBook.pageCount;
  } else if (userBook.status == "NOT_STARTED") {
    currentPage = 0;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">{userBook.title}</CardTitle>
        <CardDescription>by {userBook.author}</CardDescription>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {currentPage} / {userBook.pageCount} pages (
            {Math.round(progressPercentage)}%)
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Image
            src={userBook.coverUrl || "/placeholder.svg"}
            alt={`Cover of ${userBook.title}`}
            height={200}
            width={150}
            className="rounded-md object-cover"
          />
        </div>

        <CardDescription className="text-sm">
          {userBook.description}
        </CardDescription>

        <UpdateUserBookForm userBook={userBook} />

        <DeleteUserBookButton userBook={userBook} />
      </CardContent>
    </Card>
  );
}
