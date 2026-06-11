/* Run 2 The Rescue, plum/lavender theme */
const { useState, useEffect, useRef, useMemo } = React;

/* Web3Forms submit for homepage forms (the homepage does not load shared.jsx,
   which defines the same helper for subpages). KEEP THIS KEY IN SYNC WITH shared.jsx. */
const WEB3FORMS_KEY = "f328982c-e9de-4611-8bf7-49034cfa2d21"; // routes to info@run2therescue.org

/* Honeypot. Humans never see the hidden botcheck field; form-filling bots
   complete it. If it has a value at submit time, drop the submission silently
   (the bot still sees the normal thank-you). */
function botcheckTripped() {
  return Array.from(document.querySelectorAll('input[name="botcheck"]'))
    .some((i) => i.checked || (i.value || "").trim() !== "");
}
function Botcheck() {
  return (
    <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
  );
}

async function submitForm(fields, formName) {
  if (botcheckTripped()) return { ok: true };
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "PASTE_KEY_HERE") {
    console.log("[submitForm] Demo mode (no Web3Forms key set). Form:", formName, fields);
    return { ok: false, demo: true };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[R2TR Site] ${formName}`,
        from_name: "Run 2 The Rescue Website",
        ...fields,
      }),
    });
    const data = await res.json();
    return { ok: data.success === true };
  } catch (e) {
    console.warn("[submitForm] network error:", e);
    return { ok: false, error: e.message };
  }
}

/* Image dictionary. Real R2R photography where available, Unsplash stock fallback elsewhere. */
const IMG = {
  hero: "assets/survivors-hero-crop.webp",
  teamBrandy: "assets/Brandy_profile.jpg",
  teamBonnie: "assets/Bonnie_profile.jpg",
  teamGreg: "assets/Greg_profile.jpg",
  teamAman: "assets/Aman_profile.JPG",
  kronk: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format",
  survivor1: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&auto=format",
  survivor2: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&q=80&auto=format",
  survivor3: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=700&q=80&auto=format",
  survivor4: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=700&q=80&auto=format",
  // Before/after pairs, real R2R survivors (Journey section)
  kronkBefore: "assets/kronk-before-rescue.jpg",
  kronkAfter:  "assets/kronk-after-snow.jpg",
  alfieBefore: "assets/alfie-before-rescue.jpg",
  alfieAfter:  "assets/alfie-after-portrait.jpg",
  gertieBefore:"assets/gertie-before-rescue.webp",
  gertieAfter: "assets/gertie-after-portrait.jpg",
  honeyBefore: "assets/honey-before-rescue.jpg?v=2",
  honeyAfter:  "assets/honey-after-portrait.webp",
  voice: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80&auto=format",
  reality1: "assets/reality-trade-context-1.jpg",
  reality2: "assets/reality-trade-context-2.jpg",
  reality3: "assets/reality-trade-context-3.jpg",
};

/* Paw print SVG */
function Paw({ style = {}, className = "" }) {
  return (
    <svg className={`paw ${className}`} style={style} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <ellipse cx="14" cy="22" rx="7" ry="9"/>
      <ellipse cx="32" cy="14" rx="7" ry="9"/>
      <ellipse cx="50" cy="22" rx="7" ry="9"/>
      <ellipse cx="22" cy="40" rx="6" ry="8"/>
      <ellipse cx="42" cy="40" rx="6" ry="8"/>
      <path d="M32 32 C18 32 14 48 22 54 C28 58 36 58 42 54 C50 48 46 32 32 32 Z"/>
    </svg>
  );
}

function Img({ src, alt, style = {}, ...rest }) {
  return (
    <img src={src} alt={alt} loading="lazy"
      style={{
        width: "100%", height: "100%", objectFit: "cover",
        display: "block", borderRadius: "inherit",
        ...style,
      }}
      {...rest}
    />
  );
}

function Nav({ onDonate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const mobileLinks = [
    ["Adopt", "/adopt"], ["Sponsor", "/sponsor"], ["Foster", "/foster"],
    ["Donate", "/donate"], ["News", "/news"], ["Merch", "/merch"], ["Contact", "/contact"],
  ];
  const handleDonate = onDonate || (() => { window.location.href = "/donate"; });
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "oklch(0.18 0.035 310 / 0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line-dark)" : "1px solid transparent",
      transition: "background .3s ease, border-color .3s ease",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 120, gap: 16 }}>
        <a href="/" aria-label="Run 2 The Rescue" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <img src="assets/r2r-logo.png" alt="" style={{ width: 104, height: 104 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.05, color: "#fff" }}>
            Run 2 The<br />Rescue
          </div>
        </a>
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 14 }}>
            {[["Adopt", "/adopt"], ["Sponsor", "/sponsor"], ["Foster", "/foster"], ["News", "/news"], ["Merch", "/merch"], ["Contact", "/contact"]].map(([l, h]) => (
              <a key={l} href={h} style={{ color: "var(--on-dark-2)", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--on-dark-2)"}>{l}</a>
            ))}
          </div>
          <button className="btn btn-accent nav-donate-desktop" style={{ height: 44, padding: "0 22px" }} onClick={onDonate}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Donate<svg className="donate-heart" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span></button>
        </div>
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`nav-hamburger-bar ${menuOpen ? "a" : ""}`} />
          <span className={`nav-hamburger-bar ${menuOpen ? "b" : ""}`} />
          <span className={`nav-hamburger-bar ${menuOpen ? "c" : ""}`} />
        </button>
      </div>
      <div className={`nav-mobile-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nav-mobile-inner">
          {mobileLinks.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >{l}</a>
          ))}
          <button
            className="btn btn-accent nav-mobile-donate"
            onClick={() => { setMenuOpen(false); handleDonate(); }}
          ><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Donate<svg className="donate-heart" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span></button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onDonate, variant }) {
  if (variant === "editorial") return <HeroEditorial onDonate={onDonate} />;
  if (variant === "split") return <HeroSplit onDonate={onDonate} />;
  return <HeroCentered onDonate={onDonate} />;
}

