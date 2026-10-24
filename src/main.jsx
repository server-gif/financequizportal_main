import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/**
 * Fade out the HTML splash once the app has painted its first frame.
 * A short minimum visible time avoids a jarring flash on fast loads,
 * and a hard timeout guarantees removal even if something goes wrong.
 */
const MIN_VISIBLE_MS = 500;
const MAX_VISIBLE_MS = 4000;

function hideSplash() {
  const splash = document.getElementById('app-splash');
  if (!splash || splash.dataset.hiding) return;
  splash.dataset.hiding = '1';
  splash.classList.add('is-hidden');
  splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  setTimeout(() => splash.remove(), 1000); // fallback if transitionend never fires
}

const startedAt = Date.now();

function hideAfterPaint() {
  const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));
  setTimeout(() => requestAnimationFrame(hideSplash), wait);
}

requestAnimationFrame(hideAfterPaint);
setTimeout(hideSplash, MAX_VISIBLE_MS); // safety net
