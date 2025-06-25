import DeleteAccountButton from "@/components/buttons/delete-account-button";
import LogoutButton from "@/components/buttons/logout-button";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="min-h-svh w-full flex justify-start items-center">
      <Tabs
        defaultValue="account"
        className="w-full flex justify-start items-center"
      >
        <TabsList className="">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="account">User</TabsTrigger>
        </TabsList>

        <TabsContent
          value="theme"
          className="w-full md:w-1/2 p-4 md:p-8 border-red-700 border-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardDescription>Change your theme</CardDescription>
            <CardContent>Coming Soon!</CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="account"
          className="w-full md:w-1/2 p-4 md:p-8 border-red-700 border-2"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>User</CardTitle>
            </CardHeader>
            <CardDescription>Manage your account settings</CardDescription>
            <CardContent>
              <div className="flex justify-between items-center">
                <h3>Logout</h3>
                <LogoutButton />
              </div>
              <div className="flex justify-between items-center my-8">
                <h3 className="flex justify-between items-center">Delete</h3>
                {user?.id && <DeleteAccountButton id={user?.id} />}
              </div>
              <div className="flex justify-between items-center">
                <h3 className="flex justify-between items-center">
                  Update Account Info
                </h3>
                <Button variant={"outline"}>Update</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
