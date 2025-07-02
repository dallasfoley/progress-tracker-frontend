import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { UserGreeting } from "@/components/dashboard/user-greeting";
import { UserBooksList } from "@/components/dashboard/user-books-list";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export const experimental_ppr = true;

export default function DashboardPage() {
  return (
    <main className="container flex flex-col items-center mx-auto py-8">
      <div className="mb-8">
        <Suspense fallback={<UserGreetingSkeleton />}>
          <UserGreeting />
        </Suspense>
      </div>
      <Card className="p-2 md:p-4 max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CardHeader>
          <h3 className="text-4xl font-semibold text-center">
            Your Reading List
          </h3>
        </CardHeader>
        <CardDescription className="text-xl text-center">
          Here you can manage your reading list, add new books, and track your
          progress.
        </CardDescription>
        <div className="flex justify-center">
          <Button className="max-w-48" asChild>
            <Link href="/browse">
              <h4>Browse Books</h4>
              <CiSearch />
            </Link>
          </Button>
        </div>
        <CardContent>
          <Suspense fallback={<UserBooksListSkeleton />}>
            <UserBooksList />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

// Skeleton components for loading states
function UserGreetingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 bg-zinc-700 rounded w-64 mx-auto"></div>
    </div>
  );
}

function UserBooksListSkeleton() {
  return (
    <div className="animate-pulse">
      <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="h-48 bg-zinc-700 rounded"></li>
        ))}
      </ul>
    </div>
  );
}
