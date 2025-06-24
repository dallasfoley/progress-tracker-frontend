"use client";

import { Button } from "../ui/button";
import { deleteUser } from "@/server/actions/user/deleteUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteAccountButton() {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await deleteUser();
      router.push("/login");
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete account.");
    }
  };
  return (
    <div className="flex justify-center">
      <Button onClick={handleClick} variant={"destructive"} className="w-full">
        Delete Account
      </Button>
    </div>
  );
}