function HeroVideoBG() {
  // Cinematic hero: real footage of rescued dogs running free, darkened so the
  // headline stays legible. Poster frame shows instantly before the video loads.
  //
  // Mobile autoplay gotcha: React sets `muted` as a DOM *property*, so the
  // attribute never appears in the markup — and iOS/Android only autoplay
  // videos they can see are muted. Set the attribute by hand and nudge play();
  // if Low Power Mode still blocks it, retry on the first touch.
  const vidRef = useRef(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    const onTouch = () => tryPlay();
    window.addEventListener("touchstart", onTouch, { passive: true, once: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);
  return (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, overflow: "hidden", zIndex: 0,
    }}>
      <video
        ref={vidRef}
        autoPlay muted loop playsInline
        poster="assets/hero-meadow-poster.jpg"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          filter: "saturate(0.82) brightness(0.55)",
        }}
      >
        <source src="assets/hero-meadow.mp4" type="video/mp4" />
      </video>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, oklch(0.18 0.035 310 / 0.55) 0%, oklch(0.18 0.035 310 / 0.65) 50%, oklch(0.18 0.035 310 / 0.95) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.18 0.035 310 / 0.6) 100%)",
      }} />
    </div>
  );
}

/* On load, a purple heart pops, beats, then bursts as the word "Love." scales in.
   Inherits the hero's accent styling (italic, purple) via the <em>. The visible
   "Love." text stays in the DOM for SEO/crawlers; reduced-motion shows it plainly. */
