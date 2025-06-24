import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-zinc-200">
      <h1 className="text-4xl my-6 font-semibold">
        Welcome to the Reading Progress Tracker App!
      </h1>
      <h4 className="text-2xl my-6">
        Login or create an account to get started
      </h4>
      <Button
        className="text-lg my-3 w-48 bg-zinc-300 text-zinc-800 hover:bg-zinc-400"
        asChild
      >
        <Link href="/login/username">Login with Username</Link>
      </Button>
      <Button
        className="text-lg my-3 w-48 bg-zinc-300 text-zinc-800 hover:bg-zinc-400"
        asChild
      >
        <Link href="/login/email">Login with Email</Link>
      </Button>
      <Button
        className="text-lg my-3 w-48 bg-zinc-300 text-zinc-800 hover:bg-zinc-400"
        asChild
      >
        <Link href="/register">Sign-Up</Link>
      </Button>
    </main>
  );
}
