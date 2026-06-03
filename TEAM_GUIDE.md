# Team Guide — editing the R2TR website

A short, non-technical guide for making everyday updates to the Run 2 The
Rescue website (the new one at https://run2-rescuedemo.vercel.app). If you
can edit a doc on Google Drive, you can edit this site.

For deeper architecture and history, read [CLAUDE.md](CLAUDE.md) and
[HANDOFF.md](HANDOFF.md). This guide is the **shortest path** to making a
safe change.

---

## What lives where (the 90% of edits)

You don't need to know every file. You just need to know which file holds
the words you want to change. Most edits are in one of these:

| If you want to change…                          | Edit this file        |
|-------------------------------------------------|-----------------------|
| The email shown on the **Contact** page        | `contact.jsx`         |
| The **Adopt** page intro, dog grid copy        | `adopt.jsx`           |
| The **Foster** page copy or form labels        | `foster.jsx`          |
| The **Donate** page wording                    | `donate.jsx`          |
| The **News / In The Press** stories            | `news.jsx`            |
| The **Reality** / "why we exist" page          | `reality.jsx`         |
| The **Privacy** policy text                    | `privacy.jsx`         |
| The homepage hero, sections, testimonials      | `sections.jsx`        |
| Anything in the **top nav bar or footer**      | `shared.jsx`          |
| The **address bar URL → page** mapping         | `vercel.json`         |
| Photos, videos, the founders' photo, logos    | files in `assets/`    |

If you're not sure, hit `Ctrl+F` in the GitHub UI search box at the top of
the repo and search for the exact text that's on the live page. GitHub will
show you the file.

---

## How to edit a page from your browser (no code tools needed)

1. Go to the file on GitHub. Example:
   https://github.com/run2therescue/website-refresh/blob/main/contact.jsx
2. Click the **pencil ✏️ icon** at the top-right of the file ("Edit this file").
3. Change the words you want changed. Be careful with `{` `}` `<` `>` and
   quote marks — they're how the code is held together.
4. Scroll to the bottom. Under **Commit changes**:
   - Write a short title like "Fix typo on Contact page".
   - Pick **"Create a new branch and start a pull request"** (the safer option
     if you're unsure) or **"Commit directly to the main branch"** (if it's
     a tiny, obvious fix).
5. Click **Commit changes**.

If you committed to `main` directly, the site will redeploy automatically in
about 60–90 seconds. If you opened a pull request, see "Preview before
merging" below.

---

## Preview before merging (the safe way)

For anything that's not a tiny typo fix, open a pull request instead of
committing straight to `main`:

1. Make your edit and pick **"Create a new branch and start a pull request"**
   at the commit step (above).
2. GitHub will take you to the pull request page. **Vercel will automatically
   post a comment** with a preview URL — something like
   `website-refresh-git-yourbranch-run2-rescue-s-projects.vercel.app`.
3. Open that preview URL. Check the page. If it looks right, click
   **"Merge pull request"** at the bottom of the PR. The change goes live
   within 60–90 seconds.
4. If it looks wrong, click the pencil again on your branch's file and fix
   it. The preview updates automatically.

When in doubt: **open a pull request, not a direct commit**. Previews are
free and you can throw the branch away if it doesn't work out.

---

## The one technical rule: bump the cache number

After you edit a `.jsx` or `.css` file, browsers may still serve the **old**
version from cache for up to a day. To force everyone to see your update
immediately, you have to "bust" the cache.

In every `.html` file that loads the script you changed, find the line that
looks like:

```html
<script type="text/babel" src="contact.jsx?v=3"></script>
```

…and **add 1 to the number**:

```html
<script type="text/babel" src="contact.jsx?v=4"></script>
```

That's it. Same rule for `.css` files (`styles.css?v=11` → `?v=12`).

**Tiny text edits in `.md` files or in this `TEAM_GUIDE.md` don't need a
cache bump** — they're not loaded by browsers as scripts. The cache bump
rule applies to `.jsx` and `.css` files only.

If you don't bump the number, the site still works, it just takes longer
for the update to reach everyone. Vercel will catch up within a day or two
on its own.

---

## How to add a new photo

1. In the GitHub repo, click into the **`assets/`** folder.
2. Click **"Add file" → "Upload files"** at the top right.
3. Drag your photo in. Use a sensible name like `bonnie-with-dog.jpg`
   (lowercase, dashes instead of spaces, `.jpg` or `.png`).
4. Commit at the bottom of the page.
5. To use the photo somewhere, edit the relevant `.jsx` file and reference
   it as `/assets/bonnie-with-dog.jpg`.

Photos should be under ~2 MB for the page to load fast. If you have a huge
photo, resize it first (any image editor or even macOS Preview can do this).

---

## Forms: how submissions reach the inbox

Every form on the site (Contact, Adoption application, Foster application,
Newsletter signup, Share Your Story) sends through **Web3Forms**, a free
service that forwards form submissions to **info@run2therescue.org**.

If forms stop arriving:
1. Check that the **Web3Forms key** is still set in `shared.jsx` —
   search the file for `WEB3FORMS_KEY`. If it says `PASTE_KEY_HERE`,
   forms are running in demo mode (they show a thank-you but don't send).
2. Get the access key from web3forms.com (the team account) and paste it
   in over `PASTE_KEY_HERE` (keep the quotes around it).
3. Commit. The forms will start sending again.

---

## Where the live site comes from

- The **draft** site is at https://run2-rescuedemo.vercel.app (hosted on Vercel).
- The **live** site at https://run2therescue.org is still the old WordPress
  site for now. The team will switch the domain to the new site when it's
  ready.
- Every push to the `main` branch on GitHub redeploys the draft site
  automatically — there's no separate "publish" step.

---

## When something looks broken after your edit

The most common cause is a stray character (a missing `}`, a backwards
quote mark) that broke the code. The whole page may go blank.

To check, in your browser open the page and press **F12** (or right-click →
Inspect → Console). A red error message usually tells you the file and the
line.

The fastest recovery is to **revert your commit** on GitHub:
1. Go to the repo's commit history.
2. Find your commit, click into it.
3. Click the **"Revert"** button at the top right.
4. Commit the revert. The site restores itself in 60–90 seconds.

Then re-open your original change as a pull request so you can see the
Vercel preview before merging.

---

## Who to ask when you're stuck

- Anything code-shaped → the developer who handled the original build.
- Anything domain/DNS-shaped → whoever holds the `run2therescue.org`
  registrar account.
- Anything Vercel-shaped (deploy failures, env variables) → a teammate
  with access to the **`run2-rescue-s-projects`** team on vercel.com.
