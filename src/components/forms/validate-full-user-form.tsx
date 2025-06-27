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
import { Register, RegisterSchema } from "@/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { deleteUser } from "@/server/actions/user/deleteUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ValidateFullUserForm({
  id,
  toDelete,
}: {
  id: number;
  toDelete: boolean;
}) {
  const router = useRouter();
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    try {
      if (toDelete) {
        const res = await deleteUser(id);
        if (res?.success) {
          toast.success("Success!");
          router.push("/");
        }
      } else {
        router.push("/update");
      }
    } catch (e) {
      console.error("Error during deletion:", e);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLabel className="text-xl font-semibold ">
          Validate Credentials
        </FormLabel>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {toDelete ? "Validate and Delete User" : "Update User"}
        </Button>
      </form>
    </Form>
  );
}
