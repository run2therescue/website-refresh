# Run 2 The Rescue — Website Handoff & Context

> **Purpose of this file:** paste/share this with a new Claude (or developer) so they can pick up
> the R2R website refresh with full context. It captures architecture, deploy flow, current state,
> conventions, and every open item. For deep technical detail, also read `CLAUDE.md` (dev guide) in
> this same folder. Last updated: 2026-06-11.

---

## 1. What this is

**Run 2 The Rescue (R2R / R2TR)** is a 501(c)(3) nonprofit (EIN **99-4240461**) that rescues dogs from
the **dog meat trade in China**, funds medical care + rehabilitation, and rehomes survivors in the US.
Founders: **Brandy Cherven (CEO)**, **Bonnie Klapper (COO)**. Founded **2024**.

This repo is the **refreshed website** that will replace the current WordPress site.

- **Live preview:** https://run2-rescuedemo.vercel.app  (production target: run2therescue.org)
- **Repo:** `run2therescue/website-refresh` — **the git root is the `site/` folder** (this folder).
- **Local source of truth:** `…/Documents/Claude/Projects/Run2Rescue Website Refresh/site/` on Aman's Mac.

---

## 2. Architecture (read first)

**Static site, NO build step.** React 18 + Babel-standalone run **in the browser** via CDN (unpkg).
Each HTML page loads React/ReactDOM/Babel, then a series of `<script type="text/babel" src="*.jsx">`
files that Babel compiles client-side. No webpack/vite, no `node_modules`, no `npm run build`.

**How `.jsx` files share code:** each compiles separately but shares one global lexical scope
(top-level `const`/`function` in an earlier-loaded file is visible to later ones). Files also do
`Object.assign(window, {…})` to export components explicitly. **If you add a component another file
needs, add it to that file's `Object.assign`.**

**The one exception to "no build":** a **deploy-time pre-render** pass (see §4) that bakes rendered
HTML into each page so crawlers/AI see content. It runs only in CI and never changes how you author.

### Page → files map

- **Homepage (`index.html`)** loads: `components.jsx` → `help-illustrations.jsx` → `sections.jsx`
  → `interactions.jsx` → `enhancements.jsx`. (It does **NOT** load `shared.jsx`.)
- **Subpages** each load `shared.jsx` (NavS, FooterS, useAnimalsS, ImgS, submitForm, DifferentDogsS…)
  plus their own `*.jsx`/`*.css`:

| Page | JSX | CSS |
|---|---|---|
| Adopt.html | shared, dog-illustration, adopt | adopt.css |
| Sponsor.html | shared, sponsor | foster.css, sponsor.css |
| Foster.html | shared, foster | foster.css |
| Donate.html | shared, donate | donate.css |
| News.html | shared, news | news.css |
| Contact.html | shared, contact | foster.css, contact.css |
| Reality.html | shared, reality | — |
| Privacy.html | shared, privacy | — |
| Merch.html | shared (inline component) | — |

`styles.css` is global on every page.

### Cache-busting convention (IMPORTANT)

Script/CSS refs carry `?v=N`. **When you edit a `.jsx`/`.css`, bump its `?v=` in every HTML file that
loads it.** Forgetting this serves stale code to returning visitors. Current versions (2026-06-11):

- `styles.css?v=13` (all pages) · `components.jsx?v=9` · `sections.jsx?v=24` · `help-illustrations.jsx?v=4`
  · `interactions.jsx?v=6` · `enhancements.jsx?v=6` (homepage)
- `shared.jsx?v=11` (all subpages) · `adopt.jsx?v=9` + `adopt.css?v=4` · `sponsor.jsx?v=11` + `sponsor.css?v=6`
  · `foster.jsx?v=5` + `foster.css?v=1` · `donate.jsx?v=7` + `donate.css?v=2` · `news.jsx?v=5` + `news.css?v=2`
  · `contact.jsx?v=4` + `contact.css?v=4` · `reality.jsx?v=3` · `dog-illustration.jsx` (no version)

---

## 3. Deploy pipeline

