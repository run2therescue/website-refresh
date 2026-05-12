/* Sponsor page components */

const { useState: spS, useEffect: spE } = React;

// Three tiers — these are now both the "impact" cards AND the sponsorship choices.
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

/* How It Works + Start Sponsoring form */
function SponsorStart({ selectedDogName, onSubmit }) {
  const [form, setForm] = spS({ first: "", last: "", email: "", dog: "" });
  spE(() => {
    if (selectedDogName && selectedDogName !== form.dog) {
      setForm(f => ({ ...f, dog: selectedDogName }));
    }
  }, [selectedDogName]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <section id="start" className="sponsor-start">
      <PawS className="paw paw-light" style={{ bottom: 24, right: "4%", width: 56, height: 56 }} />
      <div className="wrap sp-start-grid">
        {/* LEFT — How it works */}
        <div className="sp-start-copy">
          <div className="sp-rule">
            <div className="eyebrow-dark" style={{ marginBottom: 16 }}>How it works</div>
            <p className="sp-body">
              By choosing to become a <strong>Sponsor Angel</strong>, you're making a commitment to support the monthly care of a hopeful survivor. You can also become a <strong>Flight Sponsor</strong> and help cover the cost of bringing a waiting dog home.
            </p>
            <p className="sp-body">
              Your monthly gift can be any amount you choose. Big or small, every dollar goes directly toward your sponsor dog's care.
            </p>
            <p className="sp-body">
              You'll receive regular updates on your chosen dog as you continue your monthly support.
            </p>
          </div>

          <blockquote className="sp-quote">
            "We cannot do this without you. Together, we can make change happen."
          </blockquote>

          <a href="#tiers" className="btn btn-accent sp-cta-wide">
            Sponsor a hopeful survivor <span className="arrow">→</span>
          </a>
        </div>

        {/* RIGHT — Form */}
        <div className="sp-form-card">
          <div className="eyebrow-dark" style={{ marginBottom: 10 }}>Choose your dog</div>
          <h2 className="display sp-form-title">Start Sponsoring</h2>

          <form onSubmit={submit} className="sp-form">
            <div className="sp-form-row">
              <div>
                <label className="f-label">First name <span className="req">*</span></label>
                <input required className="f-input" value={form.first} onChange={e => setForm({ ...form, first: e.target.value })} />
              </div>
              <div>
                <label className="f-label">Last name <span className="req">*</span></label>
                <input required className="f-input" value={form.last} onChange={e => setForm({ ...form, last: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="f-label">Email <span className="req">*</span></label>
              <input required type="email" className="f-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label className="f-label">Chosen dog <span className="req">*</span></label>
              <input required className="f-input" placeholder="Pick one below, or type 'any dog'" value={form.dog} onChange={e => setForm({ ...form, dog: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-accent sp-form-submit">
              Submit chosen dog
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SponsorPicker({ selected, setSelected }) {
  const dogs = [
    { id: "willa", name: "Willa", breed: "Lab Mix · Adult", img: IMG_BANK.dog5 },
    { id: "luna", name: "Luna", breed: "Terrier Mix · Young", img: IMG_BANK.dog3 },
    { id: "otis", name: "Otis", breed: "Beagle Mix · Young", img: IMG_BANK.dog8 },
    { id: "bao", name: "Bao", breed: "Chow Mix · Adult", img: IMG_BANK.dog10 },
    { id: "mochi", name: "Mochi", breed: "Pom Mix · Senior", img: IMG_BANK.dog12 },
    { id: "daisy", name: "Daisy", breed: "Poodle Mix · Senior", img: IMG_BANK.dog6 },
    { id: "any", name: "Any dog", breed: "We'll match you", img: IMG_BANK.dog1 },
    { id: "rocky", name: "Rocky", breed: "Husky Mix · Adult", img: IMG_BANK.dog7 },
  ];
  return (
    <section id="pick" className="sponsor-picker">
      <PawS className="paw paw-light" style={{ top: 40, right: "5%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Optional — Pick a dog</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", margin: "0 0 12px", color: "var(--ink)" }}>
            Sponsor <em style={{ color: "var(--purple-600)" }}>someone specific</em>, or let us match you.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>
            You'll get updates about the dog you choose. Most sponsors love watching their story unfold.
          </p>
        </div>
        <div className="pick-grid">
          {dogs.map(d => (
            <button key={d.id} className={`pick-card ${selected === d.id ? "sel" : ""}`} onClick={() => setSelected(d.id)}>
              <div className="img"><ImgS src={d.img} alt={d.name} /></div>
              <div className="body">
                <div className="name">{d.name}</div>
                <div className="meta">{d.breed}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Combined: dark "Every dollar has a job" + clickable 3-tier cards */
function SponsorTiers({ onPick }) {
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
            97¢ of every dollar goes directly to dogs. The other 3¢ keeps the lights on. Pick a tier — cancel anytime.
          </p>
        </div>

        <div className="sp-tier-grid">
          {TIERS.map(t => (
            <button
              key={t.id}
              className={`sp-tier ${t.featured ? "featured" : ""} reveal`}
              onClick={() => onPick(t)}
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorCheckout({ tier, dog, onClose }) {
  const [step, setStep] = spS("form");
  const [form, setForm] = spS({ name: "", email: "" });

  spE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const submit = (e) => { e.preventDefault(); setStep("done"); };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 24, maxWidth: 520, width: "100%",
        padding: "32px 36px", position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          width: 32, height: 32, borderRadius: "50%",
          background: "var(--lav-100)", color: "var(--ink)",
          display: "grid", placeItems: "center", fontSize: 14,
        }} aria-label="Close">✕</button>

        {step === "form" && (
          <form onSubmit={submit}>
            <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Become a sponsor</div>
            <h2 className="display" style={{ fontSize: 32, margin: "0 0 8px", color: "var(--ink)", lineHeight: 1.15 }}>
              ${tier.price}/mo — {tier.name} tier
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 20px" }}>
              {dog ? <>Supporting <strong style={{ color: "var(--ink)" }}>{dog}</strong>. </> : ""}{tier.desc}
            </p>

            <div style={{ marginBottom: 14 }}>
              <label className="f-label">Your name <span style={{ color: "var(--purple-600)" }}>*</span></label>
              <input required className="f-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="f-label">Email <span style={{ color: "var(--purple-600)" }}>*</span></label>
              <input required type="email" className="f-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-accent" style={{ width: "100%", justifyContent: "center" }}>
              Start ${tier.price}/mo sponsorship <span className="arrow">→</span>
            </button>
            <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: "14px 0 0", lineHeight: 1.5 }}>
              Secure checkout on the next step. Cancel anytime.
            </p>
          </form>
        )}

        {step === "done" && (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--purple-soft)", display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 28, color: "var(--purple-700)" }}>♥</div>
            <h2 className="display" style={{ fontSize: 28, margin: "0 0 10px", color: "var(--ink)" }}>Thank you, {form.name || "friend"}!</h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
              You're now a <strong>{tier.name}</strong> sponsor. We'll email you a welcome packet and your first update within 7 days.
            </p>
            <button className="btn btn-accent" onClick={onClose}>Back to sponsors</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SponsorPage() {
  const [selectedDog, setSelectedDog] = spS(null);
  const [checkoutTier, setCheckoutTier] = spS(null);
  const [startThanks, setStartThanks] = spS(false);

  const DOG_MAP = { any: "Any dog", willa: "Willa", luna: "Luna", otis: "Otis", bao: "Bao", mochi: "Mochi", daisy: "Daisy", rocky: "Rocky" };
  const dogName = selectedDog ? DOG_MAP[selectedDog] : null;

  const handleStartSubmit = (form) => {
    // Jump to tier section so they pick an amount.
    setStartThanks(true);
    const el = document.getElementById("tiers");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <SponsorHero />
      <SponsorStart selectedDogName={dogName} onSubmit={handleStartSubmit} />
      <SponsorPicker selected={selectedDog} setSelected={setSelectedDog} />
      <SponsorTiers onPick={setCheckoutTier} />
      {checkoutTier && <SponsorCheckout tier={checkoutTier} dog={dogName} onClose={() => setCheckoutTier(null)} />}
    </>
  );
}

Object.assign(window, { SponsorPage });
