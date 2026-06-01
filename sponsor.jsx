/* Sponsor page — the custom UI (tiers, dog picker) is the pitch; the actual
   monthly sponsorship is completed on Zeffy's hosted form, opened in a new
   tab. Nothing is embedded.

   Dog attribution: when a donor picks a dog (e.g. Otto), the Zeffy URL is
   tagged with `utm_content=otto-<id>`. Zeffy preserves UTM tags on every
   payment and surfaces them in dashboard exports, so R2R can reconcile each
   monthly gift back to the dog the donor selected — without any Zeffy form
   customization required. Amount pre-fills via `?amount=`. */

const { useState: spS } = React;

/* Zeffy hosted sponsorship form (recurring donation). */
const SPONSOR_URL = "https://www.zeffy.com/en-US/donation-form/help-the-abandoned-dogs-come-home";

/* Lower-case, hyphen-safe slug for utm_content. Strips combining diacritical
   marks (U+0300–U+036F) so names like "Léa" become "lea". */
const slugify = (s) => String(s || "")
  .toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* Builds a Zeffy URL tagged for attribution. Both args are optional — if no
   dog is selected, the URL is still a valid generic sponsorship link. */
function buildSponsorUrl(dog, amount) {
  const u = new URL(SPONSOR_URL);
  u.searchParams.set("utm_source", "r2r-site");
  u.searchParams.set("utm_campaign", "sponsor");
  if (dog && dog.slug && dog.id) {
    u.searchParams.set("utm_content", `${dog.slug}-${dog.id}`);
  }
  if (amount) u.searchParams.set("amount", String(amount));
  return u.toString();
}

// Three tiers — shown as "where your money goes", not a checkout.
const TIERS = [
  {
    id: "paw", name: "Paw", price: 15,
    headline: "feeds a dog for a week",
    desc: "Premium kibble + supplements to rebuild strength after rescue.",
    includes: ["Monthly photo update", "Sticker pack", "Name on our wall"],
  },
  {
    id: "heart", name: "Heart", price: 35,
    headline: "covers vaccines & meds",
    desc: "Full vaccine series, flea/tick, and heartworm prevention for one survivor.",
    includes: ["Everything in Paw", "Quarterly handwritten letter", "Adoption day photo"],
    featured: true,
  },
  {
    id: "lifeline", name: "Lifeline", price: 150,
    headline: "flies a dog home",
    desc: "An international flight from Seoul or Shanghai to JFK or LAX.",
    includes: ["Quarterly foster home visit video", "Live video call with your dog", "Recognition on our homepage"],
  },
];