function LoveReveal() {
  return (
    <em className="love-reveal" aria-label="Love.">
      <span className="love-heart" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </span>
      <span className="love-text" aria-hidden="true">Love.</span>
      <style>{`
        .love-reveal { position: relative; display: inline-block; }
        .love-reveal .love-text {
          display: inline-block; opacity: 0; transform: scale(.35);
          transform-origin: center 58%;
          animation: loveTextIn .6s cubic-bezier(.2,.85,.25,1.25) .8s forwards;
        }
        .love-reveal .love-heart {
          position: absolute; left: 50%; top: 50%; width: .8em; height: .8em;
          transform: translate(-50%,-50%); color: var(--purple-400);
          display: inline-flex; pointer-events: none;
          animation: loveBeat .8s ease-in-out both, loveBurst .45s ease .7s forwards;
        }
        .love-reveal .love-heart svg { width: 100%; height: 100%; display: block; }
        @keyframes loveBeat {
          0% { transform: translate(-50%,-50%) scale(.4); opacity: 0; }
          18% { opacity: 1; }
          38% { transform: translate(-50%,-50%) scale(1.2); }
          58% { transform: translate(-50%,-50%) scale(.92); }
          78% { transform: translate(-50%,-50%) scale(1.08); }
          100% { transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes loveBurst { to { opacity: 0; transform: translate(-50%,-50%) scale(2.6); } }
        @keyframes loveTextIn {
          0% { opacity: 0; transform: scale(.35); }
          65% { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .love-reveal .love-text { opacity: 1; transform: none; animation: none; }
          .love-reveal .love-heart { display: none; }
        }
      `}</style>
    </em>
  );
}

function HeroCentered({ onDonate }) {
  return (
    <header style={{ position: "relative", paddingTop: 32, paddingBottom: 56, overflow: "hidden" }}>
      <HeroVideoBG />
      <Paw className="paw-dark" style={{ top: 120, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ top: 280, right: "8%", width: 64, height: 64, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ bottom: 100, left: "12%", width: 48, height: 48, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ bottom: 40, right: "14%", width: 40, height: 40, color: "#fff", opacity: 0.18 }} />

      <div className="wrap" style={{ textAlign: "left", position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>
          Run · Rescue · Repeat
        </div>
        <h1 className="display" style={{
          fontSize: "clamp(48px, 7.5vw, 104px)",
          margin: "0 0 20px",
          maxWidth: "13ch",
          color: "#fff",
        }}>
          Give Hope.<br />Change a Life.<br />Heal with <LoveReveal />
        </h1>
        <p style={{
          maxWidth: 460, margin: "0 0 28px", fontSize: 17, lineHeight: 1.5,
          color: "var(--on-dark-2)",
        }}>
          Rescuing dogs from the dog meat trade in East Asia and giving them a second chance at life.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-start", flexWrap: "wrap", marginBottom: 48 }}>
          <a href="#survivors" className="btn btn-accent">Meet Our Survivors</a>
          <Magnetic><button className="btn btn-outline-light" onClick={onDonate}>Donate Now</button></Magnetic>
        </div>

        <div className="stat-row" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          maxWidth: 820, margin: "0", paddingTop: 32,
          borderTop: "1px solid var(--line-dark)",
        }}>
          <Stat num="1,200+" label="Dogs rescued" />
          <Stat num="800+" label="Forever homes" />
          <Stat num="2" label="Years on the ground" />
        </div>
      </div>
    </header>
  );
}

