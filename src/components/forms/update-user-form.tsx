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
import { Label } from "../ui/label";

export default function UpdateUserForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });

  const onSubmit = async (formData: Register) => {
    try {
      const res = await updateUser(formData, user.id);
      if (res?.success) {
        toast.success("Success!");
        router.refresh();
        router.push("/");
      } else {
        toast.error(res?.message);
        console.error(res?.message);
      }
    } catch (e) {
      console.error("Error during deletion:", e);
      toast.error(e instanceof Error && e.message);
      console.error(e instanceof Error && e.message);
    }
  };
  return (
    <Form {...form}>
      <form
        action={() => onSubmit(form.getValues())}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Label className="text-3xl font-bold text-zinc-200 text-center my-8">
          Update User Info
        </Label>
        <div className="flex flex-col items-center">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="text-xl">New Username</FormLabel>
                <FormControl>
                  <Input className="md:w-64" {...field} />
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
                <FormLabel className="text-xl">New Email</FormLabel>
                <FormControl>
                  <Input className="md:w-64" {...field} />
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
                <FormLabel className="text-xl">New Password</FormLabel>
                <FormControl>
                  <Input type="password" className="md:w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
