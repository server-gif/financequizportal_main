/**
 * Google Publisher Tag (GPT) service.
 *
 * All direct interaction with `window.googletag` lives here so UI components
 * never touch GPT. Guarantees:
 *  - The GPT script is injected at most once (singleton promise).
 *  - Services are configured and enabled at most once.
 *  - One global event listener per event type, dispatched to per-slot callbacks,
 *    so components can subscribe/unsubscribe without leaking listeners.
 *  - Every slot can be destroyed safely, even if it was never defined
 *    (e.g. a component unmounted before GPT finished loading).
 *  - Failures (ad blockers, network errors, timeouts) reject cleanly and never throw into React.
 */
import { AD_CONFIG } from '../config/ads';

let loadPromise = null;
let loadState = 'idle'; // idle | loading | ready | failed
let servicesInitialized = false;
const renderListeners = new Map(); // slotElementId -> callback(event)
const closedListeners = new Map(); // slotElementId -> callback(event)
const visibilityListeners = new Map(); // slotElementId -> callback(event)

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

function getGoogletag() {
  window.googletag = window.googletag || { cmd: [] };
  return window.googletag;
}

function initServices(googletag) {
  if (servicesInitialized) return;
  servicesInitialized = true;

  const pubads = googletag.pubads();
  // We request each slot explicitly with refresh(), which is the SPA-safe pattern.
  pubads.disableInitialLoad();
  pubads.setCentering(true);

  pubads.addEventListener('slotRenderEnded', (event) => {
    const callback = renderListeners.get(event.slot.getSlotElementId());
    if (callback) callback(event);
  });

  // Fired when the reader closes a closable unit (out-of-page interstitial, sticky…).
  pubads.addEventListener('slotClosed', (event) => {
    const callback = closedListeners.get(event.slot.getSlotElementId());
    if (callback) callback(event);
  });

  // Fired whenever a slot's on-screen visibility changes. For a triggered
  // interstitial, inViewPercentage dropping to 0 means the reader closed it.
  pubads.addEventListener('slotVisibilityChanged', (event) => {
    const callback = visibilityListeners.get(event.slot.getSlotElementId());
    if (callback) callback(event);
  });

  googletag.enableServices();
}

export function getGptLoadState() {
  return loadState;
}

