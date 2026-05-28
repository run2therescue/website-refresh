# Image Audit — May 2026 drop

Source folder: `site/assets/incoming/Images/` (21 files: 18 stills + 3 videos)
Target folder for production-ready renames: `site/assets/` (next to the existing logo)

---

## TL;DR

- **Kronk's transformation pair anchors the brand.** Hero of the homepage, repeated as a thread throughout the site.
- **Five named dogs** got transformation pairs (Alfie, Brooks, Gertie, Honey, Kronk). These become the adoption-story gallery on the Adopt page and the proof-of-impact strip on the homepage.
- **Six founder shots** — three of Brandy, two of Bonnie, one of both. Real, warm, eye-level. Perfect for the brand voice. Replaces all three current stock "team-*" assets on the demo.
- **Three DMT (Dog Meat Trade) context stills + three videos** are pre-cleared as "Not Graphic." Publishable but heavy — use sparingly as small context callouts, never as hero. Defaulting to one still in a contained reality section, videos held for the news/blog or social channels rather than baked into the marketing site.

---

## Inventory + categorization

### 🏆 Hero / transformation pairs (the brand's tentpole material)

| Current filename | Renamed | Notes |
|---|---|---|
| `Kronk Before.jpg` | `kronk-before-rescue.jpg` | Scruffy pup, astroturf, transport setting. |
| `Kronk after (1).jpeg` | `kronk-after-snow.jpg` | **HERO CANDIDATE.** Magnificent Malamute leaping in snow. Tall portrait orientation works for vertical hero treatments too. |
| `Alfie before.jpg` | `alfie-before-rescue.jpg` | Transformation pair. |
| `Alfie after.jpg` | `alfie-after-portrait.jpg` | Transformation pair. |
| `Gertie Before.png` | `gertie-before-rescue.png` | Transformation pair. |
| `Gertie After.jpg` | `gertie-after-portrait.jpg` | Transformation pair. |
| `Honey Before.jpg` | `honey-before-rescue.jpg` | Transformation pair. |
| `Honey After.png` | `honey-after-portrait.png` | Transformation pair. |
| `Brooks after.jpg` | `brooks-after-portrait.jpg` | Single (no "before" provided — confirm if one exists). |

### 👥 Founder & on-the-ground shots

| Current filename | Renamed | Notes |
|---|---|---|
| `Brandy and Kronk at transport.jpg` | `brandy-kronk-handoff.jpg` | **CEO + People Magazine dog. Use generously.** |
| `Brandy and Bonnie at transport -1.png` | `founders-brandy-bonnie.png` | Rare both-founders shot. About / Foster / Sponsor pages. |
| `Brandy at transport with dogs-1.png` | `brandy-transport-1.png` | About / founder bio. |
| `Brandy at transport with dogs-2.jpg` | `brandy-transport-2.jpg` | Variant. |
| `Bonnie at transport with dogs-1.jpg` | `bonnie-transport-1.jpg` | About / founder bio. |
| `Bonnie at transport with dogs-2.jpg` | `bonnie-transport-2.jpg` | Variant. |

### 🧱 Reality / trade context — shown plainly, placed thoughtfully

The trade-context stills and clips are **shown without blur or click-to-reveal.** The dogs-in-crates reality is the urgency that drives every donation, foster, and adoption. Hiding it sanitizes the mission. The brand guideline is "front-load hope and resilience, never exploitative" — which governs **sequencing and dignity, not visibility.** Hope frames the horror; horror gives the hope its weight.

| Current filename | Renamed | Notes |
|---|---|---|
| `Images of dogs in DMT crates. (Not Graphic)-1.jpg` | `reality-trade-context-1.jpg` | Shown plainly. Dignified caption naming the reality. |
| `Images of dogs in DMT crates. (Not Graphic)-2.jpg` | `reality-trade-context-2.jpg` | |
| `Images of dogs in DMT crates. (Not Graphic)-3.jpg` | `reality-trade-context-3.jpg` | |

> Renaming intentionally avoids "DMT" / "meat trade" / "slaughterhouse" in filenames per the brand guideline. Filenames travel into alt text and asset URLs — keep them dignified.

### 🎥 Videos — shown plainly with a poster frame and play affordance

| Current filename | Renamed | Notes |
|---|---|---|
| `videos of the DMT (not graphic)-1.mp4` | `reality-trade-clip-1.mp4` | Static poster frame visible, standard play button, autoplay off, captions where applicable. |
| `videos of the DMT (not graphic)-2.mp4` | `reality-trade-clip-2.mp4` | |
| `videos of the DMT (not graphic)-3.mp4` | `reality-trade-clip-3.mp4` | |

### Placement principles (governs sequencing, not visibility)

- **Hero / above-the-fold** — hope-forward only. Kronk leaping in snow, never a cage.
- **Reality section** — visible reality, contained scale (not full-bleed), with dignified caption and an immediate transformation pair below it. The pattern is: *"this is where they come from"* → *"this is where they end up."* Both shown. Both real.
- **Sponsor / Donate / News pages** — full reality footage usable. Anyone scrolling that deep is engaged enough to handle it.
- **Adopt / Foster / Contact** — hope-forward only. These are doorways, not testimony.

### Caption / copy treatment for the reality images

Three variants for Brandy to pick from:

