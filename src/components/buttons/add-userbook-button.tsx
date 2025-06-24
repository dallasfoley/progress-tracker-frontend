"use client";

import { User } from "@/schema/UserSchema";
import { Button } from "../ui/button";
import { Book } from "@/schema/BookSchema";
import { addUserBook } from "@/server/actions/userBook/addUserBook";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "next/navigation";

export default function AddUserBookButton({
  book,
  user,
}: {
  book: Book;
  user: User;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  >("NOT_STARTED");
  const [currentPage, setCurrentPage] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const handleValueChange = (val: string) => {
    if (val === "NOT_STARTED") {
      setStatus("NOT_STARTED");
    } else if (val === "IN_PROGRESS") {
      setStatus("IN_PROGRESS");
    } else if (val === "COMPLETED") {
      setStatus("COMPLETED");
    }
  };

  const onSubmit = async () => {
    try {
      const res = user
        ? await addUserBook({
            bookId: book.id,
            userId: user.id,
            status: status,
            currentPage: currentPage,
            userRating: userRating,
          })
        : null;

      if (res?.success) {
        toast.success(res.message || "Book added successfully!");
        router.push("/dashboard");
      } else {
        const errorMessage =
          res?.message || "Failed to add book to reading list";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (e) {
      console.error("Error during login:", e);
      setError(
        e instanceof Error ? e.message : "An error occurred during login."
      );
      toast.error(e instanceof Error && e.message);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">
              Have you started this book yet?
            </h4>
          </div>
          <RadioGroup
            value={status}
            defaultValue="NOT_STARTED"
            onValueChange={(val) => handleValueChange(val)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="NOT_STARTED" id="r1" />
              <Label htmlFor="r1">Want to Read</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="IN_PROGRESS" id="r2" />
              <Label htmlFor="r2">Reading</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="COMPLETED" id="r3" />
              <Label htmlFor="r3">Completed</Label>
            </div>
            {status === "IN_PROGRESS" && (
              <div className="flex items-center gap-3">
                <Label htmlFor="r3">Current Page</Label>
                <Input
                  type="number"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                />
              </div>
            )}
            {status === "COMPLETED" && (
              <div className="flex items-center gap-3">
                <Label htmlFor="r3">User Rating</Label>
                <Input
                  type="number"
                  value={userRating}
                  onChange={(e) => setUserRating(Number(e.target.value))}
                />
              </div>
            )}
          </RadioGroup>
          <Button onClick={onSubmit} variant="outline">
            Add To Reading List
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
}
