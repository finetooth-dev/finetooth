"use client";

import { cn } from "@/lib/cn";
import useMeasure from "@/util/useMeasure";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
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
  duplicate?: number;
}

const DRAG_THRESHOLD = 5;

export const Carousel: FC<CarouselProps> = ({ children, duplicate = 1 }) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const numItems = Children.count(children) * duplicate;
  const angleStep = 360 / numItems;

  const [isDragging, setIsDragging] = useState(false);

  const rotation = useMotionValue(0);
  const startY = useMotionValue(0);

  const rSpring = useSpring(rotation, { stiffness: 300, damping: 40 });

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

    rotation.set(rotation.get() - moveDelta * 0.5);
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

  useEffect(() => {
    const handleWheelEnd = () => {
      const currentRotation = rotation.get();
      const normalizedRotation = ((currentRotation % 360) + 360) % 360;

      let closestIndex = 0;
      let minDifference = Infinity;

      for (let i = 0; i < numItems; i++) {
        const itemAngle = (i * angleStep + 180) % 360;
        const difference = Math.abs(itemAngle - normalizedRotation);

        if (difference < minDifference) {
          minDifference = difference;
          closestIndex = i;
        }
      }

      const closestItemAngle = (closestIndex * angleStep + 180) % 360;
      const delta = closestItemAngle - normalizedRotation;
      rotation.set(currentRotation + delta);
    };

    let timeoutId: NodeJS.Timeout;
    const handleWheelWithTimeout = (e: WheelEvent) => {
      handleWheel(e);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleWheelEnd, 200);
    };

    window.addEventListener("wheel", handleWheelWithTimeout);

    return () => {
      window.removeEventListener("wheel", handleWheelWithTimeout);
      clearTimeout(timeoutId);
    };
  }, [rotation, angleStep, numItems]);

  const duplicatedChildren: Array<ReactNode> = Array(duplicate)
    .fill(children)
    .reduce((acc, curr) => [...acc, ...curr], []);

  const shouldRender = height > 0 && width > 0;

  return (
    <div className="relative overflow-hidden flex-1" ref={ref}>
      {shouldRender
        ? duplicatedChildren.map((child, index) => {
            const childAngle = (index * angleStep + 180) % 360;
            return (
              <CarouselItem
                key={index}
                initAngle={childAngle}
                containerSize={{ width, height }}
                r={rSpring}
                onClick={handleClick}
              >
                {child}
              </CarouselItem>
            );
          })
        : null}
      <div
        className={cn(
          "absolute pointer-events-none inset-0 bg-gray-400 transition-opacity duration-500 z-[999]",
          shouldRender ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
};

function VelocityIndicator({ rv }: { rv: MotionValue<number> }) {
  const [v, setV] = useState(0);
  useMotionValueEvent(rv, "change", (v) => setV(Math.round(v)));

  return <span className="text-gray-500">v={String(v)}</span>;
}

function CarouselItem({
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

  const rotation = useTransform(r, (v) =>
    v + initAngle < 0 ? ((v + initAngle) % 360) + 360 : (v + initAngle) % 360,
  );

  const x = useTransform(
    rotation,
    (value) => ((width * 2) / 3) * Math.cos(degToRad(value)) + width,
  );
  const xFormatted = useMotionTemplate`calc(${x}px - 50%)`;

  const y = useTransform(
    rotation,
    (value) => ((height * 2) / 3) * Math.sin(degToRad(value)) + height * 0.55,
  );
  const yFormatted = useMotionTemplate`calc(${y}px - 50%)`;

  const zIndex = useTransform(rotation, (value) => 360 - value);

  const blur = useTransform(rotation, [90, 170, 190, 270], [40, 0, 0, 40]);
  const blurFormatted = useMotionTemplate`blur(${blur}px)`;

  const scale = useTransform(rotation, [90, 180, 270], [1.2, 1, 0.7]);
  const rotateY = useTransform(rotation, [90, 180, 270], [90, 0, 60]);
  const rotateZ = useTransform(rotation, [90, 180, 270], [-10, 0, 30]);
  const opacity = useTransform(rotation, [90, 130, 210, 270], [0, 1, 1, 0]);

  useMotionValueEvent(rotation, "change", (v) =>
    initAngle === 0 ? console.log(v) : null,
  );

  return (
    <motion.div
      onClick={onClick}
      className="absolute"
      style={{
        x: xFormatted,
        y: yFormatted,
        zIndex,
        scale,
        filter: blurFormatted,
        rotateY,
        rotateZ,
        opacity,
        transformStyle: "preserve-3d",
      }}
      onFocus={() => r.set(180 - initAngle)}
    >
      {children}
    </motion.div>
  );
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}
