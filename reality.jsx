/* Reality page, "The Reality They Face"
   Heavy content lives here, off the homepage, behind a content notice.
   Text/stories are always readable; imagery (hero video + photos) stays
   blurred until the visitor chooses to reveal it. */

/* ---- Content notice gate ------------------------------------------------ */
function TriggerWarning({ open, onAccept, onDecline }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Content notice" style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      background: "oklch(0.12 0.03 310 / 0.94)", backdropFilter: "blur(10px)",
    }}>
      <div style={{
        maxWidth: 540, width: "100%",
        background: "var(--plum-800, oklch(0.2 0.04 310))",
        border: "1px solid var(--line-dark)", borderRadius: 24,
        padding: "44px 38px", textAlign: "center",
        boxShadow: "0 30px 80px oklch(0.05 0.02 310 / 0.6)",
      }}>
        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 18 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>A content notice
        </div>
        <h2 className="display" style={{ fontSize: "clamp(26px, 3.4vw, 38px)", margin: "0 0 14px", color: "#fff" }}>
          A hard truth, handled with care
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--on-dark-2)", margin: "0 0 28px" }}>
          This page shows where rescued dogs begin, caged and crowded in the dog meat
          trade. The images and footage are not graphic, but they are distressing.
          Choose what's right for you: view everything, or keep the imagery hidden
          and still read every dog's story.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-accent" onClick={onAccept}>I'm ready, show me</button>
          <button className="btn btn-outline-light" onClick={onDecline}>Keep imagery hidden</button>
        </div>
      </div>
    </div>
  );
}

/* ---- Blur wrapper: hides media until revealed (globally or per-item) ---- */
function SensitiveMedia({ revealed, label, children }) {
  const [shown, setShown] = React.useState(false);
  const visible = revealed || shown;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        filter: visible ? "none" : "blur(26px)",
        transform: visible ? "none" : "scale(1.12)",
        transition: "filter .45s ease, transform .45s ease",
      }}>
        {children}
      </div>
      {!visible && (
        <button onClick={() => setShown(true)} aria-label="Reveal sensitive imagery" style={{
          position: "absolute", inset: 0, cursor: "pointer", border: "none",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          background: "oklch(0.14 0.03 310 / 0.55)", color: "#fff",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Sensitive, tap to view
          </span>
        </button>
      )}
    </div>
  );
}

/* ---- Hero: caged-dogs footage, blurred until revealed -------------------- */
function RealityHero({ revealed }) {
  return (
    <header style={{ position: "relative", paddingTop: 96, paddingBottom: 104, overflow: "hidden", minHeight: 520 }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <video
          autoPlay muted loop playsInline
          poster="assets/reality-cage-poster.jpg"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            filter: revealed
              ? "saturate(0.5) brightness(0.5)"
              : "saturate(0.4) brightness(0.45) blur(30px)",
            transform: revealed ? "none" : "scale(1.15)",
            transition: "filter .5s ease, transform .5s ease",
          }}
        >
          <source src="assets/reality-cage-clip.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, oklch(0.16 0.03 310 / 0.6) 0%, oklch(0.16 0.03 310 / 0.78) 60%, oklch(0.16 0.03 310 / 0.97) 100%)",
        }} />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div className="eyebrow" style={{ marginBottom: 22 }}>
          <span style={{ color: "var(--purple-400)" }}>✦ </span>Before the second chance
        </div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 6.5vw, 88px)", margin: "0 0 18px", color: "#fff", lineHeight: 1.02 }}>
          The Reality They Face
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--on-dark-2)", maxWidth: 540, margin: 0 }}>
          Before trauma becomes trust, this is where their story starts. We've
          handled it with care so you can meet it on your terms.
        </p>
      </div>
    </header>
  );
}

/* ---- Intro: always-readable context ------------------------------------- */
function RealityIntro({ revealed, onReveal }) {
  return (
    <section className="section-dark" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw-dark" style={{ top: 40, right: "6%", width: 44, height: 44 }} />
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h2 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", margin: "0 0 18px", color: "var(--purple-400)" }}>
          Voiceless victims of an industry built on fear
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--on-dark-2)", margin: "0 0 16px" }}>
          Across China, millions of dogs enter the dog meat trade
          every year. Many were stolen family pets. All of them are voiceless
          victims of an industry built on fear and silence.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--on-dark-2)", margin: 0 }}>
          We don't show you this to shock you, and we'll never show cruelty for
          its own sake. We show it because it's true, and because every
          adoption, every sponsored flight, every donation reaches directly into
          this picture and lifts a life out of it.
        </p>
        {!revealed && (
          <button className="btn btn-outline-light" style={{ marginTop: 26 }} onClick={onReveal}>
            Reveal the imagery on this page
          </button>
        )}
      </div>
    </section>
  );
}

