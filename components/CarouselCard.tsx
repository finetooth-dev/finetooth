import { cn } from "@/lib/cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function CarouselCard({
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
        "relative block ring-gray-600 focus:outline-none focus-visible:ring bg-gradient-to-b from-gray-50/40 to-gray-100/40 shadow-lg backdrop-blur-md border border-gray-200 hd:border-[0.5px]",
        className,
      )}
      draggable={false}
    >
      {children}
    </Link>
  );
}
