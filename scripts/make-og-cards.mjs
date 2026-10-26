/**
 * Builds the 1200x675 social-share card for every article (public/images/og/<slug>.png).
 *
 * Each card is the article's own photograph (public/images/photos/<slug>.jpg) with the
 * headline, category and wordmark laid over a left-hand scrim, so the share image on
 * social platforms looks exactly like the card readers see on the site.
 *
 * The HTML is rendered by headless Microsoft Edge; no image library and no network
 * access are involved once the photos are in place. Run `npm run ogcards` after
 * adding an article or changing its title or photo.
 */
import { spawn } from 'node:child_process';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { BLOGS } from '../src/data/blogs.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ogDir = path.join(root, 'public', 'images', 'og');
const tmpDir = path.join(root, 'scripts', '.og-tmp');

const WIDTH = 1200;
const HEIGHT = 675;

/** Same two-word wordmark used by the site header. */
const wordmark = '<b>Finance</b><i>QuizPortal</i>';

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Long titles get a smaller size so they never run past three lines. */
const titleSize = (title) => Math.min(66, Math.floor(4200 / Math.max(title.length, 30)));

const cardHtml = ({ title, category }, photoBase64) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #04140c; }
  .card { position: relative; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #04140c; }
  .photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .veil { position: absolute; inset: 0; background: rgba(4, 20, 12, 0.18); }
  .scrim {
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
      rgba(4, 20, 12, 0.97) 0%,
      rgba(4, 20, 12, 0.93) 30%,
      rgba(4, 20, 12, 0.62) 55%,
      rgba(4, 20, 12, 0.18) 78%,
      rgba(4, 20, 12, 0.32) 100%);
  }
  .wrap { position: absolute; left: 88px; top: 108px; width: 700px; font-family: 'Segoe UI', Arial, sans-serif; }
  .rule { width: 64px; height: 6px; border-radius: 3px; background: #ffd700; margin-bottom: 30px; }
  .cat { font-size: 22px; letter-spacing: 3.4px; font-weight: 600; color: #7ef0c4; text-transform: uppercase; }
  h1 {
    margin: 20px 0 0;
    font-size: ${titleSize(title)}px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #ffffff;
  }
  .brand {
    position: absolute; left: 88px; bottom: 54px;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 25px; color: #8fa89a; letter-spacing: 0.2px;
  }
  .brand b { color: #ffffff; font-weight: 600; }
  .brand i { color: #ffd700; font-style: normal; font-weight: 600; }
  .brand span { color: #6f8b7c; }
</style>
</head>
<body>
  <div class="card">
    <img class="photo" src="data:image/jpeg;base64,${photoBase64}" alt="">
    <div class="veil"></div>
    <div class="scrim"></div>
    <div class="wrap">
      <div class="rule"></div>
      <div class="cat">${escapeHtml(category)}</div>
      <h1>${escapeHtml(title)}</h1>
    </div>
    <div class="brand">${wordmark} <span>&middot; financequizportal.com</span></div>
  </div>
</body>
</html>
`;

const edgeCandidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const edge = edgeCandidates.find((candidate) => existsSync(candidate));

const fileUrl = (file) => pathToFileURL(file).href;

const shoot = (htmlPath, pngPath) =>
  new Promise((resolve) => {
    const child = spawn(edge, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--force-device-scale-factor=1',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--virtual-time-budget=4000',
      `--screenshot=${pngPath}`,
      fileUrl(htmlPath),
    ]);
    // Edge writes harmless GPU warnings to stderr; only the exit matters here.
    child.stderr.on('data', () => {});
    child.on('error', () => resolve(false));
    child.on('close', () => resolve(true));
  });

const waitForPng = async (file, tries = 40) => {
  for (let i = 0; i < tries; i += 1) {
    const info = await stat(file).catch(() => null);
    if (info && info.size > 5000) return true;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
};

if (!edge) {
  console.error('Microsoft Edge was not found; the social cards were not rebuilt.');
  process.exit(0);
}

await mkdir(ogDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

let written = 0;

for (const blog of BLOGS) {
  const photoPath = path.join(root, 'public', blog.image);
  const photo = await readFile(photoPath).catch(() => null);
  if (!photo) {
    console.warn(`SKIP  ${blog.slug} (missing ${blog.image})`);
    continue;
  }

  const htmlPath = path.join(tmpDir, `${blog.slug}.html`);
  const pngPath = path.join(ogDir, `${blog.slug}.png`);
  await writeFile(htmlPath, cardHtml(blog, photo.toString('base64')), 'utf8');
  await shoot(htmlPath, pngPath);

  if (await waitForPng(pngPath)) {
    written += 1;
    console.log(`OK    ${blog.slug}.png`);
  } else {
    console.warn(`WARN  ${blog.slug}: card was not rasterised`);
  }
}

await rm(tmpDir, { recursive: true, force: true });

console.log(`Social cards written: ${written}/${BLOGS.length}`);
