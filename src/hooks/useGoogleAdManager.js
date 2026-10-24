import { useEffect, useId, useState } from 'react';
import { AD_CONFIG } from '../config/ads';
import { createAdSlot, loadGpt } from '../services/googleAdManager';

/**
 * React binding for a single GAM slot.
 *
 * status: 'idle' | 'loading' | 'filled' | 'empty' | 'error' | 'timeout' | 'closed'
 *
 * - Defines the slot after the container div is in the DOM.
 * - Destroys it on unmount, so route changes never leave orphaned slots.
 * - `refreshKey` lets persistent placements (layout ads) request a fresh ad per page.
 * - Handles StrictMode double-mounts and unmounts that happen before GPT loads.
 */
export function useGoogleAdManager({
  adUnitPath,
  sizes,
  sizeMapping,
  targeting,
  outOfPageFormat,
  enabled = true,
  timeoutMs = 0,
  refreshKey,
}) {
  const reactId = useId();
  const divId = `gam-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [status, setStatus] = useState('idle');

  const active = enabled && AD_CONFIG.enabled && Boolean(adUnitPath);
  // Serialise array/object config so the effect only re-runs on real changes.
  const configKey = JSON.stringify([adUnitPath, sizes, sizeMapping, targeting, outOfPageFormat]);

  useEffect(() => {
    if (!active) {
      setStatus('idle');
      return undefined;
    }

    let cancelled = false;
    let handle = null;
    let timer = null;
    const update = (next) => {
      if (!cancelled) setStatus(next);
    };

    setStatus('loading');
    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        if (!cancelled) setStatus((current) => (current === 'loading' ? 'timeout' : current));
      }, timeoutMs);
    }

    loadGpt()
      .then(() => {
        if (cancelled) return;
        handle = createAdSlot({
          adUnitPath,
          divId,
          sizes,
          sizeMapping,
          targeting,
          outOfPageFormat,
          onRenderEnded: (event) => {
            clearTimeout(timer);
            update(event.isEmpty ? 'empty' : 'filled');
          },
          onClosed: () => {
            clearTimeout(timer);
            update('closed');
          },
          onError: () => {
            clearTimeout(timer);
            update('error');
          },
        });
      })
      .catch(() => {
        clearTimeout(timer);
        update('error');
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (handle) handle.destroy();
    };
    // configKey stands in for adUnitPath/sizes/sizeMapping/targeting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, divId, configKey, timeoutMs, refreshKey]);

  return { divId, status };
}
