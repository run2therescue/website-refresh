/* Donate page */
const { useState: dUS } = React;

function DonatePage() {
  const [amount, setAmount] = dUS(75);
  const [custom, setCustom] = dUS("");
  const [freq, setFreq] = dUS("monthly");
  const [intent, setIntent] = dUS(null); // "medical" | "transport" | null

  const effective = custom ? Number(custom) : amount;
  const mealsPerDollar = 3.2;
  const meals = Math.round(effective * mealsPerDollar);

  const amounts = freq === "monthly"
    ? [
        { v: 25, what: "1 week of food for a survivor" },
        { v: 50, what: "One vet visit + vaccines" },
        { v: 75, what: "Half a month of foster care", highlight: true },
        { v: 150, what: "Full transport from Asia" },
        { v: 300, what: "Life-saving surgery share" },
        { v: 500, what: "Full rescue sponsorship" },
      ]
    : [
        { v: 50, what: "Feed a kennel for a week" },
        { v: 150, what: "Spay/neuter one survivor" },
        { v: 300, what: "Medical clearance workup", highlight: true },
        { v: 500, what: "International transport" },
        { v: 1000, what: "Fund a full rescue mission" },
        { v: 2500, what: "Underwrite a monthly intake" },
      ];

  const scrollToGive = () => {
    const el = document.getElementById("give");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <DonateHero />
      <MissionSection />

      <section id="give" style={{ background: "var(--plum-900)", color: "#fff", padding: "80px 0" }}>
        <div className="wrap">
          <div className="donate-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Give</div>
              <h2 className="display" style={{ fontSize: "clamp(34px, 4.2vw, 56px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
                Pick an amount. <em>Change a life.</em>
              </h2>
              <p style={{ color: "var(--on-dark-2)", fontSize: 16, margin: "0 0 32px", lineHeight: 1.6, maxWidth: 520 }}>
                {intent === "medical" && "You're giving to urgent medical care. "}
                {intent === "transport" && "You're giving to transport home. "}
                Every dollar goes directly to rescue, medical, and foster care. We cover overhead separately with a small board grant.
              </p>

              <div style={{ marginBottom: 24 }}>
                <div className="freq-toggle">
                  <button aria-pressed={freq === "monthly"} onClick={() => setFreq("monthly")}>Monthly</button>
                  <button aria-pressed={freq === "oneTime"} onClick={() => setFreq("oneTime")}>One-time</button>
                </div>
              </div>

              <div className="amount-grid">
                {amounts.map(a => (
                  <button key={a.v} className="amount-btn"
                    aria-pressed={!custom && amount === a.v}
                    onClick={() => { setAmount(a.v); setCustom(""); }}>
                    <span className="amt">${a.v}</span>
                    <span className="what">{a.what}</span>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 28 }}>
                <label className="label-mono" style={{ color: "var(--on-dark-3)", marginBottom: 8 }}>Or enter custom amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--on-dark-2)", fontSize: 15 }}>$</span>
                  <input type="number" className="input-dark" value={custom} onChange={e => setCustom(e.target.value)}
                    placeholder="Custom amount" style={{ paddingLeft: 30 }} />
                </div>
              </div>

              <MagneticS>
                <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center", padding: "18px", fontSize: 15 }}>
                  Give ${effective}{freq === "monthly" ? "/mo" : ""} → save {meals} meals
                </button>
              </MagneticS>
              <p style={{ fontSize: 12, color: "var(--on-dark-3)", marginTop: 12, textAlign: "center" }}>
                Run 2 The Rescue is a 501(c)(3). Your gift is tax-deductible. EIN 45-XXXXXXX.
              </p>
            </div>

            <aside className="impact-live reveal">
              <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Your impact, live</div>
              <div className="num">${effective}{freq === "monthly" ? "/mo" : ""}</div>
              <p style={{ color: "var(--on-dark-2)", fontSize: 14, margin: "0 0 24px" }}>
                unlocks what's possible for a dog right now:
              </p>

              <ImpactRow num={meals} label="Meals" />
              <ImpactRow num={Math.round(effective / 15)} label="Vaccines administered" />
              <ImpactRow num={Math.round(effective / 120)} label="Vet exams covered" suffix={effective < 120 ? " (shared)" : ""} />
              <ImpactRow num={Math.round(effective * 0.02 * 10) / 10} label="Days of foster care" suffix="" />

              {freq === "monthly" && (
                <div style={{
                  marginTop: 20, padding: "14px 16px", background: "oklch(0.5 0.15 305 / 0.2)",
                  border: "1px solid var(--purple-400)", borderRadius: 12,
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--purple-300)", fontWeight: 600, marginBottom: 6 }}>
                    ✦ Sustainer benefit
                  </div>
                  <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.5 }}>
                    Monthly donors get the Survivor Circle newsletter, quarterly impact reports, and first look at new arrivals.
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <HopePullquote />
      <DirectedGiving onPick={(which) => { setIntent(which); scrollToGive(); }} active={intent} />
      <DonateFAQ />
    </>
  );
}

function DonateHero() {
  return (
    <header className="donate-hero">
      <PawS className="paw" style={{ top: 80, left: "8%", width: 52, height: 52, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ bottom: 60, right: "6%", width: 68, height: 68, color: "#fff", opacity: 0.1 }} />
      <div className="wrap" style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Donate</div>
        <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 80px)", margin: "0 0 22px", color: "#fff", lineHeight: 1.05 }}>
          Donate to Rescue and Rehabilitate <em>Dogs from the Meat Trade.</em>
        </h1>
        <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto", maxWidth: 620, lineHeight: 1.55 }}>
          Every dollar is tracked to rescue, transport, vet care, and the people who keep them alive.
        </p>
      </div>
    </header>
  );
}

function MissionSection() {
  return (
    <section className="donate-mission">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="dm-rule">
          <div className="eyebrow-dark" style={{ marginBottom: 16 }}>Our mission</div>
          <p className="dm-body">
            At <strong>Run2TheRescue</strong>, we are a compassionate team dedicated to creating a safe and nurturing space for the animals in our care. Our mission is to rescue, rehabilitate, and rehome abandoned and abused dogs, helping them find the loving forever homes they deserve.
          </p>
          <p className="dm-body">
            We believe every animal deserves the opportunity to heal and thrive. With unwavering dedication, we provide the care, attention, and support needed to give them the best chance at a bright future. Our team of experienced staff and volunteers is passionate about making a lasting difference in the lives of these brave souls.
          </p>
        </div>
      </div>
    </section>
  );
}

function HopePullquote() {
  return (
    <section className="hope-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="hope-card reveal">
          <div className="hope-icon" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              <polyline points="3.5 12 8 12 10 8.5 14 15.5 16 12 20.5 12" />
            </svg>
          </div>
          <p className="hope-lead">
            Your monthly contribution helps us continue our vital work, ensuring voiceless victims of the dog meat trade can be rescued and brought to the safety of our shelter.
          </p>
          <p className="hope-emph">
            You are giving them what they need the most… Hope.
          </p>
        </div>
      </div>
    </section>
  );
}

function DirectedGiving({ onPick, active }) {
  const items = [
    {
      id: "medical",
      title: "Provide Urgent Medical Care",
      body: "Emergency vet care, diagnostics, medications, and recovery support for courageous souls rescued from the dog meat trade — help them heal safely and quickly.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      id: "transport",
      title: "Help Bring Them Home",
      body: "Support safe transport, boarding, paperwork, and travel logistics to move rescued dogs from danger into loving homes across the country.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      ),
    },
  ];
  return (
    <section className="directed-giving">
      <PawS className="paw paw-light" style={{ top: 40, right: "4%", width: 52, height: 52 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Direct your gift</div>
          <h2 className="display" style={{ fontSize: "clamp(30px, 4vw, 48px)", margin: 0, color: "var(--ink)" }}>
            Or choose <em style={{ color: "var(--purple-600)" }}>where your dollars go.</em>
          </h2>
        </div>
        <div className="directed-grid">
          {items.map(it => (
            <div key={it.id} className={`directed-card reveal ${active === it.id ? "active" : ""}`}>
              <div className="directed-head">
                <div className="directed-icon">{it.icon}</div>
                <h3>{it.title}</h3>
              </div>
              <p className="directed-body">{it.body}</p>
              <button className="btn btn-accent directed-btn" onClick={() => onPick(it.id)}>
                Donate <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactRow({ num, label, suffix = "" }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "10px 0", borderBottom: "1px solid var(--line-dark)",
    }}>
      <span style={{ color: "var(--on-dark-2)", fontSize: 13 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "#fff" }}>
        {num}{suffix}
      </span>
    </div>
  );
}

function DonateFAQ() {
  const [open, setOpen] = dUS(0);
  const qs = [
    { q: "Is my donation tax-deductible?", a: "Yes — Run 2 The Rescue is a 501(c)(3) nonprofit. You'll receive an automatic receipt within minutes of donating. For gifts over $250, the receipt meets IRS substantiation requirements." },
    { q: "How is my money used?", a: "Roughly 72% to direct medical care and food, 18% to transport and foster stipends, and 10% to operations (insurance, software, licensing). Our audited financials are published annually." },
    { q: "Can I cancel my monthly gift?", a: "Anytime. You'll get a management link in every receipt email, or you can reply to any message from us and we'll handle it within one business day." },
    { q: "Do you accept international donations?", a: "Yes — we accept cards and PayPal from any country. International donors should check with their local tax authority about deductibility." },
  ];
  return (
    <section style={{ background: "var(--plum-900)", color: "#fff", padding: "96px 0 120px" }}>
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Questions</div>
        <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 32px", color: "#fff" }}>
          Before you give.
        </h2>
        {qs.map((item, i) => (
          <div key={i} className="faq-item" data-open={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="faq-q">
              <h4>{item.q}</h4>
              <div className="toggle">+</div>
            </div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { DonatePage });