Push to `main` → **GitHub Action** (`.github/workflows/deploy.yml`) runs: pre-render → `vercel build`
→ `vercel deploy --prebuilt --prod` into the **org's Vercel team `run2-rescue-s-projects`** (project
`website-refresh`) and **aliases `run2-rescuedemo.vercel.app`**. Typical run ~60s.

**Gotchas:**
- **Push from Aman's Mac.** The sandbox can't authenticate to GitHub. Standard flow:
  `git add -A && git commit -m "…" && git push`. If push is rejected ("fetch first"):
  `git pull --rebase origin main` then `git push`. If a sandbox `git` call left a stale lock:
  `rm -f .git/index.lock .git/HEAD.lock` before committing.
- The **Vercel MCP connector is authed to Aman's personal team**, which has a STALE old
  `run2-rescuedemo` project. Don't trust it. Verify deploys via the GitHub Actions run, or
  `curl -s "https://run2-rescuedemo.vercel.app/?cb=$(date +%s)" | grep -c prerender:start` (should be 1).
- **"Site not updating"** after a confirmed deploy is almost always browser cache → hard refresh.

---

## 4. Pre-rendering (crawler / AI visibility)

Every page ships an empty `<div id="root">` and builds content in-browser, so JS-less crawlers
(ChatGPT, Claude, Perplexity) and Google's fast pass would see nothing. Fix: **snapshot pre-render**.

`scripts/prerender.mjs` (Node + Puppeteer) runs in CI **before `vercel build`**: serves the checkout,
loads each `*.html` in headless Chrome, waits for React, and **bakes the rendered HTML into that page's
`<div id="root">`** (wrapped in `<!--prerender:start-->`/`<!--prerender:end-->`). This happens on the
**ephemeral CI checkout only** — committed source keeps the empty `#root`; do NOT commit baked HTML.
On load the client React re-mounts and replaces `#root` (interactivity intact). `robots.txt` welcomes
AI crawlers; `llms.txt` exists.

Tradeoff: **live Shelterluv dog lists are NOT in the snapshot** (the `/api` proxy isn't running during
prerender) — the client fetches them live; all static narrative IS baked.
`scripts/`, `node_modules/`, `.github/`, `docs/`, `*.md` are excluded from the deploy via `.vercelignore`.

**Note:** Puppeteer ships x86-64 Chromium; a local arm64 mac/sandbox can't run the prerender locally —
it only truly executes in CI (x86 ubuntu). Don't be alarmed if a local run fails to launch Chrome.

---

## 5. Integrations

### Shelterluv (live dog data) — `api/animals.js`
Vercel serverless proxy (the API key is secret + Shelterluv blocks browser CORS). The browser hits
same-origin `/api/animals`; the key is `SHELTERLUV_API_KEY` in Vercel env. CDN-cached
(s-maxage 300, swr 600). `?debug=1` returns the raw payload for field inspection.
**Never hardcode dog arrays.** Frontend hooks: `useAnimalsS` (shared.jsx, Adopt/Sponsor),
`useAnimals` (components.jsx, homepage Survivors). Adopted dogs filtered out via `available` flag.

Normalized fields the UI uses include: `id, name, breed, sex, size, weightLb, ageMonths, ageGroup,
status, available, cover, photos, videos, blurb, goodWith, daysInCare, location` **plus (added
2026-06-11): `ageText` (precise age from DOB), `altered` (spay/neuter, hidden when Unknown),
`inFoster`, `color`, `pattern`** — these show on the Adopt profile modal stats grid when present.

### Donations / sponsorship — Zeffy + PayPal + Venmo (link-out only, no embedded forms)
- **Zeffy** (fee-free): `zeffy.com/en-US/donation-form/{slug}` — slugs `provide-food-and-medical`,
  `help-bring-them-home`, `help-the-abandoned-dogs-come-home` (sponsorship). Zeffy `?amount=` pre-fills;
  `?frequency=monthly` and `?utm_content=` are IGNORED/STRIPPED (so no automatic per-dog attribution
  until R2R adds a "Which survivor?" field to the Zeffy form — see `DOG_FIELD_KEY` in sponsor.jsx).
- **PayPal**: `paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6` · **Venmo**: `venmo.com/u/Run2TheRescue`
- Donate buttons open a method-chooser modal. Donate page has a DAF panel (legal name
  "Run to the Rescue", no "2"). Links are constants atop `interactions.jsx`, `donate.jsx`, `sponsor.jsx`.

