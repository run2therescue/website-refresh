# Deploy to Vercel

Everything in this folder is production-ready. You have two easy paths.

## Option A — Vercel CLI (fastest, ~30 seconds)

Open Terminal, then:

```bash
cd "<this folder>"
npx vercel@latest --prod --yes
```

First time only, it will ask:
- Set up and deploy? **Y**
- Which scope? → pick your account
- Link to existing project? **N**
- Project name? → `run2therescue` (or anything)
- In which directory is your code? → just hit **Enter** (it's the current dir)
- Override settings? **N**

It will print the live URL, e.g. `https://run2therescue.vercel.app`.

## Option B — Drag & drop (no CLI)

1. Go to https://vercel.com/new
2. Click **Deploy** → **Browse** (or drag this whole folder onto the page)
3. Framework preset: **Other** (it's a static site)
4. Build command: leave empty
5. Output directory: leave empty (defaults to `.`)
6. Click **Deploy**

---

## What's included

- 7 pages (index, Adopt, Foster, Sponsor, Donate, News, Contact)
- `feedback.js` — floating "Send feedback" button on every page (textarea + copy-to-clipboard, no backend)
- `vercel.json` — cache headers for `/assets`, security headers everywhere
- `robots.txt` — blocks indexing (prototype)
- Favicon, OG tags, meta descriptions on every page

## After deployment

Share the URL with decision-makers. They click the purple **Send feedback** button (bottom-right on every page), type thoughts, hit **Copy**, and paste into email/Slack. Each copied message includes the page name + URL so you can tell which page the feedback is about.

## When you're ready to move to WordPress

The content is in clean JSX sections. Each page's copy, section order, and imagery are easy to map to WP blocks or a theme. I can write up a WP conversion plan (block mapping, menu/nav structure, asset migration checklist) once feedback comes back.
