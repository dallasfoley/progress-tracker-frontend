"use client";

import { UserBookDetails } from "@/schema/UserBookSchema";
import { deleteUserBook } from "@/server/actions/userBook/deleteUserBook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteUserBookButton({
  userBook,
}: Readonly<{ userBook: UserBookDetails }>) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await deleteUserBook(userBook.userId, userBook.bookId);
      router.refresh();
      toast.success("Book deleted successfully!");
    } catch (error) {
      // console.error("Error deleting user book:", error);
      toast.error("Failed to delete book.");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <Button onClick={handleClick} variant="destructive" className="w-full">
        Delete Book
      </Button>
    </div>
  );
}
