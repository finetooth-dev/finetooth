'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query. Starts false on the server and on the first client
 * render so SSR markup matches, then syncs after mount.
 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(mql.matches);

    handleChange();

    mql.addEventListener('change', handleChange);
    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
