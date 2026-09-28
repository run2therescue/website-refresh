/* Vercel serverless function — Zeffy campaign totals.
 *
 * Why this exists: the Zeffy API key is a secret, so the browser never talks
 * to Zeffy directly. It calls this same-origin endpoint (/api/campaigns), and
 * the key stays server-side in the ZEFFY_API_KEY environment variable.
 *
 * Usage:
 *   GET /api/campaigns          -> { campaigns: { <dogId>: { raised, goal } } }
 *                                  (whole dollars)
 *   GET /api/campaigns?debug=1  -> raw Zeffy payload, for field inspection.
 *                                  PREVIEW DEPLOYMENTS ONLY — disabled in
 *                                  production so the org's full campaign list
 *                                  is never publicly listable.
 *
 * TO TRACK A NEW DOG: add an entry to CAMPAIGNS below with the Zeffy form's
 * URL slug (the last part of its zeffy.com/donation-form/... address). The key
 * (e.g. "beethoven") must equal the dog's `id` in urgent-dogs.jsx.
 *
 * WHAT ZEFFY ACTUALLY RETURNS (checked against the live API, Sept 2026 — the
 * third-party spec that circulates online names these fields wrongly):
 *   goal_amount  the goal, in CENTS          (500000 = $5,000)
 *   volume       amount raised, in CENTS
 *   url          https://www.zeffy.com/donation-form/<slug>
 *
 * Zeffy's rate limit is 100 requests/minute across the WHOLE organization, so
 * the CDN cache header below matters: however much traffic the site gets,
 * Zeffy is asked about once every five minutes.
 */

const API = "https://api.zeffy.com/api/v1";

const CAMPAIGNS = {
  beethoven: { slug: "help-save-beethoven", id: "8fe1bcdb-bb3e-477a-8148-fdca4edda2ce" },
  mickey:    { slug: "helpsave-mickey",     id: "e6433ee0-d7de-46ce-b2c1-a60283dce753" },
};

/* Zeffy's list endpoint ignores a `cursor` query param and hands back page one
   again (it returned the same 10 campaigns ten times in testing). So: collect
   by id, pass Stripe-style `starting_after` in case it IS honoured, and stop
   as soon as a page adds nothing new. At today's size that is two requests. */
async function fetchAllCampaigns(key) {
  const byId = new Map();
  let after = null;
  for (let page = 0; page < 5; page++) {
    const url = API + "/campaigns" + (after ? "?starting_after=" + encodeURIComponent(after) : "");
    const r = await fetch(url, { headers: { Authorization: "Bearer " + key, Accept: "application/json" } });
    if (!r.ok) {
      const body = await r.text().catch(() => "");
      throw new Error("Zeffy responded " + r.status + ": " + body.slice(0, 300));
    }
    const j = await r.json();
    const items = Array.isArray(j) ? j : (j.data || []);
    let added = 0;
    for (const c of items) if (c && c.id && !byId.has(c.id)) { byId.set(c.id, c); added++; }
    if (!added || j.has_more === false || !items.length) break;
    after = items[items.length - 1].id;
  }
  return [...byId.values()];
}

function cents(v) {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && isFinite(n) ? n : null;
}

module.exports = async (req, res) => {
  const key = process.env.ZEFFY_API_KEY;
  if (!key) {
    res.status(500).json({ error: "ZEFFY_API_KEY environment variable is not set." });
    return;
  }

  const debug = req.query && req.query.debug !== undefined && process.env.VERCEL_ENV !== "production";

  try {
    const all = await fetchAllCampaigns(key);

    if (debug) {
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ count: all.length, campaigns: all });
      return;
    }

    const campaigns = {};
    for (const [dogId, spec] of Object.entries(CAMPAIGNS)) {
      const found = all.find(c => c.id === spec.id)
        || all.find(c => typeof c.url === "string" && c.url.replace(/\/+$/, "").endsWith("/" + spec.slug));
      if (!found) continue;
      const raised = cents(found.volume);
      const goal = cents(found.goal_amount != null ? found.goal_amount : found.target);
      if (raised == null) continue;
      campaigns[dogId] = {
        raised: Math.round(raised / 100),
        goal: goal == null ? null : Math.round(goal / 100),
      };
    }

    // CDN serves this for 5 min, then a stale copy for 10 more while it
    // refreshes — Zeffy is hit rarely and the page never waits on it.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ campaigns });
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ error: "Could not reach the Zeffy API.", detail: String((err && err.message) || err) });
  }
};
