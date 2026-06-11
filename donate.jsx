/* Donate page — a "choose how to give" page. The custom UI is the front end;
   the actual payment happens on the provider (Zeffy / PayPal / Venmo / DAF),
   opened in a new tab. Nothing is embedded.
   DAF is an info-only flow: we show the donor our legal name and EIN; they
   recommend a grant from their DAF provider's portal.

   Layout: the giving methods live IN the hero (split layout), so a donor can
   give without scrolling. Everything below is supporting material. */
const { useState: dUS, useEffect: dUE } = React;

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
      <DirectedGiving />
      <DonateFAQ />
    </>
  );
}

/* A single giving-method row, styled for the dark hero card.
   Renders as an anchor when `href` is set, or as a button when `onClick` is set
   (used by the DAF row, which opens an info popover instead of navigating). */
function GiveRow({ href, onClick, name, note, badge }) {
  const baseStyle = {
    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
    borderRadius: 14, border: "1.5px solid var(--line-dark)",
    background: "oklch(0.22 0.04 310 / 0.5)", textDecoration: "none",
    textAlign: "left", width: "100%", cursor: "pointer", font: "inherit",
    transition: "border-color .2s ease, background .2s ease",
  };
  const onEnter = e => { e.currentTarget.style.borderColor = "var(--purple-400)"; e.currentTarget.style.background = "oklch(0.26 0.05 310 / 0.7)"; };
  const onLeave = e => { e.currentTarget.style.borderColor = "var(--line-dark)"; e.currentTarget.style.background = "oklch(0.22 0.04 310 / 0.5)"; };
  const inner = (
    <>
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
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {inner}
    </a>
  );
}

/* Modal opened from the DAF row. We don't integrate with a DAF platform —
   instead we show the donor our legal name + EIN so they can recommend a grant
   from any DAF provider's portal (Fidelity Charitable, Schwab, Vanguard, etc.).
   The legal name is "Run to the Rescue" — without the "2" we use elsewhere. */
function DafModal({ open, onClose }) {
  dUE(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ padding: "24px 26px 6px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img src="assets/r2r-logo.png" alt="" style={{ width: 30, height: 30 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                Donor Advised Fund
              </span>
            </div>
            <h3 className="display" style={{ fontSize: 26, margin: 0, color: "var(--ink)" }}>Give from your DAF</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "14px 26px 26px" }}>
          <p style={{ fontSize: 14, color: "var(--ink-2)", margin: "0 0 14px", lineHeight: 1.55 }}>
            Your DAF provider can send a grant directly. Use these details when you log into their portal:
          </p>
          <div style={{ background: "var(--lav-50)", border: "1px solid var(--line-light)", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 4 }}>Legal name</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Run to the Rescue</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, fontStyle: "italic" }}>Note: the "2" is dropped in our IRS filing, so use exactly the name above.</div>
            <div style={{ height: 1, background: "var(--line-light)", margin: "14px 0" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 4 }}>EIN</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>99-4240461</div>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 14 }}>
            <div><b>1.</b> Log in to your DAF provider (Fidelity Charitable, Schwab Charitable, Vanguard Charitable, etc.).</div>
            <div><b>2.</b> Recommend a grant using the legal name or EIN above.</div>
            <div><b>3.</b> We'll receive the gift within 7 to 14 days.</div>
          </div>
          <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
            Questions? Email <a href="mailto:info@run2therescue.org" style={{ color: "var(--purple-600)" }}>info@run2therescue.org</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Hero with the giving methods built in: headline + "where it goes" on the
   left, the chooser card on the right. A donor can complete their job (pick a
   method) without scrolling. */
function DonateHero() {
  const [dafOpen, setDafOpen] = dUS(false);
  return (
    <header className="donate-hero">
      <PawS className="paw" style={{ top: 60, left: "6%", width: 52, height: 52, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ bottom: 40, right: "4%", width: 68, height: 68, color: "#fff", opacity: 0.1 }} />
      <div className="wrap donate-hero-grid">
        <div className="donate-hero-copy">
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Donate</div>
          <h1 className="display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)", margin: "0 0 18px", color: "#fff", lineHeight: 1.06 }}>
            Donate to Rescue and Rehabilitate <em>Dogs from the Dog Meat Trade.</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--on-dark-2)", margin: "0 0 22px", maxWidth: 480, lineHeight: 1.6 }}>
            We rescue dogs from holding pens in China, heal what's broken, and put them on planes home. That's what your gift pays for: vet care, recovery, the flight home, and the foster who keeps them safe until the right family says yes.
          </p>
          <div className="donate-trust">
            <span>501(c)(3) nonprofit</span>
            <span aria-hidden="true">·</span>
            <span>Tax deductible</span>
            <span aria-hidden="true">·</span>
            <span>EIN 99-4240461</span>
          </div>
        </div>

        <div className="give-card" id="give">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--purple-400)", marginBottom: 14 }}>
            Choose how to give
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <GiveRow href={GIVE.zeffyGeneral} name="Card or bank transfer" badge="No fees"
              note="Secure checkout through Zeffy. Card, bank, or Apple/Google Pay." />
            <GiveRow href={GIVE.paypal} name="PayPal"
              note="Give with your PayPal balance or a linked card." />
            <GiveRow href={GIVE.venmo} name="Venmo"
              note="Send your gift straight from the Venmo app." />
            <GiveRow onClick={() => setDafOpen(true)} name="Donor Advised Fund (DAF)"
              note="Recommend a grant using our legal name and EIN." />
          </div>
          <p style={{ fontSize: 12, color: "var(--on-dark-3)", margin: "14px 0 0", textAlign: "center", lineHeight: 1.5 }}>
            Every path is secure and tax deductible. One-time or monthly.
          </p>
        </div>
      </div>
      <DafModal open={dafOpen} onClose={() => setDafOpen(false)} />
    </header>
  );
}

function DirectedGiving() {
  const items = [
    {
      id: "medical",
      title: "Provide Urgent Medical Care",
      href: GIVE.zeffyGeneral,
      body: "Emergency vet care, diagnostics, medications, and recovery support for dogs rescued from the dog meat trade, so they can heal safely and quickly.",
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
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Direct your gift</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", margin: 0, color: "var(--ink)" }}>
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
        <div className="hope-strip reveal">
          <div className="hope-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              <polyline points="3.5 12 8 12 10 8.5 14 15.5 16 12 20.5 12" />
            </svg>
          </div>
          <p>
            Prefer to give monthly? A recurring gift funds rescue after rescue, and keeps a survivor safe from the day we reach her to the day she's home.{" "}
            <b>You give them the one thing they've never had. Hope.</b>
          </p>
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
    { q: "Which payment method should I choose?", a: "Whichever is easiest for you. Card or bank transfer through Zeffy and DAF grants typically have no processing fee. PayPal and Venmo each take a small percentage. All four are secure and tax deductible." },
    { q: "Can I give from a Donor Advised Fund?", a: "Yes. Recommend a grant from your DAF provider (Fidelity Charitable, Schwab Charitable, Vanguard Charitable, etc.) using our legal name 'Run to the Rescue' (without the 2) and EIN 99-4240461. We typically receive DAF grants within 7 to 14 days." },
  ];
  return (
    <section style={{ background: "var(--plum-900)", color: "#fff", padding: "64px 0 80px" }}>
      <div className="wrap" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Questions</div>
        <h2 className="display" style={{ fontSize: "clamp(30px, 3.6vw, 44px)", margin: "0 0 28px", color: "#fff" }}>
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
