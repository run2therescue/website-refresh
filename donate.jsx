/* Donate page — a "choose how to give" page. The custom UI is the front end;
   the actual payment happens on the provider (Zeffy / PayPal / Venmo), opened
   in a new tab. Nothing is embedded. */
const { useState: dUS } = React;

const GIVE = {
  zeffyGeneral:   "https://www.zeffy.com/en-US/donation-form/provide-food-and-medical",
  zeffyTransport: "https://www.zeffy.com/en-US/donation-form/help-bring-them-home",
  paypal:         "https://www.paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6",
  venmo:          "https://venmo.com/u/Run2TheRescue",
};

function DonatePage() {
  return (
    <>
      <DonateHero />
      <MissionSection />
      <GiveSection />
      <HopePullquote />
      <DirectedGiving />
      <DonateFAQ />
    </>
  );
}

/* A single giving-method row, styled for the dark "give" section. */
function GiveRow({ href, name, note, badge }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", gap: 14, padding: "18px 20px",
      borderRadius: 14, border: "1.5px solid var(--line-dark)",
      background: "oklch(0.22 0.04 310 / 0.5)", textDecoration: "none",
      transition: "border-color .2s ease, background .2s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--purple-400)"; e.currentTarget.style.background = "oklch(0.26 0.05 310 / 0.7)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line-dark)"; e.currentTarget.style.background = "oklch(0.22 0.04 310 / 0.5)"; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "#fff" }}>{name}</span>
          {badge && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--purple-300)", background: "oklch(0.5 0.15 305 / 0.3)", border: "1px solid var(--purple-500)",
              padding: "3px 8px", borderRadius: 999, fontWeight: 600,
            }}>{badge}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: "var(--on-dark-2)", marginTop: 4, lineHeight: 1.45 }}>{note}</div>
      </div>
      <span aria-hidden="true" style={{ color: "var(--purple-400)", fontSize: 20, flexShrink: 0 }}>→</span>
    </a>
  );
}

function GiveSection() {
  return (
    <section id="give" style={{ background: "var(--plum-900)", color: "#fff", padding: "80px 0" }}>
      <div className="wrap" style={{ maxWidth: 620 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16, justifyContent: "center" }}>✦ Give</div>
          <h2 className="display" style={{ fontSize: "clamp(34px, 4.2vw, 56px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Choose how to <em>give</em>.
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 16, margin: "0 auto", maxWidth: 500, lineHeight: 1.6 }}>
            Every path is secure and tax deductible. Card or bank transfer is the only one where 100% of your gift reaches the dogs.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <GiveRow href={GIVE.zeffyGeneral} name="Card or bank transfer" badge="100% to the dogs"
            note="Secure checkout. Zeffy covers the fees, so every cent reaches a survivor." />
          <GiveRow href={GIVE.paypal} name="PayPal"
            note="Give with your PayPal balance or a linked card." />
          <GiveRow href={GIVE.venmo} name="Venmo"
            note="Send your gift straight from the Venmo app." />
        </div>

        <p style={{ fontSize: 12, color: "var(--on-dark-3)", marginTop: 18, textAlign: "center" }}>
          Run 2 The Rescue is a 501(c)(3) nonprofit. Your gift is tax deductible. EIN 99-4240461.
        </p>
      </div>
    </section>
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
          <div className="eyebrow-dark" style={{ marginBottom: 16 }}>Where it goes</div>
          <p className="dm-body">
            We pull dogs from holding pens in China and South Korea, heal what's broken, and put them on planes home. That's the work your gift pays for.
          </p>
          <p className="dm-body">
            Vet care, recovery, a flight home, a foster who keeps them safe until the right family says yes.
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
            Your monthly gift pulls voiceless victims out of holding pens and into safety. It rescues, it heals, it brings them home.
          </p>
          <p className="hope-emph">
            You give them the one thing they've never had. Hope.
          </p>
        </div>
      </div>
    </section>
  );
}

function DirectedGiving() {
  const items = [
    {
      id: "medical",
      title: "Provide Urgent Medical Care",
      href: GIVE.zeffyGeneral,
      body: "Emergency vet care, diagnostics, medications, and recovery support for courageous souls rescued from the dog meat trade, help them heal safely and quickly.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      id: "transport",
      title: "Help Bring Them Home",
      href: GIVE.zeffyTransport,
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
            <div key={it.id} className="directed-card reveal">
              <div className="directed-head">
                <div className="directed-icon">{it.icon}</div>
                <h3>{it.title}</h3>
              </div>
              <p className="directed-body">{it.body}</p>
              <a href={it.href} target="_blank" rel="noopener noreferrer" className="btn btn-accent directed-btn">
                Donate <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateFAQ() {
  const [open, setOpen] = dUS(0);
  const qs = [
    { q: "Is my donation tax deductible?", a: "Yes, Run 2 The Rescue is a 501(c)(3) nonprofit. You'll receive an automatic receipt within minutes of donating. For gifts over $250, the receipt meets IRS substantiation requirements." },
    { q: "How is my money used?", a: "Roughly 72% to direct medical care and food, 18% to transport and foster stipends, and 10% to operations (insurance, software, licensing). Our audited financials are published annually." },
    { q: "Can I cancel my monthly gift?", a: "Anytime. You'll get a management link in every receipt email, or you can reply to any message from us and we'll handle it within one business day." },
    { q: "Which payment method should I choose?", a: "Card or bank transfer through Zeffy is best. Zeffy is free for nonprofits, so 100% of your gift reaches the dogs. PayPal and Venmo are offered for convenience, but those providers take a small processing fee." },
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
