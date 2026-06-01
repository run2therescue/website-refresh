/* Sponsor page — the custom UI (tiers, dog picker) is the pitch; the actual
   monthly sponsorship is completed on Zeffy's hosted form, opened in a new
   tab. Nothing is embedded. */

const { useState: spS } = React;

/* Zeffy hosted sponsorship form (recurring donation). */
const SPONSOR_URL = "https://www.zeffy.com/en-US/donation-form/help-the-abandoned-dogs-come-home";

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

/* How it works + the call to action that opens Zeffy's sponsorship form. */
function SponsorStart() {
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
          <a href={SPONSOR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ fontSize: 15 }}>
            Start your monthly sponsorship <span className="arrow">→</span>
          </a>
        </MagneticS>
        <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 14 }}>
          Secure checkout through Zeffy. Tax deductible. Cancel anytime.
        </p>
        <blockquote className="sp-quote" style={{ marginTop: 32 }}>
          "We cannot do this without you. Together, we can make change happen."
        </blockquote>
      </div>
    </section>
  );
}

/* Picker — dogs come live from Shelterluv; a showcase that points visitors
   back up to the sponsorship call to action. */
function SponsorPicker({ animals, status, selected, setSelected, onChoose }) {
  const dogs = animals.map((a) => ({
    id: a.id,
    name: a.name,
    meta: [a.breed, a.ageGroup].filter(Boolean).join(" · "),
    img: a.cover,
  }));
  const choose = (id) => { setSelected(id); onChoose(); };
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
            These survivors are waiting right now. Pick one to keep in mind, then start your monthly gift.
          </p>
        </div>
        {status === "error" ? (
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 14, marginTop: 24 }}>
            Our live dog list is briefly unavailable — you can still start a sponsorship and we'll match you.
          </p>
        ) : (
          <div className="pick-grid">
            {dogs.map((d) => (
              <button key={d.id} className={`pick-card ${selected === d.id ? "sel" : ""}`} onClick={() => choose(d.id)}>
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
      </div>
    </section>
  );
}

/* "Where your money goes" — the three tiers. Each card links to the
   sponsorship form; the donor chooses any amount there. */
function SponsorTiers() {
  return (
    <section id="tiers" className="section-dark sp-tiers" style={{ padding: "84px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw paw-dark" style={{ top: 40, left: "4%", width: 48, height: 48 }} />
      <PawS className="paw paw-dark" style={{ bottom: 40, right: "5%", width: 56, height: 56 }} />

      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Where your money goes</div>
          <h2 className="display" style={{ fontSize: "clamp(30px, 4.2vw, 52px)", margin: "0 0 12px", color: "#fff" }}>
            Every dollar has a <em style={{ color: "var(--purple-400)" }}>job</em>.
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            97¢ on the dollar goes to the dogs. Pick any amount. Cancel anytime.
          </p>
        </div>

        <div className="sp-tier-grid">
          {TIERS.map(t => (
            <a
              key={t.id}
              href={SPONSOR_URL}
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
                Sponsor at ${t.price}/mo <span className="arrow">→</span>
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
  const [selectedDog, setSelectedDog] = spS(null);

  const scrollToStart = () => {
    const el = document.getElementById("start");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <SponsorHero />
      <SponsorStart />
      <SponsorPicker animals={available} status={status} selected={selectedDog} setSelected={setSelectedDog} onChoose={scrollToStart} />
      <SponsorTiers />
    </>
  );
}

Object.assign(window, { SponsorPage });
