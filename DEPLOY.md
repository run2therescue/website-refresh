# Deploy

This site auto-deploys to **Vercel** on every push to the `main` branch
(`.github/workflows/deploy.yml`). No manual deploy step is needed — just:

```bash
git add -A && git commit -m "your message" && git push
```

Vercel runs `vercel build` + `vercel deploy --prebuilt --prod` and publishes to
https://run2-rescuedemo.vercel.app

For full project context — architecture, file map, integrations, environment
variables, and conventions — see **[CLAUDE.md](CLAUDE.md)**.
