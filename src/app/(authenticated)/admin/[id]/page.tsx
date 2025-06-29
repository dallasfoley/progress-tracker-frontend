import DeleteBookButton from "@/components/buttons/delete-book-button";
import { AdminUpdateBookForm } from "@/components/forms/admin-update-book-form";
import { cookies } from "next/headers";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let data;
  try {
    const { id } = await params;

    const response = await fetch(`${process.env.API_BASE_URL}/books/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "force-cache",
    });
    if (!response.ok) {
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
    }
    data = await response.json();
  } catch (e) {
    return (
      <div>
        <p>{e instanceof Error ? e.message : "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-zinc-200">
      <p className="text-3xl font-semibold my-4 md:my-8">Admin Page</p>
      <DeleteBookButton id={data.id} />
      <AdminUpdateBookForm book={data} />
    </div>
  );
}