function SponsorHero() {
  return (
    <header className="sponsor-hero">
      <PawS className="paw" style={{ top: 80, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.12 }} />
      <PawS className="paw" style={{ bottom: 60, right: "8%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ top: 140, right: "22%", width: 36, height: 36, color: "#fff", opacity: 0.08 }} />

      <div className="wrap" style={{ position: "relative", textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}>✦ Sponsor a Survivor</div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 7vw, 96px)", margin: "0 0 20px", color: "#fff" }}>
          Be a <em>lifeline</em> while they wait.
        </h1>
        <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto 32px", maxWidth: 580, lineHeight: 1.6 }}>
          Not every dog finds their family on day one. Sponsoring covers the food, vet care, and foster costs that keep them healthy and hopeful until they do.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <MagneticS><a href="#start" className="btn btn-accent">Start sponsoring <span className="arrow">→</span></a></MagneticS>
          <a href="#tiers" className="btn btn-outline-light">See where money goes</a>
        </div>
      </div>
    </header>
  );
}

/* How it works + the call to action that opens Zeffy's sponsorship form.
   When a dog is selected, the CTA reads "Sponsor <Name> monthly" and the
   Zeffy URL is tagged so we can attribute the gift on our side. */
function SponsorStart({ selectedDog }) {
  const ctaHref = buildSponsorUrl(selectedDog, null);
  const ctaLabel = selectedDog
    ? <>Sponsor {selectedDog.name} monthly <span className="arrow">→</span></>
    : <>Start your monthly sponsorship <span className="arrow">→</span></>;
  return (
    <section id="start" className="sponsor-start">
      <PawS className="paw paw-light" style={{ bottom: 24, right: "4%", width: 56, height: 56 }} />
      <div className="wrap" style={{ maxWidth: 680, textAlign: "center" }}>
        <div className="eyebrow-dark" style={{ marginBottom: 14, justifyContent: "center" }}>How it works</div>
        <h2 className="display" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", margin: "0 0 14px", color: "var(--ink)" }}>
          Become a Sponsor Angel
        </h2>
        <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 auto 26px", maxWidth: 540 }}>
          Pick any monthly amount. It goes straight to your survivor's food, vet care, and foster costs. You'll get updates as their story unfolds. Cancel anytime.
        </p>
        <MagneticS>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ fontSize: 15 }}>
            {ctaLabel}
          </a>
        </MagneticS>
        <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 14 }}>
          {selectedDog
            ? <>Your gift will be tagged for <strong style={{ color: "var(--purple-700)" }}>{selectedDog.name}</strong> so we route it to him on our end.</>
            : <>Secure checkout through Zeffy. Tax deductible. Cancel anytime.</>}
        </p>
        <blockquote className="sp-quote" style={{ marginTop: 32 }}>
          "We cannot do this without you. Together, we can make change happen."
        </blockquote>
      </div>
    </section>
  );
}

/* Picker — dogs come live from Shelterluv. Selecting a dog highlights its
   card and reveals an inline confirmation panel directly below the grid,
   wired straight to a Zeffy URL tagged for that specific dog. Picking a dog
   is encouraged but not required: the page works fine without a selection. */
