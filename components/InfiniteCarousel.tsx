"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface InfiniteCarouselProps {
  children: ReactNode[];
}

const CAROUSEL_GAP = 16;

export default function InfiniteCarousel({ children }: InfiniteCarouselProps) {
  const [childrenWidth, setChildrenWidth] = useState(0);
  const childrenGapWidth = children.length * CAROUSEL_GAP;
  const [duplicates, setDuplicates] = useState(1);

  const windowWidth = useWindowWidth();

  const x = useMotionValue(CAROUSEL_GAP);
  const smoothX = useSpring(x, { stiffness: 100, damping: 25 });
  const loopX = useTransform(smoothX, (value) => {
    if (value < 0) {
      return value % childrenWidth;
    } else {
      return (value % childrenWidth) - childrenWidth;
    }
  });

  const handleWheel = (event: WheelEvent) => {
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : -deltaY;

    x.set(x.get() - delta);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Duplicate children to create the infinite effect
  let duplicatedChildren = [];
  for (let i = 0; i < duplicates; i++) {
    duplicatedChildren.push(...children);
  }

  if (childrenWidth === 0) {
    return (
      <div className="invisible">
        <MeasureWidth
          onWidthChange={(width) => {
            setChildrenWidth(width + childrenGapWidth);
            setDuplicates(Math.ceil(windowWidth / width) + 1);
          }}
        >
          {children}
        </MeasureWidth>
      </div>
    );
  }

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="inline-flex items-center"
        style={{ x: loopX, gap: CAROUSEL_GAP }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface MeasureWidthProps {
  children: ReactNode[];
  onWidthChange: (totalWidth: number) => void;
}

const getTotalWidth = (elements: HTMLElement[]): number => {
  return elements.reduce(
    (totalWidth, element) => totalWidth + element.offsetWidth,
    0,
  );
};

function MeasureWidth({ children, onWidthChange }: MeasureWidthProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      const childrenArray = Array.from(
        containerRef.current.children,
      ) as HTMLElement[];
      const totalWidth = getTotalWidth(childrenArray);
      onWidthChange(totalWidth);
    }
  }, [children, onWidthChange]);

  useEffect(() => {
    measureWidth();
  }, [children, measureWidth]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
