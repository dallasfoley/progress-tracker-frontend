import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const experimental_ppr = false;

export async function UserGreeting() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <h1 className="text-3xl text-center font-bold text-zinc-200">
      Welcome back, {user.username}!
    </h1>
  );
}
