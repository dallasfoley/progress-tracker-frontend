"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Register, RegisterSchema, User } from "@/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { updateUser } from "@/server/actions/user/updateUser";

export default function UpdateUserForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: Register) => {
    try {
      const res = await updateUser(formData, user.id);
      if (res?.success) {
        toast.success("Success!");
        router.refresh();
        router.push("/");
      }
    } catch (e) {
      console.error("Error during deletion:", e);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Username</FormLabel>
              <FormControl>
                <Input defaultValue={user.username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NewEmail</FormLabel>
              <FormControl>
                <Input defaultValue={user.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input defaultValue={user.password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
