"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import MeasureWidth from "@/lib/MeasureWidth";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

interface InfiniteCarouselProps {
  children: ReactNode[];
}

const CAROUSEL_GAP = 16;
const DRAG_THRESHOLD = 5;

export default function InfiniteCarousel({ children }: InfiniteCarouselProps) {
  const [childrenWidth, setChildrenWidth] = useState(0);
  const [duplicates, setDuplicates] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const windowWidth = useWindowWidth();

  const x = useMotionValue(CAROUSEL_GAP);
  const startX = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 100, damping: 25 });
  const loopX = useTransform(smoothX, (value) => {
    if (value < 0) {
      return value % childrenWidth;
    } else {
      return (value % childrenWidth) - childrenWidth;
    }
  });

  const handleWheel = useCallback((event: WheelEvent) => {
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : -deltaY;

    x.set(x.get() - delta);
  }, []);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    setIsDragging(false);
    startX.set(event.clientX);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (event.buttons !== 1) return;

    const moveDelta = event.clientX - startX.get();

    if (Math.abs(moveDelta) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }

    x.set(x.get() + moveDelta);
    startX.set(event.clientX);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handleWheel, handlePointerDown, handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (childrenWidth > 0) {
      setDuplicates(Math.ceil(windowWidth / childrenWidth) + 1);
    }
  }, [windowWidth, childrenWidth]);

  const duplicatedChildren = useMemo(() => {
    let duplicatesArray = [];
    for (let i = 0; i < duplicates; i++) {
      duplicatesArray.push(...children);
    }
    return duplicatesArray;
  }, [children, duplicates]);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (childrenWidth === 0) {
    return (
      <div className="invisible">
        <MeasureWidth
          onWidthChange={(width) => {
            setChildrenWidth(width + children.length * CAROUSEL_GAP);
            setDuplicates(Math.ceil(windowWidth / width) + 1);
          }}
        >
          {children}
        </MeasureWidth>
      </div>
    );
  }

  return (
    <div className="overflow-hidden whitespace-nowrap select-none py-4 animate-move-in">
      <motion.div
        className="inline-flex items-center"
        style={{ x: loopX, gap: CAROUSEL_GAP }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className="shrink-0" onClick={handleClick}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
