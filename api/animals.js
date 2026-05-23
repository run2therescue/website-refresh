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

/* Page through every publishable animal (Shelterluv caps pages at 100). The
   list endpoint has been seen as both /animals and /animal, so try plural
   first and fall back to singular. */
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

async function resolveListPath(headers) {
  for (const path of ["animals", "animal"]) {
    try {
      const r = await fetch(`${SHELTERLUV_BASE}/${path}?limit=1&offset=0`, { headers });
      if (r.ok) return path;
    } catch (_) { /* try next */ }
  }
  return "animals";
}

/* ---- Normalization: Shelterluv record -> the shape the site's cards use -- */

function normalize(a) {
  if (!a || typeof a !== "object") return null;
  const photos = Array.isArray(a.Photos) ? a.Photos.filter(Boolean) : [];
  const cover = a.CoverPhoto || photos[0] || null;
  const ageMonths = toInt(a.Age);
  const weightLb = toFloat(a.CurrentWeightPounds);
  const breed = cleanBreed(a.Breed);
  const group = ageGroup(ageMonths);
  const description = cleanText(a.Description);
  return {
    id: String(a["Internal-ID"] || a.ID || ""),
    name: String(a.Name || "Unnamed").trim(),
    type: a.Type || "",
    breed: breed,
    sex: a.Sex || "",
    size: sizeBucket(a.Size, weightLb),
    weightLb: weightLb,
    ageMonths: ageMonths,
    ageGroup: group,
    status: a.Status || "",
    available: !/adopt/i.test(String(a.Status || "")),
    cover: cover,
    photos: photos.length ? photos : (cover ? [cover] : []),
    videos: extractVideos(a.Videos),
    description: description,
    blurb: description || composeBlurb(breed, group, a.Sex),
    goodWith: extractGoodWith(a.Attributes),
    daysInCare: daysSince(a.LastIntakeUnixTime),
    location: (a.CurrentLocation && a.CurrentLocation.Tier1) || "",
  };
}

function toInt(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}
function toFloat(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

function ageGroup(months) {
  if (months == null) return "";
  if (months < 12) return "Puppy";
  if (months < 36) return "Young";
  if (months < 96) return "Adult";
  return "Senior";
}

/* Shelterluv stores size as "Medium (25-59)"; fall back to a weight bucket. */
function sizeBucket(sizeStr, weightLb) {
  const word = String(sizeStr || "").trim().split(" ")[0];
  if (["Small", "Medium", "Large", "X-Large"].includes(word)) return word;
  if (weightLb == null) return "";
  if (weightLb < 25) return "Small";
  if (weightLb < 60) return "Medium";
  return "Large";
}

/* Shelterluv inverts breed names ("Collie, Border"); flip them back, and
   keep mixes joined with a slash ("Shiba Inu/Korean Jindo"). */
function cleanBreed(raw) {
  if (!raw) return "";
  return String(raw)
    .split("/")
    .map((seg) => {
      seg = seg.trim();
      if (seg.includes(", ")) {
        const parts = seg.split(", ").map((p) => p.trim());
        const family = parts.shift();
        return parts.join(" ") + " " + family;
      }
      return seg;
    })
    .filter(Boolean)
    .join(" / ");
}

function extractGoodWith(attrs) {
  if (!Array.isArray(attrs)) return [];
  const out = [];
  for (const x of attrs) {
    const name = typeof x === "string" ? x : x && x.AttributeName;
    if (!name) continue;
    const m = /good with (\w+)/i.exec(name);
    if (m) out.push(m[1].toLowerCase());
  }
  return out;
}

function extractVideos(vids) {
  if (!Array.isArray(vids)) return [];
  return vids
    .map((v) => v && {
      id: v.VideoId || null,
      url: v.YoutubeUrl || null,
      embed: v.EmbedUrl ? (v.EmbedUrl.startsWith("//") ? "https:" + v.EmbedUrl : v.EmbedUrl) : null,
      thumb: v.ThumbUrl || null,
    })
    .filter((v) => v && v.embed);
}

function daysSince(unix) {
  const t = parseInt(unix, 10);
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() / 1000 - t) / 86400));
}

function cleanText(s) {
  return String(s || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["“]+|["”]+$/g, "")
    .trim();
}

/* A warm, on-brand line for dogs whose Shelterluv record has no description.
   Unique per dog (breed + age vary), so cards never look duplicated. */
function composeBlurb(breed, group, sex) {
  const her = sex === "Female" ? "her" : sex === "Male" ? "him" : "them";
  const lead = group ? `A ${group.toLowerCase()} ${breed || "rescue dog"}` : (breed || "A rescue dog");
  return `${lead}, rescued from the meat trade and waiting for the family that will call ${her} home.`;
}
