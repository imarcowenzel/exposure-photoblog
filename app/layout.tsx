import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/footer";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/auth-provider";
import "./styles/globals.css";

// TODO: change font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EXPOSURE",
  description: "A ficctitional website to post photographies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Sidebar />
          <MobileHeader />
          <main className="h-full bg-secondary lg:ml-32">
            {children}
            <Toaster position="top-right" richColors />
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