/* ---- Gallery: 3 trade-context photos, each with explanatory text -------- */
function RealityGallery({ revealed }) {
  const rows = [
    {
      img: "assets/reality-trade-context-1.jpg",
      alt: "Dogs crammed into small stacked wire cages",
      heading: "Stacked like freight",
      body: "Dogs are packed several to a wire cage barely large enough for one, then stacked for transport. Many are former family pets; many have never touched solid ground. They arrive at slaughter sites already exhausted, already afraid.",
    },
    {
      img: "assets/reality-trade-context-2.jpg",
      alt: "A dog pressing its face toward the wire of a cage",
      heading: "A face at the wire",
      body: "Every dog here is an individual, a personality, a history, a name we haven't met yet. They press toward any light, any movement, hoping it means rescue. The bravehearted survivors in our adoption pages once looked out from behind bars exactly like this.",
    },
    {
      img: "assets/reality-trade-context-3.jpg",
      alt: "Dozens of dogs crowded together behind a chain-link fence",
      heading: "Counted by the dozen",
      body: "Slaughter pens crowd dozens of dogs together, surviving on borrowed time. The scale is hard to hold in your mind. This is the brutal reality we face. Now it's a race to bring them all to safety.",
    },
    {
      img: "assets/reality-beagle.webp",
      alt: "A beagle looking out from a wire crate",
      heading: "Every breed, every kind",
      body: "Beagles, retrievers, huskies, poodles, Pomeranians, the dog meat trade takes breeds of every kind, and many still wear the tag of a home they were taken from.",
    },
    {
      img: "assets/reality-puppies.webp",
      alt: "Two puppies behind a wire fence in a dirt yard",
      heading: "Born into it",
      body: "Some survivors were stolen pets; others were born inside the dog meat trade and have known nothing else.",
    },
    {
      img: "assets/reality-transport-cage.jpg",
      alt: "Dogs crammed into a stacked wire crate during transport",
      heading: "Crated for the road",
      body: "Once caught, dogs are packed into wire crates and trucked between markets and slaughter sites, often for days. Interception during transport is one of the moments a rescue becomes possible.",
    },
  ];
  return (
    <section className="section-dark" style={{ padding: "8px 0 80px", position: "relative" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {rows.map((r, i) => (
          <article key={i} className="reveal" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 32, alignItems: "center",
            background: "var(--plum-700)", borderRadius: 24, overflow: "hidden",
            border: "1px solid var(--line-dark)",
          }}>
            <div style={{
              order: i % 2 === 0 ? 0 : 1,
              aspectRatio: "4/3", minHeight: 260, background: "oklch(0.16 0.03 310)",
            }}>
              <SensitiveMedia revealed={revealed}>
                <ImgS src={r.img} alt={r.alt} style={{ filter: "saturate(0.55) brightness(0.82)" }} />
              </SensitiveMedia>
            </div>
            <div style={{ padding: "36px 40px" }}>
              <h3 className="display" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", margin: "0 0 12px", color: "#fff" }}>
                {r.heading}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--on-dark-2)", margin: 0 }}>
                {r.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---- Video strip: short clips from the trade (R2R's own footage) -------- */
function RealityClips({ revealed }) {
  const clips = ["assets/reality-clip-1.mp4", "assets/reality-clip-2.mp4", "assets/reality-clip-3.mp4"];
  return (
    <section className="section-dark" style={{ padding: "8px 0 84px", position: "relative" }}>
      <div className="wrap">
        <h2 className="display" style={{ fontSize: "clamp(24px, 3vw, 38px)", margin: "0 0 8px", color: "#fff" }}>
          Footage from the trade
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--on-dark-2)", margin: "0 0 28px", maxWidth: 520 }}>
          Short clips from the holding sites and markets our rescuers rescue dogs from.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 280px))", gap: 18, justifyContent: "center" }}>
          {clips.map((src, i) => (
            <div key={i} className="reveal" style={{
              aspectRatio: "9 / 16", borderRadius: 18, overflow: "hidden",
              background: "oklch(0.16 0.03 310)", border: "1px solid var(--line-dark)",
            }}>
              <SensitiveMedia revealed={revealed}>
                <video autoPlay muted loop playsInline preload="metadata" style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  filter: "saturate(0.5) brightness(0.8)",
                }}>
                  <source src={src} type="video/mp4" />
                </video>
              </SensitiveMedia>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Closing CTA: doors out of the picture ------------------------------ */
function RealityCTA() {
  const doors = [
    ["Meet the survivors", "/adopt"],
    ["Fund a flight", "/sponsor"],
    ["Donate", "/donate"],
    ["Foster a survivor", "/foster"],
  ];
  return (
    <section className="section-light" style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw-light" style={{ bottom: 30, left: "5%", width: 48, height: 48 }} />
      <div className="wrap" style={{ maxWidth: 720, textAlign: "center", margin: "0 auto" }}>
        <h2 className="display" style={{ fontSize: "clamp(30px, 3.8vw, 50px)", margin: "0 0 14px", color: "var(--ink)" }}>
          This is what you interrupt
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 auto 28px", maxWidth: 520 }}>
          Every door below reaches back into that picture and rescues a dog from
          it. Run to the rescue with love, and peace will follow.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {doors.map(([label, href], i) => (
            <a key={href} href={href} className={i === 0 ? "btn btn-accent" : "btn btn-outline-dark"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  TriggerWarning, SensitiveMedia, RealityHero, RealityIntro, RealityGallery, RealityClips, RealityCTA,
});
