"use client";

import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-label";
import ValidateFullUserForm from "../forms/validate-full-user-form";

export default function DeleteAccountButton({ id }: { id: number }) {
  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"destructive"} className="">
            Delete Account
          </Button>
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
                <ValidateFullUserForm id={id} />
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
