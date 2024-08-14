'use client';

import { cn } from '@/lib/cn';
import useMeasure from '@/util/useMeasure';
import Loading from './Loading';
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, {
  ReactNode,
  useEffect,
  Children,
  FC,
  useState,
  useCallback,
  Suspense,
} from 'react';

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

  const rSpring = useSpring(rotation, { stiffness: 100, damping: 50 });

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

    const rotationChange = rotation.get() - moveDelta * 0.3;
    rotation.set(rotationChange);
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

  // For safari mobile
  const handleTouchStart = useCallback((event: TouchEvent) => {
    setIsDragging(false);
    startY.set(event.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length !== 1) return;

    const moveDelta = event.touches[0].clientY - startY.get();

    if (Math.abs(moveDelta) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }

    const rotationChange = rotation.get() - moveDelta * 0.15;
    rotation.set(rotationChange);
    startY.set(event.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

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
          'absolute pointer-events-none inset-0  transition-opacity duration-500 z-[999]',
          shouldRender ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
};

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
    v + initAngle < 0 ? ((v + initAngle) % 360) + 360 : (v + initAngle) % 360
  );

  const x = useTransform(
    rotation,
    (value) => ((width * 2) / 3) * Math.cos(degToRad(value)) + width
  );
  const xFormatted = useMotionTemplate`calc(${x}px - 50%)`;

  const y = useTransform(
    rotation,
    (value) => ((height * 2) / 3) * Math.sin(degToRad(value)) + height * 0.55
  );
  const yFormatted = useMotionTemplate`calc(${y}px - 50%)`;

  const zIndex = useTransform(rotation, (value) => 360 - value);

  const blur = useTransform(rotation, [90, 160, 190, 270], [1.6, 0, 0, 0.8]);
  const blurFormatted = useMotionTemplate`blur(${blur}px)`;

  const scale = useTransform(rotation, [90, 180, 270], [1.2, 1, 0.7]);
  const opacity = useTransform(rotation, [90, 130, 210, 270], [0, 1, 1, 0]);

  return (
    <motion.div
      onClick={onClick}
      className="absolute backdrop-blur-md"
      style={{
        x: xFormatted,
        y: yFormatted,
        zIndex,
        scale,
        filter: blurFormatted,

        opacity,
        transformStyle: 'preserve-3d',
      }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </motion.div>
  );
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}
