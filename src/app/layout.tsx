import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import RecoilContextProvider from "./RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

// Define metadata as a constant object
export const metadata: Metadata = {
  title: "Collaboration Tools",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            {children}
            <Toaster/>
          </ThemeProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
