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
   * The unit is preloaded in the background at app start as a normal in-page
   * display slot and rendered into our own full-screen overlay, so the blurred
   * backdrop is styled by us and reads identically in light and dark themes.
   * On an article click the overlay appears instantly (no network wait); if no
   * ad is preloaded the reader navigates immediately with zero waiting.
   * NOTE: VITE_AD_UNIT_INTERSTITIAL must be a display-format ad unit that can
   * fill these sizes (e.g. 300x250 / 300x357), not a GPT interstitial-format unit.
   */
  interstitial: {
    enabled: true,
    adUnitPath: UNITS.interstitial,
    sizes: [[300, 250], [300, 357], [320, 480]],

    /**
     * Show the overlay on alternate article clicks (counted per page load):
     *   'even'  → 2nd, 4th, 6th… article click shows the ad (default)
     *   'odd'   → 1st, 3rd, 5th… article click shows the ad
     *   'every' → every article click shows the ad
     * Skipped clicks navigate straight to the article and keep the preloaded
     * creative for the next click that is due.
     */
    clickCadence: 'even',

    /** Extra minimum gap between interstitials in ms. 0 = no time limit (cadence still applies). */
    frequencyCapMs: 0,
  },
};
