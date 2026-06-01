# Run 2 The Rescue — Brand Playbook

> A working reference for anyone writing, designing, photographing, or
> building for Run 2 The Rescue. Read it once, keep it open while you work,
> challenge it when something better emerges.

This playbook is built from the active website system. Every token, type
choice, and voice example here is already in use at
**[run2-rescuedemo.vercel.app](https://run2-rescuedemo.vercel.app)** — open
the site in another tab while you read.

---

## 1. Who we are

**Run 2 The Rescue (R2TR)** is a 501(c)(3) nonprofit (EIN 99-4240461) that
rescues dogs from the East Asia meat trade, funds their medical care, and
places them with families in the United States.

- Founded **2012** by Brandy Cherven (CEO) and Bonnie Klapper (COO).
- Active in **China and South Korea**, with on-the-ground rescuer partners.
- Flight hubs in the U.S.: **JFK** and **LAX**.
- Featured in **The Dodo, People, Long Island Press, New York Post**.

**What we are NOT:** a corporate-voiced animal welfare org. We do not lead
with statistics, guilt, or cruelty imagery. The brand stays warm, dignified,
and hopeful — even when the underlying work is hard.

---

## 2. Voice and tone

### Voice attributes

The R2TR voice is **four things at once**, blended in every sentence:

| Attribute | What it sounds like |
|---|---|
| **Hopeful** | We lead with what's possible, not what's painful. |
| **Dignified** | We treat both the dogs and the reader as worthy. |
| **Urgent** | Real timelines, real numbers, real stakes — but never alarmist. |
| **Never exploitative** | We never use trauma porn or guilt to drive action. |

Founder voice is **activist warm**, not corporate. If a sentence could appear
on a Fortune 500 annual report, rewrite it.

### Tone shifts (by context)

| Context | Tone |
|---|---|
| Homepage hero, social posts | Warm, inviting — "Give Hope. Change a Life." |
| Adopt cards | Plainspoken, factual, hopeful — "Pulled from the meat trade. Medically cleared. Ready for a home." |
| Reality page | Restrained, factual, never gratuitous |
| Donate / Sponsor | Direct, concrete, transparent about money |
| Press releases | Confident, sourced, brief |
| Newsletter | Personal, conversational |

### The reader posture

The visitor is a **co-rescuer**, not a savior. Every CTA is a **door**, not
an ask. Phrasing reflects that.

| Use | Avoid |
|---|---|
| Meet the survivors | Please help us |
| Bring one home | Donate to save lives |
| Fund a flight | We need your support |
| Open your home | Will you give? |

### Transformation language

The narrative arc of every survivor story uses one of three brand triplets,
each ending in an "-ever" word:

- **trauma to trust**
- **fear to faith**
- **forgotten to forever**

Use sparingly and never all three in the same paragraph.

### The protected lexicon

These phrases are brand assets. Keep them verbatim when they appear, and
use them where they fit naturally. **Never rewrite them.**

- **RUN. RESCUE. REPEAT.** — the tagline (punctuation matters)
- **"Run to the rescue with love, and peace will follow."** — anchor quote, attributed to River Phoenix
- **hopeful survivors**
- **bravehearted survivors**
- **voiceless victims**
- **second chance**
- **beacon of hope**
- **Sponsor Angel** (sponsorship program name)

### What we retired

The website was rewritten away from generic nonprofit corporate voice.
Don't reintroduce:

- "We are a compassionate team dedicated to…"
- "Our mission is to rescue, rehabilitate, and rehome…"
- "We believe every animal deserves…"
- "Together we can make a difference."
- "Please help us."
- Clinical cruelty language (the word "slaughterhouse" should not appear in headlines, filenames, or visible copy)

### Style mechanics

- **No em-dashes (—) in body copy.** Use periods, commas, or a fresh
  sentence. Em-dashes are scrubbed sitewide.
- **Avoid hyphens where the unhyphenated version reads cleanly** ("tax
  deductible", not "tax-deductible"; "in person", not "in-person").
- **Sentence case** in headings most of the time. Title Case is reserved
  for the tagline, founder names, and product/program names ("Sponsor Angel").
- **Drop filler "every" and "truly"** when the sentence works without them.
- **Active verbs over abstract nouns.** "We pull dogs from holding pens"
  beats "We provide rescue services."

---

## 3. Logo

The mark is a **paw print inside a stamped circle**, with the words
**"RUN 2 THE RESCUE"** wrapped around the inside edge.

**File:** `site/assets/r2r-logo.png` (single PNG, transparent background).

### Clear space

Reserve a clear space around the logo equal to **the width of one paw toe**
on all sides. Don't tuck text, buttons, or other marks inside that ring.

### Sizes

| Use | Minimum size |
|---|---|
| Web nav | 56 × 56 px on phones, 96–104 × 96–104 px on desktop |
| Footer | 48 × 48 px |
| Email signature | 40 × 40 px |
| Print | 20 mm wide |

Never resize below the minimum — the inner type becomes illegible.

### Backgrounds

The logo holds up on:
- **white**
- **lavender** (`--lav-50` to `--lav-200`)
- **plum** (`--plum-800` to `--plum-900`)
- **photography**, when there's a calm area in the lower-left or upper-right

### Don'ts

- Do not recolor the paw or the type.
- Do not place over busy photography without a darkening overlay (~30%).
- Do not stretch, skew, or rotate.
- Do not place inside another circular frame.
- Do not pair with a tagline lockup of your own design; the tagline lives separately as **RUN. RESCUE. REPEAT.**

---

## 4. Color

R2TR's palette is a single tonal family — **plum / purple / lavender** —
with a deliberately small role for a warm red-orange urgency accent. No
cool blues, no greens, no rainbows. The palette feels warm because the hue
sits at `~305–310` in oklch (a slightly warm violet).

All tokens are defined as CSS variables in `styles.css`. Use the tokens,
not raw values, in code.

### Plum (dark surfaces)

| Token | oklch | Approx hex | Use |
|---|---|---|---|
| `--plum-900` | `oklch(0.18 0.035 310)` | `#171025` | Page background on dark sections; theme-color |
| `--plum-800` | `oklch(0.22 0.04 310)` | `#1f1530` | Card backgrounds on dark sections |
| `--plum-700` | `oklch(0.28 0.045 310)` | `#2a1c3d` | Elevated cards on dark |
| `--plum-600` | `oklch(0.34 0.05 310)` | `#352449` | Borders, hover states on dark |
| `--plum-500` | `oklch(0.42 0.055 310)` | `#43325a` | Tier ramp end |

### Purple (accent + interaction)

| Token | oklch | Approx hex | Use |
|---|---|---|---|
| `--purple-soft` | `oklch(0.92 0.05 305)` | `#e6d8f0` | Badge backgrounds, pill backgrounds |
| `--purple-400` | `oklch(0.72 0.14 305)` | `#b48bdf` | Eyebrow accents, hover lifts |
| `--purple-500` | `oklch(0.63 0.16 305)` | `#9871d2` | Primary buttons, key accents |
| `--purple-600` | `oklch(0.54 0.17 305)` | `#7d56b9` | Button hover, link text |
| `--purple-700` | `oklch(0.44 0.15 305)` | `#5e3f95` | Tier ramp deepest |

### Lavender (light surfaces)

| Token | oklch | Approx hex | Use |
|---|---|---|---|
| `--lav-50`  | `oklch(0.97 0.012 300)` | `#f5f3f7` | Page background on light sections |
| `--lav-100` | `oklch(0.94 0.02 300)`  | `#ebe7ef` | Form input backgrounds |
| `--lav-200` | `oklch(0.90 0.028 300)` | `#ddd6e5` | Skeleton loaders, dividers |
| `--lav-300` | `oklch(0.84 0.035 300)` | `#c7bcd5` | Subtle borders on light |

### Ink (text on light)

| Token | oklch | Approx hex | Use |
|---|---|---|---|
| `--ink`    | `oklch(0.16 0.03 310)`  | `#1a1226` | Headings, body |
| `--ink-2`  | `oklch(0.36 0.03 310)`  | `#43394e` | Body copy |
| `--ink-3`  | `oklch(0.55 0.02 310)`  | `#7b7585` | Metadata, secondary text |

### Text on dark

| Token | Use |
|---|---|
| `--on-dark`   | Primary text on plum sections (near-white) |
| `--on-dark-2` | Body copy on plum |
| `--on-dark-3` | Metadata on plum |

### Urgency accent

A single warm red-orange, used **sparingly** — only for time-sensitive
elements: "Just arrived" pills, urgency badges. Approximately
`oklch(0.65 0.15 35)` / `#d96847`.

**Never** use the urgency accent for general decoration, body links, or
button fills.

### Color usage rules

- **Plum is the brand's quiet base.** Use it for context.
- **Purple-500 is the only color that carries primary actions.** One per screen, where possible.
- **Lavender is a neutral.** Treat it like white-with-character.
- **Ink is the only text color on light backgrounds.** Don't introduce dark blue, dark green, etc.
- **60 / 30 / 10 rule** — 60% neutral (lavender / plum), 30% supporting (ink or on-dark), 10% accent (purple-500, urgency).

---

## 5. Typography

R2TR uses three families — display, body, mono — and nothing else. All
three are Google Fonts and load via the `<link>` in every page's `<head>`.

### Display — Bricolage Grotesque

Display heading. Variable weight 400–800, opsz 12–96. Used for h1, h2, h3,
the tagline, and any "feature" text.

```html
<h1 class="display">Give Hope. Change a Life. Heal with <em>Love.</em></h1>
```

- Default weight: **600** (heavy enough for impact, soft enough for warmth).
- Display sizes use `clamp(min, fluid, max)` so the same heading reads well from phone to desktop.

### UI — Inter Tight

Body copy, buttons, labels, paragraphs. Weight 400 (body), 500 (button), 600–700 (emphasis).

### Mono — JetBrains Mono

Eyebrows, labels, metadata, stats labels. Always uppercase, letter-spaced
~0.18em, small size (10–11 px). Mono signals "this is a label, not
content." Use it for:

- Section eyebrows ("✦ Adopt a Survivor")
- "DOGS RESCUED", "FOSTERS NEEDED NOW" stat labels
- Trust signals: "EIN 99-4240461"

### Type scale (live values)

| Role | Size | Weight | Family |
|---|---|---|---|
| Page hero h1 | `clamp(33px, 9vw, 104px)` | 600 | Display |
| Section h2 | `clamp(32px, 4.4vw, 56px)` | 600 | Display |
| Sub-section h3 | `clamp(21px, 2.5vw, 30px)` | 600 | Display |
| Body lead | 17 px | 400 | UI |
| Body | 14–16 px | 400 | UI |
| Small / footer | 12–13 px | 400 | UI |
| Mono label / eyebrow | 10–11 px, `letter-spacing: 0.16–0.2em`, uppercase | 600 | Mono |

### Italic `<em>` treatment

Inside headings, `<em>` is the "punchline word" of the line. It signals the
emotional pivot ("Give Hope. Change a Life. Heal with *Love.*"). Use one
em per heading, max.

### Line-height

- Display: 1.05 (tight)
- Body: 1.55–1.65 (generous)
- Small / mono: 1.4–1.5

---

## 6. Photography and video

Photography is the **single most important brand surface**. The right photo
of a real survivor is worth a paragraph of copy.

### Subject

- **Real R2TR dogs**, named, with stories. No generic stock unless it's a moment we genuinely don't have (and even then, prefer "no image" over a fake one).
- **Eye level** with the dog whenever possible. Down-shots feel clinical.
- A clear face, a real expression — looking at the camera or away, not posed.

### Light

- **Soft natural light.** Window light, morning, late afternoon.
- Avoid harsh on-camera flash, studio glossy, or commercial pet photography polish.

### Mood

- **Quiet warmth.** Not exuberant. Not pitiful.
- A small story in every frame — a paw on the doorstep, a glance toward the food bowl, ears half up.

### What we do not show

- **No graphic cruelty.** Crates, cages, and crowding live exclusively on the **Reality** page, behind a content notice.
- **No "before / after" pairs that lead with trauma.** When we show before/after (Journey section), the *after* is the hero; the before is restrained, desaturated, and small.
- **No staged glossy.** R2TR is not a luxury pet brand.

### Layout treatment

- **Generous whitespace** around portraits — every dog should read as an individual, not a statistic.
- **4:5 portrait aspect** for survivor cards (matches the natural framing of a dog standing or sitting).
- **2:1 horizontal split** for before/after on the Journey section.

### Video

- **Footage from the trade** lives on the Reality page only, blurred until the user opts in.
- **YouTube embeds** must use the `youtube-nocookie.com` domain (privacy + security; enforced in `api/animals.js`).
- **Hero background videos** should be short, looping, and darkened (~40% overlay) so headlines stay legible.

---

## 7. Iconography and decorative elements

### Paw print

A vector paw motif (five pads: large central pad, four toes) is used as a
background decoration on most sections. Always:

- **At 0.08 to 0.20 opacity** on dark sections, never more.
- **At 0.15 to 0.30 opacity** on light sections.
- **In `--purple-400`** on light backgrounds; **white** on dark backgrounds.
- **40 to 72 px** typical size, never larger than 96 px.
- **Positioned in corners or empty space**, never overlapping faces or copy.

The paw is mood, not message. If you can't see it, it's working.

### Sparkle (✦)

A four-pointed star used as a leader before eyebrows ("✦ Meet a few", "✦ Give"). Always in `--purple-400` or `--purple-500`. Never used as bullets or in body copy.

### Arrows

Use the right-pointing arrow `→` (Unicode `→`, not the hyphen-greater
combo). On hover, buttons nudge the arrow 3 px to the right via CSS
transition — implemented in `.btn .arrow` and reused on link CTAs.

### Hearts (♡ / ♥)

- Outline heart (♡) — favorites, "I love this" actions.
- Filled heart (♥) — confirmation, "applied", "donated", brand-tagged spots in the donate button.

Hearts in the brand are always purple, never red — red is reserved for urgency.

---

## 8. Layout and whitespace

### Whitespace is the brand

Every R2TR page has more breathing room than the average nonprofit. This
is on purpose: it gives each dog room to be an individual.

- **Section padding** ≥ 72 px top / bottom on desktop, 48 px on mobile.
- **Page margins** scale fluidly with `clamp(20px, 4vw, 48px)` — the `--pad` token.
- **Card padding** 18–28 px.
- **Headline to first paragraph** 12–22 px.

### Grid

A simple 12-column wrap (`var(--maxw)` = 1200 px). No nested grids, no
designer flexbox gymnastics. Pages compose vertically: hero → context →
proof → action.

### Hierarchy

Each section has, in order:

1. **Eyebrow** (mono, uppercase, with `✦` if dark background)
2. **Heading** (display, one em)
3. **One paragraph** of context
4. **One CTA** (where the section is action-oriented)

When a section breaks this hierarchy, it's because a card grid or a
gallery is doing the work. The pattern is consistent enough that breaking
it feels intentional.

---

## 9. Calls to action — the "door, not an ask" principle

Every R2TR CTA opens a door for the visitor. They are never asks.

### The CTA priority stack

When multiple CTAs compete for a viewer's attention, R2TR ranks them in
this order:

1. **Adopt** — the highest-impact outcome
2. **Sponsor** — recurring, deepest commitment
3. **Donate** — one-time gift
4. **Foster** — supports the pipeline

If two CTAs sit side by side, the lower-priority one is the visual primary
only when the page itself is about that lower priority (e.g., the Foster
page's hero promotes fostering first).

### Approved CTA phrasing

| Action | Use | Avoid |
|---|---|---|
| Adopt | Adopt today · Meet the survivors · Bring one home | Adopt now! · Save a life |
| Sponsor | Start your monthly sponsorship · Be a Sponsor Angel · Sponsor a survivor | Sponsor us · Give monthly |
| Donate | Give · Choose how to give · Donate now | Please donate · Help us |
| Foster | Apply to foster · Open your home · Become a Foster | Sign up to foster |

### Button styling

- **Primary action:** `btn-accent` — filled `--purple-500`, white text.
- **Secondary on dark:** `btn-outline-light` — transparent, white border.
- **Secondary on light:** `btn-outline-soft` — transparent, purple border, purple text.

Never put three filled primary buttons on one screen.

---

## 10. Microcopy

Microcopy carries as much brand as headlines, and is rewritten more often.
Some patterns that work for R2TR:

- **State the verb first.** "Adopt a survivor" beats "Survivor adoption."
- **Name a specific thing.** "Fund a flight" beats "Fund our work."
- **Don't editorialize the action.** "Submit application" beats "Submit your wonderful application."
- **Acknowledge the reader's actual state.** "Not ready to adopt?" beats "Want to help in another way?"

---

## 11. Sample applications

### Email signature

```
[Name]
Run 2 The Rescue · 501(c)(3) nonprofit
RUN. RESCUE. REPEAT.
run2therescue.org
```

### Social caption (Instagram / Facebook)

```
Meet [Dog Name]. Pulled from a holding pen in [Yulin / Seoul]. Cleared.
Crated. And now waiting at JFK for a family.

Could it be yours? Adoption applications open. Link in bio.

#Run2TheRescue
```

### Newsletter subject line

```
Three new arrivals at LAX. Meet them.
```

### Press release header

```
RUN 2 THE RESCUE
501(c)(3) Nonprofit · EIN 99-4240461
FOR IMMEDIATE RELEASE — [Date]
Contact: [Name] · info@run2therescue.com
```

---

## 12. Trust signals

The site surfaces these without burying them. So should every external
communication:

- **EIN 99-4240461** — in the footer, donate page, sometimes the press header.
- **501(c)(3) status** — within "501(c)(3) nonprofit" phrasing on Donate and Footer.
- **Founders** — Brandy Cherven (CEO), Bonnie Klapper (COO), each with a bio on the Leadership section.
- **Press** — The Dodo, People, Long Island Press, NY Post — display logos prominently, linked to original articles.
- **R2TR Determination Letter PDF** — `assets/r2r-501c3-determination.pdf`, linked from the footer.

For donor trust specifically:

- **Founding date** (2012) and **years rescuing** (14) — visible in the Adopt hero stats.
- **Source citations** on the Mission section ("Source: Humane Society International").
- **DAF legal name** — Run to the Rescue (no "2") with EIN 99-4240461 on the DAF info card. Use exactly that name in any DAF facing context.

---

## 13. Design tokens (for engineers and partners)

The full token system lives in `styles.css` at `:root`. The tokens above
are the ones that change brand appearance; the ones below are the
mechanical ones.

```css
--font-display: "Bricolage Grotesque", "Inter Tight", system-ui, sans-serif;
--font-ui:      "Inter Tight", "Inter", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

--radius:      12px;       /* default border radius */
--radius-lg:   20px;       /* card radius */
--radius-pill: 999px;      /* pills and buttons */

--shadow-sm:   0 1px 0 oklch(0.18 0.035 310 / 0.05);
--shadow:      0 20px 50px -20px oklch(0.18 0.035 310 / 0.35);
--shadow-dark: 0 20px 50px -20px oklch(0 0 0 / 0.4);

--maxw: 1200px;
--pad:  clamp(20px, 4vw, 48px);

--accent: var(--purple-500);   /* swappable for palette experiments */
```

To experiment with a different accent at runtime, set `data-palette` on
`<body>` — the site supports `plum`, `lilac`, `rose`, and `teal`. Default
is plum and should remain so for brand consistency.

---

## 14. Asset locations

| Asset | Path |
|---|---|
| Logo (web/print) | `site/assets/r2r-logo.png` |
| Color tokens (source of truth) | `site/styles.css` (`:root` block) |
| 501(c)(3) Determination Letter | `site/assets/r2r-501c3-determination.pdf` |
| Founder photography | `site/assets/brandy-*.{png,jpg}`, `site/assets/bonnie-*.{png,jpg}` |
| Survivor "before / after" assets | `site/assets/{name}-before-rescue.*`, `site/assets/{name}-after-portrait.*` |
| Press logos | `site/assets/press/{slug}.png` |
| Reality page (sensitive) | `site/assets/reality-*.{jpg,mp4}` |
| "How You Can Help" PNGs | `site/assets/help-{adopt,foster,sponsor,donate}.png` |
| Fonts | Loaded from Google Fonts CDN, declared in every page `<head>` |

When you need a new asset, check the existing folder first — there's often
something close.

---

## 15. What to retire, every time you see it

Print this in your head:

- **Em-dashes** in body copy → period or comma.
- **"Tax-deductible"** → "tax deductible."
- **"We believe…"** → cut the sentence; show what we believe by what we do.
- **"Compassionate"** as a self-description → cut.
- **"Dedicated team committed to…"** → cut hard.
- **"Make a difference"** → name the difference.
- **Asks** → doors.
- **Stock dog photography** → real survivor photography.
- **Pity** → hope.
- **The word "slaughterhouse"** in headlines, filenames, or visible copy → cage / holding pen / meat trade.
- **Clinical cruelty descriptions** anywhere outside the Reality page.

---

## 16. When to break this playbook

A good playbook is a starting line, not a fence. If a sentence is better
because it breaks a rule here, write the sentence and move on. The rules
that should never be broken are the ones in **§ 2 (the protected lexicon)**
and **§ 6 (no graphic cruelty outside the Reality page)**. The rest is
guidance; ship the better thing.

---

*This playbook is a living document. When the site evolves, update it
alongside the code change so the two stay in sync.*
