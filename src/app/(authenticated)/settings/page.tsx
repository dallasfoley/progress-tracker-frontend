import UserSettingsButtons from "@/components/settings/user-settings-buttons";
// import ThemeSelector from "@/components/theme-components/theme-selector";
import ThemeTab from "@/components/theme-components/theme-tab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function SettingsPage() {
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
          <TabsTrigger value="user">User</TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="w-11/12 md:w-3/4 p-4 md:p-8">
          <ThemeTab />
        </TabsContent>
        <TabsContent value="user" className="w-11/12 md:w-3/4 p-4 md:p-8">
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
              <Suspense fallback={<div>Loading...</div>}>
                <UserSettingsButtons />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
