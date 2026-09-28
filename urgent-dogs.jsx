/* "Dogs who need help right now" — the urgent-appeal section.
 * ---------------------------------------------------------------------------
 * ONE component, rendered on two pages:
 *   • index.html  → <UrgentDogs variant="dark" />  (between Press and Mission)
 *   • donate.jsx  → <UrgentDogs variant="light" /> (under the giving options)
 *
 * TO CHANGE WHICH DOGS APPEAR: edit the DOGS array below. Order matters — the
 * first dog is the one most people will act on, so put the most urgent first.
 * Keep it to TWO. A third card turns this into a directory and the urgency
 * goes flat; if a third dog needs help, replace the one closest to funded.
 * A new dog also needs an entry in api/campaigns.js so its progress bar works.
 *
 * TO REMOVE THE SECTION ENTIRELY: delete <UrgentDogs .../> from index.html and
 * from DonatePage in donate.jsx. Nothing else references this file.
 *
 * LIVE TOTALS: each card asks /api/campaigns (a server-side proxy to Zeffy,
 * cached 5 min) for how much that dog has raised, and shows:
 *   • goal met        → full bar, the dog's `metGoal` copy, button still live
 *                       (extra gifts still reach him)
 *   • otherwise       → a live progress bar in place of the goal line
 *   • API unreachable → the plain goal line. The card never breaks.
 * URGENT_BAR_MIN_PCT can hide the bar until a dog reaches a share of its goal
 * (a nearly empty bar can read as "nobody is giving"). It is 0 by choice: the
 * bar always shows.
 * `metGoal` holds a dog's copy for the goal-met state. That state switches on
 * by itself when the live total reaches the goal, or by hand with
 * `goalMet: true` (a safety net, so it holds even if Zeffy is unreachable).
 *
 * DON'T HARD-CODE A RAISED-SO-FAR FIGURE anywhere in here. It goes stale the
 * moment someone donates; the live total handles it.
 *
 * Photos come from the Zeffy campaigns and are served through Vercel's image
 * optimizer (res.cloudinary.com is allow-listed in vercel.json), so they are
 * resized, same-origin, CDN-cached, and need no change to the site's CSP.
 *
 * Clicks are already measured: analytics.js fires donate_outbound for every
 * zeffy.com link, and utm_content arrives in GA4 as `dog` — so each dog and
 * each placement is separable without any new tracking code. */

const DOGS = [
  {
    id: "beethoven",
    name: "Beethoven",
    url: "https://www.zeffy.com/en-US/donation-form/help-save-beethoven",
    photo: "https://res.cloudinary.com/hxn9dbuhd/image/upload/f_jpg,c_limit,w_1000,q_auto/v1790604774/organizations/2/1/0/2/210276f5-bea9-43f5-88d4-7b17e935a6ca/8f66a9b9-de8f-443f-9a58-d942daf66b5b.png",
    alt: "Beethoven, an eight-month-old golden retriever puppy, resting on a blanket with a hand on his head",
    headline: "Beethoven needs brain surgery",
    body: "He is eight months old. He was dumped outside the shelter in the middle of massive seizures, and an MRI showed swelling pressing on the nerves in his brain, caused by a blow to the head. It has left him blind and deaf. Surgery to relieve that pressure is his chance.",
    goal: 10000,
    cta: "Help Save Beethoven",
  },
  {
    id: "mickey",
    name: "Mickey",
    url: "https://www.zeffy.com/en-US/donation-form/helpsave-mickey",
    photo: "https://res.cloudinary.com/hxn9dbuhd/image/upload/f_jpg,c_limit,w_1000,q_auto/v1789314535/organizations/2/1/0/2/210276f5-bea9-43f5-88d4-7b17e935a6ca/d0087642-e5ec-4732-90d2-136873dfec23.png",
    alt: "Mickey, a 13-year-old golden retriever, looking up at the camera",
    headline: "Mickey is almost through it",
    body: "Mickey survived the dog meat trade, and at 13 he has spent months in hospital being treated for Leishmaniasis. He is recovering, and his fund covers the testing and care that get him the rest of the way home.",
    goal: 5000,
    cta: "Give to Mickey",
    goalMet: true,
    metGoal: {
      headline: "Mickey's goal is met",
      body: "His treatment is covered, and he is recovering. Thank you to everyone who gave. Gifts still go to his ongoing care, and our work continues for Beethoven.",
    },
  },
];