### Forms — Web3Forms
All forms (Contact, Foster, adoption application, newsletter) POST to **Web3Forms** via the shared
`submitForm(fields, formName)` helper. Key **`f328982c-e9de-4611-8bf7-49034cfa2d21`** → emails
**info@run2therescue.org**. **The key + helper exist in BOTH `shared.jsx` (subpages) and `components.jsx`
(homepage, added 2026-06-11 because the homepage doesn't load shared.jsx). Keep the key in sync.**
⚠️ Web3Forms just emails an inbox — it is NOT a managed subscriber list (see open item §8).
The homepage Testimonials "Share Your Story" form also uses Web3Forms.

---

## 6. Current website state (what's live as of this handoff)

**Global copy rules applied site-wide:** "dog meat trade" (not "meat trade"); "rescue/rescued"
(not "pull/pulled"); Korea removed from **operational** references and `areaServed` schema
(now `["China","United States"]`); founding year **2024** everywhere; **no em-dashes** in visible copy;
"slaughter pens/sites" wording appears **only on the Reality page** (it's gated behind a content
warning — the brand guide softens that word elsewhere).

**Homepage (`index.html`):**
- Hero headline "Heal with **Love.**" — the word "Love." **animates from a purple heart on load**
  (`LoveReveal` in components.jsx; respects reduced-motion; "Love." stays in DOM for SEO).
- Hero CTAs reordered: **"Meet Our Survivors" leads, "Donate Now" secondary** (work before the ask).
- **LiveTicker** restored with **placeholder** on-brand lines (no fabricated events) — needs real stats.
- Stats row: `1,200+ Dogs rescued`, `800+ Forever homes`, `2 Years on the ground`. ⚠️ **1,200 & 800 are
  flagged WRONG by R2R, pending real numbers.** The "Countries · CN·KR" stat was removed.
- Scale-of-the-problem stat still shows **"1M+ in South Korea annually"** (sections.jsx ~line 128) —
  pending keep/cut decision (Reality intro's Korea ref was already cut).
- **Team section** (see §7). **YouTube icon** (@R2TRDogs) now in the footer (was missing on homepage).
- Mission: "every dog rescued from the dog meat trade…"

**Adopt + Sponsor:** a compact **"Different Dogs"** strip sits at the top, under the hero (see §7).
Adopt profile modal now scrolls properly for tall dogs (was clipping the Apply button) and shows the
new Shelterluv fields. Perf: `preconnect` to Shelterluv image host + `preload` of `/api/animals` in
the `<head>`; Different Dogs photos load eager/high-priority.

**Reality page:** copy reworked per R2R (slaughter language, dropped Korea from intro, wordsmithed the
"Slaughter pens crowd dozens…" blurb to "…This is the brutal reality we face. Now it's a race to bring
them all to safety.", trimmed trailing sentences, added poodles/Pomeranians, dropped "family").

**Contact page:** removed the "Email us info@…" card; the "Reach out" blurb is centered next to the
form; the "Reach out" label is bigger/bolder/purple.

**News page:** Kronk People-Magazine excerpt updated to mention founder Brandy Cherven.

---

## 7. Team section + Different Dogs (the two most-iterated features)

### Team ("The team behind the mission" — `Team` + `TeamCard` in sections.jsx)
Two tiers (deliberate — the content lengths are too uneven for one equal row):
- **Founders row:** Brandy Cherven (CEO, Co-Founder) + Bonnie Klapper (COO, Co-Founder), **larger
  cards, 4:3 photos** (`Brandy_profile.jpg`, `Bonnie_profile.jpg`). Both bios are **first person**.
- **Team row** (uniform, equal height): **Greg Carrico** (Foster Dad & Volunteer, `Greg_profile.jpg`,
  full witty bio), **Kirk** (Tech Wizard — **placeholder**, "Photo coming soon" / "Bio coming soon"),
  **Aman Garg** (Tech and AI Lead, `Aman_profile.JPG`, bio). The team grid adapts to the member count.
- **Meg was removed.** Tag pills use `alignSelf:flex-start` (they previously stretched full-width — fixed).

### Different Dogs (`DifferentDogsS` in shared.jsx)
Compact strip on **Adopt + Sponsor** (was on the homepage; moved off). "Different isn't bad. It's just
different." Four cards: **Twitch** + **Sweet Pea** (live from Shelterluv by name — real photo/breed/age,
"Looking" badge, **clickable**) then **Kronk** + **Honey** (alumni, static photos, "Forever home ♥",
**not clickable**). Clicking a looking card dispatches a `window` `r2r-open-dog` CustomEvent; Adopt
listens → opens that dog's profile modal, Sponsor listens → opens the sponsor confirm. Twitch's photo
is zoomed `1.12` to crop a green border baked into his Shelterluv image.
**Note:** an older homepage `DifferentDogs` component still exists in `sections.jsx` but is **unused
dead code** (safe to delete later).

---

## 8. OPEN ITEMS / TODO (pick up here)

1. **Real stats numbers** — homepage `1,200+ dogs` & `800+ forever homes`, Adopt `800+ adopted`, and
   the Foster page stats are all **flagged inaccurate by R2R**. Awaiting real figures from Brandy.
   The LiveTicker also needs real stats/updates (currently brand-line placeholders).
2. **Korea in awareness stats** — keep or cut "1M+ in South Korea annually" (homepage) and any
   remaining scale-of-the-trade Korea mentions. (Operational Korea refs already removed.)
3. **Kirk** — needs a photo + bio (currently the only placeholder team card).
4. **Newsletter list** — signups currently only email info@run2therescue.org via Web3Forms (an inbox,
   not a sendable list). **Recommend wiring to a real provider** (MailerLite / Brevo / Mailchimp free
   tier, or check Zeffy's email suite) so there's an actual subscriber list. One-endpoint POST swap.
5. **Image perf (bigger win)** — Shelterluv serves full-res originals (1–3 MB) shown small. Wire
   **Vercel Image Optimization** (`images` config in `vercel.json` + route URLs through `/_vercel/image`)
   for right-sized WebP. Check the org's Vercel image-optimization quota first.
6. **Shelterluv AI Bio Writer** — Aman is deciding whether R2R should enable it (email
   help@shelterluv.com). It populates the `Description` field, which already flows onto the site; could
   surface "Bio Descriptors" as tags if Shelterluv exposes them as a field (verify via `?debug=1`).
7. **Cleanup** — delete the unused homepage `DifferentDogs` component in `sections.jsx`.
8. **Web3Forms key is duplicated** in `shared.jsx` + `components.jsx` — keep in sync (or refactor into
   one shared file loaded by all pages).
9. **Accessibility** — do a WCAG 2.1 AA pass on our own site (Shelterluv recently made *their* iframes
   compliant; ours is separate).

---

## 9. Conventions & gotchas (quick reference)

- **Bump `?v=N`** on every HTML that loads a changed `.jsx`/`.css`. Syntax-check `.jsx` before deploy
  (a Babel error blanks the whole page).
- **Don't hardcode dog data** (Shelterluv) · **don't embed payment forms** (link-outs only).
- **No em-dashes** in visible copy (commas/periods/"and"; compound-word hyphens are fine).
- After deploy, verify with the prerender-marker curl (see §3), not the personal-team Vercel project.
- The homepage has a hidden dev "Tweaks" panel (postMessage-toggled) — internal, ignore.

## 10. Brand voice (quick reference)
Hopeful, dignified, urgent, never exploitative. Transformation language: trauma→trust, fear→faith,
forgotten→forever. Lead with hope; avoid graphic cruelty on public surfaces (Reality page is the
gated exception). Reader is a **co-rescuer, not a savior** — CTAs are doors, not asks ("Meet the
survivors", "Bring one home"), never "Please help us". Keep phrases: "hopeful survivors",
"second chance", "beacon of hope". Tagline: **RUN. RESCUE. REPEAT.** Anchor quote: "Run to the rescue
with love, and peace will follow." (River Phoenix). Trust signals to surface: EIN, founder bios,
People Magazine feature, on-the-ground partnerships in China.

---

## 11. Working method & tooling that worked (Cowork/Claude desktop session)

This refresh was done in **Claude's Cowork mode** with direct file access to the `site/` folder + a
sandboxed Linux shell. No formal "skills" were required — the work was hands-on engineering. What
worked well, and is worth repeating:

- **Edit `.jsx`/`.css`/`api/*.js` directly, then verify before deploy.** Two checks used every time:
  - **JSX syntax check** with `@babel/parser` (the site uses no build, so a Babel error blanks the
    page). Install once to `/tmp` (the `/sessions` disk is often full): `npm i @babel/parser` with
    `npm_config_cache=/tmp/...`, then
    `node -e "require('/tmp/.../@babel/parser').parse(fs.readFileSync('FILE.jsx','utf8'),{sourceType:'script',plugins:['jsx']})"`.
  - **CommonJS check** for the proxy: `node --check api/animals.js`.
- **Batch copy edits via a Python literal-replace script with per-change assertions** (each `old`
  string must appear exactly N times or it aborts). This safely applied ~30 wording changes at once
  without regex misfires. Far safer than blind `sed` for prose with apostrophes/curly quotes.
- **Verify a deploy** by curling the live URL for the prerender marker and for expected copy:
  `curl -s "https://run2-rescuedemo.vercel.app/?cb=$(date +%s)" | grep -c prerender:start` → 1.
- **Inspect Shelterluv fields** live with `curl -s ".../api/animals?debug=1"` → shows the raw record
  (this is how the new fields in §5 and the exact `Twitch`/`Sweet Pea` names were confirmed).
- **Deploys come from Aman's Mac** (the sandbox can't auth to GitHub) — Claude stages + validates, then
  hands over a `git add/commit/push` block. Watch for the "fetch first" rejection → rebase (see §3).
- **Screenshots drive the feedback loop.** Aman reviews the live site and sends annotated screenshots;
  iterate, push, repeat. Several rounds were spent on the Team layout and Different Dogs placement.

### Environment gotchas a new session should know
- The Cowork sandbox is **arm64**; Puppeteer's bundled Chromium is x86-64, so the **prerender can't be
  run locally** — it only executes in CI. Don't treat a local Chrome-launch failure as a real bug.
- The `/sessions` disk fills up; redirect npm/puppeteer caches to `/tmp` when installing tooling.
- Paths differ between the file tools and the bash sandbox (the mounted folder appears under
  `/sessions/<id>/mnt/Run2Rescue Website Refresh/site/`). Use the file tools (Read/Write/Edit) for
  edits; bash for grep/validate/git-status.
- A merge-conflict-marker bug once got committed into the HTML (`<<<<<<<`/`=======`/`>>>>>>>`) during a
  rebase — if "the page looks broken," grep the HTML for those markers first.

## 12. Relevant skills/plugins for future work (available, not yet used)

None were needed for the edits above, but a future session might reach for:
- **`frontend-design` / `design` / `frontend-design:accessibility-check`** — for the WCAG AA pass
  (open item §8.9) and any new UI/animation work.
- **`copy-guardian` / `brand-voice` / `marketing:brand-review`** — to enforce the copy rules in §6/§10
  (dog meat trade wording, no em-dashes, co-rescuer voice) when drafting new copy.
- **`mcp-registry` search + connectors** — to wire the newsletter to a real list provider
  (open item §8.4: MailerLite/Brevo/Mailchimp) or any future MCP-backed integration.
- **`schedule`** — could automate a recurring post-deploy check (e.g., daily curl of the prerender
  marker + a Shelterluv `?debug=1` field sanity check).
- The repo also has `docs/` with the Brand Playbook (PDF/PPTX) and project briefs (excluded from deploy
  via `.vercelignore`) — good source material for tone and imagery decisions.

### Useful commands cheat-sheet
```bash
# from the site/ folder
git add -A && git commit -m "…" && git push          # deploy (run on the Mac)
git pull --rebase origin main && git push             # if push rejected ("fetch first")
curl -s "https://run2-rescuedemo.vercel.app/?cb=$(date +%s)" | grep -c prerender:start   # verify deploy
curl -s "https://run2-rescuedemo.vercel.app/api/animals?debug=1"                          # inspect Shelterluv
```
