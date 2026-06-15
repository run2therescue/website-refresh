/* 2026-grade micro-interactions and engagement primitives */

/* Scroll progress bar across the top */
function ScrollProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) : 0);
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100,
      background: "transparent", pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${p * 100}%`,
        background: "linear-gradient(90deg, var(--purple-400), var(--purple-600))",
        transition: "width .08s linear",
        boxShadow: "0 0 12px oklch(0.63 0.16 305 / 0.6)",
      }} />
    </div>
  );
}

/* Count-up number when visible */
function CountUp({ to, suffix = "", duration = 1600, prefix = "" }) {
  /* In the CI prerender (headless Chrome), show the final value immediately so
     the baked snapshot reads real numbers, never the pre-animation zeros. */
  const prerendering = typeof navigator !== "undefined" && navigator.webdriver === true;
  const [n, setN] = React.useState(prerendering ? to : 0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    if (prerendering) return;
    if (!ref.current) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

/* Magnetic button, gently pulls toward the cursor */
function Magnetic({ children, strength = 0.25, ...rest }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display: "inline-block", transition: "transform .3s cubic-bezier(.2,.7,.3,1)" }} {...rest}>
      {children}
    </span>
  );
}

/* Live activity ticker strip */
function LiveTicker() {
  // PLACEHOLDER ticker content — on-brand lines, no fabricated events.
  // Swap these for real stats/updates when available (e.g. dogs rescued this month,
  // upcoming transport, latest adoption, sponsorship milestones).
  const items = [
    "Run · Rescue · Repeat",
    "Rescuing dogs from the dog meat trade",
    "From trauma to trust",
    "Every survivor deserves a second chance",
    "Adopt · Sponsor · Foster · Donate",
  ];
  return (
    <section style={{
      background: "var(--plum-900)", color: "var(--on-dark-2)",
      borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)",
      padding: "16px 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 64, whiteSpace: "nowrap",
        animation: "marquee 55s linear infinite",
        fontFamily: "var(--font-mono)", fontSize: 13,
      }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "var(--purple-400)",
              boxShadow: "0 0 0 0 var(--purple-400)",
              animation: "pulse 2s ease-out infinite",
              display: "inline-block", flexShrink: 0,
            }} />
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 oklch(0.72 0.14 305 / 0.6); }
          70% { box-shadow: 0 0 0 10px oklch(0.72 0.14 305 / 0); }
          100% { box-shadow: 0 0 0 0 oklch(0.72 0.14 305 / 0); }
        }
      `}</style>
    </section>
  );
}

/* Interactive impact calculator */
function ImpactCalc({ onDonate }) {
  const [amount, setAmount] = React.useState(50);
  const outcomes = [
    { at: 10, text: "covers a week of food for a survivor" },
    { at: 25, text: "funds a full vet check-up" },
    { at: 50, text: "provides a month of care + food" },
    { at: 120, text: "covers heartworm treatment" },
    { at: 250, text: "sponsors a full medical recovery" },
    { at: 500, text: "pays for one rescue flight home" },
    { at: 1000, text: "saves two dogs from a meat farm" },
    { at: 2500, text: "covers airfare and CDC fees for one dog" },
  ];
  const outcome = outcomes.slice().reverse().find(o => amount >= o.at) || outcomes[0];
  const dogsHelped = Math.max(1, Math.round(amount / 50));

  return (
    <section className="section-light" style={{ padding: "56px 0", position: "relative", overflow: "hidden" }}>
      <Paw className="paw-light" style={{ top: 40, right: "6%", width: 44, height: 44 }} />
      <div className="wrap">
        <div style={{
          background: "linear-gradient(135deg, var(--plum-800), var(--plum-900))",
          borderRadius: 28, padding: "clamp(32px, 5vw, 56px)", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, var(--purple-500), transparent 70%)",
            opacity: 0.4, filter: "blur(40px)",
          }} />
          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 56, alignItems: "center" }} className="mission-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span style={{ color: "var(--purple-400)" }}><PawGlyph /></span>See your impact
              </div>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4.8vw, 60px)", margin: "0 0 16px", color: "#fff", lineHeight: 1.05 }}>
                Every dollar has a face.
              </h2>
              <p style={{ color: "var(--on-dark-2)", maxWidth: 420, margin: 0, fontSize: 16 }}>
                Drag the slider to see what your gift covers, from a week of food to the flight home.
              </p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
                <span className="display impact-amount" style={{ fontSize: 72, color: "#fff", lineHeight: 1 }}>
                  ${amount.toLocaleString()}
                </span>
                <span style={{ fontSize: 14, color: "var(--on-dark-3)", fontFamily: "var(--font-mono)" }}>one-time</span>
              </div>
              <input
                type="range" min={10} max={2500} step={10} value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                style={{
                  width: "100%", height: 4, borderRadius: 999,
                  background: `linear-gradient(to right, var(--purple-400) ${(amount - 10) / 24.9}%, var(--plum-700) ${(amount - 10) / 24.9}%)`,
                  appearance: "none", WebkitAppearance: "none", outline: "none", cursor: "pointer",
                  marginBottom: 28,
                }}
              />
              <div style={{
                padding: "18px 22px", borderRadius: 16,
                background: "oklch(0.72 0.14 305 / 0.15)",
                border: "1px solid var(--purple-500)",
                marginBottom: 24,
              }}>
                <div style={{ fontSize: 13, color: "var(--purple-400)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  ♡ Your ${amount} today
                </div>
                <div style={{ fontSize: 18, color: "#fff", lineHeight: 1.4 }}>
                  {outcome.text}
                </div>
              </div>
              <Magnetic>
                <button className="btn btn-accent" onClick={() => onDonate(amount)} style={{ width: "100%", justifyContent: "center" }}>
                  Donate now <span className="arrow">→</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 26px; height: 26px;
          background: #fff; border-radius: 50%; cursor: pointer;
          box-shadow: 0 2px 12px oklch(0 0 0 / 0.3), 0 0 0 4px oklch(0.63 0.16 305 / 0.3);
          transition: transform .15s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }
        input[type=range]::-moz-range-thumb {
          width: 26px; height: 26px; background: #fff; border: 0; border-radius: 50%; cursor: pointer;
          box-shadow: 0 2px 12px oklch(0 0 0 / 0.3), 0 0 0 4px oklch(0.63 0.16 305 / 0.3);
        }
      `}</style>
    </section>
  );
}

/* Urgency badge pulse */
function UrgencyBadge({ days }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 999,
      background: "oklch(0.62 0.14 25 / 0.12)",
      color: "oklch(0.55 0.14 25)",
      fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
      fontWeight: 600,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: "oklch(0.62 0.14 25)",
        animation: "pulseRed 1.6s ease-out infinite",
      }} />
      {days}d waiting
      <style>{`
        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 oklch(0.62 0.14 25 / 0.7); }
          70% { box-shadow: 0 0 0 8px oklch(0.62 0.14 25 / 0); }
          100% { box-shadow: 0 0 0 0 oklch(0.62 0.14 25 / 0); }
        }
      `}</style>
    </span>
  );
}

Object.assign(window, { ScrollProgress, CountUp, Magnetic, LiveTicker, ImpactCalc, UrgencyBadge });
