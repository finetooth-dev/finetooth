import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finetooth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="bg-gray-400 text-gray-950">
      <body className="flex flex-col sans-serif min-h-dvh overscroll-none">
        <header className="flex px-3 py-2 justify-between">
          <Link
            href="/"
            className="self-center hover:underline focus:underline focus:outline-none"
          >
            <h1>Finetooth</h1>
          </Link>
          <p>©{currentYear}</p>
        </header>
        {children}
      </body>
    </html>
  );
}
