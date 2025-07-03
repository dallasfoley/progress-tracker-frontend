import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const experimental_ppr = false;

export async function UserGreeting() {
  const user = await getCurrentUser();

  if (!user) {
    console.log("No user found in greeting, redirecting to home page.");
    redirect("/");
  }

  return (
    <h1 className="text-3xl text-center font-bold text-zinc-200">
      Welcome back, {user.username}!
    </h1>
  );
}
