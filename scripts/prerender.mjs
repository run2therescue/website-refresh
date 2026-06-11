#!/usr/bin/env node
/**
 * prerender.mjs — Snapshot pre-rendering for the Run 2 The Rescue static site.
 *
 * WHY: every page ships an empty <div id="root"></div> and builds its content in
 * the browser via Babel-standalone. Search engines render JS slowly (second pass)
 * and most AI crawlers (ChatGPT, Claude, Perplexity) don't run JS at all — they
 * fetch the raw HTML and see nothing. This script loads each page in headless
 * Chrome, lets React finish rendering, and bakes the resulting HTML back into the
 * page's #root so the served HTML already contains the real content. The client
 * JS still loads and takes over for interactivity.
 *
 * HOW IT FITS: runs in CI (GitHub Action) on the ephemeral checkout, BEFORE
 * `vercel build`. It mutates the HTML files in place in the working tree; source
 * in git is never touched. Live Shelterluv dog lists are intentionally NOT in the
 * snapshot (the /api proxy isn't running during prerender) — the client fetches
 * them live on load. All static narrative content IS captured.
 *
 * Usage:  node scripts/prerender.mjs [--root <dir>] [--port <n>] [--timeout <ms>]
 *   --root     directory of static files to serve and rewrite in place (default: cwd)
 *   --port     local server port (default: 8799)
 *   --timeout  max ms to wait for a page to render (default: 20000)
 *
 * Exit code is 0 even if individual pages fail to render (they're left as the
 * original empty #root and a warning is logged) — a single slow page should never
 * block a deploy. Non-zero only on hard setup failures (server can't start, no
 * HTML files found, browser can't launch).
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

// ---------- args ----------
function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const ROOT = path.resolve(arg('--root', process.cwd()));
const PORT = parseInt(arg('--port', '8799'), 10);
const TIMEOUT = parseInt(arg('--timeout', '20000'), 10);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// ---------- tiny static file server ----------
function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        // strip query string (e.g. shared.jsx?v=3) and decode
        let rel = decodeURIComponent(req.url.split('?')[0]);
        if (rel === '/' || rel === '') rel = '/index.html';
        // prevent path traversal
        const filePath = path.normalize(path.join(ROOT, rel));
        if (!filePath.startsWith(ROOT)) {
          res.writeHead(403);
          return res.end('Forbidden');
        }
        const data = await fsp.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.on('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

// ---------- discover the HTML pages to prerender ----------
async function findPages() {
  const entries = await fsp.readdir(ROOT, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.html'))
    .map((e) => e.name)
    .sort();
}

// Runs inside the page. Resolves once #root has stabilized, or after a cap.
const WAIT_FN = `(function () {
  return new Promise((resolve) => {
    const root = document.getElementById('root');
    if (!root) return resolve('no-root');
    let last = -1, stable = 0;
    const started = Date.now();
    const tick = () => {
      const len = root.innerHTML.length;
      if (root.childElementCount > 0 && len === last) {
        stable++;
        if (stable >= 3) return resolve('stable:' + len); // ~3 consecutive equal reads
      } else {
        stable = 0;
      }
      last = len;
      if (Date.now() - started > ${TIMEOUT - 1500}) return resolve('timeout:' + len);
      setTimeout(tick, 250);
    };
    tick();
  });
})()`;

async function prerenderPage(browser, file) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  try {
    await page.goto(`http://127.0.0.1:${PORT}/${file}`, {
      waitUntil: 'load',
      timeout: TIMEOUT,
    });
    const status = await page.evaluate(WAIT_FN);

    // Promote scroll-reveal elements to their visible ("in") state so the baked
    // HTML reads as fully-revealed content (matters for no-JS fallback; crawlers
    // read text regardless of CSS visibility).
    await page.evaluate(`(function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in');
        el.classList.remove('pre');
      });
      // React sets video "muted" as a property only, so the serialized HTML
      // would lack the attribute — and mobile browsers refuse to autoplay a
      // video without it. Bake the attribute into the snapshot.
      document.querySelectorAll('video[autoplay]').forEach(function (v) {
        v.setAttribute('muted', '');
      });
    })()`);

    const innerHTML = await page.evaluate('document.getElementById("root").innerHTML');
    const childCount = await page.evaluate('document.getElementById("root").childElementCount');
    await page.close();
    return { innerHTML, childCount, status, errors };
  } catch (err) {
    await page.close().catch(() => {});
    return { innerHTML: '', childCount: 0, status: 'error:' + err.message, errors };
  }
}

function bake(htmlSource, inner) {
  // Match the empty mount node, preserving nothing inside it.
  const re = /<div id="root"[^>]*><\/div>/i;
  if (!re.test(htmlSource)) return null;
  const baked =
    '<div id="root" data-prerendered="1">\n' +
    '<!--prerender:start (snapshot for crawlers; client React re-renders on load)-->\n' +
    inner +
    '\n<!--prerender:end-->\n' +
    '</div>';
  return htmlSource.replace(re, baked);
}

async function main() {
  console.log(`[prerender] root: ${ROOT}`);
  const pages = await findPages();
  if (pages.length === 0) {
    console.error('[prerender] no .html files found in root — nothing to do');
    process.exit(1);
  }
  console.log(`[prerender] pages: ${pages.join(', ')}`);

  let server;
  try {
    server = await startServer();
  } catch (e) {
    console.error(`[prerender] could not start static server: ${e.message}`);
    process.exit(1);
  }
  console.log(`[prerender] serving on http://127.0.0.1:${PORT}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  } catch (e) {
    server.close();
    console.error(`[prerender] could not launch headless Chrome: ${e.message}`);
    process.exit(1);
  }

  let baked = 0;
  let skipped = 0;
  for (const file of pages) {
    const { innerHTML, childCount, status, errors } = await prerenderPage(browser, file);
    if (errors.length) {
      console.warn(`[prerender] ${file}: page errors → ${errors.slice(0, 2).join(' | ')}`);
    }
    // Guard: don't bake empty/broken renders — leave the page as-is.
    if (childCount < 1 || innerHTML.trim().length < 200) {
      console.warn(`[prerender] ${file}: render too small (${status}, ${innerHTML.length} chars) — left unchanged`);
      skipped++;
      continue;
    }
    const src = await fsp.readFile(path.join(ROOT, file), 'utf8');
    const out = bake(src, innerHTML);
    if (!out) {
      console.warn(`[prerender] ${file}: no <div id="root"></div> mount found — left unchanged`);
      skipped++;
      continue;
    }
    await fsp.writeFile(path.join(ROOT, file), out, 'utf8');
    console.log(`[prerender] ${file}: baked ${innerHTML.length.toLocaleString()} chars (${childCount} top-level nodes, ${status})`);
    baked++;
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — ${baked} baked, ${skipped} left unchanged`);
}

main().catch((e) => {
  console.error('[prerender] fatal:', e);
  process.exit(1);
});
