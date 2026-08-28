/* Vercel serverless function — per-dog landing pages at /adopt/<slug>.
 *
 * Why this exists: individual dogs had no URL of their own (opening a
 * profile was a client-side modal; the address bar stayed at /adopt). That
 * meant no shareable link, no per-dog search indexing, and a generic image
 * on every social link preview.
 *
 * How it stays correct forever: this fetches the SAME live Adopt.html over
 * HTTP (not a copy of its contents) and splices in per-dog title/meta/OG/
 * JSON-LD before serving it. Because it's a live fetch, this route can never
 * drift from whatever Adopt.html actually contains — humans get the exact
 * same interactive page (with the matching dog's profile opened
 * automatically once the app loads, via window.__R2R_DEEPLINK_SLUG__ read in
 * adopt.jsx), and crawlers / link-unfurlers get correct per-dog metadata
 * without executing any JavaScript.
 *
 * Routed here by vercel.json: "/adopt/:slug" -> "/api/dog?slug=:slug"
 */

const { fetchAllAnimals, normalize } = require("./_lib/shelterluv");

const HIDDEN_FROM_GRID = ["twitch", "sweet pea", "checkers"]; // mirrors shared.jsx
const DEFAULT_IMAGE = "https://run2therescue.org/assets/og-image.png";
const OLD_TITLE = "Adopt a Rescue Dog \u00b7 Survivors of the Dog Meat Trade \u00b7 Run 2 The Rescue";
const OLD_DESC = "Meet adoptable dogs rescued from the East Asia dog meat trade, medically cleared and ready for loving homes. Browse current survivors and start an adoption application today.";
const OLD_CANON = "https://run2therescue.org/adopt";
const ROOT_MARK = '<div id="root"></div>';

function slugify(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncate(s, max) {
  s = String(s || "").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "\u2026";
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || "").toLowerCase().trim();
  const origin = `https://${req.headers.host || "run2therescue.org"}`;

  let shell;
  try {
    const shellRes = await fetch(`${origin}/Adopt.html`);
    if (!shellRes.ok) throw new Error("HTTP " + shellRes.status);
    shell = await shellRes.text();
  } catch (e) {
    res.statusCode = 302;
    res.setHeader("Location", "/adopt");
    res.end();
    return;
  }

  let dog = null;
  const key = process.env.SHELTERLUV_API_KEY;
  if (key && slug) {
    try {
      const all = (await fetchAllAnimals(key)).map(normalize).filter(Boolean);
      dog = all.find((a) =>
        a.available !== false &&
        !HIDDEN_FROM_GRID.includes(String(a.name || "").trim().toLowerCase()) &&
        slugify(a.name) === slug
      ) || null;
    } catch (e) {
      dog = null; // A Shelterluv hiccup shouldn't 500 a social crawler; fall through to the plain shell below.
    }
  }

  if (!dog) {
    // No dog matches (expired share link, adopted, or a bad slug). Serve the
    // real, working Adopt directory with a 404 status — correct for search
    // engines (this specific URL is gone), while a human who clicks an old
    // link still lands on a working page instead of a broken one.
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=300");
    res.end(shell);
    return;
  }

  const canonical = `${origin}/adopt/${slug}`;
  const title = `${dog.name} \u00b7 Adopt a Rescue Dog \u00b7 Run 2 The Rescue`;
  const descSource = dog.blurb || dog.description || `${dog.name}, a rescue dog from the dog meat trade looking for a forever home.`;
  const desc = truncate(descSource, 160);
  const image = dog.cover
    ? (/^https?:\/\/[^/]*\.shelterluv\.com\//i.test(dog.cover)
        ? `${origin}/_vercel/image?url=${encodeURIComponent(dog.cover)}&w=1200&q=75`
        : dog.cover)
    : DEFAULT_IMAGE;

  let html = shell;
  html = html.split(OLD_TITLE).join(esc(title));
  html = html.split(OLD_DESC).join(esc(desc));
  html = html.split(OLD_CANON).join(canonical);
  html = html.split(DEFAULT_IMAGE).join(image);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: dog.name,
    description: desc,
    image: image,
    category: "Adoptable dog",
    brand: { "@type": "Organization", name: "Run 2 The Rescue" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonical,
    },
  };
  const inject =
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n` +
    `<script>window.__R2R_DEEPLINK_SLUG__ = ${JSON.stringify(slug)};</script>\n` +
    ROOT_MARK;
  html = html.replace(ROOT_MARK, inject);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.statusCode = 200;
  res.end(html);
};
