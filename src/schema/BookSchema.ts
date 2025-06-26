import { z } from "zod";

export const BookSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().url(),
  description: z.string(),
  rating: z.number().int().min(0).max(5),
  yearPublished: z.number().int(),
  genre: z.string(),
  pageCount: z.number().int().min(1, "Page count must be at least 1"),
});

export type Book = z.infer<typeof BookSchema>;

export const BookDetailsSchema = BookSchema.extend({
  inProgressCount: z.number().int().min(0),
  completedCount: z.number().int().min(0),
});

export type BookDetails = z.infer<typeof BookDetailsSchema>;
