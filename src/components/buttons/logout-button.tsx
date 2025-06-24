"use client";

import { logout } from "@/server/actions/user/logout";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => logout()}
      className="text-lg my-3 w-48 bg-zinc-300 text-zinc-800 hover:bg-zinc-400"
    >
      <IoLogOutOutline />
    </Button>
  );
}
