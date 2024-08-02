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
        <html lang="en" className="" style={{ backgroundColor: "#F9F9F9" }}>
            <body className="flex sans-serif min-h-svh overscroll-none">
                <header
                    className="flex flex-col px-3 py-2 justify-between fixed h-full"
                    style={{ color: "#7E7E7E" }}
                >
                    <Link
                        href="/"
                        className="self-center hover:underline focus:underline focus:outline-none"
                    >
                        <h1>finetooth</h1>
                    </Link>
                    <p>c {currentYear}</p>
                </header>
                {children}
            </body>
        </html>
    );
}
