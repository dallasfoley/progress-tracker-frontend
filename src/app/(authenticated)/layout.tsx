import Navbar from "@/components/navbar";
import { AuthProvider } from "@/providers/auth-provider";
//import { ThemeProvider } from "@/components/theme-components/theme-provider";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh w-full flex flex-col">
      <Navbar />
      <AuthProvider>{children}</AuthProvider>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider> */}
    </div>
  );
}
