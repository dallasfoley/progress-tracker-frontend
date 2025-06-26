import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import UserBook from "@/components/userbook";
import { getCurrentUser } from "@/lib/auth";
import { UserBookDetails } from "@/schema/UserBookSchema";
import { getUserBooks } from "@/server/actions/userBook/getUserBooks";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    console.log(user);
    redirect("/");
  }
  const { success, message, data } = await getUserBooks(user.id);

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-center font-bold text-zinc-200">
          Welcome back, {user.username}!
        </h1>
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
          {!success && <p className="text-red-500">{message}</p>}
          <Button className="max-w-48" asChild>
            <Link href="/browse">
              <h4>Browse Books</h4>
              <CiSearch />
            </Link>
          </Button>
        </div>
        <CardContent>
          {data && data?.length > 0 ? (
            <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {data.map((book: UserBookDetails, key: number) => (
                <li key={key} className="text-zinc-200">
                  <UserBook userBook={book} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400 text-center">
              You have no books in your reading list.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
