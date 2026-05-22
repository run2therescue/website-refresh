/* Run 2 The Rescue — plum/lavender theme */
const { useState, useEffect, useRef, useMemo } = React;

/* Image dictionary. Real R2R photography where available, Unsplash stock fallback elsewhere. */
const IMG = {
  hero: "assets/survivors-hero-crop.png",
  teamBrandy: "assets/brandy-transport-1.png",
  teamBonnie: "assets/bonnie-transport-1.jpg",
  kronk: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format",
  survivor1: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&auto=format",
  survivor2: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&q=80&auto=format",
  survivor3: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=700&q=80&auto=format",
  survivor4: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=700&q=80&auto=format",
  // Before/after pairs — real R2R survivors (Journey section)
  kronkBefore: "assets/kronk-before-rescue.jpg",
  kronkAfter:  "assets/kronk-after-snow.jpg",
  alfieBefore: "assets/alfie-before-rescue.jpg",
  alfieAfter:  "assets/alfie-after-portrait.jpg",
  gertieBefore:"assets/gertie-before-rescue.png",
  gertieAfter: "assets/gertie-after-portrait.jpg",
  honeyBefore: "assets/honey-before-rescue.jpg",
  honeyAfter:  "assets/honey-after-portrait.png",
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
    ["Adopt", "Adopt.html"], ["Sponsor", "Sponsor.html"], ["Foster", "Foster.html"],
    ["Donate", "Donate.html"], ["News", "News.html"], ["Merch", "Merch.html"], ["Contact", "Contact.html"],
  ];
  const handleDonate = onDonate || (() => { window.location.href = "Donate.html"; });
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "oklch(0.18 0.035 310 / 0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line-dark)" : "1px solid transparent",
      transition: "background .3s ease, border-color .3s ease",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 120, gap: 16 }}>
        <a href="index.html" aria-label="Run 2 The Rescue" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <img src="assets/r2r-logo.png" alt="" style={{ width: 104, height: 104 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.05, color: "#fff" }}>
            Run 2 The<br />Rescue
          </div>
        </a>
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 14 }}>
            {[["Adopt", "Adopt.html"], ["Sponsor", "Sponsor.html"], ["Foster", "Foster.html"], ["News", "News.html"], ["Merch", "Merch.html"], ["Contact", "Contact.html"]].map(([l, h]) => (
              <a key={l} href={h} style={{ color: "var(--on-dark-2)", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--on-dark-2)"}>{l}</a>
            ))}
          </div>
          <button className="btn btn-accent nav-donate-desktop" style={{ height: 44, padding: "0 22px" }} onClick={onDonate}>Donate</button>
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
          >Donate</button>
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
  // Sandbox blocks video streaming; use a cross-fading Ken Burns still sequence
  // of rescue photography for a cinematic "reel" feel that always loads.
  const stills = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1600&q=80&auto=format",
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % stills.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, overflow: "hidden", zIndex: 0,
    }}>
      {stills.map((src, i) => (
        <img key={src} src={src} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          filter: "saturate(0.75) brightness(0.55)",
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? "scale(1.08)" : "scale(1.0)",
          transition: "opacity 1.6s ease, transform 6s ease-out",
        }} />
      ))}
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

function HeroCentered({ onDonate }) {
  return (
    <header style={{ position: "relative", paddingTop: 32, paddingBottom: 56, overflow: "hidden" }}>
      <HeroVideoBG />
      <Paw className="paw-dark" style={{ top: 120, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ top: 280, right: "8%", width: 64, height: 64, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ bottom: 100, left: "12%", width: 48, height: 48, color: "#fff", opacity: 0.18 }} />
      <Paw className="paw-dark" style={{ bottom: 40, right: "14%", width: 40, height: 40, color: "#fff", opacity: 0.18 }} />

      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>
          Run · Rescue · Repeat
        </div>
        <h1 className="display" style={{
          fontSize: "clamp(48px, 7.5vw, 104px)",
          margin: "0 auto 20px",
          maxWidth: "14ch",
          color: "#fff",
        }}>
          Give Hope.<br />Change a Life.<br />Heal with <em>Love.</em>
        </h1>
        <p style={{
          maxWidth: 540, margin: "0 auto 28px", fontSize: 17, lineHeight: 1.5,
          color: "var(--on-dark-2)",
        }}>
          Rescuing dogs from the meat trade in East Asia and giving them a second chance at life.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <Magnetic><button className="btn btn-accent" onClick={onDonate}>Donate Now</button></Magnetic>
          <a href="#survivors" className="btn btn-outline-light">Meet Our Survivors</a>
        </div>

        <div className="stat-row" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
          maxWidth: 820, margin: "0 auto", paddingTop: 32,
          borderTop: "1px solid var(--line-dark)",
        }}>
          <Stat num="1,200+" label="Dogs rescued" />
          <Stat num="800+" label="Forever homes" />
          <Stat num="14" label="Years on the ground" />
          <Stat num="2" label="Countries · CN · KR" />
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
            501(c)(3) · est. 2012
          </div>
          <h1 className="display" style={{
            fontSize: "clamp(48px, 7.6vw, 108px)",
            margin: "0 0 28px",
            color: "#fff",
          }}>
            Give Hope.<br />Change a Life.<br />Heal with <em>Love.</em>
          </h1>
          <p style={{ maxWidth: 500, fontSize: 18, color: "var(--on-dark-2)", marginBottom: 32 }}>
            Rescuing dogs from the meat trade in East Asia and giving them a second chance at life.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-accent" onClick={onDonate}>Donate Now</button>
            <a href="#survivors" className="btn btn-outline-light">Meet Our Survivors</a>
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
              <div style={{ fontWeight: 600, fontSize: 14 }}>Kronk — in People</div>
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
            Rescuing dogs from the meat trade in East Asia and giving them a second chance at life.
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

Object.assign(window, { Paw, Img, IMG, Nav, Hero, Stat, HeroVideoBG });
