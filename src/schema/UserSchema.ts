import { z } from "zod";

export const LoginUsernameSchema = z.object({
  username: z.string().min(7, "Username must be at least 7 characters"),
  password: z.string().min(8, "Username must be at least 7 characters"),
});

export type LoginUsername = z.infer<typeof LoginUsernameSchema>;

export const LoginEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Username must be at least 7 characters"),
});

export type LoginEmail = z.infer<typeof LoginEmailSchema>;

export const RegisterSchema = z.object({
  username: z.string().min(7, "Username must be at least 7 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Username must be at least 7 characters"),
});

export type Register = z.infer<typeof RegisterSchema>;

export const UserSchema = RegisterSchema.extend({
  id: z.number().int(),
  role: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
});

export type User = z.infer<typeof UserSchema>;
