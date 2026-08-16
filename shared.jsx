/* Shared across every page, Nav, Footer, image bank, helpers */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

/* Image bank, reused across pages */
const IMG_BANK = {
  hero: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&q=80&auto=format",
  kronk: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format",
  dog1: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80&auto=format",
  dog2: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&q=80&auto=format",
  dog3: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=700&q=80&auto=format",
  dog4: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=700&q=80&auto=format",
  dog5: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&q=80&auto=format",
  dog6: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=700&q=80&auto=format",
  dog7: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=700&q=80&auto=format",
  dog8: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=700&q=80&auto=format",
  dog9: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=700&q=80&auto=format",
  dog10: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&q=80&auto=format",
  dog11: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=700&q=80&auto=format",
  dog12: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&q=80&auto=format",
  flight: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format",
  fosterHome: "https://images.unsplash.com/photo-1576515652031-fc429bab6545?w=900&q=80&auto=format",
  family: "https://images.unsplash.com/photo-1583511655857-d19026eec1c3?w=900&q=80&auto=format",
};

/* Tiny inline paw, the brand's eyebrow/kicker mark (replaces the generic sparkle) */
function PawGlyphS({ style = {} }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"
      style={{ width: "1.05em", height: "1.05em", display: "inline-block", verticalAlign: "-0.16em", marginRight: 7, ...style }}>
      <ellipse cx="14" cy="22" rx="7" ry="9"/>
      <ellipse cx="32" cy="14" rx="7" ry="9"/>
      <ellipse cx="50" cy="22" rx="7" ry="9"/>
      <ellipse cx="22" cy="40" rx="6" ry="8"/>
      <ellipse cx="42" cy="40" rx="6" ry="8"/>
      <path d="M32 32 C18 32 14 48 22 54 C28 58 36 58 42 54 C50 48 46 32 32 32 Z"/>
    </svg>
  );
}

/* Dogs kept out of the browsable grids + counts, by name. Covers dogs featured
   in the "Different Dogs" strip, dogs temporarily pulled, and adopted dogs that
   may still linger in the Shelterluv feed. */
const HIDDEN_FROM_GRID = ["twitch", "sweet pea", "checkers"];
const isHiddenDog = (a) => HIDDEN_FROM_GRID.includes(String((a && a.name) || "").trim().toLowerCase());

function PawS({ style = {}, className = "" }) {
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

/* Route Shelterluv photos through Vercel's image optimizer (on-the-fly resize +
   WebP). The full-res Shelterluv PNGs are the heaviest payload on Adopt/Sponsor;
   serving a width-appropriate WebP cuts most of it, especially on mobile. Local
   /assets and any non-Shelterluv URL are returned untouched. Width must be one
   of the `sizes` configured in vercel.json; quality must match `qualities`. */
function vimgS(url, w = 750) {
  if (!url || typeof url !== "string") return url;
  if (!/^https?:\/\/[^/]*\.shelterluv\.com\//i.test(url)) return url;
  return `/_vercel/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;
}

function ImgS({ src, alt, style = {}, imgWidth, ...rest }) {
  return (
    <img src={vimgS(src, imgWidth)} alt={alt} loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      {...rest}
    />
  );
}

/* Shared Nav, active link aware, with Donate button + mobile hamburger */
function NavS({ active = "home", onDonate }) {
  const [scrolled, setScrolled] = useStateS(false);
  const [menuOpen, setMenuOpen] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffectS(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const links = [
    { id: "adopt", label: "Adopt", href: "/adopt" },
    { id: "sponsor", label: "Sponsor", href: "/sponsor" },
    { id: "foster", label: "Foster", href: "/foster" },
    { id: "donate", label: "Donate", href: "/donate" },
    { id: "news", label: "News", href: "/news" },
    { id: "merch", label: "Merch", href: "/merch" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];
  const handleDonate = onDonate || (() => { window.location.href = "/donate"; });
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "oklch(0.18 0.035 310 / 0.88)" : "oklch(0.18 0.035 310 / 0.55)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid var(--line-dark)" : "1px solid transparent",
      transition: "background .3s ease, border-color .3s ease",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 116, gap: 16 }}>
        <a href="/" aria-label="Run 2 The Rescue" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <img src="assets/r2r-logo.png?v=3" alt="" style={{ width: 96, height: 96 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.05, color: "#fff", whiteSpace: "nowrap" }}>
            Run 2 The<br />Rescue
          </div>
        </a>
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div className="nav-links" style={{ display: "flex", gap: 26, fontSize: 14 }}>
            {links.map(l => {
              const isActive = l.id === active;
              return (
                <a key={l.id} href={l.href} style={{
                  color: isActive ? "#fff" : "var(--on-dark-2)",
                  position: "relative",
                  paddingBottom: 4,
                  borderBottom: isActive ? "1.5px solid var(--purple-400)" : "1.5px solid transparent",
                  transition: "color .2s, border-color .2s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "var(--on-dark-2)"; }}
                >{l.label}</a>
              );
            })}
          </div>
          <button className="btn btn-accent nav-donate-desktop" style={{ height: 42, padding: "0 20px", fontSize: 14 }} onClick={handleDonate}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Donate<svg className="donate-heart" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span></button>
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
          {links.map(l => {
            const isActive = l.id === active;
            return (
              <a
                key={l.id}
                href={l.href}
                className={`nav-mobile-link ${isActive ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >{l.label}</a>
            );
          })}
          <button
            className="btn btn-accent nav-mobile-donate"
            onClick={() => { setMenuOpen(false); handleDonate(); }}
          ><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Donate<svg className="donate-heart" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span></button>
        </div>
      </div>
    </nav>
  );
}

