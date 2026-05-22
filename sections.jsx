/* Sections */

/* Press logos — stylized wordmarks for each outlet. Rendered at 
   common visual weight, desaturated to sit quietly under the hero. */
const PressLogos = {
  People: () => (
    <svg viewBox="0 0 120 32" height="28" aria-label="People" role="img">
      <text x="60" y="25" textAnchor="middle"
        fontFamily="'Bricolage Grotesque', serif" fontWeight="800"
        fontSize="26" letterSpacing="-0.5" fill="currentColor">People</text>
    </svg>
  ),
  TODAY: () => (
    <svg viewBox="0 0 120 32" height="26" aria-label="TODAY" role="img">
      <circle cx="14" cy="16" r="10" fill="oklch(0.65 0.15 35)" opacity="0.9" />
      <text x="30" y="22" fontFamily="'Inter Tight', sans-serif" fontWeight="700"
        fontSize="18" letterSpacing="2" fill="currentColor">TODAY</text>
    </svg>
  ),
  ABC7: () => (
    <svg viewBox="0 0 78 28" height="26" aria-label="ABC7" role="img">
      <circle cx="14" cy="14" r="12" fill="currentColor" />
      <text x="14" y="18" textAnchor="middle" fontFamily="'Inter Tight', sans-serif"
        fontWeight="800" fontSize="11" fill="#fff" letterSpacing="-0.3">abc</text>
      <text x="42" y="21" fontFamily="'Bricolage Grotesque', serif" fontWeight="800"
        fontSize="24" fill="currentColor">7</text>
    </svg>
  ),
  TheDodo: () => (
    <svg viewBox="0 0 140 32" height="24" aria-label="The Dodo" role="img">
      <text x="70" y="22" textAnchor="middle"
        fontFamily="'Bricolage Grotesque', serif" fontStyle="italic" fontWeight="700"
        fontSize="22" letterSpacing="-0.3" fill="currentColor">the dodo</text>
    </svg>
  ),
  GMT: () => (
    <svg viewBox="0 0 180 36" height="30" aria-label="Good Morning Texas" role="img">
      <text x="0" y="15" fontFamily="'Inter Tight', sans-serif" fontWeight="700"
        fontSize="10" letterSpacing="3" fill="currentColor">GOOD MORNING</text>
      <text x="0" y="32" fontFamily="'Bricolage Grotesque', serif" fontWeight="800"
        fontSize="18" letterSpacing="-0.5" fill="currentColor">TEXAS</text>
      <path d="M 122 22 L 130 18 L 130 28 Z" fill="oklch(0.65 0.15 35)" />
    </svg>
  ),
  NPR: () => (
    <svg viewBox="0 0 60 28" height="22" aria-label="NPR" role="img">
      <rect x="0" y="6" width="60" height="18" rx="2" fill="currentColor" />
      <text x="30" y="19" textAnchor="middle" fontFamily="'Inter Tight', sans-serif"
        fontWeight="800" fontSize="12" letterSpacing="1" fill="#fff">npr</text>
    </svg>
  ),
};

