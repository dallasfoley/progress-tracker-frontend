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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaStar } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  UserBookChangableFields,
  UserBookChangableFieldsSchema,
} from "@/schema/UserBookSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddUserBookButton({
  book,
  user,
}: {
  book: Book;
  user: User;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UserBookChangableFields>({
    resolver: zodResolver(UserBookChangableFieldsSchema),
    defaultValues: {
      status: "NOT_STARTED",
      currentPage: 0,
      userRating: 0,
    },
  });

  const watchedStatus = form.watch("status");
  const watchedRating = form.watch("userRating");

  const onSubmit = async (data: UserBookChangableFields) => {
    try {
      const res =
        data.currentPage === book.pageCount && data.status !== "COMPLETED"
          ? await addUserBook({
              bookId: book.id,
              userId: user.id,
              status: "COMPLETED",
              currentPage: data.currentPage,
              userRating: data.userRating,
            })
          : await addUserBook({
              bookId: book.id,
              userId: user.id,
              status: data.status,
              currentPage: data.currentPage,
              userRating: data.userRating,
            });

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
      setError(
        e instanceof Error ? e.message : "An error occurred during login."
      );
      toast.error(e instanceof Error ? e.message : "An error occurred");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">
                Have you started this book yet?
              </h4>
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue="NOT_STARTED"
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
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedStatus === "IN_PROGRESS" && (
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
                        max={book.pageCount}
                        value={
                          field.value === undefined || field.value === null
                            ? ""
                            : field.value.toString()
                        }
                        onChange={(e) =>
                          form.setValue("currentPage", Number(e.target.value))
                        }
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchedStatus === "COMPLETED" && (
              <FormField
                control={form.control}
                name="userRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Rating</FormLabel>
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <Select
                          onValueChange={(val) => field.onChange(Number(val))}
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate this book" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Star</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {watchedRating > 0 && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: watchedRating }, (_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" variant="outline" className="w-full">
              Add To Reading List
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