function SponsorPicker({ animals, status, selectedDog, setSelectedDog }) {
  const dogs = animals.map((a) => ({
    id: a.id,
    name: a.name,
    slug: slugify(a.name),
    meta: [a.breed, a.ageGroup].filter(Boolean).join(" · "),
    img: a.cover,
  }));
  const choose = (d) => {
    // Toggle off if the user re-clicks the already-selected card.
    if (selectedDog && selectedDog.id === d.id) { setSelectedDog(null); return; }
    setSelectedDog({ id: d.id, name: d.name, slug: d.slug });
  };
  const scrollToTiers = () => {
    const el = document.getElementById("tiers");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <section id="pick" className="sponsor-picker">
      <PawS className="paw paw-light" style={{ top: 40, right: "5%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Meet the survivors you'd support</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", margin: "0 0 12px", color: "var(--ink)" }}>
            Every sponsorship reaches a <em style={{ color: "var(--purple-600)" }}>real dog</em>.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>
            Tap a survivor below to pair your monthly gift with them. Your gift goes to your dog on our end.
          </p>
        </div>
        {status === "error" ? (
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 14, marginTop: 24 }}>
            Our live dog list is briefly unavailable — you can still start a sponsorship and we'll match you.
          </p>
        ) : (
          <div className="pick-grid">
            {dogs.map((d) => (
              <button key={d.id}
                className={`pick-card ${selectedDog && selectedDog.id === d.id ? "sel" : ""}`}
                aria-pressed={!!(selectedDog && selectedDog.id === d.id)}
                onClick={() => choose(d)}>
                <div className="img">
                  {d.img
                    ? <ImgS src={d.img} alt={d.name} />
                    : <div style={{ width: "100%", height: "100%", background: "var(--lav-200)" }} />}
                </div>
                <div className="body">
                  <div className="name">{d.name}</div>
                  <div className="meta">{d.meta}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {status === "loading" && (
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 13, marginTop: 16 }}>Loading our survivors…</p>
        )}

        {/* Inline confirmation — appears below the grid the moment a dog is
            picked. Primary action goes straight to Zeffy at the featured tier;
            secondary scrolls to all tiers for amount choice. */}
        {selectedDog && (
          <div className="sp-pick-confirm" role="region" aria-label={`Sponsoring ${selectedDog.name}`}>
            <div className="sp-pc-left">
              <span className="sp-pc-check" aria-hidden="true">✓</span>
              <div>
                <div className="sp-pc-eyebrow">Sponsoring</div>
                <div className="sp-pc-name">{selectedDog.name}</div>
              </div>
            </div>
            <div className="sp-pc-actions">
              <a href={buildSponsorUrl(selectedDog, 35)} target="_blank" rel="noopener noreferrer"
                 className="btn btn-accent sp-pc-primary">
                Sponsor {selectedDog.name} at $35/mo <span className="arrow">→</span>
              </a>
              <button type="button" onClick={scrollToTiers} className="sp-pc-secondary">
                Choose a different amount ↓
              </button>
            </div>
            <button type="button" onClick={() => setSelectedDog(null)}
                    className="sp-pc-clear" aria-label="Clear selection">×</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* "Where your money goes" — the three tiers. Each card links to the
   sponsorship form; the donor chooses any amount there. When a dog is
   selected, the tier buttons read "Sponsor <Name> at $X/mo" and the Zeffy
   URL is tagged with the dog's slug + id. */
function SponsorTiers({ selectedDog }) {
  return (
    <section id="tiers" className="section-dark sp-tiers" style={{ padding: "84px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw paw-dark" style={{ top: 40, left: "4%", width: 48, height: 48 }} />
      <PawS className="paw paw-dark" style={{ bottom: 40, right: "5%", width: 56, height: 56 }} />

      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Where your money goes</div>
          <h2 className="display" style={{ fontSize: "clamp(30px, 4.2vw, 52px)", margin: "0 0 12px", color: "#fff" }}>
            {selectedDog
              ? <>Pick a monthly amount for <em style={{ color: "var(--purple-400)" }}>{selectedDog.name}</em>.</>
              : <>Every dollar has a <em style={{ color: "var(--purple-400)" }}>job</em>.</>}
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            97¢ on the dollar goes to the dogs. Pick any amount. Cancel anytime.
          </p>
        </div>

        <div className="sp-tier-grid">
          {TIERS.map(t => (
            <a
              key={t.id}
              href={buildSponsorUrl(selectedDog, t.price)}
              target="_blank"
              rel="noopener noreferrer"
              className={`sp-tier ${t.featured ? "featured" : ""} reveal`}
            >
              {t.featured && <span className="sp-tier-badge">Most popular</span>}

              <div className="sp-tier-top">
                <div className="sp-tier-price">
                  <span className="amt">${t.price}</span>
                  <span className="per">/mo</span>
                </div>
                <div className="sp-tier-headline">{t.headline}</div>
                <p className="sp-tier-desc">{t.desc}</p>
              </div>

              <div className="sp-tier-divider" />

              <ul className="sp-tier-includes">
                {t.includes.map(i => <li key={i}>{i}</li>)}
              </ul>

              <span className="btn btn-accent sp-tier-btn">
                {selectedDog
                  ? <>Sponsor {selectedDog.name} at ${t.price}/mo <span className="arrow">→</span></>
                  : <>Sponsor at ${t.price}/mo <span className="arrow">→</span></>}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorPage() {
  const { status, animals } = useAnimalsS();
  const available = animals.filter((a) => a.available !== false);
  // selectedDog: null | { id, name, slug } — carried through to every CTA on
  // the page so the donor's chosen survivor is reflected and tagged in Zeffy.
  const [selectedDog, setSelectedDog] = spS(null);

  return (
    <>
      <SponsorHero />
      <SponsorStart selectedDog={selectedDog} />
      <SponsorPicker animals={available} status={status}
        selectedDog={selectedDog} setSelectedDog={setSelectedDog} />
      <SponsorTiers selectedDog={selectedDog} />
    </>
  );
}

Object.assign(window, { SponsorPage });
