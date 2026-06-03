# Team Handoff — Run 2 The Rescue Website

This document is the runbook for the **R2TR team Claude account** (and any
future team member) to take over the site independently from the personal
account that bootstrapped it.

Read **[CLAUDE.md](CLAUDE.md)** first for the architecture and how things
work. This document covers *access and ownership*: who needs an account
where, and what to do once they have it.

> **Just want to make a content edit?** See [TEAM_GUIDE.md](TEAM_GUIDE.md) — a plain-English
> guide for non-technical teammates editing pages from GitHub.com's web UI.

---

## What's already team-owned (good news)

The infrastructure was set up under R2TR accounts from the start, not a
personal account. So the migration is **access-only** — no servers to move,
no domain to transfer, no data to re-key.

| Asset | Owner | Where |
|---|---|---|
| GitHub repo | `run2therescue` org | https://github.com/run2therescue/website-refresh |
| Vercel project | `run2-rescue-s-projects` team | https://vercel.com/run2-rescue-s-projects/website-refresh |
| Shelterluv API key | R2TR's Shelterluv account | Stored in Vercel env var `SHELTERLUV_API_KEY` |
| Zeffy donation forms | R2TR Zeffy account | https://zeffy.com (uses existing forms) |
| Domain (`run2therescue.org`) | R2TR account (current live site) | Registrar of record |

All the team Claude account needs is **membership** in each of these.

---

## Step-by-step access setup for the R2TR Claude account

### 1. GitHub

The repo is at `github.com/run2therescue/website-refresh`. The R2TR account
needs **Write** access at minimum, **Admin** is safer for long-term ownership.

1. Sign in to GitHub as the R2TR account.
2. From the personal/admin account that currently owns the `run2therescue`
   org, go to **github.com/orgs/run2therescue/people** and **invite** the
   R2TR account. For full continuity, give them the **Owner** role on the
   org (lets them manage all repos, settings, integrations).
3. R2TR account accepts the invite from email.
4. On their machine, configure local git:
   ```bash
   git config --global user.name  "Run 2 The Rescue"
   git config --global user.email "tech@run2therescue.org"   # or whichever
   ```
5. Generate a **Personal Access Token** with `repo` scope:
   - Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token.
6. Clone the repo:
   ```bash
   git clone https://github.com/run2therescue/website-refresh.git
   cd website-refresh
   ```
7. First push will prompt for username + password — paste the PAT as the
   password. macOS will cache it in Keychain.

### 2. Vercel

The project is in the **`run2-rescue-s-projects`** team. Vercel teams
support member invites with role-based access.

1. From the current Vercel team-owner account: **vercel.com/teams/run2-rescue-s-projects/settings/members**.
2. Click **Invite Member**, enter the R2TR account's email, set role to
   **Owner** (or **Member** if you want to limit settings access).
3. R2TR accepts the email invite.
4. They can now see Deployments, Logs, Settings, and **Environment
   Variables** for the project. The `SHELTERLUV_API_KEY` is already set —
   they don't need to touch it.

Because deployment is automatic on `git push` to `main`, the R2TR account
doesn't need to install the Vercel CLI to deploy. GitHub Actions handles it.

### 3. Other services

- **Shelterluv** — already owned by R2TR. If the R2TR Claude account needs
  the admin login, ask whoever holds the credentials.
- **Web3Forms** — not yet set up. When ready, sign up at **web3forms.com**
  with whichever R2TR email should receive adopter "Share Your Story"
  submissions. Paste the access key into `sections.jsx` (see CLAUDE.md →
  Share Your Story). Same provider can be used for the Contact, Adopt,
  Donate, and Sponsor demo forms when you're ready to wire them.
- **Zeffy** — already owned. The Donate / Sponsor pages link out to existing
  Zeffy forms (slugs documented in CLAUDE.md).
- **Domain** — when you cut over from `run2-rescuedemo.vercel.app` to
  `run2therescue.org`, the canonical URLs in every HTML's `<link rel="canonical">`,
  the JSON-LD `url` fields, `sitemap.xml`, and `robots.txt` should be swapped
  to the new domain. It's a global find/replace on `run2-rescuedemo.vercel.app`.

### 4. Aman's account can step out

Once the R2TR account has Owner on the GitHub org and Owner on the Vercel
team, the personal account (`amangarg2310`) can be removed from both — the
R2TR account has full control.

---

## What's in this repo

- **`CLAUDE.md`** — architecture, file map, integrations, env vars, security,
  brand voice. Start here for any code change.
- **`DEPLOY.md`** — short pointer; pushes auto-deploy.
- **`HANDOFF.md`** (this file) — team access and ownership.
- **`docs/PROJECT_BRIEF.md`** — original brand brief and voice direction.
- **`docs/IMAGE_AUDIT.md`** and **`docs/IMAGE_PLACEMENT_PROPOSAL.md`** —
  asset selection notes from the redesign.
- **`docs/Run2Rescue_Website_Checklist.docx`** — the original launch
  checklist.
- All code, CSS, HTML, JSX, the Vercel serverless function, the static
  assets, `vercel.json`, `sitemap.xml`, `robots.txt`.

What's *not* in the repo by design:
- `node_modules/` (none — no build step)
- `.env*` files (secrets live in Vercel)
- `Run2theRescue.zip` (~51 MB legacy site export — kept locally only)

---

## A note on "skills" and Claude history

The user mentioned wanting the "skills" and conversation history available
in the repo. Two things worth clarifying:

- **Claude skills** are installed locally per-user in the Claude desktop /
  Code application — they aren't files that travel in a project repo. The
  R2TR Claude account will install whichever skills it wants in its own
  Claude installation. Most of the work on this site was done with general
  reasoning, not specific skills.
- **Conversation history** lives in the user's Claude account, not on disk.
  CLAUDE.md, this HANDOFF.md, and the `docs/` folder are the project's
  *durable* memory — they capture every consequential decision, the brand
  voice, the integration choices, and the trade-offs. The new account can
  read those and pick up right where the previous account left off.

Anything genuinely important from past conversations has been distilled
into CLAUDE.md (architecture, integrations, conventions, security) and the
`docs/` folder (brief, voice, audits).
