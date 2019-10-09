import { useEffect, useState } from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';
import { throttle } from 'throttle-debounce';

const screens = Object.entries(defaultTheme.screens)
  .map(([name, width]) => ({
    minWidth: Number(width.replace(/[^\d]+$/, '')),
    name,
  }))
  .sort((screen1, screen2) => screen2.minWidth - screen1.minWidth);
screens.push({ minWidth: -1, name: 'xs' });

/** @return {string} */
function findBreakpoint() {
  return screens.find((screen) => window.innerWidth > screen.minWidth).name;
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(findBreakpoint());
  const resizeHandler = throttle(100, function resizeHandler() {
    setBreakpoint(findBreakpoint());
  });
  useEffect(function resizeEffect() {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });
  return breakpoint;
}
