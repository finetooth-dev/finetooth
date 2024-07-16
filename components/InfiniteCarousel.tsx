"use client";

import useMeasure from "@/util/useMeasure";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, {
  ReactNode,
  useEffect,
  Children,
  FC,
  useState,
  useCallback,
} from "react";

interface CarouselProps {
  children: ReactNode;
}

const DRAG_THRESHOLD = 5;

export const Carousel: FC<CarouselProps> = ({ children }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const numItems = Children.count(children);
  const angleStep = 360 / numItems;

  const [isDragging, setIsDragging] = useState(false);

  const rotation = useMotionValue(0);
  const startY = useMotionValue(0);

  const handleWheel = (e: WheelEvent) => {
    rotation.set(rotation.get() + e.deltaY * 0.1);
  };

  const handlePointerDown = useCallback((event: PointerEvent) => {
    setIsDragging(false);
    startY.set(event.clientY);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (event.buttons !== 1) return;

    const moveDelta = event.clientY - startY.get();

    if (Math.abs(moveDelta) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }

    rotation.set(rotation.get() - moveDelta);
    startY.set(event.clientY);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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

  return (
    <div className="relative overflow-hidden flex-1" ref={ref}>
      {Children.map(children, (child, index) => {
        const childAngle = index * angleStep;
        return (
          <Card
            initAngle={childAngle}
            containerSize={{ width, height }}
            r={rotation}
            onClick={handleClick}
          >
            {child}
          </Card>
        );
      })}
    </div>
  );
};

function Card({
  r,
  initAngle,
  containerSize,
  children,
  onClick,
}: {
  r: MotionValue;
  initAngle: number;
  containerSize: { width: number; height: number };
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
}) {
  const { width, height } = containerSize;

  const x = useTransform(
    r,
    (value) => (width / 2) * Math.cos(degToRag(value + initAngle)) + width,
  );
  const y = useTransform(
    r,
    (value) =>
      (height / 2) * Math.sin(degToRag(value + initAngle)) + height / 2,
  );

  const xFormatted = useMotionTemplate`calc(${x}px - 50%)`;
  const yFormatted = useMotionTemplate`calc(${y}px - 50%)`;

  return (
    <motion.div
      onClick={onClick}
      className="absolute"
      style={{
        x: xFormatted,
        y: yFormatted,
      }}
    >
      {children}
    </motion.div>
  );
}

function degToRag(deg: number) {
  return (deg * Math.PI) / 180;
}
