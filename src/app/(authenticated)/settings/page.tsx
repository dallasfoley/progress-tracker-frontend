import DeleteAccountButton from "@/components/buttons/delete-account-button";
import LogoutButton from "@/components/buttons/logout-button";
import UpdateAccountButton from "@/components/buttons/update-account-button";
import ThemeSelector from "@/components/theme-components/theme-selector";
import ThemeTab from "@/components/theme-components/theme-tab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("user-session")) {
    redirect("/");
  }
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/");
  }
  return (
    <div className="min-h-svh w-full flex justify-start items-start">
      <Tabs
        defaultValue="theme"
        className="w-full flex justify-start items-center"
      >
        <h1 className="text-3xl font-bold text-zinc-200 text-center my-8">
          Settings
        </h1>
        <TabsList className="">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="account">User</TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="w-11/12 md:w-3/4 p-4 md:p-8">
          <ThemeTab />
        </TabsContent>
        <TabsContent value="account" className="w-11/12 md:w-3/4 p-4 md:p-8">
          <Card className="w-full md:p-8">
            <CardHeader>
              <CardTitle className="text-center font-semibold text-2xl">
                User Settings
              </CardTitle>
            </CardHeader>
            <CardDescription className="text-center">
              Manage your account settings
            </CardDescription>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
