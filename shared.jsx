/* Shared across every page — Nav, Footer, image bank, helpers */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

/* Image bank — reused across pages */
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

function ImgS({ src, alt, style = {}, ...rest }) {
  return (
    <img src={src} alt={alt} loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      {...rest}
    />
  );
}

/* Shared Nav — active link aware, with Donate button + mobile hamburger */
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
    { id: "adopt", label: "Adopt", href: "Adopt.html" },
    { id: "sponsor", label: "Sponsor", href: "Sponsor.html" },
    { id: "foster", label: "Foster", href: "Foster.html" },
    { id: "donate", label: "Donate", href: "Donate.html" },
    { id: "news", label: "News", href: "News.html" },
    { id: "merch", label: "Merch", href: "Merch.html" },
    { id: "contact", label: "Contact", href: "Contact.html" },
  ];
  const handleDonate = onDonate || (() => { window.location.href = "Donate.html"; });
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "oklch(0.18 0.035 310 / 0.88)" : "oklch(0.18 0.035 310 / 0.55)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid var(--line-dark)" : "1px solid transparent",
      transition: "background .3s ease, border-color .3s ease",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 116, gap: 16 }}>
        <a href="index.html" aria-label="Run 2 The Rescue" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <img src="assets/r2r-logo.png" alt="" style={{ width: 96, height: 96 }} />
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
          <button className="btn btn-accent nav-donate-desktop" style={{ height: 42, padding: "0 20px", fontSize: 14 }} onClick={handleDonate}>Donate</button>
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
          >Donate</button>
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
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 48,
          paddingBottom: 48, borderBottom: "1px solid var(--line-dark)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <img src="assets/r2r-logo.png" alt="" style={{ width: 48, height: 48 }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "#fff", lineHeight: 1.05 }}>Run 2 The<br />Rescue</div>
            </div>
            <p style={{ color: "var(--on-dark-2)", fontSize: 14, maxWidth: 340, margin: "0 0 18px" }}>
              Saving lives, one rescue at a time. Dedicated to rescuing dogs from the meat trade and giving them a second chance at life.
            </p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--purple-400)" }}>
              ✦ Run · Rescue · Repeat
            </div>
          </div>
          <FooterColS title="Get Involved" links={[["Adopt","Adopt.html"],["Foster","Foster.html"],["Sponsor","Sponsor.html"],["Donate","Donate.html"]]} />
          <FooterColS title="Resources" links={[["News","News.html"],["Contact","Contact.html"],["Home","index.html"]]} />
        </div>
        <div style={{
          paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          fontSize: 13, color: "var(--on-dark-3)",
        }}>
          <div>© 2026 Run 2 The Rescue. All rights reserved. 501(c)(3) Nonprofit Organization.</div>
          <a href="#" style={{ color: "var(--on-dark-2)" }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
function FooterColS({ title, links }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 18, fontWeight: 600 }}>{title}</div>
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
  const [n, setN] = useStateS(0);
  const ref = useRefS(null);
  useEffectS(() => {
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

Object.assign(window, {
  IMG_BANK, PawS, ImgS, NavS, FooterS, MagneticS, CountUpS, ScrollProgressS, useRevealS,
});
