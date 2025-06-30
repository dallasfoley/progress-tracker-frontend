"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { formStyles } from "./admin-update-book-form";
import { AddBook, AddBookSchema } from "@/schema/BookSchema";
import { adminAddBook } from "@/server/actions/book/adminAddBook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminAddBookForm() {
  const router = useRouter();

  const form = useForm<AddBook>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      coverUrl: "",
      description: "",
      yearPublished: 0,
      pageCount: 0,
    },
  });

  const onSubmit = async (formData: AddBook) => {
    const newBook = await adminAddBook(formData);
    if (newBook.success) {
      toast.success("Book added successfully");
      router.push(`/admin/browse`);
    } else {
      toast.error("Failed to add book");
      console.error(newBook.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className={formStyles.formGrid}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={formStyles.formItemFullWidth}>
                <FormLabel className={formStyles.label}>Book Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the book title"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className={formStyles.formItem}>
                <FormLabel className={formStyles.label}>Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author name"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className={formStyles.formItem}>
                <FormLabel className={formStyles.label}>Genre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Fiction, Mystery, Romance"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearPublished"
            render={({ field }) => (
              <FormItem className={formStyles.formItem}>
                <FormLabel className={formStyles.label}>
                  Year Published
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 2023"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem className={formStyles.formItem}>
                <FormLabel className={formStyles.label}>Page Count</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Number of pages"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem className={formStyles.formItemFullWidth}>
                <FormLabel className={formStyles.label}>
                  Cover Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/book-cover.jpg"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className={formStyles.formItemFullWidth}>
                <FormLabel className={formStyles.label}>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief description of the book"
                    className={formStyles.input}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={formStyles.error} />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className={formStyles.button}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              "Add Book"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
