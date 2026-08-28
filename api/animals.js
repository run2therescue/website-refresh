/* Vercel serverless function — Shelterluv API proxy.
 *
 * Why this exists: the Shelterluv API key is a secret and Shelterluv's API
 * does not allow cross-origin browser calls. So the browser only ever talks
 * to this same-origin endpoint (/api/animals); the key stays server-side in
 * the SHELTERLUV_API_KEY environment variable.
 *
 * Usage:
 *   GET /api/animals          -> normalized, cached list of animals
 *   GET /api/animals?debug=1  -> raw Shelterluv payload (for field inspection)
 *
 * The fetch/normalize logic lives in ./_lib/shelterluv.js so api/dog.js (the
 * per-dog landing pages) can reuse the exact same normalization without a
 * second, drifting copy.
 */

const { fetchAllAnimals, normalize } = require("./_lib/shelterluv");

module.exports = async (req, res) => {
  const key = process.env.SHELTERLUV_API_KEY;
  if (!key) {
    res.status(500).json({ error: "SHELTERLUV_API_KEY environment variable is not set." });
    return;
  }

  const debug = req.query && (req.query.debug !== undefined);

  try {
    const all = await fetchAllAnimals(key);

    if (debug) {
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ count: all.length, sample: all[0] || null, animals: all });
      return;
    }

    const animals = all.map(normalize).filter(Boolean);

    // The CDN serves this cached copy for 5 min, then keeps serving a stale
    // copy for 10 more while it refreshes — so Shelterluv is hit rarely and
    // the page stays fast even if Shelterluv is briefly slow.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ count: animals.length, animals });
  } catch (err) {
    res.status(502).json({
      error: "Could not reach the Shelterluv API.",
      detail: String((err && err.message) || err),
    });
  }
};