function Press() {
  const items = [
    { key: "People",  C: PressLogos.People },
    { key: "TODAY",   C: PressLogos.TODAY },
    { key: "ABC7",    C: PressLogos.ABC7 },
    { key: "TheDodo", C: PressLogos.TheDodo },
    { key: "GMT",     C: PressLogos.GMT },
    { key: "NPR",     C: PressLogos.NPR },
  ];
  return (
    <section id="press" className="press-section section-light" style={{ padding: "32px 0", borderBottom: "1px solid var(--line-light)" }}>
      <div className="wrap">
        <div className="press-row" style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 44px)", justifyContent: "center", flexWrap: "wrap", rowGap: 16 }}>
          <span className="eyebrow-dark" style={{ color: "var(--ink-3)", fontSize: 11, whiteSpace: "nowrap" }}>As Featured In</span>
          {items.map(({ key, C }) => (
            <span key={key} className="press-logo" style={{ color: "var(--ink-2)", opacity: 0.75, transition: "opacity .2s" }}>
              <C />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="section-light" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 40, right: "6%", width: 44, height: 44 }} />
      <Paw className="paw-light" style={{ bottom: 40, left: "6%", width: 40, height: 40 }} />
      <div className="wrap">
        <div style={{
          background: "#fff", borderRadius: 20, padding: "clamp(28px, 4vw, 56px)",
          boxShadow: "0 2px 0 var(--line-light)",
          borderLeft: "4px solid var(--purple-500)",
          display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 40, alignItems: "center",
        }} className="mission-grid">
          <div>
            <h2 className="display display-serif-em" style={{ fontSize: "clamp(26px, 3.2vw, 42px)", margin: 0, color: "var(--ink)", lineHeight: 1.15 }}>
              Our mission is to give <em>every</em> dog rescued from the meat trade a chance at a <em>loving</em>, safe life.
            </h2>
          </div>
          <div>
            <div className="display" style={{ fontSize: 68, lineHeight: 1, color: "var(--ink)", marginBottom: 6 }}><CountUp to={30} suffix="M" /></div>
            <div style={{ fontSize: 15, color: "var(--ink-2)", marginBottom: 4 }}>dogs killed in the Asian meat trade every year</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Source: Humane Society International</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, borderTop: "1px solid var(--line-light)", paddingTop: 16 }}>
              {[[10, "M", "", "in China alone"], [1, "M", "+", "in South Korea annually"], [5, "M", "", "in Vietnam annually"]].map(([n, unit, plus, l]) => (
                <div key={l}>
                  <div className="display" style={{ fontSize: 24, color: "var(--ink)" }}><CountUp to={n} suffix={unit + plus} /></div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Survivors({ onSponsor }) {
  const dogs = [
    { name: "Kronk", img: IMG.survivor1, status: "Featured · in foster", urgent: null, story: "Pulled from a Yulin holding pen. Featured in People Magazine." },
    { name: "Willa", img: IMG.survivor2, status: "Needs foster · CA", urgent: 42, story: "Shy, gentle, loves other dogs. Working through kennel fear." },
    { name: "Juno", img: IMG.survivor3, status: "Adopted · 2026", urgent: null, story: "Now a couch professional in Portland with the Reyes family." },
    { name: "Otis", img: IMG.survivor4, status: "In foster · TX", urgent: 18, story: "Survivor of a Seoul slaughterhouse raid. Ready in November." },
  ];
  return (
    <section id="survivors" className="section-light" style={{ padding: "72px 0 24px", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 40, left: "5%", width: 40, height: 40 }} />
      <div className="wrap">
        <div className="survivors-hero" style={{ marginBottom: 48, maxWidth: 680 }}>
          <h2 className="display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)", margin: "0 0 16px", color: "var(--ink)" }}>
            Hopeful Survivors in Search of a Loving Home
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink-2)", marginBottom: 20, maxWidth: 520 }}>
            Our team rescues dogs from the meat trade, provides critical medical treatment, and places them into loving homes — giving every survivor a second chance at a happy, healthy life.
          </p>
          <Magnetic><button className="btn btn-accent" onClick={() => onSponsor()}>Adopt Today <span className="arrow">→</span></button></Magnetic>
        </div>

        <div className="ways-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
        }}>
          {dogs.map(d => (
            <article key={d.name} className="reveal" onClick={() => onSponsor(d.name)} style={{
              background: "#fff", borderRadius: 20, overflow: "hidden",
              cursor: "pointer", transition: "transform .25s ease, box-shadow .25s ease",
              display: "flex", flexDirection: "column",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <Img src={d.img} alt={d.name} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 8 }}>
                  <div className="display" style={{ fontSize: 24, color: "var(--ink)" }}>{d.name}</div>
                  {d.urgent ? <UrgencyBadge days={d.urgent} /> : (
                    <span style={{
                      fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: d.status.startsWith("Adopt") ? "oklch(0.55 0.12 150)" : "var(--purple-600)",
                    }}>{d.status}</span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{d.story}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  // Real R2R survivors. Story copy uses the brand's transformation phrases as placeholders
  // until the team provides real per-dog stories. Swap freely.
  // beforeFocal / afterFocal control CSS object-position when the photo's subject isn't centered.
  // Defaults to "center". Use "center top", "center 25%", etc. to keep faces in frame.
  const items = [
    { name: "Kronk",  before: IMG.kronkBefore,  after: IMG.kronkAfter,  story: "Pulled from a holding pen in Yulin. Featured in People Magazine." },
    { name: "Alfie",  before: IMG.alfieBefore,  after: IMG.alfieAfter,  story: "From trauma to trust. Pulled from the trade and finding his way home." },
    { name: "Gertie", before: IMG.gertieBefore, after: IMG.gertieAfter, story: "From fear to faith. Rescued from the trade and finding her people." },
    { name: "Honey",  before: IMG.honeyBefore,  after: IMG.honeyAfter,  story: "From forgotten to forever. A second chance, fully claimed.", beforeFocal: "center 25%" },
  ];
  return (
    <section className="section-light" style={{ padding: "64px 0 80px", position: "relative" }}>
      <Paw className="paw-light" style={{ top: 40, left: "6%", width: 44, height: 44 }} />
      <Paw className="paw-light" style={{ bottom: 40, right: "6%", width: 44, height: 44 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", margin: "0 0 10px", color: "var(--ink)" }}>
            Their Journey to a New Life
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 15, margin: 0 }}>From trauma to trust, from fear to faith.</p>
        </div>
        <div className="ways-grid journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {items.map(it => (
            <article key={it.name} className="reveal" style={{
              background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 0 var(--line-light)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--line-light)", aspectRatio: "2/1" }}>
                <div style={{ position: "relative", background: "var(--plum-700)", overflow: "hidden" }}>
                  <Img src={it.before} alt="Before" style={{ filter: "saturate(0.5) brightness(0.85)", objectPosition: it.beforeFocal || "center" }} />
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    background: "var(--plum-900)", color: "#fff", fontSize: 10,
                    padding: "4px 10px", borderRadius: 999,
                    fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>Before</span>
                </div>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Img src={it.after} alt="After" style={{ objectPosition: it.afterFocal || "center" }} />
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    background: "#fff", color: "var(--ink)", fontSize: 10,
                    padding: "4px 10px", borderRadius: 999,
                    fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>After</span>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div className="display" style={{ fontSize: 22, marginBottom: 6, color: "var(--ink)" }}>{it.name}</div>
                <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 13, lineHeight: 1.5 }}>{it.story}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="section-light" style={{ padding: "64px 0" }}>
      <div className="wrap">
        <div className="kronk-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: 48, alignItems: "center" }}>
          <div style={{
            position: "relative", aspectRatio: "4/5", borderRadius: 20, overflow: "hidden",
            background: "var(--lav-200)", boxShadow: "0 20px 48px -20px oklch(0.3 0.05 310 / 0.3)",
            maxHeight: 440,
          }}>
            <Img src={IMG.kronkAfter} alt="Kronk, leaping through fresh snow" />
          </div>
          <div>
            <span style={{
              display: "inline-block", padding: "6px 14px", borderRadius: 999,
              background: "var(--purple-soft)", color: "var(--purple-700)",
              fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase",
              marginBottom: 16, fontWeight: 500,
            }}>✦ Featured Story</span>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", margin: "0 0 16px", color: "var(--ink)" }}>
              Meet Kronk
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-2)", marginBottom: 16, maxWidth: 480 }}>
              Want an easy (and free) way to help courageous souls escaping the dog meat trade in East Asia? Vote for Kronk on America's Favorite Pet. If Kronk wins, the <b style={{ color: "var(--ink)" }}>$10,000 prize</b> goes to Run 2 The Rescue to save and heal more dogs like him.
            </p>
            <div style={{
              borderLeft: "3px solid var(--purple-500)", paddingLeft: 14, marginBottom: 22,
              fontSize: 13, fontStyle: "italic", color: "var(--ink-2)",
            }}>
              Free daily vote available; additional votes can be made via donation through the contest.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="https://americasfavpet.com/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Vote for Kronk</a>
              <a href="News.html" className="btn btn-outline-dark" style={{ borderColor: "var(--line-light)", color: "var(--ink-2)" }}>Read Kronk's Story →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reality() {
  const imgs = [IMG.reality1, IMG.reality2, IMG.reality3];
  const labels = [
    "Dogs crammed into stacked wire cages, awaiting the meat trade",
    "A dog presses toward the wire — one of dozens waiting",
    "Crowded behind chain-link, surviving on borrowed time",
  ];
  return (
    <section className="section-dark" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-dark" style={{ top: 40, right: "5%", width: 44, height: 44 }} />
      <Paw className="paw-dark" style={{ bottom: 40, left: "4%", width: 44, height: 44 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 36px" }}>
          <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", margin: "0 0 12px", color: "var(--purple-400)" }}>
            The Reality They Face
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-dark-2)", margin: 0 }}>
            From trauma to trust, from fear to faith. Every face is a testament to resilience.
          </p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(0, 150px)",
          gap: 14,
        }}>
          {[
            { c: "span 7", r: "span 2", img: imgs[0], label: labels[0] },
            { c: "span 5", r: "span 1", img: imgs[1], label: labels[1] },
            { c: "span 5", r: "span 1", img: imgs[2], label: labels[2] },
            { c: "span 12", r: "span 2", video: "assets/reality-cage-clip.mp4", poster: "assets/reality-cage-poster.jpg", label: "Dozens crowd a single kennel, waiting — this is what every rescue interrupts" },
          ].map((it, i) => (
            <div key={i} style={{
              gridColumn: it.c, gridRow: it.r,
              borderRadius: 20, overflow: "hidden", background: "var(--plum-700)",
              position: "relative",
            }}>
              {it.video ? (
                <video
                  autoPlay muted loop playsInline preload="metadata"
                  poster={it.poster}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    display: "block", filter: "saturate(0.4) brightness(0.75)",
                  }}
                >
                  <source src={it.video} type="video/mp4" />
                </video>
              ) : (
                <Img src={it.img} alt={it.label} style={{ filter: "saturate(0.4) brightness(0.75)" }} />
              )}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 50%, oklch(0.14 0.03 310 / 0.7))",
              }} />
              <span style={{
                position: "absolute", bottom: 16, left: 20, right: 20,
                color: "var(--on-dark-2)", fontSize: 12,
              }}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ways({ onDonate, onSponsor }) {
  const items = [
    { title: "Adopt a Survivor", kind: "adopt",   icon: "♡", href: "Adopt.html" },
    { title: "Become a Foster",  kind: "foster",  icon: "⌂", href: "Foster.html" },
    { title: "Sponsor a Dog",    kind: "sponsor", icon: "♁", href: "Sponsor.html" },
    { title: "Make a Donation",  kind: "donate",  icon: "♥", href: "Donate.html" },
  ];
  return (
    <section id="ways" className="section-light" style={{ padding: "64px 0 72px", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 40, left: "5%", width: 44, height: 44 }} />
      <Paw className="paw-light" style={{ top: 30, right: "6%", width: 40, height: 40 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", margin: "0 0 10px", color: "var(--ink)" }}>
            How You Can Help
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 15, margin: 0 }}>
            Every act of compassion makes a difference.
          </p>
        </div>
        <div className="ways-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {items.map(it => (
            <a key={it.title} href={it.href} className="help-card reveal">
              <div className="help-art">
                <HelpIllustration kind={it.kind} />
              </div>
              <div className="help-label">
                <span className="help-icon">{it.icon}</span>
                <span className="help-text">{it.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="section-dark-2" style={{ padding: "72px 0", position: "relative" }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "var(--on-dark-2)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.65 }}>
            Our mission is straightforward: be a beacon of hope for these courageous activists and the voiceless victims they protect. We fund rescue missions, medical care, and international transport to place survivors in safe, loving forever homes — while continuing to educate and advocate against animal cruelty worldwide.
          </p>
          <div style={{
            borderLeft: "3px solid var(--purple-500)", paddingLeft: 20,
            maxWidth: 520, margin: "0 auto 48px", textAlign: "left",
          }}>
            <div style={{ fontStyle: "italic", fontSize: 19, color: "#fff", marginBottom: 10 }}>
              "Run to the rescue with love, and peace will follow."
            </div>
            <div style={{ fontSize: 13, color: "var(--purple-400)" }}>— River Phoenix</div>
          </div>
          <div className="display" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--purple-400)", letterSpacing: "0.02em" }}>
            RUN. RESCUE. REPEAT.
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const people = [
    { name: "Brandy Cherven", role: "Owner · CEO", img: IMG.teamBrandy, copy: "Driven by an unwavering love for animals and a commitment to ending the dog meat trade, Brandy cofounded R2TR to be a beacon of hope for voiceless victims and the courageous activists who rescue them." },
    { name: "Bonnie Klapper", role: "Owner · COO", img: IMG.teamBonnie, copy: "With firsthand experience witnessing the overwhelming challenges of rescue efforts in China and South Korea, Bonnie cofounded R2TR to give every survivor a second chance at a loving forever home." },
  ];
  return (
    <section className="section-dark" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-dark" style={{ top: 60, right: "6%", width: 52, height: 52 }} />
      <Paw className="paw-dark" style={{ bottom: 80, left: "5%", width: 56, height: 56 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Our Founders</div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "0 0 12px", color: "#fff" }}>
            The team behind the mission
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0 }}>Meet Brandy and Bonnie — the two women who built R2TR.</p>
        </div>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 1000, margin: "0 auto" }}>
          {people.map(p => (
            <div key={p.name} className="reveal" style={{
              background: "var(--plum-700)", borderRadius: 24, overflow: "hidden",
              padding: 20, border: "1px solid var(--line-dark)",
            }}>
              <div style={{ aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", marginBottom: 20, background: "var(--plum-600)" }}>
                <Img src={p.img} alt={p.name} />
              </div>
              <div className="display" style={{ fontSize: 26, marginBottom: 6, color: "#fff" }}>{p.name}</div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--purple-400)", marginBottom: 14 }}>{p.role}</div>
              <p style={{ color: "var(--on-dark-2)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onDonate, onSubscribe }) {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  return (
    <section id="contact" style={{
      padding: "80px 0", position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, oklch(0.54 0.12 305) 0%, oklch(0.44 0.11 305) 100%)",
      color: "#fff",
    }}>
      <Paw style={{ top: 40, left: "5%", width: 44, height: 44, opacity: 0.2, color: "#fff" }} />
      <Paw style={{ bottom: 30, right: "6%", width: 40, height: 40, opacity: 0.2, color: "#fff" }} />

      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 80px)", margin: "0 0 12px", color: "#fff" }}>
          Every Dog Deserves a Chance
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.88)", maxWidth: 560, margin: "0 auto 32px" }}>
          Your support makes rescue missions possible. Together, we can end the suffering.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
          <button className="btn btn-light" onClick={onDonate}>Donate Now</button>
          <a href="#ways" className="btn btn-outline-light">Get Involved</a>
        </div>

        <div style={{
          maxWidth: 640, margin: "0 auto", paddingTop: 56,
          borderTop: "1px solid rgba(255,255,255,0.25)",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start", textAlign: "left",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Stay Connected</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)" }}>Get rescue updates and survivor stories in your inbox.</div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setSubbed(true); setEmail(""); } }}
            style={{ display: "flex", gap: 8 }}>
            <input
              type="email" placeholder={subbed ? "Subscribed ♡" : "Email address"}
              value={email} onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "14px 18px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.12)",
                color: "#fff", fontSize: 14, outline: "none",
              }}
            />
            <button type="submit" className="btn btn-light" style={{ height: 46 }}>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section-dark" style={{ padding: "72px 0 40px", borderTop: "1px solid var(--line-dark)" }}>
      <div className="wrap">
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 48,
          paddingBottom: 56, borderBottom: "1px solid var(--line-dark)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img src="assets/r2r-logo.png" alt="" style={{ width: 52, height: 52 }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "#fff", lineHeight: 1.05 }}>Run 2 The<br />Rescue</div>
            </div>
            <p style={{ color: "var(--on-dark-2)", fontSize: 14, maxWidth: 340, margin: "0 0 20px" }}>
              Saving lives, one rescue at a time. Dedicated to rescuing dogs from the meat trade and giving them a second chance at life.
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--purple-400)" }}>
              ✦ Run · Rescue · Repeat
            </div>
          </div>
          <FooterCol title="Get Involved" links={[["Adopt","Adopt.html"],["Foster","Foster.html"],["Sponsor","Sponsor.html"],["Donate","Donate.html"]]} />
          <FooterCol title="Resources" links={[["News","News.html"],["Contact","Contact.html"],["Home","index.html"]]} />
        </div>
        <div style={{
          paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          fontSize: 13, color: "var(--on-dark-3)",
        }}>
          <div>© 2026 Run 2 The Rescue. All rights reserved. 501(c)(3) Nonprofit Organization.</div>
          <a href="#" style={{ color: "var(--on-dark-2)" }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 20, fontWeight: 600 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {links.map(([l, h]) => (
          <a key={l} href={h} style={{ color: "var(--on-dark-2)", fontSize: 14, transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple-400)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--on-dark-2)"}>{l}</a>
        ))}
      </div>
    </div>
  );
}

/* Homepage teaser linking to the standalone Reality page */
function RealityTeaser() {
  return (
    <section className="section-dark" style={{ padding: "64px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-dark" style={{ top: 28, left: "6%", width: 40, height: 40 }} />
      <Paw className="paw-dark" style={{ bottom: 28, right: "7%", width: 44, height: 44 }} />
      <div className="wrap" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>Before the rescue
        </div>
        <h2 className="display" style={{ fontSize: "clamp(30px, 3.8vw, 50px)", margin: "0 0 14px", color: "#fff" }}>
          Every survivor comes from somewhere
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--on-dark-2)", margin: "0 auto 26px", maxWidth: 520 }}>
          The dogs we rescue are pulled from the meat trade in East Asia — caged,
          crowded, and waiting. It is hard to look at, so we've given it its own
          page with a content notice. See it when you're ready.
        </p>
        <a href="Reality.html" className="btn btn-outline-light">See the reality they face <span className="arrow">→</span></a>
      </div>
    </section>
  );
}

Object.assign(window, { Press, Mission, Survivors, Journey, Feature, Reality, RealityTeaser, Ways, Voices, Team, FinalCTA, Footer });
