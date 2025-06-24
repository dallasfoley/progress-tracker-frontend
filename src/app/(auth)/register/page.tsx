import { MdMenuBook } from "react-icons/md";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="grid lg:grid-cols-1">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start text-white">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <MdMenuBook className="size-8" />
            </div>
            Reading Progress Tracker
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
