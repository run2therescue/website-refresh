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

/* Live activity ticker strip
   Two UX tweaks layered on top of the original CSS marquee:
   1) Shuffle the line order once per browsing session so a returning visitor
      doesn't see the same first three headlines every time.
   2) Persist elapsed marquee seconds in sessionStorage so navigating away
      and back resumes the strip mid-cycle instead of restarting at 0%.
   Together these guarantee every headline gets seen across a session, even
   if the visitor only spends ~10 seconds on the homepage per visit. */
function LiveTicker() {
  // PLACEHOLDER ticker content — on-brand lines, no fabricated events.
  // Swap these for real stats/updates when available (e.g. dogs rescued this month,
  // upcoming transport, latest adoption, sponsorship milestones).
  const ITEMS = [
    "Recent Rescue Mission: Dog Meat Truck Interception. 47 dogs saved from transport to the Yulin Dog Meat Festival",
    "12 dogs have arrived from our sanctuary in China, four now with our wonderful rescue partner Animal Haven in NYC",
    "Little tripod Trip has been adopted by a wonderful family in Atlanta, living his best life with dog and human siblings",
    "Two more Yulin Dog Meat Festival survivors are home: senior mixed breed Stanley, and six year old Malamute Kiva, adopted by a wonderful Marine couple",
  ];
  // Cycle scaled to ~7s per headline at original tempo — fewer items in the
  // strip means we proportionally shorten the marquee duration so it doesn't
  // crawl unnaturally slowly. Adjust upward if more headlines are added.
  const CYCLE_SEC = 28;
  const STATE_KEY = "r2tr_ticker_v1";

  const state = React.useMemo(() => {
    // Try to resume the per-tab session
    try {
      const stored = JSON.parse(sessionStorage.getItem(STATE_KEY) || "null");
      if (stored && Array.isArray(stored.order) && stored.order.length === ITEMS.length) {
        const elapsed = (Date.now() - (stored.savedAt || Date.now())) / 1000;
        const offset = ((stored.offset || 0) + Math.max(0, elapsed)) % CYCLE_SEC;
        return { order: stored.order, offset };
      }
    } catch (e) { /* sessionStorage blocked → fall through to fresh shuffle */ }
    // First visit this session: shuffle the line order (Fisher–Yates)
    const order = ITEMS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    return { order, offset: 0 };
  }, []);

  React.useEffect(() => {
    // Save the current offset whenever the user leaves the page (navigates
    // away, switches tab, closes), so the next mount can resume mid-cycle.
    const save = () => {
      try {
        sessionStorage.setItem(STATE_KEY, JSON.stringify({
          order: state.order,
          offset: state.offset,
          savedAt: Date.now(),
        }));
      } catch (e) { /* storage blocked, nothing to do */ }
    };
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", save);
    };
  }, [state]);

  const items = state.order.map((i) => ITEMS[i]);
  return (
    <section style={{
      background: "var(--plum-900)", color: "var(--on-dark-2)",
      borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)",
      padding: "16px 0", overflow: "hidden", position: "relative",
    }}>
      <div className="r2tr-ticker-track" style={{
        animationDuration: `${CYCLE_SEC}s`,
        animationDelay: `-${state.offset}s`,
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
        .r2tr-ticker-track {
          display: flex; gap: 64px; white-space: nowrap;
          animation-name: marquee; animation-timing-function: linear; animation-iteration-count: infinite;
          font-family: var(--font-mono); font-size: 13px;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .r2tr-ticker-track {
            gap: 28px;
            font-size: 11px;
            /* On mobile the track length is much shorter, so the same 28s
               desktop cycle drags. Halve the cycle so headlines move at a
               readable but lively pace. */
            animation-duration: calc(var(--ticker-cycle, 28s) * 0.5) !important;
          }
        }
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

/* Interactive impact calculator
   Discrete six-tier ladder backed by actual line items in our rescue budget,
   so a donor can see exactly which line their gift would cover. The slider's
   underlying input is min=0, max=5, step=1 — visual feedback is smooth but
   only six positions are reachable. Tiers are ordered low → high; default
   is the middle "food and shelter for one month" tier so the panel opens at
   a meaningful number, not the minimum. */
function ImpactCalc({ onDonate }) {
  const TIERS = [
    { value: 15,   text: "buys a bag of treats for the dogs" },
    { value: 30,   text: "covers flea and tick for one month" },
    { value: 75,   text: "provides food and shelter for one month" },
    { value: 150,  text: "covers vaccinations, sterilization, and microchip" },
    { value: 900,  text: "pays for the CDC fees on a rescue" },
    { value: 2500, text: "funds one freedom flight home" },
  ];
  const [idx, setIdx] = React.useState(2);
  const amount = TIERS[idx].value;
  const outcome = TIERS[idx];

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
                type="range" min={0} max={TIERS.length - 1} step={1} value={idx}
                onChange={e => setIdx(Number(e.target.value))}
                aria-valuetext={`$${amount.toLocaleString()} — ${outcome.text}`}
                style={{
                  width: "100%", height: 4, borderRadius: 999,
                  background: `linear-gradient(to right, var(--purple-400) ${(idx / (TIERS.length - 1)) * 100}%, var(--plum-700) ${(idx / (TIERS.length - 1)) * 100}%)`,
                  appearance: "none", WebkitAppearance: "none", outline: "none", cursor: "pointer",
                  marginBottom: 14,
                }}
              />
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: 22,
                fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--on-dark-3)",
              }} aria-hidden="true">
                {TIERS.map((t, i) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setIdx(i)}
                    style={{
                      background: "transparent", border: 0, padding: "4px 6px",
                      color: i === idx ? "var(--purple-400)" : "var(--on-dark-3)",
                      fontWeight: i === idx ? 700 : 500,
                      fontFamily: "var(--font-mono)", fontSize: 11, cursor: "pointer",
                      transition: "color .15s ease",
                    }}
                  >
                    ${t.value < 1000 ? t.value : (t.value / 1000) + "K"}
                  </button>
                ))}
              </div>
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
