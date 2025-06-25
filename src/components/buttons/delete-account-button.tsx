"use client";

import { Button } from "../ui/button";
import { deleteUser } from "@/server/actions/user/deleteUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-label";

export default function DeleteAccountButton({ id }: { id: number }) {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await deleteUser(id);
      router.push("/");
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete account.");
    }
  };
  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button onClick={handleClick} variant={"destructive"} className="">
            Delete Account
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Label className="text-sm">
            Are you sure you want to delete your account?
          </Label>
          <Button
            onClick={handleClick}
            asChild
            variant={"destructive"}
            className="mt-2"
          >
            Yes
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