const URGENT_BAR_MIN_PCT = 0;

/* Vercel image optimizer: same-origin URL, cached for a day (vercel.json). */
function urgentPhoto(src, w) {
  return "/_vercel/image?url=" + encodeURIComponent(src) + "&w=" + w + "&q=75";
}

/* utm_content is what GA4 stores as `dog`, so it carries BOTH the dog and the
   placement — that is how we tell a homepage click from a donate-page one. */
function urgentLink(dog, placement) {
  return dog.url + "?utm_source=r2tr_site&utm_medium=" + placement +
    "&utm_campaign=" + dog.id + "&utm_content=" + dog.id + "-" + placement;
}

function urgentMoney(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/* One request per page view; the CDN answers from cache. Any failure leaves
   `totals` null and every card falls back to its static goal line. */
function useUrgentTotals() {
  const [totals, setTotals] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    fetch("/api/campaigns")
      .then(r => (r.ok ? r.json() : null))
      .then(j => { if (live && j && j.campaigns) setTotals(j.campaigns); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return totals;
}

function UrgentBar({ dog, raised, goal, met }) {
  const pct = met ? 100 : Math.max(0, Math.min(100, Math.round((raised / goal) * 100)));
  return (
    <div className="udogs-progress">
      <div className="udogs-progress-label">
        <span><b>{urgentMoney(raised)} raised</b>{met ? " · Goal met" : " of " + urgentMoney(goal)}</span>
        {!met && <span className="udogs-progress-pct">{pct}%</span>}
      </div>
      <div className="udogs-track" role="progressbar" aria-label={dog.name + " fund progress"}
        aria-valuemin={0} aria-valuemax={goal} aria-valuenow={Math.min(raised, goal)}
        aria-valuetext={urgentMoney(raised) + " raised of " + urgentMoney(goal)}>
        <div className="udogs-fill" style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}

function UrgentDogs({ variant }) {
  const dark = variant === "dark";
  const placement = dark ? "homepage" : "donate_page";
  const totals = useUrgentTotals();
  return (
    <section className="udogs" data-variant={dark ? "dark" : "light"} aria-labelledby="udogs-title">
      <style>{`
        .udogs { padding: 56px 0; }
        .udogs[data-variant="dark"] { background: #1a1025; }
        .udogs[data-variant="light"] { background: var(--lav-50); }
        .udogs-head { max-width: 760px; margin: 0 auto 30px; text-align: center; }
        .udogs-head h2 { margin: 0; line-height: 1.12; font-size: clamp(26px, 3.4vw, 40px); }
        .udogs[data-variant="dark"] .udogs-head h2 { color: #fff; }
        .udogs[data-variant="light"] .udogs-head h2 { color: var(--ink); }
        .udogs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;
          max-width: 980px; margin: 0 auto; align-items: stretch; }
        .udogs-card { display: flex; flex-direction: column; border-radius: 22px; overflow: hidden; }
        .udogs[data-variant="dark"] .udogs-card { background: oklch(0.22 0.04 310 / 0.6);
          border: 1px solid var(--line-dark); }
        .udogs[data-variant="light"] .udogs-card { background: #fff; border: 1px solid var(--lav-200); }
        .udogs-photo { aspect-ratio: 4 / 3; overflow: hidden; background: oklch(0.26 0.05 310); }
        .udogs-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .udogs-body { padding: 22px 24px 24px; display: flex; flex-direction: column; flex: 1; }
        .udogs-card h3 { font-family: var(--font-display); font-weight: 600; margin: 0 0 10px;
          font-size: 22px; line-height: 1.2; }
        .udogs[data-variant="dark"] .udogs-card h3 { color: #fff; }
        .udogs[data-variant="light"] .udogs-card h3 { color: var(--ink); }
        .udogs-text { font-size: 14.5px; line-height: 1.6; margin: 0 0 14px; }
        .udogs[data-variant="dark"] .udogs-text { color: var(--on-dark-2); }
        .udogs[data-variant="light"] .udogs-text { color: var(--ink-2); }
        .udogs-meta { font-size: 13px; margin: 0 0 18px; }
        .udogs[data-variant="dark"] .udogs-meta { color: var(--on-dark-3); }
        .udogs[data-variant="light"] .udogs-meta { color: var(--ink-3); }
        .udogs-meta b { font-weight: 600; }
        .udogs[data-variant="dark"] .udogs-meta b { color: #fff; }
        .udogs[data-variant="light"] .udogs-meta b { color: var(--ink); }
        .udogs-progress { margin: 0 0 20px; }
        .udogs-progress-label { display: flex; justify-content: space-between; align-items: baseline;
          gap: 12px; font-size: 13px; margin: 0 0 8px; }
        .udogs[data-variant="dark"] .udogs-progress-label { color: var(--on-dark-3); }
        .udogs[data-variant="light"] .udogs-progress-label { color: var(--ink-3); }
        .udogs-progress-label b { font-weight: 600; }
        .udogs[data-variant="dark"] .udogs-progress-label b { color: #fff; }
        .udogs[data-variant="light"] .udogs-progress-label b { color: var(--ink); }
        .udogs-progress-pct { font-variant-numeric: tabular-nums; }
        .udogs-track { height: 8px; border-radius: 999px; overflow: hidden; }
        .udogs[data-variant="dark"] .udogs-track { background: oklch(0.32 0.05 310); }
        .udogs[data-variant="light"] .udogs-track { background: var(--lav-100); }
        .udogs-fill { height: 100%; border-radius: 999px; transform-origin: left center;
          animation: udogs-grow 900ms cubic-bezier(.2,.7,.2,1) both; }
        .udogs[data-variant="dark"] .udogs-fill { background: var(--purple-400); }
        .udogs[data-variant="light"] .udogs-fill { background: var(--purple-500); }
        @keyframes udogs-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) { .udogs-fill { animation: none; } }
        .udogs-cta { margin-top: auto; align-self: flex-start; }
        .udogs-foot { text-align: center; font-size: 12.5px; margin: 24px 0 0; }
        .udogs[data-variant="dark"] .udogs-foot { color: var(--on-dark-3); }
        .udogs[data-variant="light"] .udogs-foot { color: var(--ink-3); }
        @media (max-width: 760px) {
          .udogs { padding: 44px 0; }
          .udogs-grid { grid-template-columns: 1fr; gap: 20px; }
          .udogs-photo { aspect-ratio: 16 / 10; }
          .udogs-cta { align-self: stretch; text-align: center; }
        }
      `}</style>
      <div className="wrap">
        <div className="udogs-head">
          <h2 id="udogs-title" className="display">
            Dogs who need help <em>right now.</em>
          </h2>
        </div>

        <div className="udogs-grid">
          {DOGS.map(dog => {
            const t = totals && totals[dog.id];
            const goal = (t && t.goal) || dog.goal;
            const raised = t ? t.raised : null;
            const met = !!dog.goalMet || (raised != null && goal > 0 && raised >= goal);
            const copy = met && dog.metGoal ? dog.metGoal : dog;
            const showBar = met || (raised != null && goal > 0 && (raised / goal) * 100 >= URGENT_BAR_MIN_PCT);
            return (
              <article key={dog.id} className="udogs-card" data-goal-met={met ? "true" : undefined}>
                <div className="udogs-photo">
                  {/* NOT loading="lazy". These cards are rendered by React after the
                      page's load event, and Chrome then never re-evaluates the lazy
                      images on scroll — they stayed blank all the way down the page
                      in testing. Two ~50KB photos below the fold are cheap; a blank
                      photo on the main appeal is not. decoding="async" keeps them
                      off the critical path. */}
                  <img src={urgentPhoto(dog.photo, 640)} alt={dog.alt} width="640" height="480" decoding="async" />
                </div>
                <div className="udogs-body">
                  <h3>{copy.headline}</h3>
                  <p className="udogs-text">{copy.body}</p>
                  {showBar
                    ? <UrgentBar dog={dog} raised={raised != null ? raised : goal} goal={goal} met={met} />
                    : <p className="udogs-meta"><b>{urgentMoney(goal)} goal</b> · 100% of your gift reaches him. Zeffy charges no fees.</p>}
                  <a href={urgentLink(dog, placement)} target="_blank" rel="noopener noreferrer"
                    className="btn btn-accent udogs-cta">
                    {dog.cta} <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="udogs-foot">Run 2 The Rescue is a 501(c)(3) nonprofit. Every gift is tax deductible.</p>
      </div>
    </section>
  );
}

Object.assign(window, { UrgentDogs, urgentPhoto, urgentLink });
