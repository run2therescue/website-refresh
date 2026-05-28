# Run2TheRescue — Project Brief

> Living document. Update as decisions land. Anything in here is context Claude should treat as known so it doesn't need to be re-explained.

---

## 1. Mission & Org

**Run2TheRescue (R2R)** is a 501(c)(3) nonprofit that rescues dogs and cats from the East Asia meat trade, funds their medical care, and rehomes survivors in the U.S.

- **EIN:** 99-4240461
- **Founders:** Brandy Cherven (CEO), Bonnie Klapper (COO)
- **POC for this refresh:** **Aman is the sole sign-off on design and content** (confirmed 2026-05-12). Brandy/Bonnie remain holders of Goodstack/EIN access and ShelterLuv admin, but day-to-day calls (copy, imagery, layout, tone) route through Aman without gating on the founders.
- **On-the-ground partners:** rescuer networks in China and South Korea.
- **Press:** Kronk feature in People Magazine (a trust signal to surface on the site).

---

## 2. Sites & Environments

| Surface | URL | Stack | Status |
|---|---|---|---|
| **Live site** | run2therescue.org | WordPress on Hustly host. ShelterLuv integration live. Plugins: Fluent Forms, Yoast SEO, UpdraftPlus, Popup Maker, Mega Menu, WPCode, Code Snippets. | Production. Donations, adoptions (ShelterLuv), forms all functional. |
| **Refresh demo** | run2-rescuedemo.vercel.app | Static prototype — 7 HTML pages with React 18 + Babel-standalone via CDN, shared JSX sections, vanilla-JS feedback widget. | Awaiting Brandy sign-off. Robots-disallowed. |
| **Prototype alias** | run2therescue-prototype.vercel.app | Same Vercel project (`run2therescue-prototype`, team `gargaman2310-2037s-projects`). | Same as above. |

**Domain registrar + DNS:** Hustly (single dashboard for hosting + DNS + cancellation).

**Local source of truth:** `/Users/amangarg2310/Documents/Claude/Projects/Run2Rescue Website Refresh/site/`. `.vercel/project.json` already linked — deploys are `vercel --prod` from that folder.

---

## 3. Platform Decision — Path B (Vercel-native) ✅

**Decided 2026-05-12:** Replace WordPress entirely. The demo becomes production, DNS flips from Hustly to Vercel, and every integration gets rebuilt on the modern stack.

### Honest cost picture

**Hosting:** essentially free.
- Vercel Hobby (free) covers a nonprofit site easily. Pro ($20/mo) if needed for team features or higher limits — still cheaper than Hustly + plugin licenses.
- Hustly subscription gets cancelled after a ~1-week insurance window post-cutover.

**Where the labor lives:** rebuilding what WordPress plugins do today.
- **Content editing.** WP gives Brandy and Bonnie an admin to edit pages. Static Vercel has none — need a headless CMS so they can update copy and publish news posts without a PR.
- **ShelterLuv adoptions.** Today a plugin renders listings on the live site. On Vercel we call the ShelterLuv API directly, render listings + detail pages, wire up the application form.
- **Donations.** Replace the current WP donation flow with a hosted payment provider.
- **Forms.** Replace Fluent Forms with a serverless function + transactional email.
- **SEO carry-over.** Yoast settings, sitemap, redirects — handled in code.
- **Backups.** Vercel deploys are immutable (front-end fine). CMS gets its own backup story.

**Recurring monthly cost target:** $0 within all free tiers. Realistic ceiling: $20–25/mo if Vercel Pro becomes necessary.

---

## 4. Voice & Tone

Hopeful, dignified, urgent, never exploitative. Lean on transformation language: **trauma → trust, fear → faith, forgotten → forever.** Warmth carries the heavy material. Front-load hope and resilience. Founder voice is activist-warm, not corporate.

**Phrases to preserve:** "hopeful survivors," "bravehearted survivors," "voiceless victims," "second chance," "beacon of hope."

**Tagline:** RUN. RESCUE. REPEAT.

**Anchor quote:** "Run to the rescue with love, and peace will follow." — River Phoenix.

**Retire or soften:** clinical cruelty language on public surfaces, the word "slaughterhouse" in filenames or visible copy, guilt-based asks, generic nonprofit corporate voice.

**Reader posture:** the viewer is a co-rescuer, not a savior. Every CTA is a door, not an ask. Use "Meet the survivors," "Bring one home," "Fund a flight." Avoid "Please help us," "We need your support."

**CTA priority stack:** 1) Adopt  2) Sponsor  3) Donate  4) Foster.

---

