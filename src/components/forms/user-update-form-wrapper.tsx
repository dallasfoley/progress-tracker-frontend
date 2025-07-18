import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import UpdateUserForm from "./update-user-form";

export const experimental_ppr = false;

export default async function UserUpdateFormWrapper() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <UpdateUserForm user={user} />;
}
