/* Foster page components */

const { useState: fS, useEffect: fE, useRef: fR } = React;

function FosterHero({ variant }) {
  if (variant === "split") return <FosterHeroSplit />;
  return <FosterHeroNarrative />;
}

function FosterHeroNarrative() {
  return (
    <header className="foster-hero-narrative">
      <PawS className="paw" style={{ top: 80, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.12 }} />
      <PawS className="paw" style={{ bottom: 60, right: "7%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ top: 140, right: "20%", width: 36, height: 36, color: "#fff", opacity: 0.08 }} />

      <div className="wrap" style={{ position: "relative", textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}><PawGlyphS />Join the Foster Team</div>
        <h1 className="display" style={{
          fontSize: "clamp(48px, 7.8vw, 108px)", margin: "0 0 24px", color: "#fff",
        }}>Fostering saves <em>lives.</em></h1>
        <p style={{ fontSize: 18, color: "var(--on-dark-2)", margin: "0 auto 40px", maxWidth: 620, lineHeight: 1.6 }}>
          Our dogs land at JFK and LAX. Your home is the next stop on the way to forever.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <MagneticS><a href="#apply" className="btn btn-accent">Apply to foster <span className="arrow">→</span></a></MagneticS>
          <a href="#why" className="btn btn-outline-light">Why foster?</a>
        </div>

        <div className="foster-hero-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          maxWidth: 720, margin: "0 auto", paddingTop: 32,
          borderTop: "1px solid var(--line-dark)",
        }}>
          <HeroStatF num={8} label="Fosters needed now" highlight />
          <HeroStatF num={420} suffix="+" label="Fosters since 2024" />
          <HeroStatF num={2} label="Flight hubs · JFK · LAX" />
        </div>
      </div>
    </header>
  );
}

function HeroStatF({ num, suffix = "", label, highlight = false }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="display" style={{ fontSize: 40, color: highlight ? "var(--purple-400)" : "#fff" }}>
        <CountUpS to={num} /><span style={{ color: "var(--purple-400)" }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: highlight ? "var(--purple-400)" : "var(--on-dark-3)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

function FosterHeroSplit() {
  return (
    <header className="foster-hero-split">
      <div className="wrap">
        <div className="split-hero-grid">
          <div className="split-hero-copy">
            <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}><PawGlyphS />Join the Foster Team</div>
            <h1 className="display" style={{
              fontSize: "clamp(44px, 6.4vw, 88px)", margin: "0 0 20px", color: "#fff",
            }}>Open your home. <em>Save a life.</em></h1>
            <p style={{ fontSize: 16, color: "var(--on-dark-2)", margin: "0 0 28px", lineHeight: 1.6, maxWidth: 460 }}>
              Our dogs are flown in periodically to JFK and LAX. Your home is the next stop on their journey, and the difference between a kennel and a soft bed.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <MagneticS><a href="#apply" className="btn btn-accent">Apply to foster</a></MagneticS>
              <a href="#why" className="btn btn-outline-light">Why foster?</a>
            </div>

            <div className="needs-widget">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span className="needs-dot" />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", fontWeight: 600 }}>Current Foster Needs</span>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "var(--on-dark-2)" }}>
                <div><strong style={{ color: "#fff" }}>3 dogs</strong> arriving JFK · May 4</div>
                <div><strong style={{ color: "#fff" }}>5 dogs</strong> arriving LAX · May 18</div>
              </div>
            </div>
          </div>
          <div className="split-hero-media">
            <ImgS src={IMG_BANK.fosterHome} alt="Foster home with rescue dog" />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 60%, oklch(0.14 0.03 310 / 0.4))",
            }} />
            <PawS className="paw" style={{ bottom: 24, left: 24, width: 48, height: 48, color: "#fff", opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </header>
  );
}

function WhyFoster() {
  const items = [
    { icon: "🏠", title: "You're the first home they know", copy: "Many of our dogs have never slept on a bed, been called by a name, or felt safe. You're the one who teaches them that home is real." },
    { icon: "💜", title: "Every foster creates space for the next rescue", copy: "Every dog you foster opens a spot for the next survivor waiting in Yulin. You save two lives for every one in your home." },
  ];
  return (
    <section id="why" className="why-foster">
      <PawS className="paw paw-light" style={{ top: 40, left: "4%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Why Foster?</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.2vw, 56px)", margin: "0 0 12px", color: "var(--ink)" }}>
            It takes a very <em style={{ color: "var(--purple-600)" }}>special</em> person to be a foster parent.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Your home is the difference between a kennel and a family. We bring the dog, the food, the vet care. You bring the soft places.
          </p>
        </div>
        <div className="why-grid">
          {items.map(it => (
            <div key={it.title} className="why-card reveal">
              <div className="icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FosterJourney() {
  const stops = [
    { t: "Dog arrives", d: "We match you with an incoming dog and schedule airport pickup (or delivery)." },
    { t: "Decompression", d: "A quiet first week. We guide you through what to expect." },
    { t: "Care & updates", d: "You share photos + notes that help us match them. We cover vet bills and supplies." },
    { t: "Adoption match", d: "We place them with their forever family. You celebrate, or foster another." },
  ];
  return (
    <section className="journey-section">
      <PawS className="paw paw-dark" style={{ top: 40, right: "5%", width: 40, height: 40 }} />
      <PawS className="paw paw-dark" style={{ bottom: 40, left: "4%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}><PawGlyphS />How fostering works</div>
          <h2 className="display" style={{ fontSize: "clamp(30px, 3.8vw, 48px)", margin: "0 0 12px", color: "#fff" }}>
            Four stops, one journey home.
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0 }}>
            A typical foster lasts 2 to 8 weeks. We're with you the whole way.
          </p>
        </div>
        <div className="journey-flow">
          {stops.map((s, i) => (
            <div key={s.t} className="journey-stop reveal">
              <div className="dot" />
              <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--purple-400)", marginBottom: 8, fontWeight: 600 }}>
                Step {i + 1}
              </div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FosterTestimonial() {
  return (
    <section className="testimonial-section">
      <PawS className="paw paw-dark" style={{ top: 60, left: "8%", width: 56, height: 56 }} />
      <PawS className="paw paw-dark" style={{ bottom: 60, right: "8%", width: 64, height: 64 }} />
      <div className="wrap">
        <span className="quote-mark">"</span>
        <p className="big-quote">
          Fostering saved my life <em>just as much as</em> it saved theirs.
        </p>
        <div style={{ textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-3)" }}>
          A Run 2 The Rescue Foster Parent
        </div>
      </div>
    </section>
  );
}

function FosterForm() {
  const [form, setForm] = fS({
    firstName: "", lastName: "", email: "", phone: "",
    location: "", home: "house", experience: "", message: "",
  });
  const [sent, setSent] = fS(false);

  const [sending, setSending] = fS(false);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await submitForm(
      {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        home: form.home,
        experience: form.experience,
        message: form.message,
      },
      "Foster Application"
    );
    setSending(false);
    setSent(true);
    setTimeout(() => window.scrollTo({ top: document.getElementById("apply").offsetTop - 40, behavior: "smooth" }), 50);
  };

  return (
    <section id="apply" className="foster-form">
      <PawS className="paw paw-light" style={{ top: 40, right: "5%", width: 44, height: 44 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 32px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Apply to Foster</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.2vw, 52px)", margin: "0 0 12px", color: "var(--ink)" }}>
            Ready to foster?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Fill this out. Our foster coordinator writes back within 48 hours.
          </p>
        </div>

        <div className="form-card">
          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--purple-soft)", display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 32, color: "var(--purple-700)" }}>♥</div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 10px", color: "var(--ink)" }}>Application received!</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15, margin: "0 0 24px", lineHeight: 1.6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
                Thank you for opening your home, {form.firstName || "friend"}. Our foster coordinator will reach out within 48 hours with next steps.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/adopt" className="btn btn-accent">See current survivors</a>
                <button className="btn btn-outline-dark" onClick={() => { setSent(false); setForm({ firstName: "", lastName: "", email: "", phone: "", location: "", home: "house", experience: "", message: "" }); }}>Submit another</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <BotcheckS />
              <div className="form-row" style={{ marginBottom: 16 }}>
                <div>
                  <label className="f-label">First name <span style={{ color: "var(--purple-600)" }}>*</span></label>
                  <input required className="f-input" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <label className="f-label">Last name <span style={{ color: "var(--purple-600)" }}>*</span></label>
                  <input required className="f-input" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: 16 }}>
                <div>
                  <label className="f-label">Email <span style={{ color: "var(--purple-600)" }}>*</span></label>
                  <input required type="email" className="f-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="f-label">Phone</label>
                  <input type="tel" className="f-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: 16 }}>
                <div>
                  <label className="f-label">City & state</label>
                  <input className="f-input" placeholder="e.g. Brooklyn, NY" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
                <div>
                  <label className="f-label">Closest airport</label>
                  <select className="f-input" value={form.home === "house" ? "JFK" : "LAX"} onChange={e => setForm({ ...form, airport: e.target.value })}>
                    <option>JFK, New York</option>
                    <option>LAX, Los Angeles</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="f-label">Home type</label>
                <div style={{ display: "flex", background: "var(--lav-100)", borderRadius: 12, padding: 3, gap: 3 }}>
                  {[["house", "House"], ["apt", "Apartment"], ["condo", "Condo"], ["other", "Other"]].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setForm({ ...form, home: v })}
                      style={{
                        flex: 1, padding: "10px 8px", borderRadius: 9, fontSize: 13,
                        background: form.home === v ? "#fff" : "transparent",
                        color: form.home === v ? "var(--ink)" : "var(--ink-2)",
                        fontWeight: form.home === v ? 600 : 400,
                        boxShadow: form.home === v ? "var(--shadow-sm)" : "none",
                      }}>{l}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="f-label">Have you fostered before?</label>
                <div style={{ display: "flex", background: "var(--lav-100)", borderRadius: 12, padding: 3, gap: 3 }}>
                  {[["first", "First time"], ["past", "In the past"], ["current", "Currently fostering"]].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setForm({ ...form, experience: v })}
                      style={{
                        flex: 1, padding: "10px 8px", borderRadius: 9, fontSize: 13,
                        background: form.experience === v ? "#fff" : "transparent",
                        color: form.experience === v ? "var(--ink)" : "var(--ink-2)",
                        fontWeight: form.experience === v ? 600 : 400,
                        boxShadow: form.experience === v ? "var(--shadow-sm)" : "none",
                      }}>{l}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="f-label">Tell us about yourself and your home</label>
                <textarea className="f-input" rows={4} placeholder="Family, other pets, yard/outdoor space, work schedule, whatever you'd like us to know."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              <MagneticS><button type="submit" className="btn btn-accent" style={{ width: "100%", justifyContent: "center" }} disabled={sending}>{sending ? "Sending..." : <>Submit foster application <span className="arrow">→</span></>}</button></MagneticS>

              <p style={{ margin: "16px 0 0", fontSize: 12, color: "var(--ink-3)", textAlign: "center", lineHeight: 1.5 }}>
                By submitting, you agree to be contacted by our foster coordinator. No obligation, this just starts the conversation.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FosterHero, WhyFoster, FosterJourney, FosterTestimonial, FosterForm });
