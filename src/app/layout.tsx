import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Reading Progress Tracker",
  description:
    "Easily track books you want to read, are reading and have read!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} bg-zinc-900 flex flex-col items-center antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