/* Shared Footer */
function FooterS() {
  return (
    <footer className="section-dark" style={{ padding: "64px 0 36px", borderTop: "1px solid var(--line-dark)" }}>
      <div className="wrap">
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 48,
          paddingBottom: 48, borderBottom: "1px solid var(--line-dark)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <img src="assets/r2r-logo.png?v=3" alt="" style={{ width: 48, height: 48 }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "#fff", lineHeight: 1.05 }}>Run 2 The<br />Rescue</div>
            </div>
            <p style={{ color: "var(--on-dark-2)", fontSize: 14, maxWidth: 340, margin: "0 0 18px" }}>
              Saving lives, one rescue at a time. Dedicated to rescuing dogs from the dog meat trade and giving them a second chance at life.
            </p>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple-400)" }}>
              <PawGlyphS />Run · Rescue · Repeat
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
              <a href="https://www.youtube.com/@R2TRDogs" target="_blank" rel="noopener noreferrer" aria-label="Run 2 The Rescue on YouTube" style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--plum-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-dark-2)", transition: "background .2s ease, color .2s ease, transform .2s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--purple-500)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--plum-700)"; e.currentTarget.style.color = "var(--on-dark-2)"; e.currentTarget.style.transform = "none"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.5a3 3 0 0 0-2.11-2.12C19.5 4 12 4 12 4s-7.5 0-9.39.38A3 3 0 0 0 .5 6.5 31.6 31.6 0 0 0 .12 12a31.6 31.6 0 0 0 .38 5.5 3 3 0 0 0 2.11 2.12C4.5 20 12 20 12 20s7.5 0 9.39-.38A3 3 0 0 0 23.5 17.5 31.6 31.6 0 0 0 23.88 12a31.6 31.6 0 0 0-.38-5.5zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/></svg>
              </a>
            </div>
          </div>
          <FooterColS title="Get Involved" links={[["Adopt","/adopt"],["Foster","/foster"],["Sponsor","/sponsor"],["Donate","/donate"]]} />
          <FooterColS title="Resources" links={[["News","/news"],["Contact","/contact"],["Home","/"]]} />
        </div>
        <div style={{
          paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          fontSize: 13, color: "var(--on-dark-3)",
        }}>
          <div>© 2026 Run 2 The Rescue · 501(c)(3) Nonprofit · EIN 99-4240461</div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="assets/r2r-501c3-determination.pdf?v=1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--on-dark-2)" }}>501(c)(3) Determination Letter</a>
            <a href="/privacy" style={{ color: "var(--on-dark-2)" }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterColS({ title, links }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: 18, fontWeight: 600 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {links.map(([l, h]) => (
          <a key={l} href={h} style={{ color: "var(--on-dark-2)", fontSize: 14, transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple-400)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--on-dark-2)"}>{l}</a>
        ))}
      </div>
    </div>
  );
}

