import { useCallback } from 'react';
import { useInterstitialNavigation } from '../components/InterstitialAd/InterstitialContext';

/**
 * Props for an article <Link>: a real, crawlable href plus a click handler
 * that routes through the interstitial.
 *
 * Modified clicks (Ctrl/⌘/Shift/middle-click) keep native browser behaviour,
 * so "open in new tab" still works.
 */
export function useArticleLink(slug) {
  const { openWithInterstitial } = useInterstitialNavigation();
  const to = `/blog/${slug}`;

  const onClick = useCallback(
    (event) => {
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
      if (modified || event.defaultPrevented) return;
      event.preventDefault();
      openWithInterstitial(to);
    },
    [openWithInterstitial, to],
  );

  return { to, onClick };
}
