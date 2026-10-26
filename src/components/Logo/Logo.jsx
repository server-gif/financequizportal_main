/**
 * FinanceQuizPortal brand mark — the glossy emerald ribbon "F" with ascending
 * bars, sitting on a dark rounded tile. The artwork lives in
 * public/images/brand/logo.svg (a 512 viewBox with the raster art embedded at
 * 256px) so the same file serves the header, the footer and the splash screen
 * without shipping the original 1.6 MB source SVG.
 */
export default function Logo({ className = '' }) {
  return (
    <img
      className={className}
      src="/images/brand/logo.svg"
      width="512"
      height="512"
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
