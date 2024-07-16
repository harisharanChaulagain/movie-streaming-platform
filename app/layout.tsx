"use client";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SelectedMovieProvider } from "@/context/SelectedMovieContext";
import Head from "next/head";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{String(metadata.title) || "FilmFlix"}</title>
        <meta
          name="description"
          content={
            String(metadata.description) ||
            " Stream the latest movies and timeless classics on FilmFlix. Enjoy unlimited access to a vast library of films across all genres, anytime, anywhere!"
          }
        />
      </Head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SelectedMovieProvider>
            <Navbar  />
            {children}
          </SelectedMovieProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