/** Load GPT once. Resolves with `googletag`, rejects if blocked or too slow. */
export function loadGpt() {
  if (!isBrowser()) return Promise.reject(new Error('GPT requires a browser'));
  if (loadPromise) return loadPromise;

  loadState = 'loading';
  loadPromise = new Promise((resolve, reject) => {
    const googletag = getGoogletag();
    let settled = false;
    const settle = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(value);
    };

    const timer = setTimeout(() => {
      loadState = 'failed';
      settle(reject, new Error('GPT load timed out'));
    }, AD_CONFIG.gptLoadTimeoutMs);

    // Runs as soon as GPT has loaded (or immediately if it already has).
    googletag.cmd.push(() => {
      try {
        initServices(googletag);
        loadState = 'ready';
        settle(resolve, googletag);
      } catch (error) {
        loadState = 'failed';
        settle(reject, error);
      }
    });

    let script = document.querySelector(`script[src="${AD_CONFIG.gptSrc}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = AD_CONFIG.gptSrc;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
    script.addEventListener(
      'error',
      () => {
        loadState = 'failed';
        settle(reject, new Error('GPT script failed to load'));
      },
      { once: true },
    );
  });

  // Avoid "unhandled rejection" noise; callers still receive the rejection.
  loadPromise.catch(() => {});
  return loadPromise;
}

/**
 * Define, display and request a slot.
 * `outOfPageFormat` (e.g. 'INTERSTITIAL') defines an out-of-page slot that
 * Google renders in its own container — no div needed, sizes are ignored.
 * `onClosed` fires when the reader closes such an ad.
 * `interstitialConfig` is passed to slot.setConfig() — used to put GAM
 * interstitials into trigger mode (load in the background, show on demand
 * via handle.show()).
 * `onVisibilityChange` receives slotVisibilityChanged events.
 * The returned handle also exposes `show()` and `refresh()`.
 * Returns a handle whose destroy() is always safe to call.
 */
export function createAdSlot({
  adUnitPath,
  divId,
  sizes,
  sizeMapping,
  targeting,
  outOfPageFormat,
  interstitialConfig,
  onRenderEnded,
  onClosed,
  onError,
  onVisibilityChange,
}) {
  const handle = {
    destroyed: false,
    slot: null,
    show: () => {},
    refresh: () => {},
    destroy: () => {},
  };
  if (!isBrowser()) return handle;

  const googletag = getGoogletag();
  const listener = (event) => {
    if (!handle.destroyed && onRenderEnded) onRenderEnded(event);
  };
  const closedListener = (event) => {
    if (!handle.destroyed && onClosed) onClosed(event);
  };
  const visibilityListener = (event) => {
    if (!handle.destroyed && onVisibilityChange) onVisibilityChange(event);
  };

  googletag.cmd.push(() => {
    if (handle.destroyed) return;
    if (!document.getElementById(divId) && !outOfPageFormat) return;
    try {
      // Remove any stale slot bound to the same element (React StrictMode, fast remounts).
      const stale = googletag.pubads().getSlots().filter((s) => s.getSlotElementId() === divId);
      if (stale.length) googletag.destroySlots(stale);

      const oopFormat = outOfPageFormat
        ? googletag.enums?.OutOfPageFormat?.[outOfPageFormat]
        : null;
      if (outOfPageFormat && !oopFormat) throw new Error(`OutOfPageFormat.${outOfPageFormat} unsupported`);

      const slot = oopFormat
        ? googletag.defineOutOfPageSlot(adUnitPath, oopFormat)
        : googletag.defineSlot(adUnitPath, sizes, divId);
      if (!slot) throw new Error(`Could not define slot ${adUnitPath}`);

      if (!oopFormat && sizeMapping?.length) {
        const builder = googletag.sizeMapping();
        sizeMapping.forEach(([viewport, allowed]) => builder.addSize(viewport, allowed));
        slot.defineSizeMapping(builder.build());
      }
      Object.entries(targeting || {}).forEach(([key, value]) => slot.setTargeting(key, value));
      if (oopFormat && interstitialConfig && typeof slot.setConfig === 'function') {
        slot.setConfig(interstitialConfig);
      }

      slot.addService(googletag.pubads());
      // Out-of-page slots get an auto-generated element id; use the real one.
      const slotKey = slot.getSlotElementId();
      renderListeners.set(slotKey, listener);
      closedListeners.set(slotKey, closedListener);
      if (onVisibilityChange) visibilityListeners.set(slotKey, visibilityListener);
      handle.slot = slot;

      handle.show = () => {
        if (handle.destroyed) return;
        googletag.cmd.push(() => {
          if (!handle.destroyed) googletag.display(slot);
        });
      };
      handle.refresh = () => {
        if (handle.destroyed) return;
        googletag.cmd.push(() => {
          if (!handle.destroyed) googletag.pubads().refresh([slot]);
        });
      };

      googletag.display(slot);
      googletag.pubads().refresh([slot]);
    } catch (error) {
      if (onError) onError(error);
    }
  });

  handle.destroy = () => {
    if (handle.destroyed) return;
    handle.destroyed = true;
    const { slot } = handle;
    const slotKey = slot ? slot.getSlotElementId() : divId;
    if (renderListeners.get(slotKey) === listener) renderListeners.delete(slotKey);
    if (closedListeners.get(slotKey) === closedListener) closedListeners.delete(slotKey);
    if (visibilityListeners.get(slotKey) === visibilityListener) visibilityListeners.delete(slotKey);
    if (slot) {
      googletag.cmd.push(() => {
        try {
          googletag.destroySlots([slot]);
        } catch {
          /* slot already gone */
        }
      });
    }
  };

  return handle;
}
