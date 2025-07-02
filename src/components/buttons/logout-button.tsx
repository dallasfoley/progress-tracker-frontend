"use client";

import { logout } from "@/server/actions/auth/logout";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      // console.error("Error logging out:", error);
      toast.error(error instanceof Error ? error.message : "Failed to log out");
    }
  };
  return (
    <Button
      onClick={handleClick}
      className="text-lg my-3 px-4 bg-zinc-300 text-zinc-800 hover:bg-zinc-400"
    >
      <IoLogOutOutline />
    </Button>
  );
}
