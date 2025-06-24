"use client";
import { UserBookDetails } from "@/schema/UserBookSchema";
import { Button } from "../ui/button";
import { deleteUserBook } from "@/server/actions/userBook/deleteUserBook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      console.error("Error deleting user book:", error);
      toast.error("Failed to delete book.");
    }
  };
  return (
    <div className="flex justify-center">
      <Button onClick={handleClick} variant={"destructive"} className="w-full">
        Delete
      </Button>
    </div>
  );
}
