/* Sections */

/* Press logos, stylized wordmarks for each outlet. Rendered at 
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

/* One press mark, shows the publication logo from assets/press/,
   falls back to a styled wordmark until the logo file is added. */
function PressMark({ name, slug, href, h }) {
  const [failed, setFailed] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="press-logo"
      style={{ display: "inline-flex", alignItems: "center", opacity: 0.72, transition: "opacity .2s ease" }}
      onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = 0.72; }}
    >
      {failed ? (
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(15px, 1.7vw, 20px)", color: "var(--ink-2)", whiteSpace: "nowrap",
        }}>{name}</span>
      ) : (
        <img src={`assets/press/${slug}.png?v=1`} alt={name}
          style={{ height: h || 30, width: "auto", display: "block" }}
          onError={() => setFailed(true)} />
      )}
    </a>
  );
}

function Press() {
  const items = [
    { name: "The Dodo", slug: "thedodo", h: 40, href: "https://www.thedodo.com/daily-dodo/broken-dog-who-spent-his-life-in-a-cage-has-no-idea-hes-a-little-different" },
    { name: "People", slug: "people", href: "https://people.com/injured-malamute-with-crooked-head-transforms-after-dog-meat-farm-rescue-11904110" },
    { name: "Long Island Press", slug: "longislandpress", href: "https://www.longislandpress.com/2026/01/27/how-a-long-island-advocate-is-rescuing-dogs-from-the-global-meat-trade/" },
    { name: "New York Post", slug: "nypost", href: "https://nypost.com/2026/04/26/us-news/meet-the-nyers-saving-hundreds-of-adorable-dogs-from-ending-up-on-the-menu/" },
  ];
  return (
    <section id="press" className="press-section section-light" style={{ padding: "32px 0", borderBottom: "1px solid var(--line-light)" }}>
      <div className="wrap">
        <div className="press-row" style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 44px)", justifyContent: "center", flexWrap: "wrap", rowGap: 14 }}>
          <span className="eyebrow-dark" style={{ color: "var(--ink-3)", fontSize: 11, whiteSpace: "nowrap" }}>As Featured In</span>
          {items.map(it => <PressMark key={it.name} {...it} />)}
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
        <div className="mission-grid" style={{
          background: "#fff", borderRadius: 20, padding: "clamp(28px, 4vw, 56px)",
          boxShadow: "0 2px 0 var(--line-light)",
          borderLeft: "4px solid var(--purple-500)",
          display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 40, alignItems: "center",
        }}>
          <div>
            <h2 className="display display-serif-em" style={{ fontSize: "clamp(26px, 3.2vw, 42px)", margin: 0, color: "var(--ink)", lineHeight: 1.15 }}>
              Our mission is to give <em>every</em> dog rescued from the meat trade a chance at a <em>loving</em>, safe life.
            </h2>
          </div>
          <div>
            <div className="eyebrow-dark" style={{ marginBottom: 6 }}>The scale of it</div>
            <div className="display" style={{ fontSize: 68, lineHeight: 1, color: "var(--ink)", marginBottom: 6 }}><CountUp to={30} suffix="M" /></div>
            <div style={{ fontSize: 15, color: "var(--ink-2)", marginBottom: 8 }}>
              dogs are killed in Asia's meat trade every year.
            </div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, lineHeight: 1.35,
              color: "var(--purple-600)", marginBottom: 14, maxWidth: 340,
            }}>
              That's roughly one dog, every second of every day.
            </div>
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
  // Live from Shelterluv — a four-dog preview of the full Adopt page.
  const { status, animals } = useAnimals();
  const available = animals.filter((a) => a.available !== false);
  const dogs = available.slice(0, 4);
  return (
    <section id="survivors" className="section-light" style={{ padding: "72px 0 24px", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 40, left: "5%", width: 40, height: 40 }} />
      <div className="wrap">
        <div className="survivors-hero" style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 0.92fr)",
          gap: 44, alignItems: "stretch", marginBottom: 56,
        }}>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", margin: "0 0 16px", color: "var(--ink)" }}>
              Hopeful Survivors in Search of a Loving Home
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-2)", margin: "0 0 22px", maxWidth: 480, lineHeight: 1.6 }}>
              Our team rescues dogs from the meat trade, provides critical medical treatment, and places them into loving homes, giving every survivor a second chance at a happy, healthy life.
            </p>
            <Magnetic><a href="Adopt.html" className="btn btn-accent">Adopt Today <span className="arrow">→</span></a></Magnetic>
            <div style={{ background: "var(--purple-500)", color: "#fff", borderRadius: 18, padding: "22px 26px", marginTop: 28 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>Where it began</div>
              <div className="display" style={{ fontSize: 22, marginBottom: 6 }}>Meet Sunny</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.92)", margin: 0 }}>
                Sunny's rescue is the story that started it all, the dog whose journey to safety inspired the founding of Run 2 The Rescue. Every survivor since follows the trail he opened.
              </p>
            </div>
          </div>
          <div style={{ borderRadius: 22, overflow: "hidden", background: "var(--lav-200)", minHeight: 380 }}>
            <Img src="assets/sunny.jpg" alt="Sunny, the rescue that inspired Run 2 The Rescue" style={{ objectPosition: "center 30%" }} />
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          flexWrap: "wrap", gap: "8px 16px", margin: "0 0 20px",
        }}>
          <h3 className="display" style={{ fontSize: "clamp(21px, 2.5vw, 30px)", margin: 0, color: "var(--ink)" }}>
            A few of our survivors
          </h3>
          <a href="Adopt.html" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontWeight: 600, fontSize: 14, color: "var(--purple-600)", transition: "color .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--purple-700)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--purple-600)"; }}
          >
            Meet all{available.length ? ` ${available.length}` : ""} survivors <span className="arrow">→</span>
          </a>
        </div>

        <div className="ways-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
        }}>
          {status === "loading" && [0, 1, 2, 3].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/5", background: "var(--lav-200)" }} />
              <div style={{ padding: 20 }}>
                <div style={{ height: 16, width: "55%", background: "var(--lav-200)", borderRadius: 6, marginBottom: 12 }} />
                <div style={{ height: 11, width: "100%", background: "var(--lav-100)", borderRadius: 6, marginBottom: 7 }} />
                <div style={{ height: 11, width: "80%", background: "var(--lav-100)", borderRadius: 6 }} />
              </div>
            </div>
          ))}
          {status === "error" && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--ink-3)", fontSize: 14, padding: "24px 0" }}>
              Our survivors are loading from our shelter system — refresh in a moment to meet them.
            </p>
          )}
          {status === "ready" && dogs.map(d => (
            <article key={d.id} className="reveal" onClick={() => onSponsor(d.name)} style={{
              background: "#fff", borderRadius: 20, overflow: "hidden",
              cursor: "pointer", transition: "transform .25s ease, box-shadow .25s ease",
              display: "flex", flexDirection: "column",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "var(--lav-200)" }}>
                <Img src={d.cover} alt={d.name} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 8 }}>
                  <div className="display" style={{ fontSize: 24, color: "var(--ink)" }}>{d.name}</div>
                  {d.ageGroup && (
                    <span style={{
                      fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--purple-600)",
                    }}>{d.ageGroup}</span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
                  {d.blurb && d.blurb.length > 104 ? d.blurb.slice(0, 104).trim() + "…" : d.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  // Real R2R survivors. beforeFocal / afterFocal control CSS object-position.
  const items = [
    { name: "Kronk",  before: IMG.kronkBefore,  after: IMG.kronkAfter,  story: "Pulled from a holding pen in Yulin. Featured in People Magazine." },
    { name: "Alfie",  before: IMG.alfieBefore,  after: IMG.alfieAfter,  story: "From trauma to trust. Pulled from the trade and finding his way home." },
    { name: "Gertie", before: IMG.gertieBefore, after: IMG.gertieAfter, story: "From fear to faith. Rescued from the trade and finding her people." },
    { name: "Honey",  before: IMG.honeyBefore,  after: IMG.honeyAfter,  story: "From forgotten to forever. A second chance, fully claimed.", beforeFocal: "20% center" },
  ];
  // Scroll-velocity reactive: the card track lags a few pixels with scroll
  // speed, then settles, gentle "this page responds to you" motion.
  const trackRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY, vel = 0, smooth = 0, raf = 0;
    const onScroll = () => { const y = window.scrollY; vel = y - lastY; lastY = y; };
    const tick = () => {
      smooth += (vel - smooth) * 0.1;
      vel *= 0.8;
      const shift = Math.max(-7, Math.min(7, smooth * 0.4));
      if (trackRef.current) trackRef.current.style.transform = `translate3d(0, ${shift}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="section-light" style={{ padding: "72px 0 96px", position: "relative" }}>
      <Paw className="paw-light" style={{ top: 40, left: "5%", width: 44, height: 44 }} />
      <div className="wrap">
        <div className="journey-pinned" style={{
          display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
          gap: 56, alignItems: "start",
        }}>
          <div className="journey-sticky" style={{ position: "sticky", top: 128, alignSelf: "start" }}>
            <div className="eyebrow-dark" style={{ marginBottom: 14 }}>
              <span style={{ color: "var(--purple-500)" }}>✦ </span>From trauma to trust
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.2vw, 60px)", margin: "0 0 16px", color: "var(--ink)" }}>
              Their Journey to a New Life
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 360 }}>
              From trauma to trust, from fear to faith. Four survivors, scroll through the moment each one's story turned.
            </p>
          </div>
          <div ref={trackRef} style={{ display: "flex", flexDirection: "column", gap: 28, willChange: "transform" }}>
            {items.map((it, i) => (
              <article key={it.name} className="reveal" style={{
                background: "#fff", borderRadius: 22, overflow: "hidden",
                boxShadow: "0 2px 6px oklch(0.4 0.05 310 / 0.06), 0 16px 38px oklch(0.4 0.05 310 / 0.10)",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--line-light)", aspectRatio: "2/1" }}>
                  <div style={{ position: "relative", background: "var(--plum-700)", overflow: "hidden" }}>
                    <Img src={it.before} alt={`${it.name} before rescue`} style={{ filter: "saturate(0.5) brightness(0.85)", objectPosition: it.beforeFocal || "center" }} />
                    <span style={{
                      position: "absolute", top: 12, left: 12,
                      background: "var(--plum-900)", color: "#fff", fontSize: 10,
                      padding: "4px 10px", borderRadius: 999,
                      fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>Before</span>
                  </div>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Img src={it.after} alt={`${it.name} after rescue`} style={{ objectPosition: it.afterFocal || "center" }} />
                    <span style={{
                      position: "absolute", top: 12, left: 12,
                      background: "#fff", color: "var(--ink)", fontSize: 10,
                      padding: "4px 10px", borderRadius: 999,
                      fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>After</span>
                  </div>
                </div>
                <div style={{ padding: "22px 24px", display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--purple-500)", flexShrink: 0 }}>0{i + 1}</span>
                  <div>
                    <div className="display" style={{ fontSize: 26, marginBottom: 4, color: "var(--ink)" }}>{it.name}</div>
                    <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{it.story}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
    "A dog presses toward the wire, one of dozens waiting",
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
            { c: "span 12", r: "span 2", video: "assets/reality-cage-clip.mp4", poster: "assets/reality-cage-poster.jpg", label: "Dozens crowd a single kennel, waiting, this is what every rescue interrupts" },
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
    { title: "Adopt a Survivor", kind: "adopt",   href: "Adopt.html" },
    { title: "Become a Foster",  kind: "foster",  href: "Foster.html" },
    { title: "Sponsor a Dog",    kind: "sponsor", href: "Sponsor.html" },
    { title: "Make a Donation",  kind: "donate",  href: "Donate.html" },
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
              <div className={"help-label help-label-" + it.kind}>
                <span className="help-icon"><HelpIcon kind={it.kind} /></span>
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
            Our mission is straightforward: be a beacon of hope for these courageous activists and the voiceless victims they protect. We fund rescue missions, medical care, and international transport to place survivors in safe, loving forever homes, while continuing to educate and advocate against animal cruelty worldwide.
          </p>
          <div style={{
            borderLeft: "3px solid var(--purple-500)", paddingLeft: 20,
            maxWidth: 520, margin: "0 auto 48px", textAlign: "left",
          }}>
            <div style={{ fontStyle: "italic", fontSize: 19, color: "#fff", marginBottom: 10 }}>
              "Run to the rescue with love, and peace will follow."
            </div>
            <div style={{ fontSize: 13, color: "var(--purple-400)" }}>River Phoenix</div>
          </div>
          <div className="display run-repeat" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--purple-400)", letterSpacing: "0.02em" }}>
            RUN. RESCUE. REPEAT.
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  // Leadership grid, add more team members here and the grid scales/centers.
  const people = [
    { name: "Brandy Cherven", role: "Chief Executive Officer", tag: "Co-Founder", img: IMG.teamBrandy, copy: "Driven by an unwavering love for animals and a commitment to ending the dog meat trade, Brandy cofounded R2TR to be a beacon of hope for voiceless victims and the courageous activists who rescue them." },
    { name: "Bonnie Klapper", role: "Chief Operating Officer", tag: "Co-Founder", img: IMG.teamBonnie, copy: "With firsthand experience witnessing the overwhelming challenges of rescue efforts in China and South Korea, Bonnie cofounded R2TR to give every survivor a second chance at a loving forever home." },
  ];
  return (
    <section className="section-dark" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-dark" style={{ top: 60, right: "6%", width: 52, height: 52 }} />
      <Paw className="paw-dark" style={{ bottom: 80, left: "5%", width: 56, height: 56 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ Leadership</div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "0 0 12px", color: "#fff" }}>
            The team behind the mission
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0 }}>
            The founders, and the growing team, driving Run 2 The Rescue forward.
          </p>
        </div>

        <div className="team-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 300px))",
          gap: 28, justifyContent: "center", maxWidth: 1120, margin: "0 auto",
        }}>
          {people.map(p => (
            <div key={p.name} className="reveal" style={{
              background: "var(--plum-700)", borderRadius: 24, overflow: "hidden",
              padding: 20, border: "1px solid var(--line-dark)",
              transition: "transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 24px 48px -22px oklch(0.1 0.04 310 / 0.7)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", marginBottom: 18, background: "var(--plum-600)" }}>
                <Img src={p.img} alt={p.name} />
              </div>
              {p.tag && (
                <span style={{
                  display: "inline-block", marginBottom: 10,
                  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--purple-400)", background: "oklch(0.72 0.14 305 / 0.15)",
                  padding: "4px 10px", borderRadius: 999,
                }}>{p.tag}</span>
              )}
              <div className="display" style={{ fontSize: 24, marginBottom: 4, color: "#fff" }}>{p.name}</div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--on-dark-3)", marginBottom: 14 }}>{p.role}</div>
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

        <div className="cta-connect" style={{
          maxWidth: 640, margin: "0 auto", paddingTop: 56,
          borderTop: "1px solid rgba(255,255,255,0.25)",
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start", textAlign: "left",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Stay Connected</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)" }}>Get rescue updates and survivor stories in your inbox.</div>
          </div>
          <form className="cta-form" onSubmit={(e) => { e.preventDefault(); if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setSubbed(true); setEmail(""); } }}
            style={{ display: "flex", gap: 8 }}>
            <input
              type="email" className="cta-email"
              placeholder={subbed ? "Subscribed ♡" : "Email address"}
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
        <div className="footer-grid" style={{
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
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a href="https://www.facebook.com/people/Run-2-The-Rescue/61564710401329/" target="_blank" rel="noopener noreferrer" aria-label="Run 2 The Rescue on Facebook" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--plum-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-dark-2)", transition: "background .2s ease, color .2s ease, transform .2s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--purple-500)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--plum-700)"; e.currentTarget.style.color = "var(--on-dark-2)"; e.currentTarget.style.transform = "none"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8v8.44C19.61 23.1 24 18.1 24 12.07z"/></svg>
              </a>
              <a href="https://www.instagram.com/run2therescue" target="_blank" rel="noopener noreferrer" aria-label="Run 2 The Rescue on Instagram" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--plum-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-dark-2)", transition: "background .2s ease, color .2s ease, transform .2s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--purple-500)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--plum-700)"; e.currentTarget.style.color = "var(--on-dark-2)"; e.currentTarget.style.transform = "none"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.4 3.92 3.92 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@_run2therescue_" target="_blank" rel="noopener noreferrer" aria-label="Run 2 The Rescue on TikTok" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--plum-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-dark-2)", transition: "background .2s ease, color .2s ease, transform .2s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--purple-500)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--plum-700)"; e.currentTarget.style.color = "var(--on-dark-2)"; e.currentTarget.style.transform = "none"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.89-4.51c.3 0 .59.05.85.13V9.4a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 0 0 5.6 20.92a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 3.13 1.27V6.69z"/></svg>
              </a>
            </div>
          </div>
          <FooterCol title="Get Involved" links={[["Adopt","Adopt.html"],["Foster","Foster.html"],["Sponsor","Sponsor.html"],["Donate","Donate.html"]]} />
          <FooterCol title="Resources" links={[["News","News.html"],["Contact","Contact.html"],["Home","index.html"]]} />
        </div>
        <div style={{
          paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          fontSize: 13, color: "var(--on-dark-3)",
        }}>
          <div>© 2026 Run 2 The Rescue · 501(c)(3) Nonprofit · EIN 99-4240461</div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="assets/r2r-501c3-determination.pdf?v=1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--on-dark-2)" }}>501(c)(3) Determination Letter</a>
            <a href="Privacy.html" style={{ color: "var(--on-dark-2)" }}>Privacy Policy</a>
          </div>
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

/* "Share your story" — a dedicated adopter-testimonial submission, kept
   separate from Contact: a story is content meant to be published, so it
   needs explicit consent. Stories email the team; a human reviews and
   features them — nothing here is auto-published.

   TO GO LIVE: create a free Web3Forms access key at https://web3forms.com
   for the inbox that should receive adopter stories, and paste it below.
   While this is blank the form still works but shows a thank-you without
   sending. The same pattern (one key per inbox) wires up the other forms. */
const STORY_FORM_ACCESS_KEY = "";

function ShareStoryModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", dog: "", year: "", story: "", credit: "first", consent: false });
  const [photo, setPhoto] = useState(null);
  const [step, setStep] = useState("form"); // form | sending | done | error

  useEffect(() => {
    if (!open) return;
    setStep("form");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
  const canSubmit = form.name.trim().length > 1 && emailOk && form.story.trim().length > 12 && form.consent;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || step === "sending") return;
    if (!STORY_FORM_ACCESS_KEY) { setStep("done"); return; } // not wired to email yet
    setStep("sending");
    try {
      const fd = new FormData();
      fd.append("access_key", STORY_FORM_ACCESS_KEY);
      fd.append("subject", `New adopter story — ${form.dog || "a survivor"}`);
      fd.append("from_name", form.name);
      fd.append("Adopter", form.name);
      fd.append("Email", form.email);
      fd.append("Dog", form.dog);
      fd.append("Adoption year", form.year);
      fd.append("Story", form.story);
      fd.append("Credit as", form.credit === "full" ? "Full name" : "First name only");
      fd.append("Consent to publish", "Yes — granted in the submission form");
      if (photo) fd.append("photo", photo);
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      if (!r.ok) throw new Error("HTTP " + r.status);
      setStep("done");
    } catch (err) {
      setStep("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1px solid var(--line-light)", background: "#fff",
    fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--ink)", outline: "none",
  };
  const labelStyle = {
    display: "block", fontFamily: "var(--font-mono)", fontSize: 10,
    letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)",
    marginBottom: 6, fontWeight: 600,
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 24, maxWidth: 560, width: "100%",
        maxHeight: "calc(100vh - 48px)", overflowY: "auto", position: "relative",
        boxShadow: "var(--shadow)",
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 16, right: 16, width: 34, height: 34, borderRadius: "50%",
          background: "var(--lav-100)", color: "var(--ink)", display: "grid", placeItems: "center", fontSize: 15,
        }}>✕</button>

        <div style={{ padding: "34px 36px 32px" }}>
          {(step === "form" || step === "sending") && (
            <form onSubmit={submit}>
              <div className="eyebrow-dark" style={{ marginBottom: 10 }}>
                <span style={{ color: "var(--purple-500)" }}>✦ </span>A happy tail
              </div>
              <h2 className="display" style={{ fontSize: 30, margin: "0 0 8px", color: "var(--ink)", lineHeight: 1.15 }}>
                Share your survivor's story
              </h2>
              <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 22px", lineHeight: 1.6 }}>
                Adopted from Run 2 The Rescue? We'd love to hear how they're settling in. Our team reads every story and may feature yours.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Your name *</label>
                  <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Dog you adopted</label>
                  <input style={inputStyle} value={form.dog} onChange={(e) => set("dog", e.target.value)} placeholder="Their name" />
                </div>
                <div>
                  <label style={labelStyle}>Adoption year</label>
                  <input style={inputStyle} value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Your story *</label>
                <textarea rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.story}
                  onChange={(e) => set("story", e.target.value)}
                  placeholder="How is your survivor doing? What would you tell a family considering adoption?" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>A photo (optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setPhoto((e.target.files && e.target.files[0]) || null)}
                  style={{ fontSize: 13, color: "var(--ink-2)" }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>How should we credit you?</label>
                <div style={{ display: "flex", background: "var(--lav-100)", borderRadius: 10, padding: 3 }}>
                  {[["first", "First name only"], ["full", "Full name"]].map(([v, l]) => (
                    <button type="button" key={v} onClick={() => set("credit", v)} style={{
                      flex: 1, padding: "9px 0", borderRadius: 8, fontSize: 13,
                      background: form.credit === v ? "#fff" : "transparent",
                      color: form.credit === v ? "var(--ink)" : "var(--ink-3)",
                      boxShadow: form.credit === v ? "var(--shadow-sm)" : "none", fontWeight: 500,
                    }}>{l}</button>
                  ))}
                </div>
              </div>

              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: 20 }}>
                <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
                  style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--purple-500)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
                  I give Run 2 The Rescue permission to share my story and photo on its website and social media.
                </span>
              </label>

              <button type="submit" className="btn btn-accent" disabled={!canSubmit || step === "sending"}
                style={{ width: "100%", justifyContent: "center", opacity: (!canSubmit || step === "sending") ? 0.55 : 1 }}>
                {step === "sending" ? "Sending…" : "Share my story"}
              </button>
            </form>
          )}

          {step === "done" && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--purple-soft)", display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 28, color: "var(--purple-700)" }}>♡</div>
              <h2 className="display" style={{ fontSize: 28, margin: "0 0 10px", color: "var(--ink)" }}>
                Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
              </h2>
              <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
                Our team reads every story with care. If yours is featured, we'll reach out at {form.email || "your email"} first.
              </p>
              <button className="btn btn-accent" onClick={onClose}>Close</button>
            </div>
          )}

          {step === "error" && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <h2 className="display" style={{ fontSize: 26, margin: "0 0 10px", color: "var(--ink)" }}>That didn't go through.</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
                Something interrupted the submission. Please try again, or email us directly at info@run2therescue.com.
              </p>
              <button className="btn btn-accent" onClick={() => setStep("form")}>Try again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Adopter testimonials, real verbatim quotes, shown as speech bubbles.
   Add more by appending to `quotes`; each becomes another bubble. */
function Testimonials() {
  const [storyOpen, setStoryOpen] = useState(false);
  const quotes = [
    {
      quote: "Fig and Coal have brought so much love and joy into our home since adopting them from R2TR… we absolutely adore them.",
      name: "Megan Elizabeth",
      detail: "Adopted Fig & Coal",
      initials: "M",
      rotate: -1.8,
    },
    // Future verbatims drop in here.
  ];
  return (
    <section className="section-light" style={{ padding: "88px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 44, left: "5%", width: 42, height: 42 }} />
      <Paw className="paw-light" style={{ bottom: 40, right: "6%", width: 50, height: 50 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14, color: "var(--ink-3)" }}>
            <span style={{ color: "var(--purple-500)" }}>✦ </span>From families who said yes
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 56px)", margin: 0, color: "var(--ink)" }}>
            A second chance, in their own words
          </h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center", alignItems: "flex-start" }}>
          {quotes.map((q, i) => (
            <figure key={i} className="reveal" style={{
              position: "relative", flex: "1 1 360px", maxWidth: 440, margin: 0,
              background: "var(--lav-200)", borderRadius: 28, padding: "44px 34px 30px",
              transform: `rotate(${q.rotate}deg)`,
              boxShadow: "0 2px 6px oklch(0.4 0.06 310 / 0.07), 0 16px 36px oklch(0.4 0.06 310 / 0.11)",
            }}>
              <span aria-hidden="true" className="display" style={{
                position: "absolute", top: 8, left: 26, fontSize: 110, lineHeight: 1,
                fontWeight: 800, color: "var(--purple-400)", opacity: 0.3,
              }}>&ldquo;</span>
              <span aria-hidden="true" style={{
                position: "absolute", left: 48, bottom: -12, width: 26, height: 26,
                background: "var(--lav-200)", transform: "rotate(45deg)", borderRadius: 5,
              }} />
              <blockquote style={{
                position: "relative", fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: "clamp(19px, 1.9vw, 24px)", lineHeight: 1.5, color: "var(--ink)",
                margin: "30px 0 28px",
              }}>{q.quote}</blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <span style={{
                  width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
                  background: "var(--purple-500)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19,
                }}>{q.initials}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{q.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--purple-600)" }}>{q.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          <button type="button" onClick={() => setStoryOpen(true)} className="reveal" style={{
            flex: "1 1 360px", maxWidth: 440, minHeight: 236, boxSizing: "border-box",
            border: "2px dashed var(--purple-400)", borderRadius: 28, background: "transparent",
            padding: "40px 34px", transform: "rotate(1.6deg)", cursor: "pointer",
            font: "inherit", textAlign: "left",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 10,
            transition: "background .2s ease, border-color .2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "oklch(0.92 0.05 305 / 0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <span aria-hidden="true" className="display" style={{ fontSize: 60, lineHeight: 0.6, color: "var(--purple-400)" }}>&ldquo;</span>
            <span className="display" style={{ fontSize: "clamp(20px, 2vw, 26px)", color: "var(--ink)" }}>
              Adopted from R2TR?
            </span>
            <span style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
              We'd love to add your story here. Tell us how your survivor is settling in.
            </span>
            <span style={{ marginTop: 4, fontWeight: 600, fontSize: 14, color: "var(--purple-600)" }}>Share your story →</span>
          </button>
        </div>
      </div>
      <ShareStoryModal open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
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
          The dogs we rescue are pulled from the meat trade in East Asia, caged,
          crowded, and waiting. It is hard to look at, so we've given it its own
          page with a content notice. See it when you're ready.
        </p>
        <a href="Reality.html" className="btn btn-outline-light">See the reality they face <span className="arrow">→</span></a>
      </div>
    </section>
  );
}

Object.assign(window, { Press, Mission, Survivors, Journey, Feature, Reality, RealityTeaser, Testimonials, Ways, Voices, Team, FinalCTA, Footer });
