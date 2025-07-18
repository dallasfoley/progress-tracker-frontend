import { z } from "zod";

export const UserBookChangableFieldsSchema = z.object({
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  userRating: z.number().int().min(0).max(5),
  currentPage: z.number().int().min(0),
});

export type UserBookChangableFields = z.infer<
  typeof UserBookChangableFieldsSchema
>;

export const UserBookSchema = UserBookChangableFieldsSchema.extend({
  userId: z.number().int(),
  bookId: z.number().int(),
});

export type UserBook = z.infer<typeof UserBookSchema>;

export const UserBookDetailsSchema = UserBookSchema.extend({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().url(),
  description: z.string(),
  rating: z.number().int().min(0).max(5),
  yearPublished: z.number().int(),
  genre: z.string(),
  pageCount: z.number().int().min(1, "Page count must be at least 1"),
});

export type UserBookDetails = z.infer<typeof UserBookDetailsSchema>;
