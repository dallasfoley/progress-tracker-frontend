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
    <main className="container flex flex-col items-center from-zinc-900 via-zinc-800 to-slate-900 mx-auto py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>
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
      <AuthDebug />
    </main>
  );
}

function UserGreetingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center space-y-2">
      {/* Main greeting text */}
      <div className="h-8 bg-zinc-700 rounded w-56 md:w-64"></div>
      {/* Subtext or time-based greeting */}
      <div className="h-5 bg-zinc-700/60 rounded w-40 md:w-48"></div>
    </div>
  );
}

import { Skeleton, SVGSkeleton } from "@/components/skeleton";
import { AuthDebug } from "@/components/auth-debug";

const UserBooksListSkeleton = () => (
  <>
    <div className="flex flex-col gap-6 border shadow-sm p-2 md:p-4 max-w-sm mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6">
        <h3>
          <Skeleton className="w-[136px] max-w-full" />
        </h3>
      </div>
      <div>
        <Skeleton className="w-[624px] max-w-full" />
      </div>
      <div className="flex justify-center">
        <a className="inline-flex items-center justify-center gap-2 [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive shadow-xs h-9 px-4 py-2 has-[&gt;svg]:px-3 max-w-48">
          <h4>
            <Skeleton className="w-[96px] max-w-full" />
          </h4>
          <SVGSkeleton className="w-[1empx] h-[1empx]" />
        </a>
      </div>
      <div className="px-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-end mb-4">
            <a className="inline-flex items-center justify-center gap-2 [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive shadow-xs h-9 px-4 py-2 has-[&gt;svg]:px-3">
              <Skeleton className="w-[160px] max-w-full" />
            </a>
          </div>
          <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <li>
              <div className="flex flex-col gap-6 border py-6 shadow-sm w-full max-w-md">
                <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6">
                  <div>
                    <Skeleton className="w-[32px] max-w-full" />
                  </div>
                  <div>
                    <Skeleton className="w-[128px] max-w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-2 w-full">
                      <div className="h-full w-full flex-1"></div>
                    </div>
                    <div>
                      <Skeleton className="w-[144px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="px-6 space-y-4">
                  <div className="flex justify-center">
                    <SVGSkeleton className="rounded-md object-cover w-[150px] h-[200px]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>
                        <Skeleton className="w-[152px] max-w-full" />
                      </span>
                      <div className="inline-flex items-center justify-center [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive border shadow-xs dark:border-input h-8 gap-1.5 px-3 has-[&gt;svg]:px-2.5">
                        <Skeleton className="w-[120px] max-w-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="inline-flex items-center justify-center gap-2 [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive shadow-xs h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full">
                      <Skeleton className="w-[88px] max-w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-6 border py-6 shadow-sm w-full max-w-md">
                <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6">
                  <div>
                    <Skeleton className="w-[112px] max-w-full" />
                  </div>
                  <div>
                    <Skeleton className="w-[120px] max-w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-2 w-full">
                      <div className="h-full w-full flex-1"></div>
                    </div>
                    <div>
                      <Skeleton className="w-[152px] max-w-full" />
                    </div>
                  </div>
                </div>
                <div className="px-6 space-y-4">
                  <div className="flex justify-center">
                    <SVGSkeleton className="rounded-md object-cover w-[150px] h-[200px]" />
                  </div>
                  <div>
                    <Skeleton className="w-[552px] max-w-full" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>
                        <Skeleton className="w-[152px] max-w-full" />
                      </span>
                      <div className="inline-flex items-center justify-center [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive border shadow-xs dark:border-input h-8 gap-1.5 px-3 has-[&gt;svg]:px-2.5">
                        <Skeleton className="w-[120px] max-w-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="inline-flex items-center justify-center gap-2 [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive shadow-xs h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full">
                      <Skeleton className="w-[88px] max-w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
