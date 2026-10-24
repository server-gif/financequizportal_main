/**
 * Google Ad Manager configuration.
 *
 * All ad unit tags live in the project-root `.env` file (VITE_AD_UNIT_*) —
 * nothing is hardcoded here. See `.env.example` for the expected keys.
 * A placement whose tag is empty in `.env` renders nothing, and the
 * interstitial is skipped (article opens directly). Restart the dev server
 * after editing `.env`.
 */

const tag = (value) => value || '';

const UNITS = {
  top: tag(import.meta.env.VITE_AD_UNIT_TOP),
  interstitial: tag(import.meta.env.VITE_AD_UNIT_INTERSTITIAL),
};

export const AD_CONFIG = {
  /** Master switch — set to false to render no ads at all (e.g. for local QA). */
  enabled: true,

  /** GPT library URL (official Google Publisher Tag). */
  gptSrc: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js',

  /** If GPT has not loaded within this time (ad blocker, slow network), treat it as failed. */
  gptLoadTimeoutMs: 6000,

  /**
   * Responsive display placements.
   * sizeMapping: [[viewportWidth, viewportHeight], sizesAllowedAtThatViewport]
   * Ordered from largest viewport to smallest, as GPT expects.
   * minHeight reserves space so the page does not jump when an ad renders.
   */
  slots: {
    top: {
      adUnitPath: UNITS.top,
      sizes: [[300, 250], [336, 280]],
      sizeMapping: [
        [[768, 0], [[300, 250], [336, 280]]],
        [[0, 0], [[300, 250]]],
      ],
      minHeight: { mobile: 250, desktop: 250 },
    },
  },

  /**
   * Interstitial shown when a reader opens an article.
   * The unit is preloaded in the background at app start as a GPT out-of-page
   * INTERSTITIAL slot in trigger mode: the ad fills hidden and is displayed
   * instantly on an article click; if no ad is preloaded the reader navigates
   * immediately with zero waiting. Google renders the full-screen container
   * and its native controls; closing it continues the pending navigation.
   */
  interstitial: {
    enabled: true,
    adUnitPath: UNITS.interstitial,
    /** Minimum gap between interstitials. 0 = show on every article click (useful while testing). */
    frequencyCapMs: 0,
  },
};
