import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUser, FaHome } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "@/server/actions/user/logout";
import LogoutLink from "./buttons/logout-link";

export default function Navbar() {
  return (
    <nav className="w-full top-0 flex items-center justify-between border-b border-zinc-400 p-4 md:px-8">
      <h1 className="hidden md:block text-2xl font-bold text-zinc-200">
        <Link href="/dashboard" className="flex items-center gap-2 md:gap-4">
          {" "}
          <MdMenuBook /> Reading Progress Tracker
        </Link>
      </h1>
      <div className="flex items-center gap-8">
        <Link
          href="/dashboard"
          className="block md:hidden text-lg text-zinc-200 hover:text-zinc-400"
        >
          <FaHome />
        </Link>
        <LogoutLink />
        <Link
          href="/settings#user"
          className="text-lg text-zinc-200 hover:text-zinc-400"
        >
          <FaUser />
        </Link>
        <Link
          href="/settings"
          className="text-lg text-zinc-200 hover:text-zinc-400"
        >
          <IoIosSettings />
        </Link>
      </div>
    </nav>
  );
}
