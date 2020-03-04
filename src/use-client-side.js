import { useState } from 'react';

/**
 * @return {boolean}
 */
export function useClientSide() {
  const [isClientSide, setClientSide] = useState(false);
  if ('window' in global && !isClientSide) {
    setClientSide(true);
  }
  return isClientSide;
}
