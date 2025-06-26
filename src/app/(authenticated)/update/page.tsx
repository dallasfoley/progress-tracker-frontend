import UpdateUserForm from "@/components/forms/update-user-form";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UpdatePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
}