/* Magnetic button wrapper */
function MagneticS({ children, strength = 0.25 }) {
  const ref = useRefS(null);
  const handleMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ display: "inline-flex", willChange: "transform", transition: "transform .3s cubic-bezier(.2,.7,.3,1.3)" }}
      ref={ref}
    >{children}</span>
  );
}

/* Count-up number when visible */
function CountUpS({ to, duration = 1400, suffix = "", prefix = "" }) {
  /* In the CI prerender (headless Chrome), show the final value immediately so
     the baked snapshot reads real numbers, never the pre-animation zeros. */
  const prerendering = typeof navigator !== "undefined" && navigator.webdriver === true;
  const [n, setN] = useStateS(prerendering ? to : 0);
  const ref = useRefS(null);
  useEffectS(() => {
    if (prerendering) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

/* Scroll progress bar */
function ScrollProgressS() {
  const [p, setP] = useStateS(0);
  useEffectS(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60,
      background: "transparent", pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${p * 100}%`,
        background: "linear-gradient(90deg, var(--purple-400), var(--purple-600))",
        boxShadow: "0 0 10px var(--purple-500)",
        transition: "width .1s linear",
      }} />
    </div>
  );
}

/* Reveal-on-scroll helper: attaches .in class */
function useRevealS() {
  useEffectS(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.classList.remove("pre");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    const t = setTimeout(() => {
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.9) el.classList.add("in");
        else { el.classList.add("pre"); io.observe(el); }
      });
    }, 80);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);
}

/* Live animal data from the Shelterluv proxy (/api/animals).
   One shared fetch per page — every component that calls useAnimalsS reuses it,
   so the Adopt hero and directory don't each hit the network. */
let __animalsPromiseS = null;
function loadAnimalsS() {
  if (!__animalsPromiseS) {
    __animalsPromiseS = fetch("/api/animals")
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((d) => (d && d.animals) || [])
      .catch((e) => { __animalsPromiseS = null; throw e; });
  }
  return __animalsPromiseS;
}
function useAnimalsS() {
  const [state, setState] = useStateS({ status: "loading", animals: [], error: null });
  useEffectS(() => {
    let alive = true;
    loadAnimalsS()
      .then((animals) => { if (alive) setState({ status: "ready", animals: animals, error: null }); })
      .catch((e) => { if (alive) setState({ status: "error", animals: [], error: String((e && e.message) || e) }); });
    return () => { alive = false; };
  }, []);
  return state;
}

/* ---------------------------------------------------------------
   Web3Forms helper — shared by every form on the site.
   All forms route to the single inbox configured in Web3Forms
   (info@run2therescue.org). To go live, paste the access key from
   web3forms.com into WEB3FORMS_KEY below. Until then, submitForm
   returns {ok:false, demo:true} and each form should still show
   its graceful thank-you UI (don't break the demo state).
--------------------------------------------------------------- */
const WEB3FORMS_KEY = "f328982c-e9de-4611-8bf7-49034cfa2d21"; // single key, all forms route to info@run2therescue.org

/* Honeypot. Humans never see the hidden botcheck field; form-filling bots
   complete it. If it has a value at submit time, drop the submission silently
   (the bot still sees the normal thank-you). */
function botcheckTrippedS() {
  return Array.from(document.querySelectorAll('input[name="botcheck"]'))
    .some((i) => i.checked || (i.value || "").trim() !== "");
}
function BotcheckS() {
  return (
    <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
  );
}

/* Ref callback for autoplay background videos. React sets `muted` as a DOM
   property only, so the attribute never reaches the markup — and mobile
   browsers refuse to autoplay a video they can't see is muted. Set the
   attribute by hand, nudge play(), then retry on every plausible signal
   (data ready, viewport entry, first gesture, tab visibility) so the video
   eventually starts even under iOS Low Power Mode or a slow first paint.
   Note: use preload="auto" on the <video> for fastest mobile start. */
function autoplayFixS(v) {
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  let played = false;
  const tryPlay = () => {
    if (played || !v.paused) { played = true; return; }
    const p = v.play();
    if (p && p.then) p.then(() => { played = true; }).catch(() => {});
  };
  tryPlay();
  v.addEventListener("loadeddata", tryPlay);
  v.addEventListener("canplay", tryPlay);
  const opts = { passive: true };
  window.addEventListener("touchstart", tryPlay, opts);
  window.addEventListener("scroll", tryPlay, opts);
  window.addEventListener("pointerdown", tryPlay, opts);
  window.addEventListener("keydown", tryPlay);
  const onVis = () => { if (!document.hidden) tryPlay(); };
  document.addEventListener("visibilitychange", onVis);
  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) tryPlay(); });
    });
    io.observe(v);
  }
}

async function submitForm(fields, formName) {
  if (botcheckTrippedS()) return { ok: true };
  if (window.track) window.track("form_submit", { form: formName });
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

/* Compact "Different Dogs" strip for the top of Adopt / Sponsor pages.
   Kronk + Honey are alumni (static photos). Twitch + Sweet Pea were removed
   after they were adopted. To feature a dog who is still looking, add
   { name: "Name", status: "looking", live: find("Name") } — that pulls their
   photo, breed, age, and availability live from Shelterluv by name. */
function DifferentDogsS() {
  const { animals } = useAnimalsS();
  const find = (n) => animals.find(a => (a.name || "").trim().toLowerCase() === n.toLowerCase());
  const cards = [
    { name: "Kronk", img: "assets/kronk-after-snow.jpg", status: "home" },
    { name: "Honey", img: "assets/honey-after-portrait.webp", status: "home" },
  ];
  return (
    <section className="section-light" style={{ padding: "56px 0 44px" }}>
      <div className="wrap dd-wrap">
        {/* Heading and blurb stack in one column with a readable measure.
            The old side-by-side flex stranded the blurb far right at 13px. */}
        <div className="dd-intro">
          <h2 className="display" style={{ fontSize: "clamp(26px, 3.4vw, 40px)", margin: 0, color: "var(--ink)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Different isn't bad. It's just different.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: "14px 0 0", maxWidth: "58ch" }}>
            We at Run 2 The Rescue know different doesn't mean bad. We celebrate the dogs with differences. Our seniors and special-needs survivors all deserve a loving home.
          </p>
        </div>
        <div className="dd-grid">
          {cards.map(c => {
            const looking = c.status === "looking";
            const img = c.img || (c.live && c.live.cover) || null;
            const meta = looking
              ? [c.live && c.live.breed, c.live && c.live.ageGroup].filter(Boolean).join(" · ")
              : "Alumni";
            return (
              <div key={c.name}
                onClick={(looking && c.live) ? () => window.dispatchEvent(new CustomEvent("r2r-open-dog", { detail: c.live })) : undefined}
                style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid var(--lav-200)", cursor: (looking && c.live) ? "pointer" : "default", transition: "transform .2s ease, box-shadow .2s ease" }}
                onMouseEnter={e => { if (looking && c.live) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "var(--lav-200)", position: "relative" }}>
                  {img
                    ? <ImgS src={img} alt={c.name} loading="eager" fetchpriority="high" style={c.zoom ? { transform: `scale(${c.zoom})` } : undefined} />
                    : <div aria-hidden="true" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, var(--lav-200), var(--lav-100))" }}>
                        <span className="display" style={{ fontSize: 40, color: "var(--purple-400)" }}>{c.name[0]}</span>
                      </div>}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <span style={{ display: "inline-block", marginBottom: 7, fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: looking ? "var(--purple-500)" : "rgba(26,16,37,0.78)", color: "#fff" }}>{looking ? "Looking" : "Forever home ♥"}</span>
                  <div className="display" style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.1 }}>{c.name}</div>
                  {meta && <div style={{ fontSize: 10, fontFamily: "var(--font-ui)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--purple-600)", marginTop: 4 }}>{meta}</div>}
                  {looking && c.live && <div style={{ fontSize: 11, fontWeight: 600, color: "var(--purple-600)", marginTop: 6 }}>Meet {c.name} →</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  IMG_BANK, PawS, ImgS, vimgS, NavS, FooterS, MagneticS, CountUpS, ScrollProgressS, useRevealS, useAnimalsS,
  DifferentDogsS, submitForm, WEB3FORMS_KEY, BotcheckS, autoplayFixS, PawGlyphS,
});