## 5. Aesthetic Guardrails

Photography is the hero. Real rescue dogs at eye level, soft natural light, never staged glossy. Type pairing: handwritten warm meets editorial serious. Color: warm earth tones with the existing red-orange as urgency accent. Generous whitespace around portraits so each dog reads as an individual, not a statistic.

---

## 6. Assets

### New imagery (to replace demo's stock photos)
**Source:** Dropbox folder shared by Aman — https://www.dropbox.com/scl/fo/dqp6su7di83yf846jzvhh/ALWBwenamkjaRRpww3E26mU

**Workflow:** Aman downloads the Dropbox folder locally and drops it into `/site/assets/incoming/` (or shares the folder with Claude). Claude can't pull from Dropbox URLs directly — auth gate. Once images are local, Claude can crop, compress, rename per brand convention, and wire them into the right pages.

**Filename convention:** lowercase-with-hyphens, descriptive (e.g. `bravehearted-luna-portrait.jpg`, not `IMG_4521.jpg`). No clinical cruelty terms in filenames.

### Current demo assets (in `/site/assets/`)
- `r2r-logo.png`
- `survivors-hero.png`, `survivors-hero-crop.png` — homepage hero
- `team-brandy.png`, `team-bonnie.png`, `team-brandy-bonnie.png`
- `reality-beagle.png`, `reality-cages.png`, `reality-puppies.png` — review which of these need replacement under the "soften cruelty visuals" guardrail.

---

## 7. Default Behaviors (for Claude on this project)

- **Three copy variants** when proposing any user-facing copy, unless told otherwise.
- **Visual changes** = state the principle, then the specific implementation.
- **Flag drift** toward pity, exploitation, or corporate flatness.
- Treat all output as **production candidate, not first draft**.
- Don't touch demo page copy or imagery unless explicitly asked — refinement only.
- Don't deploy to Vercel without explicit go-ahead (one command, but breaks the feedback loop if premature).

---

## 8. Path B Build Plan — the streamlined stack

Picks are chosen for two constraints: founders edit content without engineering help, and recurring cost stays at or near $0.

| Layer | Pick | Why |
|---|---|---|
| **Framework** | **Next.js 14 (App Router) on Vercel** | Zero-friction Vercel deploys, React-based so the demo's JSX sections port quickly, image optimization built in (matters — photography is the hero), ISR for caching ShelterLuv responses. |
| **CMS** | **Sanity** (free tier: 3 users, 10k docs, generous bandwidth) | Real-time WYSIWYG studio that Brandy and Bonnie can use without training, hosted (no server to babysit), great image pipeline, structured content for survivor profiles. |
| **Adoptions** | **ShelterLuv REST API** with Next.js ISR (revalidate hourly) | Direct API integration. List page + detail page rendered server-side for SEO. Application form posts straight to ShelterLuv's submission endpoint. |
| **Donations** | **Zeffy** (already in use; 100% free, no platform fee, optional donor tip) | Already integrated and running for R2R. Just embed the existing Zeffy forms / link out to the hosted donation page. No new provider, no migration. |
| **Forms** | **Vercel API route + Resend** (free tier: 3,000 emails/mo) | Contact, foster, sponsor inquiries hit a serverless function that emails the staff inbox at `*@run2therescue.org` (webmail). Form data also optionally writes to Sanity for an audit trail. |
| **Analytics** | **Vercel Web Analytics** (free, privacy-friendly) | One-line enable. No cookie banner needed. |
| **Error monitoring** | **Sentry free tier** | Optional. Catch runtime issues before staff hear about them. |
| **Email (transactional, outbound)** | **Resend** | Sends form submissions and any auto-replies. Does NOT replace inbox email — staff still read mail in their existing webmail (Roundcube at `webmail.run2therescue.org`). |
| **Email (inbox)** | **Existing webmail at run2therescue.org** (Roundcube, currently hosted at Hustly) | Staff keep their existing addresses and inbox UI. Critical: MX records must survive the DNS cutover (see §8.5). |
| **DNS** | **Cloudflare** (free, recommended) or stay on Hustly registrar pointed at Vercel | Cloudflare gives clean DNS management, free CDN, and the ability to keep MX pointed at the current mail host while A/CNAME records point at Vercel. |

### Milestones (each one is independently shippable to a preview URL)

**M1 — Next.js scaffold + design port (Aman + Claude, ~1 sitting)**
Port the 7 static demo pages into a Next.js App Router project. CSS comes over as-is. No CMS yet — copy lives in components. Deploys to a Vercel preview. Looks identical to the demo, just on a real framework.

