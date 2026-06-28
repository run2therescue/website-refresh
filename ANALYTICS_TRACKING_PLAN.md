# Run 2 The Rescue — Analytics Tracking Plan

**Goal:** get more people onto the site so more dogs get adopted and more people give.
This is the map of what we measure, why, and the two small setup steps to finish in GA4.

GA4 property: **Run 2 The Rescue** · Measurement ID **G‑4XYY862JTW**
Tracking script: `analytics.js` (loaded on all 10 pages).

---

## 1. What's tracked automatically (no setup)

GA4 does this on every page the moment the tag loads:

- **page_view** with the visit's **source / medium / campaign** — i.e. *where each visitor came from*.
- **Default channel grouping** buckets traffic into Organic Social, Paid Social, Referral, Organic Search, Direct, Email, etc. This is the report you'll live in: *Reports → Acquisition → Traffic acquisition*.
- **Enhanced Measurement:** scroll depth (90%), outbound link clicks, site search, video engagement, and file downloads (e.g. the 501(c)(3) letter).

So "which platform sends us people" is answered out of the box — **as long as social links are UTM‑tagged** (see §4). Without tags, clicks from inside the Instagram/TikTok apps land as *Direct* and you lose the credit.

---

## 2. Behavior + conversion events (wired in code)

| Event | Fires when… | Why it matters |
|---|---|---|
| `view_dog` | someone opens a dog's profile on Adopt | top of the adoption funnel — which dogs draw interest |
| `adopt_application_start` | they click "Apply to adopt {dog}" | real adoption intent |
| `form_submit` | adoption / foster / contact / newsletter form is sent (carries the form name) | completed inquiry |
| `donate_outbound` | a click heads to Zeffy / PayPal / Venmo / GiveButter (carries amount + dog when present) | closest proxy for a gift |
| `find_match` | the "Find your match" quiz is completed | engaged, qualified adopter |
| `social_click` | a click goes out to our own FB / IG / TikTok / YouTube | what's growing the audience |
| `contact_click` | an email or phone link is clicked | warm inbound |

These all flow in now. Two finishing steps in the GA4 UI make them show up properly in reports:

---

## 3. Finish in GA4 (≈10 min, one time)

### A) Mark the conversions ("key events")
*Admin → Data display → Key events → "New key event"*, then type each name exactly:

- `donate_outbound`
- `form_submit`
- `adopt_application_start`
- `find_match`

(You can add the name before GA4 has ever seen it. Once marked, these appear as conversions across every report and let you measure "what % of visitors from TikTok started an adoption.")

### B) Register custom dimensions (so the detail is visible in reports)
*Admin → Data display → Custom definitions → "Create custom dimension"*. Scope = **Event** for all:

| Dimension name | Event parameter | Lets you answer |
|---|---|---|
| Dog | `dog` | which dogs drive views/gifts |
| Platform | `platform` | which social channel is clicked most |
| Form | `form` | adoption vs foster vs contact volume |
| Donation amount | `amount` | gift sizes from outbound clicks |
| Contact method | `method` | email vs phone |
| Breed | `breed` | breed interest patterns |
| Size | `size` | size interest patterns |

Custom dimensions only populate from the day you create them forward (they aren't retroactive), so do this soon.

---

## 4. UTM tags for social — the one habit that makes attribution work

Put these tagged URLs in your **link‑in‑bio**, story links, and post links. Then GA4 correctly credits each platform even from in‑app browsers.

**Pattern:** `?utm_source=PLATFORM&utm_medium=social&utm_campaign=CAMPAIGN`
Use `utm_medium=paid_social` for ads. Keep `utm_campaign` short and consistent (e.g. `linkinbio`, `yulin2026`, `giving-tuesday`).

### Ready to paste — link‑in‑bio (homepage)
```
Instagram → https://run2therescue.org/?utm_source=instagram&utm_medium=social&utm_campaign=linkinbio
TikTok    → https://run2therescue.org/?utm_source=tiktok&utm_medium=social&utm_campaign=linkinbio
Facebook  → https://run2therescue.org/?utm_source=facebook&utm_medium=social&utm_campaign=linkinbio
YouTube   → https://run2therescue.org/?utm_source=youtube&utm_medium=social&utm_campaign=linkinbio
```

### Drive straight to a goal page
```
Adopt   → https://run2therescue.org/adopt?utm_source=instagram&utm_medium=social&utm_campaign=adopt
Donate  → https://run2therescue.org/donate?utm_source=instagram&utm_medium=social&utm_campaign=donate
Sponsor → https://run2therescue.org/sponsor?utm_source=instagram&utm_medium=social&utm_campaign=sponsor
```
Swap `instagram` for the platform you're posting on. For a specific dog or campaign, add `&utm_content=trip` (the dog's name) so you can see which featured dog converted.

**Tip:** keep a running list of your tagged links so naming stays consistent. Google's free *Campaign URL Builder* (ga-dev-tools Campaign URL Builder) generates them too.

---

## 5. The handful of reports to actually watch

- **Acquisition → Traffic acquisition** → which channels/platforms bring visitors, and how many convert.
- **Engagement → Events** → counts of `view_dog`, `donate_outbound`, `form_submit`, etc.
- **Engagement → Conversions** → your key events over time.
- **Realtime** → instant check that posts are driving live traffic right after you publish.
- The **Looker Studio dashboard** ("Run 2 The Rescue Analytics Dashboard") rolls these up; data fills in over the next 24–48h.

---

*Implementation note: all click events come from one delegated listener in `analytics.js`; it never throws, so it can't break the page. `view_dog` and `adopt_application_start` are wired in `adopt.jsx`. Adoption/foster/contact forms fire `form_submit` via the shared `submitForm` helper.*
