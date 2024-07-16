"use client";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SelectedMovieProvider } from "@/context/SelectedMovieContext";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SelectedMovieProvider>
            <Navbar />
            {children}
          </SelectedMovieProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
