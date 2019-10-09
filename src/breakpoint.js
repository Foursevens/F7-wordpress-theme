import { useEffect, useState } from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';
import { throttle } from 'throttle-debounce';

const NOOP = () => {};

const screens = Object.entries(defaultTheme.screens)
  .map(([name, width]) => ({
    minWidth: Number(width.replace(/[^\d]+$/, '')),
    name,
  }))
  .sort((screen1, screen2) => screen2.minWidth - screen1.minWidth);
screens.push({ minWidth: -1, name: 'xs' });

/** @return {string} */
function findBreakpoint() {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
  return screens.find((screen) => screenWidth > screen.minWidth).name;
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(findBreakpoint());
  const resizeHandler = throttle(100, function resizeHandler() {
    setBreakpoint(findBreakpoint());
  });
  useEffect(function resizeEffect() {
    if (typeof window === 'undefined') {
      return NOOP;
    }
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });
  return breakpoint;
}
