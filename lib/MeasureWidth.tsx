import { memo, ReactNode, useCallback, useEffect, useRef } from 'react';

interface MeasureWidthProps {
  children: ReactNode[];
  onWidthChange: (totalWidth: number) => void;
}

const getTotalWidth = (elements: HTMLElement[]): number => {
  return elements.reduce(
    (totalWidth, element) => totalWidth + element.offsetWidth,
    0
  );
};

const MeasureWidth = memo(function MeasureWidth({
  children,
  onWidthChange,
}: MeasureWidthProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      const childrenArray = Array.from(
        containerRef.current.children
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
});

export default MeasureWidth;
