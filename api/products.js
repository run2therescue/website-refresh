/* Vercel serverless function — Fourthwall Storefront API proxy.
 *
 * Why this exists: mirrors api/animals.js (the Shelterluv proxy). The browser
 * only ever talks to this same-origin endpoint (/api/products), which keeps
 * the site CSP tight (connect-src 'self') and lets the CDN cache the product
 * list so Fourthwall is hit rarely.
 *
 * The storefront token (ptkn_*) is a public token by Fourthwall's design,
 * but GitHub push protection pattern-matches it as a secret, so it lives in
 * the FOURTHWALL_STOREFRONT_TOKEN env var in Vercel instead of the repo
 * (same setup as SHELTERLUV_API_KEY). Get or rotate it at Fourthwall →
 * Settings → For developers.
 *
 * Usage:
 *   GET /api/products          -> normalized, cached product list
 *   GET /api/products?debug=1  -> raw Fourthwall payload (field inspection)
 *
 * While all products are still drafts, Fourthwall returns an empty list; the
 * Merch page shows its "coming soon" state. Publishing products in the
 * Fourthwall dashboard makes them appear here automatically — no deploy.
 */

const STOREFRONT_BASE = "https://storefront-api.fourthwall.com/v1";
const SHOP_URL = "https://run2therescue-yeh-shop.fourthwall.com"; // canonical public shop
const PAGE_SIZE = 50;

module.exports = async (req, res) => {
  const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
  if (!token) {
    res.status(500).json({ error: "FOURTHWALL_STOREFRONT_TOKEN environment variable is not set." });
    return;
  }

  const debug = req.query && (req.query.debug !== undefined);

  try {
    const all = await fetchAllProducts(token);

    if (debug) {
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ count: all.length, sample: all[0] || null, products: all });
      return;
    }

    const products = all.map(normalize).filter(Boolean);

    // Same CDN caching contract as /api/animals: serve cached for 5 min,
    // stale-while-revalidate for 10 more.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ count: products.length, shopUrl: SHOP_URL, products });
  } catch (err) {
    res.status(502).json({
      error: "Could not reach the Fourthwall Storefront API.",
      detail: String((err && err.message) || err),
    });
  }
};

/* Page through the built-in `all` collection (every public product). */
async function fetchAllProducts(token) {
  let page = 0;
  let out = [];
  for (let guard = 0; guard < 20; guard++) {
    const url =
      `${STOREFRONT_BASE}/collections/all/products` +
      `?storefront_token=${token}&currency=USD&page=${page}&size=${PAGE_SIZE}`;
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (!r.ok) {
      const body = await r.text();
      throw new Error(`Fourthwall responded ${r.status}: ${body.slice(0, 300)}`);
    }
    const data = await r.json();
    out = out.concat(data.results || []);
    if (!data.paging || !data.paging.hasNextPage) break;
    page++;
  }
  return out;
}

/* ---- Normalization: Fourthwall ProductV1 -> the shape the Merch cards use */

function normalize(p) {
  if (!p || typeof p !== "object") return null;
  // Only PUBLIC products belong on the site (drafts/hidden/archived don't).
  const access = p.access && p.access.type;
  if (access && access !== "PUBLIC") return null;

  const variants = Array.isArray(p.variants) ? p.variants : [];
  const prices = variants
    .map((v) => v && v.unitPrice && Number(v.unitPrice.value))
    .filter((n) => Number.isFinite(n));
  const minPrice = prices.length ? Math.min.apply(null, prices) : null;
  const maxPrice = prices.length ? Math.max.apply(null, prices) : null;

  const images = (Array.isArray(p.images) ? p.images : [])
    .map((im) => im && (im.transformedUrl || im.url))
    .filter(Boolean);

  return {
    id: String(p.id || ""),
    name: String(p.name || "").trim(),
    slug: String(p.slug || ""),
    description: cleanText(p.description),
    image: images[0] || null,
    images: images.slice(0, 4),
    priceMin: minPrice,
    priceMax: maxPrice,
    price: formatPriceRange(minPrice, maxPrice),
    soldOut: !!(p.state && p.state.type === "SOLD_OUT"),
    colors: uniq(variants.map((v) => v && v.attributes && v.attributes.color && v.attributes.color.swatch)),
    sizes: uniq(variants.map((v) => v && v.attributes && v.attributes.size && v.attributes.size.name)),
    // Buying happens on Fourthwall (link-out, same convention as donations).
    url: `${SHOP_URL}/products/${encodeURIComponent(p.slug || "")}`,
  };
}

function formatPriceRange(min, max) {
  if (min == null) return "";
  const f = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
  return max != null && max !== min ? `${f(min)}+` : f(min);
}

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function cleanText(s) {
  return String(s || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
