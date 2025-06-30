import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <Button variant="secondary" asChild>
        <Link href="/admin/add" className="text-zinc-900">
          Add Book to Database
        </Link>
      </Button>
    </div>
  );
}
