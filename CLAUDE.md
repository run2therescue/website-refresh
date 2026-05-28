# Run 2 The Rescue — Website

Developer / context guide for the Run 2 The Rescue (R2R) site. R2R is a 501(c)(3)
nonprofit (EIN 99-4240461) rescuing dogs from the East Asia meat trade, funding
medical care, and rehoming survivors.

- **Production / preview URL:** https://run2-rescuedemo.vercel.app
- **Repo root = this `site/` folder** (the git repo lives here, not a parent dir).

---

## Architecture — read this first

This is a **static site with no build step**. React runs **in the browser** via
Babel-standalone. There is no webpack/vite, no `node_modules`, no `npm run build`.

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

**Standalone pages** each load `shared.jsx` (Nav, Footer, shared hooks) plus
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

---

## Local development

It's static — serve the folder with anything:

```bash
cd site
python3 -m http.server 8000      # then open http://localhost:8000
```

Caveat: `/api/animals` (the Shelterluv proxy, see below) is a Vercel
serverless function and will **not** run under a plain static server — the
Adopt/Sponsor/Survivors sections will show their graceful "couldn't load"
state. To run the function locally, use `npx vercel dev` instead.

Before deploying, syntax-check any `.jsx` you changed:

```bash
npx @babel/parser  # or: node -e "require('@babel/parser').parse(require('fs').readFileSync('FILE.jsx','utf8'),{sourceType:'script',plugins:['jsx']})"
```

---

## Deployment

Hosted on **Vercel**, connected to this GitHub repo. **Push to `main` → Vercel
auto-deploys** (`.github/workflows/deploy.yml` runs `vercel build` +
`vercel deploy --prebuilt --prod`).

- Vercel project: `website-refresh` (team `run2-rescue-s-projects`).
- Root Directory: **blank** (the repo root IS the deployable site).
- Framework preset: **Other** (static). No build command.
- `vercel build` automatically picks up the `api/` folder as serverless functions.

`vercel.json` defines: clean-URL rewrites (`/adopt` → `/Adopt.html`, etc.),
no-cache headers for static files, and security headers. The `/api/` path is
excluded from the no-cache rule so the function controls its own caching.

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

### "Share Your Story" submissions

The homepage Testimonials section has a `ShareStoryModal` (in `sections.jsx`)
for adopters to submit a testimonial (with a required consent checkbox). It
posts to **Web3Forms**. **It is not live until a key is added:** set
`STORY_FORM_ACCESS_KEY` in `sections.jsx` to a Web3Forms access key
(free, from web3forms.com). Until then the form shows a thank-you without
sending.

### Other forms

Contact, the adoption application, and the newsletter signup are currently
**front-end demos** — they show a confirmation but do not deliver anywhere.
Wiring them to Web3Forms (one access key per destination inbox) is the
intended next step.

---

## Security

The site sends a full set of hardened response headers via `vercel.json`
(applied at the edge, every request):

- **Content-Security-Policy** restricts script/style/image/font/connect/frame sources
  to a tight allowlist (self, unpkg, Google Fonts, Shelterluv photo S3, Unsplash,
  YouTube thumbs, Web3Forms). `frame-ancestors 'none'` blocks anyone iframing the site.
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
vars. `.env*` is gitignored. The Web3Forms key (when set) is intentionally
client-side — it's a routing token, not a credential, and is paired with
Web3Forms' spam/abuse filtering on their end.

---

## Environment variables (set in Vercel → Project Settings)

| Variable             | Used by          | Notes                                  |
|----------------------|------------------|----------------------------------------|
| `SHELTERLUV_API_KEY` | `api/animals.js` | Secret. Scope to the `website-refresh` project. |

`.env*` files are git-ignored — never commit secrets.

---

## Conventions & gotchas

- **Don't hardcode dog data** — it comes from Shelterluv. **Don't embed payment
  forms** — donations are link-outs.
- **No em-dashes** in visible copy. Use commas, periods, or "and". (Compound-word
  hyphens are fine.)
- Bump `?v=N` cache strings when editing shared `.jsx`/`.css` (see above).
- Syntax-check `.jsx` before deploying — a Babel error blanks the whole page.
- `feedback.js` adds a floating "Send feedback" button on every page (copy-to-
  clipboard, no backend) — a prototype review tool.
- The homepage has a hidden "Tweaks" dev panel (`interactions.jsx`) toggled via
  postMessage — internal, ignore.

## Brand voice (quick reference)

Hopeful, dignified, urgent, never exploitative. Transformation language: trauma
to trust, fear to faith, forgotten to forever. Lead with hope, avoid graphic
cruelty. Reader is a co-rescuer, not a savior — CTAs are doors, not asks
("Meet the survivors", "Bring one home"), never "Please help us". Keep phrases:
"hopeful survivors", "second chance", "beacon of hope". Tagline:
RUN. RESCUE. REPEAT. Anchor quote: "Run to the rescue with love, and peace will
follow." (River Phoenix).
