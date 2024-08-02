import { cn } from "@/lib/cn";
import Link from "next/link";
import { ReactNode } from "react";

export default function GlassCard({
  href,
  children,
  className,
  title,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative block rounded p-1 pt-[2px] w-80 max-w-screen flex flex-col gap-[2px] aspect-[4/5] bg-gradient-to-b from-gray-100/40 to-gray-200/40 shadow-lg border border-gray-200 hd:border-[0.5px] ring-gray-600 focus:outline-none focus-visible:ring",
        className,
      )}
      draggable={false}
    >
      <h2 className="text-gray-800 text-xs text-center">{title}</h2>
      <div className="flex-1 bg-emerald-700 rounded-sm">{children}</div>
    </Link>
  );
}
