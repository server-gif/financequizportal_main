# FinanceQuizPortal — Financial Blog (React + Google Ad Manager)

A responsive financial-education publication built with React 19, React Router 7 and Vite,
with Google Ad Manager (GAM) display placements and an interstitial shown when a reader opens an article.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
npm run photos     # re-download any missing article photographs (Pexels)
npm run ogcards    # rebuild the 1200x675 social cards from the photos (needs Microsoft Edge)
```

Set `VITE_SITE_URL=https://financequizportal.com` at build time so canonical and Open Graph URLs are correct
(it is already in `.env`, and `src/config/site.js` falls back to the same domain).

## Project structure

```text
src/
├── components/
│   ├── AdSlot/            reusable display placement (top, content, inArticle, footer)
│   ├── ArticleContent/    renders structured article blocks (+ in-content ad insertion)
│   ├── ArticleImage/      fixed-ratio, lazy, object-fit: cover image with fallback
│   ├── BlogCard/          article teaser, receives a blog object via props
│   ├── BlogGrid/          responsive grid, optional ad every N cards
│   ├── CategorySection/   titled section wrapper ("Latest", "Related"…)
│   ├── Container/         max-width wrapper
│   ├── Footer/  Header/   responsive header with mobile menu
│   ├── HeroSection/       featured article + trending list
│   ├── InterstitialAd/    provider, overlay and useInterstitialNavigation()
│   ├── ScrollToTop/
│   └── SEO/               title, description, canonical, Open Graph, Twitter, JSON-LD
├── config/
│   ├── ads.js             ← ALL ad unit paths live here (test units)
│   └── site.js            site name, URL, navigation
├── data/                  blogs.js (articles), categories.js
├── hooks/                 useGoogleAdManager.js, useArticleLink.js
├── layouts/MainLayout.jsx header → top ad → page → footer ad → footer
├── pages/                 Home, Blog (all + category), BlogDetail, About, NotFound
└── services/googleAdManager.js   the only code that touches window.googletag
public/images/photos/      one licensed stock photograph per article (scripts/fetch-photos.ps1)
public/images/og/          the same photo plus the headline, as 1200x675 PNG social cards
```

## Google Ad Manager

**Only Google's public GPT sample network (`/6355419/...`) is used.** These are test units and never earn revenue.

To go live, edit `src/config/ads.js` and replace each `adUnitPath` with your own unit
(e.g. `/<network-code>/<site>/top_leaderboard`). No component changes are needed.

How it is wired:

- `services/googleAdManager.js` loads GPT once (singleton promise, load timeout), enables services once,
  uses `disableInitialLoad()` + explicit `refresh()` (the SPA-safe pattern), and keeps a single global
  `slotRenderEnded` listener that dispatches to per-slot callbacks — no listener leaks.
- `hooks/useGoogleAdManager.js` defines a slot after its div mounts and destroys it on unmount.
  It is safe under React StrictMode and when a component unmounts before GPT finishes loading.
  Layout ads receive `refreshKey={pathname}` so every page view requests a fresh creative.
- Every slot reserves space (`minHeight` in config) to avoid layout shift; unfilled slots show a neutral placeholder.

### Article click → interstitial → navigation

1. `useArticleLink` gives each card a real, crawlable `href` and intercepts plain left-clicks
   (Ctrl/⌘/middle-click still open a new tab normally).
2. `InterstitialProvider` opens the overlay and requests the interstitial slot.
3. Navigation with React Router happens **exactly once**, when any of these occurs:
   the reader closes the ad (✕, "Continue to article" or Escape) · the slot is empty · GPT errors or is blocked ·
   the ad has not rendered within `interstitial.loadTimeoutMs` (5 s). If GPT already failed, the overlay is skipped entirely.
4. Back/forward or header navigation while the overlay is open simply dismisses it.

`interstitial.frequencyCapMs` (default `0`, i.e. every click while testing) limits how often it appears.

**Why a publisher-controlled overlay instead of GPT's native web interstitial format?**
GPT's `OutOfPageFormat.INTERSTITIAL` cannot be opened from code: Google decides when to show it,
only on its own triggers and frequency caps, and continues with a full page load rather than
React Router navigation. That cannot satisfy "click → show ad → close → SPA navigate". The overlay
here hosts a normal GAM slot instead. Before production, confirm the format and frequency you choose
comply with your Ad Manager agreement and the Better Ads Standards.

## SEO

Each page renders its own `<title>`, meta description, canonical URL, Open Graph/Twitter tags and,
for articles, `Article` JSON-LD (React 19 hoists these into `<head>`). Each page has one H1, with H2/H3
inside article content. Because this is a client-rendered SPA, consider prerendering (or SSR) for the
best crawler and social-preview coverage, and configure your host to serve `index.html` for all routes.

## Content

Articles in `src/data/blogs.js` are general educational content, not personalised advice.
Example figures are illustrative and currency-neutral.
