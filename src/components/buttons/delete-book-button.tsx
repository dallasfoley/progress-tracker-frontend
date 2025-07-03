"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteBook } from "@/server/actions/book/adminDeleteBook";

export default function DeleteBookButton({ id }: { id: number }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await deleteBook(id);
      router.push("/dashboard");
      toast.success("Book deleted successfully!");
    } catch (error) {
      // console.error("Error deleting book:", error);
      toast.error("Failed to delete book." + error);
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="destructive"
      className="mb-4 md:mb-8"
    >
      Delete Book from Database
    </Button>
  );
}
