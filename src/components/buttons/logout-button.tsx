"use client";

import { logout } from "@/server/actions/user/logout";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
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
