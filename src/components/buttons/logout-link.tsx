"use client";

import { logout } from "@/server/actions/auth/logout";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";

export default function LogoutLink() {
  return (
    <Link
      href="/"
      onNavigate={() => logout()}
      className="text-lg text-zinc-200 hover:text-zinc-400"
    >
      <MdOutlineLogout />
    </Link>
  );
}
