import defaultTheme from 'tailwindcss/defaultTheme';

import { useBreakpoint as useBreakpointSuper } from './use-breakpoint';

export function useBreakpoint() {
  return useBreakpointSuper(defaultTheme.screens, 'xs');
}
