'use client';

import { useState, useEffect } from 'react';
import debounce from './debounce';

export type WindowSize = {
  width: number;
  height: number;
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const debouncedResize = debounce(handleResize, 100);

    debouncedResize();

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
