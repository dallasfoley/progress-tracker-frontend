import BrowseBooksWrapper from "@/components/browse/browse-books-wrapper";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function BrowsePage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900 px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowseBooksWrapper />
      </Suspense>
    </main>
  );
}
