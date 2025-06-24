import Navbar from "@/components/navbar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh w-full flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
