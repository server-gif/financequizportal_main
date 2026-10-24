import { createContext, useContext } from 'react';

export const InterstitialContext = createContext(null);

/**
 * Returns `openWithInterstitial(to)` — shows the interstitial, then navigates to `to`.
 * Must be used inside <InterstitialProvider>.
 */
export function useInterstitialNavigation() {
  const context = useContext(InterstitialContext);
  if (!context) {
    throw new Error('useInterstitialNavigation must be used inside <InterstitialProvider>');
  }
  return context;
}
