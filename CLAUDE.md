# Run 2 The Rescue — Website

> **Non-technical teammate?** Start with [TEAM_GUIDE.md](TEAM_GUIDE.md) — a plain-English
> walkthrough of how to edit a page from GitHub.com's web UI, preview changes, and ship safely.

Developer / context guide for the Run 2 The Rescue (R2R) site. R2R is a 501(c)(3)
nonprofit (EIN 99-4240461) rescuing dogs from the East Asia meat trade, funding
medical care, and rehoming survivors.

- **Repo root = this folder** (the git repo lives here, not a parent dir).

---

## Quick reference — every URL, key, and inbox

**The site**
- Preview / staging (current public-facing): https://run2-rescuedemo.vercel.app
- Live (still the old WordPress site, will be cut over later): https://run2therescue.org

**Code & deploy**
- GitHub repo: https://github.com/run2therescue/website-refresh
- GitHub org: https://github.com/run2therescue
- Vercel project: https://vercel.com/run2-rescue-s-projects/website-refresh
- Vercel team: https://vercel.com/run2-rescue-s-projects
- Deploy workflow: `.github/workflows/deploy.yml` (runs `vercel build` then `vercel deploy --prebuilt --prod` on every push to `main`)

**Forms (Web3Forms)**
- Dashboard: https://app.web3forms.com
- Account login: `webmaster@run2therescue.org`
- All form submissions are routed to **`info@run2therescue.org`** (configured
  as the recipient in the Web3Forms form settings — see "Web3Forms recipient
  configuration" below)
- Access key lives in `shared.jsx` as `WEB3FORMS_KEY` (intentionally client-side; see Security)
- Helper: `submitForm(fields, formName)` exposed on `window` from `shared.jsx`

**Donations**
- Zeffy general: https://www.zeffy.com/en-US/donation-form/provide-food-and-medical
- Zeffy transport: https://www.zeffy.com/en-US/donation-form/help-bring-them-home
- Zeffy sponsorship: https://www.zeffy.com/en-US/donation-form/help-the-abandoned-dogs-come-home
- PayPal: https://www.paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6
- Venmo: https://venmo.com/u/Run2TheRescue

**Live data**
- Shelterluv (animal data source): https://www.shelterluv.com
- Proxy endpoint on the site: `/api/animals` (debug: `/api/animals?debug=1`)
- Secret key: `SHELTERLUV_API_KEY` in Vercel project env vars (never in repo)

**Social (footer icons in `shared.jsx → FooterS`)**
- Facebook: https://www.facebook.com/people/Run-2-The-Rescue/61564710401329/
- Instagram: https://www.instagram.com/run2therescue
- TikTok: https://www.tiktok.com/@_run2therescue_
- YouTube: https://www.youtube.com/@R2TRDogs

**Inboxes**
- Public-facing contact: `info@run2therescue.org` (receives all site form submissions)
- Tech / webmaster: `webmaster@run2therescue.org` (Web3Forms account owner, Vercel/GitHub admin)
- Old `.com` addresses are typos and have been purged from the codebase

---

## Architecture — read this first

This is a **static site with no build step**. React runs **in the browser** via
Babel-standalone. There is no webpack/vite, no `node_modules`, no `npm run build`.
(The one exception is a deploy-time **pre-render** pass — see Deployment →
Pre-rendering — that bakes rendered HTML into each page for crawlers. It runs only
in CI and never changes how you author pages.)

Each HTML page loads React + ReactDOM + Babel from a CDN, then a series of
`<script type="text/babel" src="...jsx">` files. **Babel compiles each `.jsx`
file separately in the browser at page load.**

### How `.jsx` files share code

Because each script is compiled separately, components are shared two ways:
1. **Top-level `const`/`function`** in an earlier-loaded script is visible to
   later scripts (shared global lexical scope).
2. Every `.jsx` file ends with `Object.assign(window, { ... })` to explicitly
   export its components.

**When you add a component that another file needs, add it to that file's
`Object.assign(window, {...})`.**

### File map

**Homepage (`index.html`)** loads, in order:
`components.jsx` → `help-illustrations.jsx` → `sections.jsx` →
`interactions.jsx` → `enhancements.jsx`

**Standalone pages** each load `shared.jsx` (Nav, Footer, shared hooks, `submitForm`) plus
their own `*.jsx` and `*.css`:

| Page          | JSX                              | CSS           |
|---------------|----------------------------------|---------------|
| Adopt.html    | shared, dog-illustration, adopt  | adopt.css     |
| Foster.html   | shared, foster                   | foster.css    |
| Sponsor.html  | shared, sponsor                  | foster, sponsor.css |
| Donate.html   | shared, donate                   | donate.css    |
| News.html     | shared, news                     | news.css      |
| Contact.html  | shared, contact                  | foster, contact.css |
| Reality.html  | shared, reality                  | —             |
| Privacy.html  | shared, privacy                  | —             |
| Merch.html    | shared (inline component)        | —             |

`styles.css` is the global stylesheet loaded by **every** page. Per-page CSS
files layer on top.

### Cache-busting convention

Script and CSS references in the HTML carry a `?v=N` query string
(e.g. `styles.css?v=11`, `sections.jsx?v=7`). **When you edit a `.jsx` or
`.css` file, bump its `?v=` in every HTML file that loads it.** `vercel.json`
also sets `must-revalidate`, but bumping `?v=` guarantees no stale cache.

**Assets are cached for a year.** `vercel.json` gives `/assets/*` a
`max-age=31536000, immutable` header (images and videos are heavy; repeat
visits should not re-download them). So **never replace an asset file in
place** — if an image changes, either rename the file or bump a `?v=` query
string everywhere it's referenced (e.g. `honey-before-rescue.jpg?v=2`).

### Internal links use clean URLs

Nav, footer, and in-page links point to the clean paths (`/adopt`, `/donate`,
`/`), which `vercel.json` rewrites to the `.html` files. Caveat: under a plain
`python3 -m http.server` those paths 404 — use `npx vercel dev` when you need
to click through pages locally, or open the `.html` files directly.

---

## Local development

It's static — serve the folder with anything:

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

Caveat: `/api/animals` (the Shelterluv proxy, see below) is a Vercel
serverless function and will **not** run under a plain static server — the
Adopt/Sponsor/Survivors sections will show their graceful "couldn't load"
state. To run the function locally, use `npx vercel dev` instead.

Before deploying, syntax-check any `.jsx` you changed:

```bash
node -e "require('@babel/parser').parse(require('fs').readFileSync('FILE.jsx','utf8'),{sourceType:'script',plugins:['jsx']})"
```

(`@babel/parser` is the only dev dependency you'd need — install ad-hoc with
`npm i @babel/parser` in a throwaway dir.)

---

## Deployment

Hosted on **Vercel**, connected to the GitHub repo. **Push to `main` → Vercel
auto-deploys** via `.github/workflows/deploy.yml` (runs `vercel build` +
`vercel deploy --prebuilt --prod`).

- GitHub repo: https://github.com/run2therescue/website-refresh
- Vercel dashboard: https://vercel.com/run2-rescue-s-projects/website-refresh
- Vercel project: `website-refresh` (team `run2-rescue-s-projects`).
- Root Directory: **blank** (the repo root IS the deployable site).
- Framework preset: **Other** (static). No build command.
- `vercel build` automatically picks up the `api/` folder as serverless functions.

`vercel.json` defines: clean-URL rewrites (`/adopt` → `/Adopt.html`, etc.),
no-cache headers for static files, and security headers. The `/api/` path is
excluded from the no-cache rule so the function controls its own caching.

### Pre-rendering (crawler / AI-answer visibility)

The site authors as no-build React-in-browser, but JS-less crawlers (ChatGPT,
Claude, Perplexity, and Google's fast first pass) would otherwise fetch an empty
`<div id="root">` and see no content. To fix that, the GitHub Action runs a
**snapshot pre-render step before `vercel build`**:

1. `scripts/prerender.mjs` (Node + Puppeteer) serves the checkout locally, loads
   each `*.html` page in headless Chrome, waits for React to finish, and **bakes
   the rendered HTML back into that page's `<div id="root">`** (wrapped in
   `<!--prerender:start-->` … `<!--prerender:end-->`, with `data-prerendered="1"`).
2. This happens on the **ephemeral CI checkout only** — committed source keeps the
   empty `#root`, so the no-build authoring model is unchanged. Don't commit baked
   HTML.
3. On load, the client React still mounts via `createRoot().render()` and replaces
   `#root` with the live tree (interactivity intact). Crawlers and no-JS visitors
   read the baked snapshot.

Tradeoff: **live Shelterluv dog lists are NOT in the snapshot** (the `/api`
proxy isn't running during prerender) — the client fetches them live on load.
All static narrative (mission, founders, EIN, transformation stories, press,
testimonials) IS captured, which is what AI answers need.

`scripts/`, `node_modules/`, `.github/`, `docs/`, and `*.md` are excluded from the
deployed output via `.vercelignore` — build tooling never ships to the edge.

To run the prerender locally (needs an x86-64 host or arm64 Chrome):
`cd scripts && npm install && cd .. && node scripts/prerender.mjs --root .`
(run on a throwaway copy — it rewrites the HTML files in place).

---

## Integrations

### Shelterluv (live dog data)

All adoptable-dog data is **live from Shelterluv** — never hardcode dog arrays.

- `api/animals.js` — a Vercel serverless function that proxies the Shelterluv
  API server-side (the API key is secret and Shelterluv blocks browser CORS).
  Deploys to `/api/animals`. Add `?debug=1` to see the raw Shelterluv payload.
- The key lives in the **`SHELTERLUV_API_KEY`** environment variable in Vercel
  (never in the repo).
- The frontend fetches via shared hooks: `useAnimalsS` (in `shared.jsx`, used by
  Adopt + Sponsor) and `useAnimals` (in `components.jsx`, used by the homepage
  Survivors section). Both dedupe to one fetch per page.
- Adopted dogs are filtered out via the normalized `available` flag.
- New dogs, profile edits, and adoptions all flow through automatically.

### Donations & sponsorship — Zeffy + PayPal + Venmo

A **hybrid, link-out** model. No payment form is ever embedded; every "give"
action opens the provider in a new tab.

- **Zeffy** (fee-free, recommended) — hosted forms at
  `zeffy.com/en-US/donation-form/{slug}`. Slugs: `provide-food-and-medical`
  (general), `help-bring-them-home` (transport), `help-the-abandoned-dogs-come-home`
  (sponsorship).
- **PayPal** — `paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6`
- **Venmo** — `venmo.com/u/Run2TheRescue`

The "Donate" buttons open a method-chooser modal (`DonateModal` in
`interactions.jsx`); the Donate page has the same chooser as a section
(`donate.jsx`); the Sponsor page links out to the Zeffy sponsorship form.
Links are constants at the top of `interactions.jsx`, `donate.jsx`, `sponsor.jsx`.

Note: Zeffy has no API to pre-fill a donation amount, so the impact slider /
tier prices are framed as a pitch — the donor picks the amount on the provider.

### Forms — Web3Forms (single shared helper)

Every user-facing form on the site routes through one helper in `shared.jsx`:

```js
const WEB3FORMS_KEY = "f328982c-e9de-4611-8bf7-49034cfa2d21"; // single key
async function submitForm(fields, formName) { /* POSTs JSON to api.web3forms.com/submit */ }
Object.assign(window, { submitForm, WEB3FORMS_KEY });
```

Every form on the site calls `submitForm({...fields}, "<Form Name>")`.
Each submission lands at info@run2therescue.org with subject line `[R2TR Site] <Form Name>`,
making Gmail filtering trivial.

**Forms currently wired** (all live, all to info@run2therescue.org):

| Form                 | File           | formName passed              |
|----------------------|----------------|------------------------------|
| Contact              | `contact.jsx`  | `Contact`                    |
| Adoption application | `adopt.jsx`    | `Adoption Application`       |
| Foster application   | `foster.jsx`   | `Foster Application`         |
| Newsletter (homepage)| `sections.jsx` (`FinalCTA`) | `Newsletter`    |
| Newsletter (news)    | `news.jsx`     | `Newsletter`                 |
| Share Your Story     | `sections.jsx` (`ShareStoryModal`) | `Share Your Story — <dog>` |

**Demo mode:** if `WEB3FORMS_KEY === "PASTE_KEY_HERE"`, `submitForm` short-circuits
and returns `{ ok: false, demo: true }`. Each form is written to show the same
graceful thank-you in demo mode, so the site never appears broken before a key
is set. Submissions in demo mode log to the console via `console.log("[submitForm] Demo mode...")`.

**Photo uploads (Share Your Story):** the Web3Forms JSON endpoint is text-only.
If a user attaches a photo, we send a `photo_attached` field noting the filename
and tell the team to follow up by email — we never silently drop the photo.

### Web3Forms recipient configuration (gotcha)

By default, Web3Forms emails the **account owner's address**
(`webmaster@run2therescue.org`). To deliver to `info@run2therescue.org` instead:

1. Web3Forms → **Linked Emails** → **Add Email** → `info@run2therescue.org`
2. Click the verification link sent to that inbox
3. Web3Forms → form **Settings** → **Email To** → `info@run2therescue.org`
4. Optional: set **Reply-To** → `{{email}}` so Gmail's Reply hits the submitter, not Web3Forms

The custom subject (`[R2TR Site] <formName>`) is set in `submitForm` itself —
no need to configure it in Web3Forms.

---

## Security

The site sends a full set of hardened response headers via `vercel.json`
(applied at the edge, every request):

- **Content-Security-Policy** restricts script/style/image/font/connect/frame sources
  to a tight allowlist (self, unpkg, Google Fonts, Shelterluv photo S3, Unsplash,
  YouTube thumbs, Web3Forms — `api.web3forms.com` in both `connect-src` and
  `form-action`). `frame-ancestors 'none'` blocks anyone iframing the site.
- **Strict-Transport-Security** with 2-year max-age + `includeSubDomains` + `preload`.
- **X-Frame-Options: DENY**, **X-Content-Type-Options: nosniff**,
  **Referrer-Policy: strict-origin-when-cross-origin**, **Cross-Origin-Opener-Policy: same-origin**.
- **Permissions-Policy** disables camera, microphone, geolocation, payment,
  USB, motion sensors, and Google's FLoC interest-cohort.

**One unavoidable CSP relaxation:** `script-src` must include `'unsafe-eval'`
because the site uses Babel-standalone to compile JSX in the browser. If you
ever move to a build step (Vite, Next.js, esbuild), drop `'unsafe-eval'` from
the CSP — that's the only payoff of leaving the no-build architecture.

**Embeds:** YouTube iframes use `youtube-nocookie.com` to avoid setting
tracking cookies before the user clicks play. The `api/animals.js` proxy
validates Shelterluv-supplied video URLs against the YouTube embed pattern
before passing them through (defense in depth against malicious upstream data).

**External links:** every `target="_blank"` carries `rel="noopener noreferrer"`
to block reverse-tabnabbing and avoid leaking the referrer to providers
(Zeffy, PayPal, Venmo, press outlets, social profiles).

**Secrets:** the only server-side secret is `SHELTERLUV_API_KEY` in Vercel env
vars. `.env*` is gitignored. The **Web3Forms key is intentionally committed**
to the repo — it's a public/client-side routing token, not a credential, and
is paired with Web3Forms' server-side spam/abuse filtering. Worst case if it
leaks: an attacker can spam our inbox, which Web3Forms throttles. There is
no rotation cost beyond pasting a new key.

---

## Environment variables (set in Vercel → Project Settings)

| Variable             | Used by          | Notes                                  |
|----------------------|------------------|----------------------------------------|
| `SHELTERLUV_API_KEY` | `api/animals.js` | Secret. Scope to the `website-refresh` project. |

`.env*` files are git-ignored — never commit secrets. (The Web3Forms key
*is* committed, intentionally — see Security.)

---

## Conventions & gotchas

- **Don't hardcode dog data** — it comes from Shelterluv. **Don't embed payment
  forms** — donations are link-outs.
- **No em-dashes** in visible copy. Use commas, periods, or "and". (Compound-word
  hyphens are fine.)
- **All forms** use `submitForm` from `shared.jsx`. New forms should follow the
  same pattern — never call `fetch("https://api.web3forms.com/...")` directly.
- Bump `?v=N` cache strings when editing shared `.jsx`/`.css` (see above).
- Syntax-check `.jsx` before deploying — a Babel error blanks the whole page.
- The homepage has a hidden "Tweaks" dev panel (`interactions.jsx`) toggled via
  postMessage — internal, ignore. It is skipped during the CI prerender
  (`navigator.webdriver` check) so crawlers never see it.
- React is loaded as the **production** UMD builds with SRI hashes. If you ever
  bump the React version in the HTML files, regenerate both `integrity` hashes
  (`openssl dgst -sha384 -binary file | openssl base64 -A`).
- Count-up animations (`CountUp` / `CountUpS`) render their final value
  immediately when `navigator.webdriver` is true, so the prerendered snapshot
  shows real numbers instead of zeros. Keep that behavior for any new
  animated-content component.
- Every form renders a hidden `botcheck` honeypot (`Botcheck` on the homepage,
  `BotcheckS` on subpages); `submitForm` silently drops submissions where it is
  filled. Include it in any new form.
- **At domain cutover:** the `og:image` / `twitter:image` URLs in every HTML
  head currently point at `run2-rescuedemo.vercel.app` (the production domain
  still serves the old WordPress site). Switch them to `run2therescue.org`
  when the domain moves.

## Brand voice (quick reference)

Hopeful, dignified, urgent, never exploitative. Transformation language: trauma
to trust, fear to faith, forgotten to forever. Lead with hope, avoid graphic
cruelty. Reader is a co-rescuer, not a savior — CTAs are doors, not asks
("Meet the survivors", "Bring one home"), never "Please help us". Keep phrases:
"hopeful survivors", "second chance", "beacon of hope". Tagline:
RUN. RESCUE. REPEAT. Anchor quote: "Run to the rescue with love, and peace will
follow." (River Phoenix).

Deeper brand reference (do not mass-edit without team review):
- `docs/BRAND_PLAYBOOK.md` — full voice/tone playbook
- `docs/RUN_2_THE_RESCUE_BRAND_PLAYBOOK.pdf` — PDF for stakeholders
- `docs/PROJECT_BRIEF.md` — original site brief
- `docs/IMAGE_PLACEMENT_PROPOSAL.md` / `docs/IMAGE_AUDIT.md` — imagery reference

## Related docs

- [TEAM_GUIDE.md](TEAM_GUIDE.md) — for non-technical teammates editing via the GitHub web UI
- [HANDOFF.md](HANDOFF.md) — access ownership and account migration runbook
- [DEPLOY.md](DEPLOY.md) — deployment-specific notes
