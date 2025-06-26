"use client";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "@radix-ui/react-label";
import ValidateFullUserForm from "../forms/validate-full-user-form";

export default function DeleteAccountButton({ id }: { id: number }) {
  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Label className="rounded-lg text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer p-2 md:p-4">
            Delete Account
          </Label>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <Label className="text-sm">
              Are you sure you want to delete your account?
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"destructive"} className="mt-2">
                  Yes
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ValidateFullUserForm id={id} toDelete={true} />
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
