import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteAccountButton from "../buttons/delete-account-button";
import LogoutButton from "../buttons/logout-button";
import UpdateAccountButton from "../buttons/update-account-button";

export const dynamic = "force-dynamic";
export const experimental_ppr = false;

export default async function UserSettingsButtons() {
  let user;
  try {
    user = await getCurrentUser();
  } catch (e) {
    console.error("Error fetching user:", e);
  } finally {
    if (!user) {
      redirect("/");
    }
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Logout</h3>
        <LogoutButton />
      </div>
      <div className="flex justify-between items-center my-8">
        <h3 className="text-xl font-semibold">Delete</h3>
        {user?.id && <DeleteAccountButton id={user.id} />}
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Update Account Info</h3>
        <UpdateAccountButton id={user.id} />
      </div>
    </>
  );
}
