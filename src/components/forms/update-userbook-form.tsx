"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserBookChangableFields,
  UserBookChangableFieldsSchema,
  type UserBookDetails,
} from "@/schema/UserBookSchema";
import { Progress } from "@/components/ui/progress";
import { useState, useTransition } from "react";
import { updateUserBookPage } from "@/server/actions/userBook/updateUserBookPage";
import { updateUserBookStatus } from "@/server/actions/userBook/updateUserBookStatus";
import { Loader2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { updateUserBookRating } from "@/server/actions/userBook/updateUserBookRating";

export default function UpdateUserBookForm({
  userBook,
}: Readonly<{ userBook: UserBookDetails }>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<UserBookChangableFields>({
    resolver: zodResolver(UserBookChangableFieldsSchema),
    defaultValues: {
      ...userBook,
    },
  });

  const watchedStatus = form.watch("status");
  const watchedCurrentPage = form.watch("currentPage");
  const watchedRating = form.watch("userRating");
  const progressPercentage = (watchedCurrentPage / userBook.pageCount) * 100;

  const handleStatusChange = async (newStatus: string) => {
    startTransition(async () => {
      try {
        await updateUserBookStatus(
          userBook,
          newStatus as UserBookDetails["status"]
        );
        if (newStatus === "COMPLETED") {
          await updateUserBookPage(userBook, userBook.pageCount);
        } else if (newStatus === "NOT_STARTED") {
          await updateUserBookPage(userBook, 0);
        }
        form.setValue("status", newStatus as UserBookDetails["status"]);
        router.refresh();
        toast.success("Status updated successfully!");
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update status.");
      }
    });
  };

  const onSubmit = async (formData: {
    status: UserBookDetails["status"];
    currentPage: number;
    userRating: number;
  }) => {
    startTransition(async () => {
      try {
        const { status, currentPage, userRating } = formData;
        // Update current page if it changed
        if (currentPage !== userBook.currentPage) {
          await updateUserBookPage(userBook, currentPage);
          if (currentPage === userBook.pageCount) {
            await updateUserBookStatus(userBook, "COMPLETED");
          }
        }

        // Update status if it changed
        if (status !== userBook.status) {
          await updateUserBookStatus(userBook, status);
          if (status === "COMPLETED") {
            await updateUserBookPage(userBook, userBook.pageCount);
          } else if (status === "NOT_STARTED") {
            await updateUserBookPage(userBook, 0);
          }
        }

        if (userRating !== userBook.userRating) {
          await updateUserBookRating(userBook, userRating);
        }

        router.refresh();
        console.log("Book updated successfully!");
        toast.success("Book updated successfully!");
        setIsExpanded(false);
      } catch (error) {
        console.error("Error updating book:", error);
        toast.error("Failed to update book.");
      }
    });
  };

  if (!isExpanded) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Status:{" "}
            {watchedStatus
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
          >
            Update Progress
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg text-black">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Update Progress</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reading Status</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleStatusChange(value);
                  }}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchedStatus === "IN_PROGRESS" && (
            <>
              <FormField
                control={form.control}
                name="currentPage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Page</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={userBook.pageCount}
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Progress
                  value={Math.min(progressPercentage, 100)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {watchedCurrentPage} / {userBook.pageCount} pages (
                  {Math.round(Math.min(progressPercentage, 100))}%)
                </p>
              </div>
            </>
          )}

          {watchedStatus === "COMPLETED" && (
            <FormField
              control={form.control}
              name="userRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating (1-5)</FormLabel>
                  <div className="flex items-center justify-between">
                    <Select
                      onValueChange={(value) =>
                        field.onChange(Number.parseInt(value))
                      }
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate this book" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.value && (
                      <p className="flex justify-between items-center gap-2">
                        {Array.from({ length: watchedRating }, (_, i) => (
                          <FaStar key={i} />
                        ))}
                      </p>
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Progress"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
