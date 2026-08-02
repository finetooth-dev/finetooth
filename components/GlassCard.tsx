'use client';

import { cn } from '@/lib/cn';
import useMediaQuery from '@/util/useMediaQuery';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

const MotionLink = motion(Link);

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
  // Hover-capable, fine pointers only — on touch this would fire on tap.
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <MotionLink
      href={href}
      className={cn(
        'glass-card relative block rounded p-1 pt-[2px] w-96 max-w-screen flex flex-col gap-[2px] bg-gradient-to-b from-gray-100/40 to-gray-200/40 shadow-lg border border-gray-200 hd:border-[0.5px] ring-gray-600 focus:outline-none focus-visible:ring',
        className
      )}
      draggable={false}
      whileHover={canHover ? { x: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <h2 className="text-xs text-center text-neutral-500">{title}</h2>
      <div className="flex-1  rounded-sm">{children}</div>
    </MotionLink>
  );
}
