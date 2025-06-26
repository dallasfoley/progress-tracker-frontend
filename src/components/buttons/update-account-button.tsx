import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ValidateFullUserForm from "../forms/validate-full-user-form";
import { Label } from "../ui/label";

export default function UpdateAccountButton({ id }: { id: number }) {
  return (
    <div className="flex justify-center mt-4">
      <Popover>
        <PopoverTrigger>
          <Label className="rounded-lg text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer p-2 md:p-4">
            Update Account
          </Label>
        </PopoverTrigger>
        <PopoverContent>
          <ValidateFullUserForm id={id} toDelete={false} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
