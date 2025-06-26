"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import ThemeSelector from "./theme-selector";
//import CustomColorPicker from "./color-picker";

export default function ThemeTab() {
  //const { theme, setTheme } = useTheme();
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl">Theme Settings</CardTitle>
        <CardDescription>
          Customize the appearance of the application to your preference.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <ThemeSelector /> */}
        {/* {theme === "custom" && <CustomColorPicker />} */}
        <div className="pt-6">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