**M2 — Image swap (Aman drops Dropbox folder; Claude does the rest)**
Real photography replaces stock. `reality-cages.png` and `reality-puppies.png` get reviewed against the "soften cruelty visuals" guardrail. All images renamed per convention and served through Next.js Image.

**M3 — Brandy sign-off pass**
Share the Vercel preview URL. Brandy reviews real photography + final copy. Iterate. Lock the design.

**M4 — Sanity CMS wiring**
Stand up the Sanity studio embedded in the repo. Migrate page copy + founder bios + survivor profiles + news posts into Sanity schemas. Front-end reads from Sanity. Brandy and Bonnie get logins. Short walkthrough doc.

**M5 — ShelterLuv integration**
Bonnie/Brandy generate API key. Build adoption listings (server component, ISR revalidate hourly), detail pages (dynamic route), application form (posts to ShelterLuv submission endpoint).

**M6 — Donations + forms**
Donate page wired to the existing **Zeffy** integration (embed widget or link out to the hosted Zeffy form — no new account needed). Contact + foster + sponsor inquiry forms wired to a Vercel API route → Resend → staff webmail inbox.

**M7 — SEO carry-over**
Pull existing Yoast meta and URL structure from the WP install. Write 301 redirects for any changed paths. Generate sitemap.xml. Open Graph + Twitter card metadata on every page. Submit new sitemap to Google Search Console.

**M8 — Cutover (Option 1: keep mail at Hustly)**
1. **Inventory existing DNS records at Hustly** — A, AAAA, CNAME, **MX, SPF (TXT), DKIM (TXT), DMARC (TXT)**, autoconfig/autodiscover. Screenshot the full zone before touching it.
2. **Confirm with Hustly support** that mail-only / standalone mail hosting is available as a plan (or that mail keeps working on a downgraded plan after web is decommissioned). If not, we'll have to do Option 2 (M10) before cancelling — flag this early so it doesn't ambush the cutover.
3. **Move DNS to Cloudflare.** Replicate the full zone. Point A/CNAME at Vercel. Leave **MX + SPF + DKIM + DMARC pointed at Hustly's mail server** so email keeps flowing to Roundcube.
4. Remove `robots.txt` Disallow.
5. Smoke-test: donation flow (Zeffy), adoption application (ShelterLuv), contact form (Resend → staff inbox), inbound mail to a staff address (send from gmail/outside, confirm arrival in Roundcube).
6. Keep Hustly subscription active ~1 week as insurance.

**M9 — Decommission WP (web only)**
After the insurance window: cancel or downgrade Hustly to the **mail-only tier**. Email keeps working. Export final WP database as a cold archive. Plugins, licenses, all dropped. The Roundcube webmail at `webmail.run2therescue.org` continues to work as-is.

**M10 — (Future) Migrate email off Hustly**
Out of scope for the initial launch, but the right long-term move:
- Apply for **Google Workspace for Nonprofits** (free for qualifying 501(c)(3)s — R2R should qualify with EIN 99-4240461). Application + verification typically takes ~2 weeks.
- Once approved, migrate mailboxes (IMAP transfer) for Brandy, Bonnie, and any other staff addresses.
- Update MX/SPF/DKIM/DMARC at Cloudflare to point at Google.
- Cancel Hustly entirely.
- Bonus: Brandy and Bonnie get Gmail UI + Drive/Docs/Calendar/Meet bundled in.

### What to expect on time
M1–M3 are days, not weeks — the design is already done. M4–M6 are the real engineering. M7–M9 are one focused session each. A determined cadence puts the whole thing in production inside 3–4 weeks of part-time effort.

---

## 9. Open Items

- [x] ~~Platform decision~~ → Path B confirmed 2026-05-12.
- [x] ~~Brandy sign-off timing~~ → Aman is sole POC for design/content; no founder gates. Share preview URLs for context, not approval.
- [ ] ShelterLuv API key (Bonnie/Brandy generates when M5 starts).
- [x] ~~Donation provider~~ → Zeffy (already integrated, 100% free, no migration needed).
- [x] ~~Email path at cutover~~ → **Option 1** confirmed: keep MX pointed at Hustly mail at launch (M8). **Option 2** (Google Workspace for Nonprofits migration) deferred to M10 as a future phase.
- [x] ~~Domain/DNS~~ → **Cloudflare** at M8.
- [ ] ~~Confirm Hustly mail-only plan availability~~ → defer; revisit before M9.
- [ ] Decide fate of WP `Home (backup 3.5.26)` draft by Kirk Miller — keep as archive, or delete?