function HeroSplit({ onDonate }) {
  return (
    <header style={{ position: "relative", paddingTop: 40, paddingBottom: 80, overflow: "hidden" }}>
      <HeroVideoBG />
      <Paw className="paw-dark" style={{ top: 100, right: "4%", width: 56, height: 56, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ bottom: 80, left: "5%", width: 48, height: 48, color: "#fff", opacity: 0.18 }} />

      <div className="wrap hero-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        gap: 64, alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            <span style={{ color: "var(--purple-400)" }}>✦ </span>
            501(c)(3) · est. 2024
          </div>
          <h1 className="display" style={{
            fontSize: "clamp(48px, 7.6vw, 108px)",
            margin: "0 0 28px",
            color: "#fff",
          }}>
            Give Hope.<br />Change a Life.<br />Heal with <em>Love.</em>
          </h1>
          <p style={{ maxWidth: 500, fontSize: 18, color: "var(--on-dark-2)", marginBottom: 32 }}>
            Rescuing dogs from the dog meat trade in East Asia and giving them a second chance at life.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#survivors" className="btn btn-accent">Meet Our Survivors</a>
            <button className="btn btn-outline-light" onClick={onDonate}>Donate Now</button>
          </div>
        </div>
        <div className="hero-media" style={{ position: "relative", minWidth: 0 }}>
          <div style={{
            position: "relative", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden",
            boxShadow: "var(--shadow-dark)",
          }}>
            <Img src={IMG.hero} alt="Rescued dog on a couch" />
          </div>
          <div style={{
            position: "absolute", left: -24, bottom: 32,
            background: "#fff", color: "var(--ink)",
            padding: "14px 18px", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "var(--shadow)",
          }}>
            <img src="assets/r2r-logo.png" alt="" style={{ width: 36, height: 36 }} />
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Today's featured</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Kronk, in People</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroEditorial({ onDonate }) {
  return (
    <header style={{ paddingTop: 72, paddingBottom: 120, position: "relative", overflow: "hidden" }}>
      <HeroVideoBG />
      <Paw className="paw-dark" style={{ top: 90, right: "8%", width: 52, height: 52, color: "#fff", opacity: 0.18 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 40 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>
          Run · Rescue · Repeat
        </div>
        <h1 className="display" style={{
          fontSize: "clamp(64px, 12vw, 180px)",
          margin: "0 0 48px", color: "#fff", lineHeight: 0.94,
        }}>
          Give Hope.<br />Change a <em>Life.</em>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 64, alignItems: "end" }}>
          <p style={{ fontSize: 20, color: "var(--on-dark-2)", maxWidth: 480 }}>
            Rescuing dogs from the dog meat trade in East Asia and giving them a second chance at life.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-accent" onClick={onDonate}>Donate Now</button>
            <a href="#survivors" className="btn btn-outline-light">Meet Survivors</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ num, label, dark = true }) {
  // Parse num for count-up: "1,200+" -> {to: 1200, suffix: "+"}
  const match = /^([\d,]+)(\+?)(.*)$/.exec(num);
  const to = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? (match[2] || "") : "";
  const tail = match ? (match[3] || "") : "";
  return (
    <div>
      <div className="display" style={{ fontSize: 44, color: dark ? "#fff" : "var(--ink)" }}>
        {to != null ? (
          <>
            <CountUp to={to} />
            <span style={{ color: "var(--purple-400)" }}>{suffix}</span>
            {tail}
          </>
        ) : num}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: dark ? "var(--on-dark-3)" : "var(--ink-3)",
        letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 8,
      }}>{label}</div>
    </div>
  );
}

/* Live animal data from the Shelterluv proxy (/api/animals).
   One shared fetch — every component that calls useAnimals reuses it. */
let __animalsPromise = null;
function loadAnimals() {
  if (!__animalsPromise) {
    __animalsPromise = fetch("/api/animals")
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((d) => (d && d.animals) || [])
      .catch((e) => { __animalsPromise = null; throw e; });
  }
  return __animalsPromise;
}
function useAnimals() {
  const [state, setState] = useState({ status: "loading", animals: [], error: null });
  useEffect(() => {
    let alive = true;
    loadAnimals()
      .then((animals) => { if (alive) setState({ status: "ready", animals: animals, error: null }); })
      .catch((e) => { if (alive) setState({ status: "error", animals: [], error: String((e && e.message) || e) }); });
    return () => { alive = false; };
  }, []);
  return state;
}

Object.assign(window, { Paw, Img, IMG, Nav, Hero, Stat, HeroVideoBG, useAnimals, Botcheck });
