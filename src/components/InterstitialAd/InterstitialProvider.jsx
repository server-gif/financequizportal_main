import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AD_CONFIG } from '../../config/ads';
import { createAdSlot, getGptLoadState, loadGpt } from '../../services/googleAdManager';
import { InterstitialContext } from './InterstitialContext';

let lastShownAt = 0;

/**
 * After show(), the ad must actually appear on screen within this window.
 * If it never becomes visible (creative consumed but no overlay rendered,
 * blocked, etc.) we treat the click as "no ad" and navigate almost
 * immediately — a failed ad must never cost the reader seconds of waiting.
 */
const VISIBILITY_CHECK_MS = 1500;
/** Once the ad is on screen, this long timer only fires if the close event never arrives. */
const STUCK_NAV_MS = 60000;
/** After an empty preload response, try loading the next ad in the background. */
const REFILL_RETRY_MS = 30000;
/** Short pause before reloading after a show that never appeared on screen. */
const NO_SHOW_REFILL_MS = 5000;

/**
 * Owns the "click article → instantly show interstitial → navigate" flow.
 *
 * The interstitial is preloaded in the background at app start using GPT
 * trigger mode (the ad fills but stays hidden until we trigger it). On an
 * article click: if an ad is ready it shows instantly (no network wait);
 * otherwise the reader navigates immediately — nobody ever waits for an ad.
 * If show() is called but the ad never appears on screen, navigation resumes
 * after a brief visibility check (~1.5s) instead of trapping the reader.
 * Closing the ad is detected via slotVisibilityChanged — only after the ad
 * was genuinely visible does a drop to 0% count as a close — after which
 * the slot is refreshed so the next click is also instant.
 */
export default function InterstitialProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const config = AD_CONFIG.interstitial;

  const gateRef = useRef(null); // persistent preloaded slot handle
  const readyRef = useRef(false);
  const pendingRef = useRef(null);
  const visibleRef = useRef(false); // the open ad has actually been on screen
  const timersRef = useRef({ fallback: null, refill: null });

  const clearTimer = (key) => {
    if (timersRef.current[key]) {
      clearTimeout(timersRef.current[key]);
      timersRef.current[key] = null;
    }
  };

  // Load the next ad into the persistent slot in the background.
  const scheduleRefill = useCallback((delay) => {
    clearTimer('refill');
    timersRef.current.refill = setTimeout(() => {
      if (gateRef.current) gateRef.current.refresh();
    }, delay);
  }, []);

  const proceed = useCallback(() => {
    const target = pendingRef.current;
    if (!target) return; // already navigated — never navigate twice
    pendingRef.current = null;
    clearTimer('fallback');
    navigate(target);
  }, [navigate]);

  // GPT callbacks are registered once; keep them pointing at the latest proceed().
  const proceedRef = useRef(proceed);
  proceedRef.current = proceed;

  // Preload the interstitial slot once at app start.
  useEffect(() => {
    if (!AD_CONFIG.enabled || !config.enabled || !config.adUnitPath) return undefined;

    let cancelled = false;

    const onTabHidden = () => {
      // Reader switched tabs while the ad was open — let them land on the article.
      if (document.hidden && pendingRef.current) proceedRef.current();
    };
    document.addEventListener('visibilitychange', onTabHidden);

    loadGpt()
      .then(() => {
        if (cancelled) return;
        gateRef.current = createAdSlot({
          adUnitPath: config.adUnitPath,
          outOfPageFormat: 'INTERSTITIAL',
          // Trigger mode: fill in the background, display only when we call show().
          interstitialConfig: { interstitial: { triggers: { continueReading: false } } },
          targeting: { format: 'interstitial' },
          onRenderEnded: (event) => {
            readyRef.current = !event.isEmpty;
            if (event.isEmpty) scheduleRefill(REFILL_RETRY_MS);
          },
          onVisibilityChange: (event) => {
            if (!pendingRef.current) return;
            if (event.inViewPercentage > 0) {
              // The ad is genuinely on screen — the reader decides when it
              // ends. Swap the short "never appeared" timer for the long
              // stuck-net so navigation can never fire while it's watched.
              visibleRef.current = true;
              clearTimer('fallback');
              timersRef.current.fallback = setTimeout(() => proceedRef.current(), STUCK_NAV_MS);
              return;
            }
            // 0% before the ad was ever seen on screen is not a close —
            // GPT can fire this while the overlay is still appearing.
            if (!visibleRef.current) return;
            visibleRef.current = false;
            proceedRef.current();
            // This creative is consumed — load the next one (respecting the cap).
            scheduleRefill(config.frequencyCapMs);
          },
        });
      })
      .catch(() => {
        readyRef.current = false;
      });

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onTabHidden);
      clearTimer('refill');
      clearTimer('fallback');
      if (gateRef.current) {
        gateRef.current.destroy();
        gateRef.current = null;
      }
      readyRef.current = false;
    };
  }, [config.enabled, config.adUnitPath, config.frequencyCapMs, scheduleRefill]);

  const openWithInterstitial = useCallback(
    (to) => {
      if (pendingRef.current) return; // navigation already in flight

      const now = Date.now();
      const capped = config.frequencyCapMs > 0 && now - lastShownAt < config.frequencyCapMs;
      const unavailable =
        !AD_CONFIG.enabled || !config.enabled || !config.adUnitPath || getGptLoadState() === 'failed';

      // No preloaded ad right now → go straight to the article, zero waiting.
      if (capped || unavailable || !readyRef.current || !gateRef.current) {
        navigate(to);
        return;
      }

      lastShownAt = now;
      readyRef.current = false; // consumed by this show
      visibleRef.current = false; // wait for proof the ad actually appeared
      pendingRef.current = to;
      gateRef.current.show();
      // Visibility check: if the ad doesn't appear on screen almost at once,
      // it isn't coming — resume navigation immediately and reload the slot
      // in the background so the next click still has an ad ready.
      clearTimer('fallback');
      timersRef.current.fallback = setTimeout(() => {
        if (visibleRef.current) return;
        proceedRef.current();
        scheduleRefill(NO_SHOW_REFILL_MS);
      }, VISIBILITY_CHECK_MS);
    },
    [config.enabled, config.frequencyCapMs, config.adUnitPath, navigate, scheduleRefill],
  );

  // If the route changes some other way (back button, header link), drop the pending flow.
  useEffect(() => {
    if (pendingRef.current) {
      pendingRef.current = null;
      clearTimer('fallback');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const value = useMemo(() => ({ openWithInterstitial }), [openWithInterstitial]);

  return <InterstitialContext.Provider value={value}>{children}</InterstitialContext.Provider>;
}
