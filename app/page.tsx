import InfiniteCarousel from "@/components/InfiniteCarousel";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-center">
      <InfiniteCarousel>
        <LinkItem href="/" className="w-64 h-64 rounded p-2 bg-gray-500">
          Item 1
        </LinkItem>
        <LinkItem href="/" className="w-48 h-80 rounded p-2 bg-gray-500">
          Item 2
        </LinkItem>
        <LinkItem href="/" className="w-80 h-48 rounded p-2 bg-gray-500">
          Item 3
        </LinkItem>
        <LinkItem href="/" className="w-80 h-80 rounded p-2 bg-gray-500">
          Item 4
        </LinkItem>
      </InfiniteCarousel>
    </main>
  );
}

function LinkItem({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        className,
        "block ring-gray-600 focus:outline-none focus-visible:ring",
      )}
      draggable={false}
    >
      {children}
    </Link>
  );
}