1. *"This is what we run to. Cages, transport trucks, an industry that ends in slaughter. Every survivor below started here."*
2. *"The dogs we rescue come from here. The dog meat trade moves an estimated 30 million animals each year across East Asia."*
3. *"Voiceless. In crates. Headed for slaughter. Every dog we rescue is pulled out of this. Every donation, every adoption, every sponsor — this is what you interrupt."*

---

## 🛡️ Future use — the "ReleaseToReveal" consent pattern

We're **not building this for the current image set** (per the call above — the trade-context material is shown plainly). But it's a useful pattern to have specced for the future if R2R ever needs to share genuinely graphic material — actual cruelty, distress, or veterinary trauma — without ambushing a casual visitor.

Pattern in brief, for reference:
- Image renders blurred + dimmed with a content note overlay and "View image" button.
- Click → fade reveals the image; consent stored in `sessionStorage` for the session.
- Wrapper is a `<button>` for keyboard accessibility; `prefers-reduced-motion` respected.
- Reserved for **Tier 2 content** (actual graphic material), not Tier 1 (the "Not Graphic" trade context we have today).

---

## Demo asset replacement map

Existing `site/assets/` → action:

| Existing | Action | Replacement |
|---|---|---|
| `r2r-logo.png` | **Keep.** No new logo received in this drop. (Note: parent Dropbox folder has `run2therescue_parent_v2.png` and `_match_v2.svg` — pull separately if those are the updated logos.) | — |
| `survivors-hero.png`, `survivors-hero-crop.png` | **Replace.** | `kronk-after-snow.jpg` (with `brandy-kronk-handoff.jpg` as secondary hero variant). |
| `team-brandy.png` | **Replace.** | `brandy-transport-1.png` or `brandy-transport-2.jpg`. |
| `team-bonnie.png` | **Replace.** | `bonnie-transport-1.jpg` or `bonnie-transport-2.jpg`. |
| `team-brandy-bonnie.png` | **Replace.** | `founders-brandy-bonnie.png`. |
| `reality-beagle.png` | **Replace.** | `kronk-before-rescue.jpg` (cleaner "trauma → trust" arc). |
| `reality-cages.png` | **Replace.** | `reality-trade-context-1.jpg` (or retire entirely — see open question). |
| `reality-puppies.png` | **Retire.** | Replace with a transformation "after" portrait (`alfie-after-portrait.jpg` or similar). |

---

## Page-level placement proposal

**Home (`index.html`)**
- Hero: `kronk-after-snow.jpg` (full-bleed). Headline overlay drives transformation framing.
- Reality section (kept tight, never the emotional center): `reality-trade-context-1.jpg` + the existing brand copy about the trade.
- Transformation strip / "Meet the Survivors": four to five before/after pairs in a horizontal scroll or grid — Kronk, Alfie, Gertie, Honey, (+ Brooks single).
- Founders teaser: `founders-brandy-bonnie.png` with a one-line bio → links to About.
- Trust signals: Kronk + People Magazine reference, EIN, partnerships.

**Adopt (`Adopt.html`)**
- Header: portrait gallery of the named survivors (after portraits only — Alfie, Brooks, Gertie, Honey, Kronk).
- ShelterLuv listings render below (M5).

**Foster (`Foster.html`)**
- Warmth shot: `brandy-kronk-handoff.jpg` — illustrates the handoff moment, perfect for "what fostering looks like."

**Sponsor (`Sponsor.html`)**
- Transformation pair (Kronk before/after, side-by-side) as the emotional anchor.
- "Sponsor a Flight" / "Fund a Rescue" copy uses the trade context image as a small inline callout (not a hero).

**Donate (`Donate.html`)**
- `brandy-kronk-handoff.jpg` or `brandy-transport-1.png` — the human side of where the money goes.
- Zeffy embed below (M6).

**News / R2TR News Media (`News.html`)**
- Featured story slot: Kronk transformation as the first/featured article.

**Contact (`Contact.html`)**
- Soft founder shot: `founders-brandy-bonnie.png`.

---

## Resolved items (closed 2026-05-12)

- [x] **POC / sign-off** — Aman is the sole point of contact for design and content sign-off on this refresh. No Brandy/Bonnie gates. Faster cycles.
- [x] **Logo** — keep the current logo as-is on the demo. The `_parent_v2` and `_match_v2` files in the parent Dropbox are not a refresh; ignore.
- [x] **Brooks** — no "before" photo exists today. Brooks is a **single after portrait**, used elsewhere on the site (founder/about strip or a news lead). Before/after gallery uses Alfie + Kronk + Gertie + Honey only.
- [x] **Survivor naming** — public use of all named dogs is approved.
- [x] **Magic Patterns subfolder** — skip.
- [x] **Reality-image caption** — defaulting to variant 3 below ("Voiceless. In crates. Headed for slaughter…") as the strongest of the three, with Aman able to swap to variant 1, 2, or a custom rewrite at any point. All three remain logged.

---

## What happens next

Once you confirm the renaming map and any open-item answers (especially Brandy's call on the DMT context visuals), I'll:

1. Copy renamed files from `site/assets/incoming/Images/` → `site/assets/` with the new filenames.
2. Wire them into the demo's HTML/JSX pages per the placement proposal above.
3. Deploy the updated demo to the existing Vercel preview so you can review live before M1 (Next.js port) starts.

Originals in `incoming/` stay intact — non-destructive. The Dropbox source is also untouched.
