import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from './misc';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
