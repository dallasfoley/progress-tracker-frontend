"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { adminUpdateBook } from "@/server/actions/book/adminUpdateBook";
import { useRouter } from "next/navigation";
import { Book, BookSchema } from "@/schema/BookSchema";

// Form styling variables - easily reusable across forms
export const formStyles = {
  // Container styles
  container:
    "flex flex-col items-center w-full max-w-2xl mx-auto text-zinc-900 space-y-6 p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700",

  // Form grid layout
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6 w-full",

  // Form item styles
  formItem: "space-y-2",
  formItemFullWidth: "space-y-2 md:col-span-2",

  // Label styles
  label:
    "text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide",

  // Input styles
  input:
    "w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500",

  // Button styles
  button:
    "w-full md:w-auto px-8 py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",

  // Error message styles
  error: "text-sm text-red-600 dark:text-red-400 font-medium",

  // Hidden field styles
  hidden: "hidden",
} as const;

export function AdminUpdateBookForm({ book }: { book: Book }) {
  const router = useRouter();
  const form = useForm<Book>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      id: book.id || 0,
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      coverUrl: book.coverUrl || "",
      description: book.description || "",
      rating: book.rating || 0,
      yearPublished: book.yearPublished || 0,
      pageCount: book.pageCount || 0,
    },
  });

  const onSubmit = async (formData: Book) => {
    const updatedBook = await adminUpdateBook(formData);
    if (updatedBook.success) {
      toast.success("Book updated successfully");
      router.push(`/browse`);
    } else {
      toast.error("Failed to update book");
      // console.error(updatedBook.message);
    }
  };

  return (
    <div className={formStyles.container}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Update Book Details
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Modify the book information below
        </p>
      </div>

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
                  <FormLabel className={formStyles.label}>
                    Description
                  </FormLabel>
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

          {/* Hidden fields */}
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className={formStyles.hidden}>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className={formStyles.hidden}>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                "Update Book"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
