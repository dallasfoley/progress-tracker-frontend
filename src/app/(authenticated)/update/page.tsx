import UserUpdateFormWrapper from "@/components/forms/user-update-form-wrapper";

export const experimental_ppr = true;

export default async function UpdatePage() {
  return (
    <div className="min-h-svh flex justify-center items-center text-zinc-200 text-lg">
      <UserUpdateFormWrapper />
    </div>
  );
}
