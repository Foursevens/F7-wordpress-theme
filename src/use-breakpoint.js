import { useEffect, useMemo, useState } from 'react';

/**
 * @type {ScreenQuery}
 * @property {string} name eg. xs
 * @property {MediaQueryList} query
 */

/**
 * @type {Screen}
 * @property {string} name eg. xs
 * @property {number} [maxWidth] eg. 1023
 * @property {number} [minWidth] eg. 768
 */

const IS_SSR = !('window' in global);

/**
 * Pre-calculate the media query parameters.
 *
 * @example
 *   Input:
 *     calculateScreens({ md: 768, lg: 1024 }, 'xs');
 *   Output:
 *     [
 *       { maxWidth: 767                 , name: 'xs' },
 *       { maxWidth: 1024, minWidth:  768, name: 'md' },
 *       {                 minWidth: 1024, name: 'lg' },
 *     ]
 *
 * @param {object} screenOptions
 * @param {string} defaultScreenName
 * @return {Screen[]}
 */
function calculateScreens(screenOptions, defaultScreenName) {
  return (
    Object.entries(screenOptions)
      // convert { xs: '640px' } to [{ name: 'xs', minWidth: 640 }]
      .reduce(
        (accumulator, [name, minWidth]) => {
          accumulator.push({
            name,
            minWidth:
              typeof minWidth === 'string'
                ? Number(minWidth.replace(/\D+$/, ''))
                : minWidth,
          });
          return accumulator;
        },
        [{ name: defaultScreenName }], // prepend default screen
      )
      // sort by `minWidth` ascending
      .sort((screen1, screen2) => screen1.minWidth - screen2.minWidth)
      // set maxWidth on all but last
      .map((screen, index, intermediateArray) =>
        index === intermediateArray.length - 1
          ? screen
          : {
              maxWidth: intermediateArray[index + 1].minWidth - 1,
              minWidth: screen.minWidth,
              name: screen.name,
            },
      )
  );
}

function createScreenQuery({ maxWidth, minWidth, name }) {
  if (IS_SSR) {
    return { name };
  }
  const maxQuery = maxWidth ? `(max-width: ${maxWidth}px)` : null;
  const minQuery = minWidth ? `(min-width: ${minWidth}px)` : null;
  const mediaQuery = [minQuery, maxQuery].filter(Boolean).join(' and ');
  return { name, query: window.matchMedia(mediaQuery) };
}

export default function useBreakpoint(
  screenOptions,
  defaultScreenName = '__default__',
) {
  const screens = useMemo(() => calculateScreens(screenOptions), [
    screenOptions,
  ]);
  const screenQueries = useMemo(() => screens.map(createScreenQuery), [
    screens,
  ]);
  const currentScreen = IS_SSR
    ? defaultScreenName
    : screenQueries.find(({ query }) => query.matches);
  const [breakpoint, setBreakpoint] = useState(
    currentScreen ? currentScreen.name : defaultScreenName,
  );
  useEffect(
    function addMediaQueryListeners() {
      const listeners = screenQueries.map(({ name }) => (event) => {
        if (event.matches) {
          setBreakpoint(name);
        }
      });
      screenQueries.forEach(({ query }, index) => {
        query.addListener(listeners[index]);
      });
      return () => {
        screenQueries.forEach(({ query }, index) => {
          query.removeListener(listeners[index]);
        });
      };
    },
    [screenQueries],
  );

  return breakpoint;
}
