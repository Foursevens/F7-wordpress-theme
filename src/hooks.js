import defaultTheme from 'tailwindcss/defaultTheme';

import useBreakpointSuper from './use-breakpoint';

export function useBreakpoint() {
  return useBreakpointSuper(defaultTheme.screens, 'xs');
}
