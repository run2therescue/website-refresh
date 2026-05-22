/* Contact page, consolidated */
const { useState: cUS } = React;

function ContactPage() {
  const [form, setForm] = cUS({ first: "", last: "", email: "", message: "" });
  const [sent, setSent] = cUS(false);

  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <header className="contact-hero">
        <PawS className="paw" style={{ top: 80, right: "8%", width: 60, height: 60, color: "#fff", opacity: 0.1 }} />
        <PawS className="paw" style={{ bottom: 40, left: "6%", width: 52, height: 52, color: "#fff", opacity: 0.1 }} />
        <div className="wrap" style={{ maxWidth: 820, textAlign: "center", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Get in touch</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7vw, 88px)", margin: "0 0 18px", color: "#fff", lineHeight: 0.98 }}>
            We'd love to <em>hear from you.</em>
          </h1>
          <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto", lineHeight: 1.55, maxWidth: 560 }}>
            Real humans answer every message, usually within a business day.
          </p>
        </div>
      </header>

      <section className="contact-section">
        <PawS className="paw paw-light" style={{ bottom: 40, right: "4%", width: 56, height: 56 }} />
        <div className="wrap contact-grid">
          {/* LEFT, Reach out copy + email card */}
          <div className="contact-copy">
            <div className="reach-rule">
              <div className="eyebrow-dark" style={{ marginBottom: 16 }}>Reach out</div>
              <p className="reach-body">
                Reach out to our dedicated team at <strong>Run2TheRescue</strong> to explore how we can help you give a rescued dog a second chance. We're here to connect you with a survivor in need of a loving home.
              </p>
              <p className="reach-body">
                Join us in our mission to rescue and rehabilitate dogs from the harshest conditions, giving them the opportunity for a safe and caring future. Become part of a community committed to making a lasting difference.
              </p>
              <p className="reach-body">
                Connect with <strong>Run2TheRescue</strong> to learn more about our services and how you can support a courageous soul on their journey toward healing and a new life.
              </p>
            </div>

            <a className="email-card" href="mailto:info@run2therescue.com">
              <div className="email-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
              <div className="email-text">
                <div className="email-label">Email us</div>
                <div className="email-addr">info@run2therescue.com</div>
              </div>
            </a>
          </div>

          {/* RIGHT, Form */}
          <div className="contact-form-card reveal">
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 10px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--purple-soft)", display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 28, color: "var(--purple-700)" }}>♥</div>
                <h2 className="display" style={{ fontSize: 30, margin: "0 0 10px", color: "var(--ink)" }}>Message received!</h2>
                <p style={{ color: "var(--ink-2)", fontSize: 15, margin: "0 0 24px", lineHeight: 1.6 }}>
                  Thanks for reaching out. We'll respond within one business day.
                </p>
                <button className="btn btn-accent" onClick={() => { setSent(false); setForm({ first: "", last: "", email: "", message: "" }); }}>
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="eyebrow-dark" style={{ marginBottom: 10 }}>Send a message</div>
                <h2 className="display contact-form-title">We'd Love to Hear From You</h2>

                <div className="cf-form-row">
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
                  <label className="f-label">Message</label>
                  <textarea rows={5} className="f-input" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-accent cf-submit">
                  Contact us!
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactPage });
