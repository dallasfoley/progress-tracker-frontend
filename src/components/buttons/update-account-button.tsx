import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import ValidateFullUserForm from "../forms/validate-full-user-form";

export default function UpdateAccountButton({ id }: { id: number }) {
  return (
    <div className="flex justify-center mt-4">
      <Popover>
        <PopoverTrigger>
          <Button variant="default" className="w-full">
            Update Account
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ValidateFullUserForm id={id} toDelete={false} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
