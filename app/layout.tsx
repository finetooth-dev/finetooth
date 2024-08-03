import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "finetooth",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentYear = new Date().getFullYear();

    return (
        <html
            lang="en"
            className="overscroll-none"
            style={{ backgroundColor: "#F9F9F9" }}
        >
            <body className="flex sans-serif h-svh overscroll-none">
                <header
                    className="flex flex-col px-3 py-2 justify-between fixed h-full"
                    style={{ color: "#7E7E7E", zIndex: "1" }}
                >
                    <div className="flex flex-col gap-4 justify-start">
                        <Link
                            href="/"
                            className="hover:underline focus:underline focus:outline-none cursor-pointer"
                        >
                            <h1>finetooth</h1>
                        </Link>
                        <div></div>
                    </div>
                    <p>c {currentYear}</p>
                </header>
                <div
                    className="absolute flex flex-col top-0 right-0 px-3 py-2  h-full justify-between items-end"
                    style={{ color: "#7E7E7E", zIndex: "1" }}
                >
                    <div>creative coding; web development</div>
                    <div className="cursor-pointer">[ work with us ]</div>
                </div>
                {children}
            </body>
        </html>
    );
}
