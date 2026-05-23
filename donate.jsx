/* Donate page — giving runs through the live Zeffy donation form, embedded
   directly in the page. Zeffy owns the payment, receipt, and tax handling. */
const { useState: dUS, useEffect: dUE } = React;

/* Zeffy donation forms (slugs from the org's Zeffy account). */
const ZEFFY = {
  general:   "provide-food-and-medical",
  transport: "help-bring-them-home",
};
const zeffyEmbed = (slug) => `https://www.zeffy.com/embed/donation-form/${slug}`;

function DonatePage() {
  const [popup, setPopup] = dUS(null); // { slug, label } | null

  return (
    <>
      <DonateHero />
      <MissionSection />

      <section id="give" style={{ background: "var(--plum-900)", color: "#fff", padding: "80px 0" }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16, justifyContent: "center" }}>✦ Give</div>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.2vw, 56px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
              Pick an amount. <em>Change a life.</em>
            </h2>
            <p style={{ color: "var(--on-dark-2)", fontSize: 16, margin: "0 auto", maxWidth: 520, lineHeight: 1.6 }}>
              Every dollar goes directly to rescue, medical, and foster care. Your gift is secure, and your tax receipt arrives instantly.
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-dark)" }}>
            <iframe
              title="Donate to Run 2 The Rescue"
              src={zeffyEmbed(ZEFFY.general)}
              allow="payment"
              style={{ display: "block", width: "100%", height: 1000, border: 0 }}
            />
          </div>

          <p style={{ fontSize: 12, color: "var(--on-dark-3)", marginTop: 16, textAlign: "center" }}>
            Run 2 The Rescue is a 501(c)(3) nonprofit. Your gift is tax-deductible. EIN 99-4240461.
          </p>
        </div>
      </section>

      <HopePullquote />
      <DirectedGiving onPick={setPopup} />
      <DonateFAQ />

      {popup && <ZeffyModal slug={popup.slug} label={popup.label} onClose={() => setPopup(null)} />}
    </>
  );
}

/* Popup that opens a specific Zeffy form (used by the directed-giving cards). */
function ZeffyModal({ slug, label, onClose }) {
  dUE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 560,
        height: "86vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "var(--shadow)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px", borderBottom: "1px solid var(--line-light)", flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            {label || "Donate"} · Run 2 The Rescue
          </span>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>
        <iframe
          title={`${label || "Donate"} — Run 2 The Rescue`}
          src={zeffyEmbed(slug)}
          allow="payment"
          style={{ flex: 1, width: "100%", border: 0 }}
        />
      </div>
    </div>
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

function DirectedGiving({ onPick }) {
  const items = [
    {
      id: "medical",
      title: "Provide Urgent Medical Care",
      slug: ZEFFY.general,
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
      slug: ZEFFY.transport,
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
              <button className="btn btn-accent directed-btn" onClick={() => onPick({ slug: it.slug, label: it.title })}>
                Donate <span className="arrow">→</span>
              </button>
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
    { q: "Is my donation tax-deductible?", a: "Yes, Run 2 The Rescue is a 501(c)(3) nonprofit. You'll receive an automatic receipt within minutes of donating. For gifts over $250, the receipt meets IRS substantiation requirements." },
    { q: "How is my money used?", a: "Roughly 72% to direct medical care and food, 18% to transport and foster stipends, and 10% to operations (insurance, software, licensing). Our audited financials are published annually." },
    { q: "Can I cancel my monthly gift?", a: "Anytime. You'll get a management link in every receipt email, or you can reply to any message from us and we'll handle it within one business day." },
    { q: "Do you accept international donations?", a: "Yes, we accept cards and PayPal from any country. International donors should check with their local tax authority about deductibility." },
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
