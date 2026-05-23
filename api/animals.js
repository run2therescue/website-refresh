/* Vercel serverless function — Shelterluv API proxy.
 *
 * Why this exists: the Shelterluv API key is a secret and Shelterluv's API
 * does not allow cross-origin browser calls. So the browser only ever talks
 * to this same-origin endpoint (/api/animals); the key stays server-side in
 * the SHELTERLUV_API_KEY environment variable.
 *
 * Usage:
 *   GET /api/animals          -> normalized, cached list of adoptable animals
 *   GET /api/animals?debug=1  -> raw Shelterluv payload (for field inspection)
 */

const SHELTERLUV_BASE = "https://www.shelterluv.com/api/v1";
const PAGE_LIMIT = 100;

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
      // No caching on debug so inspection always reflects current data.
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({
        count: all.length,
        sample: all[0] || null,
        animals: all,
      });
      return;
    }

    const animals = all.map(normalize).filter(Boolean);

    // The CDN serves this cached copy for 5 min, and keeps serving a stale
    // copy for 10 more while it refreshes — so Shelterluv is hit rarely and
    // the page stays fast even if Shelterluv is briefly down.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ count: animals.length, animals });
  } catch (err) {
    res.status(502).json({
      error: "Could not reach the Shelterluv API.",
      detail: String((err && err.message) || err),
    });
  }
};

/* Page through every publishable animal. Shelterluv caps each page at 100;
   the list endpoint has been seen as both /animals and /animal, so we try
   the plural first and fall back to the singular. */
async function fetchAllAnimals(key) {
  const headers = { "X-Api-Key": key, Accept: "application/json" };
  const path = await resolveListPath(headers);

  let offset = 0;
  let out = [];
  for (let guard = 0; guard < 25; guard++) {
    const url = `${SHELTERLUV_BASE}/${path}?status_type=publishable&limit=${PAGE_LIMIT}&offset=${offset}`;
    const r = await fetch(url, { headers });
    if (!r.ok) {
      const body = await r.text();
      throw new Error(`Shelterluv responded ${r.status}: ${body.slice(0, 300)}`);
    }
    const data = await r.json();
    const page = data.animals || data.results || data.data || [];
    out = out.concat(page);
    if (!data.has_more || page.length === 0) break;
    offset += PAGE_LIMIT;
  }
  return out;
}

/* Probe which list path this API build uses (one HEAD-ish GET, tiny page). */
async function resolveListPath(headers) {
  for (const path of ["animals", "animal"]) {
    try {
      const r = await fetch(`${SHELTERLUV_BASE}/${path}?limit=1&offset=0`, { headers });
      if (r.ok) return path;
    } catch (_) { /* try next */ }
  }
  return "animals";
}

/* Best-effort mapping from a Shelterluv animal record to the shape the site's
   cards expect. Refined once the ?debug payload confirms exact field names. */
function normalize(a) {
  if (!a || typeof a !== "object") return null;
  const photos = Array.isArray(a.Photos) ? a.Photos.filter(Boolean) : [];
  const cover = a.CoverPhoto || a.Photo || photos[0] || null;
  const ageMonths = toInt(a.Age);
  return {
    id: a["Internal-ID"] || a.ID || a.id || null,
    name: a.Name || "Unnamed",
    type: a.Type || null,
    breed: a.Breed || "",
    sex: a.Sex || "",
    size: a.Size || "",
    color: a.Color || "",
    status: a.Status || "",
    ageMonths: ageMonths,
    ageGroup: ageGroup(ageMonths),
    description: stripHtml(a.Description || a.Memo || ""),
    cover: cover,
    photos: photos,
    attributes: extractAttributes(a.Attributes),
    intakeUnix: toInt(a.LastIntakeUnixTime || a.InTimestamp),
    url: a.URL || null,
  };
}

function extractAttributes(attrs) {
  if (!Array.isArray(attrs)) return [];
  return attrs
    .map((x) => (typeof x === "string" ? x : x && (x.AttributeName || x.Name || x.Internal_ID)))
    .filter(Boolean);
}

function toInt(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

function ageGroup(months) {
  if (months == null) return "";
  if (months < 12) return "Puppy";
  if (months < 36) return "Young";
  if (months < 96) return "Adult";
  return "Senior";
}

function stripHtml(s) {
  return String(s).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
